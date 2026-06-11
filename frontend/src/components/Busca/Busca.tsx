import { useState, useMemo } from 'react'
import { usePieces } from '../../hooks/usePieces'
import { useLooks } from '../../hooks/useLooks'
import type { Piece, Look } from '@data/types'
import { imgUrl } from '../../utils/imgUrl'
import { PecaModal } from '../Pecas/PecaModal'
import { LookModal } from '../Looks/LookModal'
import {
  Wrap, SearchBar, SearchInput, SearchIcon,
  Hint, EmptyState,
  ResultSection, SectionHeader, SectionTitle, Count,
  PieceGrid, PieceCard, PieceThumb, PieceThumbImg, PieceInfo, PieceName, PieceBrand, PieceCat,
  LookGrid, LookCard, LookTitle, TagRow, Tag,
} from './Busca.styles'

function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

export function Busca() {
  const { pieces } = usePieces()
  const { looks } = useLooks()
  const [query, setQuery] = useState('')
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null)
  const [selectedLook, setSelectedLook] = useState<Look | null>(null)

  const q = normalize(query.trim())

  const matchedPieces = useMemo(() => {
    if (!q) return []
    return pieces.filter(piece =>
      normalize(piece.name).includes(q) ||
      normalize(piece.brand).includes(q) ||
      normalize(piece.category).includes(q)
    )
  }, [q])

  const matchedLooks = useMemo(() => {
    if (!q) return []
    return looks.filter(look =>
      normalize(look.title).includes(q) ||
      look.tags.some(tag => normalize(tag).includes(q))
    )
  }, [q])

  const hasResults = matchedPieces.length > 0 || matchedLooks.length > 0
  const hasQuery = query.trim().length > 0

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
              <PieceCard key={p.id} onClick={() => setSelectedPiece(p)}>
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
              <LookCard key={l.id} onClick={() => setSelectedLook(l)}>
                <LookTitle>{l.title}</LookTitle>
                <TagRow>
                  {l.tags.map(t => <Tag key={t} $tag={t}>{t}</Tag>)}
                </TagRow>
              </LookCard>
            ))}
          </LookGrid>
        </ResultSection>
      )}

      {selectedPiece && <PecaModal piece={selectedPiece} onClose={() => setSelectedPiece(null)} />}
      {selectedLook  && <LookModal look={selectedLook}   onClose={() => setSelectedLook(null)} />}
    </Wrap>
  )
}
