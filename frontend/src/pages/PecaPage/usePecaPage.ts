import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import { useLooks } from '../../hooks/useLooks'
import { useNotes } from '../../hooks/useNotes'
import { toast } from '../../hooks/useToast'
import api from '../../api/client'

export function usePecaPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') navigate(-1) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const { allPieces, invalidate, loading: loadingPieces } = usePieces()
  const { invalidate: invalidateLooks, looks, loading: loadingLooks } = useLooks()

  const piece = allPieces.find(p => p.id === id)
  const notes = useNotes('piece', piece?.id ?? '', piece?.notes)

  // ── Editar peça ─────────────────────────────────────────────────────────────
  const [editOpen, setEditOpen] = useState(false)
  const [editName, setEditName] = useState('')
  const [editBrand, setEditBrand] = useState('')
  const [editTips, setEditTips] = useState('')
  const [editSaving, setEditSaving] = useState(false)

  function openEdit() {
    setEditName(piece?.name ?? '')
    setEditBrand(piece?.brand ?? '')
    setEditTips(piece?.tips.join('\n') ?? '')
    setEditOpen(true)
  }

  async function saveEdit() {
    if (!piece) return
    setEditSaving(true)
    try {
      await api.put(`/api/pieces/${encodeURIComponent(piece.id)}`, {
        name: editName.trim(),
        brand: editBrand.trim(),
        tips: editTips.split('\n').map(t => t.trim()).filter(Boolean),
      })
      invalidate()
      setEditOpen(false)
      toast('Peça atualizada!')
    } catch {
      toast('Erro ao salvar', 'error')
    } finally {
      setEditSaving(false)
    }
  }

  const pieceLooks = piece
    ? looks.filter(l => l.pieces.some(lp => lp.pieceId === piece.id))
    : []

  async function toggleHidden(pieceId: string, hidden: boolean) {
    try {
      const res = await api.patch<{ hidden: boolean; looksHidden: number }>(
        `/api/pieces/${encodeURIComponent(pieceId)}/hidden`,
        { hidden },
      )
      invalidate()
      invalidateLooks()
      if (hidden) {
        const n = res.data.looksHidden
        toast(n > 0 ? `Peça ocultada · ${n} look${n !== 1 ? 's' : ''} ocultado${n !== 1 ? 's' : ''}` : 'Peça ocultada')
      } else {
        toast('Peça restaurada')
      }
    } catch {
      toast('Erro ao atualizar peça', 'error')
    }
  }

  return {
    navigate,
    piece,
    pieceLooks,
    loading: loadingPieces || loadingLooks,
    notes,
    toggleHidden,
    editOpen, openEdit, setEditOpen,
    editName, setEditName,
    editBrand, setEditBrand,
    editTips, setEditTips,
    editSaving, saveEdit,
  }
}
