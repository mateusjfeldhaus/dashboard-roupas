import { useState } from 'react'
import { shirtLooks } from '@data/shirtLooks'
import { usePieces } from '../../hooks/usePieces'
import type { LookPiece, Look } from '@data/types'

export function buildSyntheticLook(title: string, tag: string, lps: LookPiece[]): Look {
  return {
    id: title, title,
    tags: [tag as never],
    formality: tag === 'formal-gravata' ? 5 : tag === 'formal' ? 4 : 2,
    tip: '',
    pieces: lps,
  }
}

export type ModalInfo = { look: Look } | null

export function useCamisaLooks(filterIds?: string[]) {
  const { pieces } = usePieces()
  const [modal, setModal] = useState<ModalInfo>(null)

  const filtered = filterIds ? shirtLooks.filter(sl => filterIds.includes(sl.shirtId)) : shirtLooks

  return { pieces, modal, setModal, filtered }
}
