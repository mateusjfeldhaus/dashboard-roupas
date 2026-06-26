import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { usePieces } from '../hooks/usePieces'
import { useLooks } from '../hooks/useLooks'
import type { Piece, LookTag, PieceCategory } from '@data/types'
import { imgUrl } from '../utils/imgUrl'
import { SEASONS, OCCASIONS } from '../styles/tags'
import { getTagColor } from '../styles/tagColors'
import api from '../api/client'

// ── Types ─────────────────────────────────────────────────────────────────────

interface SelectedPiece { piece: Piece; cat: string }

// ── Styled components ─────────────────────────────────────────────────────────

const PageWrap = styled.div`
  max-width: 800px;
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

const PageTitle = styled.h1`
  font-size: 22px; font-weight: 800;
  color: ${p => p.theme.colors.text};
  margin-bottom: 24px;
`

const Section = styled.section`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 16px;
`

const SectionLabel = styled.h2`
  font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  color: ${p => p.theme.colors.accent};
  margin-bottom: 14px;
`

// ── Selected pieces preview ───────────────────────────────────────────────────

const FlatLayRow = styled.div`
  display: flex; gap: 10px; flex-wrap: wrap;
  min-height: 56px;
  align-items: center;
`

const FlatLayThumb = styled.div<{ $color: string }>`
  position: relative;
  width: 52px; height: 68px;
  background: #111;
  border-radius: 8px;
  border: 2px solid ${p => p.$color}55;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.15s, border-color 0.15s;
  &:hover { transform: translateY(-2px); border-color: #ef444488; }
`

const FlatLayImg = styled.img`
  width: 100%; height: 100%; object-fit: contain;
`

const FlatLayRemove = styled.div`
  position: absolute; top: 2px; right: 2px;
  width: 16px; height: 16px;
  border-radius: 50%;
  background: rgba(239,68,68,0.85);
  color: #fff;
  font-size: 10px; font-weight: 800; line-height: 16px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.15s;
  ${FlatLayThumb}:hover & { opacity: 1; }
`

const FlatLayCat = styled.div`
  font-size: 9px; color: ${p => p.theme.colors.textMuted};
  text-align: center; margin-top: 4px;
  text-transform: uppercase; letter-spacing: 0.3px;
  width: 52px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
`

const EmptyFlatLay = styled.p`
  font-size: 13px; color: ${p => p.theme.colors.textMuted};
  font-style: italic;
`

// ── Category tabs ─────────────────────────────────────────────────────────────

const CatRow = styled.div`
  display: flex; gap: 6px; flex-wrap: wrap;
  margin-bottom: 14px;
`

const CatChip = styled.button<{ $active: boolean }>`
  padding: 5px 12px; border-radius: 20px;
  font-size: 12px; font-weight: 600;
  border: 1px solid ${p => p.$active ? p.theme.colors.accent : p.theme.colors.border};
  background: ${p => p.$active ? p.theme.colors.accent + '20' : 'transparent'};
  color: ${p => p.$active ? p.theme.colors.accent : p.theme.colors.textMuted};
  cursor: pointer; transition: all 0.15s;
  &:hover { border-color: ${p => p.theme.colors.accent}88; color: ${p => p.theme.colors.accent}; }
`

// ── Piece grid ────────────────────────────────────────────────────────────────

const PieceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 8px;
  max-height: 340px;
  overflow-y: auto;
  padding-right: 4px;
`

const PieceCard = styled.button<{ $selected: boolean }>`
  display: flex; flex-direction: column; align-items: center;
  padding: 8px 6px;
  border-radius: 10px;
  border: 2px solid ${p => p.$selected ? p.theme.colors.accent : p.theme.colors.border};
  background: ${p => p.$selected ? p.theme.colors.accent + '10' : p.theme.colors.bg};
  cursor: pointer; text-align: center;
  transition: all 0.15s;
  position: relative;
  &:hover { border-color: ${p => p.theme.colors.accent}88; }
`

const PieceThumbWrap = styled.div<{ $color: string }>`
  width: 60px; height: 72px;
  background: #111;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${p => p.$color}44;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 6px;
`

const PieceThumbImg = styled.img`
  width: 100%; height: 100%; object-fit: contain;
`

const PieceName = styled.span`
  font-size: 10px; font-weight: 600;
  color: ${p => p.theme.colors.text};
  line-height: 1.3;
  overflow: hidden; text-overflow: ellipsis;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
`

const SelectedBadge = styled.div`
  position: absolute; top: 4px; right: 4px;
  width: 18px; height: 18px; border-radius: 50%;
  background: ${p => p.theme.colors.accent};
  color: #000; font-size: 11px; font-weight: 800; line-height: 18px;
  text-align: center;
`

// ── Form fields ───────────────────────────────────────────────────────────────

const Field = styled.div`
  margin-bottom: 16px;
`

const Label = styled.label`
  display: block;
  font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  color: ${p => p.theme.colors.accent};
  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%; padding: 10px 14px;
  background: ${p => p.theme.colors.bg};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 8px;
  color: ${p => p.theme.colors.text};
  font-size: 14px; font-family: inherit;
  outline: none; box-sizing: border-box;
  transition: border-color 0.15s;
  &:focus { border-color: ${p => p.theme.colors.accent}88; }
  &::placeholder { color: ${p => p.theme.colors.textMuted}; }
`

const Textarea = styled.textarea`
  width: 100%; padding: 10px 14px;
  min-height: 80px;
  background: ${p => p.theme.colors.bg};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 8px;
  color: ${p => p.theme.colors.text};
  font-size: 13px; line-height: 1.6; font-family: inherit;
  resize: vertical; outline: none; box-sizing: border-box;
  transition: border-color 0.15s;
  &:focus { border-color: ${p => p.theme.colors.accent}88; }
  &::placeholder { color: ${p => p.theme.colors.textMuted}; }
`

const TagGrid = styled.div`
  display: flex; gap: 6px; flex-wrap: wrap;
`

const TagChip = styled.button<{ $active: boolean; $tag: string }>`
  padding: 5px 12px; border-radius: 20px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.3px;
  cursor: pointer; transition: all 0.15s;
  border: 1px solid ${p => p.$active
    ? getTagColor(p.$tag).border
    : p.theme.colors.border};
  background: ${p => p.$active ? getTagColor(p.$tag).bg : 'transparent'};
  color: ${p => p.$active ? getTagColor(p.$tag).text : p.theme.colors.textMuted};
  &:hover { border-color: ${p => getTagColor(p.$tag).border}; color: ${p => getTagColor(p.$tag).text}; }
`

const FormalityRow = styled.div`
  display: flex; gap: 8px; align-items: center;
`

const FormalDot = styled.button<{ $filled: boolean }>`
  width: 28px; height: 28px; border-radius: 50%;
  border: 2px solid ${p => p.$filled ? p.theme.colors.accent : p.theme.colors.border};
  background: ${p => p.$filled ? p.theme.colors.accent : 'transparent'};
  cursor: pointer; transition: all 0.15s;
  &:hover { border-color: ${p => p.theme.colors.accent}; }
`

const FormalLabel = styled.span`
  font-size: 11px; color: ${p => p.theme.colors.textMuted};
  margin-left: 8px;
`

// ── Actions ───────────────────────────────────────────────────────────────────

const ActionRow = styled.div`
  display: flex; gap: 10px; align-items: center;
  margin-top: 8px;
`

const SaveBtn = styled.button<{ $loading?: boolean }>`
  flex: 1; padding: 14px;
  background: ${p => p.theme.colors.accent};
  color: #000; font-weight: 800; font-size: 15px;
  border-radius: 10px; cursor: ${p => p.$loading ? 'wait' : 'pointer'};
  opacity: ${p => p.$loading ? 0.7 : 1};
  transition: opacity 0.15s, transform 0.1s;
  &:hover:not(:disabled) { transform: translateY(-1px); }
`

const ErrorMsg = styled.p`
  font-size: 13px; color: #ef4444;
  margin-top: 8px;
`

const FORMALITY_LABELS = ['', 'Casual', 'Smart Casual', 'Business Casual', 'Formal', 'Black Tie']

const ALL_TAGS: LookTag[] = [
  'formal', 'casual', 'esportes',
  'diurno', 'noturno',
  'verao', 'outono', 'inverno', 'primavera',
]

const TAG_LABEL: Record<string, string> = {
  formal: 'Formal', casual: 'Casual', esportes: 'Esportes',
  diurno: 'Diurno', noturno: 'Noturno',
  verao: 'Verão', outono: 'Outono', inverno: 'Inverno', primavera: 'Primavera',
}

const CATEGORIES: PieceCategory[] = [
  'Camisa', 'Calça', 'Blazer', 'Costume', 'Terno',
  'Sapato', 'Gravata', 'Cinto', 'Relógio', 'Suéter',
  'Polo', 'Camiseta', 'Jaqueta', 'Acessório',
]

// ─────────────────────────────────────────────────────────────────────────────

export function NovoLookPage() {
  const navigate = useNavigate()
  const { pieces } = usePieces()
  const { invalidate } = useLooks()

  const [selected,  setSelected]  = useState<SelectedPiece[]>([])
  const [activeCat, setActiveCat] = useState<PieceCategory>('Camisa')
  const [title,     setTitle]     = useState('')
  const [tags,      setTags]      = useState<LookTag[]>([])
  const [formality, setFormality] = useState<1|2|3|4|5>(2)
  const [tip,       setTip]       = useState('')
  const [notes,     setNotes]     = useState('')
  const [saving,    setSaving]    = useState(false)
  const [error,     setError]     = useState<string | null>(null)

  // Available categories (only those with pieces)
  const availableCats = CATEGORIES.filter(c => pieces.some(p => p.category === c))
  const piecesInCat = pieces.filter(p => p.category === activeCat)

  function togglePiece(piece: Piece) {
    setSelected(prev => {
      const exists = prev.find(s => s.piece.id === piece.id)
      if (exists) return prev.filter(s => s.piece.id !== piece.id)
      return [...prev, { piece, cat: piece.category }]
    })
  }

  function toggleTag(tag: LookTag) {
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  async function handleSave() {
    if (!title.trim()) { setError('Dê um nome ao look.'); return }
    setSaving(true)
    setError(null)

    const id = crypto.randomUUID()
    const body = {
      id,
      title: title.trim(),
      tags,
      formality,
      tip: tip.trim(),
      notes: notes.trim(),
      pieces: selected.map(s => ({ cat: s.cat, pieceId: s.piece.id })),
    }

    try {
      await api.post('/api/looks', body)
      invalidate()
      navigate(`/looks/${id}`)
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { error?: string } } })
        ?.response?.data?.error ?? String(e)
      setError(`Erro ao salvar: ${msg}`)
      setSaving(false)
    }
  }

  return (
    <PageWrap>
      <BackBtn onClick={() => navigate(-1)}>← Voltar</BackBtn>
      <PageTitle>Novo Look</PageTitle>

      {/* ── Peças selecionadas ──────────────────────────────────────────────── */}
      <Section>
        <SectionLabel>
          Peças no look
          {selected.length > 0 && ` — ${selected.length} selecionada${selected.length > 1 ? 's' : ''}`}
        </SectionLabel>

        <FlatLayRow>
          {selected.length === 0 ? (
            <EmptyFlatLay>Selecione as peças abaixo para montar o look.</EmptyFlatLay>
          ) : (
            selected.map(({ piece, cat }) => (
              <div key={piece.id}>
                <FlatLayThumb $color={piece.color} onClick={() => togglePiece(piece)} title={`Remover ${piece.name}`}>
                  <FlatLayImg
                    src={imgUrl(piece.img)}
                    alt={piece.name}
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                  <FlatLayRemove>×</FlatLayRemove>
                </FlatLayThumb>
                <FlatLayCat>{cat}</FlatLayCat>
              </div>
            ))
          )}
        </FlatLayRow>
      </Section>

      {/* ── Seletor por categoria ───────────────────────────────────────────── */}
      <Section>
        <SectionLabel>Adicionar peças</SectionLabel>

        <CatRow>
          {availableCats.map(cat => (
            <CatChip
              key={cat}
              $active={activeCat === cat}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </CatChip>
          ))}
        </CatRow>

        <PieceGrid>
          {piecesInCat.map(piece => {
            const isSelected = selected.some(s => s.piece.id === piece.id)
            return (
              <PieceCard
                key={piece.id}
                $selected={isSelected}
                onClick={() => togglePiece(piece)}
                title={piece.name}
              >
                {isSelected && <SelectedBadge>✓</SelectedBadge>}
                <PieceThumbWrap $color={piece.color}>
                  <PieceThumbImg
                    src={imgUrl(piece.img)}
                    alt={piece.name}
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </PieceThumbWrap>
                <PieceName>{piece.name}</PieceName>
              </PieceCard>
            )
          })}
        </PieceGrid>
      </Section>

      {/* ── Formulário ─────────────────────────────────────────────────────── */}
      <Section>
        <SectionLabel>Detalhes do look</SectionLabel>

        <Field>
          <Label>Nome do look *</Label>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Ex: Reunião casual de segunda-feira"
            autoComplete="off"
          />
        </Field>

        <Field>
          <Label>Tags</Label>
          <TagGrid>
            {ALL_TAGS.map(tag => (
              <TagChip
                key={tag}
                $active={tags.includes(tag)}
                $tag={tag}
                onClick={() => toggleTag(tag)}
              >
                {TAG_LABEL[tag]}
              </TagChip>
            ))}
          </TagGrid>
        </Field>

        <Field>
          <Label>Formalidade</Label>
          <FormalityRow>
            {([1,2,3,4,5] as const).map(n => (
              <FormalDot
                key={n}
                $filled={n <= formality}
                onClick={() => setFormality(n)}
                title={FORMALITY_LABELS[n]}
              />
            ))}
            <FormalLabel>{FORMALITY_LABELS[formality]}</FormalLabel>
          </FormalityRow>
        </Field>

        <Field>
          <Label>Dica do Stylist</Label>
          <Textarea
            value={tip}
            onChange={e => setTip(e.target.value)}
            placeholder="Quando usar, com quê combinar, cuidados…"
          />
        </Field>

        <Field style={{ marginBottom: 0 }}>
          <Label>Observações pessoais</Label>
          <Textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Notas privadas sobre este look…"
          />
        </Field>
      </Section>

      <ActionRow>
        <SaveBtn onClick={handleSave} $loading={saving} disabled={saving}>
          {saving ? '⏳ Salvando…' : '✓ Criar look'}
        </SaveBtn>
      </ActionRow>

      {error && <ErrorMsg>{error}</ErrorMsg>}
    </PageWrap>
  )
}
