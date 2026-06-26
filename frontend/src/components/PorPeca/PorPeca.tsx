import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import { useLooks } from '../../hooks/useLooks'
import type { Look } from '@data/types'
import { imgUrl } from '../../utils/imgUrl'
import { CamisaLooks } from '../CamisaLooks/CamisaLooks'
import {
  StickyGroup,
  CategoryNav, NavLabel, CategoryChip,
  SubcatNav, SubcatLabel, SubcatChip,
  PieceList, PieceCard, PieceHeader,
  PieceThumb, PieceThumbImg, PieceInfo, PieceName, PieceBrand, LookBadge,
  LookRows, LookRow, LookTitle, LookTagRow, LookTag,
  FormalityDots, Dot, ClickHint, EmptyNote,
} from './PorPeca.styles'

// ── Subcategory config ───────────────────────────────────────────────────────

type SubcatDef = { id: string; label: string; pieceIds: string[] }

const subcatConfig: Partial<Record<string, SubcatDef[]>> = {
  Sapato: [
    {
      id: 'preto', label: '⬛ Preto',
      pieceIds: ['sa-pr-dem', 'sa-pr-maj-ox', 'sa-pr-maj-mk', 'sa-pr-dem-lo', 'sa-pr-lou', 'sa-pr-dem-ch', 'sa-pr-mrc'],
    },
    {
      id: 'marrom', label: '🟫 Marrom / Café',
      pieceIds: ['sa-ca-at', 'sa-ca-maj-be', 'sa-ca-maj-ox', 'sa-te-cns', 'sa-mo-dem-ch', 'sa-ca-maj-pl', 'sa-ca-maj-bs', 'sa-ma-maj-ab'],
    },
    {
      id: 'tan', label: '🫙 Tan',
      pieceIds: ['sa-ta-maj', 'sa-ma-dud', 'sa-ma-dem-ab'],
    },
    {
      id: 'azul', label: '🔵 Azul',
      pieceIds: ['sa-az-dem', 'sa-mn-maj', 'sa-az-maj-ab'],
    },
    {
      id: 'branco', label: '⬜ Branco',
      pieceIds: ['sa-br-maj'],
    },
    {
      id: 'burgundy', label: '🍷 Burgundy',
      pieceIds: ['sa-bu-at'],
    },
  ],
  Camisa: [
    {
      id: 'neutras', label: 'Neutras',
      pieceIds: ['cs-br-alg', 'cs-br-lev', 'cs-br-doc', 'cs-br-hsa', 'cs-ci-4t', 'cs-pr-con', 'cs-pli-doc', 'cs-pt-doc'],
    },
    {
      id: 'frias', label: 'Tons Frios',
      pieceIds: ['cs-ab-brk', 'cs-ab-con', 'cs-ar-con', 'cs-ae-doc', 'cs-ali-doc', 'cs-az-fid', 'cs-az-cli', 'cs-ae-pf', 'cs-ve-doc'],
    },
    {
      id: 'quentes', label: 'Tons Quentes',
      pieceIds: ['cs-ma-ash', 'cs-rli-hsa', 'cs-vi-doc', 'cs-vm-fid', 'cs-vm-caw', 'cs-ro-chi', 'cs-rch-kf'],
    },
  ],
  Costume: [
    {
      id: 'escuros', label: 'Escuros',
      pieceIds: ['co-pr-cli', 'co-ch-zeg', 'co-vi-raf'],
    },
    {
      id: 'frios', label: 'Tons Frios',
      pieceIds: ['co-ci-raf', 'co-az-hsa'],
    },
    {
      id: 'quentes', label: 'Tons Quentes',
      pieceIds: ['co-ca-hsa', 'co-ma-dec', 'co-lv-zar'],
    },
  ],
  Blazer: [
    {
      id: 'escuros', label: 'Escuros',
      pieceIds: ['bl-pr-doc', 'bl-vpr-doc', 'bl-pr-tev'],
    },
    {
      id: 'frios', label: 'Tons Frios',
      pieceIds: ['bl-ch-doc', 'bl-azr-doc'],
    },
    {
      id: 'claros', label: 'Claros',
      pieceIds: ['bl-cr-doc'],
    },
  ],
  'Calça': [
    {
      id: 'escuras', label: 'Escuras',
      pieceIds: ['cl-pr-doc', 'cl-jp-lev', 'cl-ch-raf', 'cl-ch-zeg'],
    },
    {
      id: 'frias', label: 'Tons Frios',
      pieceIds: ['cl-azr-doc', 'cl-az-hsa'],
    },
    {
      id: 'quentes', label: 'Tons Quentes',
      pieceIds: ['cl-ar-doc', 'cl-ln1-doc', 'cl-ln2-doc', 'cl-sa-lev', 'cl-ma-dec', 'cl-ca-hsa', 'cl-lv-zar', 'cl-br-lin'],
    },
  ],
  Gravata: [
    {
      id: 'classicas', label: 'Clássicas',
      pieceIds: ['gr-ap', 'gr-as', 'gr-ar-df', 'gr-pr-dud', 'gr-ing-dud'],
    },
    {
      id: 'quentes', label: 'Tons Quentes',
      pieceIds: ['gr-bv', 'gr-rf-df', 'gr-vm-df', 'gr-mm-df', 'gr-lvm'],
    },
    {
      id: 'verdes', label: 'Verdes',
      pieceIds: ['gr-vb-df', 'gr-vo-df', 'gr-ve'],
    },
    {
      id: 'estampadas', label: 'Estampadas',
      pieceIds: ['gr-xac-df', 'gr-xcm-df'],
    },
  ],
  'Relógio': [
    {
      id: 'dress', label: 'Dress Watch',
      pieceIds: ['re-pr-cit', 're-do-tec'],
    },
    {
      id: 'diver', label: 'Diver',
      pieceIds: ['re-az-sei', 're-az-cas', 're-ve-baz'],
    },
    {
      id: 'esportivo', label: 'Esportivo',
      pieceIds: ['re-pr-cas-g'],
    },
    {
      id: 'smartwatch', label: 'Smartwatch',
      pieceIds: ['re-sa-gal'],
    },
  ],
}

// ── Category list — dynamic, derived from pieces.ts ─────────────────────────
// labelMap: display name overrides (plurals, special cases).
// Categories present in pieces.ts but absent from labelMap auto-appear using
// their raw name. CATEGORY_ORDER sets preferred display order; unknowns append.

const labelMap: Record<string, string> = {
  'Camisa':    'Camisas',
  'Terno':     'Ternos',
  'Costume':   'Costumes',
  'Blazer':    'Blazers',
  'Calça':     'Calças',
  'Sapato':    'Sapatos',
  'Gravata':   'Gravatas',
  'Polo':      'Polos',
  'Camiseta':  'Camisetas',
  'Jaqueta':   'Jaquetas e Casacos',
  'Suéter':    'Suéteres',
  'Relógio':   'Relógios',
  'Cinto':     'Cintos',
  'Acessório': 'Acessórios',
}

const CATEGORY_ORDER = Object.keys(labelMap)

function looksForPiece(looks: Look[], pieceId: string): Look[] {
  return looks.filter(l => l.pieces.some(lp => lp.pieceId === pieceId))
}

// ── Component ────────────────────────────────────────────────────────────────

export function PorPeca() {
  const { pieces } = usePieces()
  const { looks } = useLooks()
  const allPieceCats = [...new Set(pieces.map(p => p.category as string))]
  const categories = [
    ...CATEGORY_ORDER.filter(c => allPieceCats.includes(c)),
    ...allPieceCats.filter(c => !CATEGORY_ORDER.includes(c)),
  ].map(id => ({ id, label: labelMap[id] ?? id }))

  const navigate = useNavigate()
  const [activeCat, setActiveCat] = useState('Camisa')
  const [activeSubcat, setActiveSubcat] = useState<string | null>(null)

  function handleCatChange(cat: string) {
    setActiveCat(cat)
    setActiveSubcat(null)
  }

  const subcats = subcatConfig[activeCat] ?? []
  const hasSubcats = subcats.length > 0
  const activeSubcatDef = subcats.find(s => s.id === activeSubcat) ?? null
  const filterIds = activeSubcatDef?.pieceIds ?? null

  const piecesInCat = pieces.filter(p =>
    p.category === activeCat &&
    (!filterIds || filterIds.includes(p.id))
  )

  return (
    <>
      <StickyGroup>
        <CategoryNav>
          <NavLabel>Categoria:</NavLabel>
          {categories.map(c => (
            <CategoryChip
              key={c.id}
              $active={activeCat === c.id}
              onClick={() => handleCatChange(c.id)}
            >
              {c.label}
            </CategoryChip>
          ))}
        </CategoryNav>

        {hasSubcats && (
          <SubcatNav>
            <SubcatLabel>Filtrar:</SubcatLabel>
            <SubcatChip
              $active={activeSubcat === null}
              onClick={() => setActiveSubcat(null)}
            >
              Todos
            </SubcatChip>
            {subcats.map(s => (
              <SubcatChip
                key={s.id}
                $active={activeSubcat === s.id}
                onClick={() => setActiveSubcat(activeSubcat === s.id ? null : s.id)}
              >
                {s.label}
              </SubcatChip>
            ))}
          </SubcatNav>
        )}
      </StickyGroup>

      {activeCat === 'Camisa' ? (
        <CamisaLooks filterIds={filterIds ?? undefined} />
      ) : (
        <>
          <PieceList>
            {piecesInCat.map(piece => {
              const pieceLooks = looksForPiece(looks, piece.id)
              return (
                <PieceCard key={piece.id}>
                  <PieceHeader>
                    <PieceThumb $color={piece.color}>
                      <PieceThumbImg
                        src={imgUrl(piece.img)}
                        alt={piece.name}
                        onError={e => {
                          const el = e.target as HTMLImageElement
                          el.style.display = 'none'
                          el.parentElement!.style.background = piece.color + '33'
                        }}
                      />
                    </PieceThumb>
                    <PieceInfo>
                      <PieceName>{piece.name}</PieceName>
                      <PieceBrand>{piece.brand}</PieceBrand>
                      <LookBadge>
                        {pieceLooks.length === 0
                          ? 'Nenhum look'
                          : `${pieceLooks.length} look${pieceLooks.length > 1 ? 's' : ''}`}
                      </LookBadge>
                    </PieceInfo>
                  </PieceHeader>

                  {pieceLooks.length > 0 ? (
                    <LookRows>
                      {pieceLooks.map(look => (
                        <LookRow key={look.id} onClick={() => navigate(`/looks/${look.id}`)}>
                          <LookTitle>{look.title}</LookTitle>
                          <LookTagRow>
                            {look.tags.map(t => (
                              <LookTag key={t} $tag={t}>{t}</LookTag>
                            ))}
                          </LookTagRow>
                          <FormalityDots>
                            {[1,2,3,4,5].map(i => (
                              <Dot key={i} $filled={i <= look.formality} />
                            ))}
                          </FormalityDots>
                          <ClickHint>ver</ClickHint>
                        </LookRow>
                      ))}
                    </LookRows>
                  ) : (
                    <EmptyNote>Nenhum look cadastrado para esta peça ainda.</EmptyNote>
                  )}
                </PieceCard>
              )
            })}
          </PieceList>
        </>
      )}
    </>
  )
}
