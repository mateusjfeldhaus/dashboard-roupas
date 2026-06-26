import { useState, useMemo, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import { useLooks } from '../../hooks/useLooks'
import type { Look, LookTag } from '@data/types'
import { SEASONS, OCCASIONS } from '../../styles/tags'
import { CAT_LIST } from '../../utils/lookHelpers'

// ── Types ─────────────────────────────────────────────────────────────────────

export type OccasionFilter = 'formal' | 'casual' | 'esportes' | null
export type SeasonFilter   = typeof SEASONS[number]['tag'] | null

// ── Module-level state (persists across navigation) ───────────────────────────

let _days:      number          = 2
let _occasion:  OccasionFilter  = null
let _season:    SeasonFilter    = null
let _seed:      number          = 1
let _capsule:   Look[]          = []
let _generated: boolean         = false
let _checkedIds: Set<string>    = new Set()

const listeners = new Set<() => void>()
function notify() { listeners.forEach(fn => fn()) }

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

  const [, rerender] = useState(0)

  useEffect(() => {
    const fn = () => rerender(n => n + 1)
    listeners.add(fn)
    return () => { listeners.delete(fn) }
  }, [])

  // setters that write to module state and notify
  function setDays(v: number)               { _days = v;       notify() }
  function setOccasion(v: OccasionFilter)   { _occasion = v;   notify() }
  function setSeason(v: SeasonFilter)       { _season = v;     notify() }
  function setCheckedIds(fn: (prev: Set<string>) => Set<string>) {
    _checkedIds = fn(_checkedIds); notify()
  }

  const [copiedMsg, setCopiedMsg] = useState(false)

  const pool = useMemo(() => {
    let l = looks
    if (_occasion) l = l.filter(x => x.tags.includes(_occasion as LookTag))
    if (_season)   l = l.filter(x => x.tags.includes(_season   as LookTag))
    return l
  }, [looks, _occasion, _season])

  const generate = useCallback((newSeed?: number) => {
    const s = newSeed ?? _seed
    _capsule   = buildCapsule(pool, Math.max(_days, 1), s)
    _generated = true
    _checkedIds = new Set()
    notify()
  }, [pool])

  function handleGenerate() {
    const s = Math.floor(Math.random() * 999999) + 1
    _seed = s; generate(s)
  }

  function handleShuffle() {
    const s = _seed + 1; _seed = s; generate(s)
  }

  function removeLook(id: string) {
    _capsule = _capsule.filter(l => l.id !== id); notify()
  }

  const allPieceIds = useMemo(() => uniquePieceIds(_capsule), [_capsule])

  const checklistItems = useMemo(() => {
    return allPieceIds
      .map(id => pieces.find(p => p.id === id))
      .filter(Boolean)
      .sort((a, b) => {
        const ai = (CAT_LIST as readonly string[]).indexOf(a!.category as string)
        const bi = (CAT_LIST as readonly string[]).indexOf(b!.category as string)
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

  const checkedCount = _checkedIds.size
  const totalCount   = checklistItems.length
  const pct = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0
  const efficiency = totalCount > 0 ? (_capsule.length / totalCount).toFixed(1) : '—'

  function toggleCheck(id: string) {
    setCheckedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  function copyList() {
    const lines: string[] = [`🧳 Mala — ${_days} dias\n`]
    byCategory.forEach((items, cat) => {
      lines.push(`${cat}:`)
      items.forEach(p => lines.push(`  ${_checkedIds.has(p.id) ? '✓' : '□'} ${p.name}`))
    })
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopiedMsg(true)
      setTimeout(() => setCopiedMsg(false), 2000)
    })
  }

  return {
    pieces, looks, navigate,
    days: _days,       setDays,
    occasion: _occasion, setOccasion,
    season: _season,   setSeason,
    pool, capsule: _capsule, generated: _generated,
    checkedIds: _checkedIds, setCheckedIds,
    copiedMsg,
    handleGenerate, handleShuffle, removeLook,
    checklistItems, byCategory,
    checkedCount, totalCount, pct, efficiency,
    toggleCheck, copyList,
    OCCASIONS, SEASONS,
  }
}
