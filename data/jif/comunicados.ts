export interface JifCircularHighlight {
  title: string;
  badge?: string;
  description: string;
}

export interface JifCircular {
  id: number;
  numberFormatted: string;
  date: string;
  formattedDate: string;
  badge?: string;
  badgeColor?: 'amber' | 'emerald' | 'rose' | 'slate';
  title: string;
  summaryQuote?: string;
  highlights: JifCircularHighlight[];
}

export const JIF_VICTORY_SPOTLIGHT = {
  title: '"Vilar do Pinheiro está de parabéns pelo facto de ter vencido esta prova."',
  circularNumber: 4,
  date: '04 de Outubro de 2026',
  description:
    'A AJAVP e toda a freguesia de Vilar do Pinheiro foram oficialmente consagradas como vencedoras da prova de abertura dos XL Jogos Inter-Freguesias no Espaço Agros, perante 327 participantes de todo o concelho. A cerimónia contou com o Presidente da Câmara Municipal, Prof. Dr. Vítor Costa, e com o Presidente da ADCCVC, Idalécio Pontes, na entrega dos troféus aos 13 escalões.',
  position: '1º Lugar',
  category: 'Vencedores Coletivos',
  location: 'Corta-Mato Espaço Agros'
};

export const JIF_CIRCULARS: JifCircular[] = [
  {
    id: 7,
    numberFormatted: '07',
    date: '2026-10-27',
    formattedDate: '27 de Outubro de 2026',
    badge: 'Goleada Sub-9 (1-19) & Desistência Vairão',
    badgeColor: 'emerald',
    title: 'Resultados da 2ª Jornada de Futsal, Desistência de Vairão (Sub-16) e Sanções Disciplinares',
    summaryQuote:
      '"Foi disputada a 2ª Jornada de futsal... A equipa do Vairão, no escalão de Sub-16, desistiu da sua participação nas modalidades de futsal, futebol e futebol de praia. A desistência de uma equipa depois de iniciada a competição provoca necessariamente constrangimentos na organização... entendemos que devem ser aplicadas penalizações."',
    highlights: [
      {
        title: 'Resultados da 2ª Jornada de Futsal',
        badge: 'Goleada 1-19 💥',
        description:
          'Sub-9: Modivas 1 - 19 Vilar do Pinheiro (exibição de gala dos campeões). Sub-11: V. Pinheiro 9 - 1 Touguinha/Touguinhó. Sub-7: Gião 3 - 1 V. Pinheiro (1ª Jorn.) e V. Pinheiro 3 - 1 Aveleda (2ª Jorn. - 1ª vitória concelhia dos Sub-7). Sub-13: V. Pinheiro 3 - 10 Arcos.'
      },
      {
        title: 'Desistência Oficial de Vairão',
        badge: 'Sub-16',
        description:
          'A equipa do Vairão desistiu oficialmente de participar no escalão de Sub-16 nas modalidades de Futsal, Futebol e Futebol de Praia. A organização deliberou aplicar penalizações regulamentares para salvaguardar o normal funcionamento dos jogos e o compromisso das restantes equipas.'
      },
      {
        title: 'Sanção Disciplinar à Junqueira',
        badge: 'Multa 50€',
        description:
          'Aplicação de uma multa no valor de 50 euros à UDCR Junqueira na sequência de insultos e ameaças registados por parte do público afeto ao clube contra membros da organização (Artigo XIII, ponto 4 das Regras Gerais dos JIF).'
      },
      {
        title: 'Candidaturas, Ténis de Mesa & Agenda',
        badge: '07 Nov',
        description:
          'Malta e Arcos apresentaram candidatura para receber a Milha Urbana; Bagunte para o Duatlo. 1º Encontro de Ténis de Mesa a 07/Nov em Guilhabreu (Aveleda, Fornelo e Vairão devem regularizar atletas). Inscrições abertas até 31/Out. Próxima reunião da ADCCVC a 09/Nov (21h30).'
      }
    ]
  },
  {
    id: 6,
    numberFormatted: '06',
    date: '2026-10-19',
    formattedDate: '19 de Outubro de 2026',
    badge: 'Sub-11 no Pódio 🥉',
    badgeColor: 'amber',
    title: 'Balanço do 1º Torneio de Futebol em Retorta, Pódio Sub-11 da AJAVP, 2ª Jornada de Futsal e Decisões Disciplinares',
    summaryQuote:
      '"Com muito entusiasmo, mais de meio milhar de atletas e treinadores participaram no passado sábado no 1º torneio de futebol, realizado em Retorta. O muito nevoeiro existente no início do torneio não impediu a realização do mesmo. Tougues nos sub 7 e sub 9 e Bagunte nos sub 11, sub 13 e sub 16 foram os vencedores dos respetivos escalões. Coletivamente BAGUNTE venceu."',
    highlights: [
      {
        title: '1º Torneio Futebol (Retorta)',
        badge: '6º Lugar Geral',
        description: 'Coletivo: 1º Bagunte (8 pts) • 6º Vilar do Pinheiro (35 pts). Destaque de ouro para os Sub-11 da AJAVP que conquistaram o 3º Lugar Concelhio (Medalha de Bronze 🥉).'
      },
      {
        title: '2ª Jornada de Futsal (24 Out)',
        description: 'Sub-7 (Pav. Caxinas C2): 09h30 vs Gião & 11h45 vs Aveleda. Sub-9 (Pav. Modivas): 10h00 vs Modivas. Sub-11 (Pav. Canidelo): 10h45 vs Touguinha/Touguinhó. Sub-13 (Pav. Modivas): 09h00 vs Arcos.'
      },
      {
        title: 'Agenda & Candidaturas',
        description: 'Reunião: 26/Out (21h30) na Sede da ADCCVC (balanço de futebol e inscrições para o 1º Encontro de Ténis de Mesa a 07/Nov em Guilhabreu). Candidaturas abertas para Duatlo (até 26/Out) e Milha Urbana (até 23/Nov).'
      },
      {
        title: 'Decisões Disciplinares',
        description: 'Suspensão preventiva de 15 dias do treinador Ricardo Leça (AJAVP) e 2 jogos para Leandro Gomes (Arcos). Situação de indisciplina do público sob análise da comissão.'
      }
    ]
  },
  {
    id: 5,
    numberFormatted: '05',
    date: '2026-10-13',
    formattedDate: '13 de Outubro de 2026',
    badge: 'Futsal & Futebol',
    badgeColor: 'emerald',
    title: 'Arranque do Futsal, Resultados Oficiais, 1º Torneio de Futebol e Regras de Segurança',
    highlights: [
      {
        title: 'Resultados da 1ª Jornada de Futsal',
        description: 'Sub-9: Vilar do Pinheiro 11 - 1 Fornelo. Sub-11: Fajozes 4 - 2 Vilar do Pinheiro. Sub-13: Junqueira 5 - 0 Vilar do Pinheiro.'
      },
      {
        title: '1º Torneio de Futebol (17 Out)',
        description: 'Realizado no Parque de Jogos Municipal de Retorta. 4 campos sintéticos habituais + 2 campos centrais para Sub-7. Tempos regulamentares: 20 min (Sub-9 a 16) e 15 min (Sub-7).'
      },
      {
        title: 'Segurança Estrita de Recinto',
        description: 'Não é permitida a permanência de familiares ou atletas sem jogo no interior do relvado ou sentados no muro com pernas para dentro. Proibido comer dentro dos balneários.'
      },
      {
        title: 'Damas, Sueca & Próxima Reunião',
        description: 'Abertura dos torneios populares de Damas e Sueca. Próxima reunião agendada para 26 de outubro às 21h30 na sede da ADCCVC.'
      }
    ]
  },
  {
    id: 4,
    numberFormatted: '04',
    date: '2026-10-04',
    formattedDate: '04 de Outubro de 2026',
    badge: 'Vitória AJAVP 🏆',
    badgeColor: 'amber',
    title: 'Balanço do Corta-Mato no Espaço Agros (327 Atletas) e Preparação do Futsal',
    highlights: [
      {
        title: 'Vitória de Vilar do Pinheiro',
        description: 'Felicitações oficiais da ADCCVC a Vilar do Pinheiro pela conquista do 1º Lugar Coletivo Concelhio na abertura dos Jogos com 34 pontos e 5 presenças no pódio.'
      },
      {
        title: 'Presenças Institucionais',
        description: 'Entrega de troféus pelo Presidente da CM Vila do Conde, Prof. Dr. Vítor Costa, Eng.ª Catarina Monteiro, Sr. Amândio Couteiro e Idalécio Pontes (Pres. ADCCVC).'
      },
      {
        title: 'Futsal & Ténis de Mesa',
        description: 'Sorteio de Sub-7 agendado para 12 de outubro com 11 equipas. 1º Encontro Concelhio de Ténis de Mesa marcado para 7 de novembro na Casa da Juventude de Guilhabreu.'
      }
    ]
  },
  {
    id: 3,
    numberFormatted: '03',
    date: '2026-09-29',
    formattedDate: '29 de Setembro de 2026',
    badge: 'Corta-Mato',
    badgeColor: 'slate',
    title: 'Convocatória para o Corta-Mato, Prazos de Seguro e 11 Equipas em Sub-7',
    highlights: [
      {
        title: 'Normas do Corta-Mato',
        description: 'Início às 10h00 no Espaço Agros; fichas entregues até às 09h30. Familiares obrigatoriamente na bancada. Distribuição de sacos ecológicos e garrafas.'
      },
      {
        title: 'Janela Alargada de Inscrições',
        description: 'Prorrogação até 8 de outubro para permitir a regularização documental de atletas antes da emissão definitiva da apólice de seguros.'
      },
      {
        title: 'Sub-7 e Jogos de Mesa',
        description: 'Confirmadas 11 freguesias com inscrição no novo escalão Sub-7. Inscrições abertas para Sueca e Damas até 16 de outubro.'
      }
    ]
  },
  {
    id: 2,
    numberFormatted: '02',
    date: '2026-09-23',
    formattedDate: '23 de Setembro de 2026',
    badge: 'Regulamentos',
    badgeColor: 'slate',
    title: 'Matriz de Futsal, Regra Obrigatória do Corta-Mato, Dorsais e Sustentabilidade',
    highlights: [
      {
        title: 'Obrigatoriedade Corta-Mato',
        description: 'Todas as equipas inscritas no futsal têm de ter obrigatoriamente pelo menos um atleta a pontuar no Corta-Mato inaugural sob pena de penalização regulamentar.'
      },
      {
        title: 'Dorsais Unificados',
        description: 'Os mesmos dorsais numerados são utilizados ao longo de todas as provas de Atletismo e Duatlo da época 2026/27 para evitar desperdício de papel e plástico.'
      },
      {
        title: 'Matriz AJAVP Confirmada',
        description: 'Homologação oficial das equipas da AJAVP nos 4 escalões de formação concelhia: Sub-7, Sub-9, Sub-11 e Sub-13.'
      }
    ]
  },
  {
    id: 1,
    numberFormatted: '01',
    date: '2026-09-09',
    formattedDate: '09 de Setembro de 2026',
    badge: 'Abertura',
    badgeColor: 'slate',
    title: 'Abertura da 40.ª Edição dos Jogos Inter-Freguesias, Modalidades e Arbitragem',
    highlights: [
      {
        title: '18 Freguesias Presentes',
        description: 'Reunião magna de abertura na sede da ADCCVC com a presença dos delegados da AJAVP e de mais 17 associações desportivas concelhias.'
      },
      {
        title: 'Quadro Geral de Modalidades',
        description: 'Apresentação das competições oficiais: Corta-Mato, Futsal (5 escalões), Futebol (3 torneios), Ténis de Mesa, Duatlo, Badminton, Futebol de Praia, Jogos Tradicionais e Festa de Encerramento.'
      }
    ]
  }
];
