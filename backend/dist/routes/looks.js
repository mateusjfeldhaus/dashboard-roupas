"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const drizzle_orm_1 = require("drizzle-orm");
const client_1 = require("../db/client");
const schema_1 = require("../db/schema");
const schemas_1 = require("../lib/schemas");
const errorHandler_1 = require("../middleware/errorHandler");
const router = (0, express_1.Router)();
// Attach pieces array to each look row
async function withPieces(lookRows) {
    if (lookRows.length === 0)
        return [];
    const ids = lookRows.map(l => l.id);
    const allLp = await client_1.db.select().from(schema_1.lookPieces)
        .where(ids.length === 1
        ? (0, drizzle_orm_1.eq)(schema_1.lookPieces.lookId, ids[0])
        // for multiple looks fetch all and filter in JS (simpler than SQL IN with Drizzle)
        : undefined);
    const lpAll = ids.length > 1
        ? allLp.filter(lp => ids.includes(lp.lookId))
        : allLp;
    return lookRows.map(look => ({
        ...look,
        pieces: lpAll
            .filter(lp => lp.lookId === look.id)
            .map(lp => ({ cat: lp.cat, pieceId: lp.pieceId })),
    }));
}
// GET /api/looks
router.get('/', async (_req, res) => {
    try {
        const all = await client_1.db.select().from(schema_1.looks).orderBy(schema_1.looks.title);
        const allLp = await client_1.db.select().from(schema_1.lookPieces);
        const photos = await client_1.db.select({ lookId: schema_1.lookPhotos.lookId, id: schema_1.lookPhotos.id }).from(schema_1.lookPhotos);
        const photoMap = Object.fromEntries(photos.map(p => [p.lookId, p.id]));
        const result = all.map(look => ({
            ...look,
            photoId: photoMap[look.id] ?? null,
            pieces: allLp
                .filter(lp => lp.lookId === look.id)
                .map(lp => ({ cat: lp.cat, pieceId: lp.pieceId })),
        }));
        res.json(result);
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
// GET /api/looks/:id
router.get('/:id', async (req, res) => {
    try {
        const [look] = await client_1.db.select().from(schema_1.looks).where((0, drizzle_orm_1.eq)(schema_1.looks.id, req.params.id));
        if (!look) {
            res.status(404).json({ error: 'Not found' });
            return;
        }
        const [photo] = await client_1.db.select({ id: schema_1.lookPhotos.id }).from(schema_1.lookPhotos).where((0, drizzle_orm_1.eq)(schema_1.lookPhotos.lookId, req.params.id));
        const [result] = await withPieces([look]);
        res.json({ ...result, photoId: photo?.id ?? null });
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
// POST /api/looks  body: { id, title, tags, formality, tip, pieces: [{cat, pieceId}] }
router.post('/', async (req, res) => {
    try {
        const { pieces: pcs, ...lookData } = schemas_1.LookCreateSchema.parse(req.body);
        const created = await client_1.db.transaction(async (tx) => {
            const [look] = await tx.insert(schema_1.looks).values(lookData).returning();
            if (pcs?.length) {
                await tx.insert(schema_1.lookPieces).values(pcs.map(lp => ({ lookId: look.id, ...lp })));
            }
            return look;
        });
        const [result] = await withPieces([created]);
        res.status(201).json(result);
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
// PUT /api/looks/:id  body: { title?, tags?, formality?, tip?, pieces?: [...] }
router.put('/:id', async (req, res) => {
    try {
        const { pieces: pcs, ...fields } = schemas_1.LookUpdateSchema.parse(req.body);
        const updated = await client_1.db.transaction(async (tx) => {
            const [look] = await tx.update(schema_1.looks)
                .set(fields)
                .where((0, drizzle_orm_1.eq)(schema_1.looks.id, req.params.id))
                .returning();
            if (!look)
                return null;
            if (Array.isArray(pcs)) {
                await tx.delete(schema_1.lookPieces).where((0, drizzle_orm_1.eq)(schema_1.lookPieces.lookId, req.params.id));
                if (pcs.length) {
                    await tx.insert(schema_1.lookPieces).values(pcs.map((lp) => ({
                        lookId: req.params.id, ...lp,
                    })));
                }
            }
            return look;
        });
        if (!updated) {
            res.status(404).json({ error: 'Not found' });
            return;
        }
        const [result] = await withPieces([updated]);
        res.json(result);
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
// DELETE /api/looks/:id  (look_pieces cascade via FK)
router.delete('/:id', async (req, res) => {
    try {
        await client_1.db.delete(schema_1.looks).where((0, drizzle_orm_1.eq)(schema_1.looks.id, req.params.id));
        res.json({ id: req.params.id });
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
// PATCH /api/looks/:id/notes  body: { notes: string }
router.patch('/:id/notes', async (req, res) => {
    try {
        const { notes } = schemas_1.NotesSchema.parse(req.body);
        const [updated] = await client_1.db.update(schema_1.looks)
            .set({ notes })
            .where((0, drizzle_orm_1.eq)(schema_1.looks.id, req.params.id))
            .returning();
        if (!updated) {
            res.status(404).json({ error: 'Look não encontrado' });
            return;
        }
        res.json({ notes: updated.notes });
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
exports.default = router;
