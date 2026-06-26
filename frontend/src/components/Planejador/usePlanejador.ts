import api from '../../api/client'
import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLooks } from '../../hooks/useLooks'
import type { Look } from '@data/types'
import { SEASONS, OCCASIONS } from '../../styles/tags'

export type Period   = 'diurno' | 'noturno'
export type Season   = typeof SEASONS[number]['tag']
export type Occasion = 'formal' | 'casual' | 'esportes'

export interface UsageSummary {
  [lookId: string]: { count: number; lastDate: string | null; dates: string[] }
}

export const COOLDOWN_OPTIONS = [
  { days: 7,  label: '7 dias'  },
  { days: 14, label: '14 dias' },
  { days: 30, label: '30 dias' },
]

export const periodOptions:   { id: Period;   label: string }[] = [
  { id: 'diurno',    label: 'Diurno'   },
  { id: 'noturno',   label: 'Noturno'  },
]
export const seasonOptions   = SEASONS.map(s => ({ id: s.tag as Season, label: `${s.emoji} ${s.label}` }))
export const occasionOptions = OCCASIONS.filter(o => o.tag !== 'diurno' && o.tag !== 'noturno')
                                        .map(o => ({ id: o.tag as Occasion, label: o.label }))

export function daysSince(dateStr: string | null): number | null {
  if (!dateStr) return null
  const diff = Date.now() - new Date(dateStr).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr]
  let s = (seed + 1) * 1664525 + 1013904223
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0x7fffffff
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getRotatedSuggestions(
  filtered: Look[], usage: UsageSummary, cooldown: number, seed: number,
): Look[] {
  const fresh: Look[] = []; const recent: Look[] = []
  for (const look of filtered) {
    const days = daysSince(usage[look.id]?.lastDate ?? null)
    if (days === null || days >= cooldown) fresh.push(look)
    else recent.push(look)
  }
  return [...seededShuffle(fresh, seed), ...seededShuffle(recent, seed)]
}

export function usePlanejador() {
  const { looks } = useLooks()
  const navigate = useNavigate()
  const [period,   setPeriod]   = useState<Period | null>(null)
  const [season,   setSeason]   = useState<Season | null>(null)
  const [occasion, setOccasion] = useState<Occasion | null>(null)
  const [seed,     setSeed]     = useState(0)
  const [showed,   setShowed]   = useState(false)
  const [cooldown, setCooldown] = useState(14)
  const [usage,    setUsage]    = useState<UsageSummary>({})

  useEffect(() => {
    api.get('/api/usage')
      .then(r => setUsage(((r.data as { summary?: UsageSummary }).summary) ?? {}))
      .catch(() => {})
  }, [])

  const filtered = useMemo(() => {
    return looks.filter(l => {
      if (period   && !l.tags.includes(period))   return false
      if (season   && !l.tags.includes(season))   return false
      if (occasion && !l.tags.includes(occasion as import('@data/types').LookTag)) return false
      return true
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, season, occasion, looks])

  const suggestions = useMemo(() => {
    return getRotatedSuggestions(filtered, usage, cooldown, seed).slice(0, 3)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, usage, cooldown, seed])

  function toggle<T>(current: T | null, value: T, set: (v: T | null) => void) {
    set(current === value ? null : value)
    setShowed(false)
  }

  function handleSuggest() { setSeed(s => s + 1); setShowed(true) }

  const noFilters = !period && !season && !occasion

  return {
    navigate,
    period, setPeriod, season, setSeason, occasion, setOccasion,
    seed, setSeed, showed, cooldown, setCooldown, usage,
    filtered, suggestions,
    toggle, handleSuggest, noFilters,
    daysSince,
  }
}
