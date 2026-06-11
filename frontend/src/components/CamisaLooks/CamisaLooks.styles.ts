import styled from 'styled-components'

export const ShirtSection = styled.div`
  margin-bottom: 40px;
  @media (max-width: 480px) { margin-bottom: 28px; }
`

export const ShirtHeader = styled.div`
  display: flex; align-items: center; gap: 16px; margin-bottom: 20px;
  @media (max-width: 480px) { gap: 12px; margin-bottom: 14px; }
`

export const ShirtThumb = styled.div`
  width: 60px; height: 70px;
  background: #111;
  border-radius: 8px; overflow: hidden;
  flex-shrink: 0;
  border: 1px solid ${p => p.theme.colors.border};
  @media (max-width: 480px) { width: 48px; height: 56px; }
`

export const ShirtThumbImg = styled.img`
  width: 100%; height: 100%; object-fit: cover;
`

export const ShirtName = styled.h2`
  font-size: 18px; font-weight: 700;
  color: ${p => p.theme.colors.text};
  @media (max-width: 480px) { font-size: 15px; }
`

export const ShirtBrand = styled.div`
  font-size: 12px; color: ${p => p.theme.colors.textMuted};
`

export const LooksRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  @media (max-width: 700px) { grid-template-columns: repeat(2, 1fr); gap: 8px; }
  @media (max-width: 400px) { grid-template-columns: 1fr; }
`

export const LookCard = styled.button`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 10px;
  padding: 16px;
  text-align: left; cursor: pointer;
  transition: border-color 0.2s, transform 0.1s;
  &:hover { border-color: ${p => p.theme.colors.accent}; transform: translateY(-2px); }
  @media (max-width: 480px) { padding: 12px; }
`

export const LookType = styled.div<{ $type: 'gravata' | 'nogravata' | 'casual' }>`
  font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  padding: 3px 10px; border-radius: 20px; display: inline-block;
  margin-bottom: 10px;
  background: ${p => p.$type === 'gravata' ? '#7c3aed33' : p.$type === 'nogravata' ? '#0369a133' : '#15803d33'};
  color: ${p => p.$type === 'gravata' ? '#a78bfa' : p.$type === 'nogravata' ? '#38bdf8' : '#4ade80'};
  border: 1px solid ${p => p.$type === 'gravata' ? '#7c3aed55' : p.$type === 'nogravata' ? '#0369a155' : '#15803d55'};
`

export const PieceRow = styled.div`
  display: flex; flex-direction: column; gap: 4px;
`

export const PieceItem = styled.div`
  display: flex; align-items: center; gap: 8px;
`

export const PieceDot = styled.div<{ $color: string }>`
  width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
  background: ${p => p.$color};
  border: 1px solid rgba(255,255,255,0.2);
`

export const PieceText = styled.div`
  font-size: 11px; color: ${p => p.theme.colors.textMuted};
`

export const ClickHint = styled.div`
  font-size: 10px; color: ${p => p.theme.colors.accent};
  margin-top: 10px; opacity: 0.7;
`

export const Divider = styled.hr`
  border: none; border-top: 1px solid ${p => p.theme.colors.border};
  margin: 28px 0;
  @media (max-width: 480px) { margin: 18px 0; }
`
