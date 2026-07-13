import { useState, useEffect } from 'react'
import api from '../api/client'
import { toast } from './useToast'

interface RatingState {
  rating: number
  loading: boolean
  setRating: (n: number) => Promise<void>
}

// Cache por lookId
const cache = new Map<string, number>()

export function useRating(lookId: string): RatingState {
  const [rating,  setRatingState] = useState<number>(cache.get(lookId) ?? 0)
  const [loading, setLoading]     = useState(!cache.has(lookId))

  useEffect(() => {
    if (cache.has(lookId)) return   // já em cache, não re-fetch
    setLoading(true)
    api.get<{ rating: number }>(`/api/rating/${encodeURIComponent(lookId)}`)
      .then(r => {
        const v = r.data.rating ?? 0
        cache.set(lookId, v)
        setRatingState(v)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [lookId])

  async function setRating(n: number) {
    if (loading) return
    const previous = rating
    setRatingState(n)
    cache.set(lookId, n)
    setLoading(true)
    try {
      const r = await api.post<{ rating: number }>(
        `/api/rating/${encodeURIComponent(lookId)}`,
        { rating: n }
      )
      const v = r.data.rating ?? 0
      cache.set(lookId, v)
      setRatingState(v)
      toast(`Avaliação salva: ${v}/10`)
    } catch {
      cache.set(lookId, previous)
      setRatingState(previous)
      toast('Erro ao salvar avaliação', 'error')
    } finally {
      setLoading(false)
    }
  }

  return { rating, loading, setRating }
}
