import { useState, useEffect, useRef } from 'react'
import type { Tab } from '../../App'
import {
  NavBar, Inner, Brand, TabList, TabBtn,
  BurgerBtn, BurgerLine,
  DrawerOverlay, Drawer, DrawerItem, DrawerDivider,
  DropdownWrap, DropdownBtn, DropdownArrow, DropdownMenu, DropdownItem,
} from './Nav.styles'

const primaryTabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'overview',  label: 'Visão Geral', icon: '📊' },
  { id: 'pecas',     label: 'Peças',       icon: '👔' },
  { id: 'looks',     label: 'Looks',       icon: '✨' },
  { id: 'montar',    label: 'Completar',   icon: '🧩' },
  { id: 'viagem',    label: 'Viagem',      icon: '✈️' },
]

const afterDropdown: { id: Tab; label: string; icon: string }[] = [
  { id: 'wishlist',  label: 'Wishlist',    icon: '🛍️' },
]

const analyticalTabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'stats',      label: 'Estatísticas', icon: '📈' },
  { id: 'porpeca',    label: 'Por Peça',     icon: '🔍' },
  { id: 'busca',      label: 'Busca',        icon: '🔎' },
  { id: 'planejador', label: 'Planejador',   icon: '📅' },
  { id: 'calendario', label: 'Calendário',   icon: '🗓' },
  { id: 'ranking',    label: 'Ranking',      icon: '★'  },
  { id: 'lacunas',    label: 'Lacunas',      icon: '⚠️' },
  { id: 'estacoes',   label: 'Estações',     icon: '🌿' },
]

const drawerPrimary = [...primaryTabs, ...afterDropdown]

interface Props {
  activeTab: Tab
  onTabChange: (t: Tab) => void
}

export function Nav({ activeTab, onTabChange }: Props) {
  const [drawerOpen,   setDrawerOpen]   = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuPos,      setMenuPos]      = useState({ top: 0, left: 0 })
  const btnRef      = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const inAnalytical = analyticalTabs.some(t => t.id === activeTab)

  function toggleDropdown() {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setMenuPos({ top: rect.bottom + 2, left: rect.left })
    }
    setDropdownOpen(o => !o)
  }

  // close dropdown on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  // close drawer on desktop resize
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)')
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setDrawerOpen(false) }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  function selectTab(t: Tab) {
    onTabChange(t)
    setDrawerOpen(false)
    setDropdownOpen(false)
  }

  return (
    <>
      <NavBar>
        <Inner>
          <Brand onClick={() => onTabChange('overview')}>Guarda-Roupa</Brand>

          {/* ── Desktop tab list (all tabs flow together) ─────────────── */}
          <TabList>
            {primaryTabs.map(t => (
              <TabBtn key={t.id} $active={activeTab === t.id} onClick={() => selectTab(t.id)}>
                {t.label}
              </TabBtn>
            ))}

            {/* Analisar — position:fixed menu escapa o overflow:auto */}
            <DropdownWrap ref={dropdownRef}>
              <DropdownBtn ref={btnRef} $active={inAnalytical} onClick={toggleDropdown}>
                Analisar
                <DropdownArrow $open={dropdownOpen}>▾</DropdownArrow>
              </DropdownBtn>

              <DropdownMenu $open={dropdownOpen} $top={menuPos.top} $left={menuPos.left}>
                {analyticalTabs.map(t => (
                  <DropdownItem
                    key={t.id}
                    $active={activeTab === t.id}
                    onClick={() => selectTab(t.id)}
                  >
                    <span style={{ width: 20, textAlign: 'center' }}>{t.icon}</span>
                    {t.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </DropdownWrap>

            {afterDropdown.map(t => (
              <TabBtn key={t.id} $active={activeTab === t.id} onClick={() => selectTab(t.id)}>
                {t.label}
              </TabBtn>
            ))}
          </TabList>

          {/* ── Burger (mobile only) ─────────────────────────────────── */}
          <BurgerBtn $open={drawerOpen} onClick={() => setDrawerOpen(o => !o)} aria-label="Menu">
            <BurgerLine $open={drawerOpen} $pos="top" />
            <BurgerLine $open={drawerOpen} $pos="mid" />
            <BurgerLine $open={drawerOpen} $pos="bot" />
          </BurgerBtn>
        </Inner>
      </NavBar>

      {/* ── Mobile drawer ────────────────────────────────────────────── */}
      <DrawerOverlay $open={drawerOpen} onClick={() => setDrawerOpen(false)} />

      <Drawer $open={drawerOpen}>
        {drawerPrimary.map(t => (
          <DrawerItem key={t.id} $active={activeTab === t.id} onClick={() => selectTab(t.id)}>
            <span style={{ fontSize: 20, width: 28, textAlign: 'center', flexShrink: 0 }}>{t.icon}</span>
            {t.label}
          </DrawerItem>
        ))}

        <DrawerDivider />

        {analyticalTabs.map(t => (
          <DrawerItem key={t.id} $active={activeTab === t.id} onClick={() => selectTab(t.id)}>
            <span style={{ fontSize: 20, width: 28, textAlign: 'center', flexShrink: 0 }}>{t.icon}</span>
            {t.label}
          </DrawerItem>
        ))}
      </Drawer>
    </>
  )
}
