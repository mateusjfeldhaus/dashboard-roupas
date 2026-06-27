import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePieces } from '../../hooks/usePieces'
import { useLooks } from '../../hooks/useLooks'
import { CAT_LABELS } from '../../utils/lookHelpers'
import type { Look } from '@data/types'

export type SubcatDef = { id: string; label: string; pieceIds: string[] }

export const subcatConfig: Partial<Record<string, SubcatDef[]>> = {
  Sapato: [
    { id: 'preto',    label: '⬛ Preto',         pieceIds: ['sa-pr-dem-ch','sa-pr-dem-d','sa-pr-dem-p','sa-pr-lou','sa-pr-maj-dm','sa-pr-maj-o','sa-pr-mrc'] },
    { id: 'marrom',   label: '🟫 Marrom / Café', pieceIds: ['sa-ca-at-d','sa-te-cns','sa-mo-dem','sa-ca-maj-bs','sa-ca-maj-d','sa-ca-maj-o','sa-ca-maj-p','sa-ma-maj-ab','sa-ma-dem'] },
    { id: 'tan',      label: '🫙 Tan',            pieceIds: ['sa-ta-maj','sa-ma-dud'] },
    { id: 'azul',     label: '🔵 Azul',           pieceIds: ['sa-az-dem','sa-az-maj','sa-az-maj-b'] },
    { id: 'branco',   label: '⬜ Branco',         pieceIds: ['sa-br-maj'] },
    { id: 'burgundy', label: '🍷 Burgundy',       pieceIds: ['sa-bu-at'] },
  ],
  Camisa: [
    { id: 'neutras',     label: 'Neutras',      pieceIds: ['cs-br-doc','cs-br-hsa','cs-ci-4t','cs-pr-con','cs-pt-doc','cs-pl-doc','cs-ba-doc'] },
    { id: 'frias',       label: 'Tons Frios',   pieceIds: ['cs-ab-brk','cs-ab-con','cs-ar-con','cs-ae-doc','cs-ali-doc','cs-az-fid','cs-az-cli','cs-ae-pf','cs-ve-doc','cs-al-cli','cs-bl-doc'] },
    { id: 'quentes',     label: 'Tons Quentes', pieceIds: ['cs-ma-ash','cs-rli-hsa','cs-vi-doc','cs-vm-fid','cs-vm-caw','cs-ro-chi','cs-rch-kf','cs-ro-cli'] },
    { id: 'manga-curta', label: 'Manga Curta',  pieceIds: ['csc-ve-ium','csc-am-ren'] },
  ],
  Blazer: [
    { id: 'escuros', label: 'Escuros',         pieceIds: ['bl-pr-cli','bl-pr-doc','bl-pr-doc-v','bl-pr-tev'] },
    { id: 'frios',   label: 'Cinza / Azul',    pieceIds: ['bl-ch-doc','bl-ch-zeg','bl-azr-doc','bl-az-hsa','bl-ci-raf'] },
    { id: 'quentes', label: 'Tons Quentes',    pieceIds: ['bl-ma-dec','bl-ca-hsa','bl-ar-hsa','bl-vi-raf'] },
    { id: 'claros',  label: 'Claros / Verdes', pieceIds: ['bl-cr-doc','bl-ve-zar'] },
  ],
  'Calça': [
    { id: 'escuras', label: 'Escuras',         pieceIds: ['cl-pr-cli','cl-pr-doc','cl-na-doc','cl-na2-doc','cl-ch-raf','cl-ch-zeg','cl-jp-lev'] },
    { id: 'frias',   label: 'Cinza / Azul',    pieceIds: ['cl-azr-doc','cl-az-hsa','cl-ci-raf'] },
    { id: 'quentes', label: 'Tons Quentes',    pieceIds: ['cl-ar-doc','cl-ma-dec','cl-ar-hsa','cl-ca-hsa','cl-cr-lev','cl-cr-ber','cl-ve-zar'] },
  ],
  Gravata: [
    { id: 'classicas',  label: 'Clássicas',    pieceIds: ['gr-azp','gr-azs','gr-azr-df','gr-pr-dud','gr-ing-dud'] },
    { id: 'quentes',    label: 'Tons Quentes', pieceIds: ['gr-bv','gr-rf-df','gr-vm-df','gr-ma-df','gr-lvm','gr-ma-ofr'] },
    { id: 'verdes',     label: 'Verdes',       pieceIds: ['gr-vb-df','gr-vo-df','gr-ve'] },
    { id: 'estampadas', label: 'Estampadas',   pieceIds: ['gr-xac-df','gr-xcm-df'] },
  ],
  'Relógio': [
    { id: 'dress',      label: 'Dress Watch',  pieceIds: ['re-pr-cit','re-do-tec','re-pr-ori-b','re-pr-ori-t'] },
    { id: 'diver',      label: 'Diver',        pieceIds: ['re-az-cas','re-ve-baz','re-pr-sei'] },
    { id: 'esportivo',  label: 'Esportivo',    pieceIds: ['re-pr-cas'] },
    { id: 'smartwatch', label: 'Smartwatch',   pieceIds: ['re-sa-gal'] },
  ],
}

const CATEGORY_ORDER = Object.keys(CAT_LABELS)

export function looksForPiece(looks: Look[], pieceId: string): Look[] {
  return looks.filter(l => l.pieces.some(lp => lp.pieceId === pieceId))
}

export function usePorPeca() {
  const { pieces } = usePieces()
  const { looks }  = useLooks()
  const navigate    = useNavigate()

  const allPieceCats = [...new Set(pieces.map(p => p.category as string))]
  const categories = [
    ...CATEGORY_ORDER.filter(c => allPieceCats.includes(c)),
    ...allPieceCats.filter(c => !CATEGORY_ORDER.includes(c)),
  ].map(id => ({ id, label: CAT_LABELS[id] ?? id }))

  const [activeCat,    setActiveCat]    = useState('Camisa')
  const [activeSubcat, setActiveSubcat] = useState<string | null>(null)

  function handleCatChange(cat: string) { setActiveCat(cat); setActiveSubcat(null) }

  const subcats         = subcatConfig[activeCat] ?? []
  const hasSubcats      = subcats.length > 0
  const activeSubcatDef = subcats.find(s => s.id === activeSubcat) ?? null
  const filterIds       = activeSubcatDef?.pieceIds ?? null

  const piecesInCat = pieces.filter(p =>
    p.category === activeCat && (!filterIds || filterIds.includes(p.id))
  )

  return {
    pieces, looks, navigate,
    categories, activeCat, activeSubcat, setActiveSubcat,
    handleCatChange, subcats, hasSubcats, filterIds, piecesInCat,
    looksForPiece,
  }
}
