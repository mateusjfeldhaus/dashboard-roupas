"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const drizzle_orm_1 = require("drizzle-orm");
const client_1 = require("../db/client");
const schema_1 = require("../db/schema");
const schemas_1 = require("../lib/schemas");
const errorHandler_1 = require("../middleware/errorHandler");
const router = (0, express_1.Router)();
// GET /api/wishlist  → { items: [...] }
router.get('/', async (_req, res) => {
    try {
        const items = await client_1.db.select().from(schema_1.wishlistItems).orderBy(schema_1.wishlistItems.createdAt);
        res.json({ items });
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
// POST /api/wishlist
router.post('/', async (req, res) => {
    try {
        const body = schemas_1.WishlistCreateSchema.parse(req.body);
        const [created] = await client_1.db.insert(schema_1.wishlistItems)
            .values({ ...body, id: crypto.randomUUID() })
            .returning();
        res.status(201).json(created);
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
// PUT /api/wishlist/:id
router.put('/:id', async (req, res) => {
    try {
        const fields = schemas_1.WishlistUpdateSchema.parse(req.body);
        // handle purchasedAt: if purchased=true and no purchasedAt, set now
        const data = fields.purchased && !fields.purchasedAt
            ? { ...fields, purchasedAt: new Date() }
            : fields;
        const [updated] = await client_1.db.update(schema_1.wishlistItems)
            .set(data)
            .where((0, drizzle_orm_1.eq)(schema_1.wishlistItems.id, req.params.id))
            .returning();
        if (!updated) {
            res.status(404).json({ error: 'Not found' });
            return;
        }
        res.json(updated);
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
// DELETE /api/wishlist/:id
router.delete('/:id', async (req, res) => {
    try {
        await client_1.db.delete(schema_1.wishlistItems).where((0, drizzle_orm_1.eq)(schema_1.wishlistItems.id, req.params.id));
        res.json({ id: req.params.id });
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
exports.default = router;
