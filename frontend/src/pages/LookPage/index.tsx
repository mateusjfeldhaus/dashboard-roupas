import { useLookPage } from './useLookPage'
import { photoUrl } from '../../utils/lookHelpers'
import { imgUrl } from '../../utils/imgUrl'
import { formatDate } from '../../hooks/useUsage'
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
import { PageWrap, BackBtn, HideBtn, Card, NotFound } from './LookPage.styles'

export function LookPage() {
  const {
    navigate, look, piecesInLook, looksLoading,
    usage, rating, notes, photo,
    hovered, setHovered,
    exporting, lightboxOpen, setLightboxOpen,
    uploadRef, replaceRef,
    handleExport, handleStarClick, handleFileChange, handleRemove,
    toggleHidden,
  } = useLookPage()

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

  return (
    <>
      <PageWrap>
        <BackBtn onClick={() => navigate(-1)}>← Voltar</BackBtn>
        <HideBtn
          onClick={() => toggleHidden(look.id, !look.hidden)}
          title={look.hidden ? 'Tornar visível' : 'Ocultar look'}
        >
          {look.hidden ? '👁 Tornar visível' : '🙈 Ocultar look'}
        </HideBtn>

        <Card>
          <Header>
            <div>
              <Title>{look.title}</Title>
              <TagRow>
                {look.tags.map(t => <Tag key={t} $tag={t}>{t}</Tag>)}
              </TagRow>
              <Formalidade>
                {[1,2,3,4,5].map(i => <Dot key={i} $filled={i <= look.formality} />)}
              </Formalidade>

              {photo.photoId ? (
                <PhotoViewBtn onClick={() => setLightboxOpen(true)}>
                  📸 Ver look completo
                </PhotoViewBtn>
              ) : (
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
              )}

              <RatingRow>
                <RatingLabel>Avaliação:</RatingLabel>
                <StarRow onMouseLeave={() => setHovered(0)}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <Star
                      key={n}
                      $filled={n <= rating.displayRating}
                      $loading={rating.loading}
                      onMouseEnter={() => setHovered(n)}
                      onClick={() => handleStarClick(n)}
                      title={`${n}/10`}
                    >
                      {n <= rating.displayRating ? '★' : '☆'}
                    </Star>
                  ))}
                </StarRow>
                {!rating.loading && rating.rating > 0  && <RatingLabel style={{ fontWeight: 700, fontSize: 13 }}>{rating.rating}/10</RatingLabel>}
                {!rating.loading && rating.rating === 0 && <RatingLabel>sem avaliação</RatingLabel>}
              </RatingRow>

              <UsageRow>
                <MarkBtn $loading={usage.loading} disabled={usage.loading} onClick={usage.markUsed} title="Marcar como usado hoje">
                  +
                </MarkBtn>
                {!usage.loading && usage.count === 0 && <UsageStat>Nunca usado</UsageStat>}
                {!usage.loading && usage.count > 0 && (
                  <>
                    <UsageStat><UsageBadge>{usage.count}×</UsageBadge>usado{usage.count !== 1 ? 's' : ''}</UsageStat>
                    <UsageStat>· último: <strong>{formatDate(usage.lastDate!)}</strong></UsageStat>
                    <UndoBtn onClick={usage.undoLast}>desfazer</UndoBtn>
                  </>
                )}
              </UsageRow>
            </div>
          </Header>

          <Body>
            <FlatLayTitle>Flat-Lay do Look</FlatLayTitle>
            <FlatLay>
              {piecesInLook.map(({ cat, piece }) => (
                <PieceSlot key={piece.id} onClick={() => navigate(`/pecas/${piece.id}`)} title={`Ver ${piece.name}`}>
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
                <NotesStatus $status={notes.status}>
                  {notes.status === 'saving' ? 'salvando…' :
                   notes.status === 'saved'  ? '✓ salvo'   :
                   notes.status === 'error'  ? 'erro ao salvar' : ''}
                </NotesStatus>
              </NotesLabel>
              <NotesTextarea
                value={notes.notes}
                onChange={e => notes.setNotes(e.target.value)}
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
        </Card>
      </PageWrap>

      {lightboxOpen && photo.photoId && (
        <LightboxOverlay onClick={() => setLightboxOpen(false)}>
          <LightboxClose onClick={() => setLightboxOpen(false)}>✕</LightboxClose>
          <LightboxImg
            src={photoUrl(look.id)}
            alt={look.title}
            key={photo.photoId}
            onClick={e => e.stopPropagation()}
          />
          <LightboxActions onClick={e => e.stopPropagation()}>
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
          </LightboxActions>
        </LightboxOverlay>
      )}
    </>
  )
}
