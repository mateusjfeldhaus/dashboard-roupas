import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import { useLooks } from '../../hooks/useLooks'
import type { Piece, Look } from '@data/types'
import { imgUrl } from '../../utils/imgUrl'
import { getTagColor } from '../../styles/tagColors'
import { SEASONS } from '../../styles/tags'
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

// ── Category order ────────────────────────────────────────────────────────────

const CAT_LABELS: Record<string, string> = {
  'Camisa':    'Camisas',
  'Terno':     'Ternos',
  'Costume':   'Costumes',
  'Blazer':    'Blazers',
  'Calça':     'Calças',
  'Sapato':    'Sapatos',
  'Gravata':   'Gravatas',
  'Polo':      'Polos',
  'Camiseta':  'Camisetas',
  'Jaqueta':   'Jaquetas',
  'Suéter':    'Suéteres',
  'Relógio':   'Relógios',
  'Cinto':     'Cintos',
  'Acessório': 'Acessórios',
}
const CAT_ORDER = Object.keys(CAT_LABELS)

// ── Filter types ──────────────────────────────────────────────────────────────

type SeasonFilter  = typeof SEASONS[number]['tag']   | null
type TimeFilter    = 'diurno'  | 'noturno'           | null
type StyleFilter   = 'formal'  | 'casual' | 'esportes' | null

// ── Helpers ───────────────────────────────────────────────────────────────────

interface MatchedLook {
  look: Look
  havePieceIds: string[]
  allPieceIds: string[]
  missing: number
}

function computeMatches(looks: Look[], selectedIds: string[]): MatchedLook[] {
  if (selectedIds.length === 0) return []

  return looks
    .filter(l => {
      const lookPieceIds = l.pieces.map(lp => lp.pieceId)
      return selectedIds.every(id => lookPieceIds.includes(id))
    })
    .map(look => {
      const allPieceIds  = look.pieces.map(lp => lp.pieceId)
      const havePieceIds = selectedIds.filter(id => allPieceIds.includes(id))
      return { look, havePieceIds, allPieceIds, missing: allPieceIds.length - havePieceIds.length }
    })
    .sort((a, b) => a.missing - b.missing || b.havePieceIds.length - a.havePieceIds.length)
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Montar() {
  const { pieces } = usePieces()
  const { looks }  = useLooks()

  const allCats   = [...new Set(pieces.map(p => p.category as string))]
  const CATEGORIES = [
    ...CAT_ORDER.filter(c => allCats.includes(c)),
    ...allCats.filter(c => !CAT_ORDER.includes(c)),
  ]

  const navigate = useNavigate()
  const [activeCat,    setActiveCat]    = useState<string>('Camisa')
  const [selectedIds,  setSelectedIds]  = useState<string[]>([])

  // Filtros de look
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

  // Toggle: one piece per category
  function toggle(id: string) {
    const piece = pieces.find(p => p.id === id)
    if (!piece) return
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      const sameCat = pieces
        .filter(p => (p.category as string) === (piece.category as string))
        .map(p => p.id)
      return [...prev.filter(x => !sameCat.includes(x)), id]
    })
  }

  const activeFilters = [filterSeason, filterTime, filterStyle].filter(Boolean).length
  const selectedPieces = selectedIds.map(id => pieces.find(p => p.id === id)).filter(Boolean) as Piece[]

  return (
    <>
      <Wrapper>
        {/* ── Left: piece picker ─────────────────────────────────────────── */}
        <Panel>
          <PanelTitle>Selecione as peças</PanelTitle>

          {selectedIds.length > 0 && (
            <SelectedRow>
              {selectedPieces.map(p => (
                <SelectedChip key={p.id} onClick={() => toggle(p.id)}>
                  {p.name}
                  <ChipRemove>×</ChipRemove>
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
                    <PieceThumbImg
                      src={imgUrl(p.img)}
                      alt={p.name}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                    {sel && <PieceCheckmark>✓</PieceCheckmark>}
                  </PieceThumb>
                  <PieceName title={p.name}>{p.name}</PieceName>
                </div>
              )
            })}
          </PieceGrid>
        </Panel>

        {/* ── Right: matching looks ──────────────────────────────────────── */}
        <Panel>
          <ResultsHeader>
            <PanelTitle style={{ marginBottom: 0 }}>Looks compatíveis</PanelTitle>
            {selectedIds.length > 0 && (
              <ResultsCount>
                {filteredMatches.length === 0
                  ? 'nenhum'
                  : `${filteredMatches.length} look${filteredMatches.length > 1 ? 's' : ''}`}
                {activeFilters > 0 && ` · ${activeFilters} filtro${activeFilters > 1 ? 's' : ''}`}
              </ResultsCount>
            )}
          </ResultsHeader>

          {/* ── Filtros ── */}
          <FilterBar>
            <FilterGroup>
              <FilterLabel>Estação</FilterLabel>
              {SEASONS.map(s => (
                <FilterChip
                  key={s.tag}
                  $active={filterSeason === s.tag}
                  $color={s.color}
                  onClick={() => setFilterSeason(f => f === s.tag ? null : s.tag)}
                >
                  {s.emoji} {s.label}
                </FilterChip>
              ))}
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Hora</FilterLabel>
              {(['diurno', 'noturno'] as const).map(t => (
                <FilterChip
                  key={t}
                  $active={filterTime === t}
                  onClick={() => setFilterTime(f => f === t ? null : t)}
                >
                  {t === 'diurno' ? '☀️ Diurno' : '🌙 Noturno'}
                </FilterChip>
              ))}
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Estilo</FilterLabel>
              {(['formal', 'casual', 'esportes'] as const).map(s => (
                <FilterChip
                  key={s}
                  $active={filterStyle === s}
                  onClick={() => setFilterStyle(f => f === s ? null : s)}
                >
                  {s === 'formal' ? '👔 Formal' : s === 'casual' ? '👕 Casual' : '🏃 Esportes'}
                </FilterChip>
              ))}
            </FilterGroup>
          </FilterBar>

          {selectedIds.length === 0 ? (
            <EmptyState>
              <EmptyIcon>🧩</EmptyIcon>
              Selecione uma ou mais peças ao lado para ver os looks que as combinam.
              <br /><br />
              <span style={{ fontSize: 12 }}>
                Os looks que incluem <em>todas</em> as peças selecionadas aparecem aqui,
                com destaque para o que ainda falta vestir.
              </span>
            </EmptyState>
          ) : filteredMatches.length === 0 ? (
            <NoMatch>
              Nenhum look encontrado com as peças e filtros selecionados.<br />
              <span style={{ fontSize: 12 }}>
                {activeFilters > 0
                  ? 'Tente remover um filtro ou trocar uma peça.'
                  : 'Tente remover uma peça para ampliar os resultados.'}
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
                      return (
                        <Tag key={t} style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
                          {t}
                        </Tag>
                      )
                    })}
                  </TagRow>
                  <FormalityDots>
                    {[1,2,3,4,5].map(i => (
                      <FormalityDot key={i} $filled={i <= look.formality} />
                    ))}
                  </FormalityDots>
                </LookCardHeader>

                <PiecesBreakdown>
                  {allPieceIds.map(pid => {
                    const p    = pieces.find(p => p.id === pid)
                    const have = havePieceIds.includes(pid)
                    return (
                      <PieceChip key={pid} $have={have}>
                        {have ? '✓' : '+'} {p?.name ?? pid}
                      </PieceChip>
                    )
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
