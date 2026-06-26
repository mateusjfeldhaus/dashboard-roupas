import { imgUrl } from '../../utils/imgUrl'
import {
  Wrap, SearchBar, SearchInput, SearchIcon,
  Hint, EmptyState,
  ResultSection, SectionHeader, SectionTitle, Count,
  PieceGrid, PieceCard, PieceThumb, PieceThumbImg, PieceInfo, PieceName, PieceBrand, PieceCat,
  LookGrid, LookCard, LookTitle, TagRow, Tag,
} from './Busca.styles'
import { useBusca } from './useBusca'

export function Busca() {
  const { navigate, query, setQuery, matchedPieces, matchedLooks, hasResults, hasQuery } = useBusca()

  return (
    <Wrap>
      <SearchBar>
        <SearchInput
          placeholder="Buscar peças, looks, marcas, categorias..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
        <SearchIcon>🔍</SearchIcon>
      </SearchBar>

      {!hasQuery && (
        <Hint>
          Digite o nome de uma peça, marca, categoria, cor ou tag.<br />
          Ex: <em>Blazer</em>, <em>Homem SA</em>, <em>formal</em>, <em>branco</em>, <em>verao</em>
        </Hint>
      )}

      {hasQuery && !hasResults && (
        <EmptyState>Nenhum resultado para "<strong>{query}</strong>"</EmptyState>
      )}

      {matchedPieces.length > 0 && (
        <ResultSection>
          <SectionHeader>
            <SectionTitle>Peças</SectionTitle>
            <Count>{matchedPieces.length} encontrada{matchedPieces.length !== 1 ? 's' : ''}</Count>
          </SectionHeader>
          <PieceGrid>
            {matchedPieces.map(p => (
              <PieceCard key={p.id} onClick={() => navigate(`/pecas/${p.id}`)}>
                <PieceThumb $color={p.color}>
                  <PieceThumbImg src={imgUrl(p.img)} alt={p.name} />
                </PieceThumb>
                <PieceInfo>
                  <PieceName>{p.name}</PieceName>
                  <PieceBrand>{p.brand}</PieceBrand>
                  <PieceCat>{p.category}</PieceCat>
                </PieceInfo>
              </PieceCard>
            ))}
          </PieceGrid>
        </ResultSection>
      )}

      {matchedLooks.length > 0 && (
        <ResultSection>
          <SectionHeader>
            <SectionTitle>Looks</SectionTitle>
            <Count>{matchedLooks.length} encontrado{matchedLooks.length !== 1 ? 's' : ''}</Count>
          </SectionHeader>
          <LookGrid>
            {matchedLooks.map(l => (
              <LookCard key={l.id} onClick={() => navigate(`/looks/${l.id}`)}>
                <LookTitle>{l.title}</LookTitle>
                <TagRow>
                  {l.tags.map(t => <Tag key={t} $tag={t}>{t}</Tag>)}
                </TagRow>
              </LookCard>
            ))}
          </LookGrid>
        </ResultSection>
      )}
    </Wrap>
  )
}
