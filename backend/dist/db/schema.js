"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookPhotos = exports.wishlistItems = exports.ratings = exports.usageRecords = exports.lookPieces = exports.looks = exports.pieces = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// ── Pieces ────────────────────────────────────────────────────────────────────
exports.pieces = (0, pg_core_1.pgTable)('pieces', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    brand: (0, pg_core_1.text)('brand').notNull().default(''),
    category: (0, pg_core_1.text)('category').notNull(),
    img: (0, pg_core_1.text)('img').notNull().default(''),
    color: (0, pg_core_1.text)('color').notNull().default(''),
    tips: (0, pg_core_1.text)('tips').array().notNull().default([]),
    notes: (0, pg_core_1.text)('notes').notNull().default(''),
    hidden: (0, pg_core_1.boolean)('hidden').notNull().default(false),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
// ── Looks ─────────────────────────────────────────────────────────────────────
exports.looks = (0, pg_core_1.pgTable)('looks', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    title: (0, pg_core_1.text)('title').notNull(),
    tags: (0, pg_core_1.text)('tags').array().notNull().default([]),
    formality: (0, pg_core_1.integer)('formality').notNull().default(1),
    tip: (0, pg_core_1.text)('tip').notNull().default(''),
    notes: (0, pg_core_1.text)('notes').notNull().default(''),
    hidden: (0, pg_core_1.boolean)('hidden').notNull().default(false),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
// ── Look → Pieces (join table) ────────────────────────────────────────────────
exports.lookPieces = (0, pg_core_1.pgTable)('look_pieces', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    lookId: (0, pg_core_1.text)('look_id').notNull().references(() => exports.looks.id, { onDelete: 'cascade' }),
    pieceId: (0, pg_core_1.text)('piece_id').notNull().references(() => exports.pieces.id, { onDelete: 'cascade' }),
    cat: (0, pg_core_1.text)('cat').notNull().default(''),
});
// ── Usage records ─────────────────────────────────────────────────────────────
exports.usageRecords = (0, pg_core_1.pgTable)('usage_records', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    lookId: (0, pg_core_1.text)('look_id').notNull().references(() => exports.looks.id, { onDelete: 'cascade' }),
    date: (0, pg_core_1.text)('date').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
// ── Ratings ───────────────────────────────────────────────────────────────────
exports.ratings = (0, pg_core_1.pgTable)('ratings', {
    lookId: (0, pg_core_1.text)('look_id').primaryKey().references(() => exports.looks.id, { onDelete: 'cascade' }),
    rating: (0, pg_core_1.integer)('rating').notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
});
// ── Wishlist ──────────────────────────────────────────────────────────────────
exports.wishlistItems = (0, pg_core_1.pgTable)('wishlist_items', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    category: (0, pg_core_1.text)('category').notNull().default(''),
    brand: (0, pg_core_1.text)('brand').notNull().default(''),
    price: (0, pg_core_1.real)('price'),
    priority: (0, pg_core_1.integer)('priority').notNull().default(2),
    notes: (0, pg_core_1.text)('notes').notNull().default(''),
    link: (0, pg_core_1.text)('link').notNull().default(''),
    purchased: (0, pg_core_1.boolean)('purchased').notNull().default(false),
    purchasedAt: (0, pg_core_1.timestamp)('purchased_at'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
// ── Look photos — URL no Supabase Storage ─────────────────────────────────────
// uploaded_at usa timestamptz pois foi criado assim no Neon originalmente
exports.lookPhotos = (0, pg_core_1.pgTable)('look_photos', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    lookId: (0, pg_core_1.text)('look_id').notNull().references(() => exports.looks.id, { onDelete: 'cascade' }),
    url: (0, pg_core_1.text)('url').notNull().default(''),
    uploadedAt: (0, pg_core_1.timestamp)('uploaded_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [(0, pg_core_1.unique)('look_photos_look_id_unique').on(t.lookId)]);
