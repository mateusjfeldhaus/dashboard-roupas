import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import { useLooks } from '../../hooks/useLooks'
import type { Look, LookTag } from '@data/types'
import { SEASONS, OCCASIONS } from '../../styles/tags'
import { CAT_LIST } from '../../utils/lookHelpers'
import { seededShuffle } from '../../utils/wardrobeUtils'

// ── Types ─────────────────────────────────────────────────────────────────────

export type OccasionFilter = 'formal' | 'casual' | 'esportes' | null
export type SeasonFilter   = typeof SEASONS[number]['tag'] | null

// ── Persistence store (lido só na inicialização, escrito pelos setters) ───────
// Mantém estado entre navegações sem URL params.

const store = {
  days:       2             as number,
  occasion:   null          as OccasionFilter,
  season:     null          as SeasonFilter,
  seed:       1             as number,
  capsule:    []            as Look[],
  generated:  false         as boolean,
  checkedIds: new Set<string>(),
}

// ── Algorithm ─────────────────────────────────────────────────────────────────

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
  const { looks }  = useLooks()
  const navigate   = useNavigate()

  // Estado inicializado do store — React rastreia normalmente como deps
  const [days,       setDaysState]      = useState<number>(store.days)
  const [occasion,   setOccasionState]  = useState<OccasionFilter>(store.occasion)
  const [season,     setSeasonState]    = useState<SeasonFilter>(store.season)
  const [capsule,    setCapsule]        = useState<Look[]>(store.capsule)
  const [generated,  setGenerated]      = useState<boolean>(store.generated)
  const [checkedIds, setCheckedIds_]    = useState<Set<string>>(store.checkedIds)
  const [copiedMsg,  setCopiedMsg]      = useState(false)

  // Setters: escrevem no store (persistência) e no state (re-render)
  function setDays(v: number)             { store.days      = v; setDaysState(v) }
  function setOccasion(v: OccasionFilter) { store.occasion  = v; setOccasionState(v) }
  function setSeason(v: SeasonFilter)     { store.season    = v; setSeasonState(v) }

  function setCheckedIds(fn: (prev: Set<string>) => Set<string>) {
    setCheckedIds_(prev => {
      const next = fn(prev)
      store.checkedIds = next
      return next
    })
  }

  // pool depende de state real — useMemo funciona corretamente
  const pool = useMemo(() => {
    let l = looks
    if (occasion) l = l.filter(x => x.tags.includes(occasion as LookTag))
    if (season)   l = l.filter(x => x.tags.includes(season   as LookTag))
    return l
  }, [looks, occasion, season])

  const generate = useCallback((newSeed?: number) => {
    const s = newSeed ?? store.seed
    const next = buildCapsule(pool, Math.max(days, 1), s)
    store.capsule    = next
    store.generated  = true
    store.checkedIds = new Set()
    setCapsule(next)
    setGenerated(true)
    setCheckedIds_(_ => new Set())
  }, [pool, days])

  function handleGenerate() {
    const s = Math.floor(Math.random() * 999999) + 1
    store.seed = s; generate(s)
  }

  function handleShuffle() {
    const s = store.seed + 1; store.seed = s; generate(s)
  }

  function removeLook(id: string) {
    const next = capsule.filter(l => l.id !== id)
    store.capsule = next
    setCapsule(next)
  }

  const allPieceIds = useMemo(() => uniquePieceIds(capsule), [capsule])

  const checklistItems = useMemo(() => {
    return allPieceIds
      .map(id => pieces.find(p => p.id === id))
      .filter(Boolean)
      .filter(p => p!.category !== 'Acessório')
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

  const checkedCount = checkedIds.size
  const totalCount   = checklistItems.length
  const pct          = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0
  const efficiency   = totalCount > 0 ? (capsule.length / totalCount).toFixed(1) : '—'

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
    days,      setDays,
    occasion,  setOccasion,
    season,    setSeason,
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
