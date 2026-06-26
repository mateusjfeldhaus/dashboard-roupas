import styled from 'styled-components'

export const PageWrap = styled.div`
  max-width: 560px;
  margin: 0 auto;
`

export const BackBtn = styled.button`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 20px;
  padding: 6px 0;
  transition: color 0.15s;
  &:hover { color: ${p => p.theme.colors.text}; }
`

export const HideBtn = styled.button`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 20px; margin-left: 16px;
  padding: 6px 10px;
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 8px;
  transition: all 0.15s;
  &:hover { color: ${p => p.theme.colors.text}; border-color: currentColor; }
`

export const Card = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 16px;
  overflow: hidden;
`

export const NotFound = styled.div`
  text-align: center;
  padding: 60px 24px;
  color: ${p => p.theme.colors.textMuted};
  font-size: 15px;
`
