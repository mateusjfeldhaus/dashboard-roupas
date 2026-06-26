"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const drizzle_orm_1 = require("drizzle-orm");
const multer_1 = __importDefault(require("multer"));
const crypto_1 = require("crypto");
const client_1 = require("../db/client");
const schema_1 = require("../db/schema");
const router = (0, express_1.Router)();
// Armazena em memória (max 8 MB por upload)
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 8 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('image/'))
            cb(null, true);
        else
            cb(new Error('Apenas imagens são aceitas'));
    },
});
// ── GET /api/photos/:lookId  — serve a imagem (sem autenticação) ──────────────
router.get('/:lookId', async (req, res) => {
    try {
        const [photo] = await client_1.db
            .select()
            .from(schema_1.lookPhotos)
            .where((0, drizzle_orm_1.eq)(schema_1.lookPhotos.lookId, req.params.lookId));
        if (!photo) {
            res.status(404).json({ error: 'Foto não encontrada' });
            return;
        }
        const buf = Buffer.from(photo.data, 'base64');
        res.setHeader('Content-Type', photo.mimeType);
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.send(buf);
    }
    catch (e) {
        res.status(500).json({ error: String(e) });
    }
});
// ── POST /api/photos/:lookId  — upload (autenticado via middleware global) ────
router.post('/:lookId', upload.single('photo'), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'Nenhum arquivo enviado' });
            return;
        }
        // Verifica se o look existe
        const [look] = await client_1.db.select().from(schema_1.looks).where((0, drizzle_orm_1.eq)(schema_1.looks.id, req.params.lookId));
        if (!look) {
            res.status(404).json({ error: 'Look não encontrado' });
            return;
        }
        const photoId = (0, crypto_1.randomUUID)();
        const base64 = req.file.buffer.toString('base64');
        // Upsert: troca a foto se já existir
        await client_1.db
            .insert(schema_1.lookPhotos)
            .values({
            id: photoId,
            lookId: req.params.lookId,
            mimeType: req.file.mimetype,
            data: base64,
        })
            .onConflictDoUpdate({
            target: schema_1.lookPhotos.lookId,
            set: {
                id: photoId,
                mimeType: req.file.mimetype,
                data: base64,
                uploadedAt: new Date(),
            },
        });
        res.status(201).json({
            id: photoId,
            lookId: req.params.lookId,
        });
    }
    catch (e) {
        res.status(500).json({ error: String(e) });
    }
});
// ── DELETE /api/photos/:lookId  — remove a foto (autenticado) ────────────────
router.delete('/:lookId', async (req, res) => {
    try {
        await client_1.db.delete(schema_1.lookPhotos).where((0, drizzle_orm_1.eq)(schema_1.lookPhotos.lookId, req.params.lookId));
        res.json({ lookId: req.params.lookId });
    }
    catch (e) {
        res.status(500).json({ error: String(e) });
    }
});
exports.default = router;
