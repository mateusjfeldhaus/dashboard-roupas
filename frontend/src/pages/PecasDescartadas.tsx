import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { usePieces } from '../hooks/usePieces'
import { imgUrl } from '../utils/imgUrl'

const Wrap = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
`

const BackBtn = styled.button`
  font-size: 13px; font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  padding: 6px 0;
  transition: color 0.15s;
  &:hover { color: ${p => p.theme.colors.text}; }
`

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
`

const Count = styled.span`
  font-size: 13px;
  color: ${p => p.theme.colors.textMuted};
  margin-left: 4px;
`

const Empty = styled.div`
  text-align: center;
  padding: 80px 24px;
  color: ${p => p.theme.colors.textMuted};
  font-size: 15px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
`

const Card = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 14px;
  overflow: hidden;
  opacity: 0.65;
  transition: opacity 0.15s;
  &:hover { opacity: 1; }
`

const Thumb = styled.div`
  width: 100%;
  aspect-ratio: 3/4;
  background: ${p => p.theme.colors.border}33;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const ThumbImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const CardBody = styled.div`
  padding: 12px 14px 14px;
`

const CardTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
  margin-bottom: 2px;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`

const CardMeta = styled.div`
  font-size: 11px;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 10px;
`

const ColorBar = styled.div<{ $color: string }>`
  width: 100%;
  height: 3px;
  background: ${p => p.$color || p.theme.colors.border};
  margin-bottom: 10px;
`

const RestoreBtn = styled.button`
  font-size: 12px; font-weight: 600;
  color: ${p => p.theme.colors.accent};
  border: 1px solid ${p => p.theme.colors.accent};
  border-radius: 8px;
  padding: 5px 12px;
  width: 100%;
  transition: all 0.15s;
  &:hover { background: ${p => p.theme.colors.accent}; color: #fff; }
`

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
