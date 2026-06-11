import styled from 'styled-components'

// ── Header / period filter ────────────────────────────────────────────────────

export const PageHeader = styled.div`
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  margin-bottom: 24px;
`

export const PageTitle = styled.h1`
  font-size: 20px; font-weight: 800;
  color: ${p => p.theme.colors.text};
  flex: 1;
`

export const PeriodRow = styled.div`
  display: flex; gap: 6px;
`

export const PeriodChip = styled.button<{ $active: boolean }>`
  font-size: 11px; font-weight: 700;
  padding: 5px 12px; border-radius: 20px;
  border: 1px solid ${p => p.$active ? p.theme.colors.accent : p.theme.colors.border};
  background: ${p => p.$active ? p.theme.colors.accent + '22' : 'transparent'};
  color: ${p => p.$active ? p.theme.colors.accent : p.theme.colors.textMuted};
  cursor: pointer; transition: all 0.15s;
  &:hover { border-color: ${p => p.theme.colors.accent}88; }
`

// ── Metrics grid ──────────────────────────────────────────────────────────────

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  margin-bottom: 28px;
  @media (max-width: 900px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 480px) { grid-template-columns: repeat(2, 1fr); }
`

export const MetricCard = styled.div<{ $accent?: boolean }>`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.$accent ? p.theme.colors.accent + '55' : p.theme.colors.border};
  border-radius: 12px;
  padding: 14px 16px;
  ${p => p.$accent && `background: ${p.theme.colors.accent}10;`}
`

export const MetricNum = styled.div<{ $accent?: boolean }>`
  font-size: 26px; font-weight: 800;
  color: ${p => p.$accent ? p.theme.colors.accent : p.theme.colors.text};
  line-height: 1.1;
`

export const MetricLabel = styled.div`
  font-size: 10px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.8px;
  color: ${p => p.theme.colors.textMuted};
  margin-top: 4px;
`

// ── Two-column grid ───────────────────────────────────────────────────────────

export const TwoCol = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
  margin-bottom: 20px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`

export const ThreeCol = styled.div`
  display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;
  margin-bottom: 20px;
  @media (max-width: 900px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`

// ── Section card ──────────────────────────────────────────────────────────────

export const Section = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 14px;
  padding: 18px 20px;
  margin-bottom: 20px;
`

export const SectionTitle = styled.h2`
  font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1.2px;
  color: ${p => p.theme.colors.accent};
  margin-bottom: 16px;
`

// ── Monthly bar chart ─────────────────────────────────────────────────────────

export const ChartWrap = styled.div`
  width: 100%; overflow-x: auto;
`

export const BarChart = styled.svg`
  display: block; overflow: visible;
`

// ── Horizontal bar (tag/formality distribution) ───────────────────────────────

export const DistRow = styled.div`
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 10px;
`

export const DistLabel = styled.span`
  font-size: 12px; font-weight: 600;
  color: ${p => p.theme.colors.text};
  min-width: 80px;
`

export const DistBarWrap = styled.div`
  flex: 1; height: 8px;
  background: ${p => p.theme.colors.border};
  border-radius: 4px; overflow: hidden;
`

export const DistBarFill = styled.div<{ $pct: number; $color?: string }>`
  height: 100%; border-radius: 4px;
  width: ${p => p.$pct}%;
  background: ${p => p.$color ?? p.theme.colors.accent};
  transition: width 0.4s ease;
`

export const DistCount = styled.span`
  font-size: 11px; font-weight: 700;
  color: ${p => p.theme.colors.textMuted};
  min-width: 32px; text-align: right;
`

// ── Ranked list ───────────────────────────────────────────────────────────────

export const RankedList = styled.ol`
  list-style: none; padding: 0; margin: 0;
`

export const RankedItem = styled.li`
  display: flex; align-items: center; gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid ${p => p.theme.colors.border};
  &:last-child { border-bottom: none; }
`

export const RankNum = styled.span`
  font-size: 11px; font-weight: 800;
  color: ${p => p.theme.colors.textMuted};
  min-width: 20px;
`

export const RankName = styled.span`
  flex: 1;
  font-size: 13px; font-weight: 600;
  color: ${p => p.theme.colors.text};
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
`

export const RankBadge = styled.span`
  font-size: 11px; font-weight: 700;
  color: ${p => p.theme.colors.accent};
  background: ${p => p.theme.colors.accent}18;
  border: 1px solid ${p => p.theme.colors.accent}44;
  padding: 2px 8px; border-radius: 10px;
  flex-shrink: 0;
`

export const RankSub = styled.span`
  font-size: 10px; color: ${p => p.theme.colors.textMuted};
`

// ── Formality dots row ────────────────────────────────────────────────────────

export const FormalRow = styled.div`
  display: flex; align-items: center; gap: 6px;
`

export const FDot = styled.span<{ $filled: boolean }>`
  width: 8px; height: 8px; border-radius: 50%;
  background: ${p => p.$filled ? p.theme.colors.accent : p.theme.colors.border};
  flex-shrink: 0;
`

// ── Empty / loading ───────────────────────────────────────────────────────────

export const EmptyState = styled.div`
  text-align: center; padding: 60px 24px;
  color: ${p => p.theme.colors.textMuted};
  font-size: 14px;
`

export const LoadingMsg = styled.div`
  text-align: center; padding: 40px;
  color: ${p => p.theme.colors.textMuted};
  font-size: 14px;
`

// ── Insight callout ───────────────────────────────────────────────────────────

export const InsightBanner = styled.div`
  background: ${p => p.theme.colors.accent}10;
  border: 1px solid ${p => p.theme.colors.accent}33;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 13px;
  color: ${p => p.theme.colors.text};
  margin-bottom: 20px;
  line-height: 1.6;
`
