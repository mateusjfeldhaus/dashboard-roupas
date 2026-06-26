import type { Piece } from '../../../backend/data/types'
import { createListHook } from './createListHook'

const useList = createListHook<Piece>({
  url:       '/api/pieces',
  hiddenUrl: id => `/api/pieces/${encodeURIComponent(id)}/hidden`,
})

export function usePieces() {
  const { all: allPieces, visible: pieces, loading, error, invalidate, toggleHidden } = useList()
  return { pieces, allPieces, loading, error, invalidate, toggleHidden }
}
