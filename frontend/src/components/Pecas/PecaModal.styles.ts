import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.75);
  z-index: 300;
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
`

export const Dialog = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 16px;
  max-width: 560px; width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
`

export const ImgWrap = styled.div`
  width: 100%; height: 320px;
  background: #111;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
`

export const Img = styled.img`
  width: 100%; height: 100%; object-fit: contain;
`

export const ImgPlaceholder = styled.div`
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; color: ${p => p.theme.colors.textMuted};
`

export const Body = styled.div`
  padding: 24px;
`

export const Name = styled.h2`
  font-size: 20px; font-weight: 700;
  color: ${p => p.theme.colors.text};
`

export const Meta = styled.div`
  font-size: 13px; color: ${p => p.theme.colors.textMuted};
  margin-top: 4px; margin-bottom: 20px;
`

export const TipsTitle = styled.h3`
  font-size: 12px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  color: ${p => p.theme.colors.accent};
  margin-bottom: 12px;
`

export const TipItem = styled.li`
  font-size: 14px; color: ${p => p.theme.colors.text};
  line-height: 1.6; padding: 8px 0;
  border-bottom: 1px solid ${p => p.theme.colors.border};
  list-style: none;
  &:last-child { border-bottom: none; }
  &::before { content: '→ '; color: ${p => p.theme.colors.accent}; }
`

export const CloseBtn = styled.button`
  float: right;
  margin-top: -4px;
  font-size: 20px; color: ${p => p.theme.colors.textMuted};
  &:hover { color: ${p => p.theme.colors.text}; }
`

export const ColorDot = styled.span<{ $color: string }>`
  display: inline-block;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: ${p => p.$color};
  border: 1px solid rgba(255,255,255,0.2);
  margin-right: 6px;
  vertical-align: middle;
`

// ── Looks section ─────────────────────────────────────────────────────────────

export const LooksSectionTitle = styled.h3`
  font-size: 12px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  color: ${p => p.theme.colors.accent};
  margin-top: 28px; margin-bottom: 12px;
  display: flex; align-items: center; gap: 8px;
`

export const LooksCount = styled.span`
  font-size: 11px; font-weight: 500;
  text-transform: lowercase; letter-spacing: 0;
  color: ${p => p.theme.colors.textMuted};
  background: ${p => p.theme.colors.border};
  padding: 2px 8px; border-radius: 10px;
`

export const LookRow = styled.button`
  width: 100%;
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid ${p => p.theme.colors.border};
  background: ${p => p.theme.colors.bg};
  margin-bottom: 8px;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s, background 0.15s;

  &:hover {
    border-color: ${p => p.theme.colors.accent}88;
    background: ${p => p.theme.colors.surface};
  }
`

export const LookRowTitle = styled.span`
  flex: 1;
  font-size: 13px; font-weight: 600;
  color: ${p => p.theme.colors.text};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const LookTagRow = styled.div`
  display: flex; gap: 4px; flex-wrap: nowrap; flex-shrink: 0;
`

export const LookTag = styled.span`
  font-size: 10px; font-weight: 600;
  padding: 2px 6px; border-radius: 6px;
  white-space: nowrap;
  text-transform: lowercase;
`

export const FormalityDots = styled.div`
  display: flex; gap: 3px; flex-shrink: 0;
`

export const FormalityDot = styled.span<{ $filled: boolean }>`
  width: 6px; height: 6px;
  border-radius: 50%;
  background: ${p => p.$filled ? p.theme.colors.accent : p.theme.colors.border};
`

export const EmptyLooks = styled.p`
  font-size: 13px;
  color: ${p => p.theme.colors.textMuted};
  padding: 12px 0;
  text-align: center;
`

// ── Notes ─────────────────────────────────────────────────────────────────────

export const NotesSection = styled.div`
  margin-top: 24px;
  border-top: 1px solid ${p => p.theme.colors.border};
  padding-top: 18px;
`

export const NotesLabel = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 8px;
`

export const NotesTitle = styled.h3`
  font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  color: ${p => p.theme.colors.accent};
  margin: 0;
`

export const NotesStatus = styled.span<{ $status: 'idle' | 'saving' | 'saved' | 'error' }>`
  font-size: 10px;
  color: ${p =>
    p.$status === 'saved'  ? '#22c55e' :
    p.$status === 'error'  ? '#ef4444' :
    p.$status === 'saving' ? p.theme.colors.textMuted :
    'transparent'
  };
  transition: color 0.2s;
`

export const NotesTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px 12px;
  background: ${p => p.theme.colors.bg};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 8px;
  color: ${p => p.theme.colors.text};
  font-size: 13px;
  line-height: 1.6;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.15s;
  &:focus { border-color: ${p => p.theme.colors.accent}88; }
  &::placeholder { color: ${p => p.theme.colors.textMuted}; }
`
