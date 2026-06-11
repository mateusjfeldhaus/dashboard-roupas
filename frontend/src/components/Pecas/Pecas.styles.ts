import styled from 'styled-components'

// ── Sticky wrapper ─────────────────────────────────────────────────────────
export const FilterStickyWrap = styled.div`
  position: sticky;
  top: var(--nav-h);
  z-index: 90;
  background: ${p => p.theme.colors.bg};
  padding-bottom: 12px;
`

export const FilterBar = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px;
  @media (max-width: 480px) { gap: 6px; }
`

export const FilterBtn = styled.button<{ $active: boolean }>`
  padding: 6px 14px; border-radius: 20px; font-size: 12px;
  font-weight: 500;
  background: ${p => p.$active ? p.theme.colors.accent : p.theme.colors.surface};
  color: ${p => p.$active ? '#0f0f0f' : p.theme.colors.textMuted};
  border: 1px solid ${p => p.$active ? p.theme.colors.accent : p.theme.colors.border};
  transition: all 0.2s;
  &:hover { border-color: ${p => p.theme.colors.accent}; color: ${p => p.theme.colors.accent}; }
  @media (max-width: 480px) { padding: 5px 11px; font-size: 11px; }
`

export const Section = styled.section`
  margin-bottom: 36px;
  @media (max-width: 480px) { margin-bottom: 24px; }
`

export const CatTitle = styled.h3`
  font-size: 13px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1.5px;
  color: ${p => p.theme.colors.accent};
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${p => p.theme.colors.border};
`

export const PieceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
`

export const PieceCard = styled.button`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 10px;
  overflow: hidden;
  text-align: left;
  transition: border-color 0.2s, transform 0.1s;
  cursor: pointer;
  &:hover {
    border-color: ${p => p.theme.colors.accent};
    transform: translateY(-2px);
  }
`

export const Thumb = styled.div`
  width: 100%; height: 100px;
  background: #111;
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  @media (max-width: 480px) { height: 80px; }
`

export const ThumbImg = styled.img`
  width: 100%; height: 100%; object-fit: cover;
`

export const ColorBar = styled.div<{ $color: string }>`
  height: 3px; background: ${p => p.$color};
`

export const PieceName = styled.div`
  font-size: 11px; font-weight: 600;
  color: ${p => p.theme.colors.text};
  padding: 8px 10px 2px;
  line-height: 1.3;
  @media (max-width: 480px) { font-size: 10px; padding: 6px 8px 2px; }
`

export const PieceBrand = styled.div`
  font-size: 10px; color: ${p => p.theme.colors.textMuted};
  padding: 0 10px 8px;
  @media (max-width: 480px) { padding: 0 8px 6px; }
`
