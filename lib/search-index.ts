import { GESTAO_LINKS } from "@/lib/site";
import { JIF_VENUES } from "@/data/jif/pavilhoes";
import { JIF_CIRCULARS } from "@/data/jif/comunicados";

export type SearchCategory =
  | "pagina"
  | "socio"
  | "pavilhao"
  | "comunicado"
  | "noticia"
  | "evento";

export interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  category: SearchCategory;
  href: string;
  external?: boolean;
  keywords: string;
}

export const SEARCH_CATEGORY_LABELS: Record<SearchCategory, string> = {
  pagina: "Páginas & Modalidades",
  socio: "Sócios & Portal",
  pavilhao: "Pavilhões & Locais GPS",
  comunicado: "Comunicados Oficiais JIF",
  noticia: "Notícias AJAVP",
  evento: "Eventos & Calendário",
};

/**
 * Normaliza texto em Português removendo acentos e convertendo para minúsculas
 * para permitir pesquisas rápidas sem dependência de diacríticos.
 */
export function normalizeSearchText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const CORE_PAGES: SearchItem[] = [
  {
    id: "page-home",
    title: "Página Inicial",
    subtitle: "Destaques, próxima jornada, notícias e adesão de sócios",
    category: "pagina",
    href: "/",
    keywords: "inicio home principal destaques mancha verde ajavp",
  },
  {
    id: "page-jif-hub",
    title: "XL Jogos Inter-Freguesias (Hub JIF 26/27)",
    subtitle: "Calendário das 36 provas, comunicados e guia dos recintos",
    category: "pagina",
    href: "/jif",
    keywords: "jif jogos inter freguesias calendario provas circular vila do conde",
  },
  {
    id: "page-jif-futsal",
    title: "Futsal JIF • Resultados e Jornadas",
    subtitle: "Classificações por escalão, marcadores e próximos jogos",
    category: "pagina",
    href: "/jif/futsal",
    keywords: "futsal masculino feminino sub-7 sub-9 sub-11 sub-13 sub-16 seniores golos",
  },
  {
    id: "page-jif-classificacao",
    title: "Classificação Geral Virtual JIF",
    subtitle: "Tabela concelhia das 19 freguesias e pontuação por modalidade",
    category: "pagina",
    href: "/jif/classificacao",
    keywords: "classificacao tabela pontos ranking geral concelhia freguesias",
  },
  {
    id: "page-modalidades",
    title: "Modalidades & Horários de Treino",
    subtitle: "Futsal, Atletismo, Ténis de Mesa, Duatlo, Badminton e Futebol de Praia",
    category: "pagina",
    href: "/modalidades",
    keywords: "modalidades treinos horarios pavilhao escaloes inscricao futsal atletismo tenis mesa duatlo badminton praia",
  },
  {
    id: "page-associacao",
    title: "A Associação • História e Estatutos",
    subtitle: "Órgãos sociais, regulamento interno, missão e transparência",
    category: "pagina",
    href: "/associacao",
    keywords: "associacao direcao estatutos regulamento historia orgaos sociais vilar do pinheiro",
  },
  {
    id: "page-patrocinadores",
    title: "Patrocinadores & Apoios",
    subtitle: "Parceiros locais que apoiam o desporto em Vilar do Pinheiro",
    category: "pagina",
    href: "/patrocinadores",
    keywords: "patrocinadores parceiros apoios empresas comercio local",
  },
  {
    id: "page-multimedia",
    title: "Multimédia & Galeria Oficial",
    subtitle: "Vídeos, fotografias e melhores momentos da época",
    category: "pagina",
    href: "/multimedia",
    keywords: "multimedia fotos galeria videos instagram teaser",
  },
  {
    id: "page-contactos",
    title: "Contactos & Localização",
    subtitle: "Fala connosco, marca treino experimental ou tira dúvidas",
    category: "pagina",
    href: "/contactos",
    keywords: "contactos email telefone morada pavilhao treino experimental falar",
  },
  {
    id: "page-privacidade",
    title: "Política de Privacidade & RGPD",
    subtitle: "Proteção de dados de sócios, menores e validação por QR Code",
    category: "pagina",
    href: "/privacidade",
    keywords: "privacidade rgpd cookies dados pessoais seguranca",
  },
  {
    id: "page-acessibilidade",
    title: "Declaração de Acessibilidade",
    subtitle: "Compromisso de usabilidade, leitura disléxica e navegação por teclado",
    category: "pagina",
    href: "/acessibilidade",
    keywords: "acessibilidade a11y contraste leitor ecra teclado",
  },
];

const SOCIO_ITEMS: SearchItem[] = [
  {
    id: "socio-quotas",
    title: "Sócios & Quotas 2026/2027",
    subtitle: "Adulto 12€/ano, Menores isentos (0€) e vantagens da Mancha Verde",
    category: "socio",
    href: "/socios",
    keywords: "socio quotas preco vantagens adulto menor isento mbway aderir",
  },
  {
    id: "socio-inscricao",
    title: "Quero Ser Sócio / Inscrição Online",
    subtitle: "Preenche a ficha digital em 1 minuto com assinatura no ecrã",
    category: "socio",
    href: GESTAO_LINKS.inscricao,
    external: true,
    keywords: "inscricao novo socio ficha digital aderir inscrever atleta educando",
  },
  {
    id: "socio-portal",
    title: "Área de Sócio (Cartão Digital & Quotas)",
    subtitle: "Consulta o teu número de sócio oficial, cartão QR e estado das quotas",
    category: "socio",
    href: GESTAO_LINKS.socio,
    external: true,
    keywords: "area socio portal cartao digital qr code numero socio consultar quotas",
  },
];

const VENUE_ITEMS: SearchItem[] = JIF_VENUES.map((venue) => ({
  id: `venue-${venue.id}`,
  title: venue.name,
  subtitle: `${venue.parish} • ${venue.sports.join(", ")}`,
  category: "pavilhao" as const,
  href: "/jif#pavilhoes",
  keywords: `${venue.shortName} ${venue.parish} ${venue.address} ${venue.sports.join(" ")} pavilhao gps mapa waze`,
}));

const COMUNICADO_ITEMS: SearchItem[] = JIF_CIRCULARS.map((circ) => ({
  id: `circ-${circ.id}`,
  title: `Circular Nº ${circ.numberFormatted} — ${circ.title}`,
  subtitle: `${circ.formattedDate}${circ.badge ? ` • ${circ.badge}` : ""}`,
  category: "comunicado" as const,
  href: "/jif#comunicados",
  keywords: `circular ${circ.numberFormatted} ${circ.badge ?? ""} ${circ.formattedDate} comunicado jif`,
}));

export const STATIC_SEARCH_ITEMS: SearchItem[] = [
  ...SOCIO_ITEMS,
  ...CORE_PAGES,
  ...VENUE_ITEMS,
  ...COMUNICADO_ITEMS,
];

/**
 * Filtra e ordena resultados por relevância usando texto normalizado.
 */
export function filterSearchItems(items: SearchItem[], rawQuery: string): SearchItem[] {
  const query = normalizeSearchText(rawQuery);
  if (!query) return [];

  const tokens = query.split(/\s+/).filter(Boolean);

  const scored = items
    .map((item) => {
      const normTitle = normalizeSearchText(item.title);
      const normSub = normalizeSearchText(item.subtitle ?? "");
      const normKeys = normalizeSearchText(item.keywords);
      const haystack = `${normTitle} ${normSub} ${normKeys}`;

      // Todos os termos da pesquisa devem existir no item
      const allMatch = tokens.every((token) => haystack.includes(token));
      if (!allMatch) return null;

      let score = 1;
      if (normTitle.startsWith(query)) score += 10;
      else if (normTitle.includes(query)) score += 5;
      else if (normSub.includes(query)) score += 2;

      return { item, score };
    })
    .filter((entry): entry is { item: SearchItem; score: number } => entry !== null);

  scored.sort((a, b) => b.score - a.score);
  return scored.map((entry) => entry.item);
}

