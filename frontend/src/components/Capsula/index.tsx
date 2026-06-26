import { useNavigate } from 'react-router-dom'
import { useCapsula } from './useCapsula'
import { imgUrl } from '../../utils/imgUrl'
import {
  Wrap, Header, Title, Subtitle,
  SliderRow, SliderLabel, NValue, Slider, Coverage,
  SummaryBar, SummaryIcon, SummaryText,
  StepList, StepCard, StepNum, PieceThumb, PieceThumbImg,
  StepInfo, PieceName, PieceMeta, NewLooksLabel, LookChips, LookChip,
} from './Capsula.styles'

export function Capsula() {
  const navigate = useNavigate()
  const { n, setN, result, maxN } = useCapsula()
  const { steps, totalCovered, totalLooks } = result

  const pct = totalLooks > 0
    ? Math.round((totalCovered / totalLooks) * 100)
    : 0

  return (
    <Wrap>
      <Header>
        <Title>🧳 Cápsula Mínima</Title>
        <Subtitle>
          Quais N peças geram o maior número de looks completos?
          Útil para decidir o que levar em uma viagem sem pensar demais.
        </Subtitle>
      </Header>

      {/* ── Slider ── */}
      <SliderRow>
        <SliderLabel>Peças na mala</SliderLabel>
        <NValue>{n}</NValue>
        <Slider
          type="range"
          min={1}
          max={maxN}
          value={n}
          onChange={e => setN(Number(e.target.value))}
        />
        <Coverage>
          <span>{totalCovered}</span> / {totalLooks}
          <br />looks cobertos
        </Coverage>
      </SliderRow>

      {/* ── Summary ── */}
      {totalCovered > 0 && (
        <SummaryBar>
          <SummaryIcon>✅</SummaryIcon>
          <SummaryText>
            Com <strong>{n} peças</strong> você consegue montar{' '}
            <strong>{totalCovered} look{totalCovered !== 1 ? 's' : ''}</strong>{' '}
            completos — <strong>{pct}%</strong> do seu guarda-roupa.
          </SummaryText>
        </SummaryBar>
      )}

      {/* ── Steps ── */}
      <StepList>
        {steps.map((step, i) => (
          <StepCard key={step.piece.id} $hasLooks={step.newLooks.length > 0}>
            <StepNum>{i + 1}</StepNum>

            <PieceThumb $color={step.piece.color}>
              {step.piece.img && (
                <PieceThumbImg
                  src={imgUrl(step.piece.img)}
                  alt={step.piece.name}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              )}
            </PieceThumb>

            <StepInfo>
              <PieceName
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/pecas/${step.piece.id}`)}
                title="Ver peça"
              >
                {step.piece.name}
              </PieceName>
              <PieceMeta>{step.piece.brand} · {step.piece.category}</PieceMeta>

              {step.newLooks.length > 0 ? (
                <>
                  <NewLooksLabel $count={step.newLooks.length}>
                    +{step.newLooks.length} look{step.newLooks.length > 1 ? 's' : ''} desbloqueado{step.newLooks.length > 1 ? 's' : ''}
                  </NewLooksLabel>
                  <LookChips>
                    {step.newLooks.map(l => (
                      <LookChip
                        key={l.id}
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/looks/${l.id}`)}
                        title="Ver look"
                      >
                        {l.title}
                      </LookChip>
                    ))}
                  </LookChips>
                </>
              ) : (
                <NewLooksLabel $count={0}>
                  Sem looks novos — mas necessária para os próximos
                </NewLooksLabel>
              )}
            </StepInfo>
          </StepCard>
        ))}
      </StepList>
    </Wrap>
  )
}
