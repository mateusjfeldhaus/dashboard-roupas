import {
  FilterStickyWrap, FilterPanel, FilterRow, GroupLabel,
  FilterChip, Divider, MetaRow, Count, ClearBtn,
  Grid, Card, CardTitle, TagRow, Tag,
  FormalityRow, Dot, PieceList, ClickHint,
} from './Looks.styles'
import { SkGrid, SkCard, SkStack, SkLine } from '../Skeleton'
import { useLooks, PERIODO, PERIODO_LABELS, SEASONS, OCCASIONS } from './useLooks'
import type { OcasTag, EstaTag } from './useLooks'

export function Looks() {
  const {
    navigate, looks, loading,
    ocasiao, periodo, estacao, formalMin,
    toggleOcasiao, togglePeriodo, toggleEstacao, toggleFormal,
    hasFilter, filtered, clearAll,
  } = useLooks()

  const FORMAL_RANGES = [
    { label: '● Casual',    min: 1, max: 2 },
    { label: '●● Smart',    min: 3, max: 3 },
    { label: '●●● Formal',  min: 4, max: 5 },
  ]

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
                onClick={() => toggleOcasiao(o.tag as OcasTag)}>
                {o.label}
              </FilterChip>
            ))}
          </FilterRow>
          <Divider />
          <FilterRow>
            <GroupLabel>Período</GroupLabel>
            {PERIODO.map(t => (
              <FilterChip key={t} $active={periodo === t} $tag={t}
                onClick={() => togglePeriodo(t)}>
                {PERIODO_LABELS[t]}
              </FilterChip>
            ))}
          </FilterRow>
          <Divider />
          <FilterRow>
            <GroupLabel>Estação</GroupLabel>
            {SEASONS.map(s => (
              <FilterChip key={s.tag} $active={estacao === s.tag} $tag={s.tag}
                onClick={() => toggleEstacao(s.tag as EstaTag)}>
                {s.emoji} {s.label}
              </FilterChip>
            ))}
          </FilterRow>
          <Divider />
          <FilterRow>
            <GroupLabel>Formalidade</GroupLabel>
            {FORMAL_RANGES.map(r => (
              <FilterChip key={r.min} $active={formalMin === r.min} $tag="formal"
                onClick={() => toggleFormal(r.min, r.max)}>
                {r.label}
              </FilterChip>
            ))}
          </FilterRow>
        </FilterPanel>
      </FilterStickyWrap>

      <MetaRow>
        <Count>{filtered.length} look{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</Count>
        {hasFilter && <ClearBtn onClick={clearAll}>Limpar filtros</ClearBtn>}
        <ClearBtn onClick={() => navigate('/looks/descartados')}
          style={{ marginLeft: 'auto', color: 'var(--accent, #c8a96e)', opacity: 0.6 }}>
          🗄 Descartados
        </ClearBtn>
        <ClearBtn onClick={() => navigate('/looks/novo')}
          style={{ color: 'var(--accent, #c8a96e)', fontWeight: 700 }}>
          + Novo look
        </ClearBtn>
      </MetaRow>

      <Grid>
        {filtered.map(look => (
          <Card key={look.id} onClick={() => navigate(`/looks/${look.id}`)}>
            <CardTitle>{look.title}</CardTitle>
            <TagRow>{look.tags.map(t => <Tag key={t} $tag={t}>{t}</Tag>)}</TagRow>
            <FormalityRow>{[1,2,3,4,5].map(i => <Dot key={i} $filled={i <= look.formality} />)}</FormalityRow>
            <PieceList>{look.pieces.map(lp => lp.cat).join(' / ')}</PieceList>
            <ClickHint>Clique para ver o look completo</ClickHint>
          </Card>
        ))}
      </Grid>
    </>
  )
}
