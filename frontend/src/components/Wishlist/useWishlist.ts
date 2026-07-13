import { useState, useEffect, useMemo } from 'react'
import api from '../../api/client'
import { toast } from '../../hooks/useToast'
import { CAT_LIST } from '../../utils/lookHelpers'
import type { WishlistItem } from '@data/types'

export { CAT_LIST }
export type { WishlistItem }

// ── Types ─────────────────────────────────────────────────────────────────────

export type FormData = Omit<WishlistItem, 'id' | 'createdAt' | 'purchased' | 'purchasedAt'>

export const EMPTY_FORM: FormData = {
  name: '', category: 'Camisa', brand: '',
  price: null, priority: 2, notes: '', link: '',
}


export const PRIORITY_LABELS: Record<number, string> = { 1: '🔴 Alta', 2: '🟡 Média', 3: '🟢 Baixa' }
export const PRIORITY_COLORS: Record<number, string> = { 1: '#ef4444',  2: '#f59e0b',  3: '#22c55e' }

export function fmtBRL(n: number | null) {
  if (n === null || n === 0) return '—'
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })
}

export function isUrl(s: string) {
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

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useWishlist() {
  const [items,         setItems]         = useState<WishlistItem[]>([])
  const [catFilter,     setCatFilter]     = useState<string | null>(null)
  const [prioFilter,    setPrioFilter]    = useState<1 | 2 | 3 | null>(null)
  const [showPurchased, setShowPurchased] = useState(false)
  const [formOpen,      setFormOpen]      = useState(false)
  const [editItem,      setEditItem]      = useState<WishlistItem | null>(null)
  const [form,          setForm]          = useState<FormData>(EMPTY_FORM)
  const [saving,        setSaving]        = useState(false)

  useEffect(() => { apiGet().then(setItems).catch(() => toast('Erro ao carregar wishlist', 'error')) }, [])

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

  const pending   = items.filter(i => !i.purchased)
  const purchased = items.filter(i => i.purchased)
  const totalEst  = pending.reduce((s, i) => s + (i.price ?? 0), 0)
  const spentEst  = purchased.reduce((s, i) => s + (i.price ?? 0), 0)

  const presentCats = useMemo(
    () => [...new Set(items.map(i => i.category))].sort(),
    [items]
  )

  function openAdd() {
    setEditItem(null); setForm(EMPTY_FORM); setFormOpen(true)
  }
  function openEdit(item: WishlistItem) {
    setEditItem(item)
    setForm({
      name: item.name, category: item.category, brand: item.brand,
      price: item.price, priority: item.priority, notes: item.notes, link: item.link,
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
      toast(editItem ? 'Item atualizado!' : 'Item adicionado!')
    } catch {
      toast('Erro ao salvar item', 'error')
    } finally { setSaving(false) }
  }

  async function togglePurchased(item: WishlistItem) {
    const patch = item.purchased
      ? { purchased: false, purchasedAt: null }
      : { purchased: true,  purchasedAt: new Date().toISOString().split('T')[0] }
    try {
      const updated = await apiPut(item.id, patch)
      setItems(prev => prev.map(i => i.id === item.id ? updated : i))
      toast(item.purchased ? 'Desmarcado como comprado' : 'Marcado como comprado!')
    } catch {
      toast('Erro ao atualizar item', 'error')
    }
  }

  async function handleDelete(id: string) {
    const item = items.find(i => i.id === id)
    if (!window.confirm(`Remover "${item?.name ?? 'item'}" da wishlist?`)) return
    try {
      await apiDelete(id)
      setItems(prev => prev.filter(i => i.id !== id))
      toast('Item removido')
    } catch {
      toast('Erro ao excluir item', 'error')
    }
  }

  useEffect(() => {
    if (!formOpen) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') closeForm() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [formOpen])

  return {
    items, visible,
    catFilter, setCatFilter,
    prioFilter, setPrioFilter,
    showPurchased, setShowPurchased,
    formOpen, editItem, form, setForm, saving,
    pending, purchased, totalEst, spentEst,
    presentCats,
    openAdd, openEdit, closeForm,
    handleSave, togglePurchased, handleDelete,
  }
}
