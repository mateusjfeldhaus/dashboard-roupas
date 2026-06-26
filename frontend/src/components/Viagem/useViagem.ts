import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import { useLooks } from '../../hooks/useLooks'
import type { Look, LookTag } from '@data/types'
import { SEASONS, OCCASIONS } from '../../styles/tags'

// ── Types ─────────────────────────────────────────────────────────────────────

export type OccasionFilter = 'formal' | 'casual' | 'esportes' | null
export type SeasonFilter   = typeof SEASONS[number]['tag'] | null

export const CAT_ORDER = [
  'Camisa','Polo','Camiseta','Costume','Blazer','Terno',
  'Calça','Sapato','Cinto','Gravata','Relógio','Suéter','Jaqueta','Acessório',
]

// ── Algorithm ─────────────────────────────────────────────────────────────────

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildCapsule(pool: Look[], target: number, seed: number): Look[] {
  if (pool.length === 0) return []
  if (pool.length <= target) return seededShuffle(pool, seed)
  const shuffled = seededShuffle(pool, seed)
  const selected: Look[] = [shuffled[0]]
  const usedPieces = new Set(shuffled[0].pieces.map(lp => lp.pieceId))
  while (selected.length < target) {
    let best: Look | null = null; let bestScore = -1
    for (const look of shuffled) {
      if (selected.some(s => s.id === look.id)) continue
      const ids = look.pieces.map(lp => lp.pieceId)
      const overlap = ids.filter(id => usedPieces.has(id)).length
      const score = overlap / Math.max(ids.length, 1)
      if (score > bestScore) { best = look; bestScore = score }
    }
    if (!best) break
    selected.push(best)
    best.pieces.forEach(lp => usedPieces.add(lp.pieceId))
  }
  return selected
}

function uniquePieceIds(selectedLooks: Look[]): string[] {
  const seen = new Set<string>()
  for (const look of selectedLooks)
    for (const lp of look.pieces) seen.add(lp.pieceId)
  return [...seen]
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useViagem() {
  const { pieces } = usePieces()
  const { looks } = useLooks()
  const navigate = useNavigate()
  const [days,     setDays]     = useState(2)
  const [occasion, setOccasion] = useState<OccasionFilter>(null)
  const [season,   setSeason]   = useState<SeasonFilter>(null)
  const [seed,     setSeed]     = useState(1)
  const [capsule,     setCapsule]     = useState<Look[]>([])
  const [generated,   setGenerated]   = useState(false)
  const [checkedIds,  setCheckedIds]  = useState<Set<string>>(new Set())
  const [copiedMsg,   setCopiedMsg]   = useState(false)

  const pool = useMemo(() => {
    let l = looks
    if (occasion) l = l.filter(x => x.tags.includes(occasion as LookTag))
    if (season)   l = l.filter(x => x.tags.includes(season   as LookTag))
    return l
  }, [looks, occasion, season])

  const generate = useCallback((newSeed?: number) => {
    const s = newSeed ?? seed
    const result = buildCapsule(pool, Math.max(days, 1), s)
    setCapsule(result)
    setGenerated(true)
    setCheckedIds(new Set())
  }, [pool, days, seed])

  function handleGenerate() {
    const s = Math.floor(Math.random() * 999999) + 1
    setSeed(s); generate(s)
  }

  function handleShuffle() {
    const s = seed + 1; setSeed(s); generate(s)
  }

  function removeLook(id: string) {
    setCapsule(prev => prev.filter(l => l.id !== id))
  }

  const allPieceIds = useMemo(() => uniquePieceIds(capsule), [capsule])

  const checklistItems = useMemo(() => {
    return allPieceIds
      .map(id => pieces.find(p => p.id === id))
      .filter(Boolean)
      .sort((a, b) => {
        const ai = CAT_ORDER.indexOf(a!.category as string)
        const bi = CAT_ORDER.indexOf(b!.category as string)
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
      }) as typeof pieces
  }, [allPieceIds, pieces])

  const byCategory = useMemo(() => {
    const map = new Map<string, typeof pieces>()
    for (const p of checklistItems) {
      const cat = p.category as string
      if (!map.has(cat)) map.set(cat, [])
      map.get(cat)!.push(p)
    }
    return map
  }, [checklistItems])

  const checkedCount = checkedIds.size
  const totalCount   = checklistItems.length
  const pct = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0
  const efficiency = totalCount > 0 ? (capsule.length / totalCount).toFixed(1) : '—'

  function toggleCheck(id: string) {
    setCheckedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  function copyList() {
    const lines: string[] = [`🧳 Mala — ${days} dias\n`]
    byCategory.forEach((items, cat) => {
      lines.push(`${cat}:`)
      items.forEach(p => lines.push(`  ${checkedIds.has(p.id) ? '✓' : '□'} ${p.name}`))
    })
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopiedMsg(true)
      setTimeout(() => setCopiedMsg(false), 2000)
    })
  }

  return {
    pieces, looks, navigate,
    days, setDays,
    occasion, setOccasion,
    season, setSeason,
    pool, capsule, generated,
    checkedIds, setCheckedIds,
    copiedMsg,
    handleGenerate, handleShuffle, removeLook,
    checklistItems, byCategory,
    checkedCount, totalCount, pct, efficiency,
    toggleCheck, copyList,
    OCCASIONS, SEASONS,
  }
}
