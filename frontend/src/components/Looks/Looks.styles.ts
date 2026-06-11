import styled from 'styled-components'
import { getTagColor } from '../../styles/tagColors'

// ── Sticky wrapper ─────────────────────────────────────────────────────────
export const FilterStickyWrap = styled.div`
  position: sticky;
  top: var(--nav-h);
  z-index: 90;
  background: ${p => p.theme.colors.bg};
  padding-bottom: 16px;
`

// ── Filter panel ───────────────────────────────────────────────────────────
export const FilterPanel = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 480px) {
    padding: 10px 12px;
    gap: 8px;
    border-radius: 10px;
  }
`

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  @media (max-width: 480px) { gap: 6px; }
`

export const GroupLabel = styled.span`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: ${p => p.theme.colors.textMuted};
  min-width: 56px;
  flex-shrink: 0;
  @media (max-width: 480px) { min-width: 46px; font-size: 9px; }
`

export const FilterChip = styled.button<{ $active: boolean; $tag: string }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  cursor: pointer;
  transition: all 0.15s;
  background: ${p => p.$active ? getTagColor(p.$tag).bg : 'transparent'};
  color: ${p => p.$active ? getTagColor(p.$tag).text : p.theme.colors.textMuted};
  border: 1px solid ${p => p.$active ? getTagColor(p.$tag).border : p.theme.colors.border};
  &:hover {
    background: ${p => getTagColor(p.$tag).bg};
    color: ${p => getTagColor(p.$tag).text};
    border-color: ${p => getTagColor(p.$tag).border};
  }
  @media (max-width: 480px) { padding: 3px 9px; font-size: 10px; }
`

export const Divider = styled.div`
  height: 1px;
  background: ${p => p.theme.colors.border};
  margin: 0 -2px;
`

// ── Count / meta row ───────────────────────────────────────────────────────
export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  @media (max-width: 480px) { margin-bottom: 10px; }
`

export const Count = styled.span`
  font-size: 11px;
  color: ${p => p.theme.colors.textMuted};
`

export const ClearBtn = styled.button`
  font-size: 11px;
  color: ${p => p.theme.colors.accent};
  opacity: 0.7;
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid ${p => p.theme.colors.accent}44;
  transition: opacity 0.15s;
  &:hover { opacity: 1; }
`

// ── Look card grid ─────────────────────────────────────────────────────────
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`

export const Card = styled.button`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  text-align: left;
  transition: border-color 0.2s, transform 0.1s;
  cursor: pointer;
  &:hover {
    border-color: ${p => p.theme.colors.accent};
    transform: translateY(-2px);
  }
  @media (max-width: 480px) { padding: 14px; border-radius: 10px; }
`

export const CardTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
  margin-bottom: 10px;
  @media (max-width: 480px) { font-size: 13px; margin-bottom: 7px; }
`

export const TagRow = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 10px;
  @media (max-width: 480px) { gap: 4px; margin-bottom: 7px; }
`

export const Tag = styled.span<{ $tag: string }>`
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  background: ${p => getTagColor(p.$tag).bg};
  color: ${p => getTagColor(p.$tag).text};
  border: 1px solid ${p => getTagColor(p.$tag).border};
  @media (max-width: 480px) { font-size: 9px; padding: 2px 6px; }
`

export const FormalityRow = styled.div`
  display: flex;
  gap: 3px;
  margin-bottom: 10px;
`

export const Dot = styled.div<{ $filled: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${p => p.$filled ? p.theme.colors.accent : p.theme.colors.border};
`

export const PieceList = styled.div`
  font-size: 12px;
  color: ${p => p.theme.colors.textMuted};
  line-height: 1.6;
  @media (max-width: 480px) { font-size: 11px; }
`

export const ClickHint = styled.div`
  font-size: 11px;
  color: ${p => p.theme.colors.accent};
  margin-top: 12px;
  opacity: 0.7;
  @media (max-width: 480px) { margin-top: 8px; }
`
