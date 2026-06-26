import { useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'

export function usePecasDescartadas() {
  const navigate = useNavigate()
  const { allPieces, toggleHidden } = usePieces()
  const hidden = allPieces.filter(p => p.hidden)

  return { navigate, hidden, toggleHidden }
}
