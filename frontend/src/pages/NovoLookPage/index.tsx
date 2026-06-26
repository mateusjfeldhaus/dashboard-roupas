import { useNovoLookPage, ALL_TAGS, TAG_LABEL, FORMALITY_LABELS } from './useNovoLookPage'
import { imgUrl } from '../../utils/imgUrl'
import {
  PageWrap, BackBtn, PageTitle, Section, SectionLabel,
  FlatLayRow, FlatLayThumb, FlatLayImg, FlatLayRemove, FlatLayCat, EmptyFlatLay,
  CatRow, CatChip,
  PieceGrid, PieceCard, PieceThumbWrap, PieceThumbImg, PieceName, SelectedBadge,
  Field, Label, Input, Textarea, TagGrid, TagChip,
  FormalityRow, FormalDot, FormalLabel,
  ActionRow, SaveBtn, ErrorMsg,
} from './NovoLookPage.styles'

export function NovoLookPage() {
  const {
    navigate,
    availableCats, piecesInCat,
    activeCat, setActiveCat,
    selected, togglePiece,
    title, setTitle,
    tags, toggleTag,
    formality, setFormality,
    tip, setTip,
    notes, setNotes,
    saving, error, handleSave,
  } = useNovoLookPage()

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
          ) : selected.map(({ piece, cat }) => (
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
          ))}
        </FlatLayRow>
      </Section>

      {/* ── Seletor por categoria ───────────────────────────────────────────── */}
      <Section>
        <SectionLabel>Adicionar peças</SectionLabel>
        <CatRow>
          {availableCats.map(cat => (
            <CatChip key={cat} $active={activeCat === cat} onClick={() => setActiveCat(cat)}>
              {cat}
            </CatChip>
          ))}
        </CatRow>
        <PieceGrid>
          {piecesInCat.map(piece => {
            const isSelected = selected.some(s => s.piece.id === piece.id)
            return (
              <PieceCard key={piece.id} $selected={isSelected} onClick={() => togglePiece(piece)} title={piece.name}>
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
              <TagChip key={tag} $active={tags.includes(tag)} $tag={tag} onClick={() => toggleTag(tag)}>
                {TAG_LABEL[tag]}
              </TagChip>
            ))}
          </TagGrid>
        </Field>

        <Field>
          <Label>Formalidade</Label>
          <FormalityRow>
            {([1,2,3,4,5] as const).map(n => (
              <FormalDot key={n} $filled={n <= formality} onClick={() => setFormality(n)} title={FORMALITY_LABELS[n]} />
            ))}
            <FormalLabel>{FORMALITY_LABELS[formality]}</FormalLabel>
          </FormalityRow>
        </Field>

        <Field>
          <Label>Dica do Stylist</Label>
          <Textarea value={tip} onChange={e => setTip(e.target.value)} placeholder="Quando usar, com quê combinar, cuidados…" />
        </Field>

        <Field style={{ marginBottom: 0 }}>
          <Label>Observações pessoais</Label>
          <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notas privadas sobre este look…" />
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
