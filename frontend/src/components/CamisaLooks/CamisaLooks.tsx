import { useState } from 'react'
import { shirtLooks } from '@data/shirtLooks'
import { usePieces } from '../../hooks/usePieces'
import type { LookPiece, Look } from '@data/types'
import { imgUrl } from '../../utils/imgUrl'
import { LookModal } from '../Looks/LookModal'
import {
  ShirtSection, ShirtHeader, ShirtThumb, ShirtThumbImg, ShirtName, ShirtBrand,
  LooksRow, LookCard, LookType,
  PieceRow, PieceItem, PieceDot, PieceText,
  ClickHint, Divider,
} from './CamisaLooks.styles'

function buildSyntheticLook(title: string, tag: string, lps: LookPiece[]): Look {
  return {
    id: title,
    title,
    tags: [tag as never],
    formality: tag === 'formal-gravata' ? 5 : tag === 'formal' ? 4 : 2,
    tip: '',
    pieces: lps,
  }
}

type ModalInfo = { look: Look } | null

interface Props {
  filterIds?: string[]
}

export function CamisaLooks({ filterIds }: Props) {
  const { pieces } = usePieces()
  const [modal, setModal] = useState<ModalInfo>(null)

  const filtered = filterIds
    ? shirtLooks.filter(sl => filterIds.includes(sl.shirtId))
    : shirtLooks

  return (
    <>
      {filtered.map((sl, idx) => {
        const shirt = pieces.find(p => p.id === sl.shirtId)
        if (!shirt) return null

        const variants = [
          { type: 'gravata'   as const, label: 'Formal com Gravata', lps: sl.formalComGravata },
          { type: 'nogravata' as const, label: 'Formal s/ Gravata',  lps: sl.formalSemGravata },
          { type: 'casual'    as const, label: 'Casual',             lps: sl.casual },
        ]

        return (
          <div key={sl.shirtId}>
            {idx > 0 && <Divider />}
            <ShirtSection>
              <ShirtHeader>
                <ShirtThumb>
                  <ShirtThumbImg
                    src={imgUrl(shirt.img)}
                    alt={shirt.name}
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </ShirtThumb>
                <div>
                  <ShirtName>{shirt.name}</ShirtName>
                  <ShirtBrand>{shirt.brand}</ShirtBrand>
                </div>
              </ShirtHeader>

              <LooksRow>
                {variants.map(({ type, label, lps }) => {
                  const resolved = lps
                    .map(lp => {
                      const p = pieces.find(x => x.id === lp.pieceId)
                      return p ? { cat: lp.cat, piece: p } : null
                    })
                    .filter(Boolean) as { cat: string; piece: typeof pieces[0] }[]

                  const syntheticLook = buildSyntheticLook(
                    shirt.name + ' — ' + label,
                    type === 'gravata' ? 'formal' : type === 'nogravata' ? 'formal' : 'casual',
                    lps,
                  )

                  return (
                    <LookCard key={type} onClick={() => setModal({ look: syntheticLook })}>
                      <LookType $type={type}>{label}</LookType>
                      <PieceRow>
                        {resolved.map(({ cat, piece }) => (
                          <PieceItem key={piece.id}>
                            <PieceDot $color={piece.color} />
                            <PieceText>{cat}: {piece.name}</PieceText>
                          </PieceItem>
                        ))}
                      </PieceRow>
                      <ClickHint>Ver flat-lay</ClickHint>
                    </LookCard>
                  )
                })}
              </LooksRow>
            </ShirtSection>
          </div>
        )
      })}

      {modal && <LookModal look={modal.look} onClose={() => setModal(null)} />}
    </>
  )
}
