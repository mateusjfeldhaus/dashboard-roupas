// Shared tag color map used across the dashboard
export const tagColors: Record<string, { bg: string; text: string; border: string }> = {
  formal:    { bg: '#2e1a5e', text: '#a78bfa', border: '#7c3aed55' },
  casual:    { bg: '#0f2e1a', text: '#4ade80', border: '#16a34a55' },
  diurno:    { bg: '#3b2a0a', text: '#fbbf24', border: '#d9770655' },
  noturno:   { bg: '#1a1a2e', text: '#c084fc', border: '#9333ea55' },
  verao:     { bg: '#3b1f0a', text: '#fb923c', border: '#ea580c55' },
  inverno:   { bg: '#0a1f3b', text: '#38bdf8', border: '#0284c755' },
  primavera: { bg: '#1a2e1a', text: '#86efac', border: '#22c55e55' },
  outono:    { bg: '#2e1a0a', text: '#fdba74', border: '#c2410c55' },
  esportes:  { bg: '#0f2a1a', text: '#4ade80', border: '#16a34a88' },
  default:   { bg: '#1a1a1a', text: '#c8a96e', border: '#c8a96e44' },
}

export function getTagColor(tag: string) {
  return tagColors[tag] ?? tagColors.default
}
