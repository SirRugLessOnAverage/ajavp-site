/**
 * Regulamento Oficial da Modalidade de Ténis de Mesa • XL Jogos Inter-Freguesias de Vila do Conde
 * Fonte Oficial: Associação de Desportos e Cultura do Concelho de Vila do Conde (ADCCVC - Fundada em 1978)
 */

export interface TenisMesaEscalaoInfo {
  nome: string;
  genero: 'Masculino' | 'Feminino';
  anosNascimento: string;
  periodo: 'Manhã' | 'Tarde';
  horarioInicio: string;
  horarioInscricaoLimite: string;
  horarioAlteracaoLimite: string;
  elegibilidadeSubida?: string;
}

export interface TenisMesaEncontroInfo {
  numero: number;
  data: string;
  local: string;
  estado: 'Agendado' | 'Concluído' | 'Em Curso';
  descricao: string;
}

export interface TenisMesaSecaoRegulamento {
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

export const TENIS_MESA_ENCONTROS: TenisMesaEncontroInfo[] = [
  {
    numero: 1,
    data: '2026-11-07',
    local: 'Casa da Juventude de Guilhabreu',
    estado: 'Concluído',
    descricao: '1º Encontro Concelhio Oficial de Ténis de Mesa dos XL JIF • AJAVP Venceu o Encontro em 1º Lugar com 14 pts e 9 Pódios!'
  },
  {
    numero: 2,
    data: '2027-01-23',
    local: 'Casa da Juventude de Guilhabreu',
    estado: 'Agendado',
    descricao: '2º Encontro Concelhio Oficial de Ténis de Mesa dos XL JIF (Manhã 09h30 • Tarde 14h30).'
  },
  {
    numero: 3,
    data: '2027-03-13',
    local: 'Casa da Juventude de Guilhabreu',
    estado: 'Agendado',
    descricao: '3º Encontro Concelhio Oficial e Fecho do Troféu de Ténis de Mesa (Manhã 09h30 • Tarde 14h30).'
  }
];

export const TENIS_MESA_ESCALOES: TenisMesaEscalaoInfo[] = [
  {
    nome: 'Sub 11 Masculinos',
    genero: 'Masculino',
    anosNascimento: '2016 – 2017',
    periodo: 'Manhã',
    horarioInicio: '09:30',
    horarioInscricaoLimite: '09:15',
    horarioAlteracaoLimite: '09:00',
    elegibilidadeSubida: 'Atletas de 2016 podem jogar também nos Sub-13 (intervalo mín. 16h).'
  },
  {
    nome: 'Sub 13 Masculinos',
    genero: 'Masculino',
    anosNascimento: '2014 – 2015',
    periodo: 'Manhã',
    horarioInicio: '09:30',
    horarioInscricaoLimite: '09:15',
    horarioAlteracaoLimite: '09:00',
    elegibilidadeSubida: 'Atletas de 2014 podem jogar também nos Sub-16 (intervalo mín. 16h).'
  },
  {
    nome: 'Sub 15 Femininos',
    genero: 'Feminino',
    anosNascimento: '2012 – 2013 – 2014',
    periodo: 'Manhã',
    horarioInicio: '09:30',
    horarioInscricaoLimite: '09:15',
    horarioAlteracaoLimite: '09:00',
    elegibilidadeSubida: 'Atletas de 2012 podem jogar também em Livre Femininos (intervalo mín. 16h).'
  },
  {
    nome: 'Sub 16 Masculinos',
    genero: 'Masculino',
    anosNascimento: '2011 – 2012 – 2013',
    periodo: 'Tarde',
    horarioInicio: '14:30',
    horarioInscricaoLimite: '14:15',
    horarioAlteracaoLimite: '14:00',
    elegibilidadeSubida: 'Atletas de 2011 podem jogar também em Livre Masculinos (intervalo mín. 16h).'
  },
  {
    nome: 'Livre Masculinos',
    genero: 'Masculino',
    anosNascimento: '2010 – 2009 – anteriores',
    periodo: 'Tarde',
    horarioInicio: '14:30',
    horarioInscricaoLimite: '14:15',
    horarioAlteracaoLimite: '14:00'
  },
  {
    nome: 'Livre Femininos',
    genero: 'Feminino',
    anosNascimento: '2011 – 2010 – anteriores',
    periodo: 'Tarde',
    horarioInicio: '14:30',
    horarioInscricaoLimite: '14:15',
    horarioAlteracaoLimite: '14:00'
  }
];

export const TENIS_MESA_SECOES_REGULAMENTO: TenisMesaSecaoRegulamento[] = [
  {
    id: 'formato-encontros',
    titulo: '1. Formato da Competição & 3 Encontros',
    subtitulo: 'Estrutura dos torneios e apuramento individual e por equipas',
    badge: 'Formato Oficial',
    itens: [
      {
        rotulo: 'Número de Encontros',
        detalhe: 'São realizados 3 encontros independentes entre si ao longo da época concelhia (todos na Casa da Juventude de Guilhabreu).'
      },
      {
        rotulo: 'Exclusão de Escalões',
        detalhe: 'Destina-se a todos os escalões dos JIF com EXCEÇÃO de Sub-7 Masculinos e Sub-9 Masculinos (não há prova para estes escalões).',
        destaque: true
      },
      {
        rotulo: 'Quórum Mínimo por Escalão',
        detalhe: 'O número mínimo de atletas por escalão para que se dispute a prova é de 8 atletas. Com menos de 8 inscritos não haverá prova.'
      },
      {
        rotulo: 'Inscrições por Equipa / Encontro',
        detalhe: 'Cada equipa pode inscrever entre 1 a 3 atletas em cada um dos encontros (podendo inscrever mais 2 dependendo do quórum geral).'
      },
      {
        rotulo: 'Fase de Grupos & Eliminatórias',
        detalhe: 'Se houver menos de 6 jogadores: série única de todos contra todos. Com 6 ou mais jogadores: fase de grupos (sem confrontos entre atletas da mesma freguesia na 1ª fase) e fase final por eliminatórias.'
      },
      {
        rotulo: 'Apuramento da Equipa Vencedora por Escalão',
        detalhe: 'É considerado o somatório das classificações obtidas pelas freguesias nos 3 encontros. Vence a equipa que somar o menor número de pontos (à semelhança do Corta-Mato).'
      }
    ]
  },
  {
    id: 'escaloes-horarios',
    titulo: '2. Escalões, Turnos & Horários em Guilhabreu',
    subtitulo: 'Horários estritos de chegada, presença e jogo para 07 de Novembro',
    badge: '07/Nov • Guilhabreu',
    itens: [
      {
        rotulo: 'Turno da Manhã • 09h30',
        detalhe: 'Sub-11 Masc (2016-2017), Sub-13 Masc (2014-2015) e Sub-15 Fem (2012-2014). Início às 09:30.',
        destaque: true
      },
      {
        rotulo: 'Horário Limite da Manhã',
        detalhe: 'Inscrição de atletas até às 09:15. Informação de ausências/alterações até às 09:00. Inscrições posteriores não são aceites.',
        aviso: true
      },
      {
        rotulo: 'Turno da Tarde • 14h30',
        detalhe: 'Sub-16 Masc (2011-2013), Livre Masc (2010 e ant.) e Livre Fem (2011 e ant.). Início às 14:30.',
        destaque: true
      },
      {
        rotulo: 'Horário Limite da Tarde',
        detalhe: 'Inscrição de atletas até às 14:15. Informação de ausências/alterações até às 14:00. Inscrições posteriores não são aceites.',
        aviso: true
      },
      {
        rotulo: 'Regra de Transição (Atletas de Último Ano)',
        detalhe: 'Atletas de último ano do escalão podem também jogar no escalão acima, desde que seja cumprido um intervalo mínimo de 16 horas entre os jogos.'
      }
    ]
  },
  {
    id: 'regras-partidas',
    titulo: '3. Regras de Jogo, Partidas a 11 Pts & Arbitragem',
    subtitulo: 'Regulamentação das partidas individuais e deveres das equipas',
    badge: 'Leis do Jogo',
    itens: [
      {
        rotulo: 'Formato das Partidas',
        detalhe: 'As partidas de singulares são disputadas à melhor de 3 jogos (termina logo que um atleta consiga 2 vitórias).'
      },
      {
        rotulo: 'Pontuação de Cada Jogo',
        detalhe: 'Cada jogo disputa-se até aos 11 pontos. Com empate 10-10, ganha o atleta que fizer 2 pontos consecutivos com serviços alternados.'
      },
      {
        rotulo: 'Pontos na Fase de Grupos',
        detalhe: 'Vitória: 3 pontos • Derrota: 0 pontos • Falta de comparência: -1 ponto.'
      },
      {
        rotulo: 'Arbitragem Partilhada',
        detalhe: 'Os árbitros são da responsabilidade das freguesias inscritas na modalidade, podendo ser monitores ou atletas que não estejam a competir no momento.'
      },
      {
        rotulo: 'Elementos Junto às Mesas',
        detalhe: 'Apenas podem estar junto à mesa os atletas da ficha de jogo e o monitor/treinador com identificação oficial visível.'
      },
      {
        rotulo: 'Equipamento Obrigatório',
        detalhe: 'Camisola, calções, meias, sapatilhas e raquete regulamentar de Ténis de Mesa. Vestimenta inadequada impede a disputa e atribui derrota.'
      }
    ]
  },
  {
    id: 'pontuacao-jif',
    titulo: '4. Pontuação para a Classificação Geral dos JIF (Artigo XV)',
    subtitulo: 'Cálculo de pontos concelhios, penalizações e desempates',
    badge: 'Artigo XV • Concelhio',
    itens: [
      {
        rotulo: 'Cálculo por Encontro',
        detalhe: 'Em cada escalão e encontro, calcula-se o somatório da classificação dos 3 melhores atletas de cada freguesia.'
      },
      {
        rotulo: 'Atletas em Falta na Equipa',
        detalhe: 'Se uma equipa inscrever apenas 1 ou 2 atletas, aos atletas em falta é atribuída a pontuação de último classificado acrescida de 5 pontos de penalização.'
      },
      {
        rotulo: 'Não Apresentação de Equipa no Escalão',
        detalhe: 'É atribuída a pontuação de último desse escalão com 5 pontos de penalização.'
      },
      {
        rotulo: 'Incremento de 3 Pontos nos JIF',
        detalhe: 'Após o somatório dos escalões nos 3 encontros, a última equipa classificada soma 3 pontos nos JIF, a penúltima 6 pontos, a seguinte 9 pontos, e assim sucessivamente até ao 1º classificado concelhio.',
        destaque: true
      },
      {
        rotulo: 'Falta de Comparência Concelhia (N/P)',
        detalhe: 'A não apresentação de equipa na modalidade de Ténis de Mesa implica a penalização obrigatória de -15 pontos na Classificação Geral dos JIF.',
        aviso: true
      },
      {
        rotulo: 'Desqualificação da Modalidade',
        detalhe: 'Se uma equipa participar efetivamente mas for desqualificada, a sua pontuação final na modalidade será de -6 pontos.',
        aviso: true
      }
    ]
  },
  {
    id: 'elegibilidade-disciplina',
    titulo: '5. Elegibilidade, Proibição de Federados & Código Disciplinar',
    subtitulo: 'Regras estritas de integridade desportiva e sanções ADCCVC',
    badge: 'Tolerância Zero',
    itens: [
      {
        rotulo: 'Proibição Absoluta de Atletas Federados',
        detalhe: 'É expressamente proibida a utilização de atletas inscritos durante a presente época na Associação ou Federação de Ténis de Mesa.',
        aviso: true
      },
      {
        rotulo: 'Sanção por Utilização Indevida de Federado',
        detalhe: 'Desclassificação do atleta utilizado irregularmente, pontuação do 3º atleta fixada em último + 2 pontos, e multa de 50€ ao Monitor Coordenador da freguesia.',
        aviso: true
      },
      {
        rotulo: 'Infrações Junto à Mesa de Jogo',
        detalhe: '1ª infração: multa de 10€ • 2ª infração: multa de 20€ • 3ª infração: suspensão de 15 dias do Monitor Coordenador.'
      },
      {
        rotulo: 'Comportamento Antidesportivo',
        detalhe: 'Comportamento incorreto de atleta: suspensão automática de 2 jogos. Comportamento incorreto de monitor: suspensão mínima de 15 dias (cumprida em todas as modalidades dos JIF).'
      },
      {
        rotulo: 'Protestos Oficiais',
        detalhe: 'A intenção de protesto tem obrigatoriamente de ser lavrada no Boletim de Jogo e entregue à Organização no prazo máximo de 48 horas.'
      }
    ]
  }
];



export interface TenisMesaAtletaResultado {
  nome: string;
  posicao: number;
  medalha?: 'ouro' | 'prata' | 'bronze';
  nota?: string;
}

export interface TenisMesaEscalaoResultado {
  escalao: string;
  genero: 'Masculino' | 'Feminino';
  posicaoEquipa: number;
  pontosEquipa: number;
  destaque?: string;
  atletas: TenisMesaAtletaResultado[];
}

export interface TenisMesaFreguesiaResultado {
  clas: number;
  freguesia: string;
  sub11: number;
  sub13: number;
  sub15F: number;
  sub16: number;
  livreM: number;
  livreF: number;
  total: number;
  pontosJif: number;
  isAjavp?: boolean;
}

export interface TenisMesa1EncontroData {
  encontroNumero: number;
  data: string;
  local: string;
  freguesiasParticipantes: number;
  ajavpResumo: {
    clasGeral: number;
    pontosTorneio: number;
    pontosJif: number;
    totalAtletas: number;
    campeoes: number;
    viceCampeoes: number;
    bronzes: number;
    totalPodios: number;
  };
  classificacaoColetiva: TenisMesaFreguesiaResultado[];
  quadroHonraAjavp: TenisMesaEscalaoResultado[];
}

export const TENIS_MESA_1_ENCONTRO: TenisMesa1EncontroData = {
  encontroNumero: 1,
  data: '2026-11-07',
  local: 'Casa da Juventude de Guilhabreu',
  freguesiasParticipantes: 18,
  ajavpResumo: {
    clasGeral: 1,
    pontosTorneio: 14,
    pontosJif: 54,
    totalAtletas: 24,
    campeoes: 3,
    viceCampeoes: 3,
    bronzes: 3,
    totalPodios: 9
  },
  classificacaoColetiva: [
    { clas: 1, freguesia: 'Vilar do Pinheiro', sub11: 1, sub13: 5, sub15F: 3, sub16: 1, livreM: 2, livreF: 2, total: 14, pontosJif: 54, isAjavp: true },
    { clas: 2, freguesia: 'Gião', sub11: 8, sub13: 2, sub15F: 2, sub16: 2, livreM: 3, livreF: 8, total: 25, pontosJif: 51 },
    { clas: 3, freguesia: 'Árvore', sub11: 4, sub13: 3, sub15F: 4, sub16: 6, livreM: 5, livreF: 4, total: 26, pontosJif: 48 },
    { clas: 4, freguesia: 'Mosteiró', sub11: 9, sub13: 13, sub15F: 5, sub16: 4, livreM: 1, livreF: 6, total: 38, pontosJif: 45 },
    { clas: 5, freguesia: 'Bagunte', sub11: 2, sub13: 4, sub15F: 12, sub16: 8, livreM: 10, livreF: 3, total: 39, pontosJif: 42 },
    { clas: 6, freguesia: 'Outeiro Maior', sub11: 18, sub13: 11, sub15F: 12, sub16: 5, livreM: 4, livreF: 5, total: 55, pontosJif: 39 },
    { clas: 7, freguesia: 'Fornelo', sub11: 3, sub13: 14, sub15F: 12, sub16: 17, livreM: 9, livreF: 1, total: 56, pontosJif: 36 },
    { clas: 8, freguesia: 'Junqueira', sub11: 6, sub13: 8, sub15F: 12, sub16: 3, livreM: 16, livreF: 14, total: 59, pontosJif: 33 },
    { clas: 9, freguesia: 'Fajozes', sub11: 5, sub13: 1, sub15F: 12, sub16: 17, livreM: 14, livreF: 14, total: 63, pontosJif: 30 },
    { clas: 10, freguesia: 'Arcos', sub11: 18, sub13: 6, sub15F: 6, sub16: 7, livreM: 22, livreF: 14, total: 73, pontosJif: 27 },
    { clas: 11, freguesia: 'Canidelo', sub11: 11, sub13: 7, sub15F: 12, sub16: 17, livreM: 12, livreF: 14, total: 73, pontosJif: 24 },
    { clas: 12, freguesia: 'Modivas', sub11: 10, sub13: 20, sub15F: 12, sub16: 10, livreM: 11, livreF: 14, total: 77, pontosJif: 21 },
    { clas: 13, freguesia: 'Malta', sub11: 18, sub13: 20, sub15F: 1, sub16: 17, livreM: 8, livreF: 14, total: 78, pontosJif: 18 },
    { clas: 14, freguesia: 'Vairão', sub11: 18, sub13: 12, sub15F: 12, sub16: 9, livreM: 13, livreF: 14, total: 78, pontosJif: 15 },
    { clas: 15, freguesia: 'Tougues', sub11: 12, sub13: 9, sub15F: 12, sub16: 17, livreM: 15, livreF: 14, total: 79, pontosJif: 12 },
    { clas: 16, freguesia: 'Macieira', sub11: 18, sub13: 20, sub15F: 12, sub16: 17, livreM: 6, livreF: 7, total: 80, pontosJif: 9 },
    { clas: 17, freguesia: 'Touguinha Touguinhó', sub11: 7, sub13: 10, sub15F: 12, sub16: 17, livreM: 22, livreF: 14, total: 82, pontosJif: 6 },
    { clas: 18, freguesia: 'Rio Mau', sub11: 18, sub13: 20, sub15F: 12, sub16: 11, livreM: 7, livreF: 14, total: 82, pontosJif: 3 },
    { clas: 19, freguesia: 'Aveleda', sub11: 0, sub13: 0, sub15F: 0, sub16: 0, livreM: 0, livreF: 0, total: 0, pontosJif: -15 }
  ],
  quadroHonraAjavp: [
    {
      escalao: 'Sub 11 Masculinos',
      genero: 'Masculino',
      posicaoEquipa: 1,
      pontosEquipa: 6,
      destaque: 'Pódio 100% AJAVP • 1º, 2º e 3º Lugares Conquistados',
      atletas: [
        { nome: 'Johnny Ye', posicao: 1, medalha: 'ouro', nota: 'Campeão Sub-11 (Venceu final por 2-1)' },
        { nome: 'Dong Xuan', posicao: 2, medalha: 'prata', nota: 'Vice-Campeão Sub-11' },
        { nome: 'Francisco Fernandes', posicao: 3, medalha: 'bronze', nota: 'Medalha de Bronze (Venceu 3º lugar por 2-0)' },
        { nome: 'Diogo Moura', posicao: 7, nota: 'Quartos de Final (7º classificado)' },
        { nome: 'Tomás Costa', posicao: 15, nota: 'Oitavos de Final (15º classificado)' }
      ]
    },
    {
      escalao: 'Sub 16 Masculinos',
      genero: 'Masculino',
      posicaoEquipa: 1,
      pontosEquipa: 9,
      destaque: 'Final 100% AJAVP • Campeão e Vice-Campeão Concelhio',
      atletas: [
        { nome: 'Afonso Fernandes', posicao: 1, medalha: 'ouro', nota: 'Campeão Sub-16 (Venceu final por 2-0)' },
        { nome: 'Rodrigo Pereira', posicao: 2, medalha: 'prata', nota: 'Vice-Campeão Sub-16' },
        { nome: 'Duarte Gomes', posicao: 6, nota: 'Quartos de Final (6º classificado)' }
      ]
    },
    {
      escalao: 'Livre Masculinos',
      genero: 'Masculino',
      posicaoEquipa: 2,
      pontosEquipa: 22,
      destaque: 'Campeão Individual Livre & Vice-Campeões por Equipas',
      atletas: [
        { nome: 'Pedro Cruz', posicao: 1, medalha: 'ouro', nota: 'Campeão Individual (Venceu final por 2-1 vs Bruno Miranda/Modivas)' },
        { nome: 'Paulo Azevedo', posicao: 7, nota: 'Quartos de Final (7º classificado)' },
        { nome: 'Maurício Xavier', posicao: 14, nota: 'Oitavos de Final (14º classificado)' },
        { nome: 'Francisco Azevedo', posicao: 20, nota: 'Fase de Séries (20º classificado)' },
        { nome: 'Rui Vieira', posicao: 21, nota: 'Fase de Séries (21º classificado)' }
      ]
    },
    {
      escalao: 'Sub 13 Masculinos',
      genero: 'Masculino',
      posicaoEquipa: 5,
      pontosEquipa: 48,
      destaque: 'Dois Atletas no Pódio Concelhio (Prata e Bronze)',
      atletas: [
        { nome: 'Rafael Dawson', posicao: 2, medalha: 'prata', nota: 'Vice-Campeão Sub-13 (Finalista vs Afonso Ramos/Gião)' },
        { nome: 'Pedro Moreira', posicao: 3, medalha: 'bronze', nota: 'Medalha de Bronze (Venceu 3º lugar por 2-0)' },
        { nome: 'Diego Feng', posicao: 43, nota: 'Fase de Grupos (43º classificado)' }
      ]
    },
    {
      escalao: 'Livre Femininos',
      genero: 'Feminino',
      posicaoEquipa: 2,
      pontosEquipa: 22,
      destaque: 'Pódio Concelhio & Vice-Campeãs por Equipas',
      atletas: [
        { nome: 'Diana Barata', posicao: 3, medalha: 'bronze', nota: 'Medalha de Bronze (Venceu 3º lugar por 2-0)' },
        { nome: 'Beatriz Ribeiro', posicao: 9, nota: 'Quartos de Final (9ª classificada)' },
        { nome: 'Ana Pereira', posicao: 10, nota: 'Quartos de Final (10ª classificada)' }
      ]
    },
    {
      escalao: 'Sub 15 Femininos',
      genero: 'Feminino',
      posicaoEquipa: 3,
      pontosEquipa: 33,
      destaque: 'Pódio Coletivo por Equipas (3º Lugar Geral)',
      atletas: [
        { nome: 'Clara Pereira', posicao: 10, nota: 'Quartos de Final (10ª classificada)' },
        { nome: 'Evelyn Chen', posicao: 11, nota: 'Quartos de Final (11ª classificada)' },
        { nome: 'Núria Martins', posicao: 12, nota: 'Quartos de Final (12ª classificada)' },
        { nome: 'Benedita Sousa', posicao: 15, nota: 'Fase de Séries (15ª classificada)' },
        { nome: 'Carolina Oliveira', posicao: 16, nota: 'Fase de Séries (16ª classificada)' }
      ]
    }
  ]
};
