import { useState, useEffect } from 'react'
import api from '../api/client'

interface RatingState {
  rating: number
  loading: boolean
  setRating: (n: number) => Promise<void>
}

export function useRating(lookId: string): RatingState {
  const [rating,  setRatingState] = useState<number>(0)
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get<{ rating: number }>(`/api/rating/${encodeURIComponent(lookId)}`)
      .then(r => { setRatingState(r.data.rating ?? 0); setLoading(false) })
      .catch(() => setLoading(false))
  }, [lookId])

  async function setRating(n: number) {
    const r = await api.post<{ rating: number }>(
      `/api/rating/${encodeURIComponent(lookId)}`,
      { rating: n }
    )
    setRatingState(r.data.rating ?? 0)
  }

  return { rating, loading, setRating }
}
