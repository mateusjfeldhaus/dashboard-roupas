import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/client'
import { pieces } from '../db/schema'

const router = Router()

// GET /api/pieces
router.get('/', async (_req, res) => {
  try {
    const all = await db.select().from(pieces)
      .orderBy(pieces.category, pieces.name)
    res.json(all)
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

// GET /api/pieces/:id
router.get('/:id', async (req, res) => {
  try {
    const [piece] = await db.select().from(pieces).where(eq(pieces.id, req.params.id))
    if (!piece) { res.status(404).json({ error: 'Not found' }); return }
    res.json(piece)
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

// POST /api/pieces
router.post('/', async (req, res) => {
  try {
    const body = req.body as typeof pieces.$inferInsert
    const [created] = await db.insert(pieces).values(body).returning()
    res.status(201).json(created)
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

// PUT /api/pieces/:id
router.put('/:id', async (req, res) => {
  try {
    const { id: _id, createdAt: _ca, ...fields } = req.body
    const [updated] = await db.update(pieces)
      .set(fields)
      .where(eq(pieces.id, req.params.id))
      .returning()
    if (!updated) { res.status(404).json({ error: 'Not found' }); return }
    res.json(updated)
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

// DELETE /api/pieces/:id
router.delete('/:id', async (req, res) => {
  try {
    await db.delete(pieces).where(eq(pieces.id, req.params.id))
    res.json({ id: req.params.id })
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

export default router
