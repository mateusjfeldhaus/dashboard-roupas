import { useEffect } from 'react'
import { imgUrl } from '../../utils/imgUrl'
import {
  FilterStickyWrap, FilterBar, FilterBtn,
  Section, CatTitle, PieceGrid,
  PieceCard, Thumb, ThumbImg, ColorBar, PieceName, PieceBrand,
  DescartadasLink,
} from './Pecas.styles'
import { SkGrid, SkCard } from '../Skeleton'
import { usePecas, categories } from './usePecas'
import { sortByColor as sortPiecesByColor } from '../../utils/colorSort'
import { isGuest } from '../../api/client'

const SCROLL_KEY = 'pecas-scroll'

function navigateToPeca(navigate: (path: string) => void, id: string) {
  sessionStorage.setItem(SCROLL_KEY, String(window.scrollY))
  navigate(`/pecas/${id}`)
}

export function Pecas() {
  const {
    navigate, pieces, loading,
    selectedCat, setSelectedCat, visibleCats,
    sortByColor, toggleSortByColor, colorSortedPieces,
  } = usePecas()
  const guest = isGuest()

  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY)
    if (saved) {
      sessionStorage.removeItem(SCROLL_KEY)
      const y = Number(saved)
      // aguarda render antes de rolar
      requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'instant' }))
    }
  }, [])

  if (loading) return (
    <SkGrid $cols='repeat(auto-fill, minmax(200px, 1fr))'>
      {Array.from({ length: 12 }).map((_, i) => <SkCard key={i} $h='220px' />)}
    </SkGrid>
  )

  return (
    <>
      <FilterStickyWrap>
        <FilterBar>
          <FilterBtn $active={selectedCat === 'Todas'} onClick={() => setSelectedCat('Todas')}>
            Todas
          </FilterBtn>
          <FilterBtn
            $active={sortByColor}
            onClick={toggleSortByColor}
            title="Ordenar por cor"
            style={sortByColor
              ? { borderColor: 'var(--accent, #c8a96e)', color: 'var(--accent, #c8a96e)' }
              : { opacity: 0.7 }}
          >
            🎨 Cor
          </FilterBtn>
          {categories.map(cat => (
            <FilterBtn key={cat} $active={selectedCat === cat} onClick={() => setSelectedCat(cat)}>
              {cat}
            </FilterBtn>
          ))}
          {!guest && <DescartadasLink to="/pecas/descartadas">🗄 Descartadas</DescartadasLink>}
          {!guest && (
            <FilterBtn
              $active={false}
              onClick={() => navigate('/pecas/nova')}
              style={{ marginLeft: 'auto', color: 'var(--accent, #c8a96e)', fontWeight: 700, borderColor: 'var(--accent, #c8a96e)', opacity: 0.9 }}
            >
              + Nova peça
            </FilterBtn>
          )}
        </FilterBar>
      </FilterStickyWrap>

      {sortByColor ? (
        <Section>
          <CatTitle style={{ marginBottom: 16 }}>
            {colorSortedPieces.length} {colorSortedPieces.length === 1 ? 'peça' : 'peças'} · ordenadas por cor
          </CatTitle>
          <PieceGrid>
            {colorSortedPieces.map(piece => (
              <PieceCard key={piece.id} onClick={() => navigateToPeca(navigate, piece.id)}>
                <Thumb>
                  {piece.img && (
                    <ThumbImg src={imgUrl(piece.img)} alt={piece.name}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  )}
                </Thumb>
                <ColorBar $color={piece.color} />
                <PieceName>{piece.name}</PieceName>
                <PieceBrand>{piece.brand} · {piece.category}</PieceBrand>
              </PieceCard>
            ))}
          </PieceGrid>
        </Section>
      ) : visibleCats.map(cat => {
        const catPieces = sortPiecesByColor(pieces.filter(p => p.category === cat))
        if (catPieces.length === 0) return null
        return (
          <Section key={cat}>
            <CatTitle>{cat} ({catPieces.length})</CatTitle>
            <PieceGrid>
              {catPieces.map(piece => (
                <PieceCard key={piece.id} onClick={() => navigateToPeca(navigate, piece.id)}>
                  <Thumb>
                    {piece.img && (
                      <ThumbImg src={imgUrl(piece.img)} alt={piece.name}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    )}
                  </Thumb>
                  <ColorBar $color={piece.color} />
                  <PieceName>{piece.name}</PieceName>
                  <PieceBrand>{piece.brand}</PieceBrand>
                </PieceCard>
              ))}
            </PieceGrid>
          </Section>
        )
      })}
    </>
  )
}
