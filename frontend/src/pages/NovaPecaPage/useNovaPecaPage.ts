import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/client'
import { usePieces } from '../../hooks/usePieces'
import { compressImage } from '../../utils/compressImage'
import { CAT_LIST } from '../../utils/lookHelpers'
import type { PieceCategory } from '@data/types'
import { toast } from '../../hooks/useToast'

export { CAT_LIST }

function buildName(_cat: string, desc: string, br: string) {
  const base = desc.trim()
  if (!base && !br.trim()) return ''
  return br.trim() ? `${base} - ${br.trim()}` : base
}

export function useNovaPecaPage() {
  const navigate   = useNavigate()
  const { invalidate } = usePieces()

  const [description, setDescription] = useState('')
  const [brand,    setBrand]    = useState('')
  const [category, setCategory] = useState<PieceCategory>('Camisa')
  const [color,    setColor]    = useState('#6b7280')
  const [tips,     setTips]     = useState('')
  const [saving,   setSaving]   = useState(false)

  // Nome: auto-gerado a partir de categoria+descrição+marca, mas editável
  const [name,        setName]        = useState('')
  const [nameEdited,  setNameEdited]  = useState(false)

  useEffect(() => {
    if (!nameEdited) setName(buildName(category, description, brand))
  }, [category, description, brand, nameEdited])

  function handleNameChange(val: string) {
    setName(val)
    setNameEdited(true)
  }

  function resetName() {
    setNameEdited(false)
    setName(buildName(category, description, brand))
  }

  // Foto prévia — comprimida e pronta para enviar
  const [preview,   setPreview]   = useState<string | null>(null)   // object URL para exibir
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoUploading, setPhotoUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    const compressed = await compressImage(file)
    setPhotoFile(compressed)
    setPreview(URL.createObjectURL(compressed))
  }

  async function save() {
    if (!name.trim()) return
    setSaving(true)
    try {
      // 1) Cria a peça (id gerado pelo backend)
      const res = await api.post<{ id: string }>('/api/pieces', {
        name:     name.trim(),
        brand:    brand.trim(),
        category,
        color,
        tips:     tips.split('\n').map(t => t.trim()).filter(Boolean),
        img:      '',
      })
      const pieceId = res.data.id

      // 2) Faz upload da foto (se houver)
      if (photoFile) {
        setPhotoUploading(true)
        try {
          const form = new FormData()
          form.append('photo', photoFile)
          await api.post(`/api/pieces/${encodeURIComponent(pieceId)}/photo`, form, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
        } finally {
          setPhotoUploading(false)
        }
      }

      invalidate()
      toast('Peça criada!')
      navigate(`/pecas/${encodeURIComponent(pieceId)}`)
    } catch {
      toast('Erro ao criar peça', 'error')
    } finally {
      setSaving(false)
    }
  }

  const busy = saving || photoUploading
  const canSave = name.trim().length > 0 && !busy

  return {
    navigate,
    description, setDescription,
    name, handleNameChange, resetName, nameEdited,
    brand, setBrand,
    category, setCategory,
    color, setColor,
    tips, setTips,
    preview, handleFileChange, fileRef,
    save, busy, canSave,
  }
}
