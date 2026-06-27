"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingSchema = exports.HiddenSchema = exports.WishlistUpdateSchema = exports.WishlistCreateSchema = exports.LookUpdateSchema = exports.LookCreateSchema = exports.TIME_TAGS = exports.OCCASION_TAGS = exports.SEASON_TAGS = exports.NotesSchema = exports.PieceUpdateSchema = exports.PieceCreateSchema = void 0;
const zod_1 = require("zod");
// ── Piece ─────────────────────────────────────────────────────────────────────
const PIECE_CATEGORIES = [
    'Camisa', 'Calça', 'Blazer', 'Colete', 'Sapato',
    'Cinto', 'Gravata', 'Relógio', 'Suéter', 'Polo', 'Camiseta',
    'Jaqueta', 'Acessório',
];
exports.PieceCreateSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    brand: zod_1.z.string().default(''),
    category: zod_1.z.enum(PIECE_CATEGORIES),
    img: zod_1.z.string().default(''),
    color: zod_1.z.string().default(''),
    tips: zod_1.z.array(zod_1.z.string()).default([]),
    notes: zod_1.z.string().default(''),
});
exports.PieceUpdateSchema = exports.PieceCreateSchema.partial().omit({ id: true });
exports.NotesSchema = zod_1.z.object({
    notes: zod_1.z.string(),
});
// ── Look ──────────────────────────────────────────────────────────────────────
exports.SEASON_TAGS = ['verao', 'inverno', 'primavera', 'outono'];
exports.OCCASION_TAGS = ['formal', 'casual', 'esportes'];
exports.TIME_TAGS = ['diurno', 'noturno'];
const LOOK_TAGS = [...exports.SEASON_TAGS, ...exports.OCCASION_TAGS, ...exports.TIME_TAGS];
/**
 * Regras rígidas de tags:
 *  - no máximo 1 tag de estação  (verao | inverno | primavera | outono)
 *  - no máximo 1 tag de ocasião  (formal | casual | esportes)
 *  - no máximo 1 tag de horário  (diurno | noturno)
 *  - sem duplicatas
 */
const tagsSchema = zod_1.z.array(zod_1.z.enum(LOOK_TAGS))
    .refine(t => t.filter(x => exports.SEASON_TAGS.includes(x)).length <= 1, { message: 'Máximo 1 tag de estação (verao/inverno/primavera/outono)' })
    .refine(t => t.filter(x => exports.OCCASION_TAGS.includes(x)).length <= 1, { message: 'Máximo 1 tag de ocasião (formal/casual/esportes)' })
    .refine(t => t.filter(x => exports.TIME_TAGS.includes(x)).length <= 1, { message: 'Máximo 1 tag de horário (diurno/noturno)' })
    .refine(t => new Set(t).size === t.length, { message: 'Tags duplicadas não são permitidas' });
const LookPieceSchema = zod_1.z.object({
    cat: zod_1.z.string(),
    pieceId: zod_1.z.string().min(1),
});
exports.LookCreateSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    title: zod_1.z.string().min(1),
    tags: tagsSchema.default([]),
    formality: zod_1.z.number().int().min(1).max(5).default(1),
    tip: zod_1.z.string().default(''),
    notes: zod_1.z.string().default(''),
    pieces: zod_1.z.array(LookPieceSchema).default([]),
});
exports.LookUpdateSchema = exports.LookCreateSchema.partial().omit({ id: true });
// ── Wishlist ──────────────────────────────────────────────────────────────────
exports.WishlistCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    category: zod_1.z.string().default(''),
    brand: zod_1.z.string().default(''),
    price: zod_1.z.number().positive().nullable().optional(),
    priority: zod_1.z.number().int().min(1).max(3).default(2),
    notes: zod_1.z.string().default(''),
    link: zod_1.z.string().default(''),
    purchased: zod_1.z.boolean().default(false),
});
exports.WishlistUpdateSchema = exports.WishlistCreateSchema.partial().extend({
    purchasedAt: zod_1.z.coerce.date().optional().nullable(),
});
// ── Hidden ────────────────────────────────────────────────────────────────────
exports.HiddenSchema = zod_1.z.object({
    hidden: zod_1.z.boolean(),
});
// ── Rating ────────────────────────────────────────────────────────────────────
exports.RatingSchema = zod_1.z.object({
    rating: zod_1.z.number().int().min(0).max(10),
});
