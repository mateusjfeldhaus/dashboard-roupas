import { useState, useEffect } from 'react'
import api from '../api/client'
import type { Piece } from '../../../backend/data/types'

type ApiPiece = Piece & { createdAt?: string }

let cache: Piece[] | null = null
const listeners: Set<() => void> = new Set()

function notify() { listeners.forEach(fn => fn()) }

export function usePieces() {
  const [allPieces, setAllPieces] = useState<Piece[]>(cache ?? [])
  const [loading,   setLoading]   = useState(!cache)
  const [error,     setError]     = useState<string | null>(null)

  useEffect(() => {
    if (cache) { setAllPieces(cache); setLoading(false); return }

    api.get<ApiPiece[]>('/api/pieces')
      .then(r => {
        cache = r.data
        setAllPieces(cache)
        setLoading(false)
        notify()
      })
      .catch(e => { setError(String(e)); setLoading(false) })
  }, [])

  useEffect(() => {
    const refresh = () => { if (cache) setAllPieces([...cache]) }
    listeners.add(refresh)
    return () => { listeners.delete(refresh) }
  }, [])

  function invalidate() {
    cache = null
    setLoading(true)
    api.get<ApiPiece[]>('/api/pieces')
      .then(r => { cache = r.data; setAllPieces(cache!); setLoading(false); notify() })
      .catch(e => { setError(String(e)); setLoading(false) })
  }

  async function toggleHidden(pieceId: string, hidden: boolean) {
    await api.patch(`/api/pieces/${encodeURIComponent(pieceId)}/hidden`, { hidden })
    invalidate()
  }

  // pieces = apenas visíveis (hidden: false)
  const pieces = allPieces.filter(p => !p.hidden)

  return { pieces, allPieces, loading, error, invalidate, toggleHidden }
}
