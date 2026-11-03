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
    estado: 'Agendado',
    descricao: '1º Encontro Concelhio Oficial de Ténis de Mesa dos XL JIF.'
  },
  {
    numero: 2,
    data: 'A definir (Fevereiro 2027)',
    local: 'Casa da Juventude de Guilhabreu',
    estado: 'Agendado',
    descricao: '2º Encontro Concelhio Oficial.'
  },
  {
    numero: 3,
    data: 'A definir (Março 2027)',
    local: 'Casa da Juventude de Guilhabreu',
    estado: 'Agendado',
    descricao: '3º Encontro Concelhio e Fecho do Troféu de Ténis de Mesa.'
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

