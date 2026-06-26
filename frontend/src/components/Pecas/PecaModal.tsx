import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLooks } from '../../hooks/useLooks'
import type { Piece, Look } from '@data/types'
import { imgUrl } from '../../utils/imgUrl'
import { getTagColor } from '../../styles/tagColors'
import { useNotes } from '../../hooks/useNotes'
import {
  Overlay, Dialog, ImgWrap, Img, ImgPlaceholder,
  Body, Name, Meta, TipsTitle, TipItem, CloseBtn, ColorDot,
  LooksSectionTitle, LooksCount, LookRow, LookRowTitle,
  LookTagRow, LookTag, FormalityDots, FormalityDot, EmptyLooks,
  NotesSection, NotesLabel, NotesTitle, NotesStatus, NotesTextarea,
} from './PecaModal.styles'

interface Props { piece: Piece; onClose: () => void }

export function PecaModal({ piece, onClose }: Props) {
  const navigate = useNavigate()
  const { looks } = useLooks()
  const { notes, status: notesStatus, setNotes } = useNotes('piece', piece.id, piece.notes)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

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
                <LookRow key={look.id} onClick={() => { navigate(`/looks/${look.id}`); onClose() }}>
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

            {/* ── Observações ────────────────────────────────────────────── */}
            <NotesSection>
              <NotesLabel>
                <NotesTitle>Observações</NotesTitle>
                <NotesStatus $status={notesStatus}>
                  {notesStatus === 'saving' ? 'salvando…' :
                   notesStatus === 'saved'  ? '✓ salvo'   :
                   notesStatus === 'error'  ? 'erro ao salvar' : ''}
                </NotesStatus>
              </NotesLabel>
              <NotesTextarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Adicione observações sobre esta peça…"
              />
            </NotesSection>
          </Body>
        </Dialog>
      </Overlay>

    </>
  )
}
