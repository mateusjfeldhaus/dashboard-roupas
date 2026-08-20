import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLooks } from '../../hooks/useLooks'
import { usePieces } from '../../hooks/usePieces'
import { useLookDetails, formatDate } from '../../hooks/useLookDetails'
import api from '../../api/client'
import { toast } from '../../hooks/useToast'
import type { Piece } from '@data/types'

export function useLookPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [editMode, setEditMode]       = useState(false)
  const [pendingPieces, setPending]   = useState<{ cat: string; pieceId: string }[]>([])
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [saving, setSaving]           = useState(false)
  const [swapTarget, setSwapTarget]   = useState<{ cat: string; pieceId: string } | null>(null)

  const swapTargetRef = useRef(swapTarget)
  swapTargetRef.current = swapTarget
  const editModeRef = useRef(editMode)
  editModeRef.current = editMode

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (swapTargetRef.current) { setSwapTarget(null); return }
      if (!editModeRef.current) navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const { allLooks, toggleHidden, invalidate, loading: looksLoading } = useLooks()
  const { pieces } = usePieces()
  const look = allLooks.find(l => l.id === id)

  const d = useLookDetails(look)

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

    async function applySwap(newPieces: { cat: string; pieceId: string }[]) {
    if (!look) return
    setSaving(true)
    try {
      await api.put(`/api/looks/${look.id}`, { pieces: newPieces })
      invalidate()
      setSwapTarget(null)
      toast('Look atualizado!')
    } catch {
      toast('Erro ao salvar look', 'error')
    } finally {
      setSaving(false)
    }
  }

  function swapPiece(newPieceId: string) {
    if (!look || !swapTarget) return
    const newPieces = look.pieces.map(lp =>
      lp.pieceId === swapTarget.pieceId
        ? { cat: swapTarget.cat, pieceId: newPieceId }
        : { cat: lp.cat, pieceId: lp.pieceId }
    )
    applySwap(newPieces)
  }

  function removePiece() {
    if (!look || !swapTarget) return
    const newPieces = look.pieces
      .filter(lp => lp.pieceId !== swapTarget.pieceId)
      .map(lp => ({ cat: lp.cat, pieceId: lp.pieceId }))
    applySwap(newPieces)
  }

  async function confirmSave() {
    if (!look) return
    setSaving(true)
    try {
      await api.put(`/api/looks/${look.id}`, { pieces: pendingPieces })
      invalidate()
      setEditMode(false)
      setConfirmOpen(false)
      toast('Look atualizado!')
    } catch {
      toast('Erro ao salvar look', 'error')
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
    usage:  { ...d.usage,   formatDate },
    rating: { ...d.ratingH, displayRating: d.displayRating },
    notes:  d.notes,
    photo:  d.photo,    
    hovered: d.hovered, setHovered: d.setHovered,
    exporting: d.exporting,
    lightboxOpen: d.lightboxOpen, setLightboxOpen: d.setLightboxOpen,
    uploadRef: d.uploadRef, replaceRef: d.replaceRef,    
    handleExport: d.handleExport,
    handleStarClick: d.handleStarClick,
    handleFileChange: d.handleFileChange,
    handleRemove: d.handleRemove,
    toggleHidden,    
    editMode, pendingPieces,
    confirmOpen, setConfirmOpen,
    saving,
    startEdit, cancelEdit, togglePiece, confirmSave,    
    swapTarget, setSwapTarget, swapPiece, removePiece,
  }
}
