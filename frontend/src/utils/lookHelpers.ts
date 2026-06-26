export const CAT_ORDER: Record<string, number> = {
  'Terno': 0, 'Costume': 0, 'Blazer': 1, 'Sueter': 2,
  'Camisa': 3, 'Polo': 3, 'Camiseta': 3,
  'Calca': 4, 'Cinto': 5, 'Sapato': 6,
  'Gravata': 7, 'Relogio': 8, 'Jaqueta': 9, 'Acessorio': 10,
}

export function catKey(cat: string) {
  return cat.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function photoUrl(lookId: string) {
  const base = import.meta.env.VITE_API_URL ?? ''
  return `${base}/api/photos/${encodeURIComponent(lookId)}`
}
