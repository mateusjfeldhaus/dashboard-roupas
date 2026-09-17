export interface PaletteColor {
  id: string
  name: string
  hex: string
  family: number
}

export const COLOR_PALETTE: PaletteColor[] = [
  // ── Família 0: Branca / Bege ────────────────────────────────────────────────
  { id: 'branco',    name: 'Branco',    hex: '#f5f5f5', family: 0 },
  { id: 'off-white', name: 'Off-white', hex: '#f0ece0', family: 0 },
  { id: 'creme',     name: 'Creme',     hex: '#f0e8d0', family: 0 },
  { id: 'areia',     name: 'Areia',     hex: '#c8a878', family: 0 },

    { id: 'rosa-claro',  name: 'Rosa Claro',  hex: '#f5c0ce', family: 1 },
  { id: 'salmao',      name: 'Salmão',      hex: '#f0907a', family: 1 },
  { id: 'rosa',        name: 'Rosa',        hex: '#e87090', family: 1 },
  { id: 'rosa-choque', name: 'Rosa Choque', hex: '#e0306a', family: 1 },
  { id: 'coral',       name: 'Coral',       hex: '#d84030', family: 1 },
  { id: 'vermelho',    name: 'Vermelho',    hex: '#cc2222', family: 1 },
  { id: 'vinho',       name: 'Vinho',       hex: '#6b1820', family: 1 },
  
  { id: 'azul-bebe',    name: 'Azul Bebê',    hex: '#b0d4f0', family: 2 },
  { id: 'azul-claro',   name: 'Azul Claro',   hex: '#6aacdf', family: 2 },
  { id: 'jeans',        name: 'Jeans',        hex: '#4e80b4', family: 2 },
  { id: 'azul',         name: 'Azul',         hex: '#3a72b8', family: 2 },
  { id: 'azul-escuro',  name: 'Azul Escuro',  hex: '#1e3d70', family: 2 },
  { id: 'azul-marinho', name: 'Azul Marinho', hex: '#0d1f40', family: 2 },

  { id: 'amarelo',        name: 'Amarelo',        hex: '#e8d040', family: 3 },
  { id: 'khaki',          name: 'Khaki',          hex: '#b8a870', family: 3 },
  { id: 'laranja',        name: 'Laranja',        hex: '#e88030', family: 3 },
  { id: 'caramelo',       name: 'Caramelo',       hex: '#c07830', family: 3 },
  { id: 'terracota',      name: 'Terracota',      hex: '#c04828', family: 3 },
  { id: 'laranja-escuro', name: 'Laranja Escuro', hex: '#a04818', family: 3 },
  { id: 'marrom',         name: 'Marrom',         hex: '#8b5020', family: 3 },
  { id: 'cafe',           name: 'Café',           hex: '#6b4228', family: 3 },

  { id: 'verde-claro',  name: 'Verde Claro',  hex: '#80cc60', family: 4 },
  { id: 'verde',        name: 'Verde',        hex: '#3a8040', family: 4 },
  { id: 'oliva',        name: 'Oliva',        hex: '#5a7832', family: 4 },
  { id: 'verde-escuro', name: 'Verde Escuro', hex: '#1a4020', family: 4 },

  { id: 'lilas',     name: 'Lilás',     hex: '#c080e0', family: 5 },
  { id: 'roxo',      name: 'Roxo',      hex: '#7030a0', family: 5 },
  { id: 'berinjela', name: 'Berinjela', hex: '#521060', family: 5 },

  { id: 'cinza-claro', name: 'Cinza Claro', hex: '#c0c0c0', family: 6 },
  { id: 'prata',       name: 'Prata',       hex: '#a8a8b0', family: 6 },
  { id: 'cinza',       name: 'Cinza',       hex: '#888888', family: 6 },
  { id: 'chumbo',      name: 'Chumbo',      hex: '#5a6070', family: 6 },
  { id: 'grafite',     name: 'Grafite',     hex: '#404040', family: 6 },
  { id: 'preto',       name: 'Preto',       hex: '#1a1a1a', family: 6 },
]

export function paletteFor(hex: string): PaletteColor | undefined {
  return COLOR_PALETTE.find(c => c.hex.toLowerCase() === hex.toLowerCase())
}

/** Label de cada família por índice (0–6) */
export const FAMILY_LABELS: Record<number, string> = {
  0: 'Branca / Bege',
  1: 'Rosa / Vermelho',
  2: 'Azul',
  3: 'Amarelo / Marrom',
  4: 'Verde',
  5: 'Roxo / Lilás',
  6: 'Cinza / Preto',
}

export const PALETTE_GROUPS: { label: string; colors: PaletteColor[] }[] = [
  { label: 'Branca / Bege',          colors: COLOR_PALETTE.filter(c => c.family === 0) },
  { label: 'Rosa / Vermelho',         colors: COLOR_PALETTE.filter(c => c.family === 1) },
  { label: 'Azul',                    colors: COLOR_PALETTE.filter(c => c.family === 2) },
  { label: 'Amarelo / Marrom',        colors: COLOR_PALETTE.filter(c => c.family === 3) },
  { label: 'Verde',                   colors: COLOR_PALETTE.filter(c => c.family === 4) },
  { label: 'Roxo / Lilás',            colors: COLOR_PALETTE.filter(c => c.family === 5) },
  { label: 'Cinza / Preto',           colors: COLOR_PALETTE.filter(c => c.family === 6) },
]
