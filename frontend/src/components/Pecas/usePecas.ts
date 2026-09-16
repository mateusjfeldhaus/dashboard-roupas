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

export type ColorFamilyGroup    = { family: number; label: string; pieces: Piece[] }
export type CategoryColorGroup  = { category: string; groups: ColorFamilyGroup[] }

// Persistir seleção entre navegações
let _selectedCat: PieceCategory | 'Todas' = 'Todas'
let _sortByColor = false

export function usePecas() {
  const navigate = useNavigate()
  const { pieces, loading, invalidate, patchItems } = usePieces()
  const [selectedCat, setSelectedCatState]    = useState<PieceCategory | 'Todas'>(_selectedCat)
  const [sortByColor, setSortByColorState]    = useState(_sortByColor)
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

  // Agrupado por categoria → sub-grupos por família de cor
  // (usado no modo 🎨 Cor com drag-and-drop)
  const categoryColorGroups: CategoryColorGroup[] = (() => {
    if (!sortByColor) return []

    const cats = selectedCat === 'Todas'
      ? categories.filter(c => piecesWithLocal.some(p => p.category === c))
      : ([selectedCat] as string[])

    return cats.map(cat => {
      const catPieces = sortPiecesByColor(piecesWithLocal.filter(p => p.category === cat))
      const groups: ColorFamilyGroup[] = []
      for (const piece of catPieces) {
        const fam = colorFamily(piece.color)
        let g = groups.find(x => x.family === fam)
        if (!g) {
          g = { family: fam, label: FAMILY_LABELS[fam] ?? 'Outros', pieces: [] }
          groups.push(g)
        }
        g.pieces.push(piece)
      }
      return { category: cat, groups }
    }).filter(c => c.groups.length > 0)
  })()

  async function reorderGroup(newGroupPieces: Piece[]) {
    // Atribui sortOrder para TODAS as peças do grupo (1000, 2000, 3000…)
    const updates: Record<string, number> = {}
    newGroupPieces.forEach((p, i) => { updates[p.id] = (i + 1) * 1000 })

    // 1. Atualização otimista imediata (visual instantâneo)
    setLocalSortOrders(prev => ({ ...prev, ...updates }))

    // 2. Persistir no servidor
    try {
      await api.patch('/api/pieces/reorder', {
        items: Object.entries(updates).map(([id, sortOrder]) => ({ id, sortOrder })),
      })

      // 3. Atualizar cache diretamente — sem flash nem re-fetch
      patchItems(items => items.map(p => {
        const so = updates[p.id]
        return so !== undefined ? { ...p, sortOrder: so } as Piece : p
      }))

      // 4. Limpar overrides locais (cache agora tem os valores corretos)
      setLocalSortOrders(prev => {
        const next = { ...prev }
        Object.keys(updates).forEach(id => delete next[id])
        return next
      })
    } catch {
      // Manter estado local em caso de erro
    }
  }

  return {
    navigate, pieces: piecesWithLocal, loading,
    selectedCat, setSelectedCat, visibleCats, categories,
    sortByColor, toggleSortByColor,
    categoryColorGroups,
    reorderGroup,
    invalidate,
  }
}
