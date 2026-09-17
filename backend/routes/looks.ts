import { Router } from 'express'
import { eq, inArray, desc, sql } from 'drizzle-orm'
import { db } from '../db/client'
import { looks, lookPieces, lookPhotos, ratings } from '../db/schema'
import { LookCreateSchema, LookUpdateSchema, NotesSchema, HiddenSchema } from '../lib/schemas'
import { apiError } from '../middleware/errorHandler'

const router = Router()

async function withPieces(lookRows: (typeof looks.$inferSelect)[]) {
  if (lookRows.length === 0) return []
  const ids = lookRows.map(l => l.id)
  const lps = await db.select().from(lookPieces)
    .where(ids.length === 1 ? eq(lookPieces.lookId, ids[0]) : inArray(lookPieces.lookId, ids))

  return lookRows.map(look => ({
    ...look,
    pieces: lps
      .filter(lp => lp.lookId === look.id)
      .map(lp => ({ cat: lp.cat, pieceId: lp.pieceId })),
  }))
}

router.get('/', async (_req, res) => {
  try {
    const all    = await db.select().from(looks)
      .orderBy(desc(sql`COALESCE((SELECT rating FROM ratings WHERE look_id = ${looks.id}), 0)`))
    const allLp  = await db.select().from(lookPieces)
    const photos = await db.select({ lookId: lookPhotos.lookId, id: lookPhotos.id }).from(lookPhotos)
    const ratingRows = await db.select({ lookId: ratings.lookId, rating: ratings.rating }).from(ratings)

    const photoMap  = Object.fromEntries(photos.map(p => [p.lookId, p.id]))
    const ratingMap = Object.fromEntries(ratingRows.map(r => [r.lookId, r.rating]))

    const result = all.map(look => ({
      ...look,
      photoId: photoMap[look.id]  ?? null,
      rating:  ratingMap[look.id] ?? null,
      pieces: allLp
        .filter(lp => lp.lookId === look.id)
        .map(lp => ({ cat: lp.cat, pieceId: lp.pieceId })),
    }))
    res.json(result)
  } catch (e) { apiError(res, e) }
})

router.get('/:id', async (req, res) => {
  try {
    const [look] = await db.select().from(looks).where(eq(looks.id, req.params.id))
    if (!look) { res.status(404).json({ error: 'Not found' }); return }
    const [photo] = await db.select({ id: lookPhotos.id }).from(lookPhotos).where(eq(lookPhotos.lookId, req.params.id))
    const [result] = await withPieces([look])
    res.json({ ...result, photoId: photo?.id ?? null })
  } catch (e) { apiError(res, e) }
})

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

router.delete('/:id', async (req, res) => {
  try {
    const [deleted] = await db.delete(looks).where(eq(looks.id, req.params.id)).returning()
    if (!deleted) { res.status(404).json({ error: 'Look não encontrado' }); return }
    res.json({ id: req.params.id })
  } catch (e) { apiError(res, e) }
})

router.patch('/:id/hidden', async (req, res) => {
  try {
    const { hidden } = HiddenSchema.parse(req.body)
    const [updated] = await db.update(looks)
      .set({ hidden })
      .where(eq(looks.id, req.params.id))
      .returning()
    if (!updated) { res.status(404).json({ error: 'Look não encontrado' }); return }
    res.json({ hidden: updated.hidden })
  } catch (e) { apiError(res, e) }
})

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
