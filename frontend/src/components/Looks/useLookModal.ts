import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Look, Piece } from '@data/types'
import { exportLookAsImage } from '../../utils/exportLook'
import { usePieces } from '../../hooks/usePieces'
import { useUsage, formatDate } from '../../hooks/useUsage'
import { useRating } from '../../hooks/useRating'
import { useNotes } from '../../hooks/useNotes'
import { useLookPhoto } from '../../hooks/useLookPhoto'
import { CAT_ORDER, catKey } from '../../utils/lookHelpers'

export function useLookModal(look: Look, onClose: () => void) {
  const { pieces } = usePieces()
  const { count, lastDate, loading, markUsed, undoLast } = useUsage(look.id)
  const { rating, loading: rLoading, setRating } = useRating(look.id)
  const { notes, status: notesStatus, setNotes } = useNotes('look', look.id, look.notes)
  const { photoId, uploading: photoUploading, upload: uploadPhoto, remove: removePhoto } = useLookPhoto(look.id, look.photoId)
  const navigate = useNavigate()

  const [hovered,      setHovered]      = useState<number>(0)
  const [exporting,    setExporting]    = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const uploadRef  = useRef<HTMLInputElement>(null)
  const replaceRef = useRef<HTMLInputElement>(null)

  // Escape: fecha lightbox primeiro, depois o modal
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (lightboxOpen) { setLightboxOpen(false); return }
      onClose()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose, lightboxOpen])

  const piecesInLook = look.pieces
    .map(lp => {
      const piece = pieces.find(p => p.id === lp.pieceId)
      return piece ? { cat: lp.cat, piece } : null
    })
    .filter(Boolean)
    .sort((a, b) => (CAT_ORDER[catKey(a!.cat)] ?? 99) - (CAT_ORDER[catKey(b!.cat)] ?? 99)) as { cat: string; piece: Piece }[]

  const displayRating = hovered > 0 ? hovered : rating

  async function handleExport() {
    if (exporting) return
    setExporting(true)
    try { await exportLookAsImage(look, piecesInLook) }
    finally { setExporting(false) }
  }

  async function handleStarClick(n: number) {
    if (rLoading) return
    await setRating(rating === n ? 0 : n)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) uploadPhoto(file)
    e.target.value = ''
  }

  async function handleRemove() {
    await removePhoto()
    setLightboxOpen(false)
  }

  function navigateToPiece(pieceId: string) {
    navigate(`/pecas/${pieceId}`)
    onClose()
  }

  return {
    // data
    count, lastDate, loading,
    rating, rLoading, displayRating,
    notes, notesStatus,
    photoId, photoUploading,
    piecesInLook,
    // state
    hovered, setHovered,
    exporting,
    lightboxOpen, setLightboxOpen,
    // refs
    uploadRef, replaceRef,
    // handlers
    markUsed, undoLast,
    setNotes,
    handleExport,
    handleStarClick,
    handleFileChange,
    handleRemove,
    navigateToPiece,
    formatDate,
  }
}
