import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { usePieces } from '../../hooks/usePieces'
import type { PieceCategory } from '@data/types'
import { imgUrl } from '../../utils/imgUrl'
import {
  FilterStickyWrap, FilterBar, FilterBtn,
  Section, CatTitle, PieceGrid,
  PieceCard, Thumb, ThumbImg, ColorBar, PieceName, PieceBrand,
} from './Pecas.styles'
import { SkGrid, SkCard } from '../Skeleton'

const DescartadasLink = styled(Link)`
  font-size: 12px; font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  padding: 6px 12px;
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 20px;
  margin-left: auto;
  white-space: nowrap;
  transition: all 0.15s;
  &:hover { color: ${p => p.theme.colors.text}; border-color: currentColor; }
`

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
          <DescartadasLink to="/pecas/descartadas">🗄 Descartadas</DescartadasLink>
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
