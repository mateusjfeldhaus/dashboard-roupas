import { Router } from 'express'
import { eq } from 'drizzle-orm'
import multer from 'multer'
import { randomUUID } from 'crypto'
import { db } from '../db/client'
import { lookPhotos, looks } from '../db/schema'
import { supabase, BUCKET } from '../lib/supabase'
import { apiError } from '../middleware/errorHandler'

const router = Router()

// Magic bytes das imagens suportadas (JPEG, PNG, GIF, WebP)
function isImageBuffer(buf: Buffer): boolean {
  if (buf.length < 12) return false
  if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) return true                          // JPEG
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) return true       // PNG
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return true       // GIF
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&                 // WebP
      buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return true
  return false
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Apenas imagens são aceitas'))
  },
})

// ── GET /api/photos/:lookId  — retorna URL pública do Supabase ───────────────
router.get('/:lookId', async (req, res) => {
  try {
    const [photo] = await db
      .select()
      .from(lookPhotos)
      .where(eq(lookPhotos.lookId, req.params.lookId))

    if (!photo || !photo.url) {
      res.status(404).json({ error: 'Foto não encontrada' })
      return
    }

    res.json({ id: photo.id, url: photo.url })
  } catch (e) { apiError(res, e) }
})

// ── POST /api/photos/:lookId  — upload para Supabase Storage ─────────────────
router.post('/:lookId', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Nenhum arquivo enviado' })
      return
    }

    // Valida por magic bytes (conteúdo real), não pelo Content-Type do cliente
    if (!isImageBuffer(req.file.buffer)) {
      res.status(400).json({ error: 'Arquivo não é uma imagem válida' })
      return
    }

    const [look] = await db.select().from(looks).where(eq(looks.id, req.params.lookId))
    if (!look) {
      res.status(404).json({ error: 'Look não encontrado' })
      return
    }

    // Caminho no bucket: lookId (sem extensão — o mime-type é preservado nos metadados)
    const storagePath = req.params.lookId

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true,          // substitui se já existir
      })

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath)

    // Upsert no banco — grava apenas a URL pública (sem base64)
    const photoId = randomUUID()
    await db
      .insert(lookPhotos)
      .values({ id: photoId, lookId: req.params.lookId, url: publicUrl })
      .onConflictDoUpdate({
        target: lookPhotos.lookId,
        set: { url: publicUrl, uploadedAt: new Date() },
      })

    res.status(201).json({ id: photoId, lookId: req.params.lookId })
  } catch (e) { apiError(res, e) }
})

// ── DELETE /api/photos/:lookId  — remove do Supabase e do banco ──────────────
router.delete('/:lookId', async (req, res) => {
  try {
    // Remove do Supabase Storage (ignora erro se não existir)
    await supabase.storage.from(BUCKET).remove([req.params.lookId])

    // Remove do banco
    await db.delete(lookPhotos).where(eq(lookPhotos.lookId, req.params.lookId))

    res.json({ lookId: req.params.lookId })
  } catch (e) { apiError(res, e) }
})

export default router
