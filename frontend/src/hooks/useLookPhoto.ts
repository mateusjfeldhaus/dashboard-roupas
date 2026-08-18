import { useState, useEffect } from 'react'
import api from '../api/client'
import { compressImage } from '../utils/compressImage'

interface LookPhotoState {
  photoId:    string | null
  photoUrl:   string | null
  uploading:  boolean
  upload:     (file: File) => Promise<void>
  remove:     () => Promise<void>
}

export function useLookPhoto(
  lookId:         string,
  initialPhotoId: string | null | undefined,
): LookPhotoState {
  const [photoId,   setPhotoId]   = useState<string | null>(initialPhotoId ?? null)
  const [photoUrl,  setPhotoUrl]  = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  // Busca a URL pública do Supabase quando há foto
  useEffect(() => {
    if (!photoId || !lookId) { setPhotoUrl(null); return }
    api.get<{ id: string; url: string }>(`/api/photos/${encodeURIComponent(lookId)}`)
      .then(r => setPhotoUrl(r.data.url))
      .catch(() => setPhotoUrl(null))
  }, [lookId, photoId])

  async function upload(file: File) {
    setUploading(true)
    try {
      const compressed = await compressImage(file)
      const form = new FormData()
      form.append('photo', compressed)
      const res = await api.post<{ id: string; lookId: string }>(
        `/api/photos/${encodeURIComponent(lookId)}`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      )
      setPhotoId(res.data.id)
      // Busca URL atualizada após upload
      const r = await api.get<{ id: string; url: string }>(`/api/photos/${encodeURIComponent(lookId)}`)
      setPhotoUrl(r.data.url)
    } finally {
      setUploading(false)
    }
  }

  async function remove() {
    setUploading(true)
    try {
      await api.delete(`/api/photos/${encodeURIComponent(lookId)}`)
      setPhotoId(null)
      setPhotoUrl(null)
    } finally {
      setUploading(false)
    }
  }

  return { photoId, photoUrl, uploading, upload, remove }
}
