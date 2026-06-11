import { useState } from 'react'
import { useLooks } from '../../hooks/useLooks'
import type { Look, LookTag } from '@data/types'
import { LookModal } from './LookModal'
import {
  FilterStickyWrap, FilterPanel, FilterRow, GroupLabel,
  FilterChip, Divider, MetaRow, Count, ClearBtn,
  Grid, Card, CardTitle, TagRow, Tag,
  FormalityRow, Dot, PieceList, ClickHint,
} from './Looks.styles'

const OCASIAO  = ['formal', 'casual', 'esportes'] as const
const PERIODO  = ['diurno', 'noturno'] as const
const ESTACAO  = ['verao', 'inverno', 'primavera', 'outono'] as const

const LABELS: Record<string, string> = {
  formal: 'Formal', casual: 'Casual', esportes: 'Esportes',
  diurno: 'Diurno', noturno: 'Noturno',
  verao: 'Verão', inverno: 'Inverno', primavera: 'Primavera', outono: 'Outono',
}

type OcasTag  = typeof OCASIAO[number]
type PeriTag  = typeof PERIODO[number]
type EstaTag  = typeof ESTACAO[number]

export function Looks() {
  const { looks } = useLooks()
  const [ocasiao,  setOcasiao]  = useState<OcasTag  | null>(null)
  const [periodo,  setPeriodo]  = useState<PeriTag  | null>(null)
  const [estacao,  setEstacao]  = useState<EstaTag  | null>(null)
  const [modal,    setModal]    = useState<Look | null>(null)

  const toggle = <T,>(val: T, cur: T | null, set: (v: T | null) => void) =>
    set(cur === val ? null : val)

  const hasFilter = ocasiao !== null || periodo !== null || estacao !== null

  const filtered = looks.filter(l => {
    if (ocasiao && !l.tags.includes(ocasiao as LookTag)) return false
    if (periodo && !l.tags.includes(periodo as LookTag)) return false
    if (estacao && !l.tags.includes(estacao as LookTag)) return false
    return true
  })

  function clearAll() {
    setOcasiao(null)
    setPeriodo(null)
    setEstacao(null)
  }

  return (
    <>
      <FilterStickyWrap>
        <FilterPanel>
          <FilterRow>
            <GroupLabel>Ocasião</GroupLabel>
            {OCASIAO.map(t => (
              <FilterChip key={t} $active={ocasiao === t} $tag={t}
                onClick={() => toggle(t, ocasiao, setOcasiao)}>
                {LABELS[t]}
              </FilterChip>
            ))}
          </FilterRow>

          <Divider />

          <FilterRow>
            <GroupLabel>Período</GroupLabel>
            {PERIODO.map(t => (
              <FilterChip key={t} $active={periodo === t} $tag={t}
                onClick={() => toggle(t, periodo, setPeriodo)}>
                {LABELS[t]}
              </FilterChip>
            ))}
          </FilterRow>

          <Divider />

          <FilterRow>
            <GroupLabel>Estação</GroupLabel>
            {ESTACAO.map(t => (
              <FilterChip key={t} $active={estacao === t} $tag={t}
                onClick={() => toggle(t, estacao, setEstacao)}>
                {LABELS[t]}
              </FilterChip>
            ))}
          </FilterRow>
        </FilterPanel>
      </FilterStickyWrap>

      <MetaRow>
        <Count>{filtered.length} look{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</Count>
        {hasFilter && <ClearBtn onClick={clearAll}>Limpar filtros</ClearBtn>}
      </MetaRow>

      <Grid>
        {filtered.map(look => (
          <Card key={look.id} onClick={() => setModal(look)}>
            <CardTitle>{look.title}</CardTitle>
            <TagRow>
              {look.tags.map(t => <Tag key={t} $tag={t}>{t}</Tag>)}
            </TagRow>
            <FormalityRow>
              {[1,2,3,4,5].map(i => <Dot key={i} $filled={i <= look.formality} />)}
            </FormalityRow>
            <PieceList>
              {look.pieces.map(lp => lp.cat).join(' / ')}
            </PieceList>
            <ClickHint>Clique para ver o look completo</ClickHint>
          </Card>
        ))}
      </Grid>

      {modal && <LookModal look={modal} onClose={() => setModal(null)} />}
    </>
  )
}
