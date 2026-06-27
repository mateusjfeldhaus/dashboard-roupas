import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLooks } from '../../hooks/useLooks'
import { useLookDetails, formatDate } from '../../hooks/useLookDetails'

export function useLookPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Fechar com Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') navigate(-1) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const { allLooks, toggleHidden, loading: looksLoading } = useLooks()
  const look = allLooks.find(l => l.id === id)

  const d = useLookDetails(look)

  return {
    navigate,
    look,
    piecesInLook: d.piecesInLook,
    looksLoading,
    // sub-hooks agrupados — backward compat com LookPage/index.tsx
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
  }
}
