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
  const { h, s, l } = hexToHsl(hex)

  let family: number

  if (s < 0.12) {
    // Neutros: branca/bege claro → início | cinza/preta → final
    family = l > 0.65 ? 0 : 6
  } else if (h >= 330 || h <= 20) {
    // Rosa, vermelho, vinho — do mais claro (rosa bebê) ao mais escuro (vinho)
    family = 1
  } else if (h > 185 && h <= 270) {
    // Azul — do azul bebê ao azul marinho
    family = 2
  } else if (h > 20 && h <= 75) {
    // Amarelo, laranja, marrom
    family = 3
  } else if (h > 75 && h <= 185) {
    // Verde — do verde-limão ao verde-musgo
    family = 4
  } else {
    // Roxo (270–330) e outros
    family = 5
  }

  // Dentro de cada família: do mais claro (l alto) ao mais escuro (l baixo)
  const secondary = Math.round((1 - l) * 999)
  return family * 10_000 + secondary
}

export function sortByColor<T extends { color: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => colorSortKey(a.color) - colorSortKey(b.color))
}
