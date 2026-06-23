import { z } from 'zod'

// ── Piece ─────────────────────────────────────────────────────────────────────

const PIECE_CATEGORIES = [
  'Camisa', 'Calça', 'Blazer', 'Costume', 'Terno', 'Sapato',
  'Cinto', 'Gravata', 'Relógio', 'Suéter', 'Polo', 'Camiseta',
  'Jaqueta', 'Acessório',
] as const

export const PieceCreateSchema = z.object({
  id:       z.string().min(1),
  name:     z.string().min(1),
  brand:    z.string().default(''),
  category: z.enum(PIECE_CATEGORIES),
  img:      z.string().default(''),
  color:    z.string().default(''),
  tips:     z.array(z.string()).default([]),
  notes:    z.string().default(''),
})

export const PieceUpdateSchema = PieceCreateSchema.partial().omit({ id: true })

export const NotesSchema = z.object({
  notes: z.string(),
})

// ── Look ──────────────────────────────────────────────────────────────────────

const LOOK_TAGS = [
  'formal', 'casual', 'esportes', 'diurno', 'noturno',
  'verao', 'inverno', 'primavera', 'outono',
] as const

const LookPieceSchema = z.object({
  cat:     z.string(),
  pieceId: z.string().min(1),
})

export const LookCreateSchema = z.object({
  id:        z.string().min(1),
  title:     z.string().min(1),
  tags:      z.array(z.enum(LOOK_TAGS)).default([]),
  formality: z.number().int().min(1).max(5).default(1),
  tip:       z.string().default(''),
  notes:     z.string().default(''),
  pieces:    z.array(LookPieceSchema).default([]),
})

export const LookUpdateSchema = LookCreateSchema.partial().omit({ id: true })

// ── Wishlist ──────────────────────────────────────────────────────────────────

export const WishlistCreateSchema = z.object({
  name:      z.string().min(1),
  category:  z.string().default(''),
  brand:     z.string().default(''),
  price:     z.number().positive().nullable().optional(),
  priority:  z.number().int().min(1).max(3).default(2),
  notes:     z.string().default(''),
  link:      z.string().default(''),
  purchased: z.boolean().default(false),
})

export const WishlistUpdateSchema = WishlistCreateSchema.partial()

// ── Rating ────────────────────────────────────────────────────────────────────

export const RatingSchema = z.object({
  rating: z.number().int().min(0).max(10),
})
