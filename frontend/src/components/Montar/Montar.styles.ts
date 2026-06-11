import styled from 'styled-components'

// ── Layout ────────────────────────────────────────────────────────────────────

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
  @media (max-width: 900px)  { grid-template-columns: 1fr; }
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

// ── Piece picker ──────────────────────────────────────────────────────────────

export const CatRow = styled.div`
  display: flex; gap: 6px; flex-wrap: wrap;
  margin-bottom: 14px;
`

export const CatChip = styled.button<{ $active: boolean }>`
  font-size: 11px; font-weight: 600;
  padding: 4px 10px; border-radius: 20px;
  border: 1px solid ${p => p.$active
    ? p.theme.colors.accent
    : p.theme.colors.border};
  background: ${p => p.$active
    ? p.theme.colors.accent + '22'
    : 'transparent'};
  color: ${p => p.$active
    ? p.theme.colors.accent
    : p.theme.colors.textMuted};
  cursor: pointer;
  transition: all 0.15s;
  &:hover { border-color: ${p => p.theme.colors.accent}88; }
`

export const PieceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 2px;
  @media (max-width: 480px) { grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); }
`

export const PieceThumb = styled.button<{ $selected: boolean; $color: string }>`
  position: relative;
  aspect-ratio: 1;
  border-radius: 10px;
  border: 2px solid ${p => p.$selected
    ? p.theme.colors.accent
    : p.theme.colors.border};
  background: ${p => p.$color}22;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.15s, transform 0.1s;
  &:hover { border-color: ${p => p.theme.colors.accent}88; transform: scale(1.03); }
  ${p => p.$selected && `
    box-shadow: 0 0 0 3px ${p.theme.colors.accent}44;
  `}
`

export const PieceThumbImg = styled.img`
  width: 100%; height: 100%; object-fit: cover;
  display: block;
`

export const PieceCheckmark = styled.span`
  position: absolute; top: 3px; right: 3px;
  width: 18px; height: 18px; border-radius: 50%;
  background: ${p => p.theme.colors.accent};
  color: #000;
  font-size: 11px; font-weight: 900;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.5);
`

export const PieceName = styled.span`
  display: block;
  font-size: 9px; font-weight: 500;
  color: ${p => p.theme.colors.textMuted};
  text-align: center;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  padding: 0 2px;
`

// ── Selected chips ────────────────────────────────────────────────────────────

export const SelectedRow = styled.div`
  display: flex; gap: 6px; flex-wrap: wrap;
  margin-bottom: 16px;
  min-height: 28px;
`

export const SelectedChip = styled.button`
  display: flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 600;
  padding: 4px 8px 4px 10px;
  border-radius: 20px;
  border: 1px solid ${p => p.theme.colors.accent}66;
  background: ${p => p.theme.colors.accent}18;
  color: ${p => p.theme.colors.accent};
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: ${p => p.theme.colors.accent}30; }
`

export const ChipRemove = styled.span`
  font-size: 13px; line-height: 1;
  opacity: 0.7;
`

export const ClearBtn = styled.button`
  font-size: 11px; font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  text-decoration: underline;
  cursor: pointer;
  align-self: center;
  &:hover { color: ${p => p.theme.colors.text}; }
`

// ── Results ───────────────────────────────────────────────────────────────────

export const ResultsHeader = styled.div`
  display: flex; align-items: baseline; gap: 8px;
  margin-bottom: 14px;
`

export const ResultsCount = styled.span`
  font-size: 11px; font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  background: ${p => p.theme.colors.border};
  padding: 2px 8px; border-radius: 10px;
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: ${p => p.theme.colors.textMuted};
  font-size: 14px;
  line-height: 1.7;
`

export const EmptyIcon = styled.div`
  font-size: 40px; margin-bottom: 12px;
`

export const NoMatch = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: ${p => p.theme.colors.textMuted};
  font-size: 13px;
`

// ── Look result card ──────────────────────────────────────────────────────────

export const LookCard = styled.button`
  width: 100%;
  text-align: left;
  background: ${p => p.theme.colors.bg};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  &:hover {
    border-color: ${p => p.theme.colors.accent}66;
    background: ${p => p.theme.colors.surface};
  }
`

export const LookCardHeader = styled.div`
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 10px;
`

export const LookCardTitle = styled.span`
  flex: 1;
  font-size: 14px; font-weight: 700;
  color: ${p => p.theme.colors.text};
`

export const TagRow = styled.div`
  display: flex; gap: 4px; flex-wrap: nowrap;
`

export const Tag = styled.span`
  font-size: 10px; font-weight: 600;
  padding: 2px 6px; border-radius: 6px;
`

export const FormalityDots = styled.div`
  display: flex; gap: 3px; flex-shrink: 0;
`

export const FormalityDot = styled.span<{ $filled: boolean }>`
  width: 7px; height: 7px; border-radius: 50%;
  background: ${p => p.$filled ? p.theme.colors.accent : p.theme.colors.border};
`

// ── Pieces breakdown inside look card ────────────────────────────────────────

export const PiecesBreakdown = styled.div`
  display: flex; gap: 6px; flex-wrap: wrap;
  margin-bottom: 8px;
`

export const PieceChip = styled.span<{ $have: boolean }>`
  display: flex; align-items: center; gap: 4px;
  font-size: 10px; font-weight: 600;
  padding: 3px 8px; border-radius: 20px;
  border: 1px solid ${p => p.$have
    ? p.theme.colors.accent + '88'
    : p.theme.colors.border};
  background: ${p => p.$have
    ? p.theme.colors.accent + '18'
    : 'transparent'};
  color: ${p => p.$have
    ? p.theme.colors.accent
    : p.theme.colors.textMuted};
  opacity: ${p => p.$have ? 1 : 0.6};
`

export const MissingBadge = styled.span`
  font-size: 10px; font-weight: 700;
  color: ${p => p.theme.colors.textMuted};
  background: ${p => p.theme.colors.border};
  padding: 2px 8px; border-radius: 10px;
`

export const SeeBtn = styled.span`
  font-size: 10px; font-weight: 700;
  color: ${p => p.theme.colors.accent};
  opacity: 0.8;
  margin-left: auto;
  flex-shrink: 0;
`
