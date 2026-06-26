import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { usePieces } from '../hooks/usePieces'
import { useLooks } from '../hooks/useLooks'
import { SkCard, SkStack, SkLine } from '../components/Skeleton'
import { imgUrl } from '../utils/imgUrl'
import { getTagColor } from '../styles/tagColors'
import { useNotes } from '../hooks/useNotes'
import {
  ImgWrap, Img, ImgPlaceholder,
  Body, Name, Meta, TipsTitle, TipItem, ColorDot,
  LooksSectionTitle, LooksCount, LookRow, LookRowTitle,
  LookTagRow, LookTag, FormalityDots, FormalityDot, EmptyLooks,
  NotesSection, NotesLabel, NotesTitle, NotesStatus, NotesTextarea,
} from '../components/Pecas/PecaModal.styles'

// ── Page layout ───────────────────────────────────────────────────────────────

const PageWrap = styled.div`
  max-width: 560px;
  margin: 0 auto;
`

const BackBtn = styled.button`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 20px;
  padding: 6px 0;
  transition: color 0.15s;
  &:hover { color: ${p => p.theme.colors.text}; }
`

const HideBtn = styled.button`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 20px; margin-left: 16px;
  padding: 6px 10px;
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 8px;
  transition: all 0.15s;
  &:hover { color: ${p => p.theme.colors.text}; border-color: currentColor; }
`

const Card = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 16px;
  overflow: hidden;
`

const NotFound = styled.div`
  text-align: center;
  padding: 60px 24px;
  color: ${p => p.theme.colors.textMuted};
  font-size: 15px;
`

// ─────────────────────────────────────────────────────────────────────────────

export function PecaPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') navigate(-1) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])
  const { allPieces, toggleHidden, loading: loadingPieces } = usePieces()
  const { looks, loading: loadingLooks } = useLooks()

  const piece = allPieces.find(p => p.id === id)
  const { notes, status: notesStatus, setNotes } = useNotes(
    'piece',
    piece?.id ?? '',
    piece?.notes,
  )

  if (loadingPieces || loadingLooks) return (
    <PageWrap>
      <SkStack $gap='20px'>
        <SkLine $w='80px' $h='14px' />
        <SkCard $h='300px' />
        <SkCard $h='200px' />
      </SkStack>
    </PageWrap>
  )

  if (!piece) {
    return (
      <PageWrap>
        <BackBtn onClick={() => navigate('/pecas')}>← Peças</BackBtn>
        <NotFound>Peça não encontrada.</NotFound>
      </PageWrap>
    )
  }

  const pieceLooks = looks.filter(l => l.pieces.some(lp => lp.pieceId === piece.id))

  return (
    <PageWrap>
      <BackBtn onClick={() => navigate(-1)}>← Voltar</BackBtn>
      <HideBtn
        onClick={() => toggleHidden(piece.id, !piece.hidden)}
        title={piece.hidden ? 'Tornar visível' : 'Ocultar peça'}
      >
        {piece.hidden ? '👁 Tornar visível' : '🙈 Ocultar peça'}
      </HideBtn>

      <Card>
        <ImgWrap>
          {piece.img
            ? <Img src={imgUrl(piece.img)} alt={piece.name}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
            : <ImgPlaceholder>Sem foto ainda</ImgPlaceholder>
          }
        </ImgWrap>

        <Body>
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
              <LookRow key={look.id} onClick={() => navigate(`/looks/${look.id}`)}>
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
      </Card>
    </PageWrap>
  )
}
