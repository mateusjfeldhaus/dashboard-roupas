import { imgUrl } from '../../utils/imgUrl'
import {
  StickyGroup,
  CategoryNav, NavLabel, CategoryChip,
  SubcatNav, SubcatLabel, SubcatChip,
  PieceList, PieceCard, PieceHeader,
  PieceThumb, PieceThumbImg, PieceInfo, PieceName, PieceBrand, LookBadge,
  LookRows, LookRow, LookTitle, LookTagRow, LookTag,
  FormalityDots, Dot, ClickHint, EmptyNote,
} from './PorPeca.styles'
import { usePorPeca } from './usePorPeca'

export function PorPeca() {
  const {
    pieces, looks, navigate,
    categories, activeCat, activeSubcat, setActiveSubcat,
    handleCatChange, subcats, hasSubcats, filterIds, piecesInCat,
    looksForPiece,
  } = usePorPeca()

  return (
    <>
      <StickyGroup>
        <CategoryNav>
          <NavLabel>Categoria:</NavLabel>
          {categories.map(c => (
            <CategoryChip key={c.id} $active={activeCat === c.id} onClick={() => handleCatChange(c.id)}>
              {c.label}
            </CategoryChip>
          ))}
        </CategoryNav>

        {hasSubcats && (
          <SubcatNav>
            <SubcatLabel>Filtrar:</SubcatLabel>
            <SubcatChip $active={activeSubcat === null} onClick={() => setActiveSubcat(null)}>Todos</SubcatChip>
            {subcats.map(s => (
              <SubcatChip key={s.id} $active={activeSubcat === s.id}
                onClick={() => setActiveSubcat(activeSubcat === s.id ? null : s.id)}>
                {s.label}
              </SubcatChip>
            ))}
          </SubcatNav>
        )}
      </StickyGroup>

      <PieceList>
        {piecesInCat.map(piece => {
          const pieceLooks = looksForPiece(looks, piece.id)
          return (
            <PieceCard key={piece.id}>
              <PieceHeader>
                <PieceThumb $color={piece.color}>
                  <PieceThumbImg src={imgUrl(piece.img)} alt={piece.name}
                    onError={e => {
                      const el = e.target as HTMLImageElement
                      el.style.display = 'none'
                      el.parentElement!.style.background = piece.color + '33'
                    }} />
                </PieceThumb>
                <PieceInfo>
                  <PieceName>{piece.name}</PieceName>
                  <PieceBrand>{piece.brand}</PieceBrand>
                  <LookBadge>{pieceLooks.length === 0 ? 'Nenhum look' : `${pieceLooks.length} look${pieceLooks.length > 1 ? 's' : ''}`}</LookBadge>
                </PieceInfo>
              </PieceHeader>
              {pieceLooks.length > 0 ? (
                <LookRows>
                  {pieceLooks.map(look => (
                    <LookRow key={look.id} onClick={() => navigate(`/looks/${look.id}`)}>
                      <LookTitle>{look.title}</LookTitle>
                      <LookTagRow>{look.tags.map(t => <LookTag key={t} $tag={t}>{t}</LookTag>)}</LookTagRow>
                      <FormalityDots>{[1,2,3,4,5].map(i => <Dot key={i} $filled={i <= look.formality} />)}</FormalityDots>
                      <ClickHint>ver</ClickHint>
                    </LookRow>
                  ))}
                </LookRows>
              ) : (
                <EmptyNote>Nenhum look cadastrado para esta peça ainda.</EmptyNote>
              )}
            </PieceCard>
          )
        })}
      </PieceList>
    </>
  )
}
