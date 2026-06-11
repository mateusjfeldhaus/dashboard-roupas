import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'

import piecesRouter   from './routes/pieces'
import looksRouter    from './routes/looks'
import usageRouter    from './routes/usage'
import ratingRouter   from './routes/rating'
import wishlistRouter from './routes/wishlist'

const app  = express()
const PORT = process.env.PORT ?? 3001

// ── Wardrobe root: two levels up from backend/ ────────────────────────────────
const ROUPAS_DIR = path.resolve(__dirname, '../..')

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
}))
app.use(express.json())

// ── Image server (/img/*) ────────────────────────────────────────────────────
const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png',  '.webp': 'image/webp', '.gif': 'image/gif',
}

app.use('/img', (req, res, next) => {
  try {
    const decoded   = decodeURIComponent(req.path)
    const filePath  = path.join(ROUPAS_DIR, decoded)
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase()
      res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream')
      res.setHeader('Cache-Control', 'public, max-age=3600')
      fs.createReadStream(filePath).pipe(res)
    } else {
      next()
    }
  } catch {
    next()
  }
})

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api/pieces',   piecesRouter)
app.use('/api/looks',    looksRouter)
app.use('/api/usage',    usageRouter)
app.use('/api/rating',   ratingRouter)
app.use('/api/wishlist', wishlistRouter)

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  🚀  Backend rodando em http://localhost:${PORT}\n`)
})
