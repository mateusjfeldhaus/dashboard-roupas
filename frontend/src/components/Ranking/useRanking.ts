import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLooks } from '../../hooks/useLooks'
import api from '../../api/client'

export interface LookStats {
  lookId: string; count: number; lastDate: string | null
}

export function renderStars(rating: number): string {
  const r = Math.max(0, Math.min(10, Math.round(rating ?? 0)))
  return '★'.repeat(r) + '☆'.repeat(10 - r)
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export function useRanking() {
  const { looks } = useLooks()
  const navigate  = useNavigate()
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [summary, setSummary] = useState<Record<string, LookStats>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get<{ ratings: Record<string, number> }>('/api/rating'),
      api.get<{ summary: Record<string, LookStats> }>('/api/usage'),
    ]).then(([rRes, uRes]) => {
      setRatings(rRes.data.ratings ?? {})
      setSummary(uRes.data.summary ?? {})
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const ranked = looks
    .map(look => ({
      look,
      rating:   ratings[look.id]   ?? 0,
      count:    summary[look.id]?.count    ?? 0,
      lastDate: summary[look.id]?.lastDate ?? null,
    }))
    .filter(item => item.rating > 0)
    .sort((a, b) => {
      if (b.rating  !== a.rating)  return b.rating  - a.rating
      if (b.count   !== a.count)   return b.count   - a.count
      if (a.lastDate && b.lastDate) return b.lastDate.localeCompare(a.lastDate)
      if (b.lastDate) return 1
      if (a.lastDate) return -1
      return 0
    })

  const unrated = looks.filter(l => !ratings[l.id])

  return { navigate, looks, ratings, summary, loading, ranked, unrated }
}
