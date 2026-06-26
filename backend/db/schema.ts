import {
  pgTable, text, integer, boolean, timestamp, serial, real, unique,
} from 'drizzle-orm/pg-core'

// ── Pieces ────────────────────────────────────────────────────────────────────

export const pieces = pgTable('pieces', {
  id:        text('id').primaryKey(),
  name:      text('name').notNull(),
  brand:     text('brand').notNull().default(''),
  category:  text('category').notNull(),
  img:       text('img').notNull().default(''),
  color:     text('color').notNull().default(''),
  tips:      text('tips').array().notNull().default([]),
  notes:     text('notes').notNull().default(''),
  hidden:    boolean('hidden').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ── Looks ─────────────────────────────────────────────────────────────────────

export const looks = pgTable('looks', {
  id:        text('id').primaryKey(),
  title:     text('title').notNull(),
  tags:      text('tags').array().notNull().default([]),
  formality: integer('formality').notNull().default(1),
  tip:       text('tip').notNull().default(''),
  notes:     text('notes').notNull().default(''),
  hidden:    boolean('hidden').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ── Look → Pieces (join table) ────────────────────────────────────────────────

export const lookPieces = pgTable('look_pieces', {
  id:      serial('id').primaryKey(),
  lookId:  text('look_id').notNull().references(() => looks.id, { onDelete: 'cascade' }),
  pieceId: text('piece_id').notNull().references(() => pieces.id, { onDelete: 'cascade' }),
  cat:     text('cat').notNull().default(''),
})

// ── Usage records ─────────────────────────────────────────────────────────────

export const usageRecords = pgTable('usage_records', {
  id:        serial('id').primaryKey(),
  lookId:    text('look_id').notNull().references(() => looks.id, { onDelete: 'cascade' }),
  date:      text('date').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ── Ratings ───────────────────────────────────────────────────────────────────

export const ratings = pgTable('ratings', {
  lookId:    text('look_id').primaryKey().references(() => looks.id, { onDelete: 'cascade' }),
  rating:    integer('rating').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// ── Wishlist ──────────────────────────────────────────────────────────────────

export const wishlistItems = pgTable('wishlist_items', {
  id:          text('id').primaryKey(),
  name:        text('name').notNull(),
  category:    text('category').notNull().default(''),
  brand:       text('brand').notNull().default(''),
  price:       real('price'),
  priority:    integer('priority').notNull().default(2),
  notes:       text('notes').notNull().default(''),
  link:        text('link').notNull().default(''),
  purchased:   boolean('purchased').notNull().default(false),
  purchasedAt: timestamp('purchased_at'),
  createdAt:   timestamp('created_at').notNull().defaultNow(),
})

// ── Look photos — URL no Supabase Storage ─────────────────────────────────────
// uploaded_at usa timestamptz pois foi criado assim no Neon originalmente

export const lookPhotos = pgTable('look_photos', {
  id:         text('id').primaryKey(),
  lookId:     text('look_id').notNull().references(() => looks.id, { onDelete: 'cascade' }),
  url:        text('url').notNull().default(''),
  uploadedAt: timestamp('uploaded_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [unique('look_photos_look_id_unique').on(t.lookId)])

// ── Types ─────────────────────────────────────────────────────────────────────

export type Piece        = typeof pieces.$inferSelect
export type PieceInsert  = typeof pieces.$inferInsert
export type Look         = typeof looks.$inferSelect
export type LookInsert   = typeof looks.$inferInsert
export type LookPiece    = typeof lookPieces.$inferSelect
export type UsageRecord  = typeof usageRecords.$inferSelect
export type Rating       = typeof ratings.$inferSelect
export type WishlistItem = typeof wishlistItems.$inferSelect
export type LookPhoto    = typeof lookPhotos.$inferSelect
