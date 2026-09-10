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

export function colorSortKey(hex: string): number {
  const { h, l } = hexToHsl(hex)
  // Primário: lightness (claro → escuro) · Secundário: hue (agrupa tons similares)
  return Math.round((1 - l) * 10_000) + h
}

export function sortByColor<T extends { color: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => colorSortKey(a.color) - colorSortKey(b.color))
}
