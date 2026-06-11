import { useState, useEffect } from 'react'
import api from '../api/client'
import type { Piece } from '../../../backend/data/types'

// API returns the same shape as the static Piece type (plus createdAt which we ignore)
type ApiPiece = Piece & { createdAt?: string }

let cache: Piece[] | null = null
const listeners: Set<() => void> = new Set()

function notify() { listeners.forEach(fn => fn()) }

export function usePieces() {
  const [pieces, setPieces] = useState<Piece[]>(cache ?? [])
  const [loading, setLoading] = useState(!cache)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    if (cache) { setPieces(cache); setLoading(false); return }

    api.get<ApiPiece[]>('/api/pieces')
      .then(r => {
        cache = r.data
        setPieces(cache)
        setLoading(false)
        notify()
      })
      .catch(e => { setError(String(e)); setLoading(false) })
  }, [])

  // Subscribe to external cache updates (e.g. after a mutation)
  useEffect(() => {
    const refresh = () => { if (cache) setPieces([...cache]) }
    listeners.add(refresh)
    return () => { listeners.delete(refresh) }
  }, [])

  function invalidate() {
    cache = null
    setLoading(true)
    api.get<ApiPiece[]>('/api/pieces')
      .then(r => { cache = r.data; setPieces(cache); setLoading(false); notify() })
      .catch(e => { setError(String(e)); setLoading(false) })
  }

  return { pieces, loading, error, invalidate }
}
