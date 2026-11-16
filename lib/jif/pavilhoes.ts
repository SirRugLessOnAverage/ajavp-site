export interface PavilhaoInfo {
  id: string;
  nome: string;
  nomeCurto: string;
  freguesia: string;
  morada: string;
  codigoPostal: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  wazeUrl: string;
  appleMapsUrl: string;
}

export const PAVILHOES_JIF: Record<string, PavilhaoInfo> = {
  mindelo: {
    id: 'mindelo',
    nome: 'Pavilhão Desportivo de Mindelo',
    nomeCurto: 'Mindelo',
    freguesia: 'Mindelo',
    morada: 'Rua do Pavilhão Desportivo, Mindelo',
    codigoPostal: '4485-484 Vila do Conde',
    lat: 41.3128,
    lng: -8.7185,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pavilh%C3%A3o+Desportivo+de+Mindelo+Vila+do+Conde',
    wazeUrl: 'https://waze.com/ul?ll=41.3128,-8.7185&navigate=yes',
    appleMapsUrl: 'https://maps.apple.com/?q=Pavilh%C3%A3o+Desportivo+de+Mindelo&ll=41.3128,-8.7185',
  },
  fajozes: {
    id: 'fajozes',
    nome: 'Pavilhão Desportivo de Fajozes',
    nomeCurto: 'Fajozes',
    freguesia: 'Fajozes',
    morada: 'Rua das Oliveiras, Fajozes',
    codigoPostal: '4485-055 Vila do Conde',
    lat: 41.3342,
    lng: -8.6974,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pavilh%C3%A3o+Desportivo+de+Fajozes+Vila+do+Conde',
    wazeUrl: 'https://waze.com/ul?ll=41.3342,-8.6974&navigate=yes',
    appleMapsUrl: 'https://maps.apple.com/?q=Pavilh%C3%A3o+Desportivo+de+Fajozes&ll=41.3342,-8.6974',
  },
  canidelo: {
    id: 'canidelo',
    nome: 'Pavilhão Desportivo de Canidelo',
    nomeCurto: 'Canidelo',
    freguesia: 'Canidelo',
    morada: 'Rua do Centro Desportivo de Canidelo',
    codigoPostal: '4485-081 Vila do Conde',
    lat: 41.3289,
    lng: -8.6653,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pavilh%C3%A3o+Desportivo+de+Canidelo+Vila+do+Conde',
    wazeUrl: 'https://waze.com/ul?ll=41.3289,-8.6653&navigate=yes',
    appleMapsUrl: 'https://maps.apple.com/?q=Pavilh%C3%A3o+Desportivo+de+Canidelo&ll=41.3289,-8.6653',
  },
  modivas: {
    id: 'modivas',
    nome: 'Pavilhão Desportivo de Modivas',
    nomeCurto: 'Modivas',
    freguesia: 'Modivas',
    morada: 'Rua da Junta de Freguesia, Modivas',
    codigoPostal: '4485-520 Vila do Conde',
    lat: 41.3045,
    lng: -8.6912,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pavilh%C3%A3o+Desportivo+de+Modivas+Vila+do+Conde',
    wazeUrl: 'https://waze.com/ul?ll=41.3045,-8.6912&navigate=yes',
    appleMapsUrl: 'https://maps.apple.com/?q=Pavilh%C3%A3o+Desportivo+de+Modivas&ll=41.3045,-8.6912',
  },
  caxinas: {
    id: 'caxinas',
    nome: 'Pavilhão de Desportos de Caxinas',
    nomeCurto: 'Caxinas',
    freguesia: 'Caxinas / Poça da Barca',
    morada: 'Avenida Dr. Carlos Pinto Ferreira, Vila do Conde',
    codigoPostal: '4480-776 Vila do Conde',
    lat: 41.3615,
    lng: -8.7483,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pavilh%C3%A3o+de+Desportos+de+Caxinas+Vila+do+Conde',
    wazeUrl: 'https://waze.com/ul?ll=41.3615,-8.7483&navigate=yes',
    appleMapsUrl: 'https://maps.apple.com/?q=Pavilh%C3%A3o+de+Desportos+de+Caxinas&ll=41.3615,-8.7483',
  },
  desportos: {
    id: 'desportos',
    nome: 'Pavilhão Municipal de Desportos',
    nomeCurto: 'Vila do Conde',
    freguesia: 'Vila do Conde (Centro)',
    morada: 'Avenida General Humberto Delgado, Vila do Conde',
    codigoPostal: '4480-900 Vila do Conde',
    lat: 41.3547,
    lng: -8.7431,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pavilh%C3%A3o+Municipal+de+Desportos+Vila+do+Conde',
    wazeUrl: 'https://waze.com/ul?ll=41.3547,-8.7431&navigate=yes',
    appleMapsUrl: 'https://maps.apple.com/?q=Pavilh%C3%A3o+Municipal+de+Desportos+Vila+do+Conde&ll=41.3547,-8.7431',
  },
  macieira: {
    id: 'macieira',
    nome: 'Pavilhão de Macieira da Maia',
    nomeCurto: 'Macieira',
    freguesia: 'Macieira da Maia',
    morada: 'Rua do Campo de Futebol, Macieira da Maia',
    codigoPostal: '4485-364 Vila do Conde',
    lat: 41.3197,
    lng: -8.6472,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pavilh%C3%A3o+de+Macieira+da+Maia+Vila+do+Conde',
    wazeUrl: 'https://waze.com/ul?ll=41.3197,-8.6472&navigate=yes',
    appleMapsUrl: 'https://maps.apple.com/?q=Pavilh%C3%A3o+de+Macieira+da+Maia&ll=41.3197,-8.6472',
  },
};

/**
 * Normaliza qualquer referência de texto a um pavilhão e retorna o registo oficial.
 */
export function identificarPavilhao(nomeOuTexto?: string): PavilhaoInfo {
  if (!nomeOuTexto) return PAVILHOES_JIF.fajozes;

  const normalizado = nomeOuTexto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (normalizado.includes('mindelo')) return PAVILHOES_JIF.mindelo;
  if (normalizado.includes('fajozes')) return PAVILHOES_JIF.fajozes;
  if (normalizado.includes('canidelo')) return PAVILHOES_JIF.canidelo;
  if (normalizado.includes('modivas')) return PAVILHOES_JIF.modivas;
  if (normalizado.includes('caxinas')) return PAVILHOES_JIF.caxinas;
  if (normalizado.includes('macieira')) return PAVILHOES_JIF.macieira;
  if (normalizado.includes('desportos') || normalizado.includes('municipal')) {
    return PAVILHOES_JIF.desportos;
  }

  // Fallback seguro gerando links de pesquisa pelo nome fornecido
  const encoded = encodeURIComponent(`${nomeOuTexto} Vila do Conde`);
  return {
    id: 'generico',
    nome: nomeOuTexto,
    nomeCurto: nomeOuTexto.replace(/pavilh[aã]o\s*(de|desportivo\s*de|municipal\s*de)?\s*/i, '').trim(),
    freguesia: 'Vila do Conde',
    morada: `${nomeOuTexto}, Vila do Conde`,
    codigoPostal: 'Vila do Conde',
    lat: 41.3533,
    lng: -8.7439,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encoded}`,
    wazeUrl: `https://waze.com/ul?q=${encoded}&navigate=yes`,
    appleMapsUrl: `https://maps.apple.com/?q=${encoded}`,
  };
}
