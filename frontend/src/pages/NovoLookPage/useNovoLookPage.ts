import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import { useLooks } from '../../hooks/useLooks'
import type { Piece, LookTag, PieceCategory } from '@data/types'
import { CAT_LIST as CATEGORIES } from '../../utils/lookHelpers'
import api from '../../api/client'

export { CATEGORIES }

// ── Constants ─────────────────────────────────────────────────────────────────

export const ALL_TAGS: LookTag[] = [
  'formal', 'casual', 'esportes',
  'diurno', 'noturno',
  'verao', 'outono', 'inverno', 'primavera',
]

export const TAG_LABEL: Record<string, string> = {
  formal: 'Formal', casual: 'Casual', esportes: 'Esportes',
  diurno: 'Diurno', noturno: 'Noturno',
  verao: 'Verão', outono: 'Outono', inverno: 'Inverno', primavera: 'Primavera',
}

export const FORMALITY_LABELS = ['', 'Casual', 'Smart Casual', 'Business Casual', 'Formal', 'Black Tie']

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SelectedPiece { piece: Piece; cat: string }

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useNovoLookPage() {
  const navigate = useNavigate()
  const { pieces } = usePieces()
  const { invalidate } = useLooks()

  const [selected,  setSelected]  = useState<SelectedPiece[]>([])
  const [activeCat, setActiveCat] = useState<PieceCategory>('Camisa')
  const [title,     setTitle]     = useState('')
  const [tags,      setTags]      = useState<LookTag[]>([])
  const [formality, setFormality] = useState<1|2|3|4|5>(2)
  const [tip,       setTip]       = useState('')
  const [notes,     setNotes]     = useState('')
  const [saving,    setSaving]    = useState(false)
  const [error,     setError]     = useState<string | null>(null)

  const availableCats = CATEGORIES.filter(c => pieces.some(p => p.category === c))
  const piecesInCat   = pieces.filter(p => p.category === activeCat)

  function togglePiece(piece: Piece) {
    setSelected(prev => {
      const exists = prev.find(s => s.piece.id === piece.id)
      return exists
        ? prev.filter(s => s.piece.id !== piece.id)
        : [...prev, { piece, cat: piece.category }]
    })
  }

  function toggleTag(tag: LookTag) {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  async function handleSave() {
    if (!title.trim()) { setError('Dê um nome ao look.'); return }
    setSaving(true)
    setError(null)

    const id = crypto.randomUUID()
    const body = {
      id, title: title.trim(), tags, formality,
      tip: tip.trim(), notes: notes.trim(),
      pieces: selected.map(s => ({ cat: s.cat, pieceId: s.piece.id })),
    }

    try {
      await api.post('/api/looks', body)
      invalidate()
      navigate(`/looks/${id}`)
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { error?: string } } })
        ?.response?.data?.error ?? String(e)
      setError(`Erro ao salvar: ${msg}`)
      setSaving(false)
    }
  }

  return {
    navigate,
    // piece selector
    pieces, availableCats, piecesInCat,
    activeCat, setActiveCat,
    selected, togglePiece,
    // form fields
    title, setTitle,
    tags, toggleTag,
    formality, setFormality,
    tip, setTip,
    notes, setNotes,
    // save
    saving, error, handleSave,
  }
}
