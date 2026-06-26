import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import { useLooks } from '../../hooks/useLooks'
import type { Look } from '@data/types'
import { SEASONS } from '../../styles/tags'
import { CAT_LIST, CAT_LABELS } from '../../utils/lookHelpers'

export { CAT_LABELS }

export type SeasonFilter = typeof SEASONS[number]['tag'] | null
export type TimeFilter   = 'diurno' | 'noturno' | null
export type StyleFilter  = 'formal' | 'casual' | 'esportes' | null

export interface MatchedLook {
  look: Look; havePieceIds: string[]; allPieceIds: string[]; missing: number
}

function computeMatches(looks: Look[], selectedIds: string[]): MatchedLook[] {
  if (selectedIds.length === 0) return []
  return looks
    .filter(l => {
      const ids = l.pieces.map(lp => lp.pieceId)
      return selectedIds.every(id => ids.includes(id))
    })
    .map(look => {
      const allPieceIds  = look.pieces.map(lp => lp.pieceId)
      const havePieceIds = selectedIds.filter(id => allPieceIds.includes(id))
      return { look, havePieceIds, allPieceIds, missing: allPieceIds.length - havePieceIds.length }
    })
    .sort((a, b) => a.missing - b.missing || b.havePieceIds.length - a.havePieceIds.length)
}

export function useMontar() {
  const { pieces } = usePieces()
  const { looks }  = useLooks()
  const navigate   = useNavigate()

  const allCats = [...new Set(pieces.map(p => p.category as string))]
  const CATEGORIES = [
    ...CAT_LIST.filter(c => allCats.includes(c)),
    ...allCats.filter(c => !(CAT_LIST as readonly string[]).includes(c)),
  ]

  const [activeCat,    setActiveCat]    = useState<string>('Camisa')
  const [selectedIds,  setSelectedIds]  = useState<string[]>([])
  const [filterSeason, setFilterSeason] = useState<SeasonFilter>(null)
  const [filterTime,   setFilterTime]   = useState<TimeFilter>(null)
  const [filterStyle,  setFilterStyle]  = useState<StyleFilter>(null)

  const piecesInCat = useMemo(
    () => pieces.filter(p => (p.category as string) === activeCat),
    [pieces, activeCat],
  )

  const matches = useMemo(() => computeMatches(looks, selectedIds), [looks, selectedIds])

  const filteredMatches = useMemo(() => matches.filter(({ look }) => {
    if (filterSeason && !look.tags.includes(filterSeason as never)) return false
    if (filterTime   && !look.tags.includes(filterTime   as never)) return false
    if (filterStyle  && !look.tags.includes(filterStyle  as never)) return false
    return true
  }), [matches, filterSeason, filterTime, filterStyle])

  function toggle(id: string) {
    const piece = pieces.find(p => p.id === id)
    if (!piece) return
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      const sameCat = pieces.filter(p => (p.category as string) === (piece.category as string)).map(p => p.id)
      return [...prev.filter(x => !sameCat.includes(x)), id]
    })
  }

  const activeFilters = [filterSeason, filterTime, filterStyle].filter(Boolean).length
  const selectedPieces = selectedIds.map(id => pieces.find(p => p.id === id)).filter(Boolean) as typeof pieces

  return {
    pieces, looks, navigate,
    CATEGORIES, CAT_LABELS, SEASONS,
    activeCat, setActiveCat,
    selectedIds, setSelectedIds, selectedPieces,
    filterSeason, setFilterSeason,
    filterTime,   setFilterTime,
    filterStyle,  setFilterStyle,
    piecesInCat, matches, filteredMatches,
    toggle, activeFilters,
  }
}
