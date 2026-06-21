import { useState, useEffect, useRef } from 'react'
import api from '../api/client'

type EntityType = 'look' | 'piece'

type NotesStatus = 'idle' | 'saving' | 'saved' | 'error'

interface NotesState {
  notes: string
  status: NotesStatus
  setNotes: (value: string) => void
}

const DEBOUNCE_MS = 800

export function useNotes(
  type: EntityType,
  id: string,
  initialNotes: string | undefined,
): NotesState {
  const [notes,  setNotesState] = useState(initialNotes ?? '')
  const [status, setStatus]     = useState<NotesStatus>('idle')
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mountedRef = useRef(true)

  // Sync when the modal re-opens for a different entity
  useEffect(() => {
    setNotesState(initialNotes ?? '')
    setStatus('idle')
  }, [id, initialNotes])

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  function setNotes(value: string) {
    setNotesState(value)
    setStatus('saving')

    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(async () => {
      const path = type === 'look'
        ? `/api/looks/${encodeURIComponent(id)}/notes`
        : `/api/pieces/${encodeURIComponent(id)}/notes`
      try {
        await api.patch(path, { notes: value })
        if (mountedRef.current) {
          setStatus('saved')
          // Reset to idle after a moment
          setTimeout(() => {
            if (mountedRef.current) setStatus('idle')
          }, 2000)
        }
      } catch {
        if (mountedRef.current) setStatus('error')
      }
    }, DEBOUNCE_MS)
  }

  return { notes, status, setNotes }
}
