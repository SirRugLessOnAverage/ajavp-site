export interface StageHistoryPoint {
  stageId: 'cm' | 'fb' | 'fs' | 'tm';
  stageLabel: string;
  stageShort: string;
  stagePts: number;
  cumulativePts: number;
  rankAtStage: number;
}

export interface JifParishRanking {
  name: string;
  isAjavp: boolean;
  cmRank: number;
  cmPts: number;
  fbRank: number;
  fbPts: number;
  fbNp?: boolean;
  fsRank: number;
  fsPts: number;
  fsNp?: boolean;
  tmRank: number;
  tmPts: number;
  tmNp?: boolean;
  pontos: number;
  gold: number;
  silver: number;
  bronze: number;
  futsalDetail: string;
  delta: number; // Variação de posições vs etapa anterior (+2 = subiu 2, 0 = manteve, -1 = desceu 1)
  history: StageHistoryPoint[];
}

export const JIF_CLASSIFICACAO: JifParishRanking[] = [
  {
    name: "Bagunte",
    isAjavp: false,
    cmRank: 3, cmPts: 51,
    fbRank: 1, fbPts: 45,
    fsRank: 1, fsPts: 75,
    tmRank: 5, tmPts: 42,
    pontos: 213,
    gold: 2, silver: 1, bronze: 1,
    futsalDetail: "Sub-7 (4º) • Sub-9 (2º) • Sub-11 (1º) • Sub-13 (1º) • Sub-16 (1º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 51, cumulativePts: 51, rankAtStage: 3 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 45, cumulativePts: 96, rankAtStage: 1 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 75, cumulativePts: 171, rankAtStage: 1 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 42, cumulativePts: 213, rankAtStage: 1 }
    ]
  },
  {
    name: "Árvore",
    isAjavp: false,
    cmRank: 4, cmPts: 48,
    fbRank: 4, fbPts: 36,
    fsRank: 2, fsPts: 70,
    tmRank: 3, tmPts: 48,
    pontos: 202,
    gold: 2, silver: 1, bronze: 2,
    futsalDetail: "Sub-7 (2º) • Sub-9 (6º) • Sub-11 (4º) • Sub-13 (2º) • Sub-16 (6º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 48, cumulativePts: 48, rankAtStage: 4 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 36, cumulativePts: 84, rankAtStage: 4 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 70, cumulativePts: 154, rankAtStage: 2 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 48, cumulativePts: 202, rankAtStage: 2 }
    ]
  },
  {
    name: "Gião",
    isAjavp: false,
    cmRank: 2, cmPts: 54,
    fbRank: 5, fbPts: 33,
    fsRank: 4, fsPts: 60,
    tmRank: 2, tmPts: 51,
    pontos: 198,
    gold: 2, silver: 2, bronze: 3,
    futsalDetail: "Sub-7 (7º) • Sub-9 (4º) • Sub-11 (8º) • Sub-13 (9º) • Sub-16 (2º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 54, cumulativePts: 54, rankAtStage: 2 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 33, cumulativePts: 87, rankAtStage: 3 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 60, cumulativePts: 147, rankAtStage: 3 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 51, cumulativePts: 198, rankAtStage: 3 }
    ]
  },
  {
    name: "Vilar do Pinheiro",
    isAjavp: true,
    cmRank: 1, cmPts: 57,
    fbRank: 6, fbPts: 30,
    fsRank: 5, fsPts: 55,
    tmRank: 1, tmPts: 54,
    pontos: 196,
    gold: 5, silver: 5, bronze: 5,
    futsalDetail: "Sub-7 (6º) • Sub-9 (1º 🥇) • Sub-11 (2º 🥈) • Sub-13 (10º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 57, cumulativePts: 57, rankAtStage: 1 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 30, cumulativePts: 87, rankAtStage: 2 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 55, cumulativePts: 142, rankAtStage: 4 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 54, cumulativePts: 196, rankAtStage: 4 }
    ]
  },
  {
    name: "Junqueira",
    isAjavp: false,
    cmRank: 9, cmPts: 33,
    fbRank: 2, fbPts: 42,
    fsRank: 3, fsPts: 65,
    tmRank: 8, tmPts: 33,
    pontos: 173,
    gold: 0, silver: 2, bronze: 1,
    futsalDetail: "Sub-7 (1º 🥇) • Sub-9 (10º) • Sub-11 (7º) • Sub-13 (6º) • Sub-16 (3º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 33, cumulativePts: 33, rankAtStage: 9 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 42, cumulativePts: 75, rankAtStage: 5 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 65, cumulativePts: 140, rankAtStage: 5 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 33, cumulativePts: 173, rankAtStage: 5 }
    ]
  },
  {
    name: "Fornelo",
    isAjavp: false,
    cmRank: 6, cmPts: 42,
    fbRank: 7, fbPts: 27,
    fsRank: 7, fsPts: 45,
    tmRank: 7, tmPts: 36,
    pontos: 150,
    gold: 1, silver: 0, bronze: 1,
    futsalDetail: "Sub-7 (5º) • Sub-9 (7º) • Sub-11 (6º) • Sub-13 (7º) • Sub-16 (7º)",
    delta: 1,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 42, cumulativePts: 42, rankAtStage: 6 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 27, cumulativePts: 69, rankAtStage: 7 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 45, cumulativePts: 114, rankAtStage: 7 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 36, cumulativePts: 150, rankAtStage: 6 }
    ]
  },
  {
    name: "Tougues",
    isAjavp: false,
    cmRank: 5, cmPts: 45,
    fbRank: 3, fbPts: 39,
    fsRank: 6, fsPts: 50,
    tmRank: 15, tmPts: 12,
    pontos: 146,
    gold: 2, silver: 1, bronze: 0,
    futsalDetail: "Sub-7 (3º) • Sub-9 (5º) • Sub-11 (3º) • Sub-13 (8º) • Sub-16 (12º)",
    delta: -1,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 45, cumulativePts: 45, rankAtStage: 5 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 39, cumulativePts: 84, rankAtStage: 4 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 50, cumulativePts: 134, rankAtStage: 6 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 12, cumulativePts: 146, rankAtStage: 7 }
    ]
  },
  {
    name: "Arcos",
    isAjavp: false,
    cmRank: 7, cmPts: 39,
    fbRank: 8, fbPts: 24,
    fsRank: 8, fsPts: 40,
    tmRank: 10, tmPts: 27,
    pontos: 130,
    gold: 0, silver: 1, bronze: 1,
    futsalDetail: "Sub-7 (8º) • Sub-9 (8º) • Sub-11 (8º) • Sub-13 (5º) • Sub-16 (8º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 39, cumulativePts: 39, rankAtStage: 7 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 24, cumulativePts: 63, rankAtStage: 8 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 40, cumulativePts: 103, rankAtStage: 8 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 27, cumulativePts: 130, rankAtStage: 8 }
    ]
  },
  {
    name: "Mosteiró",
    isAjavp: false,
    cmRank: 8, cmPts: 36,
    fbRank: 12, fbPts: 12,
    fsRank: 12, fsPts: 25,
    tmRank: 4, tmPts: 45,
    pontos: 118,
    gold: 0, silver: 1, bronze: 2,
    futsalDetail: "Sub-7 (10º) • Sub-9 (9º) • Sub-11 (10º) • Sub-13 (11º) • Sub-16 (10º)",
    delta: 2,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 36, cumulativePts: 36, rankAtStage: 8 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 12, cumulativePts: 48, rankAtStage: 11 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 25, cumulativePts: 73, rankAtStage: 11 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 45, cumulativePts: 118, rankAtStage: 9 }
    ]
  },
  {
    name: "Fajozes",
    isAjavp: false,
    cmRank: 10, cmPts: 30,
    fbRank: 11, fbPts: 15,
    fsRank: 10, fsPts: 30,
    tmRank: 9, tmPts: 30,
    pontos: 105,
    gold: 0, silver: 1, bronze: 0,
    futsalDetail: "Sub-7 (9º) • Sub-9 (11º) • Sub-11 (9º) • Sub-13 (9º) • Sub-16 (9º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 30, cumulativePts: 30, rankAtStage: 10 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 15, cumulativePts: 45, rankAtStage: 12 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 30, cumulativePts: 75, rankAtStage: 10 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 30, cumulativePts: 105, rankAtStage: 10 }
    ]
  },
  {
    name: "Outeiro Maior",
    isAjavp: false,
    cmRank: 11, cmPts: 27,
    fbRank: 14, fbPts: 9,
    fsRank: 13, fsPts: 20,
    tmRank: 6, tmPts: 39,
    pontos: 95,
    gold: 1, silver: 0, bronze: 0,
    futsalDetail: "Sub-7 (12º) • Sub-9 (13º) • Sub-11 (12º) • Sub-13 (12º) • Sub-16 (11º)",
    delta: 2,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 27, cumulativePts: 27, rankAtStage: 11 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 9, cumulativePts: 36, rankAtStage: 14 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 20, cumulativePts: 56, rankAtStage: 13 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 39, cumulativePts: 95, rankAtStage: 11 }
    ]
  },
  {
    name: "Canidelo",
    isAjavp: false,
    cmRank: 13, cmPts: 21,
    fbRank: 10, fbPts: 18,
    fsRank: 11, fsPts: 30,
    tmRank: 11, tmPts: 24,
    pontos: 93,
    gold: 0, silver: 0, bronze: 1,
    futsalDetail: "Sub-7 (11º) • Sub-9 (10º) • Sub-11 (11º) • Sub-13 (10º) • Sub-16 (11º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 21, cumulativePts: 21, rankAtStage: 13 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 18, cumulativePts: 39, rankAtStage: 13 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 30, cumulativePts: 69, rankAtStage: 12 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 24, cumulativePts: 93, rankAtStage: 12 }
    ]
  },
  {
    name: "Touguinha Touguinhó",
    isAjavp: false,
    cmRank: 12, cmPts: 24,
    fbRank: 9, fbPts: 21,
    fsRank: 9, fsPts: 35,
    tmRank: 17, tmPts: 6,
    pontos: 86,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Sub-7 (8º) • Sub-9 (8º) • Sub-11 (8º) • Sub-13 (8º) • Sub-16 (8º)",
    delta: -4,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 24, cumulativePts: 24, rankAtStage: 12 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 21, cumulativePts: 45, rankAtStage: 10 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 35, cumulativePts: 80, rankAtStage: 9 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 6, cumulativePts: 86, rankAtStage: 13 }
    ]
  },
  {
    name: "Modivas",
    isAjavp: false,
    cmRank: 15, cmPts: 15,
    fbRank: 13, fbPts: 9,
    fsRank: 14, fsPts: 20,
    tmRank: 12, tmPts: 21,
    pontos: 65,
    gold: 0, silver: 1, bronze: 0,
    futsalDetail: "Sub-7 (11º) • Sub-9 (11º) • Sub-11 (11º) • Sub-13 (11º) • Sub-16 (11º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 15, cumulativePts: 15, rankAtStage: 15 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 9, cumulativePts: 24, rankAtStage: 15 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 20, cumulativePts: 44, rankAtStage: 14 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 21, cumulativePts: 65, rankAtStage: 14 }
    ]
  },
  {
    name: "Aveleda",
    isAjavp: false,
    cmRank: 17, cmPts: 9,
    fbRank: 15, fbPts: 9,
    fsRank: 15, fsPts: 15,
    tmRank: 19, tmPts: -15,
    tmNp: true,
    pontos: 18,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Sub-7 (13º) • Sub-9 (12º) • Sub-11 (13º) • Sub-13 (13º) • Sub-16 (13º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 9, cumulativePts: 9, rankAtStage: 17 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 9, cumulativePts: 18, rankAtStage: 16 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 15, cumulativePts: 33, rankAtStage: 15 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: -15, cumulativePts: 18, rankAtStage: 15 }
    ]
  },
  {
    name: "Vairão",
    isAjavp: false,
    cmRank: 14, cmPts: 18,
    fbRank: 16, fbPts: 6,
    fsRank: 16, fsPts: -25,
    fsNp: true,
    tmRank: 14, tmPts: 15,
    pontos: 14,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Não Participou (N/P)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 18, cumulativePts: 18, rankAtStage: 14 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 6, cumulativePts: 24, rankAtStage: 15 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: -25, cumulativePts: -1, rankAtStage: 16 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 15, cumulativePts: 14, rankAtStage: 16 }
    ]
  },
  {
    name: "Macieira",
    isAjavp: false,
    cmRank: 16, cmPts: 12,
    fbRank: 17, fbPts: -15,
    fbNp: true,
    fsRank: 17, fsPts: -25,
    fsNp: true,
    tmRank: 16, tmPts: 9,
    pontos: -19,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Não Participou (N/P)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 12, cumulativePts: 12, rankAtStage: 16 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: -15, cumulativePts: -3, rankAtStage: 17 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: -25, cumulativePts: -28, rankAtStage: 17 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 9, cumulativePts: -19, rankAtStage: 17 }
    ]
  },
  {
    name: "Malta",
    isAjavp: false,
    cmRank: 19, cmPts: 3,
    fbRank: 19, fbPts: -15,
    fbNp: true,
    fsRank: 19, fsPts: -25,
    fsNp: true,
    tmRank: 13, tmPts: 18,
    pontos: -19,
    gold: 0, silver: 1, bronze: 0,
    futsalDetail: "Não Participou (N/P)",
    delta: 1,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 3, cumulativePts: 3, rankAtStage: 19 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: -15, cumulativePts: -12, rankAtStage: 19 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: -25, cumulativePts: -37, rankAtStage: 19 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 18, cumulativePts: -19, rankAtStage: 18 }
    ]
  },
  {
    name: "Rio Mau",
    isAjavp: false,
    cmRank: 18, cmPts: 6,
    fbRank: 18, fbPts: -15,
    fbNp: true,
    fsRank: 18, fsPts: -25,
    fsNp: true,
    tmRank: 18, tmPts: 3,
    pontos: -31,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Não Participou (N/P)",
    delta: -1,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 6, cumulativePts: 6, rankAtStage: 18 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: -15, cumulativePts: -9, rankAtStage: 18 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: -25, cumulativePts: -34, rankAtStage: 18 },
      { stageId: 'tm', stageLabel: 'Ténis Mesa (E1)', stageShort: 'TM', stagePts: 3, cumulativePts: -31, rankAtStage: 19 }
    ]
  }
];

export const JIF_PONTUACAO_RULES = [
  {
    modalidade: 'Ténis de Mesa',
    incremento: 'Incremento de 3 pts (Base 18 equipas)',
    escala: '54 a 3 pts (3 Encontros Concelhios)',
    npPenalizacao: '-15 pts (Falta de Comparência) / -6 pts (Desqualificação)'
  },
  {
    modalidade: 'Futsal',
    incremento: 'Incremento de 5 pts',
    escala: '75 a 5 pts',
    npPenalizacao: '-25 pts (Falta de Comparência)'
  },
  {
    modalidade: 'Atletismo',
    incremento: 'Incremento de 3 pts',
    escala: '57 a 3 pts',
    npPenalizacao: '-15 pts (Falta de Comparência)'
  },
  {
    modalidade: 'Futebol',
    incremento: 'Incremento de 3 pts',
    escala: '45 a 3 pts',
    npPenalizacao: '-15 pts (Falta de Comparência)'
  },
  {
    modalidade: 'Badminton & Duatlo',
    incremento: 'Incremento de 2 pts',
    escala: 'Por equipas',
    npPenalizacao: '-10 pts (Falta de Comparência)'
  },
  {
    modalidade: 'Futebol de Praia',
    incremento: 'Incremento de 1 pt',
    escala: 'Evento único',
    npPenalizacao: '-5 pts (Falta de Comparência)'
  }
];
