/**
 * Fisher-Yates shuffle determinístico com LCG seed.
 * Máscara 0x7fffffff garante s sempre positivo (sem Math.abs).
 */
export function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr]
  let s = (seed + 1) * 1664525 + 1013904223
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0x7fffffff
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
