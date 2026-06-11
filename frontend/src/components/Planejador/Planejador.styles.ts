import styled from 'styled-components'
import { getTagColor } from '../../styles/tagColors'

export const Wrap = styled.div`
  max-width: 860px;
  margin: 0 auto;
`

export const Intro = styled.p`
  font-size: 14px; color: ${p => p.theme.colors.textMuted};
  line-height: 1.7; margin-bottom: 32px;
  @media (max-width: 480px) { font-size: 13px; margin-bottom: 20px; line-height: 1.6; }
`

export const FilterSection = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 28px;
  @media (max-width: 480px) {
    padding: 14px;
    margin-bottom: 18px;
    border-radius: 10px;
  }
`

export const FilterGroup = styled.div`
  margin-bottom: 20px;
  &:last-child { margin-bottom: 0; }
  @media (max-width: 480px) { margin-bottom: 14px; }
`

export const GroupLabel = styled.div`
  font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 10px;
  @media (max-width: 480px) { font-size: 10px; margin-bottom: 7px; }
`

export const ChipRow = styled.div`
  display: flex; gap: 8px; flex-wrap: wrap;
  @media (max-width: 480px) { gap: 6px; }
`

export const Chip = styled.button<{ $active: boolean; $tag?: string }>`
  padding: 7px 16px;
  border-radius: 24px;
  font-size: 13px; font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  ${p => p.$active && p.$tag ? `
    background: ${getTagColor(p.$tag).bg};
    color: ${getTagColor(p.$tag).text};
    border: 1.5px solid ${getTagColor(p.$tag).border};
  ` : `
    background: transparent;
    color: ${p.theme.colors.textMuted};
    border: 1.5px solid ${p.theme.colors.border};
    &:hover {
      border-color: ${p.theme.colors.accent};
      color: ${p.theme.colors.text};
    }
  `}
  @media (max-width: 480px) { padding: 6px 13px; font-size: 12px; }
`

export const ActionRow = styled.div`
  display: flex; gap: 12px; align-items: center;
  margin-bottom: 32px; flex-wrap: wrap;
  @media (max-width: 480px) { gap: 8px; margin-bottom: 20px; }
`

export const SuggestBtn = styled.button`
  padding: 12px 28px;
  background: ${p => p.theme.colors.accent};
  color: #000;
  font-size: 14px; font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.15s;
  &:hover { opacity: 0.85; }
  &:disabled { opacity: 0.4; cursor: default; }
  @media (max-width: 480px) { padding: 10px 20px; font-size: 13px; }
`

export const ShuffleBtn = styled.button`
  padding: 12px 20px;
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  color: ${p => p.theme.colors.text};
  font-size: 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.15s;
  &:hover { border-color: ${p => p.theme.colors.accent}; }
  @media (max-width: 480px) { padding: 10px 16px; font-size: 13px; }
`

export const MatchCount = styled.span`
  font-size: 13px; color: ${p => p.theme.colors.textMuted};
`

export const ResultsTitle = styled.h2`
  font-size: 13px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  color: ${p => p.theme.colors.accent};
  margin-bottom: 16px;
`

export const LookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`

export const LookCard = styled.button<{ $dimmed?: boolean }>`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.$dimmed ? '#ef444433' : p.theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  text-align: left;
  cursor: pointer;
  opacity: ${p => p.$dimmed ? 0.75 : 1};
  transition: border-color 0.15s, transform 0.1s, opacity 0.2s;
  &:hover {
    border-color: ${p => p.theme.colors.accent};
    transform: translateY(-2px);
  }
  @media (max-width: 480px) { padding: 14px; border-radius: 10px; }
`

export const LookNum = styled.div`
  font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  color: ${p => p.theme.colors.accent};
  margin-bottom: 6px;
`

export const LookTitle = styled.div`
  font-size: 15px; font-weight: 700;
  color: ${p => p.theme.colors.text};
  margin-bottom: 10px;
  line-height: 1.3;
  @media (max-width: 480px) { font-size: 13px; margin-bottom: 7px; }
`

export const TagRow = styled.div`
  display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 12px;
`

export const Tag = styled.span<{ $tag: string }>`
  font-size: 10px; padding: 2px 8px; border-radius: 20px;
  text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;
  background: ${p => getTagColor(p.$tag).bg};
  color: ${p => getTagColor(p.$tag).text};
  border: 1px solid ${p => getTagColor(p.$tag).border};
`

export const FormalityRow = styled.div`
  display: flex; gap: 4px; margin-top: 2px;
`

export const Dot = styled.div<{ $filled: boolean }>`
  width: 7px; height: 7px; border-radius: 50%;
  background: ${p => p.$filled ? p.theme.colors.accent : p.theme.colors.border};
`

export const NoMatch = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  color: ${p => p.theme.colors.textMuted};
  font-size: 14px;
  line-height: 1.7;
  @media (max-width: 480px) { padding: 28px 20px; font-size: 13px; }
`

// ── Smart rotation additions ──────────────────────────────────────────────────

export const CooldownRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 4px;
  border-top: 1px solid ${p => p.theme.colors.border};
  @media (max-width: 480px) { gap: 8px; }
`

export const CooldownLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: ${p => p.theme.colors.textMuted};
  white-space: nowrap;
  flex-shrink: 0;
`

export const CooldownChip = styled.button<{ $active: boolean }>`
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${p => p.$active ? p.theme.colors.accent + '22' : 'transparent'};
  color: ${p => p.$active ? p.theme.colors.accent : p.theme.colors.textMuted};
  border: 1px solid ${p => p.$active ? p.theme.colors.accent + '88' : p.theme.colors.border};
  &:hover { border-color: ${p => p.theme.colors.accent}66; color: ${p => p.theme.colors.accent}; }
`

export const FreshnessBar = styled.div`
  height: 3px;
  background: ${p => p.theme.colors.border};
  border-radius: 2px;
  margin: 12px 0 6px;
  overflow: hidden;
`

export const FreshnessFill = styled.div<{ $pct: number; $recent: boolean }>`
  height: 100%;
  width: ${p => p.$pct}%;
  border-radius: 2px;
  background: ${p => p.$recent
    ? '#ef4444'
    : p.$pct === 100
      ? p.theme.colors.accent
      : `hsl(${Math.round(p.$pct * 1.2)}, 65%, 50%)`};
  transition: width 0.4s ease;
`

export const LastWornBadge = styled.div<{ $recent: boolean }>`
  font-size: 11px;
  color: ${p => p.$recent ? '#ef4444' : p.theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: ${p => p.$recent ? 600 : 400};
`

export const WarnIcon = styled.span`
  font-size: 12px;
  color: #ef4444;
`
