import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLooks } from '../../hooks/useLooks'
import { usePieces } from '../../hooks/usePieces'
import { useUsage, formatDate } from '../../hooks/useUsage'
import { useRating } from '../../hooks/useRating'
import { useNotes } from '../../hooks/useNotes'
import { useLookPhoto } from '../../hooks/useLookPhoto'
import { exportLookAsImage } from '../../utils/exportLook'
import type { Piece } from '@data/types'
import { photoUrl } from '../../utils/lookHelpers'
import { CAT_ORDER, catKey } from '../../utils/wardrobeUtils'

// ── helpers ───────────────────────────────────────────────────────────────────

// ── hook ──────────────────────────────────────────────────────────────────────

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
  const { pieces } = usePieces()

  const look = allLooks.find(l => l.id === id)

  const usage   = useUsage(look?.id ?? '')
  const ratingH = useRating(look?.id ?? '')
  const notes   = useNotes('look', look?.id ?? '', look?.notes)
  const photo   = useLookPhoto(look?.id ?? '', look?.photoId)

  // UI state
  const [hovered,      setHovered]      = useState(0)
  const [exporting,    setExporting]    = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const uploadRef  = useRef<HTMLInputElement>(null)
  const replaceRef = useRef<HTMLInputElement>(null)

  // Derived
  const piecesInLook: { cat: string; piece: Piece }[] = look
    ? (look.pieces
        .map(lp => {
          const piece = pieces.find(p => p.id === lp.pieceId)
          return piece ? { cat: lp.cat, piece } : null
        })
        .filter(Boolean) as { cat: string; piece: Piece }[])
        .sort((a, b) => (CAT_ORDER[catKey(a.cat)] ?? 99) - (CAT_ORDER[catKey(b.cat)] ?? 99))
    : []

  const displayRating = hovered > 0 ? hovered : ratingH.rating

  // Handlers
  async function handleExport() {
    if (exporting || !look) return
    setExporting(true)
    try { await exportLookAsImage(look, piecesInLook) }
    finally { setExporting(false) }
  }

  async function handleStarClick(n: number) {
    if (ratingH.loading) return
    await ratingH.setRating(ratingH.rating === n ? 0 : n)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) photo.upload(file)
    e.target.value = ''
  }

  async function handleRemove() {
    await photo.remove()
    setLightboxOpen(false)
  }

  return {
    // navigation
    navigate,
    // data
    look,
    piecesInLook,
    looksLoading,
    // usage
    usage: { ...usage, formatDate },
    // rating
    rating: { ...ratingH, displayRating },
    // notes
    notes,
    // photo
    photo,
    // UI state
    hovered, setHovered,
    exporting,
    lightboxOpen, setLightboxOpen,
    uploadRef, replaceRef,
    // handlers
    handleExport,
    handleStarClick,
    handleFileChange,
    handleRemove,
    toggleHidden,
  }
}
