"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const drizzle_orm_1 = require("drizzle-orm");
const client_1 = require("../db/client");
const schema_1 = require("../db/schema");
const schemas_1 = require("../lib/schemas");
const errorHandler_1 = require("../middleware/errorHandler");
const router = (0, express_1.Router)();
// GET /api/pieces
router.get('/', async (_req, res) => {
    try {
        const all = await client_1.db.select().from(schema_1.pieces).orderBy(schema_1.pieces.category, schema_1.pieces.name);
        res.json(all);
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
// GET /api/pieces/:id
router.get('/:id', async (req, res) => {
    try {
        const [piece] = await client_1.db.select().from(schema_1.pieces).where((0, drizzle_orm_1.eq)(schema_1.pieces.id, req.params.id));
        if (!piece) {
            res.status(404).json({ error: 'Not found' });
            return;
        }
        res.json(piece);
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
// POST /api/pieces
router.post('/', async (req, res) => {
    try {
        const body = schemas_1.PieceCreateSchema.parse(req.body);
        const [created] = await client_1.db.insert(schema_1.pieces).values(body).returning();
        res.status(201).json(created);
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
// PUT /api/pieces/:id
router.put('/:id', async (req, res) => {
    try {
        const fields = schemas_1.PieceUpdateSchema.parse(req.body);
        const [updated] = await client_1.db.update(schema_1.pieces)
            .set(fields)
            .where((0, drizzle_orm_1.eq)(schema_1.pieces.id, req.params.id))
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
// DELETE /api/pieces/:id
router.delete('/:id', async (req, res) => {
    try {
        const [deleted] = await client_1.db.delete(schema_1.pieces).where((0, drizzle_orm_1.eq)(schema_1.pieces.id, req.params.id)).returning();
        if (!deleted) {
            res.status(404).json({ error: 'Peça não encontrada' });
            return;
        }
        res.json({ id: req.params.id });
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
// PATCH /api/pieces/:id/notes
router.patch('/:id/notes', async (req, res) => {
    try {
        const { notes } = schemas_1.NotesSchema.parse(req.body);
        const [updated] = await client_1.db.update(schema_1.pieces)
            .set({ notes })
            .where((0, drizzle_orm_1.eq)(schema_1.pieces.id, req.params.id))
            .returning();
        if (!updated) {
            res.status(404).json({ error: 'Peça não encontrada' });
            return;
        }
        res.json({ notes: updated.notes });
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
// PATCH /api/pieces/:id/hidden
router.patch('/:id/hidden', async (req, res) => {
    try {
        const { hidden } = schemas_1.HiddenSchema.parse(req.body);
        const [updated] = await client_1.db.update(schema_1.pieces)
            .set({ hidden })
            .where((0, drizzle_orm_1.eq)(schema_1.pieces.id, req.params.id))
            .returning();
        if (!updated) {
            res.status(404).json({ error: 'Peça não encontrada' });
            return;
        }
        res.json({ hidden: updated.hidden });
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
exports.default = router;
