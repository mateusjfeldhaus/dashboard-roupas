import { useState, useEffect, useCallback } from 'react'
import api from '../api/client'

export interface UsageStats {
  count: number
  lastDate: string | null
  dates: string[]
  loading: boolean
}

interface ApiStats {
  lookId: string
  count: number
  lastDate: string | null
  dates: string[]
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export function useUsage(lookId: string): UsageStats & {
  markUsed: () => Promise<void>
  undoLast: () => Promise<void>
} {
  const [stats, setStats] = useState<UsageStats>({
    count: 0, lastDate: null, dates: [], loading: true,
  })

  const apply = (data: ApiStats) =>
    setStats({ count: data.count, lastDate: data.lastDate, dates: data.dates, loading: false })

  useEffect(() => {
    let cancelled = false
    api.get<ApiStats>(`/api/usage/${encodeURIComponent(lookId)}`)
      .then(r => { if (!cancelled) apply(r.data) })
      .catch(() => { if (!cancelled) setStats(s => ({ ...s, loading: false })) })
    return () => { cancelled = true }
  }, [lookId])

  const markUsed = useCallback(async () => {
    setStats(s => ({ ...s, loading: true }))
    try {
      const r = await api.post<ApiStats>(`/api/usage/${encodeURIComponent(lookId)}`)
      apply(r.data)
    } catch { setStats(s => ({ ...s, loading: false })) }
  }, [lookId])

  const undoLast = useCallback(async () => {
    if (stats.count === 0) return
    setStats(s => ({ ...s, loading: true }))
    try {
      const r = await api.delete<ApiStats>(`/api/usage/${encodeURIComponent(lookId)}/last`)
      apply(r.data)
    } catch { setStats(s => ({ ...s, loading: false })) }
  }, [lookId, stats.count])

  return { ...stats, markUsed, undoLast }
}
