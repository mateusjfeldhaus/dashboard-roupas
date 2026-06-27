/**
 * Lista canônica de categorias na ordem de exibição preferida.
 * Use para ordenar arrays ou construir UIs de filtro.
 * Valores com acentos — batem com piece.category do banco.
 */
export const CAT_LIST = [
  'Blazer','Colete','Suéter','Jaqueta',
  'Camisa','Polo','Camiseta',
  'Calça','Cinto','Sapato',
  'Gravata','Relógio','Acessório',
] as const

export type PieceCat = typeof CAT_LIST[number]

// Categorias que NÃO entram na checklist da cápsula de viagem
export const TRAVEL_EXCLUDED_CATS = new Set([
  'Relógio', 'Cinto', 'Gravata', 'Acessório',
])

/**
 * Plurais para exibição em UIs de filtro (ex.: Montar).
 */
export const CAT_LABELS: Record<string, string> = {
  'Camisa':'Camisas','Blazer':'Blazers','Colete':'Coletes',
  'Calça':'Calças','Sapato':'Sapatos','Gravata':'Gravatas','Polo':'Polos',
  'Camiseta':'Camisetas','Jaqueta':'Jaquetas','Suéter':'Suéteres',
  'Relógio':'Relógios','Cinto':'Cintos','Acessório':'Acessórios',
}

export function photoUrl(lookId: string) {
  const base = import.meta.env.VITE_API_URL ?? ''
  return `${base}/api/photos/${encodeURIComponent(lookId)}`
}

// Re-exporta para compatibilidade — fonte canônica é wardrobeUtils
export { catKey, CAT_ORDER } from './wardrobeUtils'
