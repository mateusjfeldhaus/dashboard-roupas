import {
  Header, Title, CountBadge, AddBtn,
  StatsBar, StatCard, StatNum, StatLbl,
  FiltersRow, FilterChip, FilterDivider, ShowPurchasedBtn,
  ItemGrid, ItemCard, ItemTop, PriorityDot, ItemMeta, ItemName, ItemSub,
  ItemCatChip, ItemPrice, ItemNotes, ItemActions, ActionBtn,
  EmptyState, EmptyIcon,
  Overlay, Dialog, DialogTitle, FormGrid, FormField, FormLabel,
  FormInput, FormSelect, FormTextarea, PriorityRow, PriorityChip,
  DialogActions, CancelBtn, SaveBtn,
} from './Wishlist.styles'
import {
  useWishlist,
  CAT_LIST, PRIORITY_LABELS, PRIORITY_COLORS,
  fmtBRL, isUrl,
} from './useWishlist'
import { isGuest } from '../../api/client'

export function Wishlist() {
  const {
    items, visible,
    catFilter, setCatFilter,
    prioFilter, setPrioFilter,
    showPurchased, setShowPurchased,
    formOpen, editItem, form, setForm, saving,
    pending, purchased, totalEst, spentEst,
    presentCats,
    openAdd, openEdit, closeForm,
    handleSave, togglePurchased, handleDelete,
  } = useWishlist()

  return (
    <>
      <Header>
        <Title>Wishlist</Title>
        <CountBadge>{pending.length} item{pending.length !== 1 ? 's' : ''}</CountBadge>
        {!isGuest() && <AddBtn onClick={openAdd}>+ Adicionar</AddBtn>}
      </Header>

      {items.length > 0 && (
        <StatsBar>
          <StatCard>
            <StatNum>{pending.length}</StatNum>
            <StatLbl>Pendentes</StatLbl>
          </StatCard>
          <StatCard>
            <StatNum>{fmtBRL(totalEst)}</StatNum>
            <StatLbl>Investimento estimado</StatLbl>
          </StatCard>
          <StatCard>
            <StatNum>{purchased.length}</StatNum>
            <StatLbl>Comprados</StatLbl>
          </StatCard>
          {spentEst > 0 && (
            <StatCard>
              <StatNum>{fmtBRL(spentEst)}</StatNum>
              <StatLbl>Já investido</StatLbl>
            </StatCard>
          )}
        </StatsBar>
      )}

      {items.length > 0 && (
        <FiltersRow>
          <FilterChip $active={catFilter === null} onClick={() => setCatFilter(null)}>Todas</FilterChip>
          {presentCats.map(c => (
            <FilterChip key={c} $active={catFilter === c} onClick={() => setCatFilter(catFilter === c ? null : c)}>
              {c}
            </FilterChip>
          ))}
          <FilterDivider />
          {([1, 2, 3] as const).map(p => (
            <FilterChip
              key={p} $active={prioFilter === p} $color={PRIORITY_COLORS[p]}
              onClick={() => setPrioFilter(prioFilter === p ? null : p)}
            >
              {PRIORITY_LABELS[p]}
            </FilterChip>
          ))}
          <FilterDivider />
          <ShowPurchasedBtn $active={showPurchased} onClick={() => setShowPurchased(v => !v)}>
            {showPurchased ? '✓ Comprados visíveis' : 'Mostrar comprados'}
          </ShowPurchasedBtn>
        </FiltersRow>
      )}

      {visible.length === 0 ? (
        <EmptyState>
          <EmptyIcon>{items.length === 0 ? '🛍️' : '🔍'}</EmptyIcon>
          {items.length === 0
            ? <>Sua wishlist está vazia.<br />Clique em <strong>+ Adicionar</strong> para começar.</>
            : 'Nenhum item com esses filtros.'}
        </EmptyState>
      ) : (
        <ItemGrid>
          {visible.map(item => (
            <ItemCard key={item.id} $purchased={item.purchased}>
              <ItemTop>
                <PriorityDot $priority={item.priority} title={PRIORITY_LABELS[item.priority]} />
                <ItemMeta>
                  <ItemName $purchased={item.purchased}>{item.name}</ItemName>
                  <ItemSub>
                    <ItemCatChip>{item.category}</ItemCatChip>
                    {item.brand && <span>{item.brand}</span>}
                    {item.purchased && item.purchasedAt && (
                      <span>comprado {item.purchasedAt}</span>
                    )}
                  </ItemSub>
                </ItemMeta>
                <ItemPrice $purchased={item.purchased}>{fmtBRL(item.price)}</ItemPrice>
              </ItemTop>

              {item.notes && (
                <ItemNotes>
                  {isUrl(item.notes)
                    ? <a href={item.notes} target="_blank" rel="noreferrer">{item.notes}</a>
                    : item.notes}
                </ItemNotes>
              )}

              {!isGuest() && (
                <ItemActions>
                  <ActionBtn
                    $variant={item.purchased ? 'uncheck' : 'check'}
                    onClick={() => togglePurchased(item)}
                  >
                    {item.purchased ? '↩ Desfazer' : '✓ Comprado'}
                  </ActionBtn>
                  {!item.purchased && (
                    <ActionBtn $variant="edit" onClick={() => openEdit(item)}>✏ Editar</ActionBtn>
                  )}
                  <ActionBtn $variant="delete" onClick={() => handleDelete(item.id)}>✕</ActionBtn>
                </ItemActions>
              )}
            </ItemCard>
          ))}
        </ItemGrid>
      )}

      {formOpen && (
        <Overlay onClick={closeForm}>
          <Dialog onClick={e => e.stopPropagation()}>
            <DialogTitle>{editItem ? 'Editar item' : 'Adicionar à Wishlist'}</DialogTitle>

            <FormGrid>
              <FormField $full>
                <FormLabel>Nome *</FormLabel>
                <FormInput
                  placeholder="ex: Camisa Oxford Azul Marinho"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  autoFocus
                />
              </FormField>

              <FormField>
                <FormLabel>Categoria</FormLabel>
                <FormSelect
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                >
                  {CAT_LIST.map(c => <option key={c} value={c}>{c}</option>)}
                </FormSelect>
              </FormField>

              <FormField>
                <FormLabel>Marca</FormLabel>
                <FormInput
                  placeholder="ex: Brooksfield"
                  value={form.brand}
                  onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                />
              </FormField>

              <FormField>
                <FormLabel>Preço estimado (R$)</FormLabel>
                <FormInput
                  type="number" min={0} placeholder="0"
                  value={form.price ?? ''}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value ? Number(e.target.value) : null }))}
                />
              </FormField>

              <FormField>
                <FormLabel>Prioridade</FormLabel>
                <PriorityRow>
                  {([1, 2, 3] as const).map(p => (
                    <PriorityChip
                      key={p} $active={form.priority === p} $color={PRIORITY_COLORS[p]}
                      onClick={() => setForm(f => ({ ...f, priority: p }))}
                    >
                      {PRIORITY_LABELS[p]}
                    </PriorityChip>
                  ))}
                </PriorityRow>
              </FormField>

              <FormField $full>
                <FormLabel>Notas / Link</FormLabel>
                <FormTextarea
                  placeholder="https://... ou observações"
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                />
              </FormField>
            </FormGrid>

            <DialogActions>
              <CancelBtn onClick={closeForm}>Cancelar</CancelBtn>
              <SaveBtn onClick={handleSave} disabled={saving || !form.name.trim()}>
                {saving ? 'Salvando…' : 'Salvar'}
              </SaveBtn>
            </DialogActions>
          </Dialog>
        </Overlay>
      )}
    </>
  )
}
