import { useState, useEffect, useMemo } from 'react'
import { useLooks } from '../../hooks/useLooks'
import { usePieces } from '../../hooks/usePieces'
import api from '../../api/client'
import { UsageRecord, calcStreak } from '../../utils/wardrobeUtils'

// ── Types ─────────────────────────────────────────────────────────────────────

export type Period = 'all' | 'year' | '6m' | '30d'

export const PERIOD_LABELS: Record<Period, string> = {
  all: 'Tudo', year: 'Este ano', '6m': '6 meses', '30d': '30 dias',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function cutoffDate(period: Period): string | null {
  if (period === 'all') return null
  const d = new Date()
  if (period === '30d')  d.setDate(d.getDate() - 30)
  if (period === '6m')   d.setMonth(d.getMonth() - 6)
  if (period === 'year') d.setMonth(0); d.setDate(1)
  return d.toISOString().split('T')[0]
}

export function avgPerWeek(records: UsageRecord[], totalDays: number): string {
  if (records.length === 0 || totalDays === 0) return '0'
  return (records.length / (totalDays / 7)).toFixed(1)
}

export function last12Months(): { key: string; label: string }[] {
  const months = []
  for (let i = 11; i >= 0; i--) {
    const d = new Date()
    d.setDate(1)
    d.setMonth(d.getMonth() - i)
    const key   = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
    months.push({ key, label })
  }
  return months
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useStats() {
  const { looks } = useLooks()
  const { pieces } = usePieces()
  const [allRecords, setAllRecords] = useState<UsageRecord[]>([])
  const [loading,    setLoading]    = useState(true)
  const [period,     setPeriod]     = useState<Period>('all')

  useEffect(() => {
    api.get<{ records: UsageRecord[] }>('/api/usage')
      .then(r => { setAllRecords(r.data.records ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const records = useMemo(() => {
    const cutoff = cutoffDate(period)
    if (!cutoff) return allRecords
    return allRecords.filter(r => r.date >= cutoff)
  }, [allRecords, period])

  const streak = useMemo(() => calcStreak(allRecords), [allRecords])

  const periodDays = useMemo(() => {
    if (records.length === 0) return 0
    if (period === 'all') {
      const first = new Date(records[0].date)
      const last  = new Date(records[records.length - 1].date)
      return Math.max(1, Math.round((last.getTime() - first.getTime()) / 86400000) + 1)
    }
    return period === '30d' ? 30 : period === '6m' ? 180 : 365
  }, [records, period])

  const uniqueWorn  = useMemo(() => new Set(records.map(r => r.lookId)).size, [records])
  const neverWorn   = useMemo(() => looks.filter(l => !new Set(allRecords.map(r => r.lookId)).has(l.id)).length, [allRecords, looks])

  const monthData = useMemo(() => {
    const months = last12Months()
    return months.map(m => ({
      ...m,
      count: allRecords.filter(r => r.date.startsWith(m.key)).length,
    }))
  }, [allRecords])
  const maxMonth = Math.max(...monthData.map(m => m.count), 1)

  const topLooks = useMemo(() => {
    const freq: Record<string, number> = {}
    records.forEach(r => { freq[r.lookId] = (freq[r.lookId] ?? 0) + 1 })
    return Object.entries(freq)
      .map(([id, count]) => ({ look: looks.find(l => l.id === id), count }))
      .filter(x => x.look)
      .sort((a, b) => b.count - a.count)
      .slice(0, 8) as { look: (typeof looks)[0]; count: number }[]
  }, [records, looks])

  const neverWornLooks = useMemo(() => {
    const worn = new Set(allRecords.map(r => r.lookId))
    return looks.filter(l => !worn.has(l.id)).slice(0, 6)
  }, [allRecords, looks])

  const tagDist = useMemo(() => {
    const tagLooksUsed: Record<string, number> = {}
    records.forEach(r => {
      const look = looks.find(l => l.id === r.lookId)
      if (!look) return
      look.tags.forEach(t => { tagLooksUsed[t] = (tagLooksUsed[t] ?? 0) + 1 })
    })
    return Object.entries(tagLooksUsed).sort((a, b) => b[1] - a[1])
  }, [records, looks])

  const formalDist = useMemo(() => {
    const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    records.forEach(r => {
      const look = looks.find(l => l.id === r.lookId)
      if (look) dist[look.formality] = (dist[look.formality] ?? 0) + 1
    })
    return [1,2,3,4,5].map(f => ({ level: f, count: dist[f] }))
  }, [records, looks])
  const maxFormal = Math.max(...formalDist.map(f => f.count), 1)

  const topPieces = useMemo(() => {
    const freq: Record<string, number> = {}
    records.forEach(r => {
      const look = looks.find(l => l.id === r.lookId)
      if (!look) return
      look.pieces.forEach(lp => { freq[lp.pieceId] = (freq[lp.pieceId] ?? 0) + 1 })
    })
    return Object.entries(freq)
      .map(([id, count]) => ({ piece: pieces.find(p => p.id === id), count }))
      .filter(x => x.piece)
      .sort((a, b) => b.count - a.count)
      .slice(0, 8) as { piece: (typeof pieces)[0]; count: number }[]
  }, [records, looks, pieces])

  const insight = useMemo(() => {
    if (records.length === 0) return null
    const parts: string[] = []
    const thisMonth = new Date().toISOString().slice(0, 7)
    const thisMonthCount = allRecords.filter(r => r.date.startsWith(thisMonth)).length
    if (thisMonthCount > 0) parts.push(`${thisMonthCount} uso${thisMonthCount > 1 ? 's' : ''} este mês`)
    if (streak.current >= 3) parts.push(`sequência ativa de ${streak.current} dias 🔥`)
    if (topLooks.length > 0) parts.push(`look favorito: "${topLooks[0].look.title}" (${topLooks[0].count}×)`)
    if (neverWorn > 0) parts.push(`${neverWorn} look${neverWorn > 1 ? 's' : ''} nunca usados`)
    return parts.length ? parts.join(' · ') : null
  }, [records, allRecords, streak, topLooks, neverWorn])

  // chart constants
  const chartW = 600; const chartH = 100; const barW = 36; const gap = 10
  const totalBars = monthData.length
  const svgW = totalBars * (barW + gap) - gap

  return {
    looks, pieces,
    allRecords, loading,
    period, setPeriod,
    records, streak, periodDays,
    uniqueWorn, neverWorn,
    monthData, maxMonth,
    topLooks, neverWornLooks,
    tagDist, formalDist, maxFormal,
    topPieces, insight,
    chartW, chartH, barW, gap, totalBars, svgW,
  }
}
