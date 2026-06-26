import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export const primaryTabs = [
  { path: '/',          label: 'Visão Geral', icon: '📊' },
  { path: '/pecas',     label: 'Peças',       icon: '👔' },
  { path: '/looks',     label: 'Looks',       icon: '✨' },
  { path: '/montar',    label: 'Completar',   icon: '🧩' },
  { path: '/viagem',    label: 'Viagem',      icon: '✈️' },
]

export const afterDropdown = [
  { path: '/wishlist', label: 'Wishlist', icon: '🛍️' },
]

export const analyticalTabs = [
  { path: '/stats',      label: 'Estatísticas', icon: '📈' },
  { path: '/porpeca',    label: 'Por Peça',     icon: '🔍' },
  { path: '/busca',      label: 'Busca',        icon: '🔎' },
  { path: '/planejador', label: 'Planejador',   icon: '📅' },
  { path: '/calendario', label: 'Calendário',   icon: '🗓' },
  { path: '/ranking',    label: 'Ranking',      icon: '★'  },
  { path: '/lacunas',    label: 'Lacunas',      icon: '⚠️' },
  { path: '/estacoes',   label: 'Estações',     icon: '🌿' },
  { path: '/capsula',    label: 'Cápsula',      icon: '🧳' },
]

export const drawerPrimary = [...primaryTabs, ...afterDropdown]
const analyticalPaths = new Set(analyticalTabs.map(t => t.path))

export function useNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  const [drawerOpen,   setDrawerOpen]   = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuPos,      setMenuPos]      = useState({ top: 0, left: 0 })
  const btnRef      = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const activeBase   = '/' + pathname.split('/')[1]
  const inAnalytical = analyticalPaths.has(activeBase)

  function isActive(path: string) {
    return path === '/' ? activeBase === '/' : activeBase === path
  }

  function go(path: string) { navigate(path) }

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

  useEffect(() => {
    setDrawerOpen(false)
    setDropdownOpen(false)
  }, [pathname])

  return {
    drawerOpen, setDrawerOpen,
    dropdownOpen, toggleDropdown,
    menuPos, btnRef, dropdownRef,
    inAnalytical, isActive, go,
  }
}
