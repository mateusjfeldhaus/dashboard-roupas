import { imgUrl } from '../../utils/imgUrl'
import { getTagColor } from '../../styles/tagColors'
import {
  Wrapper, Panel, PanelTitle,
  CatRow, CatChip,
  PieceGrid, PieceThumb, PieceThumbImg, PieceCheckmark, PieceName,
  SelectedRow, SelectedChip, ChipRemove, ClearBtn,
  FilterBar, FilterGroup, FilterLabel, FilterChip,
  ResultsHeader, ResultsCount,
  EmptyState, EmptyIcon, NoMatch,
  LookCard, LookCardHeader, LookCardTitle,
  TagRow, Tag, FormalityDots, FormalityDot,
  PiecesBreakdown, PieceChip, MissingBadge, SeeBtn,
} from './Montar.styles'
import { useMontar, CAT_LABELS } from './useMontar'

export function Montar() {
  const {
    pieces, navigate,
    CATEGORIES, SEASONS,
    activeCat, setActiveCat,
    selectedIds, setSelectedIds, selectedPieces,
    filterSeason, setFilterSeason,
    filterTime,   setFilterTime,
    filterStyle,  setFilterStyle,
    piecesInCat, filteredMatches,
    toggle, activeFilters,
  } = useMontar()

  return (
    <>
      <Wrapper>
        <Panel>
          <PanelTitle>Selecione as peças</PanelTitle>

          {selectedIds.length > 0 && (
            <SelectedRow>
              {selectedPieces.map(p => (
                <SelectedChip key={p.id} onClick={() => toggle(p.id)}>
                  {p.name}<ChipRemove>×</ChipRemove>
                </SelectedChip>
              ))}
              <ClearBtn onClick={() => setSelectedIds([])}>limpar</ClearBtn>
            </SelectedRow>
          )}

          <CatRow>
            {CATEGORIES.map(c => (
              <CatChip key={c} $active={activeCat === c} onClick={() => setActiveCat(c)}>
                {CAT_LABELS[c] ?? c}
              </CatChip>
            ))}
          </CatRow>

          <PieceGrid>
            {piecesInCat.map(p => {
              const sel = selectedIds.includes(p.id)
              return (
                <div key={p.id}>
                  <PieceThumb $selected={sel} $color={p.color} onClick={() => toggle(p.id)}>
                    <PieceThumbImg src={imgUrl(p.img)} alt={p.name}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    {sel && <PieceCheckmark>✓</PieceCheckmark>}
                  </PieceThumb>
                  <PieceName title={p.name}>{p.name}</PieceName>
                </div>
              )
            })}
          </PieceGrid>
        </Panel>

        <Panel>
          <ResultsHeader>
            <PanelTitle style={{ marginBottom: 0 }}>Looks compatíveis</PanelTitle>
            {selectedIds.length > 0 && (
              <ResultsCount>
                {filteredMatches.length === 0 ? 'nenhum' : `${filteredMatches.length} look${filteredMatches.length > 1 ? 's' : ''}`}
                {activeFilters > 0 && ` · ${activeFilters} filtro${activeFilters > 1 ? 's' : ''}`}
              </ResultsCount>
            )}
          </ResultsHeader>

          <FilterBar>
            <FilterGroup>
              <FilterLabel>Estação</FilterLabel>
              {SEASONS.map(s => (
                <FilterChip key={s.tag} $active={filterSeason === s.tag} $color={s.color}
                  onClick={() => setFilterSeason(f => f === s.tag ? null : s.tag)}>
                  {s.emoji} {s.label}
                </FilterChip>
              ))}
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Hora</FilterLabel>
              {(['diurno', 'noturno'] as const).map(t => (
                <FilterChip key={t} $active={filterTime === t}
                  onClick={() => setFilterTime(f => f === t ? null : t)}>
                  {t === 'diurno' ? '☀️ Diurno' : '🌙 Noturno'}
                </FilterChip>
              ))}
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Estilo</FilterLabel>
              {(['formal', 'casual', 'esportes'] as const).map(s => (
                <FilterChip key={s} $active={filterStyle === s}
                  onClick={() => setFilterStyle(f => f === s ? null : s)}>
                  {s === 'formal' ? '👔 Formal' : s === 'casual' ? '👕 Casual' : '🏃 Esportes'}
                </FilterChip>
              ))}
            </FilterGroup>
          </FilterBar>

          {selectedIds.length === 0 ? (
            <EmptyState>
              <EmptyIcon>🧩</EmptyIcon>
              Selecione uma ou mais peças ao lado para ver os looks que as combinam.
            </EmptyState>
          ) : filteredMatches.length === 0 ? (
            <NoMatch>
              Nenhum look encontrado com as peças e filtros selecionados.<br />
              <span style={{ fontSize: 12 }}>
                {activeFilters > 0 ? 'Tente remover um filtro ou trocar uma peça.' : 'Tente remover uma peça para ampliar os resultados.'}
              </span>
            </NoMatch>
          ) : (
            filteredMatches.map(({ look, havePieceIds, allPieceIds, missing }) => (
              <LookCard key={look.id} onClick={() => navigate(`/looks/${look.id}`)}>
                <LookCardHeader>
                  <LookCardTitle>{look.title}</LookCardTitle>
                  <TagRow>
                    {look.tags.map(t => {
                      const c = getTagColor(t)
                      return <Tag key={t} style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>{t}</Tag>
                    })}
                  </TagRow>
                  <FormalityDots>
                    {[1,2,3,4,5].map(i => <FormalityDot key={i} $filled={i <= look.formality} />)}
                  </FormalityDots>
                </LookCardHeader>
                <PiecesBreakdown>
                  {allPieceIds.map(pid => {
                    const p    = pieces.find(p => p.id === pid)
                    const have = havePieceIds.includes(pid)
                    return <PieceChip key={pid} $have={have}>{have ? '✓' : '+'} {p?.name ?? pid}</PieceChip>
                  })}
                </PiecesBreakdown>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {missing > 0
                    ? <MissingBadge>faltam {missing} peça{missing > 1 ? 's' : ''}</MissingBadge>
                    : <MissingBadge style={{ color: 'var(--accent, #c8a96e)' }}>look completo ✓</MissingBadge>
                  }
                  <SeeBtn>ver look →</SeeBtn>
                </div>
              </LookCard>
            ))
          )}
        </Panel>
      </Wrapper>
    </>
  )
}
