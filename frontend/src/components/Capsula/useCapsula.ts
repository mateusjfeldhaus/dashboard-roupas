import { useState, useMemo } from 'react'
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
 * Greedy Maximum Coverage:
 * At each step, pick the piece that fully covers the most new looks,
 * given what's already in the suitcase. Tie-break by "almost-covered"
 * looks (looks that would need only 1 more piece after this one).
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

      // Tiebreak: looks needing exactly 1 more piece after adding this one
      const almostDone = looks.filter(l =>
        !covered.has(l.id) &&
        !newlyCovered.find(x => x.id === l.id) &&
        l.pieces.filter(lp => !trial.has(lp.pieceId)).length === 1
      ).length

      const score = newlyCovered.length * 1000 + almostDone

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

  // Only visible (non-hidden) looks and pieces
  const visibleLooks  = looks.filter(l => !l.hidden)
  const visiblePieces = pieces.filter(p => !p.hidden)

  const result = useMemo(
    () => greedyCapsule(visibleLooks, visiblePieces, n),
    [visibleLooks, visiblePieces, n]
  )

  return { n, setN, result, maxN: Math.min(visiblePieces.length, 30) }
}
