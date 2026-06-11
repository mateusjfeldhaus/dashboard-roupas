import styled from 'styled-components'

// ── Page layout ───────────────────────────────────────────────────────────────

export const Wrap = styled.div`
  max-width: 860px;
  margin: 0 auto;
`

// ── Month header ──────────────────────────────────────────────────────────────

export const MonthNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  @media (max-width: 480px) { margin-bottom: 16px; }
`

export const NavArrow = styled.button`
  width: 36px; height: 36px;
  border-radius: 50%;
  font-size: 18px;
  color: ${p => p.theme.colors.textMuted};
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s, color 0.15s;
  &:hover {
    background: ${p => p.theme.colors.surface};
    color: ${p => p.theme.colors.accent};
  }
`

export const MonthLabel = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
  text-transform: capitalize;
  @media (max-width: 480px) { font-size: 16px; }
`

export const TodayBtn = styled.button`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: ${p => p.theme.colors.accent};
  border: 1px solid ${p => p.theme.colors.accent}44;
  border-radius: 20px;
  padding: 4px 12px;
  transition: background 0.15s;
  &:hover { background: ${p => p.theme.colors.accent}18; }
`

// ── Monthly stats strip ───────────────────────────────────────────────────────

export const StatsStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
  @media (max-width: 480px) { gap: 8px; margin-bottom: 16px; }
`

export const StatCard = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 10px;
  padding: 14px 16px;
  @media (max-width: 480px) { padding: 10px 12px; }
`

export const StatNum = styled.div`
  font-size: 26px;
  font-weight: 800;
  color: ${p => p.theme.colors.accent};
  line-height: 1;
  @media (max-width: 480px) { font-size: 20px; }
`

export const StatLbl = styled.div`
  font-size: 11px;
  color: ${p => p.theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-top: 5px;
  @media (max-width: 480px) { font-size: 9px; }
`

// ── Calendar grid ─────────────────────────────────────────────────────────────

export const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 4px;
`

export const WeekDayLabel = styled.div`
  text-align: center;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: ${p => p.theme.colors.textMuted};
  padding: 4px 0;
`

export const CalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 28px;
  @media (max-width: 480px) { gap: 3px; margin-bottom: 20px; }
`

export const DayCell = styled.button<{
  $today: boolean
  $selected: boolean
  $count: number
  $empty: boolean
}>`
  aspect-ratio: 1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  cursor: ${p => p.$empty ? 'default' : 'pointer'};
  pointer-events: ${p => p.$empty ? 'none' : 'all'};
  transition: background 0.15s, transform 0.1s;
  position: relative;
  outline: ${p => p.$today ? `2px solid ${p.theme.colors.accent}` : 'none'};
  outline-offset: -2px;

  background: ${p => {
    if (p.$empty) return 'transparent'
    if (p.$selected) return p.theme.colors.accent + '33'
    if (p.$count > 0) return p.theme.colors.accent + Math.min(p.$count * 18 + 15, 60).toString(16).padStart(2, '0')
    return p.theme.colors.surface
  }};

  border: 1px solid ${p => {
    if (p.$empty) return 'transparent'
    if (p.$selected) return p.theme.colors.accent
    if (p.$count > 0) return p.theme.colors.accent + '66'
    return p.theme.colors.border
  }};

  &:hover:not(:disabled) {
    background: ${p => p.theme.colors.accent}22;
    border-color: ${p => p.theme.colors.accent}88;
    transform: scale(1.06);
  }
`

export const DayNum = styled.span<{ $today: boolean; $count: number }>`
  font-size: 13px;
  font-weight: ${p => p.$today || p.$count > 0 ? 700 : 400};
  color: ${p => p.$count > 0 ? p.theme.colors.accent : p.$today ? p.theme.colors.accent : p.theme.colors.textMuted};
  line-height: 1;
  @media (max-width: 480px) { font-size: 11px; }
`

export const DayDot = styled.div<{ $count: number }>`
  width: ${p => Math.min(p.$count * 3 + 3, 8)}px;
  height: ${p => Math.min(p.$count * 3 + 3, 8)}px;
  border-radius: 50%;
  background: ${p => p.theme.colors.accent};
  flex-shrink: 0;
`

// ── Day detail panel ──────────────────────────────────────────────────────────

export const DayPanel = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.accent}44;
  border-radius: 14px;
  padding: 20px 24px;
  margin-bottom: 28px;
  animation: slideIn 0.15s ease;
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: none; }
  }
  @media (max-width: 480px) { padding: 14px 16px; }
`

export const DayPanelTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${p => p.theme.colors.accent};
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const PanelClose = styled.button`
  font-size: 11px;
  color: ${p => p.theme.colors.textMuted};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 20px;
  padding: 2px 10px;
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  &:hover { color: ${p => p.theme.colors.text}; }
`

export const LookList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const LookRow = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: ${p => p.theme.colors.bg};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 10px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s;
  &:hover { border-color: ${p => p.theme.colors.accent}; }
`

export const LookName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${p => p.theme.colors.text};
  flex: 1;
  @media (max-width: 480px) { font-size: 13px; }
`

export const LookTags = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`

export const TagChip = styled.span`
  font-size: 9px;
  padding: 2px 7px;
  border-radius: 20px;
  background: ${p => p.theme.colors.accent}18;
  color: ${p => p.theme.colors.accent};
  border: 1px solid ${p => p.theme.colors.accent}33;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
`

export const EmptyDay = styled.div`
  font-size: 13px;
  color: ${p => p.theme.colors.textMuted};
  font-style: italic;
`

// ── Streak banner ─────────────────────────────────────────────────────────────

export const StreakBanner = styled.div<{ $active: boolean }>`
  display: ${p => p.$active ? 'flex' : 'none'};
  align-items: center;
  gap: 10px;
  background: ${p => p.theme.colors.accent}12;
  border: 1px solid ${p => p.theme.colors.accent}33;
  border-radius: 10px;
  padding: 10px 16px;
  margin-bottom: 20px;
  font-size: 13px;
  color: ${p => p.theme.colors.text};
`
