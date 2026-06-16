import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/client'
import { ratings } from '../db/schema'

const router = Router()

// GET /api/rating  → { ratings: { lookId: number } }
router.get('/', async (_req, res) => {
  try {
    const all = await db.select().from(ratings)
    const map: Record<string, number> = {}
    all.forEach(r => { map[r.lookId] = r.rating })
    res.json({ ratings: map })
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

// GET /api/rating/:lookId
router.get('/:lookId', async (req, res) => {
  try {
    const [row] = await db.select().from(ratings).where(eq(ratings.lookId, req.params.lookId))
    res.json({ lookId: req.params.lookId, rating: row?.rating ?? 0 })
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

// POST /api/rating/:lookId  body: { rating: 0-10 }
router.post('/:lookId', async (req, res) => {
  try {
    const { rating } = req.body as { rating: number }

    if (rating === 0) {
      await db.delete(ratings).where(eq(ratings.lookId, req.params.lookId))
      res.json({ lookId: req.params.lookId, rating: 0 })
      return
    }

    const value = Math.max(1, Math.min(10, Math.round(rating)))

    await db.insert(ratings)
      .values({ lookId: req.params.lookId, rating: value, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: ratings.lookId,
        set:    { rating: value, updatedAt: new Date() },
      })

    res.json({ lookId: req.params.lookId, rating: value })
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

export default router
