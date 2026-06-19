import React, { Component, ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/GlobalStyles'
import { theme } from './styles/theme'
import App from './App'
import { PinGate } from './components/PinGate/PinGate'

// ── Error Boundary ────────────────────────────────────────────────────────────

interface EBState { hasError: boolean; message: string }

class ErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  state: EBState = { hasError: false, message: '' }

  static getDerivedStateFromError(err: unknown): EBState {
    return {
      hasError: true,
      message: err instanceof Error ? err.message : String(err),
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div style={{
        minHeight: '100dvh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#0f0f0f', color: '#f5f0e8', padding: 32, gap: 16,
        fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{ fontSize: 32 }}>⚠️</div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Algo deu errado</div>
        <div style={{ fontSize: 13, color: '#8a8070', maxWidth: 400, textAlign: 'center' }}>
          {this.state.message}
        </div>
        <button
          onClick={() => this.setState({ hasError: false, message: '' })}
          style={{
            marginTop: 8, padding: '10px 24px', background: '#c8a96e', color: '#0f0f0f',
            border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 14,
          }}
        >
          Tentar novamente
        </button>
      </div>
    )
  }
}

// ── Render ────────────────────────────────────────────────────────────────────

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ErrorBoundary>
        <PinGate>
          <App />
        </PinGate>
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>
)
