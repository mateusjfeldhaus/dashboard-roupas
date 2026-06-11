import styled from 'styled-components'

const priorityColor = {
  'critica': '#ef4444',
  'moderada': '#f59e0b',
  'baixa': '#10b981',
}

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`

export const Card = styled.div<{ $priority: string }>`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-left: 4px solid ${p => priorityColor[p.$priority as keyof typeof priorityColor]};
  border-radius: 12px;
  padding: 20px;
`

export const Badge = styled.span<{ $priority: string }>`
  font-size: 10px; padding: 2px 10px; border-radius: 20px;
  background: ${p => priorityColor[p.$priority as keyof typeof priorityColor]}22;
  color: ${p => priorityColor[p.$priority as keyof typeof priorityColor]};
  border: 1px solid ${p => priorityColor[p.$priority as keyof typeof priorityColor]}44;
  text-transform: uppercase; letter-spacing: 0.5px;
  font-weight: 700;
`

export const ItemName = styled.div`
  font-size: 16px; font-weight: 700;
  color: ${p => p.theme.colors.text};
  margin: 10px 0 6px;
`

export const Why = styled.div`
  font-size: 13px; color: ${p => p.theme.colors.textMuted};
  line-height: 1.6;
`

export const SectionNote = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-left: 4px solid ${p => p.theme.colors.accent};
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 24px;
  font-size: 13px; color: ${p => p.theme.colors.textMuted};
  line-height: 1.6;
`

export const SectionTitle = styled.h3`
  font-size: 13px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  color: ${p => p.theme.colors.accent};
  margin-bottom: 16px;
`
