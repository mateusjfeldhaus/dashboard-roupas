import styled from 'styled-components'
import { getTagColor } from '../../styles/tagColors'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 36px;
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`

export const SeasonCard = styled.div<{ $color: string; $active: boolean }>`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.$active ? p.$color : p.theme.colors.border};
  border-top: 3px solid ${p => p.$color};
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s, transform 0.1s;
  box-shadow: ${p => p.$active ? `0 0 0 2px ${p.$color}44` : 'none'};
  &:hover {
    border-color: ${p => p.$color};
    transform: translateY(-2px);
  }
  @media (max-width: 480px) { padding: 16px; }
`

export const SeasonHeader = styled.div`
  display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
  @media (max-width: 480px) { margin-bottom: 8px; gap: 8px; }
`

export const SeasonEmoji = styled.span`
  font-size: 24px;
  @media (max-width: 480px) { font-size: 20px; }
`

export const SeasonName = styled.h3`
  font-size: 18px; font-weight: 700;
  color: ${p => p.theme.colors.text};
  flex: 1;
  @media (max-width: 480px) { font-size: 15px; }
`

export const LookCount = styled.span<{ $color: string }>`
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 20px;
  background: ${p => p.$color}22;
  color: ${p => p.$color};
  border: 1px solid ${p => p.$color}55;
  white-space: nowrap;
`

export const Strategy = styled.p`
  font-size: 13px; color: ${p => p.theme.colors.textMuted};
  line-height: 1.7; margin-bottom: 16px;
  @media (max-width: 480px) { font-size: 12px; line-height: 1.5; margin-bottom: 10px; }
`

export const TipsList = styled.ul`
  list-style: none;
`

export const TipItem = styled.li`
  font-size: 13px; color: ${p => p.theme.colors.text};
  padding: 6px 0;
  border-bottom: 1px solid ${p => p.theme.colors.border};
  line-height: 1.5;
  &:last-child { border-bottom: none; }
  &::before { content: '→ '; color: ${p => p.theme.colors.accent}; }
  @media (max-width: 480px) { font-size: 12px; padding: 5px 0; }
`

export const SectionTitle = styled.h2<{ $color?: string }>`
  font-size: 16px; font-weight: 700;
  color: ${p => p.$color ?? p.theme.colors.accent};
  text-transform: uppercase; letter-spacing: 1px;
  margin-bottom: 20px;
  @media (max-width: 480px) { font-size: 13px; margin-bottom: 12px; }
`

export const LookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`

export const LookCard = styled.button`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 10px;
  padding: 14px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s, transform 0.1s;
  &:hover {
    border-color: ${p => p.theme.colors.accent};
    transform: translateY(-2px);
  }
  @media (max-width: 480px) { padding: 10px; }
`

export const LookTitle = styled.div`
  font-size: 13px; font-weight: 600;
  color: ${p => p.theme.colors.text};
  @media (max-width: 480px) { font-size: 12px; }
`

export const LookTags = styled.div`
  display: flex; gap: 4px; flex-wrap: wrap; margin-top: 6px;
`

export const Tag = styled.span<{ $tag: string }>`
  font-size: 10px; padding: 2px 8px; border-radius: 20px;
  text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;
  background: ${p => getTagColor(p.$tag).bg};
  color: ${p => getTagColor(p.$tag).text};
  border: 1px solid ${p => getTagColor(p.$tag).border};
  @media (max-width: 480px) { font-size: 9px; padding: 2px 6px; }
`

export const SeasonLookLabel = styled.div`
  font-size: 11px; color: ${p => p.theme.colors.accent};
  font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
  margin-bottom: 10px; margin-top: 16px;
`

export const SeasonLookItem = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  font-size: 12px;
  padding: 5px 0;
  color: ${p => p.theme.colors.text};
  cursor: pointer;
  border-bottom: 1px solid ${p => p.theme.colors.border};
  transition: color 0.15s, padding-left 0.15s;
  &:last-child { border-bottom: none; }
  &::before { content: '→ '; color: ${p => p.theme.colors.accent}; }
  &:hover {
    color: ${p => p.theme.colors.accent};
    padding-left: 4px;
  }
`

export const EmptyNote = styled.div`
  color: ${p => p.theme.colors.textMuted};
  font-size: 13px;
`
