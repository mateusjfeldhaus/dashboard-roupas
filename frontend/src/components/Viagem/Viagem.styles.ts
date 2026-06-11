import styled from 'styled-components'

// ── Layout ────────────────────────────────────────────────────────────────────

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`

export const Panel = styled.section`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 14px;
  padding: 20px;
`

export const PanelTitle = styled.h2`
  font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1.2px;
  color: ${p => p.theme.colors.accent};
  margin-bottom: 16px;
`

// ── Settings ──────────────────────────────────────────────────────────────────

export const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`

export const FieldGroup = styled.div``

export const FieldLabel = styled.label`
  display: block;
  font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.8px;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 6px;
`

export const ChipRow = styled.div`
  display: flex; gap: 6px; flex-wrap: wrap;
`

export const Chip = styled.button<{ $active: boolean }>`
  font-size: 11px; font-weight: 600;
  padding: 5px 10px; border-radius: 20px;
  border: 1px solid ${p => p.$active ? p.theme.colors.accent : p.theme.colors.border};
  background: ${p => p.$active ? p.theme.colors.accent + '22' : 'transparent'};
  color: ${p => p.$active ? p.theme.colors.accent : p.theme.colors.textMuted};
  cursor: pointer;
  transition: all 0.15s;
  &:hover { border-color: ${p => p.theme.colors.accent}88; }
`

export const DaysInput = styled.input`
  width: 72px;
  background: ${p => p.theme.colors.bg};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 14px; font-weight: 600;
  color: ${p => p.theme.colors.text};
  text-align: center;
  &:focus { outline: none; border-color: ${p => p.theme.colors.accent}; }
`

export const ActionRow = styled.div`
  display: flex; gap: 8px; flex-wrap: wrap;
  margin-bottom: 20px;
`

export const GenerateBtn = styled.button`
  flex: 1;
  padding: 10px 16px;
  border-radius: 10px;
  background: ${p => p.theme.colors.accent};
  color: #0f0f0f;
  font-size: 13px; font-weight: 700;
  cursor: pointer;
  transition: opacity 0.15s;
  &:hover { opacity: 0.85; }
`

export const ShuffleBtn = styled.button`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid ${p => p.theme.colors.border};
  background: transparent;
  color: ${p => p.theme.colors.textMuted};
  font-size: 13px; font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { border-color: ${p => p.theme.colors.accent}88; color: ${p => p.theme.colors.text}; }
`

// ── Stats bar ─────────────────────────────────────────────────────────────────

export const StatsBar = styled.div`
  display: flex; gap: 10px; flex-wrap: wrap;
  margin-bottom: 16px;
`

export const StatBadge = styled.span<{ $accent?: boolean }>`
  font-size: 11px; font-weight: 700;
  padding: 4px 10px; border-radius: 20px;
  background: ${p => p.$accent ? p.theme.colors.accent + '22' : p.theme.colors.border};
  color: ${p => p.$accent ? p.theme.colors.accent : p.theme.colors.textMuted};
  border: 1px solid ${p => p.$accent ? p.theme.colors.accent + '55' : 'transparent'};
`

// ── Look list ─────────────────────────────────────────────────────────────────

export const LookList = styled.div`
  display: flex; flex-direction: column; gap: 8px;
`

export const LookRow = styled.div`
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid ${p => p.theme.colors.border};
  background: ${p => p.theme.colors.bg};
`

export const LookRowBtn = styled.button`
  flex: 1; text-align: left;
  display: flex; align-items: center; gap: 10px;
  cursor: pointer;
  &:hover span:first-child { color: ${p => p.theme.colors.accent}; }
`

export const LookRowTitle = styled.span`
  flex: 1;
  font-size: 13px; font-weight: 600;
  color: ${p => p.theme.colors.text};
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
`

export const TagRow = styled.div`
  display: flex; gap: 4px;
`

export const Tag = styled.span`
  font-size: 10px; font-weight: 600;
  padding: 2px 6px; border-radius: 6px;
`

export const FormalityDots = styled.div`
  display: flex; gap: 3px; flex-shrink: 0;
`

export const FormalityDot = styled.span<{ $filled: boolean }>`
  width: 6px; height: 6px; border-radius: 50%;
  background: ${p => p.$filled ? p.theme.colors.accent : p.theme.colors.border};
`

export const RemoveBtn = styled.button`
  width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
  font-size: 14px; line-height: 1;
  color: ${p => p.theme.colors.textMuted};
  border: 1px solid ${p => p.theme.colors.border};
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.12s;
  &:hover { background: #ff4d4d22; border-color: #ff4d4d66; color: #ff6b6b; }
`

export const EmptyState = styled.div`
  text-align: center; padding: 40px 16px;
  color: ${p => p.theme.colors.textMuted};
  font-size: 13px; line-height: 1.7;
`

export const EmptyIcon = styled.div`
  font-size: 40px; margin-bottom: 12px;
`

// ── Checklist ─────────────────────────────────────────────────────────────────

export const ProgressBar = styled.div`
  width: 100%; height: 6px;
  background: ${p => p.theme.colors.border};
  border-radius: 3px; overflow: hidden;
  margin-bottom: 16px;
`

export const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${p => p.$pct}%;
  background: ${p => p.theme.colors.accent};
  border-radius: 3px;
  transition: width 0.3s ease;
`

export const ProgressLabel = styled.div`
  font-size: 11px; font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 8px;
  display: flex; justify-content: space-between;
`

export const CatBlock = styled.div`
  margin-bottom: 16px;
`

export const CatBlockTitle = styled.h3`
  font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.8px;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid ${p => p.theme.colors.border};
`

export const CheckItem = styled.label<{ $checked: boolean }>`
  display: flex; align-items: center; gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.12s;
  opacity: ${p => p.$checked ? 0.5 : 1};
  &:hover { background: ${p => p.theme.colors.border}44; }
`

export const Checkbox = styled.input`
  width: 16px; height: 16px;
  accent-color: ${p => p.theme.colors.accent};
  cursor: pointer; flex-shrink: 0;
`

export const CheckLabel = styled.span<{ $checked: boolean }>`
  font-size: 13px; font-weight: 500;
  color: ${p => p.theme.colors.text};
  text-decoration: ${p => p.$checked ? 'line-through' : 'none'};
  flex: 1;
`

export const CheckCat = styled.span`
  font-size: 10px; font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  background: ${p => p.theme.colors.border};
  padding: 1px 6px; border-radius: 10px;
  flex-shrink: 0;
`

export const ClearCheckBtn = styled.button`
  font-size: 11px; font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  text-decoration: underline; cursor: pointer;
  &:hover { color: ${p => p.theme.colors.text}; }
`

export const CopyBtn = styled.button`
  font-size: 11px; font-weight: 600;
  padding: 5px 12px; border-radius: 8px;
  border: 1px solid ${p => p.theme.colors.border};
  color: ${p => p.theme.colors.textMuted};
  cursor: pointer;
  transition: all 0.15s;
  &:hover { border-color: ${p => p.theme.colors.accent}88; color: ${p => p.theme.colors.text}; }
`

export const ViewPieceBtn = styled.button`
  width: 22px; height: 22px; border-radius: 6px; flex-shrink: 0;
  font-size: 12px; line-height: 1;
  color: ${p => p.theme.colors.textMuted};
  border: 1px solid ${p => p.theme.colors.border};
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.12s;
  &:hover {
    border-color: ${p => p.theme.colors.accent}88;
    color: ${p => p.theme.colors.accent};
    background: ${p => p.theme.colors.accent}11;
  }
`
