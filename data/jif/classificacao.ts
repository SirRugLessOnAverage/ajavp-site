export interface StageHistoryPoint {
  stageId: 'cm' | 'fb' | 'fs';
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
    fbRank: 1, fbPts: 48,
    fsRank: 1, fsPts: 80,
    pontos: 179,
    gold: 2, silver: 1, bronze: 1,
    futsalDetail: "Sub-7 (4º) • Sub-9 (2º) • Sub-11 (1º) • Sub-13 (1º) • Sub-16 (1º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 51, cumulativePts: 51, rankAtStage: 3 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 48, cumulativePts: 99, rankAtStage: 1 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 80, cumulativePts: 179, rankAtStage: 1 }
    ]
  },
  {
    name: "Árvore",
    isAjavp: false,
    cmRank: 4, cmPts: 48,
    fbRank: 4, fbPts: 39,
    fsRank: 2, fsPts: 75,
    pontos: 162,
    gold: 1, silver: 1, bronze: 2,
    futsalDetail: "Sub-7 (2º) • Sub-9 (6º) • Sub-11 (4º) • Sub-13 (2º) • Sub-16 (6º)",
    delta: 2,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 48, cumulativePts: 48, rankAtStage: 4 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 39, cumulativePts: 87, rankAtStage: 4 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 75, cumulativePts: 162, rankAtStage: 2 }
    ]
  },
  {
    name: "Gião",
    isAjavp: false,
    cmRank: 2, cmPts: 54,
    fbRank: 5, fbPts: 36,
    fsRank: 4, fsPts: 65,
    pontos: 155,
    gold: 1, silver: 2, bronze: 1,
    futsalDetail: "Sub-7 (7º) • Sub-9 (4º) • Sub-11 (8º) • Sub-13 (9º) • Sub-16 (2º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 54, cumulativePts: 54, rankAtStage: 2 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 36, cumulativePts: 90, rankAtStage: 3 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 65, cumulativePts: 155, rankAtStage: 3 }
    ]
  },
  {
    name: "Vilar do Pinheiro",
    isAjavp: true,
    cmRank: 1, cmPts: 57,
    fbRank: 6, fbPts: 33,
    fsRank: 5, fsPts: 60,
    pontos: 150,
    gold: 2, silver: 2, bronze: 2,
    futsalDetail: "Sub-7 (6º) • Sub-9 (1º 🥇) • Sub-11 (2º 🥈) • Sub-13 (10º)",
    delta: -2,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 57, cumulativePts: 57, rankAtStage: 1 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 33, cumulativePts: 90, rankAtStage: 2 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 60, cumulativePts: 150, rankAtStage: 4 }
    ]
  },
  {
    name: "Junqueira",
    isAjavp: false,
    cmRank: 9, cmPts: 33,
    fbRank: 2, fbPts: 45,
    fsRank: 3, fsPts: 70,
    pontos: 148,
    gold: 0, silver: 2, bronze: 1,
    futsalDetail: "Sub-7 (1º) • Sub-9 (7º) • Sub-11 (7º) • Sub-13 (8º) • Sub-16 (3º)",
    delta: 1,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 33, cumulativePts: 33, rankAtStage: 9 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 45, cumulativePts: 78, rankAtStage: 6 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 70, cumulativePts: 148, rankAtStage: 5 }
    ]
  },
  {
    name: "Tougues",
    isAjavp: false,
    cmRank: 5, cmPts: 45,
    fbRank: 3, fbPts: 42,
    fsRank: 6, fsPts: 55,
    pontos: 142,
    gold: 2, silver: 1, bronze: 0,
    futsalDetail: "Sub-7 (2º) • Sub-9 (5º) • Sub-11 (5º) • Sub-13 (7º) • Sub-16 (13º)",
    delta: -1,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 45, cumulativePts: 45, rankAtStage: 5 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 42, cumulativePts: 87, rankAtStage: 5 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 55, cumulativePts: 142, rankAtStage: 6 }
    ]
  },
  {
    name: "Fornelo",
    isAjavp: false,
    cmRank: 6, cmPts: 42,
    fbRank: 7, fbPts: 30,
    fsRank: 7, fsPts: 50,
    pontos: 122,
    gold: 1, silver: 0, bronze: 1,
    futsalDetail: "Sub-7 (5º) • Sub-9 (10º) • Sub-11 (3º) • Sub-13 (16º) • Sub-16 (13º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 42, cumulativePts: 42, rankAtStage: 6 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 30, cumulativePts: 72, rankAtStage: 7 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 50, cumulativePts: 122, rankAtStage: 7 }
    ]
  },
  {
    name: "Arcos",
    isAjavp: false,
    cmRank: 7, cmPts: 39,
    fbRank: 8, fbPts: 27,
    fsRank: 8, fsPts: 45,
    pontos: 111,
    gold: 0, silver: 1, bronze: 1,
    futsalDetail: "Sub-7 (17º) • Sub-9 (9º) • Sub-11 (15º) • Sub-13 (5º) • Sub-16 (4º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 39, cumulativePts: 39, rankAtStage: 7 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 27, cumulativePts: 66, rankAtStage: 8 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 45, cumulativePts: 111, rankAtStage: 8 }
    ]
  },
  {
    name: "Touguinha Touguinhó",
    isAjavp: false,
    cmRank: 12, cmPts: 24,
    fbRank: 9, fbPts: 24,
    fsRank: 9, fsPts: 40,
    pontos: 88,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Sub-7 (17º) • Sub-9 (8º) • Sub-11 (9º) • Sub-13 (6º) • Sub-16 (13º)",
    delta: 1,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 24, cumulativePts: 24, rankAtStage: 12 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 24, cumulativePts: 48, rankAtStage: 10 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 40, cumulativePts: 88, rankAtStage: 9 }
    ]
  },
  {
    name: "Fajozes",
    isAjavp: false,
    cmRank: 10, cmPts: 30,
    fbRank: 11, fbPts: 18,
    fsRank: 11, fsPts: 30,
    pontos: 78,
    gold: 0, silver: 1, bronze: 0,
    futsalDetail: "Sub-7 (17º) • Sub-9 (17º) • Sub-11 (6º) • Sub-13 (3º) • Sub-16 (13º)",
    delta: 1,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 30, cumulativePts: 30, rankAtStage: 10 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 18, cumulativePts: 48, rankAtStage: 11 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 30, cumulativePts: 78, rankAtStage: 10 }
    ]
  },
  {
    name: "Canidelo",
    isAjavp: false,
    cmRank: 13, cmPts: 21,
    fbRank: 10, fbPts: 21,
    fsRank: 10, fsPts: 35,
    pontos: 77,
    gold: 0, silver: 0, bronze: 1,
    futsalDetail: "Sub-7 (8º) • Sub-9 (3º) • Sub-11 (15º) • Sub-13 (16º) • Sub-16 (13º)",
    delta: 1,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 21, cumulativePts: 21, rankAtStage: 13 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 21, cumulativePts: 42, rankAtStage: 12 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 35, cumulativePts: 77, rankAtStage: 11 }
    ]
  },
  {
    name: "Mosteiró",
    isAjavp: false,
    cmRank: 8, cmPts: 36,
    fbRank: 12, fbPts: 15,
    fsRank: 12, fsPts: 25,
    pontos: 76,
    gold: 0, silver: 0, bronze: 1,
    futsalDetail: "Sub-7 (10º) • Sub-9 (17º) • Sub-11 (15º) • Sub-13 (4º) • Sub-16 (13º)",
    delta: -3,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 36, cumulativePts: 36, rankAtStage: 8 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 15, cumulativePts: 51, rankAtStage: 9 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 25, cumulativePts: 76, rankAtStage: 12 }
    ]
  },
  {
    name: "Outeiro Maior",
    isAjavp: false,
    cmRank: 11, cmPts: 27,
    fbRank: 14, fbPts: 9,
    fsRank: 14, fsPts: 15,
    pontos: 51,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Sub-7 (17º) • Sub-9 (17º) • Sub-11 (15º) • Sub-13 (16º) • Sub-16 (5º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 27, cumulativePts: 27, rankAtStage: 11 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 9, cumulativePts: 36, rankAtStage: 13 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 15, cumulativePts: 51, rankAtStage: 13 }
    ]
  },
  {
    name: "Modivas",
    isAjavp: false,
    cmRank: 15, cmPts: 15,
    fbRank: 13, fbPts: 12,
    fsRank: 13, fsPts: 20,
    pontos: 47,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Sub-7 (11º) • Sub-9 (11º) • Sub-11 (15º) • Sub-13 (16º) • Sub-16 (13º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 15, cumulativePts: 15, rankAtStage: 15 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 12, cumulativePts: 27, rankAtStage: 14 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 20, cumulativePts: 47, rankAtStage: 14 }
    ]
  },
  {
    name: "Vairão",
    isAjavp: false,
    cmRank: 14, cmPts: 18,
    fbRank: 16, fbPts: 3,
    fsRank: 16, fsPts: 5,
    pontos: 26,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Sub-7 (17º) • Sub-9 (17º) • Sub-11 (15º) • Sub-13 (16º) • Sub-16 (13º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 18, cumulativePts: 18, rankAtStage: 14 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 3, cumulativePts: 21, rankAtStage: 15 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 5, cumulativePts: 26, rankAtStage: 15 }
    ]
  },
  {
    name: "Aveleda",
    isAjavp: false,
    cmRank: 17, cmPts: 9,
    fbRank: 15, fbPts: 6,
    fsRank: 15, fsPts: 10,
    pontos: 25,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Sub-7 (9º) • Sub-9 (17º) • Sub-11 (15º) • Sub-13 (16º) • Sub-16 (13º)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 9, cumulativePts: 9, rankAtStage: 17 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: 6, cumulativePts: 15, rankAtStage: 16 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: 10, cumulativePts: 25, rankAtStage: 16 }
    ]
  },
  {
    name: "Macieira",
    isAjavp: false,
    cmRank: 16, cmPts: 12,
    fbRank: 0, fbPts: -15, fbNp: true,
    fsRank: 0, fsPts: -25, fsNp: true,
    pontos: -28,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Não participou (Penalização -25 pts)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 12, cumulativePts: 12, rankAtStage: 16 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: -15, cumulativePts: -3, rankAtStage: 17 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: -25, cumulativePts: -28, rankAtStage: 17 }
    ]
  },
  {
    name: "Rio Mau",
    isAjavp: false,
    cmRank: 18, cmPts: 6,
    fbRank: 0, fbPts: -15, fbNp: true,
    fsRank: 0, fsPts: -25, fsNp: true,
    pontos: -34,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Não participou (Penalização -25 pts)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 6, cumulativePts: 6, rankAtStage: 18 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: -15, cumulativePts: -9, rankAtStage: 18 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: -25, cumulativePts: -34, rankAtStage: 18 }
    ]
  },
  {
    name: "Malta",
    isAjavp: false,
    cmRank: 19, cmPts: 3,
    fbRank: 0, fbPts: -15, fbNp: true,
    fsRank: 0, fsPts: -25, fsNp: true,
    pontos: -37,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Não participou (Penalização -25 pts)",
    delta: 0,
    history: [
      { stageId: 'cm', stageLabel: 'Corta-Mato', stageShort: 'CM', stagePts: 3, cumulativePts: 3, rankAtStage: 19 },
      { stageId: 'fb', stageLabel: 'Futebol', stageShort: 'FB', stagePts: -15, cumulativePts: -12, rankAtStage: 19 },
      { stageId: 'fs', stageLabel: 'Futsal (J3)', stageShort: 'FS', stagePts: -25, cumulativePts: -37, rankAtStage: 19 }
    ]
  }
];

export const JIF_PONTUACAO_RULES = [
  {
    modalidade: 'Futsal',
    incremento: 'Incremento de 5 pts',
    escala: '80 a 5 pts',
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
    escala: '48 a 3 pts',
    npPenalizacao: '-15 pts (Falta de Comparência)'
  },
  {
    modalidade: 'Ténis de Mesa',
    incremento: 'Incremento de 3 pts',
    escala: '3 Encontros Concelhios (Art. XV)',
    npPenalizacao: '-15 pts (Falta de Comparência) / -6 pts (Desqualificação)'
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
