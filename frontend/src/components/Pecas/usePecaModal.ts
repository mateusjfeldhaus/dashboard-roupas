import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLooks } from '../../hooks/useLooks'
import { useNotes } from '../../hooks/useNotes'
import type { Piece } from '@data/types'

export function usePecaModal(piece: Piece, onClose: () => void) {
  const navigate = useNavigate()
  const { looks } = useLooks()
  const { notes, status: notesStatus, setNotes } = useNotes('piece', piece.id, piece.notes)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const pieceLooks = looks.filter(l => l.pieces.some(lp => lp.pieceId === piece.id))

  function navigateToLook(lookId: string) {
    navigate(`/looks/${lookId}`)
    onClose()
  }

  return { notes, notesStatus, setNotes, pieceLooks, navigateToLook }
}
