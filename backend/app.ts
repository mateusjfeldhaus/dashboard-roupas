import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'

import piecesRouter   from './routes/pieces'
import looksRouter    from './routes/looks'
import usageRouter    from './routes/usage'
import ratingRouter   from './routes/rating'
import wishlistRouter from './routes/wishlist'
import photosRouter   from './routes/photos'
import { requireApiKey } from './middleware/requireApiKey'
import { supabase } from './lib/supabase'
import { db } from './db/client'
import { sql } from 'drizzle-orm'

export const app = express()

// ── Wardrobe root: two levels up from backend/ ────────────────────────────────
const ROUPAS_DIR = path.resolve(__dirname, '../..')

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(helmet())
const isDev = process.env.NODE_ENV === 'development'
app.use(cors({
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : isDev ? 'http://localhost:5173' : false,
}))
app.use(express.json({ limit: '1mb' }))

// ── Image server (/img/*) ────────────────────────────────────────────────────
const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png',  '.webp': 'image/webp', '.gif': 'image/gif',
}

app.use('/img', (req, res, next) => {
  try {
    const decoded   = decodeURIComponent(req.path)
    const filePath  = path.join(ROUPAS_DIR, decoded)
    if (!filePath.startsWith(ROUPAS_DIR + path.sep)) { res.status(403).end(); return }
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

// ── Rate limit: máx 10 tentativas de login por IP a cada 15 min ──────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Muitas tentativas. Tente novamente em 15 minutos.' },
})

// ── Rate limit: máx 60 writes por IP por minuto (POST/PUT/DELETE) ─────────────
const writeLimiter = rateLimit({
  windowMs: 60_000,
  limit: 60,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  skip: (req) => req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS',
  message: { error: 'Muitas requisições. Tente novamente em instantes.' },
})

// ── GET /health — público, mantém Supabase e Neon ativos ─────────────────────
app.get('/health', async (_req, res) => {
  const status: Record<string, string> = { ok: 'true' }
  try {
    await db.execute(sql`SELECT 1`)
    status.neon = 'alive'
  } catch {
    status.neon = 'error'
  }
  try {
    await supabase.storage.listBuckets()
    status.supabase = 'alive'
  } catch {
    status.supabase = 'error'
  }
  res.json(status)
})

// ── POST /api/auth — valida PIN e emite JWT 24h ──────────────────────────────
app.post('/api/auth', authLimiter, (req, res) => {
  const { pin }   = req.body as { pin?: string }
  const apiKey    = process.env.API_KEY
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    res.status(500).json({ error: 'JWT_SECRET não configurado' })
    return
  }
  if (!apiKey || pin !== apiKey) {
    res.status(401).json({ error: 'PIN incorreto' })
    return
  }
  const token = jwt.sign({}, jwtSecret, { expiresIn: '24h' })
  res.json({ token })
})

// ── Auth: todas as rotas requerem JWT válido ──────────────────────────────────
// /img aceita token via query param ?t= (browser <img> não envia headers)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') return next()
  if (req.path === '/api/auth') return next()
  if (req.path.startsWith('/img') && typeof req.query.t === 'string') {
    req.headers['x-api-key'] = req.query.t
  }
  requireApiKey(req, res, next)
})

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api', writeLimiter)
app.use('/api/pieces',   piecesRouter)
app.use('/api/looks',    looksRouter)
app.use('/api/usage',    usageRouter)
app.use('/api/rating',   ratingRouter)
app.use('/api/wishlist', wishlistRouter)
app.use('/api/photos',   photosRouter)
