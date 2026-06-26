import { useState, useEffect } from 'react'
import api from '../api/client'

interface Options {
  url:       string
  hiddenUrl: (id: string) => string
}

/**
 * Factory que gera hooks de lista com cache + broadcast + invalidate + toggleHidden.
 * useLooks e usePieces compartilham esta estrutura exata.
 */
export function createListHook<T extends { id: string; hidden?: boolean }>(opts: Options) {
  let cache: T[] | null = null
  const listeners = new Set<() => void>()

  function notify() { listeners.forEach(fn => fn()) }

  async function fetchAndStore(
    setAll:     (v: T[]) => void,
    setLoading: (v: boolean) => void,
    setError:   (v: string | null) => void,
  ) {
    try {
      const r = await api.get<T[]>(opts.url)
      cache = r.data
      setAll([...cache])
      setLoading(false)
      notify()
    } catch (e) {
      setError(String(e))
      setLoading(false)
    }
  }

  return function useList() {
    const [all,     setAll]     = useState<T[]>(cache ?? [])
    const [loading, setLoading] = useState(!cache)
    const [error,   setError]   = useState<string | null>(null)

    // Carrega na montagem se não houver cache
    useEffect(() => {
      if (cache) { setAll([...cache]); setLoading(false); return }
      fetchAndStore(setAll, setLoading, setError)
    }, [])

    // Inscreve para receber notificações de invalidação de outras instâncias
    useEffect(() => {
      const refresh = () => { if (cache) setAll([...cache]) }
      listeners.add(refresh)
      return () => { listeners.delete(refresh) }
    }, [])

    function invalidate() {
      cache = null
      setLoading(true)
      fetchAndStore(setAll, setLoading, setError)
    }

    async function toggleHidden(id: string, hidden: boolean) {
      await api.patch(opts.hiddenUrl(id), { hidden })
      invalidate()
    }

    const visible = all.filter(item => !item.hidden)

    return { all, visible, loading, error, invalidate, toggleHidden }
  }
}
