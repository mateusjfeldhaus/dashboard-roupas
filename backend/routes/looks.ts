import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/client'
import { looks, lookPieces, lookPhotos } from '../db/schema'
import { LookCreateSchema, LookUpdateSchema, NotesSchema } from '../lib/schemas'
import { apiError } from '../middleware/errorHandler'

const router = Router()

// Attach pieces array to each look row
async function withPieces(lookRows: (typeof looks.$inferSelect)[]) {
  if (lookRows.length === 0) return []
  const ids = lookRows.map(l => l.id)
  const allLp = await db.select().from(lookPieces)
    .where(
      ids.length === 1
        ? eq(lookPieces.lookId, ids[0])
        // for multiple looks fetch all and filter in JS (simpler than SQL IN with Drizzle)
        : undefined
    )
  const lpAll = ids.length > 1
    ? allLp.filter(lp => ids.includes(lp.lookId))
    : allLp

  return lookRows.map(look => ({
    ...look,
    pieces: lpAll
      .filter(lp => lp.lookId === look.id)
      .map(lp => ({ cat: lp.cat, pieceId: lp.pieceId })),
  }))
}

// GET /api/looks
router.get('/', async (_req, res) => {
  try {
    const all    = await db.select().from(looks).orderBy(looks.title)
    const allLp  = await db.select().from(lookPieces)
    const photos = await db.select({ lookId: lookPhotos.lookId, id: lookPhotos.id }).from(lookPhotos)
    const photoMap = Object.fromEntries(photos.map(p => [p.lookId, p.id]))

    const result = all.map(look => ({
      ...look,
      photoId: photoMap[look.id] ?? null,
      pieces: allLp
        .filter(lp => lp.lookId === look.id)
        .map(lp => ({ cat: lp.cat, pieceId: lp.pieceId })),
    }))
    res.json(result)
  } catch (e) { apiError(res, e) }
})

// GET /api/looks/:id
router.get('/:id', async (req, res) => {
  try {
    const [look] = await db.select().from(looks).where(eq(looks.id, req.params.id))
    if (!look) { res.status(404).json({ error: 'Not found' }); return }
    const [photo] = await db.select({ id: lookPhotos.id }).from(lookPhotos).where(eq(lookPhotos.lookId, req.params.id))
    const [result] = await withPieces([look])
    res.json({ ...result, photoId: photo?.id ?? null })
  } catch (e) { apiError(res, e) }
})

// POST /api/looks  body: { id, title, tags, formality, tip, pieces: [{cat, pieceId}] }
router.post('/', async (req, res) => {
  try {
    const { pieces: pcs, ...lookData } = LookCreateSchema.parse(req.body)

    const created = await db.transaction(async (tx) => {
      const [look] = await tx.insert(looks).values(lookData).returning()
      if (pcs?.length) {
        await tx.insert(lookPieces).values(pcs.map(lp => ({ lookId: look.id, ...lp })))
      }
      return look
    })

    const [result] = await withPieces([created])
    res.status(201).json(result)
  } catch (e) { apiError(res, e) }
})

// PUT /api/looks/:id  body: { title?, tags?, formality?, tip?, pieces?: [...] }
router.put('/:id', async (req, res) => {
  try {
    const { pieces: pcs, ...fields } = LookUpdateSchema.parse(req.body)

    const updated = await db.transaction(async (tx) => {
      const [look] = await tx.update(looks)
        .set(fields)
        .where(eq(looks.id, req.params.id))
        .returning()
      if (!look) return null

      if (Array.isArray(pcs)) {
        await tx.delete(lookPieces).where(eq(lookPieces.lookId, req.params.id))
        if (pcs.length) {
          await tx.insert(lookPieces).values(pcs.map((lp: { cat: string; pieceId: string }) => ({
            lookId: req.params.id, ...lp,
          })))
        }
      }
      return look
    })

    if (!updated) { res.status(404).json({ error: 'Not found' }); return }

    const [result] = await withPieces([updated])
    res.json(result)
  } catch (e) { apiError(res, e) }
})

// DELETE /api/looks/:id  (look_pieces cascade via FK)
router.delete('/:id', async (req, res) => {
  try {
    await db.delete(looks).where(eq(looks.id, req.params.id))
    res.json({ id: req.params.id })
  } catch (e) { apiError(res, e) }
})

// PATCH /api/looks/:id/notes  body: { notes: string }
router.patch('/:id/notes', async (req, res) => {
  try {
    const { notes } = NotesSchema.parse(req.body)
    const [updated] = await db.update(looks)
      .set({ notes })
      .where(eq(looks.id, req.params.id))
      .returning()
    if (!updated) { res.status(404).json({ error: 'Look não encontrado' }); return }
    res.json({ notes: updated.notes })
  } catch (e) { apiError(res, e) }
})

export default router
