import { useRef, useState, useEffect } from 'react'
import type { Look, Piece } from '@data/types'
import { exportLookAsImage } from '../../utils/exportLook'
import { usePieces } from '../../hooks/usePieces'
import { imgUrl } from '../../utils/imgUrl'
import { useUsage, formatDate } from '../../hooks/useUsage'
import { useRating } from '../../hooks/useRating'
import { useNotes } from '../../hooks/useNotes'
import { useLookPhoto } from '../../hooks/useLookPhoto'
import { PecaModal } from '../Pecas/PecaModal'
import {
  Overlay, Dialog, Header, Title, TagRow, Tag, CloseBtn,
  Body, FlatLayTitle, FlatLay, PieceSlot, PieceImg, Img,
  PieceCat, PieceName, Tip, Formalidade, Dot,
  UsageRow, UsageStat, UsageBadge, MarkBtn, UndoBtn,
  RatingRow, RatingLabel, StarRow, Star, ExportBtn,
  NotesSection, NotesLabel, NotesTitle, NotesStatus, NotesTextarea,
  PhotoSection, PhotoImg, PhotoEmpty, PhotoIcon,
  PhotoActions, PhotoBtn, PhotoDelBtn, PhotoUploadInput, PhotoUploading,
} from './LookModal.styles'

const catOrder: Record<string, number> = {
  'Terno': 0, 'Costume': 0, 'Blazer': 1, 'Sueter': 2,
  'Camisa': 3, 'Polo': 3, 'Camiseta': 3,
  'Calca': 4, 'Cinto': 5, 'Sapato': 6,
  'Gravata': 7, 'Relogio': 8, 'Jaqueta': 9, 'Acessorio': 10,
}

function catKey(cat: string) {
  return cat.normalize('NFD').replace(/[̀-ͯ]/g, '')
}

// Deriva a URL da foto do look a partir do VITE_API_URL
function photoUrl(lookId: string) {
  const base = import.meta.env.VITE_API_URL ?? ''
  return `${base}/api/photos/${encodeURIComponent(lookId)}`
}

interface Props { look: Look; onClose: () => void }

export function LookModal({ look, onClose }: Props) {
  const { pieces } = usePieces()
  const { count, lastDate, loading, markUsed, undoLast } = useUsage(look.id)
  const { rating, loading: rLoading, setRating } = useRating(look.id)
  const { notes, status: notesStatus, setNotes } = useNotes('look', look.id, look.notes)
  const { photoId, uploading: photoUploading, upload: uploadPhoto, remove: removePhoto } = useLookPhoto(look.id, look.photoId)
  const [hovered, setHovered] = useState<number>(0)
  const [exporting, setExporting] = useState(false)
  const [pieceModal, setPieceModal] = useState<Piece | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const replaceInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (pieceModal) setPieceModal(null)
      else onClose()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose, pieceModal])

  const piecesInLook = look.pieces
    .map(lp => {
      const piece = pieces.find(p => p.id === lp.pieceId)
      return piece ? { cat: lp.cat, piece } : null
    })
    .filter(Boolean)
    .sort((a, b) => (catOrder[catKey(a!.cat)] ?? 99) - (catOrder[catKey(b!.cat)] ?? 99)) as { cat: string; piece: Piece }[]

  const displayRating = hovered > 0 ? hovered : rating

  async function handleExport() {
    if (exporting) return
    setExporting(true)
    try { await exportLookAsImage(look, piecesInLook) }
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

  return (
  <>
    <Overlay onClick={onClose}>
      <Dialog onClick={e => e.stopPropagation()}>

        {/* ── Foto do Look ── */}
        <PhotoSection>
          {photoId ? (
            <>
              <PhotoImg
                src={photoUrl(look.id)}
                alt={`Foto do look ${look.title}`}
                key={photoId}
              />
              <PhotoActions>
                {/* Trocar foto */}
                <PhotoBtn as="label" htmlFor={`replace-${look.id}`}>
                  🔄 Trocar
                  <PhotoUploadInput
                    id={`replace-${look.id}`}
                    ref={replaceInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </PhotoBtn>
                {/* Remover foto */}
                <PhotoDelBtn $danger onClick={removePhoto} disabled={photoUploading}>
                  🗑 Remover
                </PhotoDelBtn>
              </PhotoActions>
              {photoUploading && <PhotoUploading>Enviando…</PhotoUploading>}
            </>
          ) : (
            <PhotoEmpty htmlFor={`upload-${look.id}`}>
              <PhotoIcon>📸</PhotoIcon>
              {photoUploading ? 'Enviando…' : 'Adicionar foto do look'}
              <PhotoUploadInput
                id={`upload-${look.id}`}
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </PhotoEmpty>
          )}
        </PhotoSection>

        <Header>
          <div>
            <Title>{look.title}</Title>
            <TagRow>
              {look.tags.map(t => <Tag key={t} $tag={t}>{t}</Tag>)}
            </TagRow>
            <Formalidade>
              {[1,2,3,4,5].map(i => <Dot key={i} $filled={i <= look.formality} />)}
            </Formalidade>

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
              <MarkBtn
                $loading={loading}
                disabled={loading}
                onClick={markUsed}
                title="Marcar como usado hoje"
              >
                +
              </MarkBtn>
              {!loading && count === 0 && (
                <UsageStat>Nunca usado</UsageStat>
              )}
              {!loading && count > 0 && (
                <>
                  <UsageStat>
                    <UsageBadge>{count}×</UsageBadge>
                    usado{count !== 1 ? 's' : ''}
                  </UsageStat>
                  <UsageStat>
                    · último: <strong>{formatDate(lastDate!)}</strong>
                  </UsageStat>
                  <UndoBtn onClick={undoLast} title="Desfazer último registro">
                    desfazer
                  </UndoBtn>
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
              <PieceSlot key={piece.id} onClick={() => setPieceModal(piece)} title={`Ver ${piece.name}`}>
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

    {pieceModal && (
      <PecaModal piece={pieceModal} onClose={() => setPieceModal(null)} />
    )}
  </>
  )
}
