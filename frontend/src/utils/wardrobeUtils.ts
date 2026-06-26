/**
 * Fisher-Yates shuffle determinístico com LCG seed.
 * Máscara 0x7fffffff garante s sempre positivo (sem Math.abs).
 */
export function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr]
  let s = (seed + 1) * 1664525 + 1013904223
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0x7fffffff
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export interface UsageRecord { lookId: string; date: string }

/**
 * Calcula streak atual e máximo a partir de um array de registros de uso.
 * Considera sequência como dias consecutivos com pelo menos um uso.
 */
export function calcStreak(records: UsageRecord[]): { current: number; max: number } {
  if (records.length === 0) return { current: 0, max: 0 }
  const days = [...new Set(records.map(r => r.date))].sort()
  let max = 1; let cur = 1
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1]); const curr = new Date(days[i])
    const diff = (curr.getTime() - prev.getTime()) / 86400000
    if (diff === 1) { cur++; max = Math.max(max, cur) }
    else cur = 1
  }
  const today = new Date().toISOString().split('T')[0]
  const yest  = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const last  = days[days.length - 1]
  const current = (last === today || last === yest) ? cur : 0
  return { current, max }
}

/**
 * Remove acentos de uma string de categoria para uso como chave em CAT_ORDER.
 */
export function catKey(cat: string) {
  return cat.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * Mapa de prioridade para ordenar peças dentro de um look.
 * Chaves sem acento — usar com catKey().
 */
export const CAT_ORDER: Record<string, number> = {
  'Terno': 0, 'Costume': 0, 'Blazer': 1, 'Sueter': 2, 'Jaqueta': 3,
  'Camisa': 4, 'Polo': 4, 'Camiseta': 4,
  'Calca': 5, 'Cinto': 6, 'Sapato': 7,
  'Gravata': 8, 'Relogio': 9, 'Acessorio': 10,
}

/** Formata data ISO (YYYY-MM-DD) para exibição em pt-BR (DD/MM/YYYY). */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}
