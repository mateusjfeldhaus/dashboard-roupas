import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/client'
import { wishlistItems } from '../db/schema'
import { WishlistCreateSchema, WishlistUpdateSchema } from '../lib/schemas'
import { apiError } from '../middleware/errorHandler'

const router = Router()


// GET /api/wishlist  → { items: [...] }
router.get('/', async (_req, res) => {
  try {
    const items = await db.select().from(wishlistItems).orderBy(wishlistItems.createdAt)
    res.json({ items })
  } catch (e) { apiError(res, e) }
})

// POST /api/wishlist
router.post('/', async (req, res) => {
  try {
    const body = WishlistCreateSchema.parse(req.body)
    const [created] = await db.insert(wishlistItems)
      .values({ ...body, id: crypto.randomUUID() })
      .returning()
    res.status(201).json(created)
  } catch (e) { apiError(res, e) }
})

// PUT /api/wishlist/:id
router.put('/:id', async (req, res) => {
  try {
    const fields = WishlistUpdateSchema.parse(req.body)
    // handle purchasedAt: if purchased=true and no purchasedAt, set now
    const data = fields.purchased && !fields.purchasedAt
      ? { ...fields, purchasedAt: new Date() }
      : fields
    const [updated] = await db.update(wishlistItems)
      .set(data)
      .where(eq(wishlistItems.id, req.params.id))
      .returning()
    if (!updated) { res.status(404).json({ error: 'Not found' }); return }
    res.json(updated)
  } catch (e) { apiError(res, e) }
})

// DELETE /api/wishlist/:id
router.delete('/:id', async (req, res) => {
  try {
    await db.delete(wishlistItems).where(eq(wishlistItems.id, req.params.id))
    res.json({ id: req.params.id })
  } catch (e) { apiError(res, e) }
})

export default router
