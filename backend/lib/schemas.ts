import { z } from 'zod'

// ── Piece ─────────────────────────────────────────────────────────────────────

const PIECE_CATEGORIES = [
  'Camisa', 'Calça', 'Blazer', 'Colete', 'Sapato',
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

export const SEASON_TAGS   = ['verao', 'inverno', 'primavera', 'outono'] as const
export const OCCASION_TAGS = ['formal', 'casual', 'esportes']            as const
export const TIME_TAGS     = ['diurno', 'noturno']                       as const
const LOOK_TAGS = [...SEASON_TAGS, ...OCCASION_TAGS, ...TIME_TAGS] as const

/**
 * Regras rígidas de tags:
 *  - no máximo 1 tag de estação  (verao | inverno | primavera | outono)
 *  - no máximo 1 tag de ocasião  (formal | casual | esportes)
 *  - no máximo 1 tag de horário  (diurno | noturno)
 *  - sem duplicatas
 */
const tagsSchema = z.array(z.enum(LOOK_TAGS))
  .refine(
    t => t.filter(x => (SEASON_TAGS   as readonly string[]).includes(x)).length <= 1,
    { message: 'Máximo 1 tag de estação (verao/inverno/primavera/outono)' }
  )
  .refine(
    t => t.filter(x => (OCCASION_TAGS as readonly string[]).includes(x)).length <= 1,
    { message: 'Máximo 1 tag de ocasião (formal/casual/esportes)' }
  )
  .refine(
    t => t.filter(x => (TIME_TAGS     as readonly string[]).includes(x)).length <= 1,
    { message: 'Máximo 1 tag de horário (diurno/noturno)' }
  )
  .refine(
    t => new Set(t).size === t.length,
    { message: 'Tags duplicadas não são permitidas' }
  )

const LookPieceSchema = z.object({
  cat:     z.string(),
  pieceId: z.string().min(1),
})

export const LookCreateSchema = z.object({
  id:        z.string().min(1),
  title:     z.string().min(1),
  tags:      tagsSchema.default([]),
  formality: z.number().int().min(1).max(5).default(1),
  tip:       z.string().default(''),
  notes:     z.string().default(''),
  pieces:    z.array(LookPieceSchema).default([]),
})

export const LookUpdateSchema = LookCreateSchema.partial().omit({ id: true })

// ── Wishlist ──────────────────────────────────────────────────────────────────

export const WishlistCreateSchema = z.object({
  name:     z.string().min(1),
  category: z.string().default(''),
  brand:    z.string().default(''),
  price:    z.number().positive().nullable().optional(),
  priority: z.number().int().min(1).max(3).default(2),
  notes:    z.string().default(''),
  link:     z.string().default(''),
})

export const WishlistUpdateSchema = WishlistCreateSchema.partial().extend({
  purchased:   z.boolean().optional(),
  purchasedAt: z.coerce.date().optional(),
})

// ── Rating ────────────────────────────────────────────────────────────────────

export const RatingSchema = z.object({
  rating: z.number().int().min(0).max(10),
})

// ── Hidden ────────────────────────────────────────────────────────────────────

export const HiddenSchema = z.object({
  hidden: z.boolean(),
})
