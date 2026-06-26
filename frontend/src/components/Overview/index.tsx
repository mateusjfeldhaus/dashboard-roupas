import { imgUrl } from '../../utils/imgUrl'
import {
  Grid, Card, ClickCard, StatValue, StatLabel,
  Section, SectionTitle,
  CatGrid, CatCard, CatName, CatCount, BarTrack, BarFill,
  LookPanel, LookList, LookListCard, LookListTitle, LookListTags, LookListTag, LookListMeta,
  PiecePanel, PanelTitle, PanelClose,
  PieceGrid, PieceCard, PieceThumb, PieceThumbImg, PieceInfo, PieceName, PieceBrand,
} from './Overview.styles'
import { SkGrid, SkCard, SkStack, SkLine } from '../Skeleton'
import { useOverview } from './useOverview'

export function Overview() {
  const {
    navigate, pieces, looks, allCats,
    loadingPieces, loadingLooks,
    selectedCat, setSelectedCat,
    filterTag, setFilterTag,
    filterSection, setFilterSection,
    toggleFilter, filteredLooks,
    ocasiaoItems, catCounts, maxCount, piecesInCat,
    toggleCat, SEASONS, OCCASIONS,
  } = useOverview()

  if (loadingPieces || loadingLooks) return (
    <SkStack $gap='24px'>
      <SkGrid $cols='repeat(auto-fill, minmax(140px, 1fr))'>
        {Array.from({ length: 6 }).map((_, i) => <SkCard key={i} $h='90px' />)}
      </SkGrid>
      <SkStack>
        <SkLine $w='120px' $h='20px' />
        <SkGrid $cols='repeat(auto-fill, minmax(160px, 1fr))'>
          {Array.from({ length: 8 }).map((_, i) => <SkCard key={i} $h='80px' />)}
        </SkGrid>
      </SkStack>
    </SkStack>
  )

  return (
    <>
      <Section>
        <Grid>
          <Card><StatValue>{pieces.length}</StatValue><StatLabel>Peças no Guarda-Roupa</StatLabel></Card>
          <Card><StatValue>{looks.length}</StatValue><StatLabel>Looks Prontos</StatLabel></Card>
          <Card><StatValue>{allCats.length}</StatValue><StatLabel>Categorias</StatLabel></Card>
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Looks por Ocasião</SectionTitle>
        <Grid>
          {ocasiaoItems.map(({ tag, label, count }) => {
            const isSelected = filterTag === tag && filterSection === 'ocasiao'
            return (
              <ClickCard key={tag} $selected={isSelected} onClick={() => toggleFilter(tag, 'ocasiao')}>
                <StatValue>{count}</StatValue><StatLabel>{label}</StatLabel>
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
                <LookListCard key={look.id} onClick={() => navigate(`/looks/${look.id}`)}>
                  <LookListTitle>{look.title}</LookListTitle>
                  <LookListTags>{look.tags.map(t => <LookListTag key={t}>{t}</LookListTag>)}</LookListTags>
                  <LookListMeta>{look.pieces.length} peça{look.pieces.length !== 1 ? 's' : ''} · formalidade {look.formality}/5</LookListMeta>
                </LookListCard>
              ))}
            </LookList>
          </LookPanel>
        )}
      </Section>

      <Section>
        <SectionTitle>Looks por Estação</SectionTitle>
        <Grid>
          {SEASONS.map(({ tag, label, emoji, color }) => {
            const count = looks.filter(l => l.tags.includes(tag as never)).length
            const isSelected = filterTag === tag && filterSection === 'estacao'
            return (
              <ClickCard key={tag} $selected={isSelected} style={{ borderTop: `3px solid ${color}` }} onClick={() => toggleFilter(tag, 'estacao')}>
                <StatValue style={{ color }}>{emoji} {count}</StatValue><StatLabel>{label}</StatLabel>
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
                  <LookListCard key={look.id} onClick={() => navigate(`/looks/${look.id}`)}>
                    <LookListTitle>{look.title}</LookListTitle>
                    <LookListTags>{look.tags.map(t => <LookListTag key={t}>{t}</LookListTag>)}</LookListTags>
                    <LookListMeta>{look.pieces.length} peça{look.pieces.length !== 1 ? 's' : ''} · formalidade {look.formality}/5</LookListMeta>
                  </LookListCard>
                ))}
              </LookList>
            </LookPanel>
          )
        })()}
      </Section>

      <Section>
        <SectionTitle>Peças por Categoria</SectionTitle>
        <CatGrid>
          {catCounts.map(({ cat, count }) => (
            <CatCard key={cat} $selected={selectedCat === cat} onClick={() => toggleCat(cat)}>
              <CatName>{cat}</CatName>
              <CatCount>{count}</CatCount>
              <BarTrack><BarFill $pct={Math.round((count / maxCount) * 100)} /></BarTrack>
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
                <PieceCard key={piece.id} onClick={() => navigate(`/pecas/${piece.id}`)}>
                  <PieceThumb $color={piece.color}>
                    <PieceThumbImg src={imgUrl(piece.img)} alt={piece.name}
                      onError={e => {
                        const el = e.target as HTMLImageElement
                        el.style.display = 'none'
                        el.parentElement!.style.background = piece.color + '33'
                      }} />
                  </PieceThumb>
                  <PieceInfo><PieceName>{piece.name}</PieceName><PieceBrand>{piece.brand}</PieceBrand></PieceInfo>
                </PieceCard>
              ))}
            </PieceGrid>
          </PiecePanel>
        )}
      </Section>
    </>
  )
}
