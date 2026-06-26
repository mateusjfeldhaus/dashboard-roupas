"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookPhotos = exports.wishlistItems = exports.ratings = exports.usageRecords = exports.lookPieces = exports.looks = exports.pieces = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// ── Pieces ────────────────────────────────────────────────────────────────────
exports.pieces = (0, pg_core_1.pgTable)('pieces', {
    id: (0, pg_core_1.text)('id').primaryKey(), // e.g. "camisa-branca-oxford"
    name: (0, pg_core_1.text)('name').notNull(),
    brand: (0, pg_core_1.text)('brand').notNull().default(''),
    category: (0, pg_core_1.text)('category').notNull(), // PieceCategory
    img: (0, pg_core_1.text)('img').notNull().default(''), // filename in /img/
    color: (0, pg_core_1.text)('color').notNull().default(''),
    tips: (0, pg_core_1.text)('tips').array().notNull().default([]),
    notes: (0, pg_core_1.text)('notes').notNull().default(''),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
// ── Looks ─────────────────────────────────────────────────────────────────────
exports.looks = (0, pg_core_1.pgTable)('looks', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    title: (0, pg_core_1.text)('title').notNull(),
    tags: (0, pg_core_1.text)('tags').array().notNull().default([]),
    formality: (0, pg_core_1.integer)('formality').notNull().default(1), // 1–5
    tip: (0, pg_core_1.text)('tip').notNull().default(''),
    notes: (0, pg_core_1.text)('notes').notNull().default(''),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
// ── Look → Pieces (join table) ────────────────────────────────────────────────
exports.lookPieces = (0, pg_core_1.pgTable)('look_pieces', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    lookId: (0, pg_core_1.text)('look_id').notNull().references(() => exports.looks.id, { onDelete: 'cascade' }),
    pieceId: (0, pg_core_1.text)('piece_id').notNull().references(() => exports.pieces.id, { onDelete: 'cascade' }),
    cat: (0, pg_core_1.text)('cat').notNull().default(''), // display category label in that look
});
// ── Usage records ─────────────────────────────────────────────────────────────
exports.usageRecords = (0, pg_core_1.pgTable)('usage_records', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    lookId: (0, pg_core_1.text)('look_id').notNull().references(() => exports.looks.id, { onDelete: 'cascade' }),
    date: (0, pg_core_1.text)('date').notNull(), // YYYY-MM-DD
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
// ── Ratings ───────────────────────────────────────────────────────────────────
exports.ratings = (0, pg_core_1.pgTable)('ratings', {
    lookId: (0, pg_core_1.text)('look_id').primaryKey().references(() => exports.looks.id, { onDelete: 'cascade' }),
    rating: (0, pg_core_1.integer)('rating').notNull(), // 1–5
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
});
// ── Wishlist ──────────────────────────────────────────────────────────────────
exports.wishlistItems = (0, pg_core_1.pgTable)('wishlist_items', {
    id: (0, pg_core_1.text)('id').primaryKey(), // nanoid gerado no backend
    name: (0, pg_core_1.text)('name').notNull(),
    category: (0, pg_core_1.text)('category').notNull().default(''),
    brand: (0, pg_core_1.text)('brand').notNull().default(''),
    price: (0, pg_core_1.real)('price'), // nullable
    priority: (0, pg_core_1.integer)('priority').notNull().default(2), // 1=alta 2=média 3=baixa
    notes: (0, pg_core_1.text)('notes').notNull().default(''),
    link: (0, pg_core_1.text)('link').notNull().default(''),
    purchased: (0, pg_core_1.boolean)('purchased').notNull().default(false),
    purchasedAt: (0, pg_core_1.timestamp)('purchased_at'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
// ── Look photos ───────────────────────────────────────────────────────────────
exports.lookPhotos = (0, pg_core_1.pgTable)('look_photos', {
    id: (0, pg_core_1.text)('id').primaryKey(), // nanoid — ID único para uso futuro
    lookId: (0, pg_core_1.text)('look_id').notNull().unique().references(() => exports.looks.id, { onDelete: 'cascade' }),
    mimeType: (0, pg_core_1.text)('mime_type').notNull().default('image/jpeg'),
    data: (0, pg_core_1.text)('data').notNull(), // base64 da imagem
    uploadedAt: (0, pg_core_1.timestamp)('uploaded_at').notNull().defaultNow(),
});
