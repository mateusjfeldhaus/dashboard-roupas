import { useState } from 'react'
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

export type Tab =
  | 'overview' | 'pecas' | 'looks' | 'lacunas' | 'estacoes'
  | 'porpeca'  | 'busca' | 'planejador' | 'ranking' | 'calendario'
  | 'montar'   | 'viagem' | 'wishlist' | 'stats'

const Main = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px;
  padding-top: calc(var(--nav-h) + 32px);
  @media (max-width: 768px)  { padding: 20px 16px; padding-top: calc(var(--nav-h) + 20px); }
  @media (max-width: 480px)  { padding: 16px 12px; padding-top: calc(var(--nav-h) + 16px); }
`

export default function App() {
  const [tab, setTab] = useState<Tab>('overview')

  return (
    <>
      <Nav activeTab={tab} onTabChange={setTab} />
      <Main>
        {tab === 'overview'    && <Overview />}
        {tab === 'pecas'       && <Pecas />}
        {tab === 'looks'       && <Looks />}
        {tab === 'lacunas'     && <Lacunas />}
        {tab === 'estacoes'    && <Estacoes />}
        {tab === 'porpeca'     && <PorPeca />}
        {tab === 'busca'       && <Busca />}
        {tab === 'planejador'  && <Planejador />}
        {tab === 'ranking'     && <Ranking />}
        {tab === 'calendario'  && <Calendario />}
        {tab === 'montar'      && <Montar />}
        {tab === 'viagem'      && <Viagem />}
        {tab === 'wishlist'    && <Wishlist />}
        {tab === 'stats'       && <Stats />}
      </Main>
    </>
  )
}
