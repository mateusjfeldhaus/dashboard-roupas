import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLooks } from '../../hooks/useLooks'
import type { LookTag } from '@data/types'
import { SEASONS, OCCASIONS, TAG_LABELS } from '../../styles/tags'
import {
  FilterStickyWrap, FilterPanel, FilterRow, GroupLabel,
  FilterChip, Divider, MetaRow, Count, ClearBtn,
  Grid, Card, CardTitle, TagRow, Tag,
  FormalityRow, Dot, PieceList, ClickHint,
} from './Looks.styles'
import { SkGrid, SkCard, SkStack, SkLine } from '../Skeleton'

const PERIODO  = ['diurno', 'noturno'] as const
const PERIODO_LABELS: Record<string, string> = { diurno: 'Diurno', noturno: 'Noturno' }

type OcasTag  = typeof OCCASIONS[number]['tag']
type PeriTag  = typeof PERIODO[number]
type EstaTag  = typeof SEASONS[number]['tag']

export function Looks() {
  const navigate = useNavigate()
  const { looks, loading } = useLooks()
  const [ocasiao,  setOcasiao]  = useState<OcasTag  | null>(null)
  const [periodo,  setPeriodo]  = useState<PeriTag  | null>(null)
  const [estacao,  setEstacao]  = useState<EstaTag  | null>(null)

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

  if (loading) return (
    <>
      <SkGrid>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkCard key={i} $h='160px'>
            <SkStack style={{ padding: '18px' }}>
              <SkLine $w='60%' $h='18px' />
              <SkLine $w='40%' $h='12px' />
              <SkLine $w='30%' $h='10px' />
            </SkStack>
          </SkCard>
        ))}
      </SkGrid>
    </>
  )

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
        <ClearBtn
          onClick={() => navigate('/looks/descartados')}
          style={{ marginLeft: 'auto', color: 'var(--accent, #c8a96e)', opacity: 0.6 }}
        >
          🗄 Descartados
        </ClearBtn>
        <ClearBtn
          onClick={() => navigate('/looks/novo')}
          style={{ color: 'var(--accent, #c8a96e)', fontWeight: 700 }}
        >
          + Novo look
        </ClearBtn>
      </MetaRow>

      <Grid>
        {filtered.map(look => (
          <Card key={look.id} onClick={() => navigate(`/looks/${look.id}`)}>
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
    </>
  )
}
