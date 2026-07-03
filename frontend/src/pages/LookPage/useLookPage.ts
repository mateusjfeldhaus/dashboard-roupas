import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLooks } from '../../hooks/useLooks'
import { usePieces } from '../../hooks/usePieces'
import { useLookDetails, formatDate } from '../../hooks/useLookDetails'
import api from '../../api/client'
import type { Piece } from '@data/types'

export function useLookPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [editMode, setEditMode]       = useState(false)
  const [pendingPieces, setPending]   = useState<{ cat: string; pieceId: string }[]>([])
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [saving, setSaving]           = useState(false)

  // Fechar com Esc (só fora do modo de edição)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !editMode) navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, editMode])

  const { allLooks, toggleHidden, invalidate, loading: looksLoading } = useLooks()
  const { pieces } = usePieces()
  const look = allLooks.find(l => l.id === id)

  const d = useLookDetails(look)

  // ── Editar peças ────────────────────────────────────────────────────────────

  function startEdit() {
    setPending(look?.pieces.map(lp => ({ cat: lp.cat, pieceId: lp.pieceId })) ?? [])
    setEditMode(true)
  }

  function cancelEdit() {
    setEditMode(false)
    setConfirmOpen(false)
  }

  function togglePiece(piece: Piece) {
    const already = pendingPieces.some(lp => lp.pieceId === piece.id)
    if (already) {
      setPending(prev => prev.filter(lp => lp.pieceId !== piece.id))
    } else {
      setPending(prev => [...prev, { cat: piece.category, pieceId: piece.id }])
    }
  }

  async function confirmSave() {
    if (!look) return
    setSaving(true)
    try {
      await api.put(`/api/looks/${look.id}`, { pieces: pendingPieces })
      invalidate()
      setEditMode(false)
      setConfirmOpen(false)
    } finally {
      setSaving(false)
    }
  }

  return {
    navigate,
    look,
    pieces,
    piecesInLook: d.piecesInLook,
    looksLoading,
    // sub-hooks agrupados
    usage:  { ...d.usage,   formatDate },
    rating: { ...d.ratingH, displayRating: d.displayRating },
    notes:  d.notes,
    photo:  d.photo,
    // UI state
    hovered: d.hovered, setHovered: d.setHovered,
    exporting: d.exporting,
    lightboxOpen: d.lightboxOpen, setLightboxOpen: d.setLightboxOpen,
    uploadRef: d.uploadRef, replaceRef: d.replaceRef,
    // handlers
    handleExport: d.handleExport,
    handleStarClick: d.handleStarClick,
    handleFileChange: d.handleFileChange,
    handleRemove: d.handleRemove,
    toggleHidden,
    // edição de peças
    editMode, pendingPieces,
    confirmOpen, setConfirmOpen,
    saving,
    startEdit, cancelEdit, togglePiece, confirmSave,
  }
}
