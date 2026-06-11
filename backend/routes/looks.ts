import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/client'
import { looks, lookPieces } from '../db/schema'

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
    const all = await db.select().from(looks).orderBy(looks.title)
    const allLp = await db.select().from(lookPieces)
    const result = all.map(look => ({
      ...look,
      pieces: allLp
        .filter(lp => lp.lookId === look.id)
        .map(lp => ({ cat: lp.cat, pieceId: lp.pieceId })),
    }))
    res.json(result)
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

// GET /api/looks/:id
router.get('/:id', async (req, res) => {
  try {
    const [look] = await db.select().from(looks).where(eq(looks.id, req.params.id))
    if (!look) { res.status(404).json({ error: 'Not found' }); return }
    const [result] = await withPieces([look])
    res.json(result)
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

// POST /api/looks  body: { id, title, tags, formality, tip, pieces: [{cat, pieceId}] }
router.post('/', async (req, res) => {
  try {
    const { pieces: pcs, ...lookData } = req.body as typeof looks.$inferInsert & { pieces: { cat: string; pieceId: string }[] }
    const [created] = await db.insert(looks).values(lookData).returning()

    if (pcs?.length) {
      await db.insert(lookPieces).values(pcs.map(lp => ({ lookId: created.id, ...lp })))
    }

    const [result] = await withPieces([created])
    res.status(201).json(result)
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

// PUT /api/looks/:id  body: { title?, tags?, formality?, tip?, pieces?: [...] }
router.put('/:id', async (req, res) => {
  try {
    const { pieces: pcs, id: _id, createdAt: _ca, ...fields } = req.body

    const [updated] = await db.update(looks)
      .set(fields)
      .where(eq(looks.id, req.params.id))
      .returning()
    if (!updated) { res.status(404).json({ error: 'Not found' }); return }

    // Replace pieces if provided
    if (Array.isArray(pcs)) {
      await db.delete(lookPieces).where(eq(lookPieces.lookId, req.params.id))
      if (pcs.length) {
        await db.insert(lookPieces).values(pcs.map((lp: { cat: string; pieceId: string }) => ({
          lookId: req.params.id, ...lp,
        })))
      }
    }

    const [result] = await withPieces([updated])
    res.json(result)
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

// DELETE /api/looks/:id  (look_pieces cascade via FK)
router.delete('/:id', async (req, res) => {
  try {
    await db.delete(looks).where(eq(looks.id, req.params.id))
    res.json({ id: req.params.id })
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

export default router
