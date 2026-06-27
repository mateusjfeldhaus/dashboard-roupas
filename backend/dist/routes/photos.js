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
const supabase_1 = require("../lib/supabase");
const errorHandler_1 = require("../middleware/errorHandler");
const router = (0, express_1.Router)();
// Magic bytes das imagens suportadas (JPEG, PNG, GIF, WebP)
function isImageBuffer(buf) {
    if (buf.length < 12)
        return false;
    if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF)
        return true; // JPEG
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47)
        return true; // PNG
    if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38)
        return true; // GIF
    if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 && // WebP
        buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50)
        return true;
    return false;
}
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
// ── GET /api/photos/:lookId  — redireciona para URL pública do Supabase ───────
router.get('/:lookId', async (req, res) => {
    try {
        const [photo] = await client_1.db
            .select()
            .from(schema_1.lookPhotos)
            .where((0, drizzle_orm_1.eq)(schema_1.lookPhotos.lookId, req.params.lookId));
        if (!photo || !photo.url) {
            res.status(404).json({ error: 'Foto não encontrada' });
            return;
        }
        res.redirect(302, photo.url);
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
// ── POST /api/photos/:lookId  — upload para Supabase Storage ─────────────────
router.post('/:lookId', upload.single('photo'), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'Nenhum arquivo enviado' });
            return;
        }
        // Valida por magic bytes (conteúdo real), não pelo Content-Type do cliente
        if (!isImageBuffer(req.file.buffer)) {
            res.status(400).json({ error: 'Arquivo não é uma imagem válida' });
            return;
        }
        const [look] = await client_1.db.select().from(schema_1.looks).where((0, drizzle_orm_1.eq)(schema_1.looks.id, req.params.lookId));
        if (!look) {
            res.status(404).json({ error: 'Look não encontrado' });
            return;
        }
        // Caminho no bucket: lookId (sem extensão — o mime-type é preservado nos metadados)
        const storagePath = req.params.lookId;
        const { error: uploadError } = await supabase_1.supabase.storage
            .from(supabase_1.BUCKET)
            .upload(storagePath, req.file.buffer, {
            contentType: req.file.mimetype,
            upsert: true, // substitui se já existir
        });
        if (uploadError)
            throw uploadError;
        const { data: { publicUrl } } = supabase_1.supabase.storage
            .from(supabase_1.BUCKET)
            .getPublicUrl(storagePath);
        // Upsert no banco — grava apenas a URL pública (sem base64)
        const photoId = (0, crypto_1.randomUUID)();
        await client_1.db
            .insert(schema_1.lookPhotos)
            .values({ id: photoId, lookId: req.params.lookId, url: publicUrl })
            .onConflictDoUpdate({
            target: schema_1.lookPhotos.lookId,
            set: { url: publicUrl, uploadedAt: new Date() },
        });
        res.status(201).json({ id: photoId, lookId: req.params.lookId });
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
// ── DELETE /api/photos/:lookId  — remove do Supabase e do banco ──────────────
router.delete('/:lookId', async (req, res) => {
    try {
        // Remove do Supabase Storage (ignora erro se não existir)
        await supabase_1.supabase.storage.from(supabase_1.BUCKET).remove([req.params.lookId]);
        // Remove do banco
        await client_1.db.delete(schema_1.lookPhotos).where((0, drizzle_orm_1.eq)(schema_1.lookPhotos.lookId, req.params.lookId));
        res.json({ lookId: req.params.lookId });
    }
    catch (e) {
        (0, errorHandler_1.apiError)(res, e);
    }
});
exports.default = router;
