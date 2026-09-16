import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import { colorFamily, sortByColor as sortPiecesByColor } from '../../utils/colorSort'
import { FAMILY_LABELS } from '../../utils/colorPalette'
import type { Piece, PieceCategory } from '@data/types'
import api from '../../api/client'

export const categories: PieceCategory[] = [
  'Camisa', 'Calça', 'Blazer', 'Colete',
  'Sapato', 'Relógio', 'Gravata', 'Cinto', 'Suéter',
  'Polo', 'Camiseta', 'Jaqueta', 'Acessório', 'Perfume',
]

export type ColorGroup = { family: number; label: string; pieces: Piece[] }

// Persistir seleção entre navegações
let _selectedCat: PieceCategory | 'Todas' = 'Todas'
let _sortByColor = false

export function usePecas() {
  const navigate = useNavigate()
  const { pieces, loading, invalidate } = usePieces()
  const [selectedCat, setSelectedCatState]  = useState<PieceCategory | 'Todas'>(_selectedCat)
  const [sortByColor, setSortByColorState]  = useState(_sortByColor)
  const [localSortOrders, setLocalSortOrders] = useState<Record<string, number>>({})

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

  // Aplica sortOrders locais (otimista) sobre os dados do servidor
  const piecesWithLocal: Piece[] = pieces.map(p => ({
    ...p,
    sortOrder: localSortOrders[p.id] ?? p.sortOrder ?? null,
  }))

  const filteredForColor = piecesWithLocal.filter(
    p => selectedCat === 'Todas' || p.category === selectedCat
  )

  const colorSortedPieces = sortByColor ? sortPiecesByColor(filteredForColor) : []

  // Agrupado por família para o modo drag-and-drop
  const colorGroupedPieces: ColorGroup[] = (() => {
    const groups: ColorGroup[] = []
    for (const piece of colorSortedPieces) {
      const fam = colorFamily(piece.color)
      let g = groups.find(x => x.family === fam)
      if (!g) {
        g = { family: fam, label: FAMILY_LABELS[fam] ?? 'Outros', pieces: [] }
        groups.push(g)
      }
      g.pieces.push(piece)
    }
    return groups
  })()

  async function reorderGroup(newGroupPieces: Piece[]) {
    // Atribuir sortOrder para TODAS as peças do grupo (1000, 2000, 3000...)
    const updates: Record<string, number> = {}
    newGroupPieces.forEach((p, i) => { updates[p.id] = (i + 1) * 1000 })

    // Atualização otimista imediata
    setLocalSortOrders(prev => ({ ...prev, ...updates }))

    // Persistir no servidor
    try {
      await api.patch('/api/pieces/reorder', {
        items: Object.entries(updates).map(([id, sortOrder]) => ({ id, sortOrder })),
      })
      invalidate()
    } catch {
      // Em caso de erro, manter o estado local (o usuário vê a ordem desejada)
    }
  }

  return {
    navigate, pieces: piecesWithLocal, loading,
    selectedCat, setSelectedCat, visibleCats, categories,
    sortByColor, toggleSortByColor,
    colorSortedPieces, colorGroupedPieces,
    reorderGroup,
    invalidate,
  }
}
