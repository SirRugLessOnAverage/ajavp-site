/**
 * Regulamento Oficial & Percursos da Prova de Duatlo Individual • XL Jogos Inter-Freguesias de Vila do Conde
 * Fonte Oficial: ADCCVC (Comunicado 11, Regulamento de Duatlo Individual e Regras da Prova)
 */

export interface DuatloEscalaoInfo {
  escalao: string;
  anosNascimento: string;
  atletismo1: string;
  btt: string;
  atletismo2: string;
  notaPercurso: string;
}

export interface DuatloSecaoRegulamento {
  id: string;
  titulo: string;
  subtitulo: string;
  badge: string;
  itens: {
    rotulo: string;
    detalhe: string;
    destaque?: boolean;
    aviso?: boolean;
  }[];
}

export const DUATLO_INFO_GERAL = {
  data: '2026-12-05',
  dataFormatada: '05 de Dezembro de 2026',
  horaInicio: '09h30',
  local: 'Cividade de Bagunte (UF Bagunte, Ferreiró, Outeiro Maior e Parada)',
  concentracao: 'Parque de estacionamento à entrada da Cividade de Bagunte',
  totalInscritos: 135,
  ordemPartida: 'Provas seguidas, iniciando pelos escalões Livres (Séniores e Veteranos)',
  mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Cividade+de+Bagunte+Vila+do+Conde',
};

export const DUATLO_ESCALOES: DuatloEscalaoInfo[] = [
  {
    escalao: 'Sub-11 Masculinos',
    anosNascimento: '2016 e 2017',
    atletismo1: '800 m',
    btt: '1500 m',
    atletismo2: '400 m',
    notaPercurso: 'Atletismo no interior da Cividade',
  },
  {
    escalao: 'Sub-13 Masculino',
    anosNascimento: '2014 a 2015',
    atletismo1: '1000 m',
    btt: '3000 m',
    atletismo2: '500 m',
    notaPercurso: 'BTT: Zona envolvente à Cividade (1 volta)',
  },
  {
    escalao: 'Sub-15 Feminino',
    anosNascimento: '2012 a 2014',
    atletismo1: '1000 m',
    btt: '3000 m',
    atletismo2: '500 m',
    notaPercurso: 'BTT: Zona envolvente à Cividade (1 volta)',
  },
  {
    escalao: 'Sub-16 Masculino',
    anosNascimento: '2011 a 2013',
    atletismo1: '2000 m',
    btt: '6000 m',
    atletismo2: '1000 m',
    notaPercurso: 'BTT: Zona envolvente à Cividade (2 voltas)',
  },
  {
    escalao: 'Livre Feminino (Sén. e Vet.)',
    anosNascimento: '< 1988 a 2011',
    atletismo1: '2000 m',
    btt: '6000 m',
    atletismo2: '1000 m',
    notaPercurso: 'BTT: Zona envolvente à Cividade (2 voltas)',
  },
  {
    escalao: 'Livre Masculino (Sén. e Vet.)',
    anosNascimento: '< 1988 a 2010',
    atletismo1: '2000 m',
    btt: '6000 m',
    atletismo2: '1000 m',
    notaPercurso: 'BTT: Zona envolvente à Cividade (2 voltas)',
  },
];

export const DUATLO_SECOES_REGULAMENTO: DuatloSecaoRegulamento[] = [
  {
    id: 'segmentos-transicao',
    titulo: '1. Segmentos, Capacete & Zona de Transição (Artigo 2.º)',
    subtitulo: 'Regras obrigatórias de segurança entre corrida e bicicleta',
    badge: 'Obrigatório',
    itens: [
      {
        rotulo: 'Capacete Homologado no BTT',
        detalhe: 'Durante o segmento de atletismo NÃO é permitida a utilização de capacete. No segmento de ciclismo (BTT), a utilização de capacete homologado é estritamente obrigatória.',
        destaque: true,
      },
      {
        rotulo: 'Entrada e Saída de Bicicleta',
        detalhe: 'Após o 1.º segmento de atletismo, o atleta deve colocar corretamente o capacete, retirar a bicicleta do local indicado e só pode montar na bicicleta após sair da zona de transição.',
        aviso: true,
      },
      {
        rotulo: 'Desmontar Antes da Transição',
        detalhe: 'No final do segmento de ciclismo, o atleta deve desmontar antes de entrar na zona de transição, deslocando-se a pé até ao cavalete, onde coloca a bicicleta e deixa o capacete na bicicleta.',
        aviso: true,
      },
    ],
  },
  {
    id: 'conduta-acompanhamento',
    titulo: '2. Conduta, Acompanhamento & Aquecimento (Artigos 1.º e 3.º)',
    subtitulo: 'Integridade da prova e segurança de todos os participantes',
    badge: 'Fair-Play',
    itens: [
      {
        rotulo: 'Proibição Total de Acompanhamento',
        detalhe: 'É expressamente proibido o acompanhamento dos atletas por técnicos, treinadores ou qualquer outra pessoa, independentemente da distância a que esse acompanhamento seja efetuado.',
        aviso: true,
      },
      {
        rotulo: 'Horário de Aquecimento',
        detalhe: 'O aquecimento ou reconhecimento dos percursos deve ser realizado obrigatoriamente antes do início da 1.ª prova. Não é permitida a presença de atletas em aquecimento no percurso durante as provas.',
      },
      {
        rotulo: 'Dorsal & Equipamento',
        detalhe: 'Todos os atletas têm de estar identificados com o respetivo dorsal durante toda a prova. Conduta antidesportiva (empurrões ou obstruções) implica desclassificação imediata.',
      },
    ],
  },
  {
    id: 'penalizacoes-classificacao',
    titulo: '3. Penalizações, Pontuação & Elegibilidade (Artigo 4.º & Geral)',
    subtitulo: 'Critérios de apuramento coletivo, seguro e protestos',
    badge: 'Regulamento ADCCVC',
    itens: [
      {
        rotulo: 'Penalizações por Incumprimento',
        detalhe: 'O incumprimento das normas da prova resulta na descida de 3 (mínimo) a 5 lugares na classificação final do atleta, sem prejuízo de outras sanções da organização.',
        aviso: true,
      },
      {
        rotulo: 'Classificação Individual e Coletiva',
        detalhe: 'Os 3 primeiros por escalão recebem medalha no final da atividade. Coletivamente vence a equipa com menor somatório de pontos dos seus 3 primeiros atletas (desempate pelo atleta melhor classificado).',
        destaque: true,
      },
      {
        rotulo: 'Elegibilidade, Não Federados & Segurança',
        detalhe: 'Apenas atletas nascidos ou residentes no concelho de Vila do Conde e não federados. A prova conta com seguro de Acidentes Pessoais (DL n.º 146/93) e policiamento da GNR.',
      },
    ],
  },
];
