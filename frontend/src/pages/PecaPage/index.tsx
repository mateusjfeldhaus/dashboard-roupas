import React from 'react'
import { ColorPalettePicker } from '../../components/ColorPalettePicker'
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
import { CAT_LIST } from '../NovaPecaPage/useNovaPecaPage'

const FLabel = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted, #888)', marginBottom: 6, ...style }}>
    {children}
  </div>
)
const FField = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column' as const }}>{children}</div>
)
const inputStyle: React.CSSProperties = {
  padding: '9px 12px', borderRadius: 8,
  border: '1px solid var(--border, #333)',
  background: 'var(--bg, #111)',
  color: 'inherit', fontSize: 13,
  width: '100%', boxSizing: 'border-box' as const,
}

export function PecaPage() {
  const {
    navigate, piece, pieceLooks, loading, notes, toggleHidden,
    photo, photoInputRef, handlePhotoChange, removePhoto,
    lightboxOpen, setLightboxOpen,
    editOpen, openEdit, setEditOpen,
    editDesc, setEditDesc,
    editName, handleEditNameChange, resetEditName, editNameEdited,
    editBrand, setEditBrand,
    editCategory, setEditCategory,
    editColor, setEditColor,
    editTips, setEditTips,
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
        <ImgWrap style={{ position: 'relative' }}>
          {piece.img
            ? <Img
                src={imgUrl(piece.img)}
                alt={piece.name}
                style={{ cursor: 'zoom-in' }}
                onClick={() => setLightboxOpen(true)}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            : <ImgPlaceholder>Sem foto ainda</ImgPlaceholder>
          }
          {!isGuest() && (
            <div style={{
              position: 'absolute', bottom: 8, right: 8,
              display: 'flex', gap: 6,
            }}>
              <label
                htmlFor={`peca-photo-${piece.id}`}
                style={{
                  padding: '5px 10px', borderRadius: 8, cursor: 'pointer',
                  background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)',
                  fontSize: 11, fontWeight: 700, color: '#fff',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {photo.uploading ? '⏳' : piece.img ? '🔄' : '📸'}
                <input
                  id={`peca-photo-${piece.id}`}
                  type="file"
                  accept="image/*"
                  ref={photoInputRef}
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
              </label>
              {piece.img && (
                <button
                  onClick={removePhoto}
                  disabled={photo.uploading}
                  style={{
                    padding: '5px 10px', borderRadius: 8, cursor: 'pointer',
                    background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)',
                    fontSize: 11, fontWeight: 700, color: '#ef4444',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  🗑
                </button>
              )}
            </div>
          )}
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
      {lightboxOpen && piece.img && (
        <div
          onClick={() => setLightboxOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out',
          }}
        >
          <img
            src={imgUrl(piece.img)}
            alt={piece.name}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw', maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: 12,
              boxShadow: '0 8px 48px rgba(0,0,0,0.6)',
              cursor: 'default',
            }}
          />
          <button
            onClick={() => setLightboxOpen(false)}
            style={{
              position: 'fixed', top: 20, right: 24,
              background: 'rgba(255,255,255,0.1)', border: 'none',
              color: '#fff', fontSize: 22, borderRadius: 8,
              padding: '4px 10px', cursor: 'pointer',
              backdropFilter: 'blur(4px)',
            }}
          >
            ✕
          </button>
        </div>
      )}

      {editOpen && (
        <DialogOverlay onClick={() => setEditOpen(false)}>
          <DialogBox onClick={(e: React.MouseEvent) => e.stopPropagation()} style={{ textAlign: 'left', maxWidth: 480, width: '90vw' }}>
            <DialogTitle style={{ marginBottom: 20 }}>Editar peça</DialogTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Foto */}
              <FField>
                <FLabel>Foto</FLabel>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: 10,
                    border: '1px dashed var(--border, #333)',
                    background: 'var(--surface, #1a1a1a)',
                    overflow: 'hidden', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {piece.img
                      ? <img src={imgUrl(piece.img)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <span style={{ fontSize: 24, opacity: 0.3 }}>📷</span>
                    }
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="edit-peca-foto" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '6px 12px', borderRadius: 8, cursor: 'pointer',
                      border: '1px solid var(--border, #333)',
                      fontSize: 12, fontWeight: 600, color: 'var(--text-muted, #888)',
                    }}>
                      {photo.uploading ? '⏳ Enviando…' : piece.img ? '🔄 Trocar foto' : '📸 Adicionar foto'}
                      <input
                        id="edit-peca-foto"
                        type="file"
                        accept="image/*"
                        ref={photoInputRef}
                        onChange={handlePhotoChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                    {piece.img && (
                      <button
                        onClick={removePhoto}
                        disabled={photo.uploading}
                        style={{
                          padding: '6px 12px', borderRadius: 8, cursor: 'pointer',
                          border: '1px solid var(--border, #333)',
                          background: 'none', fontSize: 12, fontWeight: 600,
                          color: '#ef4444', textAlign: 'left',
                        }}
                      >
                        🗑 Remover foto
                      </button>
                    )}
                  </div>
                </div>
              </FField>

              <FField>
                <FLabel>Descrição <span style={{ fontWeight: 400, textTransform: 'none' }}>(cor, material, detalhe)</span></FLabel>
                <input style={inputStyle} value={editDesc} onChange={e => setEditDesc(e.target.value)} placeholder="ex: Chumbo Lã 120" />
              </FField>

              <FField>
                <FLabel>Marca</FLabel>
                <input style={inputStyle} value={editBrand} onChange={e => setEditBrand(e.target.value)} placeholder="ex: Bespoke" />
              </FField>

              <FField>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <FLabel style={{ marginBottom: 0 }}>
                    Nome {editNameEdited
                      ? <span style={{ fontWeight: 400, color: 'var(--accent, #c8a96e)' }}>(editado)</span>
                      : <span style={{ fontWeight: 400, textTransform: 'none' }}>(gerado automaticamente)</span>}
                  </FLabel>
                  {editNameEdited && (
                    <button onClick={resetEditName} style={{ fontSize: 11, background: 'none', border: 'none', color: 'var(--text-muted, #888)', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>
                      resetar
                    </button>
                  )}
                </div>
                <input
                  style={{ ...inputStyle, ...(editNameEdited ? { borderColor: 'var(--accent, #c8a96e)' } : {}) }}
                  value={editName}
                  onChange={e => handleEditNameChange(e.target.value)}
                  placeholder="ex: Chumbo Lã 120 - Bespoke"
                />
              </FField>

              <FField>
                <FLabel>Categoria</FLabel>
                <select style={inputStyle} value={editCategory} onChange={e => setEditCategory(e.target.value)}>
                  {CAT_LIST.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </FField>

              <FField>
                <FLabel>Cor da peça</FLabel>
                <ColorPalettePicker value={editColor} onChange={setEditColor} />
              </FField>

              <FField>
                <FLabel>Dicas de uso <span style={{ fontWeight: 400, textTransform: 'none' }}>(uma por linha)</span></FLabel>
                <textarea
                  style={{ ...inputStyle, resize: 'vertical' }}
                  value={editTips}
                  onChange={e => setEditTips(e.target.value)}
                  rows={4}
                />
              </FField>

            </div>
            <DialogActions style={{ marginTop: 20 }}>
              <CancelBtn onClick={() => setEditOpen(false)}>Cancelar</CancelBtn>
              <SaveBtn onClick={saveEdit} disabled={editSaving || !editName.trim()}>
                {editSaving ? 'Salvando…' : 'Salvar'}
              </SaveBtn>
            </DialogActions>
          </DialogBox>
        </DialogOverlay>
      )}
    </PageWrap>
  )
}
