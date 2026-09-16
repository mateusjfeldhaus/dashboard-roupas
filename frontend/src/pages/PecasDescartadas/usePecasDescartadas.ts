import { useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import api from '../../api/client'

export function usePecasDescartadas() {
  const navigate = useNavigate()
  const { allPieces, toggleHidden, invalidate } = usePieces()
  const hidden = allPieces.filter(p => p.hidden)

  async function deletePiece(id: string) {
    await api.delete(`/api/pieces/${encodeURIComponent(id)}`)
    invalidate()
  }

  return { navigate, hidden, toggleHidden, deletePiece }
}
