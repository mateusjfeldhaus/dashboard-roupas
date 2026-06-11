import styled from 'styled-components'
import { getTagColor } from '../../styles/tagColors'

export const Wrap = styled.div``

export const SectionLabel = styled.div`
  font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  color: ${p => p.theme.colors.textMuted};
  margin: 28px 0 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid ${p => p.theme.colors.border};
  &:first-child { margin-top: 0; }
  @media (max-width: 480px) { margin: 20px 0 8px; }
`

export const RankList = styled.div`
  display: flex; flex-direction: column; gap: 10px;
  @media (max-width: 480px) { gap: 8px; }
`

export const RankCard = styled.button`
  display: flex; align-items: center; gap: 16px;
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 12px;
  padding: 14px 18px;
  text-align: left; cursor: pointer;
  transition: border-color 0.15s, transform 0.1s;
  &:hover {
    border-color: ${p => p.theme.colors.accent};
    transform: translateX(3px);
  }
  @media (max-width: 480px) {
    padding: 11px 13px;
    gap: 10px;
    border-radius: 10px;
    flex-wrap: wrap;
  }
`

export const Position = styled.div<{ $top: boolean }>`
  font-size: 18px; font-weight: 800;
  min-width: 36px; text-align: center;
  color: ${p => p.$top ? '#f59e0b' : p.theme.colors.textMuted};
  flex-shrink: 0;
  @media (max-width: 480px) { font-size: 16px; min-width: 28px; }
`

export const LookInfo = styled.div`
  flex: 1; min-width: 0;
`

export const LookTitle = styled.div`
  font-size: 14px; font-weight: 700;
  color: ${p => p.theme.colors.text};
  margin-bottom: 5px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  @media (max-width: 480px) { font-size: 13px; white-space: normal; }
`

export const TagRow = styled.div`
  display: flex; gap: 4px; flex-wrap: wrap;
`

export const Tag = styled.span<{ $tag: string }>`
  font-size: 9px; padding: 2px 7px; border-radius: 20px;
  text-transform: uppercase; letter-spacing: 0.4px; font-weight: 600;
  background: ${p => getTagColor(p.$tag).bg};
  color: ${p => getTagColor(p.$tag).text};
  border: 1px solid ${p => getTagColor(p.$tag).border};
`

export const MetaCol = styled.div`
  display: flex; flex-direction: column; align-items: flex-end;
  gap: 5px; flex-shrink: 0;
  @media (max-width: 480px) {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    width: 100%;
    justify-content: flex-end;
  }
`

export const Stars = styled.div`
  font-size: 16px; letter-spacing: 1px; color: #f59e0b;
  white-space: nowrap;
  @media (max-width: 480px) { font-size: 14px; }
`

export const UsagePill = styled.div`
  font-size: 11px; font-weight: 600;
  padding: 2px 9px; border-radius: 20px;
  background: ${p => p.theme.colors.accent}18;
  color: ${p => p.theme.colors.accent};
  border: 1px solid ${p => p.theme.colors.accent}33;
  white-space: nowrap;
`

export const LastUsed = styled.div`
  font-size: 10px; color: ${p => p.theme.colors.textMuted};
`

export const EmptyNote = styled.div`
  font-size: 13px; color: ${p => p.theme.colors.textMuted};
  text-align: center; padding: 40px 0;
  line-height: 1.8;
  @media (max-width: 480px) { padding: 28px 0; }
`
