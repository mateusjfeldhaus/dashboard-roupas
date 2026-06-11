import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/GlobalStyles'
import { theme } from './styles/theme'
import App from './App'
import { PinGate } from './components/PinGate/PinGate'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PinGate>
        <App />
      </PinGate>
    </ThemeProvider>
  </React.StrictMode>
)
