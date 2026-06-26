import styled from 'styled-components'

export const Wrap = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
`

export const BackBtn = styled.button`
  font-size: 13px; font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  padding: 6px 0;
  transition: color 0.15s;
  &:hover { color: ${p => p.theme.colors.text}; }
`

export const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
`

export const Count = styled.span`
  font-size: 13px;
  color: ${p => p.theme.colors.textMuted};
  margin-left: 4px;
`

export const Empty = styled.div`
  text-align: center;
  padding: 80px 24px;
  color: ${p => p.theme.colors.textMuted};
  font-size: 15px;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
`

export const Card = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 14px;
  overflow: hidden;
  opacity: 0.65;
  transition: opacity 0.15s;
  &:hover { opacity: 1; }
`

export const Thumb = styled.div`
  width: 100%;
  aspect-ratio: 3/4;
  background: ${p => p.theme.colors.border}33;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

export const ThumbImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const CardBody = styled.div`
  padding: 12px 14px 14px;
`

export const CardTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
  margin-bottom: 2px;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`

export const CardMeta = styled.div`
  font-size: 11px;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 10px;
`

export const ColorBar = styled.div<{ $color: string }>`
  width: 100%;
  height: 3px;
  background: ${p => p.$color || p.theme.colors.border};
  margin-bottom: 10px;
`

export const RestoreBtn = styled.button`
  font-size: 12px; font-weight: 600;
  color: ${p => p.theme.colors.accent};
  border: 1px solid ${p => p.theme.colors.accent};
  border-radius: 8px;
  padding: 5px 12px;
  width: 100%;
  transition: all 0.15s;
  &:hover { background: ${p => p.theme.colors.accent}; color: #fff; }
`
