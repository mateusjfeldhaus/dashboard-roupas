import styled from 'styled-components'

export const Wrap = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

export const Header = styled.div`
  margin-bottom: 28px;
`

export const Title = styled.h1`
  font-size: 22px; font-weight: 800;
  color: ${p => p.theme.colors.text};
  margin-bottom: 6px;
`

export const Subtitle = styled.p`
  font-size: 13px;
  color: ${p => p.theme.colors.textMuted};
  line-height: 1.5;
`

// ── N Slider ──────────────────────────────────────────────────────────────────

export const SliderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 14px;
  padding: 18px 22px;
  margin-bottom: 28px;
`

export const SliderLabel = styled.label`
  font-size: 13px; font-weight: 700;
  color: ${p => p.theme.colors.text};
  white-space: nowrap;
  min-width: 130px;
`

export const NValue = styled.span`
  font-size: 22px; font-weight: 900;
  color: ${p => p.theme.colors.accent};
  min-width: 32px;
  text-align: center;
`

export const Slider = styled.input`
  flex: 1;
  accent-color: ${p => p.theme.colors.accent};
  height: 4px;
  cursor: pointer;
`

export const Coverage = styled.div`
  font-size: 13px; font-weight: 700;
  color: ${p => p.theme.colors.textMuted};
  white-space: nowrap;
  text-align: right;
  min-width: 110px;

  span {
    color: ${p => p.theme.colors.accent};
    font-size: 18px;
  }
`

// ── Steps list ────────────────────────────────────────────────────────────────

export const StepList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
`

export const StepCard = styled.li<{ $hasLooks: boolean }>`
  display: grid;
  grid-template-columns: 36px 64px 1fr;
  gap: 14px;
  align-items: start;
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.$hasLooks ? p.theme.colors.accent + '44' : p.theme.colors.border};
  border-radius: 14px;
  padding: 14px 16px;
  transition: border-color 0.15s;
`

export const StepNum = styled.div`
  width: 36px; height: 36px;
  border-radius: 50%;
  background: ${p => p.theme.colors.accent}22;
  color: ${p => p.theme.colors.accent};
  font-size: 13px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
`

export const PieceThumb = styled.div<{ $color: string }>`
  width: 64px; height: 80px;
  background: #111;
  border-radius: 8px;
  border: 1px solid ${p => p.$color}44;
  overflow: hidden;
  flex-shrink: 0;
`

export const PieceThumbImg = styled.img`
  width: 100%; height: 100%;
  object-fit: contain;
`

export const StepInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const PieceName = styled.div`
  font-size: 15px; font-weight: 700;
  color: ${p => p.theme.colors.text};
`

export const PieceMeta = styled.div`
  font-size: 12px;
  color: ${p => p.theme.colors.textMuted};
`

export const NewLooksLabel = styled.div<{ $count: number }>`
  font-size: 12px; font-weight: 700;
  color: ${p => p.$count > 0 ? p.theme.colors.accent : p.theme.colors.textMuted};
  margin-top: 2px;
`

export const LookChips = styled.div`
  display: flex; flex-wrap: wrap; gap: 6px;
  margin-top: 4px;
`

export const LookChip = styled.div`
  font-size: 11px; font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  background: ${p => p.theme.colors.bg};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 6px;
  padding: 3px 8px;
`

// ── Summary bar ───────────────────────────────────────────────────────────────

export const SummaryBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${p => p.theme.colors.accent}15;
  border: 1px solid ${p => p.theme.colors.accent}44;
  border-radius: 14px;
  padding: 16px 20px;
  margin-bottom: 24px;
`

export const SummaryIcon = styled.div`
  font-size: 24px;
`

export const SummaryText = styled.div`
  font-size: 14px;
  color: ${p => p.theme.colors.text};
  line-height: 1.5;

  strong { color: ${p => p.theme.colors.accent}; }
`
