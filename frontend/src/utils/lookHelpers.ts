/**
 * Lista canônica de categorias na ordem de exibição preferida.
 * Use para ordenar arrays ou construir UIs de filtro.
 * Valores com acentos — batem com piece.category do banco.
 */
export const CAT_LIST = [
  'Terno','Costume','Blazer','Suéter','Jaqueta',
  'Camisa','Polo','Camiseta',
  'Calça','Cinto','Sapato',
  'Gravata','Relógio','Acessório',
] as const

export type PieceCat = typeof CAT_LIST[number]

/**
 * Plurais para exibição em UIs de filtro (ex.: Montar).
 */
export const CAT_LABELS: Record<string, string> = {
  'Camisa':'Camisas','Terno':'Ternos','Costume':'Costumes','Blazer':'Blazers',
  'Calça':'Calças','Sapato':'Sapatos','Gravata':'Gravatas','Polo':'Polos',
  'Camiseta':'Camisetas','Jaqueta':'Jaquetas','Suéter':'Suéteres',
  'Relógio':'Relógios','Cinto':'Cintos','Acessório':'Acessórios',
}

/**
 * Mapa de prioridade para ordenar peças dentro de um look (LookModal, LookPage).
 * Chaves sem acento — usar com catKey().
 */
export const CAT_ORDER: Record<string, number> = {
  'Terno': 0, 'Costume': 0, 'Blazer': 1, 'Sueter': 2, 'Jaqueta': 3,
  'Camisa': 4, 'Polo': 4, 'Camiseta': 4,
  'Calca': 5, 'Cinto': 6, 'Sapato': 7,
  'Gravata': 8, 'Relogio': 9, 'Acessorio': 10,
}

export function catKey(cat: string) {
  return cat.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function photoUrl(lookId: string) {
  const base = import.meta.env.VITE_API_URL ?? ''
  return `${base}/api/photos/${encodeURIComponent(lookId)}`
}
