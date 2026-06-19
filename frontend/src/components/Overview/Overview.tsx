import { useState } from 'react'
import { usePieces } from '../../hooks/usePieces'
import { useLooks } from '../../hooks/useLooks'
import type { Look, Piece } from '@data/types'
import { imgUrl } from '../../utils/imgUrl'
import { SEASONS, OCCASIONS } from '../../styles/tags'
import { PecaModal } from '../Pecas/PecaModal'
import { LookModal } from '../Looks/LookModal'
import {
  Grid, Card, ClickCard, StatValue, StatLabel,
  Section, SectionTitle,
  CatGrid, CatCard, CatName, CatCount, BarTrack, BarFill,
  LookPanel, LookList, LookListCard, LookListTitle, LookListTags, LookListTag, LookListMeta,
  PiecePanel, PanelTitle, PanelClose,
  PieceGrid, PieceCard, PieceThumb, PieceThumbImg, PieceInfo, PieceName, PieceBrand,
} from './Overview.styles'

export function Overview() {
  const { pieces } = usePieces()
  const { looks } = useLooks()
  const allCats = [...new Set(pieces.map(p => p.category))]
  const [selectedCat,    setSelectedCat]    = useState<string | null>(null)
  const [selectedPiece,  setSelectedPiece]  = useState<Piece | null>(null)
  const [selectedLook,   setSelectedLook]   = useState<Look | null>(null)
  const [filterTag,      setFilterTag]      = useState<string | null>(null)
  const [filterSection,  setFilterSection]  = useState<'ocasiao' | 'estacao' | null>(null)

  function toggleFilter(tag: string, section: 'ocasiao' | 'estacao') {
    if (filterTag === tag && filterSection === section) {
      setFilterTag(null); setFilterSection(null)
    } else {
      setFilterTag(tag); setFilterSection(section)
      setSelectedCat(null) // fecha painel de categorias se aberto
    }
  }

  const filteredLooks = filterTag
    ? looks.filter(l => l.tags.includes(filterTag as never))
    : []

  // ocasiões derivadas do array central
  const ocasiaoItems = OCCASIONS.map(o => ({
    ...o,
    count: looks.filter(l => l.tags.includes(o.tag as never)).length,
  }))

  const catCounts = allCats.map(cat => ({
    cat,
    count: pieces.filter(p => p.category === cat).length,
  }))
  const maxCount = Math.max(...catCounts.map(c => c.count))

  const piecesInCat = selectedCat ? pieces.filter(p => p.category === selectedCat) : []

  function toggleCat(cat: string) {
    setSelectedCat(prev => prev === cat ? null : cat)
    setSelectedPiece(null)
    setFilterTag(null); setFilterSection(null) // fecha painel de ocasião/estação
  }

  return (
    <>
      {/* ── Totais ─────────────────────────────────────────────────────── */}
      <Section>
        <Grid>
          <Card>
            <StatValue>{pieces.length}</StatValue>
            <StatLabel>Peças no Guarda-Roupa</StatLabel>
          </Card>
          <Card>
            <StatValue>{looks.length}</StatValue>
            <StatLabel>Looks Prontos</StatLabel>
          </Card>
          <Card>
            <StatValue>{allCats.length}</StatValue>
            <StatLabel>Categorias</StatLabel>
          </Card>
        </Grid>
      </Section>

      {/* ── Ocasião ─────────────────────────────────────────────────────── */}
      <Section>
        <SectionTitle>Looks por Ocasião</SectionTitle>
        <Grid>
          {ocasiaoItems.map(({ tag, label, count }) => {
            const isSelected = filterTag === tag && filterSection === 'ocasiao'
            return (
              <ClickCard key={tag} $selected={isSelected} onClick={() => toggleFilter(tag, 'ocasiao')}>
                <StatValue>{count}</StatValue>
                <StatLabel>{label}</StatLabel>
              </ClickCard>
            )
          })}
        </Grid>
        {filterSection === 'ocasiao' && filterTag && (
          <LookPanel>
            <PanelTitle>
              {OCCASIONS.find(o => o.tag === filterTag)?.label} — {filteredLooks.length} look{filteredLooks.length !== 1 ? 's' : ''}
              <PanelClose onClick={() => { setFilterTag(null); setFilterSection(null) }}>fechar</PanelClose>
            </PanelTitle>
            <LookList>
              {filteredLooks.map(look => (
                <LookListCard key={look.id} onClick={() => setSelectedLook(look)}>
                  <LookListTitle>{look.title}</LookListTitle>
                  <LookListTags>
                    {look.tags.map(t => <LookListTag key={t}>{t}</LookListTag>)}
                  </LookListTags>
                  <LookListMeta>{look.pieces.length} peça{look.pieces.length !== 1 ? 's' : ''} · formalidade {look.formality}/5</LookListMeta>
                </LookListCard>
              ))}
            </LookList>
          </LookPanel>
        )}
      </Section>

      {/* ── Estações ────────────────────────────────────────────────────── */}
      <Section>
        <SectionTitle>Looks por Estação</SectionTitle>
        <Grid>
          {SEASONS.map(({ tag, label, emoji, color }) => {
            const count = looks.filter(l => l.tags.includes(tag as never)).length
            const isSelected = filterTag === tag && filterSection === 'estacao'
            return (
              <ClickCard key={tag} $selected={isSelected} style={{ borderTop: `3px solid ${color}` }} onClick={() => toggleFilter(tag, 'estacao')}>
                <StatValue style={{ color }}>{emoji} {count}</StatValue>
                <StatLabel>{label}</StatLabel>
              </ClickCard>
            )
          })}
        </Grid>
        {filterSection === 'estacao' && filterTag && (() => {
          const s = SEASONS.find(e => e.tag === filterTag)
          return (
            <LookPanel>
              <PanelTitle>
                {s?.emoji} {s?.label} — {filteredLooks.length} look{filteredLooks.length !== 1 ? 's' : ''}
                <PanelClose onClick={() => { setFilterTag(null); setFilterSection(null) }}>fechar</PanelClose>
              </PanelTitle>
              <LookList>
                {filteredLooks.map(look => (
                  <LookListCard key={look.id} onClick={() => setSelectedLook(look)}>
                    <LookListTitle>{look.title}</LookListTitle>
                    <LookListTags>
                      {look.tags.map(t => <LookListTag key={t}>{t}</LookListTag>)}
                    </LookListTags>
                    <LookListMeta>{look.pieces.length} peça{look.pieces.length !== 1 ? 's' : ''} · formalidade {look.formality}/5</LookListMeta>
                  </LookListCard>
                ))}
              </LookList>
            </LookPanel>
          )
        })()}
      </Section>

      {/* ── Peças por Categoria ─────────────────────────────────────────── */}
      <Section>
        <SectionTitle>Peças por Categoria</SectionTitle>
        <CatGrid>
          {catCounts.map(({ cat, count }) => (
            <CatCard
              key={cat}
              $selected={selectedCat === cat}
              onClick={() => toggleCat(cat)}
            >
              <CatName>{cat}</CatName>
              <CatCount>{count}</CatCount>
              <BarTrack>
                <BarFill $pct={Math.round((count / maxCount) * 100)} />
              </BarTrack>
            </CatCard>
          ))}
        </CatGrid>

        {selectedCat && piecesInCat.length > 0 && (
          <PiecePanel>
            <PanelTitle>
              {selectedCat} — {piecesInCat.length} peça{piecesInCat.length > 1 ? 's' : ''}
              <PanelClose onClick={() => setSelectedCat(null)}>fechar</PanelClose>
            </PanelTitle>
            <PieceGrid>
              {piecesInCat.map(piece => (
                <PieceCard key={piece.id} onClick={() => setSelectedPiece(piece)}>
                  <PieceThumb $color={piece.color}>
                    <PieceThumbImg
                      src={imgUrl(piece.img)}
                      alt={piece.name}
                      onError={e => {
                        const el = e.target as HTMLImageElement
                        el.style.display = 'none'
                        el.parentElement!.style.background = piece.color + '33'
                      }}
                    />
                  </PieceThumb>
                  <PieceInfo>
                    <PieceName>{piece.name}</PieceName>
                    <PieceBrand>{piece.brand}</PieceBrand>
                  </PieceInfo>
                </PieceCard>
              ))}
            </PieceGrid>
          </PiecePanel>
        )}
      </Section>

      {selectedPiece && (
        <PecaModal piece={selectedPiece} onClose={() => setSelectedPiece(null)} />
      )}

      {selectedLook && (
        <LookModal look={selectedLook} onClose={() => setSelectedLook(null)} />
      )}
    </>
  )
}
