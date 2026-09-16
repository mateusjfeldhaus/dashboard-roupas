import { paletteFor } from './colorPalette'

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  if (!hex || !hex.startsWith('#') || hex.length < 7) return { h: 0, s: 0, l: 0 }
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r)      h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else                h = ((r - g) / d + 4) / 6
  return { h: h * 360, s, l }
}

/** Família de cor por hue/saturation — fallback para hexes fora da paleta */
function familyFromHsl(h: number, s: number, l: number): number {
  if (s < 0.12) return l > 0.65 ? 0 : 6
  if (h >= 330 || h <= 20)  return 1  // rosa / vermelho
  if (h > 185 && h <= 270)  return 2  // azul
  if (h > 20  && h <= 75)   return 3  // amarelo / laranja / marrom
  if (h > 75  && h <= 185)  return 4  // verde
  return 5                             // roxo e outros
}

/** Família da cor: 0–6. Usa paleta exata; fallback por HSL. */
export function colorFamily(hex: string): number {
  const entry = paletteFor(hex)
  if (entry) return entry.family
  const { h, s, l } = hexToHsl(hex)
  return familyFromHsl(h, s, l)
}

function luminosityKey(hex: string): number {
  const { l } = hexToHsl(hex)
  return Math.round((1 - l) * 999)
}

/** Chave combinada família + luminosidade (retrocompat — usada em Overview) */
export function colorSortKey(hex: string): number {
  return colorFamily(hex) * 10_000 + luminosityKey(hex)
}

/**
 * Ordena por:
 *  1. Família de cor (Branca → Rosa → Azul → Amarelo → Verde → Roxo → Escuro)
 *  2. sortOrder manual (quando definido pelo drag-and-drop)
 *  3. Luminosidade (fallback para peças sem sortOrder)
 */
export function sortByColor<T extends { color: string; sortOrder?: number | null }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const famA = colorFamily(a.color)
    const famB = colorFamily(b.color)
    if (famA !== famB) return famA - famB

    // Dentro da mesma família: sortOrder tem prioridade
    const orderA = a.sortOrder ?? Infinity
    const orderB = b.sortOrder ?? Infinity
    if (orderA !== orderB) return orderA - orderB

    // Fallback: luminosidade (claro → escuro)
    return luminosityKey(a.color) - luminosityKey(b.color)
  })
}
