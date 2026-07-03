import styled from 'styled-components'

export const PageWrap = styled.div`
  max-width: 700px;
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

// ── Editar peças ───────────────────────────────────────────────────────────────

export const EditBtn = styled.button`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 20px; margin-left: 16px;
  padding: 6px 10px;
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 8px;
  transition: all 0.15s;
  &:hover { color: ${p => p.theme.colors.accent}; border-color: ${p => p.theme.colors.accent}; }
`

export const EditBar = styled.div`
  display: flex; gap: 8px; flex-wrap: wrap;
  padding: 12px 20px;
  background: ${p => p.theme.colors.surface};
  border-bottom: 1px solid ${p => p.theme.colors.border};
`

export const SaveBtn = styled.button`
  padding: 7px 16px; border-radius: 8px; font-size: 13px; font-weight: 700;
  background: ${p => p.theme.colors.accent}; color: #000;
  transition: opacity 0.15s;
  &:hover { opacity: 0.85; }
`

export const CancelBtn = styled.button`
  padding: 7px 16px; border-radius: 8px; font-size: 13px; font-weight: 600;
  border: 1px solid ${p => p.theme.colors.border};
  color: ${p => p.theme.colors.textMuted};
  &:hover { color: ${p => p.theme.colors.text}; }
`

export const RemoveBadge = styled.button`
  position: absolute; top: 4px; right: 4px;
  width: 20px; height: 20px; border-radius: 50%;
  background: #dc2626; color: #fff;
  font-size: 11px; font-weight: 700; line-height: 20px; text-align: center;
  opacity: 0;
  transition: opacity 0.15s;
`

export const EditSlot = styled.div`
  position: relative;
  cursor: pointer;
  &:hover ${RemoveBadge} { opacity: 1; }
`

export const AddSection = styled.div`
  padding: 16px 20px;
  border-top: 1px solid ${p => p.theme.colors.border};
`

export const AddLabel = styled.p`
  font-size: 12px; font-weight: 600; color: ${p => p.theme.colors.textMuted};
  text-transform: uppercase; letter-spacing: 0.06em;
  margin-bottom: 10px;
`

export const PieceGrid = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px;
`

export const PieceChip = styled.button<{ $active?: boolean }>`
  display: flex; align-items: center; gap: 6px;
  padding: 5px 10px; border-radius: 20px; font-size: 12px;
  border: 1px solid ${p => p.$active ? p.theme.colors.accent : p.theme.colors.border};
  color: ${p => p.$active ? p.theme.colors.accent : p.theme.colors.text};
  background: ${p => p.$active ? p.theme.colors.accent + '18' : 'transparent'};
  transition: all 0.15s;
  &:hover { border-color: ${p => p.theme.colors.accent}; color: ${p => p.theme.colors.accent}; }
`

// ── Dialog de confirmação ──────────────────────────────────────────────────────

export const DialogOverlay = styled.div`
  position: fixed; inset: 0; z-index: 200;
  background: rgba(0,0,0,0.7);
  display: flex; align-items: center; justify-content: center;
`

export const DialogBox = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 16px;
  padding: 28px 32px;
  max-width: 360px; width: 90%;
  text-align: center;
`

export const DialogTitle = styled.h3`
  font-size: 16px; font-weight: 700;
  color: ${p => p.theme.colors.text};
  margin-bottom: 8px;
`

export const DialogText = styled.p`
  font-size: 13px; color: ${p => p.theme.colors.textMuted};
  margin-bottom: 24px; line-height: 1.5;
`

export const DialogActions = styled.div`
  display: flex; gap: 10px; justify-content: center;
`
