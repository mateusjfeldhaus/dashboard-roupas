import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLooks as useLooksData } from '../../hooks/useLooks'
import type { LookTag } from '@data/types'
import { SEASONS, OCCASIONS, TAG_LABELS } from '../../styles/tags'

const PERIODO  = ['diurno', 'noturno'] as const
const PERIODO_LABELS: Record<string, string> = { diurno: 'Diurno', noturno: 'Noturno' }

export type OcasTag = typeof OCCASIONS[number]['tag']
export type PeriTag = typeof PERIODO[number]
export type EstaTag = typeof SEASONS[number]['tag']

export { PERIODO, PERIODO_LABELS, SEASONS, OCCASIONS, TAG_LABELS }

export function useLooks() {
  const navigate = useNavigate()
  const { looks, loading } = useLooksData()

  const [ocasiao,    setOcasiao]    = useState<OcasTag | null>(null)
  const [periodo,    setPeriodo]    = useState<PeriTag | null>(null)
  const [estacao,    setEstacao]    = useState<EstaTag | null>(null)
  const [formalMin,  setFormalMin]  = useState<number | null>(null)
  const [formalMax,  setFormalMax]  = useState<number | null>(null)

  function toggleOcasiao(val: OcasTag) { setOcasiao(cur => cur === val ? null : val) }
  function togglePeriodo(val: PeriTag) { setPeriodo(cur => cur === val ? null : val) }
  function toggleEstacao(val: EstaTag) { setEstacao(cur => cur === val ? null : val) }
  function toggleFormal(min: number, max: number) {
    setFormalMin(cur => cur === min ? null : min)
    setFormalMax(cur => cur === max ? null : max)
  }

  const hasFilter = ocasiao !== null || periodo !== null || estacao !== null || formalMin !== null

  const filtered = looks.filter(l => {
    if (ocasiao   && !l.tags.includes(ocasiao as LookTag)) return false
    if (periodo   && !l.tags.includes(periodo as LookTag)) return false
    if (estacao   && !l.tags.includes(estacao as LookTag)) return false
    if (formalMin !== null && formalMax !== null && (l.formality < formalMin || l.formality > formalMax)) return false
    return true
  })

  function clearAll() { setOcasiao(null); setPeriodo(null); setEstacao(null); setFormalMin(null); setFormalMax(null) }

  return {
    navigate, looks, loading,
    ocasiao, periodo, estacao, formalMin, formalMax,
    toggleOcasiao, togglePeriodo, toggleEstacao, toggleFormal,
    hasFilter, filtered, clearAll,
  }
}
