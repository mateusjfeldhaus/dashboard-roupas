import { useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useLooks } from '../hooks/useLooks'
import { usePieces } from '../hooks/usePieces'
import { imgUrl } from '../utils/imgUrl'
import { exportLookAsImage } from '../utils/exportLook'
import { useUsage, formatDate } from '../hooks/useUsage'
import { useRating } from '../hooks/useRating'
import { useNotes } from '../hooks/useNotes'
import { useLookPhoto } from '../hooks/useLookPhoto'
import {
  Header, Title, TagRow, Tag,
  Body, FlatLayTitle, FlatLay, PieceSlot, PieceImg, Img,
  PieceCat, PieceName, Tip, Formalidade, Dot,
  UsageRow, UsageStat, UsageBadge, MarkBtn, UndoBtn,
  RatingRow, RatingLabel, StarRow, Star, ExportBtn,
  NotesSection, NotesLabel, NotesTitle, NotesStatus, NotesTextarea,
  PhotoInlineBtn, PhotoViewBtn, PhotoUploadInput,
  LightboxOverlay, LightboxImg, LightboxClose, LightboxActions, LightboxBtn, LightboxDelBtn,
} from '../components/Looks/LookModal.styles'

// ── Page layout ───────────────────────────────────────────────────────────────

const PageWrap = styled.div`
  max-width: 700px;
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

// ── catOrder (mesma lógica do LookModal) ─────────────────────────────────────

const catOrder: Record<string, number> = {
  'Terno': 0, 'Costume': 0, 'Blazer': 1, 'Sueter': 2,
  'Camisa': 3, 'Polo': 3, 'Camiseta': 3,
  'Calca': 4, 'Cinto': 5, 'Sapato': 6,
  'Gravata': 7, 'Relogio': 8, 'Jaqueta': 9, 'Acessorio': 10,
}

function catKey(cat: string) {
  return cat.normalize('NFD').replace(/[̀-ͯ]/g, '')
}

function photoUrl(lookId: string) {
  const base = import.meta.env.VITE_API_URL ?? ''
  return `${base}/api/photos/${encodeURIComponent(lookId)}`
}

// ─────────────────────────────────────────────────────────────────────────────

export function LookPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { looks } = useLooks()
  const { pieces } = usePieces()

  const look = looks.find(l => l.id === id)

  const { count, lastDate, loading, markUsed, undoLast } = useUsage(look?.id ?? '')
  const { rating, loading: rLoading, setRating } = useRating(look?.id ?? '')
  const { notes, status: notesStatus, setNotes } = useNotes('look', look?.id ?? '', look?.notes)
  const { photoId, uploading: photoUploading, upload: uploadPhoto, remove: removePhoto } = useLookPhoto(look?.id ?? '', look?.photoId)

  const [hovered,      setHovered]      = useState(0)
  const [exporting,    setExporting]    = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const uploadRef  = useRef<HTMLInputElement>(null)
  const replaceRef = useRef<HTMLInputElement>(null)

  if (!look) {
    return (
      <PageWrap>
        <BackBtn onClick={() => navigate('/looks')}>← Looks</BackBtn>
        <NotFound>Look não encontrado.</NotFound>
      </PageWrap>
    )
  }

  const piecesInLook = look.pieces
    .map(lp => {
      const piece = pieces.find(p => p.id === lp.pieceId)
      return piece ? { cat: lp.cat, piece } : null
    })
    .filter(Boolean)
    .sort((a, b) => (catOrder[catKey(a!.cat)] ?? 99) - (catOrder[catKey(b!.cat)] ?? 99)) as { cat: string; piece: import('@data/types').Piece }[]

  const displayRating = hovered > 0 ? hovered : rating

  async function handleExport() {
    if (exporting) return
    setExporting(true)
    try { await exportLookAsImage(look!, piecesInLook) }
    finally { setExporting(false) }
  }

  async function handleStarClick(n: number) {
    if (rLoading) return
    await setRating(rating === n ? 0 : n)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) uploadPhoto(file)
    e.target.value = ''
  }

  async function handleRemove() {
    await removePhoto()
    setLightboxOpen(false)
  }

  return (
    <>
      <PageWrap>
        <BackBtn onClick={() => navigate(-1)}>← Voltar</BackBtn>

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
                {!rLoading && rating > 0  && <RatingLabel style={{ fontWeight: 700, fontSize: 13 }}>{rating}/10</RatingLabel>}
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
        </Card>
      </PageWrap>

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
