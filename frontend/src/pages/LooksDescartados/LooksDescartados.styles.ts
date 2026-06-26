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
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`

export const Card = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 14px;
  padding: 18px;
  opacity: 0.7;
  transition: opacity 0.15s;
  &:hover { opacity: 1; }
`

export const CardTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
  margin-bottom: 8px;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`

export const FormalityRow = styled.div`
  display: flex; gap: 4px; margin-bottom: 10px;
`

export const Dot = styled.span<{ $filled: boolean }>`
  width: 8px; height: 8px; border-radius: 50%;
  background: ${p => p.$filled ? p.theme.colors.accent : p.theme.colors.border};
`

export const RestoreBtn = styled.button`
  font-size: 12px; font-weight: 600;
  color: ${p => p.theme.colors.accent};
  border: 1px solid ${p => p.theme.colors.accent};
  border-radius: 8px;
  padding: 5px 12px;
  margin-top: 8px;
  transition: all 0.15s;
  &:hover { background: ${p => p.theme.colors.accent}; color: #fff; }
`
