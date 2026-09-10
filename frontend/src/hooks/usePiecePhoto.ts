import { useState } from 'react'
import api from '../api/client'
import { compressImage } from '../utils/compressImage'

interface PiecePhotoState {
  uploading: boolean
  upload:    (file: File) => Promise<string>   // retorna nova URL
  remove:    (pieceId: string) => Promise<void>
}

export function usePiecePhoto(): PiecePhotoState {
  const [uploading, setUploading] = useState(false)

  async function upload(file: File, pieceId: string): Promise<string> {
    setUploading(true)
    try {
      const compressed = await compressImage(file)
      const form = new FormData()
      form.append('photo', compressed)
      const res = await api.post<{ img: string }>(
        `/api/pieces/${encodeURIComponent(pieceId)}/photo`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      )
      return res.data.img
    } finally {
      setUploading(false)
    }
  }

  async function remove(pieceId: string): Promise<void> {
    setUploading(true)
    try {
      await api.delete(`/api/pieces/${encodeURIComponent(pieceId)}/photo`)
    } finally {
      setUploading(false)
    }
  }

  return {
    uploading,
    upload: (file: File) => {
      throw new Error('use upload(file, pieceId)')
    },
    remove,
  }
}

/** Hook simplificado para usar em contexto onde pieceId já é conhecido */
export function usePiecePhotoFor(pieceId: string) {
  const [uploading, setUploading] = useState(false)

  async function upload(file: File): Promise<string> {
    setUploading(true)
    try {
      const compressed = await compressImage(file)
      const form = new FormData()
      form.append('photo', compressed)
      const res = await api.post<{ img: string }>(
        `/api/pieces/${encodeURIComponent(pieceId)}/photo`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      )
      return res.data.img
    } finally {
      setUploading(false)
    }
  }

  async function remove(): Promise<void> {
    setUploading(true)
    try {
      await api.delete(`/api/pieces/${encodeURIComponent(pieceId)}/photo`)
    } finally {
      setUploading(false)
    }
  }

  return { uploading, upload, remove }
}
