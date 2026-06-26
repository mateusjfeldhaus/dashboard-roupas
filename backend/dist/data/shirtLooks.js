"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shirtLooks = void 0;
// 3 looks por cada uma das 24 camisas:
// 1. formalComGravata  — costume/terno + gravata + sapato social
// 2. formalSemGravata  — blazer/costume + sapato social, botão aberto
// 3. casual            — calça casual + sapato casual, sem gravata
exports.shirtLooks = [
    // ─── Branca Algodão (Docthos) ─────────────────────────────────────────────
    {
        shirtId: 'cs-br-alg',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-br-alg' },
            { cat: 'Costume', pieceId: 'co-ci-raf' },
            { cat: 'Gravata', pieceId: 'gr-as' },
            { cat: 'Sapato', pieceId: 'sa-ca-at' },
            { cat: 'Cinto', pieceId: 'ci-ca-at' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-br-alg' },
            { cat: 'Blazer', pieceId: 'bl-azr-doc' },
            { cat: 'Calça', pieceId: 'cl-ar-doc' },
            { cat: 'Sapato', pieceId: 'sa-ca-maj-pl' },
            { cat: 'Cinto', pieceId: 'ci-ca-at' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-br-alg' },
            { cat: 'Calça', pieceId: 'cl-sa-lev' },
            { cat: 'Sapato', pieceId: 'sa-ma-dud' },
            { cat: 'Cinto', pieceId: 'ci-ma-maj' },
        ],
    },
    // ─── Branca Leve (Docthos) ────────────────────────────────────────────────
    {
        shirtId: 'cs-br-lev',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-br-lev' },
            { cat: 'Terno', pieceId: 'te-ar-hsa-b' },
            { cat: 'Calça', pieceId: 'te-ar-hsa-c' },
            { cat: 'Gravata', pieceId: 'gr-vb-df' },
            { cat: 'Sapato', pieceId: 'sa-ta-maj' },
            { cat: 'Cinto', pieceId: 'ci-ta-at' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-br-lev' },
            { cat: 'Blazer', pieceId: 'bl-cr-doc' },
            { cat: 'Calça', pieceId: 'cl-ar-doc' },
            { cat: 'Sapato', pieceId: 'sa-ta-maj' },
            { cat: 'Cinto', pieceId: 'ci-ta-at' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-br-lev' },
            { cat: 'Calça', pieceId: 'cl-ln1-doc' },
            { cat: 'Sapato', pieceId: 'sa-te-cns' },
        ],
    },
    // ─── Branca Clássica (Docthos) ────────────────────────────────────────────
    {
        shirtId: 'cs-br-doc',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-br-doc' },
            { cat: 'Costume', pieceId: 'co-pr-cli' },
            { cat: 'Gravata', pieceId: 'gr-pr-dud' },
            { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-br-doc' },
            { cat: 'Costume', pieceId: 'co-ch-zeg' },
            { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-br-doc' },
            { cat: 'Calça', pieceId: 'cl-jp-lev' },
            { cat: 'Sapato', pieceId: 'sa-mo-dem-ch' },
            { cat: 'Relógio', pieceId: 're-pr-cas-g' },
        ],
    },
    // ─── Fio 100 Punho Francês — Branca (Homem SA) ────────────────────────────
    {
        shirtId: 'cs-br-hsa',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-br-hsa' },
            { cat: 'Terno', pieceId: 'co-vi-raf' },
            { cat: 'Gravata', pieceId: 'gr-as' },
            { cat: 'Sapato', pieceId: 'sa-bu-at' },
            { cat: 'Cinto', pieceId: 'ci-bu-at' },
            { cat: 'Relógio', pieceId: 're-pr-cit' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-br-hsa' },
            { cat: 'Costume', pieceId: 'co-ci-raf' },
            { cat: 'Sapato', pieceId: 'sa-ca-at' },
            { cat: 'Cinto', pieceId: 'ci-ca-at' },
            { cat: 'Lenço', pieceId: 'ac-vm-len' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-br-hsa' },
            { cat: 'Calça', pieceId: 'cl-sa-lev' },
            { cat: 'Sapato', pieceId: 'sa-ca-at' },
            { cat: 'Relógio', pieceId: 're-az-sei' },
        ],
    },
    // ─── Cinza (Four Teen) ────────────────────────────────────────────────────
    {
        shirtId: 'cs-ci-4t',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-ci-4t' },
            { cat: 'Costume', pieceId: 'co-ci-raf' },
            { cat: 'Gravata', pieceId: 'gr-rf-df' },
            { cat: 'Sapato', pieceId: 'sa-ca-at' },
            { cat: 'Cinto', pieceId: 'ci-ca-at' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-ci-4t' },
            { cat: 'Blazer', pieceId: 'bl-azr-doc' },
            { cat: 'Calça', pieceId: 'cl-pr-doc' },
            { cat: 'Sapato', pieceId: 'sa-pr-dem-lo' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-ci-4t' },
            { cat: 'Calça', pieceId: 'cl-jp-lev' },
            { cat: 'Sapato', pieceId: 'sa-mo-dem-ch' },
        ],
    },
    // ─── Marrom (Ash) ─────────────────────────────────────────────────────────
    {
        shirtId: 'cs-ma-ash',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-ma-ash' },
            { cat: 'Costume', pieceId: 'co-ca-hsa' },
            { cat: 'Gravata', pieceId: 'gr-mm-df' },
            { cat: 'Sapato', pieceId: 'sa-ca-maj-bs' },
            { cat: 'Cinto', pieceId: 'ci-ca-at' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-ma-ash' },
            { cat: 'Blazer', pieceId: 'bl-ch-doc' },
            { cat: 'Calça', pieceId: 'cl-ma-dec' },
            { cat: 'Sapato', pieceId: 'sa-ca-maj-be' },
            { cat: 'Cinto', pieceId: 'ci-ca-at' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-ma-ash' },
            { cat: 'Calça', pieceId: 'cl-sa-lev' },
            { cat: 'Sapato', pieceId: 'sa-ma-dem-ab' },
        ],
    },
    // ─── Rosa Listrada (Homem SA) ─────────────────────────────────────────────
    {
        shirtId: 'cs-rli-hsa',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-rli-hsa' },
            { cat: 'Costume', pieceId: 'co-ci-raf' },
            { cat: 'Gravata', pieceId: 'gr-xac-df' },
            { cat: 'Sapato', pieceId: 'sa-ca-at' },
            { cat: 'Cinto', pieceId: 'ci-ca-at' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-rli-hsa' },
            { cat: 'Blazer', pieceId: 'bl-pr-doc' },
            { cat: 'Calça', pieceId: 'cl-ar-doc' },
            { cat: 'Sapato', pieceId: 'sa-ca-at' },
            { cat: 'Cinto', pieceId: 'ci-ca-at' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-rli-hsa' },
            { cat: 'Calça', pieceId: 'cl-sa-lev' },
            { cat: 'Sapato', pieceId: 'sa-ma-dud' },
        ],
    },
    // ─── Azul Bebê Fio 200 (Brooksfield) ──────────────────────────────────────
    {
        shirtId: 'cs-ab-brk',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-ab-brk' },
            { cat: 'Costume', pieceId: 'co-ch-zeg' },
            { cat: 'Gravata', pieceId: 'gr-xcm-df' },
            { cat: 'Sapato', pieceId: 'sa-ca-at' },
            { cat: 'Cinto', pieceId: 'ci-ca-at' },
            { cat: 'Relógio', pieceId: 're-pr-cit' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-ab-brk' },
            { cat: 'Costume', pieceId: 'co-ma-dec' },
            { cat: 'Sapato', pieceId: 'sa-ca-maj-ox' },
            { cat: 'Cinto', pieceId: 'ci-ca-at' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-ab-brk' },
            { cat: 'Calça', pieceId: 'cl-sa-lev' },
            { cat: 'Jaqueta', pieceId: 'ja-ma-jck' },
            { cat: 'Sapato', pieceId: 'sa-ca-at' },
        ],
    },
    // ─── Azul Bebê (Consolatio) ───────────────────────────────────────────────
    {
        shirtId: 'cs-ab-con',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-ab-con' },
            { cat: 'Costume', pieceId: 'co-ma-dec' },
            { cat: 'Gravata', pieceId: 'gr-bv' },
            { cat: 'Sapato', pieceId: 'sa-ca-maj-be' },
            { cat: 'Cinto', pieceId: 'ci-ca-at' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-ab-con' },
            { cat: 'Blazer', pieceId: 'bl-azr-doc' },
            { cat: 'Calça', pieceId: 'cl-ch-raf' },
            { cat: 'Sapato', pieceId: 'sa-mn-maj' },
            { cat: 'Cinto', pieceId: 'ci-ve-maj' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-ab-con' },
            { cat: 'Calça', pieceId: 'cl-jp-lev' },
            { cat: 'Sapato', pieceId: 'sa-pr-dem-lo' },
        ],
    },
    // ─── Azul Royal (Consolatio) ──────────────────────────────────────────────
    {
        shirtId: 'cs-ar-con',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-ar-con' },
            { cat: 'Costume', pieceId: 'co-ci-raf' },
            { cat: 'Gravata', pieceId: 'gr-vm-df' },
            { cat: 'Sapato', pieceId: 'sa-ca-at' },
            { cat: 'Cinto', pieceId: 'ci-ca-at' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-ar-con' },
            { cat: 'Blazer', pieceId: 'bl-cr-doc' },
            { cat: 'Calça', pieceId: 'cl-pr-doc' },
            { cat: 'Sapato', pieceId: 'sa-pr-maj-mk' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-ar-con' },
            { cat: 'Calça', pieceId: 'cl-sa-lev' },
            { cat: 'Sapato', pieceId: 'sa-ma-dud' },
        ],
    },
    // ─── Azul Escura (Docthos) ────────────────────────────────────────────────
    {
        shirtId: 'cs-ae-doc',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-ae-doc' },
            { cat: 'Costume', pieceId: 'co-ci-raf' },
            { cat: 'Gravata', pieceId: 'gr-ar-df' },
            { cat: 'Sapato', pieceId: 'sa-pr-dem' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-ae-doc' },
            { cat: 'Blazer', pieceId: 'bl-vpr-doc' },
            { cat: 'Calça', pieceId: 'cl-ch-raf' },
            { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-ae-doc' },
            { cat: 'Calça', pieceId: 'cl-jp-lev' },
            { cat: 'Sapato', pieceId: 'sa-mo-dem-ch' },
        ],
    },
    // ─── Azul Listrada (Docthos) ──────────────────────────────────────────────
    {
        shirtId: 'cs-ali-doc',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-ali-doc' },
            { cat: 'Costume', pieceId: 'co-az-hsa' },
            { cat: 'Gravata', pieceId: 'gr-ar-df' },
            { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-ali-doc' },
            { cat: 'Blazer', pieceId: 'bl-pr-tev' },
            { cat: 'Calça', pieceId: 'cl-azr-doc' },
            { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-ali-doc' },
            { cat: 'Calça', pieceId: 'cl-ar-doc' },
            { cat: 'Sapato', pieceId: 'sa-ca-maj-pl' },
        ],
    },
    // ─── Azul (Fideli) ────────────────────────────────────────────────────────
    {
        shirtId: 'cs-az-fid',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-az-fid' },
            { cat: 'Costume', pieceId: 'co-ca-hsa' },
            { cat: 'Gravata', pieceId: 'gr-ve' },
            { cat: 'Sapato', pieceId: 'sa-ta-maj' },
            { cat: 'Cinto', pieceId: 'ci-ta-at' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-az-fid' },
            { cat: 'Blazer', pieceId: 'bl-pr-doc' },
            { cat: 'Calça', pieceId: 'cl-ar-doc' },
            { cat: 'Sapato', pieceId: 'sa-ca-maj-pl' },
            { cat: 'Cinto', pieceId: 'ci-ca-at' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-az-fid' },
            { cat: 'Calça', pieceId: 'cl-sa-lev' },
            { cat: 'Sapato', pieceId: 'sa-ma-dud' },
        ],
    },
    // ─── Azul (Clifield) ──────────────────────────────────────────────────────
    {
        shirtId: 'cs-az-cli',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-az-cli' },
            { cat: 'Costume', pieceId: 'co-pr-cli' },
            { cat: 'Gravata', pieceId: 'gr-lvm' },
            { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-az-cli' },
            { cat: 'Blazer', pieceId: 'bl-ch-doc' },
            { cat: 'Calça', pieceId: 'cl-ch-raf' },
            { cat: 'Sapato', pieceId: 'sa-pr-dem-lo' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-az-cli' },
            { cat: 'Calça', pieceId: 'cl-jp-lev' },
            { cat: 'Sapato', pieceId: 'sa-ma-dem-ab' },
        ],
    },
    // ─── Azul Escura (Preston Field) ──────────────────────────────────────────
    {
        shirtId: 'cs-ae-pf',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-ae-pf' },
            { cat: 'Costume', pieceId: 'co-ci-raf' },
            { cat: 'Gravata', pieceId: 'gr-ap' },
            { cat: 'Sapato', pieceId: 'sa-pr-dem' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-ae-pf' },
            { cat: 'Blazer', pieceId: 'bl-vpr-doc' },
            { cat: 'Calça', pieceId: 'cl-pr-doc' },
            { cat: 'Sapato', pieceId: 'sa-az-maj-ab' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-ae-pf' },
            { cat: 'Calça', pieceId: 'cl-jp-lev' },
            { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
        ],
    },
    // ─── Preta (Consolatio) ───────────────────────────────────────────────────
    {
        shirtId: 'cs-pr-con',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-pr-con' },
            { cat: 'Costume', pieceId: 'co-ci-raf' },
            { cat: 'Gravata', pieceId: 'gr-vm-df' },
            { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-pr-con' },
            { cat: 'Blazer', pieceId: 'bl-cr-doc' },
            { cat: 'Calça', pieceId: 'cl-pr-doc' },
            { cat: 'Sapato', pieceId: 'sa-pr-maj-mk' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-pr-con' },
            { cat: 'Calça', pieceId: 'cl-jp-lev' },
            { cat: 'Jaqueta', pieceId: 'ja-ma-jck' },
            { cat: 'Sapato', pieceId: 'sa-pr-mrc' },
        ],
    },
    // ─── Preta Listrada (Docthos) ─────────────────────────────────────────────
    {
        shirtId: 'cs-pli-doc',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-pli-doc' },
            { cat: 'Costume', pieceId: 'co-ch-zeg' },
            { cat: 'Gravata', pieceId: 'gr-ar-df' },
            { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-pli-doc' },
            { cat: 'Blazer', pieceId: 'bl-pr-doc' },
            { cat: 'Calça', pieceId: 'cl-pr-doc' },
            { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-pli-doc' },
            { cat: 'Calça', pieceId: 'cl-ch-raf' },
            { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
        ],
    },
    // ─── Preta Tech (Docthos) ─────────────────────────────────────────────────
    {
        shirtId: 'cs-pt-doc',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-pt-doc' },
            { cat: 'Costume', pieceId: 'co-pr-cli' },
            { cat: 'Gravata', pieceId: 'gr-as' },
            { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-pt-doc' },
            { cat: 'Blazer', pieceId: 'bl-cr-doc' },
            { cat: 'Calça', pieceId: 'cl-pr-doc' },
            { cat: 'Sapato', pieceId: 'sa-pr-maj-mk' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-pt-doc' },
            { cat: 'Calça', pieceId: 'cl-jp-lev' },
            { cat: 'Sapato', pieceId: 'sa-mo-dem-ch' },
        ],
    },
    // ─── Vinho (Docthos) ──────────────────────────────────────────────────────
    {
        shirtId: 'cs-vi-doc',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-vi-doc' },
            { cat: 'Costume', pieceId: 'co-ci-raf' },
            { cat: 'Gravata', pieceId: 'gr-ing-dud' },
            { cat: 'Sapato', pieceId: 'sa-ca-at' },
            { cat: 'Cinto', pieceId: 'ci-ca-at' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-vi-doc' },
            { cat: 'Blazer', pieceId: 'bl-vpr-doc' },
            { cat: 'Calça', pieceId: 'cl-ch-raf' },
            { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-vi-doc' },
            { cat: 'Calça', pieceId: 'cl-jp-lev' },
            { cat: 'Jaqueta', pieceId: 'ja-pr-jck' },
            { cat: 'Sapato', pieceId: 'sa-pr-mrc' },
        ],
    },
    // ─── Verde (Docthos) ──────────────────────────────────────────────────────
    {
        shirtId: 'cs-ve-doc',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-ve-doc' },
            { cat: 'Costume', pieceId: 'co-ci-raf' },
            { cat: 'Gravata', pieceId: 'gr-bv' },
            { cat: 'Sapato', pieceId: 'sa-ca-at' },
            { cat: 'Cinto', pieceId: 'ci-ca-at' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-ve-doc' },
            { cat: 'Blazer', pieceId: 'bl-azr-doc' },
            { cat: 'Calça', pieceId: 'cl-pr-doc' },
            { cat: 'Sapato', pieceId: 'sa-pr-maj-mk' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-ve-doc' },
            { cat: 'Calça', pieceId: 'cl-sa-lev' },
            { cat: 'Sapato', pieceId: 'sa-ma-dud' },
        ],
    },
    // ─── Vermelha (Fideli) ────────────────────────────────────────────────────
    {
        shirtId: 'cs-vm-fid',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-vm-fid' },
            { cat: 'Costume', pieceId: 'co-ci-raf' },
            { cat: 'Gravata', pieceId: 'gr-pr-dud' },
            { cat: 'Sapato', pieceId: 'sa-pr-dem' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-vm-fid' },
            { cat: 'Costume', pieceId: 'co-pr-cli' },
            { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-vm-fid' },
            { cat: 'Calça', pieceId: 'cl-pr-doc' },
            { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
        ],
    },
    // ─── Vermelha (Caw) ───────────────────────────────────────────────────────
    {
        shirtId: 'cs-vm-caw',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-vm-caw' },
            { cat: 'Costume', pieceId: 'co-pr-cli' },
            { cat: 'Gravata', pieceId: 'gr-pr-dud' },
            { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-vm-caw' },
            { cat: 'Blazer', pieceId: 'bl-pr-tev' },
            { cat: 'Calça', pieceId: 'cl-pr-doc' },
            { cat: 'Sapato', pieceId: 'sa-pr-maj-mk' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-vm-caw' },
            { cat: 'Calça', pieceId: 'cl-jp-lev' },
            { cat: 'Sapato', pieceId: 'sa-pr-mrc' },
        ],
    },
    // ─── Roxa (China) ─────────────────────────────────────────────────────────
    {
        shirtId: 'cs-ro-chi',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-ro-chi' },
            { cat: 'Costume', pieceId: 'co-ci-raf' },
            { cat: 'Gravata', pieceId: 'gr-xac-df' },
            { cat: 'Sapato', pieceId: 'sa-pr-dem' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-ro-chi' },
            { cat: 'Blazer', pieceId: 'bl-pr-doc' },
            { cat: 'Calça', pieceId: 'cl-pr-doc' },
            { cat: 'Sapato', pieceId: 'sa-pr-dem-ch' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-ro-chi' },
            { cat: 'Calça', pieceId: 'cl-ch-raf' },
            { cat: 'Sapato', pieceId: 'sa-pr-dem-lo' },
        ],
    },
    // ─── Rosa Choque (K&F) ────────────────────────────────────────────────────
    {
        shirtId: 'cs-rch-kf',
        formalComGravata: [
            { cat: 'Camisa', pieceId: 'cs-rch-kf' },
            { cat: 'Costume', pieceId: 'co-ci-raf' },
            { cat: 'Gravata', pieceId: 'gr-pr-dud' },
            { cat: 'Sapato', pieceId: 'sa-pr-dem' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        formalSemGravata: [
            { cat: 'Camisa', pieceId: 'cs-rch-kf' },
            { cat: 'Blazer', pieceId: 'bl-pr-tev' },
            { cat: 'Calça', pieceId: 'cl-pr-doc' },
            { cat: 'Sapato', pieceId: 'sa-pr-maj-ox' },
            { cat: 'Cinto', pieceId: 'ci-pr' },
        ],
        casual: [
            { cat: 'Camisa', pieceId: 'cs-rch-kf' },
            { cat: 'Calça', pieceId: 'cl-ar-doc' },
            { cat: 'Sapato', pieceId: 'sa-ta-maj' },
        ],
    },
];
