import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import type { PieceCategory } from '@data/types'
import { imgUrl } from '../../utils/imgUrl'
import {
  FilterStickyWrap, FilterBar, FilterBtn,
  Section, CatTitle, PieceGrid,
  PieceCard, Thumb, ThumbImg, ColorBar, PieceName, PieceBrand,
} from './Pecas.styles'
import { SkGrid, SkCard, SkStack, SkLine } from '../Skeleton'

const categories: PieceCategory[] = [
  'Camisa', 'Calça', 'Blazer', 'Costume', 'Terno',
  'Sapato', 'Relógio', 'Gravata', 'Cinto', 'Suéter',
  'Polo', 'Camiseta', 'Jaqueta', 'Acessório',
]

export function Pecas() {
  const navigate = useNavigate()
  const { pieces, loading } = usePieces()
  const [selectedCat, setSelectedCat] = useState<PieceCategory | 'Todas'>('Todas')

  if (loading) return (
    <SkGrid $cols='repeat(auto-fill, minmax(200px, 1fr))'>
      {Array.from({ length: 12 }).map((_, i) => (
        <SkCard key={i} $h='220px' />
      ))}
    </SkGrid>
  )

  const visibleCats = selectedCat === 'Todas'
    ? categories.filter(c => pieces.some(p => p.category === c))
    : [selectedCat]

  return (
    <>
      <FilterStickyWrap>
        <FilterBar>
          <FilterBtn $active={selectedCat === 'Todas'} onClick={() => setSelectedCat('Todas')}>
            Todas
          </FilterBtn>
          {categories.map(cat => (
            <FilterBtn key={cat} $active={selectedCat === cat} onClick={() => setSelectedCat(cat)}>
              {cat}
            </FilterBtn>
          ))}
        </FilterBar>
      </FilterStickyWrap>

      {visibleCats.map(cat => {
        const catPieces = pieces.filter(p => p.category === cat)
        if (catPieces.length === 0) return null
        return (
          <Section key={cat}>
            <CatTitle>{cat} ({catPieces.length})</CatTitle>
            <PieceGrid>
              {catPieces.map(piece => (
                <PieceCard key={piece.id} onClick={() => navigate(`/pecas/${piece.id}`)}>
                  <Thumb>
                    {piece.img && (
                      <ThumbImg
                        src={imgUrl(piece.img)}
                        alt={piece.name}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
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
