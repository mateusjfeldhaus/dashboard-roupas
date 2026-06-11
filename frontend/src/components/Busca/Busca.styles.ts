import styled from 'styled-components'
import { getTagColor } from '../../styles/tagColors'

export const Wrap = styled.div`
  max-width: 860px;
  margin: 0 auto;
`

export const SearchBar = styled.div`
  position: relative;
  margin-bottom: 32px;
  @media (max-width: 480px) { margin-bottom: 20px; }
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 16px 48px 16px 20px;
  background: ${p => p.theme.colors.surface};
  border: 2px solid ${p => p.theme.colors.border};
  border-radius: 12px;
  color: ${p => p.theme.colors.text};
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
  &::placeholder { color: ${p => p.theme.colors.textMuted}; }
  &:focus { border-color: ${p => p.theme.colors.accent}; }
  /* Prevent iOS zoom on focus */
  @media (max-width: 480px) { font-size: 16px; padding: 14px 44px 14px 16px; }
`

export const SearchIcon = styled.span`
  position: absolute;
  right: 16px; top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: ${p => p.theme.colors.textMuted};
  pointer-events: none;
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 0;
  color: ${p => p.theme.colors.textMuted};
  font-size: 15px;
  @media (max-width: 480px) { padding: 40px 0; font-size: 13px; }
`

export const Hint = styled.div`
  text-align: center;
  padding: 80px 0 40px;
  color: ${p => p.theme.colors.textMuted};
  font-size: 14px;
  line-height: 1.8;
  @media (max-width: 480px) { padding: 40px 0 20px; font-size: 13px; }
`

export const ResultSection = styled.div`
  margin-bottom: 36px;
  @media (max-width: 480px) { margin-bottom: 24px; }
`

export const SectionHeader = styled.div`
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 16px;
`

export const SectionTitle = styled.h2`
  font-size: 13px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  color: ${p => p.theme.colors.accent};
`

export const Count = styled.span`
  font-size: 12px; color: ${p => p.theme.colors.textMuted};
`

export const PieceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
`

export const PieceCard = styled.button`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 10px;
  padding: 0;
  overflow: hidden;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s, transform 0.1s;
  &:hover {
    border-color: ${p => p.theme.colors.accent};
    transform: translateY(-2px);
  }
`

export const PieceThumb = styled.div<{ $color: string }>`
  width: 100%; aspect-ratio: 3/4;
  background: #111;
  border-bottom: 2px solid ${p => p.$color}44;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
`

export const PieceThumbImg = styled.img`
  width: 100%; height: 100%; object-fit: contain;
`

export const PieceInfo = styled.div`
  padding: 10px 12px;
  @media (max-width: 480px) { padding: 7px 8px; }
`

export const PieceName = styled.div`
  font-size: 12px; font-weight: 600;
  color: ${p => p.theme.colors.text};
  @media (max-width: 480px) { font-size: 11px; }
`

export const PieceBrand = styled.div`
  font-size: 11px; color: ${p => p.theme.colors.textMuted};
  margin-top: 2px;
  @media (max-width: 480px) { font-size: 10px; }
`

export const PieceCat = styled.div`
  font-size: 10px; color: ${p => p.theme.colors.accent};
  margin-top: 3px; text-transform: uppercase; letter-spacing: 0.4px;
`

export const LookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`

export const LookCard = styled.button`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 10px;
  padding: 16px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s, transform 0.1s;
  &:hover {
    border-color: ${p => p.theme.colors.accent};
    transform: translateY(-2px);
  }
  @media (max-width: 480px) { padding: 12px; }
`

export const LookTitle = styled.div`
  font-size: 13px; font-weight: 600;
  color: ${p => p.theme.colors.text};
  margin-bottom: 8px;
`

export const TagRow = styled.div`
  display: flex; gap: 4px; flex-wrap: wrap;
`

export const Tag = styled.span<{ $tag: string }>`
  font-size: 10px; padding: 2px 8px; border-radius: 20px;
  text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;
  background: ${p => getTagColor(p.$tag).bg};
  color: ${p => getTagColor(p.$tag).text};
  border: 1px solid ${p => getTagColor(p.$tag).border};
`
