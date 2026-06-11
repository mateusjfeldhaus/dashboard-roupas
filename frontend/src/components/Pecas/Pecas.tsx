import { useState } from 'react'
import { usePieces } from '../../hooks/usePieces'
import type { Piece, PieceCategory } from '@data/types'
import { imgUrl } from '../../utils/imgUrl'
import { PecaModal } from './PecaModal'
import {
  FilterStickyWrap, FilterBar, FilterBtn,
  Section, CatTitle, PieceGrid,
  PieceCard, Thumb, ThumbImg, ColorBar, PieceName, PieceBrand,
} from './Pecas.styles'

const categories: PieceCategory[] = [
  'Camisa', 'Calça', 'Blazer', 'Costume', 'Terno',
  'Sapato', 'Relógio', 'Gravata', 'Cinto', 'Suéter',
  'Polo', 'Camiseta', 'Jaqueta', 'Acessório',
]

export function Pecas() {
  const { pieces } = usePieces()
  const [selectedCat, setSelectedCat] = useState<PieceCategory | 'Todas'>('Todas')
  const [modal, setModal] = useState<Piece | null>(null)

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
                <PieceCard key={piece.id} onClick={() => setModal(piece)}>
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

      {modal && <PecaModal piece={modal} onClose={() => setModal(null)} />}
    </>
  )
}
