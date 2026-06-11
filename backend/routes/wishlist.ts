import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/client'
import { wishlistItems } from '../db/schema'

const router = Router()

function nanoid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7) }

// GET /api/wishlist  → { items: [...] }
router.get('/', async (_req, res) => {
  try {
    const items = await db.select().from(wishlistItems).orderBy(wishlistItems.createdAt)
    res.json({ items })
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

// POST /api/wishlist
router.post('/', async (req, res) => {
  try {
    const body = req.body as Omit<typeof wishlistItems.$inferInsert, 'id' | 'createdAt'>
    const [created] = await db.insert(wishlistItems)
      .values({ ...body, id: nanoid() })
      .returning()
    res.status(201).json(created)
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

// PUT /api/wishlist/:id
router.put('/:id', async (req, res) => {
  try {
    const { id: _id, createdAt: _ca, ...fields } = req.body
    // handle purchasedAt: if purchased=true and no purchasedAt, set now
    if (fields.purchased && !fields.purchasedAt) {
      fields.purchasedAt = new Date()
    }
    const [updated] = await db.update(wishlistItems)
      .set(fields)
      .where(eq(wishlistItems.id, req.params.id))
      .returning()
    if (!updated) { res.status(404).json({ error: 'Not found' }); return }
    res.json(updated)
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

// DELETE /api/wishlist/:id
router.delete('/:id', async (req, res) => {
  try {
    await db.delete(wishlistItems).where(eq(wishlistItems.id, req.params.id))
    res.json({ id: req.params.id })
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

export default router
