"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const drizzle_orm_1 = require("drizzle-orm");
const client_1 = require("../db/client");
const schema_1 = require("../db/schema");
const router = (0, express_1.Router)();
function today() { return new Date().toISOString().split('T')[0]; }
function buildStats(records, lookId) {
    const mine = records.filter(r => r.lookId === lookId);
    return {
        lookId,
        count: mine.length,
        lastDate: mine.length ? mine[mine.length - 1].date : null,
        dates: mine.map(r => r.date),
    };
}
// GET /api/usage  → full dump + summary
router.get('/', async (_req, res) => {
    try {
        const records = await client_1.db.select({
            lookId: schema_1.usageRecords.lookId,
            date: schema_1.usageRecords.date,
        }).from(schema_1.usageRecords).orderBy(schema_1.usageRecords.date);
        const ids = [...new Set(records.map(r => r.lookId))];
        const summary = {};
        ids.forEach(id => { summary[id] = buildStats(records, id); });
        res.json({ records, summary });
    }
    catch (e) {
        res.status(500).json({ error: String(e) });
    }
});
// GET /api/usage/:lookId
router.get('/:lookId', async (req, res) => {
    try {
        const records = await client_1.db.select({
            lookId: schema_1.usageRecords.lookId,
            date: schema_1.usageRecords.date,
        }).from(schema_1.usageRecords)
            .where((0, drizzle_orm_1.eq)(schema_1.usageRecords.lookId, req.params.lookId))
            .orderBy(schema_1.usageRecords.date);
        res.json(buildStats(records, req.params.lookId));
    }
    catch (e) {
        res.status(500).json({ error: String(e) });
    }
});
// POST /api/usage/:lookId  → mark today
router.post('/:lookId', async (req, res) => {
    try {
        await client_1.db.insert(schema_1.usageRecords).values({
            lookId: req.params.lookId,
            date: today(),
        });
        const records = await client_1.db.select({
            lookId: schema_1.usageRecords.lookId,
            date: schema_1.usageRecords.date,
        }).from(schema_1.usageRecords)
            .where((0, drizzle_orm_1.eq)(schema_1.usageRecords.lookId, req.params.lookId))
            .orderBy(schema_1.usageRecords.date);
        res.json(buildStats(records, req.params.lookId));
    }
    catch (e) {
        res.status(500).json({ error: String(e) });
    }
});
// DELETE /api/usage/:lookId/last  → undo last use
router.delete('/:lookId/last', async (req, res) => {
    try {
        const [last] = await client_1.db.select()
            .from(schema_1.usageRecords)
            .where((0, drizzle_orm_1.eq)(schema_1.usageRecords.lookId, req.params.lookId))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.usageRecords.id))
            .limit(1);
        if (last) {
            await client_1.db.delete(schema_1.usageRecords).where((0, drizzle_orm_1.eq)(schema_1.usageRecords.id, last.id));
        }
        const records = await client_1.db.select({
            lookId: schema_1.usageRecords.lookId,
            date: schema_1.usageRecords.date,
        }).from(schema_1.usageRecords)
            .where((0, drizzle_orm_1.eq)(schema_1.usageRecords.lookId, req.params.lookId))
            .orderBy(schema_1.usageRecords.date);
        res.json(buildStats(records, req.params.lookId));
    }
    catch (e) {
        res.status(500).json({ error: String(e) });
    }
});
exports.default = router;
