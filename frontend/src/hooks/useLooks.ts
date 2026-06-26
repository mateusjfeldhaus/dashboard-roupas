import { useState, useEffect } from 'react'
import api from '../api/client'
import type { Look } from '../../../backend/data/types'

type ApiLook = Look & { createdAt?: string }

let cache: Look[] | null = null
const listeners: Set<() => void> = new Set()

function notify() { listeners.forEach(fn => fn()) }

export function useLooks() {
  const [allLooks, setAllLooks] = useState<Look[]>(cache ?? [])
  const [loading,  setLoading]  = useState(!cache)
  const [error,    setError]    = useState<string | null>(null)

  useEffect(() => {
    if (cache) { setAllLooks(cache); setLoading(false); return }

    api.get<ApiLook[]>('/api/looks')
      .then(r => {
        cache = r.data
        setAllLooks(cache)
        setLoading(false)
        notify()
      })
      .catch(e => { setError(String(e)); setLoading(false) })
  }, [])

  useEffect(() => {
    const refresh = () => { if (cache) setAllLooks([...cache]) }
    listeners.add(refresh)
    return () => { listeners.delete(refresh) }
  }, [])

  function invalidate() {
    cache = null
    setLoading(true)
    api.get<ApiLook[]>('/api/looks')
      .then(r => { cache = r.data; setAllLooks(cache!); setLoading(false); notify() })
      .catch(e => { setError(String(e)); setLoading(false) })
  }

  async function toggleHidden(lookId: string, hidden: boolean) {
    await api.patch(`/api/looks/${encodeURIComponent(lookId)}/hidden`, { hidden })
    invalidate()
  }

  // looks = apenas visíveis (hidden: false)
  const looks = allLooks.filter(l => !l.hidden)

  return { looks, allLooks, loading, error, invalidate, toggleHidden }
}
