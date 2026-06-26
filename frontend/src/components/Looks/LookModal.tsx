import type { Look } from '@data/types'
import { imgUrl } from '../../utils/imgUrl'
import { photoUrl } from '../../utils/lookHelpers'
import { useLookModal } from './useLookModal'
import {
  Overlay, Dialog, Header, Title, TagRow, Tag, CloseBtn,
  Body, FlatLayTitle, FlatLay, PieceSlot, PieceImg, Img,
  PieceCat, PieceName, Tip, Formalidade, Dot,
  UsageRow, UsageStat, UsageBadge, MarkBtn, UndoBtn,
  RatingRow, RatingLabel, StarRow, Star, ExportBtn,
  NotesSection, NotesLabel, NotesTitle, NotesStatus, NotesTextarea,
  PhotoInlineBtn, PhotoViewBtn, PhotoUploadInput,
  LightboxOverlay, LightboxImg, LightboxClose, LightboxActions, LightboxBtn, LightboxDelBtn,
} from './LookModal.styles'

interface Props { look: Look; onClose: () => void }

export function LookModal({ look, onClose }: Props) {
  const {
    count, lastDate, loading,
    rating, rLoading, displayRating,
    notes, notesStatus,
    photoId, photoUploading,
    piecesInLook,
    hovered, setHovered,
    exporting,
    lightboxOpen, setLightboxOpen,
    uploadRef, replaceRef,
    markUsed, undoLast,
    setNotes,
    handleExport,
    handleStarClick,
    handleFileChange,
    handleRemove,
    navigateToPiece,
    formatDate,
  } = useLookModal(look, onClose)

  return (
  <>
    <Overlay onClick={onClose}>
      <Dialog onClick={e => e.stopPropagation()}>
        <Header>
          <div>
            <Title>{look.title}</Title>
            <TagRow>
              {look.tags.map(t => <Tag key={t} $tag={t}>{t}</Tag>)}
            </TagRow>
            <Formalidade>
              {[1,2,3,4,5].map(i => <Dot key={i} $filled={i <= look.formality} />)}
            </Formalidade>

            {/* ── Botão de foto ── */}
            {photoId ? (
              <PhotoViewBtn onClick={() => setLightboxOpen(true)}>
                📸 Ver look completo
              </PhotoViewBtn>
            ) : (
              <PhotoInlineBtn htmlFor={`upload-photo-${look.id}`}>
                {photoUploading ? '⏳ Enviando…' : '📸 Adicionar foto'}
                <PhotoUploadInput
                  id={`upload-photo-${look.id}`}
                  ref={uploadRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </PhotoInlineBtn>
            )}

            {/* ── Star Rating ── */}
            <RatingRow>
              <RatingLabel>Avaliação:</RatingLabel>
              <StarRow onMouseLeave={() => setHovered(0)}>
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <Star
                    key={n}
                    $filled={n <= displayRating}
                    $loading={rLoading}
                    onMouseEnter={() => setHovered(n)}
                    onClick={() => handleStarClick(n)}
                    title={`${n}/10`}
                  >
                    {n <= displayRating ? '★' : '☆'}
                  </Star>
                ))}
              </StarRow>
              {!rLoading && rating > 0 && <RatingLabel style={{ fontWeight: 700, fontSize: 13 }}>{rating}/10</RatingLabel>}
              {!rLoading && rating === 0 && <RatingLabel>sem avaliação</RatingLabel>}
            </RatingRow>

            {/* ── Usage ── */}
            <UsageRow>
              <MarkBtn $loading={loading} disabled={loading} onClick={markUsed} title="Marcar como usado hoje">
                +
              </MarkBtn>
              {!loading && count === 0 && <UsageStat>Nunca usado</UsageStat>}
              {!loading && count > 0 && (
                <>
                  <UsageStat><UsageBadge>{count}×</UsageBadge>usado{count !== 1 ? 's' : ''}</UsageStat>
                  <UsageStat>· último: <strong>{formatDate(lastDate!)}</strong></UsageStat>
                  <UndoBtn onClick={undoLast}>desfazer</UndoBtn>
                </>
              )}
            </UsageRow>
          </div>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </Header>

        <Body>
          <FlatLayTitle>Flat-Lay do Look</FlatLayTitle>
          <FlatLay>
            {piecesInLook.map(({ cat, piece }) => (
              <PieceSlot key={piece.id} onClick={() => navigateToPiece(piece.id)} title={`Ver ${piece.name}`}>
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
            ))}
          </FlatLay>
          <FlatLayTitle>Dica do Stylist</FlatLayTitle>
          <Tip>{look.tip}</Tip>

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
              placeholder="Adicione observações sobre este look…"
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
        </Body>
      </Dialog>
    </Overlay>

    {/* ── Lightbox full-screen ── */}
    {lightboxOpen && photoId && (
      <LightboxOverlay onClick={() => setLightboxOpen(false)}>
        <LightboxClose onClick={() => setLightboxOpen(false)}>✕</LightboxClose>
        <LightboxImg
          src={photoUrl(look.id)}
          alt={look.title}
          key={photoId}
          onClick={e => e.stopPropagation()}
        />
        <LightboxActions onClick={e => e.stopPropagation()}>
          <LightboxBtn htmlFor={`replace-photo-${look.id}`}>
            🔄 Trocar foto
            <PhotoUploadInput
              id={`replace-photo-${look.id}`}
              ref={replaceRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </LightboxBtn>
          <LightboxDelBtn onClick={handleRemove} disabled={photoUploading}>
            🗑 Remover
          </LightboxDelBtn>
        </LightboxActions>
      </LightboxOverlay>
    )}
  </>
  )
}
