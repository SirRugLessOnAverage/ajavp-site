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
    futsalDetail: "Sub-7 (1º) • Sub-9 (3º) • Sub-11 (2º) • Sub-13 (1º) • Sub-16 (1º)"
  },
  {
    name: "Árvore",
    isAjavp: false,
    cmRank: 4, cmPts: 48,
    fbRank: 4, fbPts: 39,
    fsRank: 2, fsPts: 75,
    pontos: 162,
    gold: 1, silver: 1, bronze: 2,
    futsalDetail: "Sub-7 (1º) • Sub-9 (2º) • Sub-11 (3º) • Sub-13 (3º) • Sub-16 (2º)"
  },
  {
    name: "Gião",
    isAjavp: false,
    cmRank: 2, cmPts: 54,
    fbRank: 5, fbPts: 36,
    fsRank: 4, fsPts: 65,
    pontos: 155,
    gold: 1, silver: 2, bronze: 1,
    futsalDetail: "Sub-7 (1º) • Sub-9 (5º) • Sub-11 (6º) • Sub-13 (6º) • Sub-16 (4º)"
  },
  {
    name: "Vilar do Pinheiro",
    isAjavp: true,
    cmRank: 1, cmPts: 57,
    fbRank: 6, fbPts: 33,
    fsRank: 5, fsPts: 60,
    pontos: 150,
    gold: 2, silver: 2, bronze: 2,
    futsalDetail: "Sub-7 (6º) • Sub-9 (1º 🥇) • Sub-11 (3º 🥉) • Sub-13 (10º)"
  },
  {
    name: "Junqueira",
    isAjavp: false,
    cmRank: 9, cmPts: 33,
    fbRank: 2, fbPts: 45,
    fsRank: 3, fsPts: 70,
    pontos: 148,
    gold: 0, silver: 2, bronze: 1,
    futsalDetail: "Sub-7 (1º) • Sub-9 (8º) • Sub-11 (7º) • Sub-13 (2º) • Sub-16 (3º)"
  },
  {
    name: "Tougues",
    isAjavp: false,
    cmRank: 5, cmPts: 45,
    fbRank: 3, fbPts: 42,
    fsRank: 6, fsPts: 55,
    pontos: 142,
    gold: 2, silver: 1, bronze: 0,
    futsalDetail: "Sub-7 (1º) • Sub-9 (11º) • Sub-11 (1º) • Sub-13 (8º) • Sub-16 (13º)"
  },
  {
    name: "Fornelo",
    isAjavp: false,
    cmRank: 6, cmPts: 42,
    fbRank: 7, fbPts: 30,
    fsRank: 7, fsPts: 50,
    pontos: 122,
    gold: 1, silver: 0, bronze: 1,
    futsalDetail: "Sub-7 (1º) • Sub-9 (10º) • Sub-11 (9º) • Sub-13 (16º) • Sub-16 (13º)"
  },
  {
    name: "Arcos",
    isAjavp: false,
    cmRank: 7, cmPts: 39,
    fbRank: 8, fbPts: 27,
    fsRank: 9, fsPts: 40,
    pontos: 106,
    gold: 0, silver: 1, bronze: 1,
    futsalDetail: "Sub-7 (17º) • Sub-9 (6º) • Sub-11 (15º) • Sub-13 (5º) • Sub-16 (7º)"
  },
  {
    name: "Canidelo",
    isAjavp: false,
    cmRank: 13, cmPts: 21,
    fbRank: 10, fbPts: 21,
    fsRank: 8, fsPts: 45,
    pontos: 87,
    gold: 0, silver: 0, bronze: 1,
    futsalDetail: "Sub-7 (1º) • Sub-9 (4º) • Sub-11 (15º) • Sub-13 (16º) • Sub-16 (13º)"
  },
  {
    name: "Mosteiró",
    isAjavp: false,
    cmRank: 8, cmPts: 36,
    fbRank: 12, fbPts: 15,
    fsRank: 11, fsPts: 30,
    pontos: 81,
    gold: 0, silver: 0, bronze: 1,
    futsalDetail: "Sub-7 (1º) • Sub-9 (17º) • Sub-11 (15º) • Sub-13 (7º) • Sub-16 (13º)"
  },
  {
    name: "Fajozes",
    isAjavp: false,
    cmRank: 10, cmPts: 30,
    fbRank: 11, fbPts: 18,
    fsRank: 12, fsPts: 25,
    pontos: 73,
    gold: 0, silver: 1, bronze: 0,
    futsalDetail: "Sub-7 (17º) • Sub-9 (17º) • Sub-11 (4º) • Sub-13 (4º) • Sub-16 (13º)"
  },
  {
    name: "Touguinha Touguinhó",
    isAjavp: false,
    cmRank: 12, cmPts: 24,
    fbRank: 9, fbPts: 24,
    fsRank: 13, fsPts: 20,
    pontos: 68,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Sub-7 (17º) • Sub-9 (9º) • Sub-11 (8º) • Sub-13 (10º) • Sub-16 (13º)"
  },
  {
    name: "Modivas",
    isAjavp: false,
    cmRank: 15, cmPts: 15,
    fbRank: 13, fbPts: 12,
    fsRank: 10, fsPts: 35,
    pontos: 62,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Sub-7 (1º) • Sub-9 (7º) • Sub-11 (15º) • Sub-13 (16º) • Sub-16 (13º)"
  },
  {
    name: "Outeiro Maior",
    isAjavp: false,
    cmRank: 11, cmPts: 27,
    fbRank: 14, fbPts: 9,
    fsRank: 16, fsPts: 5,
    pontos: 41,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Sub-7 (17º) • Sub-9 (17º) • Sub-11 (15º) • Sub-13 (16º) • Sub-16 (6º)"
  },
  {
    name: "Vairão",
    isAjavp: false,
    cmRank: 14, cmPts: 18,
    fbRank: 16, fbPts: 3,
    fsRank: 15, fsPts: 10,
    pontos: 31,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Sub-7 (17º) • Sub-9 (17º) • Sub-11 (15º) • Sub-13 (16º) • Sub-16 (5º)"
  },
  {
    name: "Aveleda",
    isAjavp: false,
    cmRank: 17, cmPts: 9,
    fbRank: 15, fbPts: 6,
    fsRank: 14, fsPts: 15,
    pontos: 30,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Sub-7 (1º) • Sub-9 (17º) • Sub-11 (15º) • Sub-13 (16º) • Sub-16 (13º)"
  },
  {
    name: "Macieira",
    isAjavp: false,
    cmRank: 16, cmPts: 12,
    fbRank: 0, fbPts: -15, fbNp: true,
    fsRank: 0, fsPts: -25, fsNp: true,
    pontos: -28,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Não participou (Penalização -25 pts)"
  },
  {
    name: "Rio Mau",
    isAjavp: false,
    cmRank: 18, cmPts: 6,
    fbRank: 0, fbPts: -15, fbNp: true,
    fsRank: 0, fsPts: -25, fsNp: true,
    pontos: -34,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Não participou (Penalização -25 pts)"
  },
  {
    name: "Malta",
    isAjavp: false,
    cmRank: 19, cmPts: 3,
    fbRank: 0, fbPts: -15, fbNp: true,
    fsRank: 0, fsPts: -25, fsNp: true,
    pontos: -37,
    gold: 0, silver: 0, bronze: 0,
    futsalDetail: "Não participou (Penalização -25 pts)"
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
