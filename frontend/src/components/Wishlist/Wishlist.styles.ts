import styled from 'styled-components'

// ── Page header ───────────────────────────────────────────────────────────────

export const Header = styled.div`
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  margin-bottom: 20px;
  @media (max-width: 768px) { row-gap: 10px; }
`

export const Title = styled.h1`
  font-size: 20px; font-weight: 800;
  color: ${p => p.theme.colors.text};
`

export const CountBadge = styled.span`
  font-size: 12px; font-weight: 700;
  padding: 3px 10px; border-radius: 20px;
  background: ${p => p.theme.colors.border};
  color: ${p => p.theme.colors.textMuted};
`

export const AddBtn = styled.button`
  margin-left: auto;
  padding: 8px 18px; border-radius: 10px;
  background: ${p => p.theme.colors.accent};
  color: #0f0f0f;
  font-size: 13px; font-weight: 700;
  cursor: pointer; transition: opacity 0.15s;
  &:hover { opacity: 0.85; }
  @media (max-width: 768px) {
    width: 100%; margin-left: 0;
    padding: 13px; font-size: 14px; border-radius: 12px;
  }
`

// ── Stats bar ─────────────────────────────────────────────────────────────────

export const StatsBar = styled.div`
  display: flex; gap: 10px;
  flex-wrap: nowrap; overflow-x: auto;
  width: 100%; margin-bottom: 20px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; &::-webkit-scrollbar { display: none; }
  padding-bottom: 4px;
`

export const StatCard = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 12px; padding: 12px 16px;
  flex-shrink: 0; min-width: 110px;
`

export const StatNum = styled.div`
  font-size: 20px; font-weight: 800; color: ${p => p.theme.colors.text};
`

export const StatLbl = styled.div`
  font-size: 10px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.8px;
  color: ${p => p.theme.colors.textMuted}; margin-top: 2px;
`

// ── Filters ───────────────────────────────────────────────────────────────────

export const FiltersRow = styled.div`
  display: flex; gap: 8px; align-items: center;
  flex-wrap: nowrap; overflow-x: auto;
  width: 100%; margin-bottom: 16px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; &::-webkit-scrollbar { display: none; }
  padding-bottom: 4px;
`

export const FilterChip = styled.button<{ $active: boolean; $color?: string }>`
  flex-shrink: 0;
  font-size: 12px; font-weight: 600;
  padding: 8px 14px; border-radius: 20px;
  white-space: nowrap; cursor: pointer; transition: all 0.15s;
  border: 1px solid ${p => p.$active ? (p.$color ?? p.theme.colors.accent) : p.theme.colors.border};
  background: ${p => p.$active ? (p.$color ?? p.theme.colors.accent) + '22' : 'transparent'};
  color: ${p => p.$active ? (p.$color ?? p.theme.colors.accent) : p.theme.colors.textMuted};
  &:hover { border-color: ${p => p.$color ?? p.theme.colors.accent}88; }
`

export const FilterDivider = styled.div`
  width: 1px; height: 20px;
  background: ${p => p.theme.colors.border}; margin: 0 4px; flex-shrink: 0;
  @media (max-width: 768px) { display: none; }
`

export const ShowPurchasedBtn = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  font-size: 12px; font-weight: 600;
  padding: 8px 14px; border-radius: 20px;
  white-space: nowrap; cursor: pointer; transition: all 0.15s;
  border: 1px solid ${p => p.$active ? p.theme.colors.accent : p.theme.colors.border};
  background: ${p => p.$active ? p.theme.colors.accent + '22' : 'transparent'};
  color: ${p => p.$active ? p.theme.colors.accent : p.theme.colors.textMuted};
`

// ── Item list ─────────────────────────────────────────────────────────────────

export const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
  @media (max-width: 768px) { grid-template-columns: 1fr; gap: 10px; }
`

export const ItemCard = styled.div<{ $purchased: boolean }>`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 12px; padding: 14px;
  opacity: ${p => p.$purchased ? 0.55 : 1};
  transition: opacity 0.2s;
  display: flex; flex-direction: column; gap: 8px;
`

export const ItemTop = styled.div`
  display: flex; align-items: flex-start; gap: 10px;
`

export const PriorityDot = styled.span<{ $priority: 1 | 2 | 3 }>`
  width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 5px;
  background: ${p => p.$priority === 1 ? '#ef4444' : p.$priority === 2 ? '#f59e0b' : '#22c55e'};
  box-shadow: 0 0 6px ${p => p.$priority === 1 ? '#ef444466' : p.$priority === 2 ? '#f59e0b66' : '#22c55e66'};
  @media (max-width: 768px) { width: 12px; height: 12px; margin-top: 4px; }
`

export const ItemMeta = styled.div`
  flex: 1; min-width: 0;
`

export const ItemName = styled.div<{ $purchased: boolean }>`
  font-size: 14px; font-weight: 700;
  color: ${p => p.theme.colors.text};
  text-decoration: ${p => p.$purchased ? 'line-through' : 'none'};
  margin-bottom: 2px;
  @media (max-width: 768px) { font-size: 15px; }
`

export const ItemSub = styled.div`
  font-size: 11px; color: ${p => p.theme.colors.textMuted};
  display: flex; gap: 6px; flex-wrap: wrap; align-items: center;
`

export const ItemCatChip = styled.span`
  background: ${p => p.theme.colors.border};
  padding: 1px 7px; border-radius: 10px; font-weight: 600;
`

export const ItemPrice = styled.div<{ $purchased: boolean }>`
  font-size: 16px; font-weight: 800; flex-shrink: 0;
  color: ${p => p.$purchased ? p.theme.colors.textMuted : p.theme.colors.accent};
  @media (max-width: 768px) { font-size: 17px; }
`

export const ItemNotes = styled.div`
  font-size: 12px; color: ${p => p.theme.colors.textMuted};
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden;
  a { color: ${p => p.theme.colors.accent}; text-decoration: underline; word-break: break-all; }
  @media (max-width: 768px) { font-size: 13px; }
`

export const ItemActions = styled.div`
  display: flex; gap: 6px; align-items: center; margin-top: 4px;
  @media (max-width: 768px) { gap: 8px; }
`

export const ActionBtn = styled.button<{ $variant?: 'check' | 'edit' | 'delete' | 'uncheck' }>`
  flex: 1; padding: 6px 8px; border-radius: 8px;
  font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.15s;
  border: 1px solid ${p =>
    p.$variant === 'check'   ? '#22c55e66' :
    p.$variant === 'uncheck' ? p.theme.colors.border :
    p.$variant === 'delete'  ? '#ef444466' : p.theme.colors.border};
  background: ${p =>
    p.$variant === 'check'   ? '#22c55e18' :
    p.$variant === 'uncheck' ? 'transparent' :
    p.$variant === 'delete'  ? '#ef444418' : 'transparent'};
  color: ${p =>
    p.$variant === 'check'   ? '#4ade80' :
    p.$variant === 'uncheck' ? p.theme.colors.textMuted :
    p.$variant === 'delete'  ? '#f87171' : p.theme.colors.textMuted};
  &:hover { opacity: 0.85; }
  @media (max-width: 768px) {
    padding: 10px 8px; font-size: 12px;
    border-radius: 10px; min-height: 44px;
  }
`

export const EmptyState = styled.div`
  text-align: center; padding: 60px 24px;
  color: ${p => p.theme.colors.textMuted};
  font-size: 14px; line-height: 1.7;
`

export const EmptyIcon = styled.div`
  font-size: 48px; margin-bottom: 12px;
`

// ── Form modal ────────────────────────────────────────────────────────────────

export const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.75);
  z-index: 200;
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
  @media (max-width: 600px) { align-items: flex-end; padding: 0; }
`

export const Dialog = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 16px;
  max-width: 768px; width: 100%;
  max-height: 90vh; overflow-y: auto;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  @media (max-width: 600px) {
    border-radius: 20px 20px 0 0;
    max-height: 92vh;
    padding: 20px 20px 32px;
  }
`

export const DialogTitle = styled.h2`
  font-size: 18px; font-weight: 800;
  color: ${p => p.theme.colors.text}; margin-bottom: 20px;
`

export const FormGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
  @media (max-width: 768px) { grid-template-columns: 1fr; gap: 12px; }
`

export const FormField = styled.div<{ $full?: boolean }>`
  ${p => p.$full ? 'grid-column: 1 / -1;' : ''}
`

export const FormLabel = styled.label`
  display: block;
  font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.8px;
  color: ${p => p.theme.colors.textMuted}; margin-bottom: 6px;
`

export const FormInput = styled.input`
  width: 100%;
  background: ${p => p.theme.colors.bg};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 8px; padding: 8px 12px;
  font-size: 14px; color: ${p => p.theme.colors.text};
  &:focus { outline: none; border-color: ${p => p.theme.colors.accent}; }
  @media (max-width: 768px) { padding: 12px; font-size: 16px; border-radius: 10px; }
`

export const FormSelect = styled.select`
  width: 100%;
  background: ${p => p.theme.colors.bg};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 8px; padding: 8px 12px;
  font-size: 14px; color: ${p => p.theme.colors.text}; cursor: pointer;
  &:focus { outline: none; border-color: ${p => p.theme.colors.accent}; }
  @media (max-width: 768px) { padding: 12px; font-size: 16px; border-radius: 10px; }
`

export const FormTextarea = styled.textarea`
  width: 100%; resize: vertical; min-height: 64px;
  background: ${p => p.theme.colors.bg};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 8px; padding: 8px 12px;
  font-size: 14px; color: ${p => p.theme.colors.text}; font-family: inherit;
  &:focus { outline: none; border-color: ${p => p.theme.colors.accent}; }
  @media (max-width: 768px) { padding: 12px; font-size: 16px; border-radius: 10px; }
`

export const PriorityRow = styled.div`
  display: flex; gap: 8px;
`

export const PriorityChip = styled.button<{ $active: boolean; $color: string }>`
  flex: 1; padding: 7px 8px; border-radius: 8px;
  font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.15s;
  border: 1px solid ${p => p.$active ? p.$color : p.theme.colors.border};
  background: ${p => p.$active ? p.$color + '22' : 'transparent'};
  color: ${p => p.$active ? p.$color : p.theme.colors.textMuted};
  @media (max-width: 768px) { padding: 11px 8px; font-size: 13px; min-height: 44px; }
`

export const DialogActions = styled.div`
  display: flex; gap: 8px; margin-top: 20px;
`

export const CancelBtn = styled.button`
  flex: 1; padding: 10px; border-radius: 10px;
  border: 1px solid ${p => p.theme.colors.border};
  color: ${p => p.theme.colors.textMuted};
  font-size: 13px; font-weight: 600; cursor: pointer;
  &:hover { border-color: ${p => p.theme.colors.accent}88; }
  @media (max-width: 768px) { padding: 14px; font-size: 14px; min-height: 48px; }
`

export const SaveBtn = styled.button`
  flex: 2; padding: 10px; border-radius: 10px;
  background: ${p => p.theme.colors.accent}; color: #0f0f0f;
  font-size: 13px; font-weight: 700; cursor: pointer; transition: opacity 0.15s;
  &:hover { opacity: 0.85; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
  @media (max-width: 768px) { padding: 14px; font-size: 14px; min-height: 48px; }
`
