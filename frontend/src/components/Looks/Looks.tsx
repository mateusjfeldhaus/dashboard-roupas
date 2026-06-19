import { useState } from 'react'
import { useLooks } from '../../hooks/useLooks'
import type { Look, LookTag } from '@data/types'
import { SEASONS, OCCASIONS, TAG_LABELS } from '../../styles/tags'
import { LookModal } from './LookModal'
import {
  FilterStickyWrap, FilterPanel, FilterRow, GroupLabel,
  FilterChip, Divider, MetaRow, Count, ClearBtn,
  Grid, Card, CardTitle, TagRow, Tag,
  FormalityRow, Dot, PieceList, ClickHint,
} from './Looks.styles'

const PERIODO  = ['diurno', 'noturno'] as const
const PERIODO_LABELS: Record<string, string> = { diurno: 'Diurno', noturno: 'Noturno' }

type OcasTag  = typeof OCCASIONS[number]['tag']
type PeriTag  = typeof PERIODO[number]
type EstaTag  = typeof SEASONS[number]['tag']

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
            {OCCASIONS.filter(o => o.tag !== 'diurno' && o.tag !== 'noturno').map(o => (
              <FilterChip key={o.tag} $active={ocasiao === o.tag} $tag={o.tag}
                onClick={() => toggle(o.tag as OcasTag, ocasiao, setOcasiao)}>
                {o.label}
              </FilterChip>
            ))}
          </FilterRow>

          <Divider />

          <FilterRow>
            <GroupLabel>Período</GroupLabel>
            {PERIODO.map(t => (
              <FilterChip key={t} $active={periodo === t} $tag={t}
                onClick={() => toggle(t, periodo, setPeriodo)}>
                {PERIODO_LABELS[t]}
              </FilterChip>
            ))}
          </FilterRow>

          <Divider />

          <FilterRow>
            <GroupLabel>Estação</GroupLabel>
            {SEASONS.map(s => (
              <FilterChip key={s.tag} $active={estacao === s.tag} $tag={s.tag}
                onClick={() => toggle(s.tag as EstaTag, estacao, setEstacao)}>
                {s.emoji} {s.label}
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
