import styled from 'styled-components'

export const NavBar = styled.nav`
  background: ${p => p.theme.colors.surface};
  border-bottom: 1px solid ${p => p.theme.colors.border};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
`

export const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) { padding: 0 16px; }
`

export const Brand = styled.button`
  font-size: 13px;
  font-weight: 800;
  color: ${p => p.theme.colors.accent};
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 18px 0;
  margin-right: 36px;
  white-space: nowrap;
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  &:hover { opacity: 0.8; }
  @media (max-width: 768px) { margin-right: 0; flex: 1; padding: 15px 0; }
`

/* Desktop tab list — hidden on tablet/mobile */
export const TabList = styled.div`
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  flex: 1;
  &::-webkit-scrollbar { display: none; }
  @media (max-width: 768px) { display: none; }
`

export const TabBtn = styled.button<{ $active: boolean }>`
  padding: 18px 16px;
  font-size: 13px;
  font-weight: 500;
  color: ${p => p.$active ? p.theme.colors.accent : p.theme.colors.textMuted};
  border-bottom: 2px solid ${p => p.$active ? p.theme.colors.accent : 'transparent'};
  white-space: nowrap;
  transition: color 0.2s, border-color 0.2s;
  &:hover { color: ${p => p.theme.colors.text}; }
`

/* ── Burger button (tablet/mobile only) ─────────────────────────────── */
export const BurgerBtn = styled.button<{ $open: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    padding: 0;
    border-radius: 8px;
    transition: background 0.15s;
    &:hover { background: ${p => p.theme.colors.border}; }
  }
`

export const BurgerLine = styled.span<{ $open: boolean; $pos: 'top' | 'mid' | 'bot' }>`
  display: block;
  width: 22px;
  height: 2px;
  background: ${p => p.theme.colors.text};
  border-radius: 2px;
  transition: transform 0.25s, opacity 0.2s;

  ${p => p.$open && p.$pos === 'top' && `
    transform: translateY(7px) rotate(45deg);
  `}
  ${p => p.$open && p.$pos === 'mid' && `
    opacity: 0;
    transform: scaleX(0);
  `}
  ${p => p.$open && p.$pos === 'bot' && `
    transform: translateY(-7px) rotate(-45deg);
  `}
`

/* ── Drawer overlay ─────────────────────────────────────────────────── */
export const DrawerOverlay = styled.div<{ $open: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.6);
    opacity: ${p => p.$open ? 1 : 0};
    pointer-events: ${p => p.$open ? 'all' : 'none'};
    transition: opacity 0.25s;
  }
`

export const Drawer = styled.div<{ $open: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: var(--nav-h);
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: ${p => p.theme.colors.surface};
    border-top: 1px solid ${p => p.theme.colors.border};
    transform: ${p => p.$open ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
    padding: 8px 0 32px;
  }
`

export const DrawerItem = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: ${p => p.$active ? 700 : 400};
  color: ${p => p.$active ? p.theme.colors.accent : p.theme.colors.text};
  text-align: left;
  border-left: 3px solid ${p => p.$active ? p.theme.colors.accent : 'transparent'};
  background: ${p => p.$active ? p.theme.colors.accent + '0f' : 'transparent'};
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  &:hover {
    background: ${p => p.theme.colors.accent}0f;
    color: ${p => p.theme.colors.accent};
    border-left-color: ${p => p.theme.colors.accent}88;
  }
`

export const DrawerDivider = styled.div`
  height: 1px;
  background: ${p => p.theme.colors.border};
  margin: 8px 24px;
`

/* ── Dropdown "Analisar" ─────────────────────────────────────────────── */
export const DropdownWrap = styled.div`
  position: relative;
  flex-shrink: 0;
  @media (max-width: 768px) { display: none; }
`

export const DropdownBtn = styled.button<{ $active: boolean }>`
  padding: 18px 16px;
  font-size: 13px;
  font-weight: 500;
  color: ${p => p.$active ? p.theme.colors.accent : p.theme.colors.textMuted};
  border-bottom: 2px solid ${p => p.$active ? p.theme.colors.accent : 'transparent'};
  white-space: nowrap;
  transition: color 0.2s, border-color 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover { color: ${p => p.theme.colors.text}; }
`

export const DropdownArrow = styled.span<{ $open: boolean }>`
  font-size: 10px;
  transition: transform 0.2s;
  transform: ${p => p.$open ? 'rotate(180deg)' : 'rotate(0deg)'};
  display: inline-block;
`

export const DropdownMenu = styled.div<{ $open: boolean; $top: number; $left: number }>`
  position: fixed;
  top: ${p => p.$top}px;
  left: ${p => p.$left}px;
  min-width: 180px;
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.45);
  z-index: 200;
  overflow: hidden;
  opacity: ${p => p.$open ? 1 : 0};
  pointer-events: ${p => p.$open ? 'all' : 'none'};
  transform: ${p => p.$open ? 'translateY(0)' : 'translateY(-6px)'};
  transition: opacity 0.18s, transform 0.18s;
`

export const DropdownItem = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 11px 16px;
  font-size: 13px;
  font-weight: ${p => p.$active ? 600 : 400};
  color: ${p => p.$active ? p.theme.colors.accent : p.theme.colors.text};
  background: ${p => p.$active ? p.theme.colors.accent + '18' : 'transparent'};
  text-align: left;
  transition: background 0.12s, color 0.12s;
  &:hover {
    background: ${p => p.theme.colors.accent}14;
    color: ${p => p.theme.colors.accent};
  }
`
