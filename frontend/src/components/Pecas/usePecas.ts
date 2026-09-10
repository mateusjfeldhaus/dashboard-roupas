import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import type { PieceCategory } from '@data/types'

export const categories: PieceCategory[] = [
  'Camisa', 'Calça', 'Blazer', 'Colete',
  'Sapato', 'Relógio', 'Gravata', 'Cinto', 'Suéter',
  'Polo', 'Camiseta', 'Jaqueta', 'Acessório', 'Perfume',
]

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

function colorSortKey(hex: string): number {
  const { h, s, l } = hexToHsl(hex)  
  if (s < 0.12) return 1000000 + (1 - l) * 1000  
  return h * 1000 + (1 - l) * 100
}

let _selectedCat: PieceCategory | 'Todas' = 'Todas'
let _sortByColor = false

export function usePecas() {
  const navigate = useNavigate()
  const { pieces, loading } = usePieces()
  const [selectedCat, setSelectedCatState] = useState<PieceCategory | 'Todas'>(_selectedCat)
  const [sortByColor, setSortByColorState] = useState(_sortByColor)

  function setSelectedCat(cat: PieceCategory | 'Todas') {
    _selectedCat = cat
    setSelectedCatState(cat)
  }

  function toggleSortByColor() {
    _sortByColor = !_sortByColor
    setSortByColorState(_sortByColor)
  }

  const visibleCats = selectedCat === 'Todas'
    ? categories.filter(c => pieces.some(p => p.category === c))
    : [selectedCat]

  // Grid plano ordenado por cor (quando sortByColor ativo)
  const colorSortedPieces = sortByColor
    ? [...pieces]
        .filter(p => selectedCat === 'Todas' || p.category === selectedCat)
        .sort((a, b) => colorSortKey(a.color) - colorSortKey(b.color))
    : []

  return {
    navigate, pieces, loading,
    selectedCat, setSelectedCat, visibleCats, categories,
    sortByColor, toggleSortByColor, colorSortedPieces,
  }
}
