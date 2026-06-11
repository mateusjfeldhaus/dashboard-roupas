export const theme = {
  colors: {
    bg: '#0f0f0f',
    surface: '#1a1a1a',
    surface2: '#222222',
    surface3: '#2a2a2a',
    border: '#2e2e2e',
    borderHover: '#404040',
    accent: '#c8a96e',
    accentDim: '#8b6914',
    accentBg: 'rgba(200,169,110,0.08)',
    text: '#e8e8e8',
    textMuted: '#999',
    textFaint: '#666',
    red: '#e05252',
    redBg: 'rgba(224,82,82,0.1)',
    green: '#52c97a',
    greenBg: 'rgba(82,201,122,0.1)',
    yellow: '#e0b84a',
    yellowBg: 'rgba(224,184,74,0.1)',
    blue: '#5b9bd5',
    overlay: 'rgba(0,0,0,0.85)',
  },
  fonts: {
    sans: "'Inter', system-ui, sans-serif",
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
    full: '9999px',
  },
  shadows: {
    modal: '0 25px 60px rgba(0,0,0,0.6)',
    card: '0 2px 8px rgba(0,0,0,0.3)',
  },
}

export type Theme = typeof theme
