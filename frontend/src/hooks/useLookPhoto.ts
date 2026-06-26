import { useState } from 'react'
import api from '../api/client'
import { compressImage } from '../utils/compressImage'

interface LookPhotoState {
  photoId:    string | null
  uploading:  boolean
  upload:     (file: File) => Promise<void>
  remove:     () => Promise<void>
}

export function useLookPhoto(
  lookId:         string,
  initialPhotoId: string | null | undefined,
): LookPhotoState {
  const [photoId,   setPhotoId]   = useState<string | null>(initialPhotoId ?? null)
  const [uploading, setUploading] = useState(false)

  async function upload(file: File) {
    setUploading(true)
    try {
      // Comprime e converte para WebP antes de enviar (max 1200px, qualidade 82%)
      const compressed = await compressImage(file)

      const form = new FormData()
      form.append('photo', compressed)
      const res = await api.post<{ id: string; lookId: string }>(
        `/api/photos/${encodeURIComponent(lookId)}`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      )
      setPhotoId(res.data.id)
    } finally {
      setUploading(false)
    }
  }

  async function remove() {
    setUploading(true)
    try {
      await api.delete(`/api/photos/${encodeURIComponent(lookId)}`)
      setPhotoId(null)
    } finally {
      setUploading(false)
    }
  }

  return { photoId, uploading, upload, remove }
}
