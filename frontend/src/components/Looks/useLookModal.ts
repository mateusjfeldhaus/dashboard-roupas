import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Look } from '@data/types'
import { useLookDetails, formatDate } from '../../hooks/useLookDetails'

export function useLookModal(look: Look, onClose: () => void) {
  const navigate = useNavigate()
  const d = useLookDetails(look)
  const { lightboxOpen, setLightboxOpen } = d

  // Escape: fecha lightbox primeiro, depois o modal
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (lightboxOpen) { setLightboxOpen(false); return }
      onClose()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose, lightboxOpen, setLightboxOpen])

  function navigateToPiece(pieceId: string) {
    navigate(`/pecas/${pieceId}`)
    onClose()
  }

  return {
    // usage (flat — backward compat com LookModal.tsx)
    count: d.usage.count, lastDate: d.usage.lastDate, loading: d.usage.loading,
    markUsed: d.usage.markUsed, undoLast: d.usage.undoLast,
    // rating (flat)
    rating: d.ratingH.rating, rLoading: d.ratingH.loading,
    displayRating: d.displayRating,
    // notes (flat)
    notes: d.notes.notes, notesStatus: d.notes.status, setNotes: d.notes.setNotes,
    // photo (flat)
    photoId: d.photo.photoId, photoUploading: d.photo.uploading,
    // shared
    piecesInLook: d.piecesInLook,
    hovered: d.hovered, setHovered: d.setHovered,
    exporting: d.exporting,
    lightboxOpen, setLightboxOpen,
    uploadRef: d.uploadRef, replaceRef: d.replaceRef,
    handleExport: d.handleExport,
    handleStarClick: d.handleStarClick,
    handleFileChange: d.handleFileChange,
    handleRemove: d.handleRemove,
    navigateToPiece,
    formatDate,
  }
}
