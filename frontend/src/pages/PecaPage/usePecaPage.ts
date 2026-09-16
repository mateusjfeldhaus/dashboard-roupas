import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import { useLooks } from '../../hooks/useLooks'
import { useNotes } from '../../hooks/useNotes'
import { usePiecePhotoFor } from '../../hooks/usePiecePhoto'
import { toast } from '../../hooks/useToast'
import api from '../../api/client'

export function usePecaPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const lightboxRef = useRef(false)
  lightboxRef.current = lightboxOpen

  // ── Editar peça ─────────────────────────────────────────────────────────────
  const [editOpen, setEditOpen] = useState(false)
  const editOpenRef = useRef(false)
  editOpenRef.current = editOpen

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (lightboxRef.current) { setLightboxOpen(false); return }
      if (editOpenRef.current) { setEditOpen(false); return }
      navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const { allPieces, invalidate, loading: loadingPieces } = usePieces()
  const { invalidate: invalidateLooks, looks, loading: loadingLooks } = useLooks()

  const piece = allPieces.find(p => p.id === id)
  const notes = useNotes('piece', piece?.id ?? '', piece?.notes)
  const photo = usePiecePhotoFor(piece?.id ?? '')
  const photoInputRef = useRef<HTMLInputElement>(null)

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !piece) return
    e.target.value = ''
    try {
      await photo.upload(file)
      invalidate()
      toast('Foto atualizada!')
    } catch {
      toast('Erro ao enviar foto', 'error')
    }
  }

  async function removePhoto() {
    if (!piece) return
    try {
      await photo.remove()
      invalidate()
      toast('Foto removida')
    } catch {
      toast('Erro ao remover foto', 'error')
    }
  }

  const [editDesc,     setEditDesc]     = useState('')
  const [editName,     setEditName]     = useState('')
  const [editNameEdited, setEditNameEdited] = useState(false)
  const [editBrand,    setEditBrand]    = useState('')
  const [editCategory, setEditCategory] = useState('')
  const [editColor,    setEditColor]    = useState('')
  const [editTips,     setEditTips]     = useState('')
  const [editSaving,   setEditSaving]   = useState(false)

  useEffect(() => {
    if (!editOpen || editNameEdited) return
    const base = editDesc.trim()
    const br   = editBrand.trim()
    setEditName(base && br ? `${base} - ${br}` : base || br)
  }, [editDesc, editBrand, editNameEdited, editOpen])

  function handleEditNameChange(val: string) {
    setEditName(val)
    setEditNameEdited(true)
  }

  function resetEditName() {
    setEditNameEdited(false)
  }

  function openEdit() {
    const name  = piece?.name  ?? ''
    const brand = piece?.brand ?? ''

    // 1. Tenta extrair desc removendo " - {brand}" exato do final
    const exactSuffix = brand ? ` - ${brand}` : ''
    let desc: string
    if (exactSuffix && name.endsWith(exactSuffix)) {
      desc = name.slice(0, name.length - exactSuffix.length)
    } else {
      // 2. Fallback: tudo antes do último " - "
      const lastDash = name.lastIndexOf(' - ')
      desc = lastDash >= 0 ? name.slice(0, lastDash) : name
    }

    // Verifica se o nome reconstruído bate com o armazenado
    const reconstructed = desc.trim() && brand.trim()
      ? `${desc.trim()} - ${brand.trim()}` : desc.trim() || brand.trim()
    const nameMatchesAuto = reconstructed === name

    setEditDesc(desc)
    setEditBrand(brand)
    setEditName(name)
    // Se o auto-gerado difere do armazenado, mantém o armazenado e marca como editado
    setEditNameEdited(!nameMatchesAuto)
    setEditCategory(piece?.category ?? '')
    setEditColor(piece?.color ?? '#6b7280')
    setEditTips(piece?.tips.join('\n') ?? '')
    setEditOpen(true)
  }

  async function saveEdit() {
    if (!piece) return
    setEditSaving(true)
    try {
      await api.put(`/api/pieces/${encodeURIComponent(piece.id)}`, {
        name:     editName.trim(),
        brand:    editBrand.trim(),
        category: editCategory,
        color:    editColor,
        tips:     editTips.split('\n').map(t => t.trim()).filter(Boolean),
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
    photo, photoInputRef, handlePhotoChange, removePhoto,
    lightboxOpen, setLightboxOpen,
    toggleHidden,
    editOpen, openEdit, setEditOpen,
    editDesc, setEditDesc,
    editName, handleEditNameChange, resetEditName, editNameEdited,
    editBrand, setEditBrand,
    editCategory, setEditCategory,
    editColor, setEditColor,
    editTips, setEditTips,
    editSaving, saveEdit,
  }
}
