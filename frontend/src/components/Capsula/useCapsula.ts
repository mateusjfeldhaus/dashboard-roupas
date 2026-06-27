import { useState, useMemo, useRef } from 'react'
import { useLooks } from '../../hooks/useLooks'
import { usePieces } from '../../hooks/usePieces'
import type { Look, Piece } from '@data/types'

// ── Algorithm ─────────────────────────────────────────────────────────────────

export interface CapsuleStep {
  piece: Piece
  newLooks: Look[]   // looks fully covered by adding this piece
}

export interface CapsuleResult {
  steps: CapsuleStep[]
  totalCovered: number
  totalLooks: number
}

/**
 * Greedy Maximum Coverage com potencial de cobertura parcial.
 *
 * Problema do tiebreak original: looks têm 4-8 peças. Com score = newlyCovered*1000 + almostDone
 * (only 1 piece missing), o algoritmo nunca converge — no step 1, nenhuma peça cobre um look
 * completo e nenhum look está a 1 peça de ser coberto. O algoritmo escolhe peças aleatórias
 * e nunca agrupa peças do mesmo look.
 *
 * Solução: usar potencial de cobertura ponderado exponencialmente.
 * Para cada peça candidata, calcula a soma de (matched/total)³ sobre todos os looks não cobertos.
 * O expoente 3 faz looks quase-completos (ex: 5/6 peças) valer muito mais do que looks
 * recém-iniciados (ex: 1/6), guiando o algoritmo a completar looks em vez de acumular
 * peças populares isoladamente.
 */
function greedyCapsule(looks: Look[], pieces: Piece[], n: number): CapsuleResult {
  const selected  = new Set<string>()  // piece IDs in suitcase
  const covered   = new Set<string>()  // look IDs fully covered
  const steps: CapsuleStep[] = []

  for (let i = 0; i < n; i++) {
    let best: Piece | null = null
    let bestNew: Look[]    = []
    let bestScore          = -1

    for (const piece of pieces) {
      if (selected.has(piece.id)) continue

      const trial = new Set([...selected, piece.id])

      const newlyCovered = looks.filter(l =>
        !covered.has(l.id) &&
        l.pieces.length > 0 &&
        l.pieces.every(lp => trial.has(lp.pieceId))
      )

      // Potencial: soma de (matched/total)³ para looks não cobertos.
      // Expoente alto prioriza looks quase-completos, forçando o algoritmo
      // a agrupar peças do mesmo look em vez de espalhar entre muitos looks.
      let potential = 0
      for (const l of looks) {
        if (covered.has(l.id) || l.pieces.length === 0) continue
        const matched = l.pieces.filter(lp => trial.has(lp.pieceId)).length
        potential += (matched / l.pieces.length) ** 3
      }

      const score = newlyCovered.length * 1_000_000 + potential

      if (score > bestScore) {
        bestScore = score
        best      = piece
        bestNew   = newlyCovered
      }
    }

    if (!best) break

    selected.add(best.id)
    bestNew.forEach(l => covered.add(l.id))
    steps.push({ piece: best, newLooks: bestNew })
  }

  return { steps, totalCovered: covered.size, totalLooks: looks.length }
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useCapsula() {
  const { looks }   = useLooks()
  const { pieces }  = usePieces()
  const [n, setN]   = useState(7)

  // Stable refs: only update when the underlying data actually changes (by ID signature).
  // Without this, filter() creates a new array every render and defeats useMemo.
  const looksRef  = useRef<Look[]>([])
  const piecesRef = useRef<Piece[]>([])

  const looksKey  = looks.map(l => l.id).join(',')
  const piecesKey = pieces.map(p => p.id).join(',')

  if (looksRef.current.map(l => l.id).join(',') !== looksKey) {
    looksRef.current = looks.filter(l => !l.hidden)
  }
  if (piecesRef.current.map(p => p.id).join(',') !== piecesKey) {
    piecesRef.current = pieces.filter(p => !p.hidden)
  }

  const result = useMemo(
    () => greedyCapsule(looksRef.current, piecesRef.current, n),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [looksKey, piecesKey, n]
  )

  return { n, setN, result, maxN: Math.min(piecesRef.current.length, 30) }
}
