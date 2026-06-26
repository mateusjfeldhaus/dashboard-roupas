import { useNavigate } from 'react-router-dom'
import { usePieces } from '../hooks/usePieces'
import { imgUrl } from '../utils/imgUrl'
import {
  Wrap, TopRow, BackBtn, PageTitle, Count,
  Empty, Grid, Card, Thumb, ThumbImg, CardBody,
  CardTitle, CardMeta, ColorBar, RestoreBtn,
} from './PecasDescartadas.styles'

export function PecasDescartadas() {
  const navigate = useNavigate()
  const { allPieces, toggleHidden } = usePieces()
  const hidden = allPieces.filter(p => p.hidden)

  return (
    <Wrap>
      <TopRow>
        <BackBtn onClick={() => navigate('/pecas')}>← Peças</BackBtn>
        <PageTitle>Peças Descartadas <Count>({hidden.length})</Count></PageTitle>
      </TopRow>

      {hidden.length === 0 ? (
        <Empty>Nenhuma peça descartada ainda.<br />Use o botão "Ocultar peça" em qualquer peça para enviá-la aqui.</Empty>
      ) : (
        <Grid>
          {hidden.map(piece => (
            <Card key={piece.id}>
              <Thumb>
                {piece.img
                  ? <ThumbImg src={imgUrl(piece.img)} alt={piece.name}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  : null
                }
              </Thumb>
              <ColorBar $color={piece.color} />
              <CardBody>
                <CardTitle onClick={() => navigate(`/pecas/${piece.id}`)}>
                  {piece.name}
                </CardTitle>
                <CardMeta>{piece.brand} · {piece.category}</CardMeta>
                <RestoreBtn onClick={() => toggleHidden(piece.id, false)}>
                  👁 Restaurar peça
                </RestoreBtn>
              </CardBody>
            </Card>
          ))}
        </Grid>
      )}
    </Wrap>
  )
}
