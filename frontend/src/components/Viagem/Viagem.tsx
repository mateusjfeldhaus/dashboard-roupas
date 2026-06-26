import { getTagColor } from '../../styles/tagColors'
import {
  Wrapper, Panel, PanelTitle,
  SettingsGrid, FieldGroup, FieldLabel, ChipRow, Chip, DaysInput,
  ActionRow, GenerateBtn, ShuffleBtn,
  StatsBar, StatBadge,
  LookList, LookRow, LookRowBtn, LookRowTitle,
  TagRow, Tag, FormalityDots, FormalityDot, RemoveBtn,
  EmptyState, EmptyIcon,
  ProgressBar, ProgressFill, ProgressLabel,
  CatBlock, CatBlockTitle, CheckItem, Checkbox, CheckLabel, CheckCat,
  ClearCheckBtn, CopyBtn, ViewPieceBtn,
} from './Viagem.styles'
import { useViagem } from './useViagem'

export function Viagem() {
  const {
    navigate,
    days, setDays,
    occasion, setOccasion,
    season, setSeason,
    pool, capsule, generated,
    checkedIds, setCheckedIds,
    copiedMsg,
    handleGenerate, handleShuffle, removeLook,
    byCategory,
    checkedCount, totalCount, pct, efficiency,
    toggleCheck, copyList,
    OCCASIONS, SEASONS,
  } = useViagem()

  return (
    <>
      <Wrapper>
        <Panel>
          <PanelTitle>Configurar viagem</PanelTitle>

          <SettingsGrid>
            <FieldGroup>
              <FieldLabel>Dias de viagem</FieldLabel>
              <DaysInput
                type="number" min={1} max={30} value={days}
                onChange={e => setDays(Math.max(1, Math.min(30, Number(e.target.value))))}
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Ocasião</FieldLabel>
              <ChipRow>
                {OCCASIONS.filter(o => o.tag !== 'diurno' && o.tag !== 'noturno').map(o => (
                  <Chip key={o.tag} $active={occasion === o.tag}
                    onClick={() => setOccasion(occasion === o.tag ? null : o.tag as typeof occasion)}>
                    {o.label}
                  </Chip>
                ))}
              </ChipRow>
            </FieldGroup>

            <FieldGroup style={{ gridColumn: '1 / -1' }}>
              <FieldLabel>Estação</FieldLabel>
              <ChipRow>
                {SEASONS.map(s => (
                  <Chip key={s.tag} $active={season === s.tag}
                    onClick={() => setSeason(season === s.tag ? null : s.tag)}>
                    {s.emoji} {s.label}
                  </Chip>
                ))}
              </ChipRow>
            </FieldGroup>
          </SettingsGrid>

          <ActionRow>
            <GenerateBtn onClick={handleGenerate}>✈️ Gerar mala cápsula</GenerateBtn>
            {generated && (
              <ShuffleBtn onClick={handleShuffle} title="Gerar nova combinação">🔀 Novo sorteio</ShuffleBtn>
            )}
          </ActionRow>

          {generated && capsule.length > 0 && (
            <>
              <StatsBar>
                <StatBadge>{capsule.length} look{capsule.length > 1 ? 's' : ''}</StatBadge>
                <StatBadge>{totalCount} peça{totalCount > 1 ? 's' : ''} únicas</StatBadge>
                <StatBadge $accent>{efficiency} looks/peça</StatBadge>
                {pool.length < days && (
                  <StatBadge title="Menos looks disponíveis do que dias de viagem">
                    ⚠️ {pool.length}/{days} looks no filtro
                  </StatBadge>
                )}
              </StatsBar>

              <LookList>
                {capsule.map(look => (
                  <LookRow key={look.id}>
                    <LookRowBtn onClick={() => navigate(`/looks/${look.id}`)}>
                      <LookRowTitle>{look.title}</LookRowTitle>
                      <TagRow>
                        {look.tags.map(t => {
                          const c = getTagColor(t)
                          return (
                            <Tag key={t} style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
                              {t}
                            </Tag>
                          )
                        })}
                      </TagRow>
                      <FormalityDots>
                        {[1,2,3,4,5].map(i => (
                          <FormalityDot key={i} $filled={i <= look.formality} />
                        ))}
                      </FormalityDots>
                    </LookRowBtn>
                    <RemoveBtn onClick={() => removeLook(look.id)} title="Remover do look">×</RemoveBtn>
                  </LookRow>
                ))}
              </LookList>
            </>
          )}

          {generated && capsule.length === 0 && (
            <EmptyState>
              <EmptyIcon>😕</EmptyIcon>
              Nenhum look encontrado com esses filtros.<br />
              <span style={{ fontSize: 12 }}>Tente remover a ocasião ou estação.</span>
            </EmptyState>
          )}

          {!generated && (
            <EmptyState>
              <EmptyIcon>🧳</EmptyIcon>
              Configure os dias e filtros acima, depois clique em <strong>Gerar mala cápsula</strong>.
              <br /><br />
              <span style={{ fontSize: 12 }}>
                O algoritmo seleciona os looks que compartilham mais peças entre si — menos bagagem, mais combinações.
              </span>
            </EmptyState>
          )}
        </Panel>

        <Panel>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <PanelTitle style={{ marginBottom: 0 }}>Checklist de peças</PanelTitle>
            {totalCount > 0 && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <CopyBtn onClick={copyList}>{copiedMsg ? '✓ copiado' : '📋 copiar'}</CopyBtn>
                {checkedCount > 0 && (
                  <ClearCheckBtn onClick={() => setCheckedIds(() => new Set<string>())}>limpar</ClearCheckBtn>
                )}
              </div>
            )}
          </div>

          {totalCount === 0 ? (
            <EmptyState style={{ padding: '32px 16px' }}>
              <EmptyIcon>📋</EmptyIcon>
              {generated
                ? 'Nenhuma peça para listar.'
                : 'Gere a mala cápsula para ver as peças necessárias aqui.'}
            </EmptyState>
          ) : (
            <>
              <ProgressLabel>
                <span>{checkedCount} de {totalCount} separadas</span>
                <span>{pct}%</span>
              </ProgressLabel>
              <ProgressBar>
                <ProgressFill $pct={pct} />
              </ProgressBar>

              {[...byCategory.entries()].map(([cat, items]) => (
                <CatBlock key={cat}>
                  <CatBlockTitle>{cat} ({items.length})</CatBlockTitle>
                  {items.map(p => (
                    <CheckItem key={p.id} $checked={checkedIds.has(p.id)}>
                      <Checkbox
                        type="checkbox"
                        checked={checkedIds.has(p.id)}
                        onChange={() => toggleCheck(p.id)}
                      />
                      <CheckLabel $checked={checkedIds.has(p.id)}>{p.name}</CheckLabel>
                      <CheckCat>{p.brand}</CheckCat>
                      <ViewPieceBtn
                        onClick={e => { e.preventDefault(); navigate(`/pecas/${p.id}`) }}
                        title="Ver peça"
                      >👁</ViewPieceBtn>
                    </CheckItem>
                  ))}
                </CatBlock>
              ))}
            </>
          )}
        </Panel>
      </Wrapper>
    </>
  )
}
