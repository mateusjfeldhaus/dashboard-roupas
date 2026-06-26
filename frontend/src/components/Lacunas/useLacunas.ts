export interface Gap {
  item: string
  why: string
  priority: 'critica' | 'moderada' | 'baixa'
}

export const gaps: Gap[] = [
  { item: 'Terno Azul Marinho',                   why: 'O azul marinho e o segundo terno mais essencial apos o cinza. Multiplica os looks formais.',                                                       priority: 'critica'  },
  { item: 'Camisa Branca de Linho',                why: 'Para eventos casuais de verao e viagens. Linho e insubstituivel no calor.',                                                                        priority: 'critica'  },
  { item: 'Calca Chino Verde-Oliva',               why: 'Cor versatil que combina com blazer azul, verde e marrom. Faltante nos looks casuais.',                                                            priority: 'moderada' },
  { item: 'Abotoaduras Classicas',                 why: 'Necessario para aproveitar as camisas de punho frances (Homem SA).',                                                                               priority: 'moderada' },
  { item: 'Calca de Alfaiataria Branca ou Off-White', why: 'Para looks smart casual de verao e primavera. Eleva camisas coloridas e blazers claros sem competir com eles.',                               priority: 'moderada' },
  { item: 'Lenco de Bolso',                        why: 'Detalhe que eleva qualquer terno de B para A+. Investimento minimo, impacto maximo.',                                                             priority: 'baixa'    },
  { item: 'Suspensorio de Couro',                  why: 'Para o look executivo maximo com calca de alfaiataria sem cinto.',                                                                                 priority: 'baixa'    },
  { item: 'Chinelo de Couro',                      why: 'Para looks casuais de verão',                                                                                                                     priority: 'baixa'    },
  { item: 'Suspensório de Couro',                  why: 'Para looks com visual clean sem cinto',                                                                                                            priority: 'critica'  },
]

export const sections = [
  { label: 'Prioridade Critica',  priority: 'critica'  as const },
  { label: 'Prioridade Moderada', priority: 'moderada' as const },
  { label: 'Prioridade Baixa',    priority: 'baixa'    as const },
]
