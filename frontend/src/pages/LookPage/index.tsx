import React from 'react'
import { useLookPage } from './useLookPage'
import { imgUrl } from '../../utils/imgUrl'
import { formatDate } from '../../hooks/useUsage'
import { SEASONS, OCCASIONS } from '../../styles/tags'
import { getTagColor } from '../../styles/tagColors'
import { isGuest } from '../../api/client'
import {
  Header, Title, TagRow, Tag,
  Body, FlatLayTitle, FlatLay, PieceSlot, PieceImg, Img,
  PieceCat, PieceName, Tip, Formalidade, Dot,
  UsageRow, UsageStat, UsageBadge, MarkBtn, UndoBtn,
  RatingRow, RatingLabel, StarRow, Star, ExportBtn,
  NotesSection, NotesLabel, NotesTitle, NotesStatus, NotesTextarea,
  PhotoInlineBtn, PhotoViewBtn, PhotoUploadInput,
  LightboxOverlay, LightboxImg, LightboxClose, LightboxActions, LightboxBtn, LightboxDelBtn,
} from '../../components/Looks/LookModal.styles'
import { SkCard, SkStack, SkLine } from '../../components/Skeleton'
import {
  PageWrap, BackBtn, HideBtn, Card, NotFound,
  EditBtn, EditBar, SaveBtn, CancelBtn,
  EditSlot, RemoveBadge, AddSection, AddLabel, PieceGrid, PieceChip,
  DialogOverlay, DialogBox, DialogTitle, DialogText, DialogActions,
  SwapOverlay, SwapPanel, SwapTitle, SwapList, SwapItem, SwapItemImg, SwapRemoveBtn,
} from './LookPage.styles'

export function LookPage() {
  const {
    navigate, look, pieces, piecesInLook, looksLoading,
    usage, rating, notes, photo,
    setHovered,
    exporting, lightboxOpen, setLightboxOpen,
    uploadRef, replaceRef,
    handleExport, handleStarClick, handleFileChange, handleRemove,
    toggleHidden,
    editMode, pendingPieces, confirmOpen, setConfirmOpen, saving,
    startEdit, cancelEdit, togglePiece, confirmSave,
    swapTarget, setSwapTarget, swapPiece, removePiece,
    tagEditOpen, setTagEditOpen, pendingTags, toggleTag, pendingFormality, setPendingFormality,
    saveTagEdit, tagSaving, openTagEdit,
  } = useLookPage()

  const guest = isGuest()

  if (looksLoading) return (
    <PageWrap>
      <SkStack $gap="20px">
        <SkLine $w="80px" $h="14px" />
        <SkCard $h="420px" />
        <SkCard $h="180px" />
      </SkStack>
    </PageWrap>
  )

  if (!look) return (
    <PageWrap>
      <BackBtn onClick={() => navigate('/looks')}>← Looks</BackBtn>
      <NotFound>Look não encontrado.</NotFound>
    </PageWrap>
  )

  const pendingIds = new Set(pendingPieces.map(lp => lp.pieceId))

  return (
    <>
      <PageWrap>
        <BackBtn onClick={() => navigate(-1)}>← Voltar</BackBtn>
        {!guest && (
          <HideBtn
            onClick={() => toggleHidden(look.id, !look.hidden)}
            title={look.hidden ? 'Tornar visível' : 'Ocultar look'}
          >
            {look.hidden ? '👁 Tornar visível' : '🙈 Ocultar look'}
          </HideBtn>
        )}
        {!guest && !editMode && (
          <EditBtn onClick={startEdit} title="Adicionar ou remover peças deste look">
            ✏️ Editar peças
          </EditBtn>
        )}
        {!guest && !editMode && (
          <EditBtn onClick={openTagEdit} title="Editar tags deste look">
            🏷 Tags
          </EditBtn>
        )}

        <Card>
          {editMode && (
            <EditBar>
              <SaveBtn onClick={() => setConfirmOpen(true)}>Salvar alterações</SaveBtn>
              <CancelBtn onClick={cancelEdit}>Cancelar</CancelBtn>
            </EditBar>
          )}

          <Header>
            <div>
              <Title>{look.title}</Title>
              <TagRow>
                {look.tags.map(t => <Tag key={t} $tag={t}>{t}</Tag>)}
              </TagRow>
              <Formalidade>
                {[1, 2, 3, 4, 5].map(i => <Dot key={i} $filled={i <= look.formality} />)}
              </Formalidade>

              {photo.photoId ? (
                <PhotoViewBtn onClick={() => setLightboxOpen(true)}>
                  📸 Ver look completo
                </PhotoViewBtn>
              ) : !guest ? (
                <PhotoInlineBtn htmlFor={`upload-photo-${look.id}`}>
                  {photo.uploading ? '⏳ Enviando…' : '📸 Adicionar foto'}
                  <PhotoUploadInput
                    id={`upload-photo-${look.id}`}
                    ref={uploadRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </PhotoInlineBtn>
              ) : null}

              <RatingRow>
                <RatingLabel>Avaliação:</RatingLabel>
                <StarRow onMouseLeave={() => !guest && setHovered(0)}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <Star
                      key={n}
                      $filled={n <= rating.displayRating}
                      $loading={rating.loading}
                      onMouseEnter={() => !guest && setHovered(n)}
                      onClick={() => !guest && handleStarClick(n)}
                      title={`${n}/10`}
                      style={guest ? { cursor: 'default' } : undefined}
                    >
                      {n <= rating.displayRating ? '★' : '☆'}
                    </Star>
                  ))}
                </StarRow>
                {!rating.loading && rating.rating > 0 && <RatingLabel style={{ fontWeight: 700, fontSize: 13 }}>{rating.rating}/10</RatingLabel>}
                {!rating.loading && rating.rating === 0 && <RatingLabel>sem avaliação</RatingLabel>}
              </RatingRow>

              <UsageRow>
                {!guest && (
                  <MarkBtn $loading={usage.loading} disabled={usage.loading} onClick={usage.markUsed} title="Marcar como usado hoje">
                    +
                  </MarkBtn>
                )}
                {!usage.loading && usage.count === 0 && <UsageStat>Nunca usado</UsageStat>}
                {!usage.loading && usage.count > 0 && (
                  <>
                    <UsageStat><UsageBadge>{usage.count}×</UsageBadge>usado{usage.count !== 1 ? 's' : ''}</UsageStat>
                    <UsageStat>· último: <strong>{formatDate(usage.lastDate!)}</strong></UsageStat>
                    {!guest && <UndoBtn onClick={usage.undoLast}>desfazer</UndoBtn>}
                  </>
                )}
              </UsageRow>
            </div>
          </Header>

          <Body>
            <FlatLayTitle>
              {editMode ? 'Peças no look (clique para remover)' : 'Flat-Lay do Look'}
            </FlatLayTitle>
            <FlatLay>
              {editMode
                ? pendingPieces.map(lp => {
                  const piece = pieces.find(p => p.id === lp.pieceId)
                  if (!piece) return null
                  return (
                    <EditSlot key={piece.id} onClick={() => togglePiece(piece)} title="Clique para remover">
                      <PieceImg $color={piece.color}>
                        <Img
                          src={imgUrl(piece.img)}
                          alt={piece.name}
                          onError={e => {
                            const el = e.target as HTMLImageElement
                            el.style.display = 'none'
                            el.parentElement!.style.background = piece.color + '22'
                          }}
                        />
                      </PieceImg>
                      <PieceCat>{lp.cat}</PieceCat>
                      <PieceName>{piece.name}</PieceName>
                      <RemoveBadge>✕</RemoveBadge>
                    </EditSlot>
                  )
                })
                : piecesInLook.map(({ cat, piece }) => (
                  <PieceSlot key={piece.id} onClick={() => !guest && setSwapTarget({ cat, pieceId: piece.id })} title={guest ? piece.name : `Trocar ou remover ${piece.name}`} style={guest ? { cursor: 'default' } : undefined}>
                    <PieceImg $color={piece.color}>
                      <Img
                        src={imgUrl(piece.img)}
                        alt={piece.name}
                        onError={e => {
                          const el = e.target as HTMLImageElement
                          el.style.display = 'none'
                          el.parentElement!.style.background = piece.color + '22'
                        }}
                      />
                    </PieceImg>
                    <PieceCat>{cat}</PieceCat>
                    <PieceName>{piece.name}</PieceName>
                  </PieceSlot>
                ))
              }
            </FlatLay>

            {/* Adicionar peças (modo edição) */}
            {editMode && (
              <AddSection>
                <AddLabel>Adicionar peça</AddLabel>
                <PieceGrid>
                  {pieces.filter(p => !p.hidden).map(p => (
                    <PieceChip
                      key={p.id}
                      $active={pendingIds.has(p.id)}
                      onClick={() => togglePiece(p)}
                      title={p.name}
                    >
                      <span style={{ fontSize: 10, opacity: 0.6 }}>{p.category}</span>
                      {p.name}
                    </PieceChip>
                  ))}
                </PieceGrid>
              </AddSection>
            )}

            {!editMode && (
              <>
                <FlatLayTitle>Dica do Stylist</FlatLayTitle>
                <Tip>{look.tip}</Tip>

                <NotesSection>
                  <NotesLabel>
                    <NotesTitle>Observações</NotesTitle>
                    <NotesStatus $status={notes.status}>
                      {notes.status === 'saving' ? 'salvando…' :
                        notes.status === 'saved' ? '✓ salvo' :
                          notes.status === 'error' ? 'erro ao salvar' : ''}
                    </NotesStatus>
                  </NotesLabel>
                  <NotesTextarea
                    value={notes.notes}
                    onChange={e => !guest && notes.setNotes(e.target.value)}
                    readOnly={guest}
                    placeholder={guest ? 'Sem observações' : 'Adicione observações sobre este look…'}
                  />
                </NotesSection>

                <ExportBtn
                  onClick={handleExport}
                  $loading={exporting}
                  disabled={exporting}
                  title="Exportar como imagem PNG 1080×1350"
                  style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}
                >
                  {exporting ? '⏳ Gerando imagem…' : '📥 Exportar look como imagem'}
                </ExportBtn>
              </>
            )}
          </Body>
        </Card>
      </PageWrap>

      {/* Lightbox de foto */}
      {lightboxOpen && photo.photoId && (
        <LightboxOverlay onClick={() => setLightboxOpen(false)}>
          <LightboxClose onClick={() => setLightboxOpen(false)}>✕</LightboxClose>
          <LightboxImg
            src={photo.photoUrl ?? ''}
            alt={look.title}
            key={photo.photoId}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          />
          {!guest && <LightboxActions onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <LightboxBtn htmlFor={`replace-photo-${look.id}`}>
              🔄 Trocar foto
              <PhotoUploadInput
                id={`replace-photo-${look.id}`}
                type="file"
                accept="image/*"
                ref={replaceRef}
                onChange={e => { if (e.target.files?.[0]) photo.upload(e.target.files[0]) }}
              />
            </LightboxBtn>
            <LightboxDelBtn onClick={handleRemove} disabled={photo.uploading}>
              🗑 Remover foto
            </LightboxDelBtn>
          </LightboxActions>}
        </LightboxOverlay>
      )}

      {/* Painel de troca / remoção de peça */}
      {swapTarget && (() => {
        const sameCat = pieces.filter(p => !p.hidden && p.category === swapTarget.cat)
        return (
          <SwapOverlay onClick={() => setSwapTarget(null)}>
            <SwapPanel onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <SwapTitle>Trocar · {swapTarget.cat}</SwapTitle>
              <SwapList>
                {sameCat.map(p => (
                  <SwapItem
                    key={p.id}
                    $active={p.id === swapTarget.pieceId}
                    onClick={() => p.id !== swapTarget.pieceId && swapPiece(p.id)}
                    disabled={saving}
                  >
                    <SwapItemImg $color={p.color}>
                      <img src={imgUrl(p.img)} alt="" />
                    </SwapItemImg>
                    {p.name}
                    {p.id === swapTarget.pieceId && <span style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.5 }}>atual</span>}
                  </SwapItem>
                ))}
              </SwapList>
              <SwapRemoveBtn onClick={removePiece} disabled={saving}>
                🗑 Remover {swapTarget.cat} do look
              </SwapRemoveBtn>
            </SwapPanel>
          </SwapOverlay>
        )
      })()}

      {/* Dialog de edição de tags */}
      {tagEditOpen && (
        <DialogOverlay onClick={() => setTagEditOpen(false)}>
          <DialogBox onClick={(e: React.MouseEvent) => e.stopPropagation()} style={{ maxWidth: 420, textAlign: 'left' }}>
            <DialogTitle style={{ marginBottom: 16 }}>Editar tags</DialogTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted, #888)', marginBottom: 8 }}>ESTAÇÃO</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {SEASONS.map(s => {
                    const active = pendingTags.includes(s.tag)
                    const c = getTagColor(s.tag)
                    return (
                      <button
                        key={s.tag}
                        onClick={() => toggleTag(s.tag)}
                        style={{
                          padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                          background: active ? c.bg : 'transparent',
                          color: active ? c.text : 'var(--text-muted, #888)',
                          border: `1px solid ${active ? c.border : 'var(--border, #333)'}`,
                          transition: 'all 0.15s',
                        }}
                      >
                        {s.emoji} {s.label}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted, #888)', marginBottom: 8 }}>OCASIÃO</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {OCCASIONS.map(o => {
                    const active = pendingTags.includes(o.tag)
                    const c = getTagColor(o.tag)
                    return (
                      <button
                        key={o.tag}
                        onClick={() => toggleTag(o.tag)}
                        style={{
                          padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                          background: active ? c.bg : 'transparent',
                          color: active ? c.text : 'var(--text-muted, #888)',
                          border: `1px solid ${active ? c.border : 'var(--border, #333)'}`,
                          transition: 'all 0.15s',
                        }}
                      >
                        {o.label}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted, #888)', marginBottom: 8 }}>FORMALIDADE</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { value: 1, label: '● Casual' },
                    { value: 2, label: '●● Smart-casual' },
                    { value: 3, label: '●●● Smart' },
                    { value: 4, label: '●●●● Semi-formal' },
                    { value: 5, label: '●●●●● Formal' },
                  ].map(f => (
                    <button
                      key={f.value}
                      onClick={() => setPendingFormality(f.value)}
                      style={{
                        padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        background: pendingFormality === f.value ? 'var(--accent, #c8a96e)22' : 'transparent',
                        color: pendingFormality === f.value ? 'var(--accent, #c8a96e)' : 'var(--text-muted, #888)',
                        border: `1px solid ${pendingFormality === f.value ? 'var(--accent, #c8a96e)88' : 'var(--border, #333)'}`,
                        transition: 'all 0.15s',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {f.value}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: 6, fontSize: 11, color: 'var(--text-muted, #888)' }}>
                  {[
                    '', 'Casual', 'Smart-casual', 'Smart', 'Semi-formal', 'Formal'
                  ][pendingFormality]}
                </div>
              </div>
            </div>
            <DialogActions style={{ marginTop: 20 }}>
              <CancelBtn onClick={() => setTagEditOpen(false)}>Cancelar</CancelBtn>
              <SaveBtn onClick={saveTagEdit} disabled={tagSaving}>
                {tagSaving ? 'Salvando…' : 'Salvar'}
              </SaveBtn>
            </DialogActions>
          </DialogBox>
        </DialogOverlay>
      )}

      {/* Dialog de confirmação */}
      {confirmOpen && (
        <DialogOverlay onClick={() => setConfirmOpen(false)}>
          <DialogBox onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <DialogTitle>Salvar alterações?</DialogTitle>
            <DialogText>
              As peças do look <strong>{look.title}</strong> serão atualizadas.
              Título, tags e demais dados não serão alterados.
            </DialogText>
            <DialogActions>
              <CancelBtn onClick={() => setConfirmOpen(false)}>Cancelar</CancelBtn>
              <SaveBtn onClick={confirmSave} disabled={saving}>
                {saving ? 'Salvando…' : 'OK, salvar'}
              </SaveBtn>
            </DialogActions>
          </DialogBox>
        </DialogOverlay>
      )}
    </>
  )
}
