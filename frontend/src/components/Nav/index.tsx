import {
  NavBar, Inner, Brand, TabList, TabBtn,
  BurgerBtn, BurgerLine,
  DrawerOverlay, Drawer, DrawerItem, DrawerDivider,
  DropdownWrap, DropdownBtn, DropdownArrow, DropdownMenu, DropdownItem,
} from './Nav.styles'
import {
  useNav,
  primaryTabs, afterDropdown, analyticalTabs, drawerPrimary,
} from './useNav'

export function Nav() {
  const {
    drawerOpen, setDrawerOpen,
    dropdownOpen, toggleDropdown,
    menuPos, btnRef, dropdownRef,
    inAnalytical, isActive, go,
  } = useNav()

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
