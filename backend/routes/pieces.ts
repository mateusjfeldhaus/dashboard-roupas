import { Router } from 'express'
import { eq, inArray } from 'drizzle-orm'
import { randomUUID } from 'crypto'
import multer from 'multer'
import { db } from '../db/client'
import { pieces, looks, lookPieces } from '../db/schema'
import { PieceCreateSchema, PieceUpdateSchema, NotesSchema, HiddenSchema } from '../lib/schemas'
import { supabase, BUCKET } from '../lib/supabase'
import { apiError } from '../middleware/errorHandler'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Apenas imagens são aceitas'))
  },
})

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
    const id   = body.id ?? randomUUID()
    const [created] = await db.insert(pieces).values({ ...body, id }).returning()
    res.status(201).json(created)
  } catch (e) { apiError(res, e) }
})

// POST /api/pieces/:id/photo — upload foto para Supabase, salva URL em pieces.img
router.post('/:id/photo', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) { res.status(400).json({ error: 'Nenhum arquivo enviado' }); return }
    const [piece] = await db.select().from(pieces).where(eq(pieces.id, req.params.id))
    if (!piece) { res.status(404).json({ error: 'Peça não encontrada' }); return }

    const storagePath = `pieces/${req.params.id}`
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, req.file.buffer, { contentType: req.file.mimetype, upsert: true })
    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)
    const [updated] = await db.update(pieces).set({ img: publicUrl }).where(eq(pieces.id, req.params.id)).returning()
    res.json({ img: updated.img })
  } catch (e) { apiError(res, e) }
})

// DELETE /api/pieces/:id/photo — remove foto do Supabase e limpa pieces.img
router.delete('/:id/photo', async (req, res) => {
  try {
    await supabase.storage.from(BUCKET).remove([`pieces/${req.params.id}`])
    await db.update(pieces).set({ img: '' }).where(eq(pieces.id, req.params.id))
    res.json({ ok: true })
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

// PATCH /api/pieces/:id/hidden — oculta/restaura peça
// Quando hidden=true, também oculta todos os looks que contêm essa peça
router.patch('/:id/hidden', async (req, res) => {
  try {
    const { hidden } = HiddenSchema.parse(req.body)
    const [updated] = await db.update(pieces)
      .set({ hidden })
      .where(eq(pieces.id, req.params.id))
      .returning()
    if (!updated) { res.status(404).json({ error: 'Peça não encontrada' }); return }

    let looksHidden = 0
    if (hidden) {
      // Busca todos os looks que contêm essa peça
      const rows = await db.select({ lookId: lookPieces.lookId })
        .from(lookPieces)
        .where(eq(lookPieces.pieceId, req.params.id))
      const lookIds = rows.map(r => r.lookId)
      if (lookIds.length > 0) {
        await db.update(looks).set({ hidden: true }).where(inArray(looks.id, lookIds))
        looksHidden = lookIds.length
      }
    }

    res.json({ hidden: updated.hidden, looksHidden })
  } catch (e) { apiError(res, e) }
})

export default router

