import React from 'react'
import { usePecaPage } from './usePecaPage'
import { imgUrl } from '../../utils/imgUrl'
import { getTagColor } from '../../styles/tagColors'
import {
  ImgWrap, Img, ImgPlaceholder,
  Body, Name, Meta, TipsTitle, TipItem, ColorDot,
  LooksSectionTitle, LooksCount, LookRow, LookRowTitle,
  LookTagRow, LookTag, FormalityDots, FormalityDot, EmptyLooks,
  NotesSection, NotesLabel, NotesTitle, NotesStatus, NotesTextarea,
} from '../../components/Pecas/PecaModal.styles'
import { SkCard, SkStack, SkLine } from '../../components/Skeleton'
import { PageWrap, BackBtn, HideBtn, EditBtn, Card, NotFound } from './PecaPage.styles'
import { DialogOverlay, DialogBox, DialogTitle, DialogActions, SaveBtn, CancelBtn } from '../LookPage/LookPage.styles'
import { isGuest } from '../../api/client'

export function PecaPage() {
  const {
    navigate, piece, pieceLooks, loading, notes, toggleHidden,
    editOpen, openEdit, setEditOpen,
    editName, setEditName, editBrand, setEditBrand, editTips, setEditTips,
    editSaving, saveEdit,
  } = usePecaPage()

  if (loading) return (
    <PageWrap>
      <SkStack $gap="20px">
        <SkLine $w="80px" $h="14px" />
        <SkCard $h="300px" />
        <SkCard $h="200px" />
      </SkStack>
    </PageWrap>
  )

  if (!piece) return (
    <PageWrap>
      <BackBtn onClick={() => navigate('/pecas')}>← Peças</BackBtn>
      <NotFound>Peça não encontrada.</NotFound>
    </PageWrap>
  )

  return (
    <PageWrap>
      <BackBtn onClick={() => navigate(-1)}>← Voltar</BackBtn>
      {!isGuest() && (
        <>
          <HideBtn
            onClick={() => toggleHidden(piece.id, !piece.hidden)}
            title={piece.hidden ? 'Tornar visível' : 'Ocultar peça'}
          >
            {piece.hidden ? '👁 Tornar visível' : '🙈 Ocultar peça'}
          </HideBtn>
          <EditBtn onClick={openEdit} title="Editar nome, marca e dicas">
            ✏️ Editar item
          </EditBtn>
        </>
      )}

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
          ) : pieceLooks.map(look => (
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
          ))}

          <NotesSection>
            <NotesLabel>
              <NotesTitle>Observações</NotesTitle>
              <NotesStatus $status={notes.status}>
                {notes.status === 'saving' ? 'salvando…' :
                 notes.status === 'saved'  ? '✓ salvo'   :
                 notes.status === 'error'  ? 'erro ao salvar' : ''}
              </NotesStatus>
            </NotesLabel>
            <NotesTextarea
              value={notes.notes}
              onChange={e => !isGuest() && notes.setNotes(e.target.value)}
              readOnly={isGuest()}
              placeholder={isGuest() ? 'Sem observações' : 'Adicione observações sobre esta peça…'}
            />
          </NotesSection>
        </Body>
      </Card>
      {editOpen && (
        <DialogOverlay onClick={() => setEditOpen(false)}>
          <DialogBox onClick={(e: React.MouseEvent) => e.stopPropagation()} style={{ textAlign: 'left', maxWidth: 420 }}>
            <DialogTitle style={{ marginBottom: 16 }}>Editar peça</DialogTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <label style={{ fontSize: 12, color: 'var(--text-muted, #888)', fontWeight: 600 }}>
                Nome
                <input
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  style={{ display: 'block', width: '100%', marginTop: 4, padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border, #333)', background: 'var(--bg, #111)', color: 'inherit', fontSize: 13 }}
                />
              </label>
              <label style={{ fontSize: 12, color: 'var(--text-muted, #888)', fontWeight: 600 }}>
                Marca
                <input
                  value={editBrand}
                  onChange={e => setEditBrand(e.target.value)}
                  style={{ display: 'block', width: '100%', marginTop: 4, padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border, #333)', background: 'var(--bg, #111)', color: 'inherit', fontSize: 13 }}
                />
              </label>
              <label style={{ fontSize: 12, color: 'var(--text-muted, #888)', fontWeight: 600 }}>
                Dicas de uso <span style={{ fontWeight: 400 }}>(uma por linha)</span>
                <textarea
                  value={editTips}
                  onChange={e => setEditTips(e.target.value)}
                  rows={4}
                  style={{ display: 'block', width: '100%', marginTop: 4, padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border, #333)', background: 'var(--bg, #111)', color: 'inherit', fontSize: 13, resize: 'vertical' }}
                />
              </label>
            </div>
            <DialogActions style={{ marginTop: 20 }}>
              <CancelBtn onClick={() => setEditOpen(false)}>Cancelar</CancelBtn>
              <SaveBtn onClick={saveEdit} disabled={editSaving}>
                {editSaving ? 'Salvando…' : 'Salvar'}
              </SaveBtn>
            </DialogActions>
          </DialogBox>
        </DialogOverlay>
      )}
    </PageWrap>
  )
}
