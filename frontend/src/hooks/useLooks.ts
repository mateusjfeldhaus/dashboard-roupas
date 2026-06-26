import type { Look } from '@data/types'
import { createListHook } from './createListHook'

const useList = createListHook<Look>({
  url:       '/api/looks',
  hiddenUrl: id => `/api/looks/${encodeURIComponent(id)}/hidden`,
})

export function useLooks() {
  const { all: allLooks, visible: looks, loading, error, invalidate, toggleHidden } = useList()
  return { looks, allLooks, loading, error, invalidate, toggleHidden }
}
