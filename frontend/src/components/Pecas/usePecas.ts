import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import type { PieceCategory } from '@data/types'

export const categories: PieceCategory[] = [
  'Camisa', 'Calça', 'Blazer', 'Colete', 'Costume', 'Terno',
  'Sapato', 'Relógio', 'Gravata', 'Cinto', 'Suéter',
  'Polo', 'Camiseta', 'Jaqueta', 'Acessório',
]

// Persiste a categoria selecionada entre navegações (PecaPage → voltar)
let _selectedCat: PieceCategory | 'Todas' = 'Todas'

export function usePecas() {
  const navigate = useNavigate()
  const { pieces, loading } = usePieces()
  const [selectedCat, setSelectedCatState] = useState<PieceCategory | 'Todas'>(_selectedCat)

  function setSelectedCat(cat: PieceCategory | 'Todas') {
    _selectedCat = cat
    setSelectedCatState(cat)
  }

  const visibleCats = selectedCat === 'Todas'
    ? categories.filter(c => pieces.some(p => p.category === c))
    : [selectedCat]

  return { navigate, pieces, loading, selectedCat, setSelectedCat, visibleCats, categories }
}
