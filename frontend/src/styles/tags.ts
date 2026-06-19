/**
 * Fonte única de verdade para metadados de tags.
 * Todos os componentes devem importar daqui — nunca hardcodar label/emoji/color.
 */

// ── Estações ──────────────────────────────────────────────────────────────────

export const SEASONS = [
  { tag: 'verao',     label: 'Verão',     emoji: '☀️', color: '#f59e0b' },
  { tag: 'outono',    label: 'Outono',    emoji: '🍂', color: '#c2783c' },
  { tag: 'inverno',   label: 'Inverno',   emoji: '❄️', color: '#5b9bd5' },
  { tag: 'primavera', label: 'Primavera', emoji: '🌸', color: '#ec6fa7' },
] as const

export type SeasonTag = typeof SEASONS[number]['tag']

/** Retorna metadados de uma estação pelo tag */
export function getSeason(tag: string) {
  return SEASONS.find(s => s.tag === tag)
}

// ── Ocasiões ──────────────────────────────────────────────────────────────────

export const OCCASIONS = [
  { tag: 'formal',   label: 'Formal'   },
  { tag: 'casual',   label: 'Casual'   },
  { tag: 'diurno',   label: 'Diurno'   },
  { tag: 'noturno',  label: 'Noturno'  },
  { tag: 'esportes', label: 'Esportes' },
] as const

export type OccasionTag = typeof OCCASIONS[number]['tag']

// ── Lookup map (tag → label) para todos os tags ───────────────────────────────

export const TAG_LABELS: Record<string, string> = {
  ...Object.fromEntries(SEASONS.map(s => [s.tag, s.label])),
  ...Object.fromEntries(OCCASIONS.map(o => [o.tag, o.label])),
}
