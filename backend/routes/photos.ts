import { Router } from 'express'
import { eq } from 'drizzle-orm'
import multer from 'multer'
import { randomUUID } from 'crypto'
import { db } from '../db/client'
import { lookPhotos, looks } from '../db/schema'

const router = Router()

// Armazena em memória (max 8 MB por upload)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Apenas imagens são aceitas'))
  },
})

// ── GET /api/photos/:lookId  — serve a imagem (sem autenticação) ──────────────
router.get('/:lookId', async (req, res) => {
  try {
    const [photo] = await db
      .select()
      .from(lookPhotos)
      .where(eq(lookPhotos.lookId, req.params.lookId))

    if (!photo) {
      res.status(404).json({ error: 'Foto não encontrada' })
      return
    }

    const buf = Buffer.from(photo.data, 'base64')
    res.setHeader('Content-Type', photo.mimeType)
    res.setHeader('Cache-Control', 'public, max-age=86400')
    res.send(buf)
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

// ── POST /api/photos/:lookId  — upload (autenticado via middleware global) ────
router.post('/:lookId', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Nenhum arquivo enviado' })
      return
    }

    // Verifica se o look existe
    const [look] = await db.select().from(looks).where(eq(looks.id, req.params.lookId))
    if (!look) {
      res.status(404).json({ error: 'Look não encontrado' })
      return
    }

    const photoId = randomUUID()
    const base64  = req.file.buffer.toString('base64')

    // Upsert: troca a foto se já existir
    await db
      .insert(lookPhotos)
      .values({
        id:       photoId,
        lookId:   req.params.lookId,
        mimeType: req.file.mimetype,
        data:     base64,
      })
      .onConflictDoUpdate({
        target: lookPhotos.lookId,
        set: {
          id:         photoId,
          mimeType:   req.file.mimetype,
          data:       base64,
          uploadedAt: new Date(),
        },
      })

    res.status(201).json({
      id:     photoId,
      lookId: req.params.lookId,
    })
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

// ── DELETE /api/photos/:lookId  — remove a foto (autenticado) ────────────────
router.delete('/:lookId', async (req, res) => {
  try {
    await db.delete(lookPhotos).where(eq(lookPhotos.lookId, req.params.lookId))
    res.json({ lookId: req.params.lookId })
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

export default router
