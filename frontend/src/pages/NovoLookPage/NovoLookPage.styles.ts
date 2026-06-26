import styled from 'styled-components'
import { getTagColor } from '../../styles/tagColors'

// ── Layout ────────────────────────────────────────────────────────────────────

export const PageWrap = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

export const BackBtn = styled.button`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 20px; padding: 6px 0;
  transition: color 0.15s;
  &:hover { color: ${p => p.theme.colors.text}; }
`

export const PageTitle = styled.h1`
  font-size: 22px; font-weight: 800;
  color: ${p => p.theme.colors.text};
  margin-bottom: 24px;
`

export const Section = styled.section`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 16px;
`

export const SectionLabel = styled.h2`
  font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  color: ${p => p.theme.colors.accent};
  margin-bottom: 14px;
`

// ── Flat-lay preview ──────────────────────────────────────────────────────────

export const FlatLayRow = styled.div`
  display: flex; gap: 10px; flex-wrap: wrap;
  min-height: 56px; align-items: center;
`

export const FlatLayThumb = styled.div<{ $color: string }>`
  position: relative;
  width: 52px; height: 68px;
  background: #111; border-radius: 8px;
  border: 2px solid ${p => p.$color}55;
  overflow: hidden; cursor: pointer; flex-shrink: 0;
  transition: transform 0.15s, border-color 0.15s;
  &:hover { transform: translateY(-2px); border-color: #ef444488; }
`

export const FlatLayImg = styled.img`
  width: 100%; height: 100%; object-fit: contain;
`

export const FlatLayRemove = styled.div`
  position: absolute; top: 2px; right: 2px;
  width: 16px; height: 16px; border-radius: 50%;
  background: rgba(239,68,68,0.85); color: #fff;
  font-size: 10px; font-weight: 800; line-height: 16px; text-align: center;
  opacity: 0; transition: opacity 0.15s;
  ${FlatLayThumb}:hover & { opacity: 1; }
`

export const FlatLayCat = styled.div`
  font-size: 9px; color: ${p => p.theme.colors.textMuted};
  text-align: center; margin-top: 4px;
  text-transform: uppercase; letter-spacing: 0.3px;
  width: 52px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
`

export const EmptyFlatLay = styled.p`
  font-size: 13px; color: ${p => p.theme.colors.textMuted}; font-style: italic;
`

// ── Category tabs ─────────────────────────────────────────────────────────────

export const CatRow = styled.div`
  display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px;
`

export const CatChip = styled.button<{ $active: boolean }>`
  padding: 5px 12px; border-radius: 20px;
  font-size: 12px; font-weight: 600;
  border: 1px solid ${p => p.$active ? p.theme.colors.accent : p.theme.colors.border};
  background: ${p => p.$active ? p.theme.colors.accent + '20' : 'transparent'};
  color: ${p => p.$active ? p.theme.colors.accent : p.theme.colors.textMuted};
  cursor: pointer; transition: all 0.15s;
  &:hover { border-color: ${p => p.theme.colors.accent}88; color: ${p => p.theme.colors.accent}; }
`

// ── Piece grid ────────────────────────────────────────────────────────────────

export const PieceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 8px; max-height: 340px; overflow-y: auto; padding-right: 4px;
`

export const PieceCard = styled.button<{ $selected: boolean }>`
  display: flex; flex-direction: column; align-items: center;
  padding: 8px 6px; border-radius: 10px;
  border: 2px solid ${p => p.$selected ? p.theme.colors.accent : p.theme.colors.border};
  background: ${p => p.$selected ? p.theme.colors.accent + '10' : p.theme.colors.bg};
  cursor: pointer; text-align: center; transition: all 0.15s; position: relative;
  &:hover { border-color: ${p => p.theme.colors.accent}88; }
`

export const PieceThumbWrap = styled.div<{ $color: string }>`
  width: 60px; height: 72px; background: #111; border-radius: 6px;
  overflow: hidden; border: 1px solid ${p => p.$color}44;
  display: flex; align-items: center; justify-content: center; margin-bottom: 6px;
`

export const PieceThumbImg = styled.img`
  width: 100%; height: 100%; object-fit: contain;
`

export const PieceName = styled.span`
  font-size: 10px; font-weight: 600; color: ${p => p.theme.colors.text};
  line-height: 1.3; overflow: hidden; text-overflow: ellipsis;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
`

export const SelectedBadge = styled.div`
  position: absolute; top: 4px; right: 4px;
  width: 18px; height: 18px; border-radius: 50%;
  background: ${p => p.theme.colors.accent};
  color: #000; font-size: 11px; font-weight: 800; line-height: 18px; text-align: center;
`

// ── Form ──────────────────────────────────────────────────────────────────────

export const Field = styled.div`
  margin-bottom: 16px;
`

export const Label = styled.label`
  display: block; font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  color: ${p => p.theme.colors.accent}; margin-bottom: 8px;
`

export const Input = styled.input`
  width: 100%; padding: 10px 14px;
  background: ${p => p.theme.colors.bg};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 8px; color: ${p => p.theme.colors.text};
  font-size: 14px; font-family: inherit; outline: none; box-sizing: border-box;
  transition: border-color 0.15s;
  &:focus { border-color: ${p => p.theme.colors.accent}88; }
  &::placeholder { color: ${p => p.theme.colors.textMuted}; }
`

export const Textarea = styled.textarea`
  width: 100%; padding: 10px 14px; min-height: 80px;
  background: ${p => p.theme.colors.bg};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 8px; color: ${p => p.theme.colors.text};
  font-size: 13px; line-height: 1.6; font-family: inherit;
  resize: vertical; outline: none; box-sizing: border-box;
  transition: border-color 0.15s;
  &:focus { border-color: ${p => p.theme.colors.accent}88; }
  &::placeholder { color: ${p => p.theme.colors.textMuted}; }
`

export const TagGrid = styled.div`
  display: flex; gap: 6px; flex-wrap: wrap;
`

export const TagChip = styled.button<{ $active: boolean; $tag: string }>`
  padding: 5px 12px; border-radius: 20px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.3px;
  cursor: pointer; transition: all 0.15s;
  border: 1px solid ${p => p.$active ? getTagColor(p.$tag).border : p.theme.colors.border};
  background: ${p => p.$active ? getTagColor(p.$tag).bg : 'transparent'};
  color: ${p => p.$active ? getTagColor(p.$tag).text : p.theme.colors.textMuted};
  &:hover { border-color: ${p => getTagColor(p.$tag).border}; color: ${p => getTagColor(p.$tag).text}; }
`

export const FormalityRow = styled.div`
  display: flex; gap: 8px; align-items: center;
`

export const FormalDot = styled.button<{ $filled: boolean }>`
  width: 28px; height: 28px; border-radius: 50%;
  border: 2px solid ${p => p.$filled ? p.theme.colors.accent : p.theme.colors.border};
  background: ${p => p.$filled ? p.theme.colors.accent : 'transparent'};
  cursor: pointer; transition: all 0.15s;
  &:hover { border-color: ${p => p.theme.colors.accent}; }
`

export const FormalLabel = styled.span`
  font-size: 11px; color: ${p => p.theme.colors.textMuted}; margin-left: 8px;
`

export const ActionRow = styled.div`
  display: flex; gap: 10px; align-items: center; margin-top: 8px;
`

export const SaveBtn = styled.button<{ $loading?: boolean }>`
  flex: 1; padding: 14px;
  background: ${p => p.theme.colors.accent};
  color: #000; font-weight: 800; font-size: 15px;
  border-radius: 10px; cursor: ${p => p.$loading ? 'wait' : 'pointer'};
  opacity: ${p => p.$loading ? 0.7 : 1};
  transition: opacity 0.15s, transform 0.1s;
  &:hover:not(:disabled) { transform: translateY(-1px); }
`

export const ErrorMsg = styled.p`
  font-size: 13px; color: #ef4444; margin-top: 8px;
`
