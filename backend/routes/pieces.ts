import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/client'
import { pieces } from '../db/schema'
import { PieceCreateSchema, PieceUpdateSchema, NotesSchema } from '../lib/schemas'
import { apiError } from '../middleware/errorHandler'

const router = Router()

// GET /api/pieces
router.get('/', async (_req, res) => {
  try {
    const all = await db.select().from(pieces).orderBy(pieces.category, pieces.name)
    res.json(all)
  } catch (e) { apiError(res, e) }
})

// GET /api/pieces/:id
router.get('/:id', async (req, res) => {
  try {
    const [piece] = await db.select().from(pieces).where(eq(pieces.id, req.params.id))
    if (!piece) { res.status(404).json({ error: 'Not found' }); return }
    res.json(piece)
  } catch (e) { apiError(res, e) }
})

// POST /api/pieces
router.post('/', async (req, res) => {
  try {
    const body = PieceCreateSchema.parse(req.body)
    const [created] = await db.insert(pieces).values(body).returning()
    res.status(201).json(created)
  } catch (e) { apiError(res, e) }
})

// PUT /api/pieces/:id
router.put('/:id', async (req, res) => {
  try {
    const fields = PieceUpdateSchema.parse(req.body)
    const [updated] = await db.update(pieces)
      .set(fields)
      .where(eq(pieces.id, req.params.id))
      .returning()
    if (!updated) { res.status(404).json({ error: 'Not found' }); return }
    res.json(updated)
  } catch (e) { apiError(res, e) }
})

// DELETE /api/pieces/:id
router.delete('/:id', async (req, res) => {
  try {
    const [deleted] = await db.delete(pieces).where(eq(pieces.id, req.params.id)).returning()
    if (!deleted) { res.status(404).json({ error: 'Peça não encontrada' }); return }
    res.json({ id: req.params.id })
  } catch (e) { apiError(res, e) }
})

// PATCH /api/pieces/:id/notes
router.patch('/:id/notes', async (req, res) => {
  try {
    const { notes } = NotesSchema.parse(req.body)
    const [updated] = await db.update(pieces)
      .set({ notes })
      .where(eq(pieces.id, req.params.id))
      .returning()
    if (!updated) { res.status(404).json({ error: 'Peça não encontrada' }); return }
    res.json({ notes: updated.notes })
  } catch (e) { apiError(res, e) }
})

// PATCH /api/pieces/:id/hidden
router.patch('/:id/hidden', async (req, res) => {
  try {
    const { hidden } = req.body as { hidden: boolean }
    if (typeof hidden !== 'boolean') {
      res.status(400).json({ error: 'hidden deve ser boolean' })
      return
    }
    const [updated] = await db.update(pieces)
      .set({ hidden })
      .where(eq(pieces.id, req.params.id))
      .returning()
    if (!updated) { res.status(404).json({ error: 'Peça não encontrada' }); return }
    res.json({ hidden: updated.hidden })
  } catch (e) { apiError(res, e) }
})

export default router

