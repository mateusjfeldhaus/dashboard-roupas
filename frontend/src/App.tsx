import { Routes, Route, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import { Nav } from './components/Nav/Nav'
import { Overview } from './components/Overview/Overview'
import { Pecas } from './components/Pecas/Pecas'
import { Looks } from './components/Looks/Looks'
import { Lacunas } from './components/Lacunas/Lacunas'
import { Estacoes } from './components/Estacoes/Estacoes'
import { PorPeca } from './components/PorPeca/PorPeca'
import { Busca } from './components/Busca/Busca'
import { Planejador } from './components/Planejador/Planejador'
import { Ranking } from './components/Ranking/Ranking'
import { Calendario } from './components/Calendario/Calendario'
import { Montar } from './components/Montar/Montar'
import { Viagem } from './components/Viagem/Viagem'
import { Wishlist } from './components/Wishlist/Wishlist'
import { Stats } from './components/Stats/Stats'
import { Capsula } from './components/Capsula/Capsula'
import { PecaPage } from './pages/PecaPage'
import { LookPage } from './pages/LookPage'
import { NovoLookPage } from './pages/NovoLookPage'
import { LooksDescartados } from './pages/LooksDescartados'
import { PecasDescartadas } from './pages/PecasDescartadas'

const Main = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px;
  padding-top: calc(var(--nav-h) + 32px);
  @media (max-width: 768px)  { padding: 20px 16px; padding-top: calc(var(--nav-h) + 20px); }
  @media (max-width: 480px)  { padding: 16px 12px; padding-top: calc(var(--nav-h) + 16px); }
`

export default function App() {
  return (
    <>
      <Nav />
      <Main>
        <Routes>
          <Route path="/"                  element={<Overview />} />
          <Route path="/pecas"             element={<Pecas />} />
          <Route path="/pecas/descartadas" element={<PecasDescartadas />} />
          <Route path="/pecas/:id"         element={<PecaPage />} />
          <Route path="/looks"             element={<Looks />} />
          <Route path="/looks/novo"        element={<NovoLookPage />} />
          <Route path="/looks/descartados" element={<LooksDescartados />} />
          <Route path="/looks/:id"         element={<LookPage />} />
          <Route path="/lacunas"           element={<Lacunas />} />
          <Route path="/estacoes"          element={<Estacoes />} />
          <Route path="/porpeca"           element={<PorPeca />} />
          <Route path="/busca"             element={<Busca />} />
          <Route path="/planejador"        element={<Planejador />} />
          <Route path="/ranking"           element={<Ranking />} />
          <Route path="/calendario"        element={<Calendario />} />
          <Route path="/montar"            element={<Montar />} />
          <Route path="/viagem"            element={<Viagem />} />
          <Route path="/wishlist"          element={<Wishlist />} />
          <Route path="/stats"             element={<Stats />} />
          <Route path="/capsula"           element={<Capsula />} />
          <Route path="*"                  element={<Navigate to="/" replace />} />
        </Routes>
      </Main>
    </>
  )
}
