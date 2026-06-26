import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import { useLooks } from '../../hooks/useLooks'
import { useNotes } from '../../hooks/useNotes'

export function usePecaPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') navigate(-1) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const { allPieces, toggleHidden, loading: loadingPieces } = usePieces()
  const { looks, loading: loadingLooks } = useLooks()

  const piece = allPieces.find(p => p.id === id)
  const notes = useNotes('piece', piece?.id ?? '', piece?.notes)

  const pieceLooks = piece
    ? looks.filter(l => l.pieces.some(lp => lp.pieceId === piece.id))
    : []

  return {
    navigate,
    piece,
    pieceLooks,
    loading: loadingPieces || loadingLooks,
    notes,
    toggleHidden,
  }
}
