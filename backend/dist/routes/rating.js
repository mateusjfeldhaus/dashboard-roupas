"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const drizzle_orm_1 = require("drizzle-orm");
const client_1 = require("../db/client");
const schema_1 = require("../db/schema");
const schemas_1 = require("../lib/schemas");
const errorHandler_1 = require("../middleware/errorHandler");
const router = (0, express_1.Router)();
// GET /api/rating  → { ratings: { lookId: number } }
router.get('/', async (_req, res) => {
    try {
        const all = await client_1.db.select().from(schema_1.ratings);
        const map = {};
        all.forEach(r => { map[r.lookId] = r.rating; });
        res.json({ ratings: map });
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
// GET /api/rating/:lookId
router.get('/:lookId', async (req, res) => {
    try {
        const [row] = await client_1.db.select().from(schema_1.ratings).where((0, drizzle_orm_1.eq)(schema_1.ratings.lookId, req.params.lookId));
        res.json({ lookId: req.params.lookId, rating: row?.rating ?? 0 });
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
// POST /api/rating/:lookId  body: { rating: 0-10 }
router.post('/:lookId', async (req, res) => {
    try {
        const { rating } = schemas_1.RatingSchema.parse(req.body);
        if (rating === 0) {
            await client_1.db.delete(schema_1.ratings).where((0, drizzle_orm_1.eq)(schema_1.ratings.lookId, req.params.lookId));
            res.json({ lookId: req.params.lookId, rating: 0 });
            return;
        }
        await client_1.db.insert(schema_1.ratings)
            .values({ lookId: req.params.lookId, rating, updatedAt: new Date() })
            .onConflictDoUpdate({
            target: schema_1.ratings.lookId,
            set: { rating, updatedAt: new Date() },
        });
        res.json({ lookId: req.params.lookId, rating });
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
exports.default = router;
