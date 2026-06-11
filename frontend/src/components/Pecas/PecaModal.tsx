import { useState, useEffect } from 'react'
import { useLooks } from '../../hooks/useLooks'
import type { Piece, Look } from '@data/types'
import { imgUrl } from '../../utils/imgUrl'
import { LookModal } from '../Looks/LookModal'
import { getTagColor } from '../../styles/tagColors'
import {
  Overlay, Dialog, ImgWrap, Img, ImgPlaceholder,
  Body, Name, Meta, TipsTitle, TipItem, CloseBtn, ColorDot,
  LooksSectionTitle, LooksCount, LookRow, LookRowTitle,
  LookTagRow, LookTag, FormalityDots, FormalityDot, EmptyLooks,
} from './PecaModal.styles'

interface Props { piece: Piece; onClose: () => void }

export function PecaModal({ piece, onClose }: Props) {
  const { looks } = useLooks()
  const [lookModal, setLookModal] = useState<Look | null>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lookModal) setLookModal(null)
        else onClose()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, lookModal])

  const pieceLooks = looks.filter(l => l.pieces.some(lp => lp.pieceId === piece.id))

  return (
    <>
      <Overlay onClick={onClose}>
        <Dialog onClick={e => e.stopPropagation()}>
          <ImgWrap>
            {piece.img
              ? <Img src={imgUrl(piece.img)} alt={piece.name}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              : <ImgPlaceholder>Sem foto ainda</ImgPlaceholder>
            }
          </ImgWrap>

          <Body>
            <CloseBtn onClick={onClose}>×</CloseBtn>
            <Name>{piece.name}</Name>
            <Meta>
              <ColorDot $color={piece.color} />
              {piece.brand} · {piece.category}
            </Meta>

            <TipsTitle>Sugestões de Uso</TipsTitle>
            <ul>
              {piece.tips.map((tip, i) => <TipItem key={i}>{tip}</TipItem>)}
            </ul>

            {/* ── Looks com esta peça ─────────────────────────────────── */}
            <LooksSectionTitle>
              Looks com esta peça
              <LooksCount>
                {pieceLooks.length === 0
                  ? 'nenhum'
                  : `${pieceLooks.length} look${pieceLooks.length > 1 ? 's' : ''}`}
              </LooksCount>
            </LooksSectionTitle>

            {pieceLooks.length === 0 ? (
              <EmptyLooks>Nenhum look cadastrado com esta peça ainda.</EmptyLooks>
            ) : (
              pieceLooks.map(look => (
                <LookRow key={look.id} onClick={() => setLookModal(look)}>
                  <LookRowTitle>{look.title}</LookRowTitle>
                  <LookTagRow>
                    {look.tags.map(t => (
                      <LookTag key={t} style={{
                        background: getTagColor(t).bg,
                        color: getTagColor(t).text,
                        border: `1px solid ${getTagColor(t).border}`,
                      }}>
                        {t}
                      </LookTag>
                    ))}
                  </LookTagRow>
                  <FormalityDots>
                    {[1,2,3,4,5].map(i => (
                      <FormalityDot key={i} $filled={i <= look.formality} />
                    ))}
                  </FormalityDots>
                  <span style={{ fontSize: 10, color: 'var(--accent, #c8a96e)', opacity: 0.7, flexShrink: 0 }}>
                    ver →
                  </span>
                </LookRow>
              ))
            )}
          </Body>
        </Dialog>
      </Overlay>

      {lookModal && (
        <LookModal look={lookModal} onClose={() => setLookModal(null)} />
      )}
    </>
  )
}
