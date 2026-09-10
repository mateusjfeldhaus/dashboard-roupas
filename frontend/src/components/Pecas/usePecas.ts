import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import { sortByColor as sortPiecesByColor } from '../../utils/colorSort'
import type { PieceCategory } from '@data/types'

export const categories: PieceCategory[] = [
  'Camisa', 'Calça', 'Blazer', 'Colete',
  'Sapato', 'Relógio', 'Gravata', 'Cinto', 'Suéter',
  'Polo', 'Camiseta', 'Jaqueta', 'Acessório', 'Perfume',
]

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

    const colorSortedPieces = sortByColor
    ? sortPiecesByColor(pieces.filter(p => selectedCat === 'Todas' || p.category === selectedCat))
    : []

  return {
    navigate, pieces, loading,
    selectedCat, setSelectedCat, visibleCats, categories,
    sortByColor, toggleSortByColor, colorSortedPieces,
  }
}
