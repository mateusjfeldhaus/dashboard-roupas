import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Nav height CSS variable ─────────────────────────────────────────────── */
  :root {
    --nav-h: 57px;
  }
  @media (max-width: 480px) {
    :root { --nav-h: 45px; }
  }

  body {
    background: ${theme.colors.bg};
    color: ${theme.colors.text};
    font-family: ${theme.fonts.sans};
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    /* Prevent horizontal scroll on mobile */
    overflow-x: hidden;
  }

  img { display: block; max-width: 100%; }

  button { cursor: pointer; font-family: inherit; border: none; background: none; }

  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: ${theme.colors.surface}; }
  ::-webkit-scrollbar-thumb { background: ${theme.colors.border}; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: ${theme.colors.borderHover}; }
`
