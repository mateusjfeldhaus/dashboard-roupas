import { useState, useEffect } from 'react'

export type ToastType = 'success' | 'error'

export interface Toast {
  id: number
  msg: string
  type: ToastType
}

const DURATION = 3000
let nextId = 0

// Despacha um CustomEvent no window — funciona independente de render cycle
export function toast(msg: string, type: ToastType = 'success') {
  const id = nextId++
  window.dispatchEvent(new CustomEvent<Toast>('app:toast', { detail: { id, msg, type } }))
}

// Hook que escuta o evento e gerencia a lista localmente
export function useToasts(): Toast[] {
  const [list, setList] = useState<Toast[]>([])

  useEffect(() => {
    const handler = (e: Event) => {
      const t = (e as CustomEvent<Toast>).detail
      setList(prev => [...prev, t])
      setTimeout(() => {
        setList(prev => prev.filter(x => x.id !== t.id))
      }, DURATION)
    }
    window.addEventListener('app:toast', handler)
    return () => window.removeEventListener('app:toast', handler)
  }, [])

  return list
}
