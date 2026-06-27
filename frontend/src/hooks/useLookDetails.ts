import { useRef, useState } from 'react'
import type { Look, Piece } from '@data/types'
import { exportLookAsImage } from '../utils/exportLook'
import { usePieces } from './usePieces'
import { useUsage, formatDate } from './useUsage'
import { useRating } from './useRating'
import { useNotes } from './useNotes'
import { useLookPhoto } from './useLookPhoto'
import { CAT_ORDER, catKey } from '../utils/wardrobeUtils'

export { formatDate }

/**
 * Núcleo compartilhado entre useLookModal e useLookPage:
 * todos os sub-hooks, estado de UI, derivações e handlers.
 * Aceita `Look | undefined` para funcionar antes do dado carregar.
 */
export function useLookDetails(look: Look | undefined) {
  const { pieces } = usePieces()
  const usage   = useUsage(look?.id ?? '')
  const ratingH = useRating(look?.id ?? '')
  const notes   = useNotes('look', look?.id ?? '', look?.notes)
  const photo   = useLookPhoto(look?.id ?? '', look?.photoId)

  const [hovered,      setHovered]      = useState<number>(0)
  const [exporting,    setExporting]    = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const uploadRef  = useRef<HTMLInputElement>(null)
  const replaceRef = useRef<HTMLInputElement>(null)

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
    usage, ratingH, notes, photo,
    piecesInLook, displayRating,
    hovered, setHovered,
    exporting,
    lightboxOpen, setLightboxOpen,
    uploadRef, replaceRef,
    handleExport, handleStarClick, handleFileChange, handleRemove,
  }
}
