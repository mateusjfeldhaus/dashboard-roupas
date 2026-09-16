import React, { useEffect, useRef, useState } from 'react'
import { imgUrl } from '../../utils/imgUrl'
import {
  FilterStickyWrap, FilterBar, FilterBtn,
  Section, CatTitle, PieceGrid,
  PieceCard, Thumb, ThumbImg, ColorBar, PieceName, PieceBrand,
  DescartadasLink,
} from './Pecas.styles'
import { SkGrid, SkCard } from '../Skeleton'
import { usePecas, categories, type ColorGroup } from './usePecas'
import { sortByColor as sortPiecesByColor } from '../../utils/colorSort'
import { isGuest } from '../../api/client'
import type { Piece } from '@data/types'

const SCROLL_KEY = 'pecas-scroll'

function navigateToPeca(navigate: (path: string) => void, id: string) {
  sessionStorage.setItem(SCROLL_KEY, String(window.scrollY))
  navigate(`/pecas/${id}`)
}

export function Pecas() {
  const {
    navigate, pieces, loading,
    selectedCat, setSelectedCat, visibleCats,
    sortByColor, toggleSortByColor,
    colorGroupedPieces,
    reorderGroup,
  } = usePecas()
  const guest = isGuest()

  // Drag-and-drop state (UI local only)
  const [dragId,     setDragId]     = useState<string | null>(null)
  const [dragFamily, setDragFamily] = useState<number | null>(null)
  const [overId,     setOverId]     = useState<string | null>(null)
  const dragOccurred = useRef(false)

  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY)
    if (saved) {
      sessionStorage.removeItem(SCROLL_KEY)
      const y = Number(saved)
      requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'instant' }))
    }
  }, [])

  function handleDragStart(id: string, family: number) {
    dragOccurred.current = true
    setDragId(id)
    setDragFamily(family)
  }

  function handleDragOver(e: React.DragEvent, id: string) {
    e.preventDefault()
    if (id !== overId) setOverId(id)
  }

  function handleDrop(group: ColorGroup) {
    if (!dragId || dragFamily !== group.family || !overId || dragId === overId) {
      cleanup(); return
    }
    const fromIdx = group.pieces.findIndex(p => p.id === dragId)
    const toIdx   = group.pieces.findIndex(p => p.id === overId)
    if (fromIdx === -1 || toIdx === -1) { cleanup(); return }
    const newOrder = [...group.pieces]
    const [moved] = newOrder.splice(fromIdx, 1)
    newOrder.splice(toIdx, 0, moved)
    reorderGroup(newOrder)
    cleanup()
  }

  function cleanup() {
    setDragId(null)
    setDragFamily(null)
    setOverId(null)
  }

  function handleCardClick(id: string) {
    if (dragOccurred.current) { dragOccurred.current = false; return }
    navigateToPeca(navigate, id)
  }

  function renderCard(piece: Piece, group?: ColorGroup) {
    const inDragMode = sortByColor && !guest
    const isDragging = dragId === piece.id
    const isOver     = !!group && overId === piece.id && dragFamily === group.family && !isDragging

    return (
      <PieceCard
        key={piece.id}
        draggable={inDragMode}
        onDragStart={inDragMode ? () => handleDragStart(piece.id, group!.family) : undefined}
        onDragOver={inDragMode ? (e) => handleDragOver(e, piece.id) : undefined}
        onDrop={inDragMode && group ? () => handleDrop(group) : undefined}
        onDragEnd={inDragMode ? cleanup : undefined}
        onClick={() => handleCardClick(piece.id)}
        style={{
          position: 'relative',
          opacity:   isDragging ? 0.3 : 1,
          outline:   isOver ? '2px solid var(--accent, #c8a96e)' : undefined,
          outlineOffset: isOver ? '-2px' : undefined,
          cursor:    inDragMode ? (dragId ? 'grabbing' : 'grab') : 'pointer',
          transition: 'opacity 0.12s',
          userSelect: 'none',
        }}
      >
        {/* Handle de drag */}
        {inDragMode && (
          <div style={{
            position: 'absolute', top: 5, right: 7,
            fontSize: 14, opacity: 0.3, pointerEvents: 'none',
            userSelect: 'none', lineHeight: 1,
          }}>
            ⠿
          </div>
        )}

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
        <PieceBrand>
          {sortByColor
            ? `${piece.brand ? piece.brand + ' · ' : ''}${piece.category}`
            : piece.brand}
        </PieceBrand>
      </PieceCard>
    )
  }

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
            title="Ordenar por cor (drag-and-drop dentro de cada grupo)"
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
        // ── Modo cor: peças agrupadas por família, drag-and-drop dentro de cada grupo ──
        colorGroupedPieces.length === 0 ? null : (
          <>
            {!guest && (
              <div style={{ fontSize: 11, opacity: 0.4, marginBottom: 12, marginTop: -4 }}>
                Arraste as peças para reordenar dentro de cada grupo
              </div>
            )}
            {colorGroupedPieces.map(group => (
              <Section
                key={group.family}
                onDragLeave={(e) => {
                  // Só limpa overId se o mouse saiu da Section inteira
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setOverId(null)
                  }
                }}
              >
                <CatTitle>
                  {group.label}
                  <span style={{ fontWeight: 400, opacity: 0.5, marginLeft: 8, fontSize: 11 }}>
                    {group.pieces.length}
                  </span>
                </CatTitle>
                <PieceGrid>
                  {group.pieces.map(piece => renderCard(piece, group))}
                </PieceGrid>
              </Section>
            ))}
          </>
        )
      ) : (
        // ── Modo normal: agrupado por categoria, ordenado por cor ──
        visibleCats.map(cat => {
          const catPieces = sortPiecesByColor(pieces.filter(p => p.category === cat))
          if (catPieces.length === 0) return null
          return (
            <Section key={cat}>
              <CatTitle>{cat} ({catPieces.length})</CatTitle>
              <PieceGrid>
                {catPieces.map(piece => renderCard(piece))}
              </PieceGrid>
            </Section>
          )
        })
      )}
    </>
  )
}
