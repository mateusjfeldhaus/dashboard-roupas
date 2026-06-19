import type { Look } from './types'

export const looks: Look[] = [
  // ═══════════════════════════════════════════════════════
  // TRABALHO (20 looks)
  // ═══════════════════════════════════════════════════════
  {
    id: 'l-t01', title: 'Executivo Clássico', tags: ['formal'], formality: 5,
    tip: 'Contraste vinho + azul é o mais clássico e sofisticado da alfaiataria. O Oxford Burgundy fecha o look por harmonização de cor com o terno.',
    pieces: [
      { cat: 'Terno', pieceId: 'co-vi-raf' },
      { cat: 'Camisa', pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-as' },
      { cat: 'Sapato', pieceId: 'sa-bu-at' },
      { cat: 'Cinto', pieceId: 'ci-bu-at' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-t02', title: 'Cinza de Poder', tags: ['formal'], formality: 5,
    tip: 'Cinza + azul bebê + gravata xadrez sutil = equilíbrio entre autoridade e acessibilidade. Ideal para reuniões com clientes importantes.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ci-raf' },
      { cat: 'Camisa', pieceId: 'cs-ab-brk' },
      { cat: 'Gravata', pieceId: 'gr-xcm-df' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-be' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
    ]
  },
  {
    id: 'l-t03', title: 'Lã Zegna Premium', tags: ['formal'], formality: 5,
    tip: 'O Zegna Lã 180 é a peça mais premium do guarda-roupa. Deixe o tecido falar com camisa branca e gravata sutil.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ch-zeg' },
      { cat: 'Camisa', pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-mm-df' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-t04', title: 'Azul Tropical', tags: ['formal', 'verao'], formality: 4,
    tip: 'Tom sobre tom em azul com quebra no sapato café. Lã tropical não esquenta — ideal para verão formal.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-az-hsa' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Gravata', pieceId: 'gr-ar-df' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-t05', title: 'Smart Casual Blazer Azul', tags: ['formal'], formality: 3,
    tip: 'Blazer azul royal + calça areia = o smart casual mais clássico do mundo. Sem gravata e com loafer, elegante mas acessível.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-azr-doc' },
      { cat: 'Calça', pieceId: 'cl-ar-doc' },
      { cat: 'Camisa', pieceId: 'cs-br-doc' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-pl' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relógio', pieceId: 're-ve-baz' },
    ]
  },
  {
    id: 'l-t06', title: 'Smart Casual Creme × Preto', tags: ['formal'], formality: 3,
    tip: 'Contraste creme + preto. O Monk Strap adiciona personalidade. Ótimo para meetings criativos com dress code elevado.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-cr-doc' },
      { cat: 'Calça', pieceId: 'cl-pr-doc' },
      { cat: 'Camisa', pieceId: 'cs-pt-doc' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-mk' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-t07', title: 'Veludo Executivo', tags: ['formal', 'noturno'], formality: 4,
    tip: 'Blazer de veludo + Chelsea Boot é power dressing sofisticado. A camisa azul escura quebra o monótono com profundidade.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-vpr-doc' },
      { cat: 'Calça', pieceId: 'cl-ch-raf' },
      { cat: 'Camisa', pieceId: 'cs-ae-doc' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
    ]
  },
  {
    id: 'l-t08', title: 'Marrom Premium', tags: ['formal'], formality: 5,
    tip: 'Costume marrom Decinel com camisa azul bebê: contraste refinado e marcante. Tom incomum que comunica bom gosto acima da média.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ma-dec' },
      { cat: 'Camisa', pieceId: 'cs-ab-con' },
      { cat: 'Gravata', pieceId: 'gr-xcm-df' },
      { cat: 'Sapato', pieceId: 'sa-ca-at' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
    ]
  },
  {
    id: 'l-t09', title: 'Caramelo + Rosa Fúcsia', tags: ['formal'], formality: 4,
    tip: 'Costume caramelo + gravata rosa fúcsia = look de arrojado e memorável. Para quem quer liderar pelo estilo.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ca-hsa' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Gravata', pieceId: 'gr-rf-df' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relógio', pieceId: 're-do-tec' },
    ]
  },
  {
    id: 'l-t10', title: 'Blazer Chumbo + Polo', tags: ['casual'], formality: 2,
    tip: 'Blazer chumbo + polo petróleo + calça caramelo = smart casual com paleta terrosa quente. Look de sexta-feira refinado.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-ch-doc' },
      { cat: 'Calça', pieceId: 'cl-ca-hsa' },
      { cat: 'Polo', pieceId: 'po-pe-fid' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-pl' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-t11', title: 'Creme × Azul Royal', tags: ['formal'], formality: 3,
    tip: 'Blazer creme + camisa azul royal + calça areia = look vibrante com contraste forte. Para ambientes modernos e criativos.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-cr-doc' },
      { cat: 'Calça', pieceId: 'cl-ar-doc' },
      { cat: 'Camisa', pieceId: 'cs-ar-con' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-be' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
    ]
  },
  {
    id: 'l-t12', title: 'Cinza + Verde Oliva', tags: ['formal'], formality: 4,
    tip: 'Costume cinza com gravata verde oliva: combinação inusual e sofisticada. A calma do cinza com a originalidade do verde.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ci-raf' },
      { cat: 'Camisa', pieceId: 'cs-ci-4t' },
      { cat: 'Gravata', pieceId: 'gr-vo-df' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-lo' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-t13', title: 'Blazer Preto + Azul Royal', tags: ['formal'], formality: 3,
    tip: 'Blazer preto + calça azul royal + camisa listrada = look moderno e ousado. Usa o azul como pop de cor deliberado.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-pr-doc' },
      { cat: 'Calça', pieceId: 'cl-azr-doc' },
      { cat: 'Camisa', pieceId: 'cs-ali-doc' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-t14', title: 'Azul Costume + Bordô', tags: ['formal'], formality: 5,
    tip: 'Costume azul + camisa branca punho francês + gravata bordô = máxima formalidade com toque aristocrático.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-az-hsa' },
      { cat: 'Camisa', pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-bv' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-t15', title: 'Blazer Azul + Camisa Verde', tags: ['formal'], formality: 3,
    tip: 'Blazer azul royal + camisa verde + calça preta = combinação analógica ousada. Para ambientes que valorizam originalidade.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-azr-doc' },
      { cat: 'Calça', pieceId: 'cl-pr-doc' },
      { cat: 'Camisa', pieceId: 'cs-ve-doc' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-mk' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-t16', title: 'Vinho + Azul Bebê', tags: ['formal'], formality: 5,
    tip: 'Terno vinho com camisa azul bebê — versão mais clara e refrescante do clássico vinho+branco. O relógio dourado eleva o look.',
    pieces: [
      { cat: 'Terno', pieceId: 'co-vi-raf' },
      { cat: 'Camisa', pieceId: 'cs-ab-con' },
      { cat: 'Gravata', pieceId: 'gr-ar-df' },
      { cat: 'Sapato', pieceId: 'sa-bu-at' },
      { cat: 'Cinto', pieceId: 'ci-bu-at' },
      { cat: 'Relógio', pieceId: 're-do-tec' },
    ]
  },
  {
    id: 'l-t17', title: 'Chumbo × Rosa Listrada', tags: ['formal'], formality: 4,
    tip: 'Costume chumbo Zegna com camisa rosa listrada: o peso do chumbo premium equilibra a leveza da rosa. Gravata xadrez une os dois.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ch-zeg' },
      { cat: 'Camisa', pieceId: 'cs-rli-hsa' },
      { cat: 'Gravata', pieceId: 'gr-xac-df' },
      { cat: 'Sapato', pieceId: 'sa-ca-at' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
    ]
  },
  {
    id: 'l-t18', title: 'Veludo + Lã Marrom', tags: ['formal', 'inverno'], formality: 3,
    tip: 'Blazer veludo preto + calça lã marrom + camisa vinho: texturas ricas de inverno para um look de escritório que impressiona.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-vpr-doc' },
      { cat: 'Calça', pieceId: 'cl-ma-dec' },
      { cat: 'Camisa', pieceId: 'cs-vi-doc' },
      { cat: 'Sapato', pieceId: 'sa-ma-dud' },
      { cat: 'Cinto', pieceId: 'ci-ma-maj' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-t19', title: 'Azul Total Listrado', tags: ['formal'], formality: 4,
    tip: 'Costume azul com camisa azul listrada e gravata azul: look tonal monocromático azul de alto impacto contemporâneo.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-az-hsa' },
      { cat: 'Camisa', pieceId: 'cs-ali-doc' },
      { cat: 'Gravata', pieceId: 'gr-ar-df' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
    ]
  },
  {
    id: 'l-t20', title: 'Tevah Estruturado', tags: ['formal'], formality: 4,
    tip: 'Blazer Tevah estruturado + calça chumbo + camisa azul bebê: look formal com ombros definidos que transmite autoridade.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-pr-tev' },
      { cat: 'Calça', pieceId: 'cl-ch-raf' },
      { cat: 'Camisa', pieceId: 'cs-ab-brk' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
    ]
  },

  // ═══════════════════════════════════════════════════════
  // FORMAL (21 looks — inclui alguns trabalho/noturno)
  // ═══════════════════════════════════════════════════════
  {
    id: 'l-f01', title: 'Terno Areia 3 Peças', tags: ['formal', 'diurno', 'verao'], formality: 5,
    tip: 'Terno de linho 3 peças é peak elegância para eventos estivais diurnos. Sem gravata para modernizar — botão de cima aberto.',
    pieces: [
      { cat: 'Terno', pieceId: 'te-ar-hsa-b' },
      { cat: 'Calça', pieceId: 'te-ar-hsa-c' },
      { cat: 'Colete', pieceId: 'te-ar-hsa-v' },
      { cat: 'Camisa', pieceId: 'cs-br-lev' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
    ]
  },
  {
    id: 'l-f02', title: 'Terno Areia + Gravata Verde', tags: ['formal', 'diurno'], formality: 5,
    tip: 'Terno areia com gravata verde bandeira: combinação de cerimônia que ninguém vai esquecer. A gravata é o pop de cor perfeito.',
    pieces: [
      { cat: 'Terno', pieceId: 'te-ar-hsa-b' },
      { cat: 'Calça', pieceId: 'te-ar-hsa-c' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Gravata', pieceId: 'gr-vb-df' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-pl' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
    ]
  },
  {
    id: 'l-f03', title: 'Costume Preto Cliffield', tags: ['formal', 'noturno'], formality: 5,
    tip: 'Costume preto com camisa branca e gravata preta: o look de cerimônia mais clássico de todos — intemporal e irretocável.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-pr-cli' },
      { cat: 'Camisa', pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-pr-dud' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-f04', title: 'Terno Vinho Sem Gravata', tags: ['formal', 'noturno'], formality: 4,
    tip: 'Terno vinho sem gravata é o look de jantar especial ou evento noturno semiformal. O relógio dourado adiciona luxo discreto.',
    pieces: [
      { cat: 'Terno', pieceId: 'co-vi-raf' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Sapato', pieceId: 'sa-bu-at' },
      { cat: 'Cinto', pieceId: 'ci-bu-at' },
      { cat: 'Relógio', pieceId: 're-do-tec' },
    ]
  },
  {
    id: 'l-f05', title: 'Sobretudo Cinza + Terno', tags: ['formal', 'noturno', 'inverno'], formality: 5,
    tip: 'Sobretudo cinza sobre terno cinza: layering monocromático de alto impacto. Para óperas, galas e jantares formais de inverno.',
    pieces: [
      { cat: 'Sobretudo', pieceId: 'ja-ci-hsa' },
      { cat: 'Costume', pieceId: 'co-ci-raf' },
      { cat: 'Camisa', pieceId: 'cs-ab-brk' },
      { cat: 'Gravata', pieceId: 'gr-as' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-f06', title: 'Marrom Gala', tags: ['formal'], formality: 5,
    tip: 'Costume marrom Decinel com gravata marrom mocha: sofisticação tonal incomum. Para quem quer ser o mais bem vestido sem ser óbvio.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ma-dec' },
      { cat: 'Camisa', pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-mm-df' },
      { cat: 'Sapato', pieceId: 'sa-ca-at' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-f07', title: 'Caramelo Cerimônia', tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume caramelo + gravata verde bandeira: combinação outonal de rara sofisticação. Para casamentos, formaturas e cerimônias diurnas.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ca-hsa' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Gravata', pieceId: 'gr-vb-df' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relógio', pieceId: 're-do-tec' },
    ]
  },
  {
    id: 'l-f08', title: 'Zegna + Azul Bebê', tags: ['formal'], formality: 5,
    tip: 'Costume chumbo Zegna com camisa azul bebê fio 200 e gravata xadrez: quando qualidade fala por si. Reserve para o mais importante.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ch-zeg' },
      { cat: 'Camisa', pieceId: 'cs-ab-brk' },
      { cat: 'Gravata', pieceId: 'gr-xac-df' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-f09', title: 'Terno Areia + Azul Bebê', tags: ['formal', 'verao'], formality: 5,
    tip: 'Terno areia com camisa azul bebê e gravata bordô: combinação inusitada de claro + forte que comunica elegância refinada.',
    pieces: [
      { cat: 'Terno', pieceId: 'te-ar-hsa-b' },
      { cat: 'Calça', pieceId: 'te-ar-hsa-c' },
      { cat: 'Camisa', pieceId: 'cs-ab-con' },
      { cat: 'Gravata', pieceId: 'gr-bv' },
      { cat: 'Sapato', pieceId: 'sa-ca-at' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
    ]
  },
  {
    id: 'l-f10', title: 'Azul + Rosa Listrada', tags: ['formal'], formality: 4,
    tip: 'Costume azul com camisa rosa listrada e gravata azul royal: combinação moderna e arrojada que comunica confiança criativa.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-az-hsa' },
      { cat: 'Camisa', pieceId: 'cs-rli-hsa' },
      { cat: 'Gravata', pieceId: 'gr-ar-df' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-f11', title: 'Tevah + Punho Francês + Lenço', tags: ['formal', 'noturno'], formality: 5,
    tip: 'Blazer Tevah + camisa branca punho francês + lenço vermelho: o look de gala com assinatura. O lenço vermelho é a marca que fica na memória.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-pr-tev' },
      { cat: 'Calça', pieceId: 'cl-pr-doc' },
      { cat: 'Camisa', pieceId: 'cs-br-hsa' },
      { cat: 'Lenço', pieceId: 'ac-vm-len' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
    ]
  },
  {
    id: 'l-f12', title: 'Linho Verde Formal', tags: ['formal', 'diurno', 'verao'], formality: 4,
    tip: 'Costume linho verde + camisa branca + loafer preto: look de evento diurno de verão mais moderno e memorável que existe.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-lv-zar' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Sapato', pieceId: 'sa-pr-lou' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-ve-baz' },
    ]
  },
  {
    id: 'l-f13', title: 'Cinza + Rosa Fúcsia', tags: ['formal'], formality: 4,
    tip: 'Costume cinza com gravata rosa fúcsia: o cinza é o palco perfeito para o rosa brilhar. Look de quem não tem medo de ser notado.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ci-raf' },
      { cat: 'Camisa', pieceId: 'cs-ci-4t' },
      { cat: 'Gravata', pieceId: 'gr-rf-df' },
      { cat: 'Sapato', pieceId: 'sa-ca-at' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
    ]
  },
  {
    id: 'l-f14', title: 'Caramelo + Azul Bebê', tags: ['formal', 'diurno'], formality: 4,
    tip: 'Costume caramelo + camisa azul bebê + gravata verde: as três cores formam triângulo analógico de alto impacto e rara elegância.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ca-hsa' },
      { cat: 'Camisa', pieceId: 'cs-ab-brk' },
      { cat: 'Gravata', pieceId: 'gr-ve' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relógio', pieceId: 're-do-tec' },
    ]
  },
  {
    id: 'l-f15', title: 'Azul + Listrada Vermelha', tags: ['formal'], formality: 4,
    tip: 'Costume azul + gravata listrada vermelha/preta: contraste forte que transmite liderança. Use em negociações e apresentações importantes.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-az-hsa' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Gravata', pieceId: 'gr-lvm' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
    ]
  },
  {
    id: 'l-f16', title: 'Chumbo + Inglesa Dudalina', tags: ['formal'], formality: 5,
    tip: 'Zegna chumbo + gravata inglesa Dudalina: combinação de duas peças premium que comunica sofisticação britânica de alto nível.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ch-zeg' },
      { cat: 'Camisa', pieceId: 'cs-ab-brk' },
      { cat: 'Gravata', pieceId: 'gr-ing-dud' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-f17', title: 'Vinho Tonal Luxo', tags: ['formal', 'noturno'], formality: 5,
    tip: 'Terno vinho + camisa vinho sem gravata: look tonal ousado de jantar de luxo. O relógio dourado e o Oxford burgundy completam a paleta quente.',
    pieces: [
      { cat: 'Terno', pieceId: 'co-vi-raf' },
      { cat: 'Camisa', pieceId: 'cs-vi-doc' },
      { cat: 'Sapato', pieceId: 'sa-bu-at' },
      { cat: 'Cinto', pieceId: 'ci-bu-at' },
      { cat: 'Relógio', pieceId: 're-do-tec' },
    ]
  },
  {
    id: 'l-f18', title: 'Cinza + Azul Poá', tags: ['formal'], formality: 4,
    tip: 'Costume cinza + gravata azul poá: padrão clássico com o costume mais versátil. Look de confiança para qualquer evento formal.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ci-raf' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Gravata', pieceId: 'gr-ap' },
      { cat: 'Sapato', pieceId: 'sa-ca-at' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-f19', title: 'Marrom + Vermelha DF', tags: ['formal'], formality: 4,
    tip: 'Costume marrom Decinel + gravata vermelha DF: raridade total. Quem conhece alfaiataria vai reconhecer o look como excepcional.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ma-dec' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Gravata', pieceId: 'gr-vm-df' },
      { cat: 'Sapato', pieceId: 'sa-ca-at' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
    ]
  },
  {
    id: 'l-f20', title: 'Preto + Listrada V+P', tags: ['formal', 'noturno'], formality: 5,
    tip: 'Costume preto Cliffield + gravata listrada vermelha e preta: cerimônia com personalidade. O único vermelho do look está na gravata.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-pr-cli' },
      { cat: 'Camisa', pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-lvm' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-f21', title: 'Sobretudo Preto Gala', tags: ['formal', 'inverno', 'noturno'], formality: 5,
    tip: 'Sobretudo preto + terno vinho por baixo: layering de gala invernal. O vinho aparece nos detalhes — o suficiente para criar profundidade.',
    pieces: [
      { cat: 'Sobretudo', pieceId: 'ja-pr-pai' },
      { cat: 'Terno', pieceId: 'co-vi-raf' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Sapato', pieceId: 'sa-bu-at' },
      { cat: 'Relógio', pieceId: 're-do-tec' },
    ]
  },

  // ═══════════════════════════════════════════════════════
  // NOTURNO (9 looks)
  // ═══════════════════════════════════════════════════════
  {
    id: 'l-n01', title: 'All Black Elegante', tags: ['noturno', 'formal'], formality: 4,
    tip: 'Blazer preto + calça preta + camisa listrada: textura na camisa evita que o all-black pareça monótono. O Seiko azul é o único contraste.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-pr-doc' },
      { cat: 'Calça', pieceId: 'cl-pr-doc' },
      { cat: 'Camisa', pieceId: 'cs-pli-doc' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-n02', title: 'Overcoat + Gola Alta', tags: ['noturno', 'inverno'], formality: 3,
    tip: 'Overcoat cashmere + gola alta preto + jeans: o look de inverno noturno mais elegante possível. Minimalismo absoluto em preto.',
    pieces: [
      { cat: 'Overcoat', pieceId: 'ja-pr-raf' },
      { cat: 'Suéter', pieceId: 'su-ga-pr' },
      { cat: 'Calça', pieceId: 'cl-jp-lev' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
      { cat: 'Relógio', pieceId: 're-pr-cas-g' },
    ]
  },
  {
    id: 'l-n03', title: 'Jaqueta Couro Preta', tags: ['noturno', 'casual'], formality: 2,
    tip: 'Jaqueta couro preta + camisa vinho + jeans + coturno: rock com sofisticação. Para shows, bares e saídas com atitude.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-pr-jck' },
      { cat: 'Camisa', pieceId: 'cs-vi-doc' },
      { cat: 'Calça', pieceId: 'cl-jp-lev' },
      { cat: 'Sapato', pieceId: 'sa-pr-mrc' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-n04', title: 'Blazer Azul Noturno', tags: ['noturno'], formality: 3,
    tip: 'Blazer azul royal + calça preta + camisa vinho + chelsea: o azul ilumina o look noturno sem perder a sofisticação escura.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-azr-doc' },
      { cat: 'Calça', pieceId: 'cl-pr-doc' },
      { cat: 'Camisa', pieceId: 'cs-vi-doc' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
      { cat: 'Relógio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-n05', title: 'Overcoat + Blazer Camadas', tags: ['noturno', 'inverno', 'formal'], formality: 4,
    tip: 'Overcoat cashmere + blazer chumbo + suéter petróleo + calça chumbo: máximo layering elegante. Look de evento noturno de inverno.',
    pieces: [
      { cat: 'Overcoat', pieceId: 'ja-pr-raf' },
      { cat: 'Blazer', pieceId: 'bl-ch-doc' },
      { cat: 'Suéter', pieceId: 'su-pe' },
      { cat: 'Calça', pieceId: 'cl-ch-raf' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-n06', title: 'Couro Marrom + Suéter', tags: ['noturno', 'casual', 'outono'], formality: 2,
    tip: 'Jaqueta couro marrom + suéter preto + sarja creme + chelsea mogno: estilo europeu de outono/inverno para saídas descontraídas.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-ma-jck' },
      { cat: 'Suéter', pieceId: 'su-pr1' },
      { cat: 'Calça', pieceId: 'cl-sa-lev' },
      { cat: 'Sapato', pieceId: 'sa-mo-dem-ch' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-n07', title: 'Veludo + Ankle Boot', tags: ['noturno', 'formal'], formality: 4,
    tip: 'Blazer veludo preto + camisa azul escura Preston Field + ankle boot camurça azul: look noturno com textura e cor em harmonia.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-vpr-doc' },
      { cat: 'Calça', pieceId: 'cl-ch-raf' },
      { cat: 'Camisa', pieceId: 'cs-ae-pf' },
      { cat: 'Sapato', pieceId: 'sa-az-maj-ab' },
    ]
  },
  {
    id: 'l-n08', title: 'Terno Preto + Vermelha', tags: ['noturno', 'formal'], formality: 5,
    tip: 'Costume preto com camisa vermelha Fideli sem gravata: ousado e dramático para jantares especiais onde quer ser o centro das atenções.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-pr-cli' },
      { cat: 'Camisa', pieceId: 'cs-vm-fid' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-do-tec' },
    ]
  },
  {
    id: 'l-n09', title: 'Chumbo + Camisa Preta', tags: ['noturno', 'formal'], formality: 4,
    tip: 'Costume chumbo Zegna + camisa preta sem gravata: sofisticação escura e intensa. O Citizen dress watch é o único elemento brilhante.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ch-zeg' },
      { cat: 'Camisa', pieceId: 'cs-pr-con' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },

  // ═══════════════════════════════════════════════════════
  // DIURNO (8 looks)
  // ═══════════════════════════════════════════════════════
  {
    id: 'l-d01', title: 'Linho Verde Verão', tags: ['diurno', 'verao', 'formal'], formality: 4,
    tip: 'Conjunto de linho verde + camisa branca + loafer preto: look de verão mais elegante possível. O loafer âncora e equilibra o verde.',
    pieces: [
      { cat: 'Blazer', pieceId: 'co-lv-zar' },
      { cat: 'Calça', pieceId: 'cl-lv-zar' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Sapato', pieceId: 'sa-pr-lou' },
      { cat: 'Relógio', pieceId: 're-ve-baz' },
    ]
  },
  {
    id: 'l-d02', title: 'Caramelo Natural', tags: ['diurno', 'outono'], formality: 4,
    tip: 'Costume caramelo + polo verde + sapato tan: tons terrosos analógicos de alto impacto. Looks que parecem fáceis mas são muito pensados.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ca-hsa' },
      { cat: 'Polo', pieceId: 'po-ve-fid' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relógio', pieceId: 're-do-tec' },
    ]
  },
  {
    id: 'l-d03', title: 'Polo + Sarja Weekend', tags: ['diurno', 'casual'], formality: 2,
    tip: 'Polo petróleo + sarja creme + loafer marrom: look de fim de semana inteligente. Sofisticado sem esforço para almoços e passeios.',
    pieces: [
      { cat: 'Polo', pieceId: 'po-pe-fid' },
      { cat: 'Calça', pieceId: 'cl-sa-lev' },
      { cat: 'Sapato', pieceId: 'sa-ma-dud' },
      { cat: 'Cinto', pieceId: 'ci-ma-maj' },
      { cat: 'Relógio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-d04', title: 'Jaqueta Couro Marrom Diurna', tags: ['diurno', 'casual', 'outono'], formality: 2,
    tip: 'Jaqueta Dublin couro marrom + camisa azul bebê + sarja creme: estilo casual de outono que parece sem esforço mas é cuidadoso.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-ma-jck' },
      { cat: 'Camisa', pieceId: 'cs-ab-brk' },
      { cat: 'Calça', pieceId: 'cl-sa-lev' },
      { cat: 'Sapato', pieceId: 'sa-ca-at' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-d05', title: 'Blazer Chumbo + Calça Azul', tags: ['diurno', 'formal'], formality: 3,
    tip: 'Blazer chumbo + calça azul royal + sapato marinho: tone on tone em tons escuros com o cinto verde como detalhe de assinatura.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-ch-doc' },
      { cat: 'Calça', pieceId: 'cl-azr-doc' },
      { cat: 'Camisa', pieceId: 'cs-ab-con' },
      { cat: 'Sapato', pieceId: 'sa-mn-maj' },
      { cat: 'Cinto', pieceId: 'ci-ve-maj' },
      { cat: 'Relógio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-d06', title: 'Jaqueta Bege + Polo Creme', tags: ['diurno', 'casual', 'primavera'], formality: 2,
    tip: 'Jaqueta bege + polo creme + calça linho: monocromático em tons naturais para um dia de primavera elegante e descomplicado.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-be-saf' },
      { cat: 'Polo', pieceId: 'po-cr' },
      { cat: 'Calça', pieceId: 'cl-ln1-doc' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Relógio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-d07', title: 'Polo Rosa Bermuda', tags: ['diurno', 'casual', 'verao'], formality: 1,
    tip: 'Polo rosa + bermuda linho creme + loafer tan: combinação de verão suave e estilosa. O loafer tan eleva o que seria look de praia.',
    pieces: [
      { cat: 'Polo', pieceId: 'po-ro' },
      { cat: 'Calça', pieceId: 'cl-br-lin' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Relógio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-d08', title: 'Blazer Azul + Linho Natural', tags: ['diurno', 'formal', 'verao'], formality: 3,
    tip: 'Blazer azul royal + calça linho natural + camisa branca: smart casual de verão perfeito. Leve, fresco e extremamente elegante.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-azr-doc' },
      { cat: 'Calça', pieceId: 'cl-ln1-doc' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Sapato', pieceId: 'sa-ma-dud' },
      { cat: 'Cinto', pieceId: 'ci-ma-maj' },
      { cat: 'Relógio', pieceId: 're-az-cas' },
    ]
  },

  // ═══════════════════════════════════════════════════════
  // CASUAL (5 looks)
  // ═══════════════════════════════════════════════════════
  {
    id: 'l-c01', title: 'Gola Alta + Jeans', tags: ['casual', 'inverno'], formality: 2,
    tip: 'Gola alta preto + jeans preto + chelsea mogno = trio de inverno infalível. Add o overcoat cashmere para sair à noite.',
    pieces: [
      { cat: 'Suéter', pieceId: 'su-ga-pr' },
      { cat: 'Calça', pieceId: 'cl-jp-lev' },
      { cat: 'Sapato', pieceId: 'sa-mo-dem-ch' },
      { cat: 'Relógio', pieceId: 're-pr-cas-g' },
    ]
  },
  {
    id: 'l-c02', title: 'Suéter Petróleo + Alfaiataria', tags: ['casual', 'outono'], formality: 2,
    tip: 'Suéter petróleo + calça chumbo + chelsea preto: casual com profundidade. Tons frios profundos para dias de outono.',
    pieces: [
      { cat: 'Suéter', pieceId: 'su-pe' },
      { cat: 'Calça', pieceId: 'cl-ch-raf' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-c03', title: 'Camiseta + Blazer', tags: ['casual', 'diurno'], formality: 2,
    tip: 'Camiseta preta + blazer azul royal + jeans preto + chelsea: a arte de elevar o básico. A camiseta pede o blazer; o blazer pede o chelsea.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-azr-doc' },
      { cat: 'Camiseta', pieceId: 'ct-pr-mal' },
      { cat: 'Calça', pieceId: 'cl-jp-lev' },
      { cat: 'Sapato', pieceId: 'sa-mo-dem-ch' },
      { cat: 'Relógio', pieceId: 're-pr-cas-g' },
    ]
  },
  {
    id: 'l-c04', title: 'Polo Vermelha + Areia', tags: ['casual', 'diurno'], formality: 1,
    tip: 'Polo vermelha + calça areia + ankle boot camurça marrom: look de fim de semana energético e com presença. Vermelho precisa de base neutra.',
    pieces: [
      { cat: 'Polo', pieceId: 'po-vm-hi' },
      { cat: 'Calça', pieceId: 'cl-ar-doc' },
      { cat: 'Sapato', pieceId: 'sa-ma-maj-ab' },
      { cat: 'Relógio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-c05', title: 'Suéter Branco Couro', tags: ['casual', 'outono', 'inverno'], formality: 2,
    tip: 'Suéter branco + jaqueta couro marrom + sarja creme: contraste de textura em paleta neutra. Visual de editorial de moda.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-ma-jck' },
      { cat: 'Suéter', pieceId: 'su-br-ren' },
      { cat: 'Calça', pieceId: 'cl-sa-lev' },
      { cat: 'Sapato', pieceId: 'sa-ca-at' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },

  // ═══════════════════════════════════════════════════════
  // SAPATOS (18 looks — 3 por cada sapato sem looks)
  // ═══════════════════════════════════════════════════════

  // ── Derby Blaze Ultra Light Preto (Democrata) ─────────
  {
    id: 'l-sa01', title: 'Cinza Executivo com Derby', tags: ['formal'], formality: 4,
    tip: 'O Derby Blaze é leve e versátil. Com costume cinza fica sóbrio e profissional sem precisar de gravata.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ci-raf' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem' },
    ]
  },
  {
    id: 'l-sa02', title: 'Veludo Noturno Derby', tags: ['noturno', 'casual'], formality: 3,
    tip: 'Blazer veludo preto + camisa vinho + Derby Blaze = combinação sofisticada para jantar ou evento noturno.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-vpr-doc' },
      { cat: 'Camisa', pieceId: 'cs-vi-doc' },
      { cat: 'Calça', pieceId: 'cl-ch-raf' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-sa03', title: 'Jeans Urbano Derby', tags: ['casual', 'noturno'], formality: 2,
    tip: 'Derby leve + jaqueta de couro preta + jeans = look urbano com toque de alfaiataria no pé.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-pr-jck' },
      { cat: 'Camisa', pieceId: 'cs-pr-con' },
      { cat: 'Calça', pieceId: 'cl-jp-lev' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem' },
    ]
  },

  // ── Tassel Loafer Camurça Terra (CNS) ─────────────────
  {
    id: 'l-sa04', title: 'Outono Terroso Tassel', tags: ['casual', 'diurno', 'outono'], formality: 3,
    tip: 'Camurça terra do Tassel CNS dialoga perfeitamente com o tom marrom da camisa Ash. Tom sobre tom outonal.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-cr-doc' },
      { cat: 'Camisa', pieceId: 'cs-ma-ash' },
      { cat: 'Calça', pieceId: 'cl-ar-doc' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-sa05', title: 'Caramelo Verão Tassel', tags: ['formal', 'outono'], formality: 4,
    tip: 'Costume caramelo Homem SA com Tassel camurça terra — harmonia tonal entre os tons quentes é a chave do look.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ca-hsa' },
      { cat: 'Calça', pieceId: 'cl-ca-hsa' },
      { cat: 'Camisa', pieceId: 'cs-ae-doc' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-sa06', title: 'Azul Tropical Tassel', tags: ['casual', 'diurno', 'verao'], formality: 3,
    tip: 'Costume azul lã tropical com Tassel de camurça terra — contraste elegante entre azul frio e terra quente.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-az-hsa' },
      { cat: 'Calça', pieceId: 'cl-az-hsa' },
      { cat: 'Camisa', pieceId: 'cs-br-lev' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
    ]
  },

  // ── Mocassim Azul (Democrata) ──────────────────────────
  {
    id: 'l-sa07', title: 'Navy Total Mocassim', tags: ['casual', 'diurno', 'verao'], formality: 3,
    tip: 'Mocassim azul fecha o look navy total com o costume azul Homem SA. Ousado, mas coerente — azul com azul funciona.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-az-hsa' },
      { cat: 'Calça', pieceId: 'cl-az-hsa' },
      { cat: 'Camisa', pieceId: 'cs-br-lev' },
      { cat: 'Cinto', pieceId: 'ci-az-dem' },
      { cat: 'Sapato', pieceId: 'sa-az-dem' },
    ]
  },
  {
    id: 'l-sa08', title: 'Smart Casual Marinho Mocassim', tags: ['casual', 'diurno'], formality: 3,
    tip: 'Blazer azul royal + calça linho + mocassim azul. Tom análogo que cria harmonia sem monotonia.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-azr-doc' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Calça', pieceId: 'cl-ln1-doc' },
      { cat: 'Cinto', pieceId: 'ci-az-dem' },
      { cat: 'Sapato', pieceId: 'sa-az-dem' },
      { cat: 'Relógio', pieceId: 're-sa-gal' },
    ]
  },
  {
    id: 'l-sa09', title: 'Verão Colorido Mocassim', tags: ['casual', 'verao', 'diurno'], formality: 2,
    tip: 'Polo petróleo + calça linho natural + mocassim azul. Combinação relaxada com personalidade para dias quentes.',
    pieces: [
      { cat: 'Polo', pieceId: 'po-pe-fid' },
      { cat: 'Calça', pieceId: 'cl-ln1-doc' },
      { cat: 'Cinto', pieceId: 'ci-az-dem' },
      { cat: 'Sapato', pieceId: 'sa-az-dem' },
    ]
  },

  // ── Ankle Boot Marrom (Democrata) ─────────────────────
  {
    id: 'l-sa10', title: 'Layering Outono Ankle Boot', tags: ['casual', 'outono', 'inverno'], formality: 2,
    tip: 'Suéter petróleo sob blazer chumbo + ankle boot marrom. Layering funcional e estiloso para dias frios.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-ch-doc' },
      { cat: 'Suéter', pieceId: 'su-pe' },
      { cat: 'Calça', pieceId: 'cl-jp-lev' },
      { cat: 'Sapato', pieceId: 'sa-ma-dem-ab' },
    ]
  },
  {
    id: 'l-sa11', title: 'Marrom Tonal Ankle Boot', tags: ['casual', 'outono'], formality: 3,
    tip: 'Costume marrom Decinel completo com ankle boot marrom Democrata. Tom sobre tom — coerência visual total.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ma-dec' },
      { cat: 'Calça', pieceId: 'cl-ma-dec' },
      { cat: 'Camisa', pieceId: 'cs-ci-4t' },
      { cat: 'Cinto', pieceId: 'ci-ma-maj' },
      { cat: 'Sapato', pieceId: 'sa-ma-dem-ab' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-sa12', title: 'Couro Urbano Ankle Boot', tags: ['casual', 'noturno', 'inverno'], formality: 2,
    tip: 'Jaqueta de couro marrom + camisa preta + ankle boot marrom. Estética urbana com coerência na paleta escura e quente.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-ma-jck' },
      { cat: 'Camisa', pieceId: 'cs-pr-con' },
      { cat: 'Calça', pieceId: 'cl-ch-raf' },
      { cat: 'Cinto', pieceId: 'ci-ma-maj' },
      { cat: 'Sapato', pieceId: 'sa-ma-dem-ab' },
    ]
  },

  // ── Bota Social Bernardo Café (Majorano) ──────────────
  {
    id: 'l-sa13', title: 'Executivo Outono Bota Café', tags: ['formal', 'outono'], formality: 4,
    tip: 'Costume caramelo + bota social café Majorano — harmonia de tons quentes. A bota adiciona personalidade ao look executivo.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ca-hsa' },
      { cat: 'Calça', pieceId: 'cl-ca-hsa' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Cinto', pieceId: 'ci-ca-maj' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-bs' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-sa14', title: 'Smart Casual Linho Bota', tags: ['casual', 'diurno'], formality: 3,
    tip: 'Blazer creme + camisa azul bebê + calça linho + bota café. Combinação clássica smart casual com um toque de personalidade.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-cr-doc' },
      { cat: 'Camisa', pieceId: 'cs-ab-brk' },
      { cat: 'Calça', pieceId: 'cl-ln1-doc' },
      { cat: 'Cinto', pieceId: 'ci-ca-maj' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-bs' },
    ]
  },
  {
    id: 'l-sa15', title: 'Formal Inverno Bota', tags: ['formal', 'inverno'], formality: 5,
    tip: 'Terno vinho Raffer + camisa branca + gravata bordô + bota café — combinação de poder para o inverno formal.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-vi-raf' },
      { cat: 'Camisa', pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-bv' },
      { cat: 'Cinto', pieceId: 'ci-bu-at' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-bs' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },

  // ── Morelli Branco (Majorano) ──────────────────────────
  {
    id: 'l-sa16', title: 'Linho Areia Branco', tags: ['casual', 'diurno', 'verao'], formality: 4,
    tip: 'Terno linho areia + sapato branco Morelli — combinação clássica de verão. O branco do sapato ilumina toda a base do look.',
    pieces: [
      { cat: 'Terno', pieceId: 'te-ar-hsa-b' },
      { cat: 'Calça', pieceId: 'te-ar-hsa-c' },
      { cat: 'Camisa', pieceId: 'cs-br-lev' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Sapato', pieceId: 'sa-br-maj' },
    ]
  },
  {
    id: 'l-sa17', title: 'Verde Verão Branco', tags: ['casual', 'diurno', 'verao'], formality: 3,
    tip: 'Costume verde linho Zara + sapato branco — frescor de verão total. O branco contrasta e abre o look.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-lv-zar' },
      { cat: 'Calça', pieceId: 'cl-lv-zar' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Cinto', pieceId: 'ci-ve-maj' },
      { cat: 'Sapato', pieceId: 'sa-br-maj' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-sa18', title: 'Polo Casual Branco', tags: ['casual', 'diurno', 'verao'], formality: 1,
    tip: 'Polo creme + calça linho + Morelli branco. O look mais descomplicado possível — leve, limpo e elegante para o verão.',
    pieces: [
      { cat: 'Polo', pieceId: 'po-cr' },
      { cat: 'Calça', pieceId: 'cl-ln1-doc' },
      { cat: 'Sapato', pieceId: 'sa-br-maj' },
    ]
  },

  // ═══════════════════════════════════════════════════════
  // CAMISETAS (9 looks — 3 por cada camiseta sem looks)
  // ═══════════════════════════════════════════════════════

  // ── Camisa Malha Marinho (Guillermo) ──────────────────
  {
    id: 'l-ct01', title: 'Blazer Azul Royal Malha', tags: ['casual', 'diurno'], formality: 3,
    tip: 'Camisa malha marinho Guillermo + blazer azul royal cria um look navy coerente sem ser óbvio. Malha é mais casual, mas o blazer eleva.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-azr-doc' },
      { cat: 'Camiseta', pieceId: 'ct-mn-gui' },
      { cat: 'Calça', pieceId: 'cl-azr-doc' },
      { cat: 'Cinto', pieceId: 'ci-az-dem' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-lo' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-ct02', title: 'Linho Casual Malha Marinho', tags: ['casual', 'diurno'], formality: 1,
    tip: 'Camisa malha + calça linho — simplicidade intencional. O contraste de texturas (malha vs. linho) cria interesse visual sem esforço.',
    pieces: [
      { cat: 'Camiseta', pieceId: 'ct-mn-gui' },
      { cat: 'Calça', pieceId: 'cl-ln1-doc' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-lo' },
    ]
  },
  {
    id: 'l-ct03', title: 'Noturno Jeans Malha', tags: ['noturno', 'casual'], formality: 2,
    tip: 'Blazer preto + camisa malha marinho + jeans + Chelsea. Look noturno com toque de sofisticação mantendo o casual.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-pr-doc' },
      { cat: 'Camiseta', pieceId: 'ct-mn-gui' },
      { cat: 'Calça', pieceId: 'cl-jp-lev' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
    ]
  },

  // ── Camiseta Básica Pima Branco (Individual) ──────────
  {
    id: 'l-ct04', title: 'Clean Casual Branco Verão', tags: ['casual', 'diurno', 'verao'], formality: 1,
    tip: 'Camiseta branca Pima + calça areia + sapato branco — minimalismo total. A combinação mais limpa e fresca do verão.',
    pieces: [
      { cat: 'Camiseta', pieceId: 'ct-br-ind' },
      { cat: 'Calça', pieceId: 'cl-ar-doc' },
      { cat: 'Sapato', pieceId: 'sa-br-maj' },
    ]
  },
  {
    id: 'l-ct05', title: 'Blazer Creme Camiseta Branca', tags: ['casual', 'diurno'], formality: 2,
    tip: 'Camiseta branca + blazer creme + calça linho. O segredo é a qualidade do tecido da camiseta Pima — ela aguenta estar com blazer.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-cr-doc' },
      { cat: 'Camiseta', pieceId: 'ct-br-ind' },
      { cat: 'Calça', pieceId: 'cl-ln1-doc' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
    ]
  },
  {
    id: 'l-ct06', title: 'Street Smart Bege', tags: ['casual', 'diurno'], formality: 2,
    tip: 'Jaqueta bege Safira + camiseta branca + jeans preto. Contraste claro-escuro com a jaqueta como protagonista.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-be-saf' },
      { cat: 'Camiseta', pieceId: 'ct-br-ind' },
      { cat: 'Calça', pieceId: 'cl-jp-lev' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem' },
    ]
  },

  // ── Camiseta Básica Pima Marinho (Individual) ─────────
  {
    id: 'l-ct07', title: 'Minimal Navy Pima', tags: ['casual'], formality: 1,
    tip: 'Camiseta marinho + calça malha preta + loafer. Minimal absoluto — a qualidade Pima sustenta o look sem precisar de mais nada.',
    pieces: [
      { cat: 'Camiseta', pieceId: 'ct-mn-ind' },
      { cat: 'Calça', pieceId: 'cl-pr-doc' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-lo' },
    ]
  },
  {
    id: 'l-ct08', title: 'Blazer Chumbo Camiseta Navy', tags: ['casual', 'diurno'], formality: 2,
    tip: 'Camiseta marinho + blazer chumbo + calça chumbo. Paleta escura e fria com coerência — o marinho da camiseta é o acento de cor.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-ch-doc' },
      { cat: 'Camiseta', pieceId: 'ct-mn-ind' },
      { cat: 'Calça', pieceId: 'cl-ch-raf' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem' },
    ]
  },
  {
    id: 'l-ct09', title: 'Couro Urbano Marinho', tags: ['casual', 'noturno'], formality: 2,
    tip: 'Jaqueta de couro preta + camiseta marinho + jeans + coturno. Look urbano com atitude — o marinho suaviza o preto do couro.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-pr-jck' },
      { cat: 'Camiseta', pieceId: 'ct-mn-ind' },
      { cat: 'Calça', pieceId: 'cl-jp-lev' },
      { cat: 'Sapato', pieceId: 'sa-pr-mrc' },
    ]
  },

  // ═══════════════════════════════════════════════════════
  // CALÇAS (9 looks — 3 por cada calça sem looks)
  // ═══════════════════════════════════════════════════════

  // ── Lã Tropical 120 Azul (Homem SA) ──────────────────
  {
    id: 'l-cl01', title: 'Conjunto Navy Executivo', tags: ['formal'], formality: 5,
    tip: 'Costume azul completo Homem SA + camisa branca punho francês + gravata azul seda. O poder do navy total — imbatível em reuniões formais.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-az-hsa' },
      { cat: 'Calça', pieceId: 'cl-az-hsa' },
      { cat: 'Camisa', pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-as' },
      { cat: 'Cinto', pieceId: 'ci-az-dem' },
      { cat: 'Sapato', pieceId: 'sa-mn-maj' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-cl02', title: 'Navy sem Gravata', tags: ['formal', 'casual'], formality: 4,
    tip: 'Costume azul sem gravata + camisa azul bebê + sapato tan. Sofisticado e acessível — o azul sobre azul é elegante quando os tons são diferentes.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-az-hsa' },
      { cat: 'Calça', pieceId: 'cl-az-hsa' },
      { cat: 'Camisa', pieceId: 'cs-ab-brk' },
      { cat: 'Cinto', pieceId: 'ci-az-dem' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
    ]
  },
  {
    id: 'l-cl03', title: 'Separates Azul Blazer', tags: ['casual', 'diurno'], formality: 3,
    tip: 'Calça azul Homem SA + blazer azul royal Docthos — tonal não precisa ser idêntico. Combinado com Oxford preto para contraste.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-azr-doc' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Calça', pieceId: 'cl-az-hsa' },
      { cat: 'Cinto', pieceId: 'ci-az-dem' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
    ]
  },

  // ── Linho Natural II (Docthos) ────────────────────────
  {
    id: 'l-cl04', title: 'Verão Linho Blazer Creme', tags: ['casual', 'diurno', 'verao'], formality: 3,
    tip: 'Blazer creme + camisa branca leve + calça linho natural — paleta areia total. Elegância de verão sem esforço.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-cr-doc' },
      { cat: 'Camisa', pieceId: 'cs-br-lev' },
      { cat: 'Calça', pieceId: 'cl-ln2-doc' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
    ]
  },
  {
    id: 'l-cl05', title: 'Casual Linho Azul', tags: ['casual', 'diurno'], formality: 2,
    tip: 'Camisa azul + calça linho natural + penny loafer café. O linho natural equilibra o azul da camisa com leveza.',
    pieces: [
      { cat: 'Camisa', pieceId: 'cs-az-fid' },
      { cat: 'Calça', pieceId: 'cl-ln2-doc' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-pl' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-cl06', title: 'Verde Linho Natural', tags: ['casual', 'diurno', 'verao'], formality: 3,
    tip: 'Costume verde linho Zara + camisa branca leve + calça linho natural. Mistura de linhos com cores neutras — verão descomplicado.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-lv-zar' },
      { cat: 'Camisa', pieceId: 'cs-br-lev' },
      { cat: 'Calça', pieceId: 'cl-ln2-doc' },
      { cat: 'Sapato', pieceId: 'sa-br-maj' },
    ]
  },

  // ── Lã 180 Chumbo (Zegna) ─────────────────────────────
  {
    id: 'l-cl07', title: 'Zegna Completo Inverno', tags: ['formal', 'inverno'], formality: 5,
    tip: 'Costume chumbo Zegna Lã 180 completo + camisa branca + gravata marrom. Este é o look de maior prestígio do guarda-roupa — reserve para as ocasiões que merecem.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ch-zeg' },
      { cat: 'Calça', pieceId: 'cl-ch-zeg' },
      { cat: 'Camisa', pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-mm-df' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-cl08', title: 'Zegna Separates Blazer', tags: ['formal', 'casual'], formality: 4,
    tip: 'Calça Zegna chumbo + blazer azul royal — contraste frio entre os dois. A qualidade da calça eleva qualquer blazer que estiver com ela.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-azr-doc' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Calça', pieceId: 'cl-ch-zeg' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Sapato', pieceId: 'sa-pr-lou' },
    ]
  },
  {
    id: 'l-cl09', title: 'Overcoat Zegna Inverno', tags: ['casual', 'inverno'], formality: 3,
    tip: 'Overcoat + suéter preto + calça Zegna chumbo + Oxford preto. A calça Lã 180 faz o layering de inverno se sustentar com classe.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-pr-raf' },
      { cat: 'Suéter', pieceId: 'su-pr1' },
      { cat: 'Calça', pieceId: 'cl-ch-zeg' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },

  // ═══════════════════════════════════════════════════════
  // JAQUETA (3 looks — Casaco Poliéster Preto Docthos)
  // ═══════════════════════════════════════════════════════
  {
    id: 'l-ja01', title: 'Casaco Urbano Inverno', tags: ['casual', 'inverno'], formality: 2,
    tip: 'Casaco poliéster preto Docthos + suéter preto + calça chumbo. Monocromático total — quando a paleta é coesa, o look funciona mesmo sem cor.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-pr-doc' },
      { cat: 'Suéter', pieceId: 'su-pr1' },
      { cat: 'Calça', pieceId: 'cl-ch-raf' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem' },
    ]
  },
  {
    id: 'l-ja02', title: 'Casaco sobre Blazer Inverno', tags: ['casual', 'inverno'], formality: 2,
    tip: 'Casaco poliéster preto sobre blazer chumbo + camisa cinza + jeans. Layering máximo para dias muito frios — o casaco é a camada externa funcional.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-pr-doc' },
      { cat: 'Blazer', pieceId: 'bl-ch-doc' },
      { cat: 'Camisa', pieceId: 'cs-ci-4t' },
      { cat: 'Calça', pieceId: 'cl-jp-lev' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
    ]
  },
  {
    id: 'l-ja03', title: 'Casaco Noturno Elegante', tags: ['noturno', 'casual', 'inverno'], formality: 3,
    tip: 'Casaco preto + camisa vinho + calça alfaiataria chumbo. O casaco poliéster é mais casual, mas a combinação abaixo o eleva para o noturno.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-pr-doc' },
      { cat: 'Camisa', pieceId: 'cs-vi-doc' },
      { cat: 'Calça', pieceId: 'cl-ch-raf' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Sapato', pieceId: 'sa-pr-lou' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },

  // ═══════════════════════════════════════════════════════
  // SUÉTER (3 looks — Suéter Preto II)
  // ═══════════════════════════════════════════════════════
  {
    id: 'l-su01', title: 'Blazer Layering Suéter II', tags: ['casual', 'inverno'], formality: 3,
    tip: 'Suéter Preto II sob blazer chumbo + calça alfaiataria + Oxford preto. Layering de inverno com elegância — o suéter adiciona textura e calor.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-ch-doc' },
      { cat: 'Suéter', pieceId: 'su-pr2' },
      { cat: 'Calça', pieceId: 'cl-ch-raf' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-su02', title: 'Smart Casual Suéter Preto', tags: ['casual', 'noturno'], formality: 2,
    tip: 'Suéter preto + calça malha preta + Chelsea. Monocromático escuro com altura de look noturno casual — limpo e direto.',
    pieces: [
      { cat: 'Suéter', pieceId: 'su-pr2' },
      { cat: 'Calça', pieceId: 'cl-pr-doc' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
      { cat: 'Relógio', pieceId: 're-pr-cas-g' },
    ]
  },
  {
    id: 'l-su03', title: 'Overcoat Suéter Preto Zegna', tags: ['casual', 'inverno'], formality: 3,
    tip: 'Overcoat Raffer + Suéter Preto II + calça Zegna chumbo. O trifecta do inverno elegante — três peças premium em paleta escura coesa.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-pr-raf' },
      { cat: 'Suéter', pieceId: 'su-pr2' },
      { cat: 'Calça', pieceId: 'cl-ch-zeg' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
    ]
  },

  // ═══════════════════════════════════════════════════════
  // CINTOS (9 looks — 3 por cada cinto sem looks)
  // ═══════════════════════════════════════════════════════

  // ── Cinto Azul (Democrata) ────────────────────────────
  {
    id: 'l-ci01', title: 'Navy Total Cinto Azul', tags: ['casual', 'diurno', 'verao'], formality: 3,
    tip: 'Cinto azul fecha o look navy de forma coesa. Quando sapato, cinto e roupa seguem a mesma família de cor, o resultado é intencional e sofisticado.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-az-hsa' },
      { cat: 'Calça', pieceId: 'cl-az-hsa' },
      { cat: 'Camisa', pieceId: 'cs-br-lev' },
      { cat: 'Cinto', pieceId: 'ci-az-dem' },
      { cat: 'Sapato', pieceId: 'sa-az-dem' },
    ]
  },
  {
    id: 'l-ci02', title: 'Smart Casual Cinto Azul', tags: ['casual', 'diurno'], formality: 3,
    tip: 'Blazer azul royal + calça areia + cinto azul + sapato marinho. O cinto azul conecta a família navy do blazer com o sapato marinho.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-azr-doc' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Calça', pieceId: 'cl-ar-doc' },
      { cat: 'Cinto', pieceId: 'ci-az-dem' },
      { cat: 'Sapato', pieceId: 'sa-mn-maj' },
      { cat: 'Relógio', pieceId: 're-sa-gal' },
    ]
  },
  {
    id: 'l-ci03', title: 'Polo Petróleo Cinto Azul', tags: ['casual', 'diurno', 'verao'], formality: 2,
    tip: 'Polo petróleo + calça linho + cinto azul. Analógo de frios (petróleo + azul) com o linho natural equilibrando — casual perfeito.',
    pieces: [
      { cat: 'Polo', pieceId: 'po-pe-fid' },
      { cat: 'Calça', pieceId: 'cl-ln1-doc' },
      { cat: 'Cinto', pieceId: 'ci-az-dem' },
      { cat: 'Sapato', pieceId: 'sa-az-dem' },
    ]
  },

  // ── Cinto Preto + Marrom ──────────────────────────────
  {
    id: 'l-ci04', title: 'Veludo Noturno Cinto Versátil', tags: ['noturno', 'casual'], formality: 3,
    tip: 'Blazer veludo preto + camisa vinho + cinto preto+marrom. O cinto bicolor é perfeito quando o look mistura escuros quentes e frios.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-vpr-doc' },
      { cat: 'Camisa', pieceId: 'cs-vi-doc' },
      { cat: 'Calça', pieceId: 'cl-ch-raf' },
      { cat: 'Cinto', pieceId: 'ci-pm' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-ci05', title: 'Weekend Smart Cinto Bicolor', tags: ['casual', 'diurno'], formality: 2,
    tip: 'Blazer chumbo + malha marinho + jeans + ankle boot marrom. O cinto preto+marrom une os dois universos — preto do blazer e marrom do boot.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-ch-doc' },
      { cat: 'Camiseta', pieceId: 'ct-mn-gui' },
      { cat: 'Calça', pieceId: 'cl-jp-lev' },
      { cat: 'Cinto', pieceId: 'ci-pm' },
      { cat: 'Sapato', pieceId: 'sa-ma-dem-ab' },
    ]
  },
  {
    id: 'l-ci06', title: 'Business Casual Cinto Bicolor', tags: ['formal', 'casual'], formality: 3,
    tip: 'Costume cinza + camisa preta tech + cinto bicolor. Sem gravata o look pede um cinto que faça o trabalho de detalhe — o bicolor entrega.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ci-raf' },
      { cat: 'Camisa', pieceId: 'cs-pt-doc' },
      { cat: 'Calça', pieceId: 'cl-ch-raf' },
      { cat: 'Cinto', pieceId: 'ci-pm' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-mk' },
    ]
  },

  // ── Cinto Floater Café (Majorano) ─────────────────────
  {
    id: 'l-ci07', title: 'Outono Caramelo Cinto Café', tags: ['formal', 'outono'], formality: 4,
    tip: 'Costume caramelo + camisa azul bebê + cinto floater café + bota social café. Harmonia tonal quente com azul bebê como contraste refrescante.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ca-hsa' },
      { cat: 'Calça', pieceId: 'cl-ca-hsa' },
      { cat: 'Camisa', pieceId: 'cs-ab-brk' },
      { cat: 'Cinto', pieceId: 'ci-ca-maj' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-bs' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-ci08', title: 'Smart Casual Linho Cinto Café', tags: ['casual', 'diurno', 'outono'], formality: 3,
    tip: 'Blazer creme + camisa marrom + calça linho + cinto café floater. O floater de couro Majorano é discreto — mas de perto, quem entende, nota.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-cr-doc' },
      { cat: 'Camisa', pieceId: 'cs-ma-ash' },
      { cat: 'Calça', pieceId: 'cl-ln1-doc' },
      { cat: 'Cinto', pieceId: 'ci-ca-maj' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
    ]
  },
  {
    id: 'l-ci09', title: 'Polo Creme Cinto Café', tags: ['casual', 'diurno'], formality: 2,
    tip: 'Polo creme + calça areia + cinto café + sapato tan. Paleta total de neutros quentes — impecável para um almoço casual sofisticado.',
    pieces: [
      { cat: 'Polo', pieceId: 'po-cr' },
      { cat: 'Calça', pieceId: 'cl-ar-doc' },
      { cat: 'Cinto', pieceId: 'ci-ca-maj' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
    ]
  },

  // ═══════════════════════════════════════════════════════
  // ACESSÓRIOS (9 looks — 3 por cada acessório sem looks)
  // ═══════════════════════════════════════════════════════

  // ── Boina Cinza ───────────────────────────────────────
  {
    id: 'l-ac01', title: 'Intelectual Urbano Boina', tags: ['casual', 'inverno', 'outono'], formality: 3,
    tip: 'Overcoat + suéter petróleo + calça alfaiataria + boina cinza. A boina adiciona uma camada de personalidade que nenhuma gravata consegue — use com confiança.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-pr-raf' },
      { cat: 'Suéter', pieceId: 'su-pe' },
      { cat: 'Calça', pieceId: 'cl-ch-raf' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
      { cat: 'Acessório', pieceId: 'ac-ci-boi' },
    ]
  },
  {
    id: 'l-ac02', title: 'Artsy Smart Boina', tags: ['casual', 'diurno'], formality: 2,
    tip: 'Blazer chumbo + camisa azul escura + calça linho + boina cinza. Intelectual sem esforço — a boina muda completamente a vibe do look.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-ch-doc' },
      { cat: 'Camisa', pieceId: 'cs-ae-doc' },
      { cat: 'Calça', pieceId: 'cl-ln1-doc' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem' },
      { cat: 'Acessório', pieceId: 'ac-ci-boi' },
    ]
  },
  {
    id: 'l-ac03', title: 'Outono Tonal Boina', tags: ['casual', 'outono'], formality: 3,
    tip: 'Costume marrom + camisa cinza + boina cinza. A boina cinza fecha o loop tonal com a camisa — detalhe que mostra cuidado com o look.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ma-dec' },
      { cat: 'Calça', pieceId: 'cl-ma-dec' },
      { cat: 'Camisa', pieceId: 'cs-ci-4t' },
      { cat: 'Cinto', pieceId: 'ci-ma-maj' },
      { cat: 'Sapato', pieceId: 'sa-ma-dud' },
      { cat: 'Acessório', pieceId: 'ac-ci-boi' },
    ]
  },

  // ── Cachecol Flanela Azul (Docthos) ──────────────────
  {
    id: 'l-ac04', title: 'Sobretudo com Cachecol Azul', tags: ['casual', 'inverno'], formality: 3,
    tip: 'Sobretudo cinza Homem SA + suéter preto + cachecol flanela azul. O azul do cachecol é o único ponto de cor — e é suficiente.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-ci-hsa' },
      { cat: 'Suéter', pieceId: 'su-pr1' },
      { cat: 'Calça', pieceId: 'cl-ch-zeg' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
      { cat: 'Acessório', pieceId: 'ac-az-cac' },
    ]
  },
  {
    id: 'l-ac05', title: 'Couro e Cachecol Azul', tags: ['casual', 'noturno', 'inverno'], formality: 2,
    tip: 'Jaqueta de couro preta + camisa azul escura + cachecol azul. O cachecol em flanela conecta a camisa ao conjunto — layering intuitivo.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-pr-jck' },
      { cat: 'Camisa', pieceId: 'cs-ae-doc' },
      { cat: 'Calça', pieceId: 'cl-jp-lev' },
      { cat: 'Sapato', pieceId: 'sa-pr-mrc' },
      { cat: 'Acessório', pieceId: 'ac-az-cac' },
    ]
  },
  {
    id: 'l-ac06', title: 'Casaco Blazer Cachecol', tags: ['casual', 'inverno'], formality: 3,
    tip: 'Casaco preto + blazer azul royal + camisa branca + cachecol azul. Layering máximo onde o cachecol conecta o azul do blazer com a paleta geral.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-pr-doc' },
      { cat: 'Blazer', pieceId: 'bl-azr-doc' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Calça', pieceId: 'cl-ch-raf' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Sapato', pieceId: 'sa-pr-lou' },
      { cat: 'Acessório', pieceId: 'ac-az-cac' },
    ]
  },

  // ── Lenço Preto (Homem SA) ────────────────────────────
  {
    id: 'l-ac07', title: 'Formal com Lenço Preto', tags: ['formal'], formality: 5,
    tip: 'Costume cinza + gravata inglesa + lenço preto no bolsinho. O lenço de bolso é o detalhe A+ — eleva qualquer terno sem custo.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ci-raf' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Gravata', pieceId: 'gr-ing-dud' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
      { cat: 'Acessório', pieceId: 'ac-pr-len' },
    ]
  },
  {
    id: 'l-ac08', title: 'Terno Linho com Lenço', tags: ['formal'], formality: 4,
    tip: 'Terno linho areia + lenço preto no bolso. O contraste do lenço escuro com o terno claro cria o ponto focal perfeito.',
    pieces: [
      { cat: 'Terno', pieceId: 'te-ar-hsa-b' },
      { cat: 'Calça', pieceId: 'te-ar-hsa-c' },
      { cat: 'Camisa', pieceId: 'cs-br-lev' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Acessório', pieceId: 'ac-pr-len' },
    ]
  },
  {
    id: 'l-ac09', title: 'Noturno Veludo Lenço Preto', tags: ['noturno', 'formal'], formality: 4,
    tip: 'Blazer veludo preto + camisa preta + lenço preto. Monocromático com o lenço como único elemento de textura — sofisticação máxima.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-vpr-doc' },
      { cat: 'Camisa', pieceId: 'cs-pr-con' },
      { cat: 'Calça', pieceId: 'cl-ch-raf' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Sapato', pieceId: 'sa-pr-lou' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
      { cat: 'Acessório', pieceId: 'ac-pr-len' },
    ]
  },

  // ═══════════════════════════════════════════════════════
  // COLETE LINHO AREIA — Homem SA (6 looks)
  // ═══════════════════════════════════════════════════════

  // ── Colete + Blazer (3 Peças) com variações ───────────
  {
    id: 'l-cv01', title: 'Terno Areia 3 Peças com Gravata', tags: ['formal', 'diurno', 'verao'], formality: 5,
    tip: 'O 3 peças com gravata é o auge da formalidade de verão. Gravata verde bandeira sobre linho areia é combinação de casamento de dia — memorável.',
    pieces: [
      { cat: 'Terno', pieceId: 'te-ar-hsa-b' },
      { cat: 'Calça', pieceId: 'te-ar-hsa-c' },
      { cat: 'Colete', pieceId: 'te-ar-hsa-v' },
      { cat: 'Camisa', pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-vb-df' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-cv02', title: 'Terno Areia 3 Peças Gravata Azul', tags: ['formal', 'diurno'], formality: 5,
    tip: 'Terno areia 3 peças com gravata azul seda — elegância executiva de verão. O azul da gravata dialoga com o azul do Seiko no pulso.',
    pieces: [
      { cat: 'Terno', pieceId: 'te-ar-hsa-b' },
      { cat: 'Calça', pieceId: 'te-ar-hsa-c' },
      { cat: 'Colete', pieceId: 'te-ar-hsa-v' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Gravata', pieceId: 'gr-as' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-be' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },

  // ── Colete sem Blazer — o look mais interessante ──────
  {
    id: 'l-cv03', title: 'Colete sem Blazer + Gravata', tags: ['formal', 'diurno', 'verao'], formality: 4,
    tip: 'Colete sem blazer com gravata é o look de alfaiataria com mais personalidade. Vê-se as mangas da camisa — propose vulnerabilidade elegante. Camisa branca punho francês é obrigatória aqui.',
    pieces: [
      { cat: 'Colete', pieceId: 'te-ar-hsa-v' },
      { cat: 'Calça', pieceId: 'te-ar-hsa-c' },
      { cat: 'Camisa', pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-as' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-cv04', title: 'Colete sem Blazer Smart Casual', tags: ['casual', 'diurno', 'verao'], formality: 3,
    tip: 'Colete linho areia + calça combinando + camisa azul bebê, sem gravata. Look de alfaiataria relaxado — formal o suficiente para almoço de negócios, casual o suficiente para um sábado.',
    pieces: [
      { cat: 'Colete', pieceId: 'te-ar-hsa-v' },
      { cat: 'Calça', pieceId: 'te-ar-hsa-c' },
      { cat: 'Camisa', pieceId: 'cs-ab-brk' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-cv05', title: 'Colete sem Blazer Rosa Listrada', tags: ['casual', 'diurno', 'primavera'], formality: 3,
    tip: 'Colete areia + camisa rosa listrada Homem SA: o areia aquece o rosa sem sufocar. Sem gravata, o colete vira um acessório estrutural que eleva a camisa casual.',
    pieces: [
      { cat: 'Colete', pieceId: 'te-ar-hsa-v' },
      { cat: 'Calça', pieceId: 'te-ar-hsa-c' },
      { cat: 'Camisa', pieceId: 'cs-rli-hsa' },
      { cat: 'Sapato', pieceId: 'sa-br-maj' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-cv06', title: 'Colete sem Blazer Azul Escuro', tags: ['casual', 'diurno', 'verao'], formality: 3,
    tip: 'Colete areia claro + camisa azul escura = contraste de luminosidade com coerência de tom frio-quente. O colete clareia o look todo sem perder seriedade.',
    pieces: [
      { cat: 'Colete', pieceId: 'te-ar-hsa-v' },
      { cat: 'Calça', pieceId: 'te-ar-hsa-c' },
      { cat: 'Camisa', pieceId: 'cs-ae-doc' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relógio', pieceId: 're-az-sei' },
    ]
  },

  // LOOKS ADICIONAIS PARA COBERTURA DE COMBINACOES
  {
    id: 'l-ot01', title: 'Caramelo Executivo Outono', tags: ['formal', 'diurno', 'outono'], formality: 4,
    tip: 'O costume caramelo e sua ancora de outono. Camisa branca, gravata mocha e sapato cafe criam paleta terrosa impecavel.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ca-hsa' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Gravata', pieceId: 'gr-mm-df' },
      { cat: 'Sapato', pieceId: 'sa-ca-at' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-ot02', title: 'Vinho com Gravata Bordo', tags: ['formal', 'diurno', 'outono'], formality: 5,
    tip: 'Terno vinho com gravata bordo: look tonal profundo que transmite autoridade. Reserve para reunioes de alto impacto.',
    pieces: [
      { cat: 'Terno', pieceId: 'co-vi-raf' },
      { cat: 'Camisa', pieceId: 'cs-br-lev' },
      { cat: 'Gravata', pieceId: 'gr-bv' },
      { cat: 'Sapato', pieceId: 'sa-bu-at' },
      { cat: 'Cinto', pieceId: 'ci-bu-at' },
      { cat: 'Relogio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-ot03', title: 'Decinel Marrom Executivo', tags: ['formal', 'diurno', 'outono'], formality: 5,
    tip: 'Costume marrom Decinel com gravata mocha: sofisticacao tonal para o outono. Sapato cafe completa a paleta terrosa.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ma-dec' },
      { cat: 'Camisa', pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-mm-df' },
      { cat: 'Sapato', pieceId: 'sa-ca-at' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-ot04', title: 'Chumbo Outonal com Camisa Marrom', tags: ['formal', 'diurno', 'outono'], formality: 4,
    tip: 'Blazer chumbo com calca alfaiataria e camisa marrom: o chumbo frio equilibra o calor do marrom outonal.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-ch-doc' },
      { cat: 'Calca', pieceId: 'cl-ch-raf' },
      { cat: 'Camisa', pieceId: 'cs-ma-ash' },
      { cat: 'Gravata', pieceId: 'gr-ing-dud' },
      { cat: 'Sapato', pieceId: 'sa-ca-at' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-ot05', title: 'Zegna Chumbo Outonal', tags: ['formal', 'diurno', 'outono'], formality: 5,
    tip: 'O Zegna la 180 no outono esta no seu elemento. Camisa azul escura e gravata verde oliva: paleta fria com acento outonal.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ch-zeg' },
      { cat: 'Camisa', pieceId: 'cs-ae-doc' },
      { cat: 'Gravata', pieceId: 'gr-vo-df' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-ot06', title: 'Veludo Preto Outono Diurno', tags: ['formal', 'diurno', 'outono'], formality: 4,
    tip: 'Blazer veludo preto com calca la marrom: outono em texturas. Camisa rosa listrada adiciona personalidade ao look.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-vpr-doc' },
      { cat: 'Calca', pieceId: 'cl-ma-dec' },
      { cat: 'Camisa', pieceId: 'cs-rli-hsa' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-ot07', title: 'Caramelo Casual Dia Outono', tags: ['casual', 'diurno', 'outono'], formality: 2,
    tip: 'Blazer creme com calca caramelo e polo petroleo: paleta outonal quente em smart casual refinado.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-cr-doc' },
      { cat: 'Calca', pieceId: 'cl-ca-hsa' },
      { cat: 'Polo', pieceId: 'po-pe-fid' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
      { cat: 'Cinto', pieceId: 'ci-ma-maj' },
      { cat: 'Relogio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-ot08', title: 'Chumbo e Jeans Outono Casual', tags: ['casual', 'diurno', 'outono'], formality: 2,
    tip: 'Blazer chumbo sobre jeans preto com camisa marrom: o tom terroso da camisa aquece o look urbano do chumbo.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-ch-doc' },
      { cat: 'Calca', pieceId: 'cl-jp-lev' },
      { cat: 'Camisa', pieceId: 'cs-ma-ash' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-lo' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relogio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-ot09', title: 'Sueter Petroleo Outonal', tags: ['casual', 'diurno', 'outono'], formality: 2,
    tip: 'Sueter petroleo com calca alfaiataria chumbo: look minimal de outono com sofisticacao sem esforco.',
    pieces: [
      { cat: 'Sueter', pieceId: 'su-pe' },
      { cat: 'Calca', pieceId: 'cl-ch-raf' },
      { cat: 'Sapato', pieceId: 'sa-mo-dem-ch' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relogio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-on01', title: 'Jantar Caramelo Outono', tags: ['formal', 'noturno', 'outono'], formality: 4,
    tip: 'Costume caramelo no jantar de outono: calor e elegancia em harmonia. Gravata mocha cria profundidade tonal a luz das velas.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ca-hsa' },
      { cat: 'Camisa', pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-mm-df' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relogio', pieceId: 're-do-tec' },
    ]
  },
  {
    id: 'l-on02', title: 'Vinho Noturno Premium', tags: ['formal', 'noturno', 'outono'], formality: 5,
    tip: 'Terno vinho sem gravata para jantar elegante: a cor ja faz todo o trabalho. Sapato burgundy e relogio dourado elevam ainda mais.',
    pieces: [
      { cat: 'Terno', pieceId: 'co-vi-raf' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Sapato', pieceId: 'sa-bu-at' },
      { cat: 'Cinto', pieceId: 'ci-bu-at' },
      { cat: 'Relogio', pieceId: 're-do-tec' },
    ]
  },
  {
    id: 'l-on03', title: 'Marrom e Azul Noite Outono', tags: ['formal', 'noturno', 'outono'], formality: 5,
    tip: 'Costume marrom Decinel com camisa azul bebe: contraste requintado que brilha na iluminacao noturna de outono.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ma-dec' },
      { cat: 'Camisa', pieceId: 'cs-ab-brk' },
      { cat: 'Gravata', pieceId: 'gr-xcm-df' },
      { cat: 'Sapato', pieceId: 'sa-ca-at' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-on04', title: 'Blazer Chumbo Jantar Outono', tags: ['formal', 'noturno', 'outono'], formality: 4,
    tip: 'Blazer chumbo slim com camisa azul listrada: look de jantar que equilibra estrutura e personalidade no outono noturno.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-ch-doc' },
      { cat: 'Calca', pieceId: 'cl-ch-raf' },
      { cat: 'Camisa', pieceId: 'cs-ali-doc' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relogio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-on05', title: 'Veludo Noturno Outonal', tags: ['formal', 'noturno', 'outono'], formality: 4,
    tip: 'Blazer veludo preto sobre calca marrom la: a textura do veludo e perfeita para o frescor do outono noturno.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-vpr-doc' },
      { cat: 'Calca', pieceId: 'cl-ma-dec' },
      { cat: 'Camisa', pieceId: 'cs-br-doc' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-on06', title: 'Cinza Raffer Bordo Noite', tags: ['formal', 'noturno', 'outono'], formality: 4,
    tip: 'Costume cinza Raffer com gravata bordo vinho: a gravata aquece o cinza frio e cria tom perfeito para o outono noturno.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ci-raf' },
      { cat: 'Camisa', pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-bv' },
      { cat: 'Sapato', pieceId: 'sa-bu-at' },
      { cat: 'Cinto', pieceId: 'ci-bu-at' },
      { cat: 'Relogio', pieceId: 're-do-tec' },
    ]
  },
  {
    id: 'l-on07', title: 'Blazer Preto Saida Outono', tags: ['casual', 'noturno', 'outono'], formality: 3,
    tip: 'Blazer preto + calca alfaiataria chumbo + camisa vinho: paleta outonal escura e elegante para bares e jantares casuais.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-pr-doc' },
      { cat: 'Calca', pieceId: 'cl-ch-raf' },
      { cat: 'Camisa', pieceId: 'cs-vi-doc' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-lo' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relogio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-on08', title: 'Caramelo Noite Casual Outono', tags: ['casual', 'noturno', 'outono'], formality: 2,
    tip: 'Blazer creme + calca caramelo + polo verde: look de outono descontraido para saidas informais.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-cr-doc' },
      { cat: 'Calca', pieceId: 'cl-ca-hsa' },
      { cat: 'Polo', pieceId: 'po-ve-fid' },
      { cat: 'Sapato', pieceId: 'sa-ma-dem-ab' },
      { cat: 'Cinto', pieceId: 'ci-ma-maj' },
      { cat: 'Relogio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-on09', title: 'Sueter Gola Alta Outono Noite', tags: ['casual', 'noturno', 'outono'], formality: 2,
    tip: 'Sueter gola alta preto com calca marrom e bota chelsea: minimalismo outonal de alto impacto noturno.',
    pieces: [
      { cat: 'Sueter', pieceId: 'su-ga-pr' },
      { cat: 'Calca', pieceId: 'cl-ma-dec' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-on10', title: 'Jeans e Blazer Chumbo Noite Outono', tags: ['casual', 'noturno', 'outono'], formality: 2,
    tip: 'Blazer chumbo sobre jeans preto e camisa azul escura: o tom frio do outono noturno vestido de forma urbana.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-ch-doc' },
      { cat: 'Calca', pieceId: 'cl-jp-lev' },
      { cat: 'Camisa', pieceId: 'cs-ae-doc' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-lo' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relogio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-on11', title: 'Couro Marrom Noturno Outono', tags: ['casual', 'noturno', 'outono'], formality: 3,
    tip: 'Jaqueta de couro marrom Jack sobre camisa preta: look de outono noturno com atitude. Calca alfaiataria mantem sofisticacao.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-ma-jck' },
      { cat: 'Calca', pieceId: 'cl-ch-raf' },
      { cat: 'Camisa', pieceId: 'cs-pr-con' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
      { cat: 'Relogio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-nv01', title: 'Jantar Azul Tropical Verao', tags: ['formal', 'noturno', 'verao'], formality: 4,
    tip: 'Costume azul tropical Homem SA para jantar de verao: tecido leve, cor que brilha a noite. Sem gravata, botao aberto.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-az-hsa' },
      { cat: 'Camisa', pieceId: 'cs-br-lev' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-pl' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-do-tec' },
    ]
  },
  {
    id: 'l-nv02', title: 'Terno Areia Noite de Verao', tags: ['formal', 'noturno', 'verao'], formality: 4,
    tip: 'Terno areia Homem SA linho para jantar noturno: leveza do linho e insubstituivel no calor. Sapato tan completa.',
    pieces: [
      { cat: 'Blazer', pieceId: 'te-ar-hsa-b' },
      { cat: 'Calca', pieceId: 'te-ar-hsa-c' },
      { cat: 'Camisa', pieceId: 'cs-br-lev' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-nv03', title: 'Blazer Azul Royal Noturno Verao', tags: ['formal', 'noturno', 'verao'], formality: 4,
    tip: 'Blazer azul royal slim + calca linho natural: combinacao elegante e fresca para eventos noturnos de verao ao ar livre.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-azr-doc' },
      { cat: 'Calca', pieceId: 'cl-ln1-doc' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-pl' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-nv04', title: 'Cinza Raffer Noite Quente', tags: ['formal', 'noturno', 'verao'], formality: 4,
    tip: 'Costume cinza Raffer com camisa azul bebe sem gravata: o cinza medio e surpreendentemente elegante no verao noturno.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ci-raf' },
      { cat: 'Camisa', pieceId: 'cs-ab-brk' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-be' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-nv05', title: 'Blazer Creme Jantar Verao', tags: ['formal', 'noturno', 'verao'], formality: 3,
    tip: 'Blazer creme + calca azul la tropical + camisa branca: paleta clara que funciona no calor noturno com sofisticacao.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-cr-doc' },
      { cat: 'Calca', pieceId: 'cl-az-hsa' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Sapato', pieceId: 'sa-mn-maj' },
      { cat: 'Cinto', pieceId: 'ci-az-dem' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-nv06', title: 'Linho Verde Noite Verao', tags: ['formal', 'noturno', 'verao'], formality: 3,
    tip: 'Blazer linho verde + calca linho natural + camisa branca: look de jantar ao ar livre com personalidade e frescor maximos.',
    pieces: [
      { cat: 'Blazer', pieceId: 'co-lv-zar' },
      { cat: 'Calca', pieceId: 'cl-lv-zar' },
      { cat: 'Camisa', pieceId: 'cs-br-lev' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
      { cat: 'Cinto', pieceId: 'ci-ma-maj' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-nv07', title: 'Polo Verao Noite Casual', tags: ['casual', 'noturno', 'verao'], formality: 2,
    tip: 'Blazer azul royal + polo creme + calca linho: o polo substitui a camisa no calor noturno de verao sem perder classe.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-azr-doc' },
      { cat: 'Calca', pieceId: 'cl-sa-lev' },
      { cat: 'Polo', pieceId: 'po-cr' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-nv08', title: 'Camiseta e Blazer Verao Noturno', tags: ['casual', 'noturno', 'verao'], formality: 2,
    tip: 'Blazer creme + camiseta branca + calca linho: descontraido de verao noturno. O blazer eleva a camiseta sem pesar no calor.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-cr-doc' },
      { cat: 'Calca', pieceId: 'cl-ln1-doc' },
      { cat: 'Camiseta', pieceId: 'ct-br-ind' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-nv09', title: 'Areia e Polo Petroleo Noite', tags: ['casual', 'noturno', 'verao'], formality: 2,
    tip: 'Calca areia + polo petroleo: minimal de verao noturno. O polo social mantem sofisticacao sem blazer no calor.',
    pieces: [
      { cat: 'Calca', pieceId: 'cl-sa-lev' },
      { cat: 'Polo', pieceId: 'po-pe-fid' },
      { cat: 'Sapato', pieceId: 'sa-az-dem' },
      { cat: 'Cinto', pieceId: 'ci-az-dem' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-nv10', title: 'Linho Verde Casual Noite Verao', tags: ['casual', 'noturno', 'verao'], formality: 2,
    tip: 'Blazer linho verde + calca linho + camiseta marinho: green-on-blue tonal para noites de verao ao ar livre.',
    pieces: [
      { cat: 'Blazer', pieceId: 'co-lv-zar' },
      { cat: 'Calca', pieceId: 'cl-lv-zar' },
      { cat: 'Camiseta', pieceId: 'ct-mn-ind' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-nv11', title: 'Bermuda Linho Noite Verao', tags: ['casual', 'noturno', 'verao'], formality: 1,
    tip: 'Bermuda linho creme + polo creme + sapato branco: verao maximo para ambientes despojados noturnos.',
    pieces: [
      { cat: 'Calca', pieceId: 'cl-br-lin' },
      { cat: 'Polo', pieceId: 'po-cr' },
      { cat: 'Sapato', pieceId: 'sa-br-maj' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-nv12', title: 'Azul Royal Casual Noturno Verao', tags: ['casual', 'noturno', 'verao'], formality: 2,
    tip: 'Blazer azul royal + calca sarja creme + camiseta branca: impacto maximo com esforco minimo no verao noturno.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-azr-doc' },
      { cat: 'Calca', pieceId: 'cl-sa-lev' },
      { cat: 'Camiseta', pieceId: 'ct-br-ind' },
      { cat: 'Sapato', pieceId: 'sa-az-dem' },
      { cat: 'Cinto', pieceId: 'ci-az-dem' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-di01', title: 'Sobretudo Preto Executivo Inverno', tags: ['formal', 'diurno', 'inverno'], formality: 5,
    tip: 'Sobretudo la preto Pai sobre costume cinza: layering executivo de inverno que comunica poder antes de tirar o casaco.',
    pieces: [
      { cat: 'Sobretudo', pieceId: 'ja-pr-pai' },
      { cat: 'Costume', pieceId: 'co-ci-raf' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Gravata', pieceId: 'gr-xcm-df' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relogio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-di02', title: 'Zegna e Sobretudo Cinza Inverno', tags: ['formal', 'diurno', 'inverno'], formality: 5,
    tip: 'Sobretudo cinza Homem SA sobre costume Zegna la 180: a combinacao mais luxuosa do guarda-roupa para dias frios.',
    pieces: [
      { cat: 'Sobretudo', pieceId: 'ja-ci-hsa' },
      { cat: 'Costume', pieceId: 'co-ch-zeg' },
      { cat: 'Camisa', pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-as' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relogio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-di03', title: 'Sueter Blazer Formal Inverno', tags: ['formal', 'diurno', 'inverno'], formality: 4,
    tip: 'Blazer chumbo + sueter branco + calca alfaiataria: layering de inverno elegante sem sobretudo. Equilibrio perfeito.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-ch-doc' },
      { cat: 'Sueter', pieceId: 'su-br-ren' },
      { cat: 'Calca', pieceId: 'cl-ch-raf' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relogio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-di04', title: 'Terno Vinho e Overcoat Inverno', tags: ['formal', 'diurno', 'inverno'], formality: 5,
    tip: 'Overcoat Raffer sobre terno vinho: maxima elegancia de inverno. O mostrador creme do Bambino e a pulseira marrom harmonizam com o burgundy do look.',
    pieces: [
      { cat: 'Sobretudo', pieceId: 'ja-pr-raf' },
      { cat: 'Terno', pieceId: 'co-vi-raf' },
      { cat: 'Camisa', pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-bv' },
      { cat: 'Sapato', pieceId: 'sa-bu-at' },
      { cat: 'Cinto', pieceId: 'ci-bu-at' },
      { cat: 'Relógio', pieceId: 're-or-bam' },
    ]
  },
  {
    id: 'l-di05', title: 'Sueter Preto e Blazer Azul Inverno', tags: ['formal', 'diurno', 'inverno'], formality: 3,
    tip: 'Blazer azul royal + sueter preto + calca azul la tropical: layering frio com paleta azul poderosa para reunioes de inverno.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-azr-doc' },
      { cat: 'Sueter', pieceId: 'su-pr1' },
      { cat: 'Calca', pieceId: 'cl-az-hsa' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-di06', title: 'Decinel e Overcoat Raffer Inverno', tags: ['formal', 'diurno', 'inverno'], formality: 5,
    tip: 'Overcoat Raffer sobre costume Decinel marrom: paleta terrosa de inverno com camadas de luxo. Sapato cafe solidifica a paleta.',
    pieces: [
      { cat: 'Sobretudo', pieceId: 'ja-pr-raf' },
      { cat: 'Costume', pieceId: 'co-ma-dec' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Gravata', pieceId: 'gr-mm-df' },
      { cat: 'Sapato', pieceId: 'sa-ca-at' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-di07', title: 'Jaqueta Couro e Calca Alfaiataria', tags: ['casual', 'diurno', 'inverno'], formality: 3,
    tip: 'Jaqueta couro preta Jack + calca alfaiataria chumbo + camisa azul escura: urban chic de inverno com atitude.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-pr-jck' },
      { cat: 'Calca', pieceId: 'cl-ch-raf' },
      { cat: 'Camisa', pieceId: 'cs-ae-doc' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relogio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-di08', title: 'Sueter Petroleo e Jeans Inverno', tags: ['casual', 'diurno', 'inverno'], formality: 2,
    tip: 'Sueter petroleo + jeans preto + bota chelsea: o classico de inverno casual. Tom petroleo aquece sem pesar.',
    pieces: [
      { cat: 'Sueter', pieceId: 'su-pe' },
      { cat: 'Calca', pieceId: 'cl-jp-lev' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
      { cat: 'Relogio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-di09', title: 'Blazer e Cachecol Azul Inverno', tags: ['casual', 'diurno', 'inverno'], formality: 3,
    tip: 'Blazer chumbo + cachecol flanela azul + calca marrom: o cachecol e o acessorio-chave do inverno casual.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-ch-doc' },
      { cat: 'Calca', pieceId: 'cl-ma-dec' },
      { cat: 'Acessorio', pieceId: 'ac-az-cac' },
      { cat: 'Camisa', pieceId: 'cs-pr-con' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
      { cat: 'Relogio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-di10', title: 'Couro Marrom Dia Frio Inverno', tags: ['casual', 'diurno', 'inverno'], formality: 2,
    tip: 'Jaqueta couro marrom Jack + sueter branco + jeans preto: o trio atemporal de inverno casual.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-ma-jck' },
      { cat: 'Sueter', pieceId: 'su-br-ren' },
      { cat: 'Calca', pieceId: 'cl-jp-lev' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
      { cat: 'Relogio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-di11', title: 'Gola Alta e Blazer Preto Inverno', tags: ['casual', 'diurno', 'inverno'], formality: 3,
    tip: 'Sueter gola alta preto sob blazer preto: all-black de inverno com camadas. Elegante sem ser formal.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-pr-doc' },
      { cat: 'Sueter', pieceId: 'su-ga-pr' },
      { cat: 'Calca', pieceId: 'cl-ch-raf' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-lo' },
      { cat: 'Relogio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-di12', title: 'Boina e Blazer Dia Frio Inverno', tags: ['casual', 'diurno', 'inverno'], formality: 3,
    tip: 'Blazer chumbo + sueter petroleo + boina cinza: o look de intelectual europeu no inverno.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-ch-doc' },
      { cat: 'Sueter', pieceId: 'su-pe' },
      { cat: 'Calca', pieceId: 'cl-ch-raf' },
      { cat: 'Acessorio', pieceId: 'ac-ci-boi' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-lo' },
      { cat: 'Relogio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-pf01', title: 'Terno Areia Primavera', tags: ['formal', 'diurno', 'primavera'], formality: 4,
    tip: 'Terno areia linho Homem SA e a definicao de primavera formal. Leve, elegante e fresco para reunioes ao ar livre.',
    pieces: [
      { cat: 'Blazer', pieceId: 'te-ar-hsa-b' },
      { cat: 'Calca', pieceId: 'te-ar-hsa-c' },
      { cat: 'Camisa', pieceId: 'cs-br-lev' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-pf02', title: 'Linho Verde Primaveril Formal', tags: ['formal', 'diurno', 'primavera'], formality: 3,
    tip: 'Blazer linho verde + calca linho natural: a combinacao mais vibrante da primavera. Camisa branca leve mantem o frescor.',
    pieces: [
      { cat: 'Blazer', pieceId: 'co-lv-zar' },
      { cat: 'Calca', pieceId: 'cl-lv-zar' },
      { cat: 'Camisa', pieceId: 'cs-br-lev' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-pl' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-pf03', title: 'Blazer Creme e Rosa Primavera', tags: ['formal', 'diurno', 'primavera'], formality: 3,
    tip: 'Blazer creme + camisa rosa listrada + calca areia: a primavera em cores pasteis. Look de apresentacao com personalidade.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-cr-doc' },
      { cat: 'Calca', pieceId: 'cl-sa-lev' },
      { cat: 'Camisa', pieceId: 'cs-rli-hsa' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-pf04', title: 'Azul Tropical Gravata Verde Primavera', tags: ['formal', 'diurno', 'primavera'], formality: 4,
    tip: 'Costume azul tropical + camisa branca + gravata verde bandeira: a primavera exige cores. Verde dialoga com a natureza da estacao.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-az-hsa' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Gravata', pieceId: 'gr-vb-df' },
      { cat: 'Sapato', pieceId: 'sa-mn-maj' },
      { cat: 'Cinto', pieceId: 'ci-az-dem' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-pf05', title: 'Blazer Azul Royal Primavera Formal', tags: ['formal', 'diurno', 'primavera'], formality: 4,
    tip: 'Blazer azul royal + calca linho natural + camisa azul bebe: tons de azul em diferentes intensidades no dia primaveril.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-azr-doc' },
      { cat: 'Calca', pieceId: 'cl-ln1-doc' },
      { cat: 'Camisa', pieceId: 'cs-ab-brk' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-pl' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-pf06', title: 'Caramelo e Camisa Verde Primavera', tags: ['formal', 'diurno', 'primavera'], formality: 3,
    tip: 'Costume caramelo + camisa verde + sapato tan: look primaveril com paleta quente e refrescante.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ca-hsa' },
      { cat: 'Camisa', pieceId: 'cs-ve-doc' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-pc01', title: 'Polo Rosa e Calca Caramelo Primavera', tags: ['casual', 'diurno', 'primavera'], formality: 2,
    tip: 'Polo rosa + calca caramelo: look de primavera que abraca as cores da estacao. Sapato branco fecha com frescor.',
    pieces: [
      { cat: 'Polo', pieceId: 'po-ro' },
      { cat: 'Calca', pieceId: 'cl-ca-hsa' },
      { cat: 'Sapato', pieceId: 'sa-br-maj' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-pc02', title: 'Linho Verde Casual Primavera', tags: ['casual', 'diurno', 'primavera'], formality: 2,
    tip: 'Blazer linho verde + camiseta branca + calca areia: o casual da primavera perfeito. Verde vibrante sobre branco e areia.',
    pieces: [
      { cat: 'Blazer', pieceId: 'co-lv-zar' },
      { cat: 'Calca', pieceId: 'cl-sa-lev' },
      { cat: 'Camiseta', pieceId: 'ct-br-ind' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-pc03', title: 'Polo Verde e Jeans Primavera', tags: ['casual', 'diurno', 'primavera'], formality: 1,
    tip: 'Polo verde + jeans preto + loafer: combinacao classica de primavera casual. Verde fresco sobre preto atual.',
    pieces: [
      { cat: 'Polo', pieceId: 'po-ve-fid' },
      { cat: 'Calca', pieceId: 'cl-jp-lev' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-lo' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-pc04', title: 'Areia e Polo Vermelha Primavera', tags: ['casual', 'diurno', 'primavera'], formality: 2,
    tip: 'Blazer areia linho + calca areia + polo vermelha: contraste vibrante de primavera. Vermelho pop sobre areia.',
    pieces: [
      { cat: 'Blazer', pieceId: 'te-ar-hsa-b' },
      { cat: 'Calca', pieceId: 'te-ar-hsa-c' },
      { cat: 'Polo', pieceId: 'po-vm-hi' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-np01', title: 'Jantar Areia Linho Primavera', tags: ['formal', 'noturno', 'primavera'], formality: 4,
    tip: 'Terno areia linho para jantar de primavera: tecido leve e tom areia que brilha a noite com sofisticacao unica.',
    pieces: [
      { cat: 'Blazer', pieceId: 'te-ar-hsa-b' },
      { cat: 'Calca', pieceId: 'te-ar-hsa-c' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relogio', pieceId: 're-do-tec' },
    ]
  },
  {
    id: 'l-np02', title: 'Linho Verde Noturno Primavera', tags: ['formal', 'noturno', 'primavera'], formality: 3,
    tip: 'Blazer linho verde + calca natural + camisa branca para jantar primaveril: verde noturno memoravel.',
    pieces: [
      { cat: 'Blazer', pieceId: 'co-lv-zar' },
      { cat: 'Calca', pieceId: 'cl-lv-zar' },
      { cat: 'Camisa', pieceId: 'cs-br-lev' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-pl' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-np03', title: 'Azul Royal Noite Primavera Formal', tags: ['formal', 'noturno', 'primavera'], formality: 4,
    tip: 'Costume azul tropical para jantar noturno de primavera: fresco, elegante e monolitico de alto impacto.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-az-hsa' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Sapato', pieceId: 'sa-mn-maj' },
      { cat: 'Cinto', pieceId: 'ci-az-dem' },
      { cat: 'Relogio', pieceId: 're-do-tec' },
    ]
  },
  {
    id: 'l-np04', title: 'Blazer Creme Noite Primaveril', tags: ['formal', 'noturno', 'primavera'], formality: 3,
    tip: 'Blazer creme + calca azul + camisa rosa listrada: paleta de primavera noturna com cores que se complementam.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-cr-doc' },
      { cat: 'Calca', pieceId: 'cl-az-hsa' },
      { cat: 'Camisa', pieceId: 'cs-rli-hsa' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-pl' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-np05', title: 'Cinza e Gravata Verde Primavera', tags: ['formal', 'noturno', 'primavera'], formality: 4,
    tip: 'Costume cinza com gravata verde bandeira: a gravata traz energia da primavera para o look noturno elegante.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ci-raf' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Gravata', pieceId: 'gr-vb-df' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-be' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-np06', title: 'Caramelo Verde Noite Primavera', tags: ['formal', 'noturno', 'primavera'], formality: 3,
    tip: 'Costume caramelo + camisa verde primavera: paleta terra-natureza que captura o espirito da estacao a noite.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ca-hsa' },
      { cat: 'Camisa', pieceId: 'cs-ve-doc' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relogio', pieceId: 're-do-tec' },
    ]
  },
  {
    id: 'l-np07', title: 'Polo e Blazer Noite Primavera', tags: ['casual', 'noturno', 'primavera'], formality: 2,
    tip: 'Blazer azul royal + polo verde + calca linho: leveza da primavera noturna com cores que conversam.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-azr-doc' },
      { cat: 'Calca', pieceId: 'cl-ln1-doc' },
      { cat: 'Polo', pieceId: 'po-ve-fid' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-np08', title: 'Camiseta e Blazer Verde Noite Primavera', tags: ['casual', 'noturno', 'primavera'], formality: 2,
    tip: 'Blazer linho verde + camiseta marinho + calca areia: verde sobre marinho e a paleta da primavera noturna casual.',
    pieces: [
      { cat: 'Blazer', pieceId: 'co-lv-zar' },
      { cat: 'Calca', pieceId: 'cl-sa-lev' },
      { cat: 'Camiseta', pieceId: 'ct-mn-ind' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-np09', title: 'Polo Vermelha Noite Primaveril', tags: ['casual', 'noturno', 'primavera'], formality: 2,
    tip: 'Polo vermelha + calca caramelo + loafer: energia primaveril para saidas noturnas casuais.',
    pieces: [
      { cat: 'Polo', pieceId: 'po-vm-hi' },
      { cat: 'Calca', pieceId: 'cl-ca-hsa' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-np10', title: 'Blazer Creme e Rosa Noite Primavera', tags: ['casual', 'noturno', 'primavera'], formality: 2,
    tip: 'Blazer creme + polo rosa + calca areia: look de primavera noturno com paleta pastel sofisticada.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-cr-doc' },
      { cat: 'Calca', pieceId: 'cl-sa-lev' },
      { cat: 'Polo', pieceId: 'po-ro' },
      { cat: 'Sapato', pieceId: 'sa-ca-maj-pl' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-np11', title: 'Areia e Camisa Verde Noturno Primavera', tags: ['casual', 'noturno', 'primavera'], formality: 2,
    tip: 'Blazer areia linho + camisa verde + calca areia: monocromatico areia com camisa verde como ponto de cor.',
    pieces: [
      { cat: 'Blazer', pieceId: 'te-ar-hsa-b' },
      { cat: 'Calca', pieceId: 'te-ar-hsa-c' },
      { cat: 'Camisa', pieceId: 'cs-ve-doc' },
      { cat: 'Sapato', pieceId: 'sa-te-cns' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-np12', title: 'Jeans e Polo Primavera Noturna', tags: ['casual', 'noturno', 'primavera'], formality: 1,
    tip: 'Polo vermelha + jeans preto + sapato azul: cores primaveris com base preta. Look de bar ou saida noturna despojada.',
    pieces: [
      { cat: 'Polo', pieceId: 'po-vm-hi' },
      { cat: 'Calca', pieceId: 'cl-jp-lev' },
      { cat: 'Sapato', pieceId: 'sa-az-dem' },
      { cat: 'Cinto', pieceId: 'ci-az-dem' },
      { cat: 'Relogio', pieceId: 're-az-sei' },
    ]
  },
  {
    id: 'l-nif01', title: 'Overcoat e Terno Cinza Gala', tags: ['formal', 'noturno', 'inverno'], formality: 5,
    tip: 'Overcoat Raffer sobre costume cinza para gala de inverno: nivel maximo de formalidade noturna do guarda-roupa.',
    pieces: [
      { cat: 'Sobretudo', pieceId: 'ja-pr-raf' },
      { cat: 'Costume', pieceId: 'co-ci-raf' },
      { cat: 'Camisa', pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-ap' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relogio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-nif02', title: 'Blazer Veludo Noite Inverno', tags: ['formal', 'noturno', 'inverno'], formality: 4,
    tip: 'Blazer veludo preto + sueter gola alta + calca alfaiataria: o veludo no inverno noturno impressiona a luz baixa.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-vpr-doc' },
      { cat: 'Sueter', pieceId: 'su-ga-pr' },
      { cat: 'Calca', pieceId: 'cl-ch-raf' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relogio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-nif03', title: 'Decinel e Sobretudo Jantar Inverno', tags: ['formal', 'noturno', 'inverno'], formality: 5,
    tip: 'Sobretudo preto Pai sobre costume marrom Decinel: contraste preto-marrom de inverno com elegancia europeia.',
    pieces: [
      { cat: 'Sobretudo', pieceId: 'ja-pr-pai' },
      { cat: 'Costume', pieceId: 'co-ma-dec' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Gravata', pieceId: 'gr-mm-df' },
      { cat: 'Sapato', pieceId: 'sa-ca-at' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relogio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-nic01', title: 'Couro Preto Noturno Inverno', tags: ['casual', 'noturno', 'inverno'], formality: 3,
    tip: 'Jaqueta couro preta + calca alfaiataria + camisa vinho: urban chic de inverno noturno com atitude.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-pr-jck' },
      { cat: 'Calca', pieceId: 'cl-ch-raf' },
      { cat: 'Camisa', pieceId: 'cs-vi-doc' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relogio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-nic02', title: 'Gola Alta e Blazer Noite Fria', tags: ['casual', 'noturno', 'inverno'], formality: 3,
    tip: 'Blazer preto + sueter gola alta preto + calca chumbo: all-black de inverno noturno com sofisticacao minimal.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-pr-doc' },
      { cat: 'Sueter', pieceId: 'su-ga-pr' },
      { cat: 'Calca', pieceId: 'cl-ch-raf' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
      { cat: 'Relogio', pieceId: 're-az-cas' },
    ]
  },
  {
    id: 'l-nic03', title: 'Cachecol e Couro Marrom Noite Inverno', tags: ['casual', 'noturno', 'inverno'], formality: 2,
    tip: 'Jaqueta couro marrom Jack + cachecol azul + jeans preto: inverno noturno casual com personalidade.',
    pieces: [
      { cat: 'Jaqueta', pieceId: 'ja-ma-jck' },
      { cat: 'Calca', pieceId: 'cl-jp-lev' },
      { cat: 'Acessorio', pieceId: 'ac-az-cac' },
      { cat: 'Camisa', pieceId: 'cs-pr-con' },
      { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
      { cat: 'Relogio', pieceId: 're-az-cas' },
    ]
  },

  // ── Orient Tank ──────────────────────────────────────────────────────────
  {
    id: 'l-tan01', title: 'Caramelo com Tank Dourado', tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume caramelo Homem SA e Tank dourado: a caixa retangular dourada amplifica o tom quente do caramelo. Um dos combos mais elegantes do guarda-roupa.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ca-hsa' },
      { cat: 'Camisa',  pieceId: 'cs-br-hsa' },
      { cat: 'Sapato',  pieceId: 'sa-ta-maj' },
      { cat: 'Cinto',   pieceId: 'ci-ta-at' },
      { cat: 'Relógio', pieceId: 're-or-tan' },
    ]
  },
  {
    id: 'l-tan02', title: 'Marrom Decinel com Tank', tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume marrom Decinel, gravata mocha e Tank dourado: paleta terrosa de cima a baixo. O dourado do relógio aquece ainda mais o look.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ma-dec' },
      { cat: 'Camisa',  pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-mm-df' },
      { cat: 'Sapato',  pieceId: 'sa-ca-at' },
      { cat: 'Cinto',   pieceId: 'ci-ca-at' },
      { cat: 'Relógio', pieceId: 're-or-tan' },
    ]
  },
  {
    id: 'l-tan03', title: 'Azul Homem SA com Tank', tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume azul Homem SA com Tank dourado: contraste clássico azul e ouro — combinação de alfaiataria italiana. Gravata dourada ou xadrez completaria o look.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-az-hsa' },
      { cat: 'Camisa',  pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-ar-df' },
      { cat: 'Sapato',  pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto',   pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-or-tan' },
    ]
  },
  {
    id: 'l-tan04', title: 'Chumbo Zegna com Tank', tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume chumbo Zegna com Tank dourado: o dourado cria um contraste luxuoso contra o cinza frio. Look de alto impacto para reuniões de peso.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ch-zeg' },
      { cat: 'Camisa',  pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-xcm-df' },
      { cat: 'Sapato',  pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto',   pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-or-tan' },
    ]
  },
  {
    id: 'l-tan05', title: 'Blazer Creme com Tank', tags: ['casual', 'diurno'], formality: 3,
    tip: 'Blazer creme com calça areia e Tank dourado: paleta neutra quente onde o relógio é o único ponto de brilho. Smart casual sofisticado sem esforço.',
    pieces: [
      { cat: 'Blazer',  pieceId: 'bl-cr-doc' },
      { cat: 'Calça',   pieceId: 'cl-ar-doc' },
      { cat: 'Camisa',  pieceId: 'cs-br-doc' },
      { cat: 'Sapato',  pieceId: 'sa-ta-maj' },
      { cat: 'Cinto',   pieceId: 'ci-ta-at' },
      { cat: 'Relógio', pieceId: 're-or-tan' },
    ]
  },

  // ── Orient Bambino ────────────────────────────────────────────────────────
  {
    id: 'l-bam01', title: 'Marrom Decinel com Bambino', tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume marrom Decinel e Orient Bambino: a pulseira marrom do relógio ecoa diretamente no tom do costume. Gravata mocha fecha a paleta terrosa com sofisticação.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ma-dec' },
      { cat: 'Camisa', pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-mm-df' },
      { cat: 'Sapato', pieceId: 'sa-ca-at' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relógio', pieceId: 're-or-bam' },
    ]
  },
  {
    id: 'l-bam02', title: 'Caramelo Homem SA com Bambino', tags: ['formal', 'diurno'], formality: 4,
    tip: 'Costume caramelo Homem SA com camisa branca de punho francês e Bambino: paleta quente e elegante. O mostrador creme do relógio espelha o tom areia do costume.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ca-hsa' },
      { cat: 'Camisa', pieceId: 'cs-br-hsa' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relógio', pieceId: 're-or-bam' },
    ]
  },
  {
    id: 'l-bam03', title: 'Blazer Creme e Bambino', tags: ['casual', 'diurno'], formality: 3,
    tip: 'Blazer creme Docthos com calça areia e Orient Bambino: paleta neutra e refinada para smart casual. O relógio mecânico eleva sem pesar o look.',
    pieces: [
      { cat: 'Blazer', pieceId: 'bl-cr-doc' },
      { cat: 'Calça', pieceId: 'cl-ar-doc' },
      { cat: 'Camisa', pieceId: 'cs-br-doc' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ca-at' },
      { cat: 'Relógio', pieceId: 're-or-bam' },
    ]
  },
  {
    id: 'l-bam04', title: 'Cinza Raffer com Bambino', tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume cinza Raffer com gravata xadrez cinza e marinho: look corporativo clássico. O Bambino substitui com classe qualquer relógio de quartzo.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ci-raf' },
      { cat: 'Camisa', pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-xcm-df' },
      { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto', pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-or-bam' },
    ]
  },
  {
    id: 'l-bam05', title: 'Linho Areia com Bambino', tags: ['casual', 'diurno', 'verao'], formality: 3,
    tip: 'Terno de linho areia Homem SA e Orient Bambino: combinação perfeita de leveza e elegância para o calor. O automático mecânico e o linho são dois clássicos atemporais.',
    pieces: [
      { cat: 'Blazer', pieceId: 'te-ar-hsa-b' },
      { cat: 'Calça', pieceId: 'te-ar-hsa-c' },
      { cat: 'Camisa', pieceId: 'cs-br-alg' },
      { cat: 'Sapato', pieceId: 'sa-ta-maj' },
      { cat: 'Cinto', pieceId: 'ci-ta-at' },
      { cat: 'Relógio', pieceId: 're-or-bam' },
    ]
  },

  // ── Suspensório All Black (O Frances) ────────────────────────────────────
  {
    id: 'l-su01', title: 'All Black de Gala com Suspensório', tags: ['formal', 'noturno'], formality: 5,
    tip: 'Costume preto Cliffield + suspensório all black + gravata bordô: tonal escuro máximo com um único contraste. O suspensório é o detalhe que diferencia do look convencional.',
    pieces: [
      { cat: 'Costume',     pieceId: 'co-pr-cli' },
      { cat: 'Camisa',      pieceId: 'cs-br-hsa' },
      { cat: 'Gravata',     pieceId: 'gr-bv' },
      { cat: 'Sapato',      pieceId: 'sa-pr-maj-ox' },
      { cat: 'Suspensório', pieceId: 'ci-su-pr' },
      { cat: 'Relógio',     pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-su02', title: 'Chumbo Zegna com Suspensório Elegante', tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume chumbo Zegna + suspensório all black + gravata azul royal: o suspensório substitui o cinto e eleva o nível de refinamento. Look de diretoria com detalhe de alfaiate.',
    pieces: [
      { cat: 'Costume',     pieceId: 'co-ch-zeg' },
      { cat: 'Camisa',      pieceId: 'cs-br-doc' },
      { cat: 'Gravata',     pieceId: 'gr-ar-df' },
      { cat: 'Sapato',      pieceId: 'sa-pr-maj-ox' },
      { cat: 'Suspensório', pieceId: 'ci-su-pr' },
      { cat: 'Relógio',     pieceId: 're-or-tan' },
    ]
  },
  {
    id: 'l-su03', title: 'Blazer Preto + Suspensório Noturno', tags: ['casual', 'noturno'], formality: 3,
    tip: 'Blazer preto + calça malha preta + suspensório all black: elegância noturna sem traje completo. O suspensório é o detalhe que transforma o look casual em algo memorável.',
    pieces: [
      { cat: 'Blazer',      pieceId: 'bl-pr-doc' },
      { cat: 'Camisa',      pieceId: 'cs-br-alg' },
      { cat: 'Calça',       pieceId: 'cl-pr-doc' },
      { cat: 'Sapato',      pieceId: 'sa-pr-dem-lo' },
      { cat: 'Suspensório', pieceId: 'ci-su-pr' },
      { cat: 'Relógio',     pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-su04', title: 'Cinza Raffer com Suspensório', tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume cinza Raffer + suspensório all black + gravata xadrez cinza: sofisticação discreta para os entendedores. O suspensório aparece apenas na abertura do paletó — detalhe de alfaiate britânico.',
    pieces: [
      { cat: 'Costume',     pieceId: 'co-ci-raf' },
      { cat: 'Camisa',      pieceId: 'cs-br-hsa' },
      { cat: 'Gravata',     pieceId: 'gr-xcm-df' },
      { cat: 'Sapato',      pieceId: 'sa-pr-maj-mk' },
      { cat: 'Suspensório', pieceId: 'ci-su-pr' },
      { cat: 'Relógio',     pieceId: 're-or-bam' },
    ]
  },
  {
    id: 'l-su05', title: 'Terno Vinho com Suspensório de Gala', tags: ['formal', 'noturno'], formality: 5,
    tip: 'Terno vinho Raffer + suspensório all black + gravata azul seda: contraste rico entre vinho e azul, com o suspensório adicionando textura ao tronco. Look de gala que combina elegância e personalidade.',
    pieces: [
      { cat: 'Costume',     pieceId: 'co-vi-raf' },
      { cat: 'Camisa',      pieceId: 'cs-br-hsa' },
      { cat: 'Gravata',     pieceId: 'gr-as' },
      { cat: 'Sapato',      pieceId: 'sa-pr-maj-ox' },
      { cat: 'Suspensório', pieceId: 'ci-su-pr' },
      { cat: 'Relógio',     pieceId: 're-or-bam' },
    ]
  },

  // ── Gravata Slim Merino Marine (O Frances) ────────────────────────────────
  {
    id: 'l-grm01', title: 'Cinza Raffer + Gravata Marinho Clássico', tags: ['formal', 'diurno'], formality: 5,
    tip: 'Cinza Raffer + gravata slim merino marinho: a combinação mais clássica da alfaiataria europeia. O merino tem queda impecável e textura suave que complementa o cinza médio.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ci-raf' },
      { cat: 'Camisa',  pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-ma-ofr' },
      { cat: 'Sapato',  pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto',   pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-or-tan' },
    ]
  },
  {
    id: 'l-grm02', title: 'Chumbo Zegna + Gravata Marinho Premium', tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume chumbo Zegna + gravata merino marinho: dois tons escuros em harmonia sofisticada. O marinho aquece o chumbo frio do Zegna sem perder o rigor executivo.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ch-zeg' },
      { cat: 'Camisa',  pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-ma-ofr' },
      { cat: 'Sapato',  pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto',   pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-grm03', title: 'Marrom Decinel + Gravata Marinho — Terra e Mar', tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume marrom Decinel + gravata slim merino marinho: terra e mar. O marinho cria contraste inesperado e sofisticado com o marrom — look de colecionador de estilo que foge do óbvio.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ma-dec' },
      { cat: 'Camisa',  pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-ma-ofr' },
      { cat: 'Sapato',  pieceId: 'sa-ca-at' },
      { cat: 'Cinto',   pieceId: 'ci-ca-at' },
      { cat: 'Relógio', pieceId: 're-or-bam' },
    ]
  },
  {
    id: 'l-grm04', title: 'Azul Homem SA + Gravata Marinho Tonal', tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume azul Homem SA + gravata slim merino marinho: look tonal azul com variação de profundidade. O marinho mais escuro da gravata ancora e dá peso visual ao look claro.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-az-hsa' },
      { cat: 'Camisa',  pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-ma-ofr' },
      { cat: 'Sapato',  pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto',   pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-or-tan' },
    ]
  },
  {
    id: 'l-grm05', title: 'Costume Preto + Gravata Marinho Noturno', tags: ['formal', 'noturno'], formality: 5,
    tip: 'Costume preto Cliffield + gravata merino marinho: contraste azul profundo no fundo escuro — sofisticado e moderno. Look de gala ou apresentação noturna que mantém seriedade com personalidade.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-pr-cli' },
      { cat: 'Camisa',  pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-ma-ofr' },
      { cat: 'Sapato',  pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto',   pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
]
