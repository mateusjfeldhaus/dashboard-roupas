import styled from 'styled-components'
import { getTagColor } from '../../styles/tagColors'

// ── Sticky group (wraps both category nav + subcat nav) ──────────────────────

export const StickyGroup = styled.div`
  position: sticky;
  top: var(--nav-h);
  z-index: 90;
  background: ${p => p.theme.colors.bg};
  padding-bottom: 8px;
`

// ── Category nav ────────────────────────────────────────────────────────────

export const CategoryNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 12px;
  padding: 10px 16px;
  margin-bottom: 10px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  flex-wrap: nowrap;
  &::-webkit-scrollbar { display: none; }
  @media (max-width: 480px) {
    padding: 8px 10px;
    gap: 6px;
    border-radius: 10px;
    margin-bottom: 6px;
  }
`

export const CategoryChip = styled.button<{ $active: boolean }>`
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.4px;
  cursor: pointer;
  transition: all 0.15s;
  background: ${p => p.$active ? p.theme.colors.accent : 'transparent'};
  color: ${p => p.$active ? p.theme.colors.bg : p.theme.colors.textMuted};
  border: 1px solid ${p => p.$active ? p.theme.colors.accent : p.theme.colors.border};
  white-space: nowrap;
  flex-shrink: 0;
  &:hover {
    background: ${p => p.$active ? p.theme.colors.accent : p.theme.colors.border};
    color: ${p => p.$active ? p.theme.colors.bg : p.theme.colors.text};
  }
  @media (max-width: 480px) { padding: 4px 11px; font-size: 10px; }
`

export const NavLabel = styled.span`
  font-size: 11px;
  color: ${p => p.theme.colors.textMuted};
  white-space: nowrap;
  margin-right: 4px;
  flex-shrink: 0;
  @media (max-width: 480px) { display: none; }
`

// ── Subcat nav ───────────────────────────────────────────────────────────────

export const SubcatNav = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 16px 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  flex-wrap: nowrap;
  &::-webkit-scrollbar { display: none; }
  border-left: 2px solid ${p => p.theme.colors.accent}44;
  margin-left: 4px;
  @media (max-width: 480px) {
    padding: 4px 8px 6px;
    gap: 5px;
    margin-left: 2px;
  }
`

export const SubcatChip = styled.button<{ $active: boolean }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
  background: ${p => p.$active ? p.theme.colors.accent + '22' : 'transparent'};
  color: ${p => p.$active ? p.theme.colors.accent : p.theme.colors.textMuted};
  border: 1px solid ${p => p.$active ? p.theme.colors.accent + '88' : p.theme.colors.border};
  &:hover {
    background: ${p => p.theme.colors.accent}18;
    color: ${p => p.theme.colors.accent};
    border-color: ${p => p.theme.colors.accent}66;
  }
  @media (max-width: 480px) { padding: 3px 10px; font-size: 10px; }
`

export const SubcatLabel = styled.span`
  font-size: 10px;
  color: ${p => p.theme.colors.textMuted};
  opacity: 0.6;
  margin-right: 2px;
  flex-shrink: 0;
  white-space: nowrap;
  @media (max-width: 480px) { display: none; }
`

// ── Piece list ───────────────────────────────────────────────────────────────

export const PieceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: 480px) { gap: 10px; }
`

export const PieceCard = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  @media (max-width: 480px) { border-radius: 10px; }
`

export const PieceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid ${p => p.theme.colors.border};
  @media (max-width: 480px) { gap: 10px; padding: 12px; }
`

export const PieceThumb = styled.div<{ $color: string }>`
  width: 52px;
  height: 68px;
  background: #111;
  border-radius: 6px;
  border: 2px solid ${p => p.$color}55;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 480px) { width: 42px; height: 54px; }
`

export const PieceThumbImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

export const PieceInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const PieceName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 480px) { font-size: 13px; }
`

export const PieceBrand = styled.div`
  font-size: 11px;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 6px;
`

export const LookBadge = styled.div`
  display: inline-block;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 20px;
  background: ${p => p.theme.colors.bg};
  border: 1px solid ${p => p.theme.colors.border};
  color: ${p => p.theme.colors.textMuted};
`

// ── Look rows inside a piece ────────────────────────────────────────────────

export const LookRows = styled.div`
  display: flex;
  flex-direction: column;
`

export const LookRow = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid ${p => p.theme.colors.border};
  text-align: left;
  transition: background 0.15s;
  cursor: pointer;
  &:last-child { border-bottom: none; }
  &:hover { background: ${p => p.theme.colors.bg}; }
  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 6px;
    padding: 10px 12px;
  }
`

export const LookTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${p => p.theme.colors.text};
  flex: 1;
  min-width: 120px;
  @media (max-width: 480px) {
    font-size: 12px;
    width: 100%;
    flex: none;
    min-width: 0;
  }
`

export const LookTagRow = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`

export const LookTag = styled.span<{ $tag: string }>`
  font-size: 9px;
  padding: 2px 7px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  background: ${p => getTagColor(p.$tag).bg};
  color: ${p => getTagColor(p.$tag).text};
  border: 1px solid ${p => getTagColor(p.$tag).border};
`

export const FormalityDots = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  flex-shrink: 0;
`

export const Dot = styled.div<{ $filled: boolean }>`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${p => p.$filled ? p.theme.colors.accent : p.theme.colors.border};
`

export const ClickHint = styled.span`
  font-size: 10px;
  color: ${p => p.theme.colors.accent};
  opacity: 0.7;
  flex-shrink: 0;
`

export const EmptyNote = styled.div`
  padding: 14px 16px;
  font-size: 12px;
  color: ${p => p.theme.colors.textMuted};
  font-style: italic;
`
