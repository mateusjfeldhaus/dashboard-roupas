import { useNavigate } from 'react-router-dom'
import { useLooks } from '../hooks/useLooks'
import {
  Wrap, TopRow, BackBtn, PageTitle, Count,
  Empty, Grid, Card, CardTitle, FormalityRow, Dot, RestoreBtn,
} from './LooksDescartados.styles'

export function LooksDescartados() {
  const navigate = useNavigate()
  const { allLooks, toggleHidden } = useLooks()
  const hidden = allLooks.filter(l => l.hidden)

  return (
    <Wrap>
      <TopRow>
        <BackBtn onClick={() => navigate('/looks')}>← Looks</BackBtn>
        <PageTitle>Looks Descartados <Count>({hidden.length})</Count></PageTitle>
      </TopRow>

      {hidden.length === 0 ? (
        <Empty>Nenhum look descartado ainda.<br />Use o botão "Ocultar look" em qualquer look para enviá-lo aqui.</Empty>
      ) : (
        <Grid>
          {hidden.map(look => (
            <Card key={look.id}>
              <CardTitle onClick={() => navigate(`/looks/${look.id}`)}>
                {look.title}
              </CardTitle>
              <FormalityRow>
                {[1,2,3,4,5].map(i => <Dot key={i} $filled={i <= look.formality} />)}
              </FormalityRow>
              <RestoreBtn onClick={() => toggleHidden(look.id, false)}>
                👁 Restaurar look
              </RestoreBtn>
            </Card>
          ))}
        </Grid>
      )}
    </Wrap>
  )
}
