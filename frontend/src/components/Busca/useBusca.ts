import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import { useLooks } from '../../hooks/useLooks'

function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

export function useBusca() {
  const navigate = useNavigate()
  const { pieces } = usePieces()
  const { looks } = useLooks()
  const [query, setQuery] = useState('')

  const q = normalize(query.trim())

  const matchedPieces = useMemo(() => {
    if (!q) return []
    return pieces.filter(p =>
      normalize(p.name).includes(q) ||
      normalize(p.brand).includes(q) ||
      normalize(p.category).includes(q)
    )
  }, [q, pieces])

  const matchedLooks = useMemo(() => {
    if (!q) return []
    return looks.filter(l =>
      normalize(l.title).includes(q) ||
      l.tags.some(t => normalize(t).includes(q))
    )
  }, [q, looks])

  const hasResults = matchedPieces.length > 0 || matchedLooks.length > 0
  const hasQuery   = query.trim().length > 0

  return { navigate, query, setQuery, matchedPieces, matchedLooks, hasResults, hasQuery }
}
