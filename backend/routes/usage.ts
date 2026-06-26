import { Router } from 'express'
import { eq, desc } from 'drizzle-orm'
import { db } from '../db/client'
import { usageRecords } from '../db/schema'
import { apiError } from '../middleware/errorHandler'

const router = Router()

function today() { return new Date().toISOString().split('T')[0] }

function buildStats(records: { lookId: string; date: string }[], lookId: string) {
  const mine = records.filter(r => r.lookId === lookId)
  return {
    lookId,
    count:    mine.length,
    lastDate: mine.length ? mine[mine.length - 1].date : null,
    dates:    mine.map(r => r.date),
  }
}

// GET /api/usage  → full dump + summary
router.get('/', async (_req, res) => {
  try {
    const records = await db.select({
      lookId: usageRecords.lookId,
      date:   usageRecords.date,
    }).from(usageRecords).orderBy(usageRecords.date)

    const ids = [...new Set(records.map(r => r.lookId))]
    const summary: Record<string, ReturnType<typeof buildStats>> = {}
    ids.forEach(id => { summary[id] = buildStats(records, id) })

    res.json({ records, summary })
  } catch (e) { apiError(res, e) }
})

// GET /api/usage/:lookId
router.get('/:lookId', async (req, res) => {
  try {
    const records = await db.select({
      lookId: usageRecords.lookId,
      date:   usageRecords.date,
    }).from(usageRecords)
      .where(eq(usageRecords.lookId, req.params.lookId))
      .orderBy(usageRecords.date)

    res.json(buildStats(records, req.params.lookId))
  } catch (e) { apiError(res, e) }
})

// POST /api/usage/:lookId  → mark today
router.post('/:lookId', async (req, res) => {
  try {
    await db.insert(usageRecords).values({
      lookId: req.params.lookId,
      date:   today(),
    })

    const records = await db.select({
      lookId: usageRecords.lookId,
      date:   usageRecords.date,
    }).from(usageRecords)
      .where(eq(usageRecords.lookId, req.params.lookId))
      .orderBy(usageRecords.date)

    res.json(buildStats(records, req.params.lookId))
  } catch (e) { apiError(res, e) }
})

// DELETE /api/usage/:lookId/last  → undo last use
router.delete('/:lookId/last', async (req, res) => {
  try {
    const [last] = await db.select()
      .from(usageRecords)
      .where(eq(usageRecords.lookId, req.params.lookId))
      .orderBy(desc(usageRecords.id))
      .limit(1)

    if (last) {
      await db.delete(usageRecords).where(eq(usageRecords.id, last.id))
    }

    const records = await db.select({
      lookId: usageRecords.lookId,
      date:   usageRecords.date,
    }).from(usageRecords)
      .where(eq(usageRecords.lookId, req.params.lookId))
      .orderBy(usageRecords.date)

    res.json(buildStats(records, req.params.lookId))
  } catch (e) { apiError(res, e) }
})

export default router
