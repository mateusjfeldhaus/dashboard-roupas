import { useState } from 'react'
import api from '../api/client'
import { toast } from './useToast'

interface Options {
  onDelete: (id: string) => Promise<void>
}

export function useAdminDelete({ onDelete }: Options) {
  const [targetId, setTargetId]   = useState<string | null>(null)
  const [pin,      setPin]        = useState('')
  const [error,    setError]      = useState('')
  const [loading,  setLoading]    = useState(false)

  function openDelete(id: string) {
    setTargetId(id)
    setPin('')
    setError('')
  }

  function closeDelete() {
    setTargetId(null)
    setPin('')
    setError('')
  }

  async function confirmDelete() {
    if (!targetId || !pin.trim()) return
    setLoading(true)
    setError('')
    try {
      await api.post('/api/auth', { pin: pin.trim() })
      await onDelete(targetId)
      closeDelete()
      toast('Excluído permanentemente')
    } catch (e: any) {
      if (e?.response?.status === 401 || e?.response?.status === 403) {
        setError('PIN incorreto.')
      } else {
        setError('Erro ao excluir.')
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    isOpen: targetId !== null,
    pin, setPin,
    error, loading,
    openDelete, closeDelete, confirmDelete,
  }
}
