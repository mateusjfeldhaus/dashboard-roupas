import styled from 'styled-components'
import { getTagColor } from '../../styles/tagColors'

export const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.80);
  z-index: 200;
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
  @media (max-width: 600px) {
    padding: 0;
    align-items: flex-end;
  }
`

export const Dialog = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 16px;
  max-width: 700px; width: 100%;
  max-height: 92vh; overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.7);
  @media (max-width: 600px) {
    border-radius: 20px 20px 0 0;
    max-height: 92dvh;
    /* Better overscroll on iOS */
    -webkit-overflow-scrolling: touch;
  }
`

export const Header = styled.div`
  padding: 24px 24px 0;
  display: flex; justify-content: space-between; align-items: flex-start;
  @media (max-width: 480px) { padding: 16px 16px 0; }
`

export const Title = styled.h2`
  font-size: 20px; font-weight: 700;
  color: ${p => p.theme.colors.text};
  @media (max-width: 480px) { font-size: 17px; }
`

export const TagRow = styled.div`
  display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap;
`

export const Tag = styled.span<{ $tag: string }>`
  font-size: 11px; padding: 3px 10px; border-radius: 20px;
  text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;
  background: ${p => getTagColor(p.$tag).bg};
  color: ${p => getTagColor(p.$tag).text};
  border: 1px solid ${p => getTagColor(p.$tag).border};
`

export const CloseBtn = styled.button`
  font-size: 20px; color: ${p => p.theme.colors.textMuted};
  &:hover { color: ${p => p.theme.colors.text}; }
  flex-shrink: 0;
  padding: 4px 8px;
  /* Larger tap target on mobile */
  @media (max-width: 480px) {
    font-size: 24px;
    padding: 0 4px;
  }
`

export const Body = styled.div`
  padding: 20px 24px 24px;
  @media (max-width: 480px) { padding: 14px 16px 32px; }
`

export const FlatLayTitle = styled.h3`
  font-size: 12px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  color: ${p => p.theme.colors.accent};
  margin-bottom: 16px;
`

export const FlatLay = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 18px;
  }
  @media (max-width: 360px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const PieceSlot = styled.div`
  text-align: center;
`

export const PieceImg = styled.div<{ $color: string }>`
  width: 100%; aspect-ratio: 3/4;
  background: #111;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid ${p => p.$color}44;
  display: flex; align-items: center; justify-content: center;
`

export const Img = styled.img`
  width: 100%; height: 100%; object-fit: contain;
`

export const PieceCat = styled.div`
  font-size: 10px; color: ${p => p.theme.colors.textMuted};
  margin-top: 6px; text-transform: uppercase; letter-spacing: 0.5px;
`

export const PieceName = styled.div`
  font-size: 11px; font-weight: 600;
  color: ${p => p.theme.colors.text};
  margin-top: 2px; line-height: 1.3;
`

export const Tip = styled.div`
  background: ${p => p.theme.colors.bg};
  border-left: 3px solid ${p => p.theme.colors.accent};
  border-radius: 4px;
  padding: 14px 16px;
  font-size: 13px; line-height: 1.6;
  color: ${p => p.theme.colors.text};
  @media (max-width: 480px) { font-size: 12px; padding: 12px 14px; }
`

export const Formalidade = styled.div`
  display: flex; gap: 4px; margin-top: 10px; margin-bottom: 16px;
`

export const Dot = styled.div<{ $filled: boolean }>`
  width: 8px; height: 8px; border-radius: 50%;
  background: ${p => p.$filled ? p.theme.colors.accent : p.theme.colors.border};
`

// ─── Usage History ────────────────────────────────────────────────────────────

export const UsageRow = styled.div`
  display: flex; align-items: center; gap: 10px;
  margin-top: 10px; flex-wrap: wrap;
`

export const UsageStat = styled.div`
  font-size: 12px; color: ${p => p.theme.colors.textMuted};
  display: flex; align-items: center; gap: 5px;
`

export const UsageBadge = styled.span`
  background: ${p => p.theme.colors.accent}22;
  color: ${p => p.theme.colors.accent};
  border: 1px solid ${p => p.theme.colors.accent}44;
  border-radius: 20px;
  font-size: 11px; font-weight: 700;
  padding: 1px 9px;
`

export const MarkBtn = styled.button<{ $loading?: boolean }>`
  width: 36px; height: 36px;
  border-radius: 50%;
  background: ${p => p.theme.colors.accent};
  color: #000;
  font-size: 20px; font-weight: 700; line-height: 1;
  display: flex; align-items: center; justify-content: center;
  cursor: ${p => p.$loading ? 'default' : 'pointer'};
  opacity: ${p => p.$loading ? 0.5 : 1};
  transition: opacity 0.15s, transform 0.1s;
  flex-shrink: 0;
  &:hover:not(:disabled) { transform: scale(1.1); }
`

export const UndoBtn = styled.button`
  font-size: 11px; color: ${p => p.theme.colors.textMuted};
  text-decoration: underline; cursor: pointer;
  &:hover { color: ${p => p.theme.colors.text}; }
`

// ─── Star Rating ──────────────────────────────────────────────────────────────

export const RatingRow = styled.div`
  display: flex; align-items: center; gap: 8px;
  margin-top: 10px;
`

export const RatingLabel = styled.span`
  font-size: 11px; color: ${p => p.theme.colors.textMuted};
  flex-shrink: 0;
`

export const StarRow = styled.div`
  display: flex; gap: 2px; align-items: center;
`

export const Star = styled.button<{ $filled: boolean; $loading: boolean }>`
  font-size: 24px;
  line-height: 1;
  color: ${p => p.$filled ? '#f59e0b' : p.theme.colors.border};
  cursor: ${p => p.$loading ? 'default' : 'pointer'};
  opacity: ${p => p.$loading ? 0.5 : 1};
  transition: color 0.12s, transform 0.1s;
  padding: 2px 3px;
  /* Larger tap target on mobile */
  @media (max-width: 480px) {
    font-size: 28px;
    padding: 2px 4px;
  }
  &:hover:not(:disabled) {
    transform: scale(1.2);
    color: #f59e0b;
  }
`

export const ExportBtn = styled.button<{ $loading?: boolean }>`
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px; border-radius: 8px;
  font-size: 12px; font-weight: 700;
  border: 1px solid ${p => p.theme.colors.border};
  color: ${p => p.theme.colors.textMuted};
  background: transparent;
  cursor: ${p => p.$loading ? 'wait' : 'pointer'};
  opacity: ${p => p.$loading ? 0.6 : 1};
  transition: all 0.15s;
  &:hover:not(:disabled) {
    border-color: ${p => p.theme.colors.accent}88;
    color: ${p => p.theme.colors.accent};
  }
`
