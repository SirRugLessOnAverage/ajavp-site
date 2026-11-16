import { JIF_VENUES, type JifVenue } from '@/data/jif/pavilhoes';

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

function toPavilhaoInfo(venue: JifVenue, overrideId?: string): PavilhaoInfo {
  const [latStr, lngStr] = venue.coords.split(',');
  const lat = Number.parseFloat(latStr) || 41.3533;
  const lng = Number.parseFloat(lngStr) || -8.7439;
  const postalMatch = venue.address.match(/\d{4}-\d{3}\s+[^,]+/);
  const freguesia = venue.parish.replace(/,\s*Vila do Conde$/i, '').trim();

  return {
    id: overrideId ?? venue.id,
    nome: venue.name,
    nomeCurto: venue.shortName.replace(/^Pav\.\s*/i, '').trim(),
    freguesia,
    morada: venue.address,
    codigoPostal: postalMatch ? postalMatch[0] : 'Vila do Conde',
    lat,
    lng,
    googleMapsUrl: venue.mapsUrl,
    wazeUrl: venue.wazeUrl,
    appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(venue.name)}&ll=${lat},${lng}`,
  };
}

/**
 * Mapa canónico de pavilhões derivado da fonte única `JIF_VENUES` (`data/jif/pavilhoes.ts`).
 */
export const PAVILHOES_JIF: Record<string, PavilhaoInfo> = JIF_VENUES.reduce<
  Record<string, PavilhaoInfo>
>((acc, venue) => {
  acc[venue.id] = toPavilhaoInfo(venue);
  if (venue.id === 'municipal-desportos') {
    acc.desportos = toPavilhaoInfo(venue, 'desportos');
  }
  return acc;
}, {});

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
