import { useState, useEffect } from 'react'

// ── Tipos ─────────────────────────────────────────────────────────────────────

export type ToastType = 'success' | 'error'

export interface Toast {
  id: number
  msg: string
  type: ToastType
}

// ── Singleton — compartilhado entre todos os componentes ──────────────────────

let listeners: Array<(toasts: Toast[]) => void> = []
let toasts: Toast[] = []
let nextId = 0
const DURATION = 3000

// Função global — importe e chame de qualquer hook ou componente
export function toast(msg: string, type: ToastType = 'success') {
  const id = nextId++
  toasts = [...toasts, { id, msg, type }]
  listeners.forEach(fn => fn(toasts))

  setTimeout(() => {
    toasts = toasts.filter(t => t.id !== id)
    listeners.forEach(fn => fn(toasts))
  }, DURATION)
}

// Hook para o componente visual se inscrever nas mudanças
export function useToasts(): Toast[] {
  const [list, setList] = useState<Toast[]>(toasts)

  useEffect(() => {
    listeners.push(setList)
    return () => { listeners = listeners.filter(l => l !== setList) }
  }, [])

  return list
}
