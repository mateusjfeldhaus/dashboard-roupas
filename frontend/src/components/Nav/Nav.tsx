import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  NavBar, Inner, Brand, TabList, TabBtn,
  BurgerBtn, BurgerLine,
  DrawerOverlay, Drawer, DrawerItem, DrawerDivider,
  DropdownWrap, DropdownBtn, DropdownArrow, DropdownMenu, DropdownItem,
} from './Nav.styles'

const primaryTabs = [
  { path: '/',          label: 'Visão Geral', icon: '📊' },
  { path: '/pecas',     label: 'Peças',       icon: '👔' },
  { path: '/looks',     label: 'Looks',       icon: '✨' },
  { path: '/montar',    label: 'Completar',   icon: '🧩' },
  { path: '/viagem',    label: 'Viagem',      icon: '✈️' },
]

const afterDropdown = [
  { path: '/wishlist',  label: 'Wishlist',    icon: '🛍️' },
]

const analyticalTabs = [
  { path: '/stats',      label: 'Estatísticas', icon: '📈' },
  { path: '/porpeca',    label: 'Por Peça',     icon: '🔍' },
  { path: '/busca',      label: 'Busca',        icon: '🔎' },
  { path: '/planejador', label: 'Planejador',   icon: '📅' },
  { path: '/calendario', label: 'Calendário',   icon: '🗓' },
  { path: '/ranking',    label: 'Ranking',      icon: '★'  },
  { path: '/lacunas',    label: 'Lacunas',      icon: '⚠️' },
  { path: '/estacoes',   label: 'Estações',     icon: '🌿' },
]

const drawerPrimary = [...primaryTabs, ...afterDropdown]
const analyticalPaths = new Set(analyticalTabs.map(t => t.path))

export function Nav() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  const [drawerOpen,   setDrawerOpen]   = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuPos,      setMenuPos]      = useState({ top: 0, left: 0 })
  const btnRef      = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // "/pecas/some-id" → "/pecas"
  const activeBase   = '/' + pathname.split('/')[1]
  const inAnalytical = analyticalPaths.has(activeBase)

  function isActive(path: string) {
    return path === '/' ? activeBase === '/' : activeBase === path
  }

  function toggleDropdown() {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setMenuPos({ top: rect.bottom + 2, left: rect.left })
    }
    setDropdownOpen(o => !o)
  }

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

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

  // Fecha drawer/dropdown ao navegar
  useEffect(() => {
    setDrawerOpen(false)
    setDropdownOpen(false)
  }, [pathname])

  function go(path: string) {
    navigate(path)
  }

  return (
    <>
      <NavBar>
        <Inner>
          <Brand onClick={() => go('/')}>Guarda-Roupa</Brand>

          <TabList>
            {primaryTabs.map(t => (
              <TabBtn key={t.path} $active={isActive(t.path)} onClick={() => go(t.path)}>
                {t.label}
              </TabBtn>
            ))}

            <DropdownWrap ref={dropdownRef}>
              <DropdownBtn ref={btnRef} $active={inAnalytical} onClick={toggleDropdown}>
                Analisar
                <DropdownArrow $open={dropdownOpen}>▾</DropdownArrow>
              </DropdownBtn>

              <DropdownMenu $open={dropdownOpen} $top={menuPos.top} $left={menuPos.left}>
                {analyticalTabs.map(t => (
                  <DropdownItem key={t.path} $active={isActive(t.path)} onClick={() => go(t.path)}>
                    <span style={{ width: 20, textAlign: 'center' }}>{t.icon}</span>
                    {t.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </DropdownWrap>

            {afterDropdown.map(t => (
              <TabBtn key={t.path} $active={isActive(t.path)} onClick={() => go(t.path)}>
                {t.label}
              </TabBtn>
            ))}
          </TabList>

          <BurgerBtn $open={drawerOpen} onClick={() => setDrawerOpen(o => !o)} aria-label="Menu">
            <BurgerLine $open={drawerOpen} $pos="top" />
            <BurgerLine $open={drawerOpen} $pos="mid" />
            <BurgerLine $open={drawerOpen} $pos="bot" />
          </BurgerBtn>
        </Inner>
      </NavBar>

      <DrawerOverlay $open={drawerOpen} onClick={() => setDrawerOpen(false)} />

      <Drawer $open={drawerOpen}>
        {drawerPrimary.map(t => (
          <DrawerItem key={t.path} $active={isActive(t.path)} onClick={() => go(t.path)}>
            <span style={{ fontSize: 20, width: 28, textAlign: 'center', flexShrink: 0 }}>{t.icon}</span>
            {t.label}
          </DrawerItem>
        ))}

        <DrawerDivider />

        {analyticalTabs.map(t => (
          <DrawerItem key={t.path} $active={isActive(t.path)} onClick={() => go(t.path)}>
            <span style={{ fontSize: 20, width: 28, textAlign: 'center', flexShrink: 0 }}>{t.icon}</span>
            {t.label}
          </DrawerItem>
        ))}
      </Drawer>
    </>
  )
}
