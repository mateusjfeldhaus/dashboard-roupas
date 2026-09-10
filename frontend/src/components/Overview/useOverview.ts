import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import { useLooks } from '../../hooks/useLooks'
import { SEASONS, OCCASIONS } from '../../styles/tags'

let _selectedCat: string | null = null

export function useOverview() {
  const { pieces, loading: loadingPieces } = usePieces()
  const { looks,  loading: loadingLooks  } = useLooks()
  const navigate = useNavigate()
  const allCats  = [...new Set(pieces.map(p => p.category))]

  const [selectedCat, setSelectedCatState] = useState<string | null>(_selectedCat)

  function setSelectedCat(cat: string | null) {
    _selectedCat = cat
    setSelectedCatState(cat)
  }
  const [filterTag,     setFilterTag]     = useState<string | null>(null)
  const [filterSection, setFilterSection] = useState<'ocasiao' | 'estacao' | null>(null)

  function toggleFilter(tag: string, section: 'ocasiao' | 'estacao') {
    if (filterTag === tag && filterSection === section) {
      setFilterTag(null); setFilterSection(null)
    } else {
      setFilterTag(tag); setFilterSection(section)
      setSelectedCat(null)   // já persiste via wrapper
    }
  }

  const filteredLooks = filterTag ? looks.filter(l => l.tags.includes(filterTag as never)) : []

  const ocasiaoItems = OCCASIONS.map(o => ({
    ...o,
    count: looks.filter(l => l.tags.includes(o.tag as never)).length,
  }))

  const catCounts = allCats.map(cat => ({
    cat, count: pieces.filter(p => p.category === cat).length,
  }))
  const maxCount = Math.max(...catCounts.map(c => c.count))

  const piecesInCat = selectedCat ? pieces.filter(p => p.category === selectedCat) : []

  function toggleCat(cat: string) {
    setSelectedCat(selectedCat === cat ? null : cat)
    setFilterTag(null); setFilterSection(null)
  }

  return {
    navigate, pieces, looks, allCats,
    loadingPieces, loadingLooks,
    selectedCat, setSelectedCat,
    filterTag, setFilterTag,
    filterSection, setFilterSection,
    toggleFilter, filteredLooks,
    ocasiaoItems, catCounts, maxCount, piecesInCat,
    toggleCat, SEASONS, OCCASIONS,
  }
}
