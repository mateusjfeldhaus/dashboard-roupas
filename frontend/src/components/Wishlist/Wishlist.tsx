import { useState, useEffect, useMemo } from 'react'
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
import api from '../../api/client'

// ── Types ─────────────────────────────────────────────────────────────────────

interface WishlistItem {
  id: string
  name: string
  category: string
  brand: string
  price: number | null
  priority: 1 | 2 | 3
  notes: string
  addedAt: string
  purchased: boolean
  purchasedAt: string | null
}

type FormData = Omit<WishlistItem, 'id' | 'addedAt' | 'purchased' | 'purchasedAt'>

const EMPTY_FORM: FormData = {
  name: '', category: 'Camisa', brand: '',
  price: null, priority: 2, notes: '',
}

const CAT_LIST = [
  'Camisa','Polo','Camiseta','Costume','Blazer','Terno',
  'Calça','Sapato','Cinto','Gravata','Relógio','Suéter','Jaqueta','Acessório',
]

const PRIORITY_LABELS: Record<number, string>  = { 1: '🔴 Alta', 2: '🟡 Média', 3: '🟢 Baixa' }
const PRIORITY_COLORS: Record<number, string>  = { 1: '#ef4444',  2: '#f59e0b',  3: '#22c55e' }

function fmtBRL(n: number | null) {
  if (n === null || n === 0) return '—'
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })
}

function isUrl(s: string) {
  try { new URL(s); return true } catch { return false }
}

// ── API helpers ───────────────────────────────────────────────────────────────

async function apiGet(): Promise<WishlistItem[]> {
  const r = await api.get<{ items: WishlistItem[] }>('/api/wishlist')
  return r.data.items
}
async function apiPost(data: FormData): Promise<WishlistItem> {
  const r = await api.post<WishlistItem>('/api/wishlist', data)
  return r.data
}
async function apiPut(id: string, patch: Partial<WishlistItem>): Promise<WishlistItem> {
  const r = await api.put<WishlistItem>(`/api/wishlist/${id}`, patch)
  return r.data
}
async function apiDelete(id: string): Promise<void> {
  await api.delete(`/api/wishlist/${id}`)
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Wishlist() {
  const [items,          setItems]          = useState<WishlistItem[]>([])
  const [catFilter,      setCatFilter]      = useState<string | null>(null)
  const [prioFilter,     setPrioFilter]     = useState<1 | 2 | 3 | null>(null)
  const [showPurchased,  setShowPurchased]  = useState(false)
  const [formOpen,       setFormOpen]       = useState(false)
  const [editItem,       setEditItem]       = useState<WishlistItem | null>(null)
  const [form,           setForm]           = useState<FormData>(EMPTY_FORM)
  const [saving,         setSaving]         = useState(false)

  // ── Load ───────────────────────────────────────────────────────────────────
  useEffect(() => { apiGet().then(setItems).catch(() => {}) }, [])

  // ── Filtered list ──────────────────────────────────────────────────────────
  const visible = useMemo(() => {
    return items.filter(i => {
      if (!showPurchased && i.purchased) return false
      if (catFilter  && i.category !== catFilter) return false
      if (prioFilter && i.priority !== prioFilter) return false
      return true
    }).sort((a, b) => {
      if (a.purchased !== b.purchased) return a.purchased ? 1 : -1
      return a.priority - b.priority
    })
  }, [items, catFilter, prioFilter, showPurchased])

  // ── Stats ──────────────────────────────────────────────────────────────────
  const pending   = items.filter(i => !i.purchased)
  const purchased = items.filter(i => i.purchased)
  const totalEst  = pending.reduce((s, i) => s + (i.price ?? 0), 0)
  const spentEst  = purchased.reduce((s, i) => s + (i.price ?? 0), 0)

  // ── Categories present in list ─────────────────────────────────────────────
  const presentCats = useMemo(
    () => [...new Set(items.map(i => i.category))].sort(),
    [items]
  )

  // ── Form helpers ───────────────────────────────────────────────────────────
  function openAdd() {
    setEditItem(null)
    setForm(EMPTY_FORM)
    setFormOpen(true)
  }
  function openEdit(item: WishlistItem) {
    setEditItem(item)
    setForm({
      name: item.name, category: item.category, brand: item.brand,
      price: item.price, priority: item.priority, notes: item.notes,
    })
    setFormOpen(true)
  }
  function closeForm() { setFormOpen(false); setEditItem(null) }

  async function handleSave() {
    if (!form.name.trim()) return
    setSaving(true)
    try {
      if (editItem) {
        const updated = await apiPut(editItem.id, form)
        setItems(prev => prev.map(i => i.id === editItem.id ? updated : i))
      } else {
        const created = await apiPost(form)
        setItems(prev => [...prev, created])
      }
      closeForm()
    } finally { setSaving(false) }
  }

  async function togglePurchased(item: WishlistItem) {
    const patch = item.purchased
      ? { purchased: false, purchasedAt: null }
      : { purchased: true,  purchasedAt: new Date().toISOString().split('T')[0] }
    const updated = await apiPut(item.id, patch)
    setItems(prev => prev.map(i => i.id === item.id ? updated : i))
  }

  async function handleDelete(id: string) {
    await apiDelete(id)
    setItems(prev => prev.filter(i => i.id !== id))
  }

  // ── Key handler ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!formOpen) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') closeForm() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [formOpen])

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Header */}
      <Header>
        <Title>Wishlist</Title>
        <CountBadge>{pending.length} item{pending.length !== 1 ? 's' : ''}</CountBadge>
        <AddBtn onClick={openAdd}>+ Adicionar</AddBtn>
      </Header>

      {/* Stats */}
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

      {/* Filters */}
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

      {/* List */}
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
            </ItemCard>
          ))}
        </ItemGrid>
      )}

      {/* Add / Edit modal */}
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
