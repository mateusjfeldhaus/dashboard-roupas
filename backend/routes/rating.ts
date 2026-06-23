import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/client'
import { ratings } from '../db/schema'
import { RatingSchema } from '../lib/schemas'
import { apiError } from '../middleware/errorHandler'

const router = Router()

// GET /api/rating  → { ratings: { lookId: number } }
router.get('/', async (_req, res) => {
  try {
    const all = await db.select().from(ratings)
    const map: Record<string, number> = {}
    all.forEach(r => { map[r.lookId] = r.rating })
    res.json({ ratings: map })
  } catch (e) { apiError(res, e) }
})

// GET /api/rating/:lookId
router.get('/:lookId', async (req, res) => {
  try {
    const [row] = await db.select().from(ratings).where(eq(ratings.lookId, req.params.lookId))
    res.json({ lookId: req.params.lookId, rating: row?.rating ?? 0 })
  } catch (e) { apiError(res, e) }
})

// POST /api/rating/:lookId  body: { rating: 0-10 }
router.post('/:lookId', async (req, res) => {
  try {
    const { rating } = RatingSchema.parse(req.body)

    if (rating === 0) {
      await db.delete(ratings).where(eq(ratings.lookId, req.params.lookId))
      res.json({ lookId: req.params.lookId, rating: 0 })
      return
    }

    await db.insert(ratings)
      .values({ lookId: req.params.lookId, rating, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: ratings.lookId,
        set:    { rating, updatedAt: new Date() },
      })

    res.json({ lookId: req.params.lookId, rating })
  } catch (e) { apiError(res, e) }
})

export default router
