import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 20px;
  }
`

export const Card = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 12px;
  padding: 24px;
  @media (max-width: 480px) { padding: 16px; border-radius: 10px; }
`

export const StatValue = styled.div`
  font-size: 36px;
  font-weight: 800;
  color: ${p => p.theme.colors.accent};
  line-height: 1;
  @media (max-width: 480px) { font-size: 28px; }
`

export const StatLabel = styled.div`
  font-size: 12px;
  color: ${p => p.theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 8px;
  @media (max-width: 480px) { font-size: 10px; }
`

export const Section = styled.div`
  margin-bottom: 32px;
  @media (max-width: 480px) { margin-bottom: 20px; }
`

export const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: ${p => p.theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
  @media (max-width: 480px) { font-size: 13px; margin-bottom: 12px; }
`

export const CatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`

export const CatCard = styled.button<{ $selected: boolean }>`
  background: ${p => p.$selected ? p.theme.colors.accent + '18' : p.theme.colors.surface};
  border: 1px solid ${p => p.$selected ? p.theme.colors.accent : p.theme.colors.border};
  border-radius: 10px;
  padding: 16px 20px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, transform 0.1s;
  &:hover {
    border-color: ${p => p.theme.colors.accent};
    transform: translateY(-1px);
  }
  @media (max-width: 480px) { padding: 12px 14px; border-radius: 8px; }
`

export const CatName = styled.div`
  font-size: 13px;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 8px;
  @media (max-width: 480px) { font-size: 11px; margin-bottom: 6px; }
`

export const CatCount = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
  @media (max-width: 480px) { font-size: 18px; }
`

export const BarTrack = styled.div`
  height: 4px;
  background: ${p => p.theme.colors.border};
  border-radius: 2px;
  margin-top: 10px;
`

export const BarFill = styled.div<{ $pct: number }>`
  height: 4px;
  width: ${p => p.$pct}%;
  background: ${p => p.theme.colors.accent};
  border-radius: 2px;
`

// ── Expanded piece panel ────────────────────────────────────────────────────

export const PiecePanel = styled.div`
  margin-top: 20px;
  animation: fadeIn 0.15s ease;
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
`

export const PanelTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${p => p.theme.colors.accent};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
`

export const PanelClose = styled.button`
  font-size: 11px;
  color: ${p => p.theme.colors.textMuted};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 20px;
  padding: 2px 10px;
  cursor: pointer;
  &:hover { color: ${p => p.theme.colors.text}; }
`

export const PieceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
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
  cursor: pointer;
  transition: border-color 0.15s, transform 0.1s;
  &:hover {
    border-color: ${p => p.theme.colors.accent};
    transform: translateY(-2px);
  }
`

export const PieceThumb = styled.div<{ $color: string }>`
  width: 100%;
  aspect-ratio: 3/4;
  background: #111;
  border-bottom: 1px solid ${p => p.$color}44;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

export const PieceThumbImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

export const PieceInfo = styled.div`
  padding: 8px 10px;
`

export const PieceName = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: ${p => p.theme.colors.text};
  line-height: 1.3;
  margin-bottom: 2px;
`

export const PieceBrand = styled.div`
  font-size: 10px;
  color: ${p => p.theme.colors.textMuted};
`
