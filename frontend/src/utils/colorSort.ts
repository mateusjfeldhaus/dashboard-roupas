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
  if (h >= 330 || h <= 20)           return 1  // rosa / vermelho
  if (h > 185 && h <= 270)           return 2  // azul
  if (h > 20  && h <= 75)            return 3  // amarelo / laranja / marrom
  if (h > 75  && h <= 185)           return 4  // verde
  return 5                                      // roxo e outros
}

export function colorSortKey(hex: string): number {
  const { h, s, l } = hexToHsl(hex)

  // 1ª chave: família da paleta (exato) ou fallback por hue
  const entry = paletteFor(hex)
  const family = entry ? entry.family : familyFromHsl(h, s, l)

  // 2ª chave: luminosidade do hex — do mais claro (l≈1) ao mais escuro (l≈0)
  const secondary = Math.round((1 - l) * 999)

  return family * 10_000 + secondary
}

export function sortByColor<T extends { color: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => colorSortKey(a.color) - colorSortKey(b.color))
}
