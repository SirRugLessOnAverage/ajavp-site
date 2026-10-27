export interface JifVenue {
  id: string;
  name: string;
  shortName: string;
  parish: string;
  category: 'futsal' | 'futebol' | 'atletismo' | 'praia' | 'pavilhão' | 'sede';
  categoryLabel: string;
  sports: string[];
  address: string;
  driveFromAjavp: string;
  parkingInfo: string;
  badgeColor: string;
  mapsUrl: string;
  wazeUrl: string;
  coords: string;
}

export const JIF_VENUES: JifVenue[] = [
  {
    id: 'modivas',
    name: 'Pavilhão Desportivo de Modivas',
    shortName: 'Pav. Modivas',
    parish: 'Modivas, Vila do Conde',
    category: 'futsal',
    categoryLabel: 'Futsal Concelhio',
    sports: ['Futsal Sub-9', 'Futsal Sub-13'],
    address: 'Rua do Pavilhão Desportivo, 4485-481 Modivas',
    driveFromAjavp: '~6 km • 8 min',
    parkingInfo: 'Estacionamento junto à Escola Básica e campo sintético.',
    badgeColor: 'amber',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Modivas+Vila+do+Conde',
    wazeUrl: 'https://waze.com/ul?q=Pavilh%C3%A3o+Desportivo+de+Modivas+Vila+do+Conde&navigate=yes',
    coords: '41.3065,-8.7001'
  },
  {
    id: 'canidelo',
    name: 'Pavilhão Desportivo de Canidelo',
    shortName: 'Pav. Canidelo',
    parish: 'Canidelo, Vila do Conde',
    category: 'futsal',
    categoryLabel: 'Futsal & Ténis de Mesa',
    sports: ['Futsal Sub-7, 9, 11 e 13', 'Ténis de Mesa JIF'],
    address: 'Rua do Souto / Lugar do Souto, 4485-060 Canidelo',
    driveFromAjavp: '~7 km • 10 min',
    parkingInfo: 'Parque frontal com lugares disponíveis na rua circundante.',
    badgeColor: 'emerald',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Canidelo+Vila+do+Conde',
    wazeUrl: 'https://waze.com/ul?q=Pavilh%C3%A3o+Desportivo+de+Canidelo+Vila+do+Conde&navigate=yes',
    coords: '41.3283,-8.6728'
  },
  {
    id: 'fajozes',
    name: 'Pavilhão Desportivo de Fajozes',
    shortName: 'Pav. Fajozes',
    parish: 'Fajozes, Vila do Conde',
    category: 'futsal',
    categoryLabel: 'Futsal Formação',
    sports: ['Futsal Sub-11', 'Futsal Sub-13'],
    address: 'Rua de S. Gens, 4485-181 Fajozes',
    driveFromAjavp: '~5.5 km • 8 min',
    parkingInfo: 'Junto à Escola Básica e ao polidesportivo de Fajozes.',
    badgeColor: 'teal',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Fajozes',
    wazeUrl: 'https://waze.com/ul?q=Pavilh%C3%A3o+Desportivo+de+Fajozes&navigate=yes',
    coords: '41.3225,-8.6942'
  },
  {
    id: 'caxinas',
    name: 'Pavilhão de Caxinas (Campo 2)',
    shortName: 'Pav. Caxinas C2',
    parish: 'Caxinas, Vila do Conde',
    category: 'futsal',
    categoryLabel: 'Futsal Sub-7 & Sub-9',
    sports: ['Futsal Sub-7 (Campo 2)', 'Futsal Sub-9'],
    address: 'Av. Bento de Freitas, 4480-779 Vila do Conde',
    driveFromAjavp: '~10 km • 13 min',
    parkingInfo: 'Zona residencial costeira. Recomenda-se chegar 15 min antes.',
    badgeColor: 'sky',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Caxinas+Vila+do+Conde',
    wazeUrl: 'https://waze.com/ul?q=Pavilh%C3%A3o+Caxinas+Vila+do+Conde&navigate=yes',
    coords: '41.3619,-8.7511'
  },
  {
    id: 'mindelo',
    name: 'Pavilhão Desportivo de Mindelo',
    shortName: 'Pav. Mindelo',
    parish: 'Mindelo, Vila do Conde',
    category: 'futsal',
    categoryLabel: 'Futsal & Ginástica',
    sports: ['Futsal Formação JIF', 'Modalidades de Pavilhão'],
    address: 'Rua das Areias, 4485-422 Mindelo',
    driveFromAjavp: '~8 km • 11 min',
    parkingInfo: 'Parque de estacionamento amplo junto ao complexo escolar.',
    badgeColor: 'indigo',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Mindelo',
    wazeUrl: 'https://waze.com/ul?q=Pavilh%C3%A3o+Desportivo+de+Mindelo&navigate=yes',
    coords: '41.3142,-8.7214'
  },
  {
    id: 'municipal-desportos',
    name: 'Pavilhão Municipal de Desportos',
    shortName: 'Pav. Municipal',
    parish: 'Centro, Vila do Conde',
    category: 'pavilhão',
    categoryLabel: 'Recinto Nobre Concelhio',
    sports: ['Badminton', 'Finais de Futsal', 'Festa de Encerramento JIF'],
    address: 'Av. Júlio Graça / Av. Dr. Artur Cunha Araújo, 4480-754 Vila do Conde',
    driveFromAjavp: '~11 km • 14 min',
    parkingInfo: 'Parque amplo exterior ao lado do Parque de Jogos.',
    badgeColor: 'amber',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Municipal+de+Desportos+de+Vila+do+Conde',
    wazeUrl: 'https://waze.com/ul?q=Pavilh%C3%A3o+Municipal+de+Desportos+de+Vila+do+Conde&navigate=yes',
    coords: '41.3533,-8.7428'
  },
  {
    id: 'agros',
    name: 'Espaço AGROS (Parque Verde)',
    shortName: 'Espaço AGROS',
    parish: 'Argivai / Vila do Conde',
    category: 'atletismo',
    categoryLabel: 'Corta-Mato & Provas de Estrada',
    sports: ['Corta-Mato de Abertura JIF 2026', 'Atividades na Natureza'],
    address: 'Espaço AGROS, Rua da AGROS, 4480-144 Argivai',
    driveFromAjavp: '~11 km • 12 min (via N13 / A28)',
    parkingInfo: 'Grande parque interior pavimentado e gratuito.',
    badgeColor: 'emerald',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Espa%C3%A7o+AGROS+Argivai',
    wazeUrl: 'https://waze.com/ul?q=Espa%C3%A7o+AGROS+Argivai&navigate=yes',
    coords: '41.3711,-8.7244'
  },
  {
    id: 'complexo-desportivo',
    name: 'Complexo Desportivo Municipal (Campos 2, 4 e 6)',
    shortName: 'Complexo Sintéticos',
    parish: 'Vila do Conde',
    category: 'futebol',
    categoryLabel: 'Futebol 7 & Infantis',
    sports: ['1º Torneio Futebol JIF', 'Futebol 7 Infantis', 'Torneio 1º de Maio'],
    address: 'Rua Dom Sancho I / Av. Bernardino Machado, 4480-705 Vila do Conde',
    driveFromAjavp: '~10.5 km • 13 min',
    parkingInfo: 'Estacionamento junto às piscinas e campos municipais.',
    badgeColor: 'teal',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Complexo+Desportivo+Municipal+de+Vila+do+Conde',
    wazeUrl: 'https://waze.com/ul?q=Complexo+Desportivo+Municipal+de+Vila+do+Conde&navigate=yes',
    coords: '41.3622,-8.7365'
  },
  {
    id: 'estadio-municipal',
    name: 'Estádio Municipal & Pista de Atletismo',
    shortName: 'Estádio Municipal',
    parish: 'Vila do Conde',
    category: 'atletismo',
    categoryLabel: 'Pista de Atletismo',
    sports: ['Atletismo em Pista', 'Provas de Velocidade e Estafetas'],
    address: 'Av. Dr. Artur Cunha Araújo, 4480-754 Vila do Conde',
    driveFromAjavp: '~11 km • 14 min',
    parkingInfo: 'Estacionamento nas artérias envolventes e parque central.',
    badgeColor: 'rose',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Est%C3%A1dio+Municipal+de+Vila+do+Conde',
    wazeUrl: 'https://waze.com/ul?q=Est%C3%A1dio+Municipal+de+Vila+do+Conde&navigate=yes',
    coords: '41.3541,-8.7419'
  },
  {
    id: 'zona-ribeirinha',
    name: 'Cais das Lavandeiras & Marginal',
    shortName: 'Zona Ribeirinha',
    parish: 'Rio Ave / Marginal de Vila do Conde',
    category: 'atletismo',
    categoryLabel: 'Duatlo & Estrada',
    sports: ['Duatlo em Duplas JIF', 'Milha Urbana Concelhia'],
    address: 'Cais das Lavandeiras / Av. Brasil, 4480 Vila do Conde',
    driveFromAjavp: '~11 km • 15 min',
    parkingInfo: 'Parque de estacionamento do Forte São João ou ribeirinho.',
    badgeColor: 'cyan',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Cais+das+Lavandeiras+Vila+do+Conde',
    wazeUrl: 'https://waze.com/ul?q=Cais+das+Lavandeiras+Vila+do+Conde&navigate=yes',
    coords: '41.3508,-8.7447'
  },
  {
    id: 'praia-olinda',
    name: 'Praia da Olinda (Frente Urbana)',
    shortName: 'Praia da Olinda',
    parish: 'Frente Marítima, Vila do Conde',
    category: 'praia',
    categoryLabel: 'Desportos de Areia',
    sports: ['Futebol de Praia JIF', 'Voleibol de Praia'],
    address: 'Praia da Olinda / Av. Brasil, 4480 Vila do Conde',
    driveFromAjavp: '~12 km • 15 min',
    parkingInfo: 'Parque da praia e marginal. Mais concorrido aos sábados.',
    badgeColor: 'amber',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Praia+da+Olinda+Vila+do+Conde',
    wazeUrl: 'https://waze.com/ul?q=Praia+da+Olinda+Vila+do+Conde&navigate=yes',
    coords: '41.3522,-8.7561'
  },
  {
    id: 'sede-ajavp',
    name: 'Sede Oficial da AJAVP',
    shortName: 'Sede AJAVP',
    parish: 'Vilar do Pinheiro, Vila do Conde',
    category: 'sede',
    categoryLabel: 'Ponto de Encontro & Sede',
    sports: ['Concentração de Atletas', 'Saída da Comitiva AJAVP'],
    address: 'Rua da Associação, 4485-846 Vilar do Pinheiro',
    driveFromAjavp: 'Ponto de Partida 📍',
    parkingInfo: 'Estacionamento próprio e envolvente da sede social.',
    badgeColor: 'emerald',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=AJAVP+Vilar+do+Pinheiro',
    wazeUrl: 'https://waze.com/ul?q=AJAVP+Vilar+do+Pinheiro&navigate=yes',
    coords: '41.2785,-8.6756'
  }
];

export function resolveGpsLinks(locationText: string): { name: string; maps: string; waze: string } {
  const loc = (locationText || '').toLowerCase();

  if (loc.includes('modivas')) {
    return {
      name: 'Pavilhão de Modivas',
      maps: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Modivas+Vila+do+Conde',
      waze: 'https://waze.com/ul?q=Pavilh%C3%A3o+Desportivo+de+Modivas+Vila+do+Conde&navigate=yes'
    };
  }
  if (loc.includes('canidelo')) {
    return {
      name: 'Pavilhão de Canidelo',
      maps: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Canidelo+Vila+do+Conde',
      waze: 'https://waze.com/ul?q=Pavilh%C3%A3o+Desportivo+de+Canidelo+Vila+do+Conde&navigate=yes'
    };
  }
  if (loc.includes('fajozes')) {
    return {
      name: 'Pavilhão de Fajozes',
      maps: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Fajozes',
      waze: 'https://waze.com/ul?q=Pavilh%C3%A3o+Desportivo+de+Fajozes&navigate=yes'
    };
  }
  if (loc.includes('caxinas')) {
    return {
      name: 'Pavilhão de Caxinas (C2)',
      maps: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Caxinas+Vila+do+Conde',
      waze: 'https://waze.com/ul?q=Pavilh%C3%A3o+Caxinas+Vila+do+Conde&navigate=yes'
    };
  }
  if (loc.includes('mindelo')) {
    return {
      name: 'Pavilhão de Mindelo',
      maps: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Mindelo',
      waze: 'https://waze.com/ul?q=Pavilh%C3%A3o+Desportivo+de+Mindelo&navigate=yes'
    };
  }
  if (loc.includes('agros')) {
    return {
      name: 'Espaço AGROS',
      maps: 'https://www.google.com/maps/dir/?api=1&destination=Espa%C3%A7o+AGROS+Argivai',
      waze: 'https://waze.com/ul?q=Espa%C3%A7o+AGROS+Argivai&navigate=yes'
    };
  }
  if (loc.includes('estádio') || loc.includes('estadio') || loc.includes('pista')) {
    return {
      name: 'Estádio Municipal de Vila do Conde',
      maps: 'https://www.google.com/maps/dir/?api=1&destination=Est%C3%A1dio+Municipal+de+Vila+do+Conde',
      waze: 'https://waze.com/ul?q=Est%C3%A1dio+Municipal+de+Vila+do+Conde&navigate=yes'
    };
  }
  if (loc.includes('campo') || loc.includes('complexo') || loc.includes('retorta')) {
    return {
      name: 'Complexo Desportivo / Parque de Jogos',
      maps: 'https://www.google.com/maps/dir/?api=1&destination=Complexo+Desportivo+Municipal+de+Vila+do+Conde',
      waze: 'https://waze.com/ul?q=Complexo+Desportivo+Municipal+de+Vila+do+Conde&navigate=yes'
    };
  }
  if (loc.includes('praia')) {
    return {
      name: 'Praia da Olinda',
      maps: 'https://www.google.com/maps/dir/?api=1&destination=Praia+da+Olinda+Vila+do+Conde',
      waze: 'https://waze.com/ul?q=Praia+da+Olinda+Vila+do+Conde&navigate=yes'
    };
  }
  if (loc.includes('ribeirinha') || loc.includes('cais') || loc.includes('duatlo')) {
    return {
      name: 'Cais das Lavandeiras',
      maps: 'https://www.google.com/maps/dir/?api=1&destination=Cais+das+Lavandeiras+Vila+do+Conde',
      waze: 'https://waze.com/ul?q=Cais+das+Lavandeiras+Vila+do+Conde&navigate=yes'
    };
  }
  return {
    name: 'Pavilhão Municipal de Desportos',
    maps: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Municipal+de+Desportos+de+Vila+do+Conde',
    waze: 'https://waze.com/ul?q=Pavilh%C3%A3o+Municipal+de+Desportos+de+Vila+do+Conde&navigate=yes'
  };
}
