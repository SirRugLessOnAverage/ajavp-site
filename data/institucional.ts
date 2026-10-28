export interface SportPhoto {
  src: string;
  alt: string;
  label: string;
  objectPosition?: string;
}

export interface SportModality {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  highlights: string[];
  regulationLink?: { label: string; href: string };
  photos: SportPhoto[];
  ctaLabel: string;
  ctaHref: string;
  externalCta?: boolean;
  secondaryCta?: { label: string; href: string };
  accentColor: "amber" | "emerald" | "blue" | "teal" | "purple";
}

export interface EscalaoCardData {
  escalao: "Sub-7" | "Sub-9" | "Sub-11" | "Sub-13";
  subtitle: string;
  photo: string;
  photoAlt: string;
  objectPosition?: string;
  kitBadge: string;
  accent: "amber" | "emerald" | "blue" | "purple";
  sessions: {
    day: string;
    time: string;
    venueCode: "R" | "C" | "P";
    highlight?: boolean;
  }[];
  footerNote: string;
  warningNote?: string;
}

export interface TrainingVenue {
  code: "R" | "C" | "P" | "JF";
  name: string;
  location: string;
  typeBadge: string;
  badgeColor: "emerald" | "blue" | "amber" | "slate";
  scheduleTitle: string;
  scheduleBullets: { bold: string; text: string }[];
  mapsUrl: string;
  mapsLabel: string;
}

export interface KitHotspot {
  id: string;
  sponsorName: string;
  placementLabel: string;
  xPercent: number;
  yPercent: number;
  color: "teal" | "amber" | "blue" | "red" | "emerald";
  description: string;
}

export interface KitTeamPreview {
  id: string;
  label: string;
  badge: string;
  src: string;
  alt: string;
  caption: string;
  objectPosition?: string;
}

export interface SponsorItem {
  id: string;
  name: string;
  tier: "principal" | "oficial";
  categoryBadge: string;
  secondaryBadge: string;
  logoWebp: string;
  logoFallback: string;
  logoStageBg: "white" | "black" | "slate";
  accentColor: "teal" | "amber" | "blue" | "red" | "emerald";
  description: string;
  bullets: string[];
  phone?: string;
  footerLeft: string;
  footerRight: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  badge: string;
  category: "equipamento" | "futsal" | "atletismo" | "outras" | "familia";
  featuredNew?: boolean;
  objectPosition?: string;
}

export interface VideoItem {
  id: string;
  youtubeId?: string;
  externalUrl?: string;
  thumbnail: string;
  badge: string;
  isReel?: boolean;
  dateLabel?: string;
  title: string;
  description: string;
  highlightBadge?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const MODALIDADES_LIST: SportModality[] = [
  {
    id: "futsal",
    title: "Futsal & Futebol",
    subtitle: "Dos 4 aos 18 anos • Masculino e Feminino",
    badge: "4 Escalões JIF",
    description:
      "O coração desportivo da AJAVP. Com equipas de formação próprias em Sub-7, Sub-9, Sub-11 e Sub-13 a estrear o novo equipamento oficial nos Jogos Inter-Freguesias e torneios concelhios.",
    highlights: [
      "Treinos em Pavilhão Coberto (Canidelo e MaiaSport) e Ringue",
      "Participação oficial nas jornadas semanais dos XL JIF",
      "Equipamento Oficial de Treino: Preto • Jogo: Mancha Verde",
    ],
    regulationLink: {
      label: "Regulamento Oficial 2026/27 (Futsal & Futebol) →",
      href: "/jif#modalidades",
    },
    photos: [
      {
        src: "/assets/images/galeria/sub7.webp",
        alt: "Treinador e atletas Sub-7 da AJAVP com quadro tático em pavilhão",
        label: "Sub-7 • Tática",
        objectPosition: "center 35%",
      },
      {
        src: "/assets/images/galeria/Sub-9e11.webp",
        alt: "Comitiva Sub-9 e Sub-11 da AJAVP com novo equipamento oficial",
        label: "Sub-9 & Sub-11",
        objectPosition: "center 35%",
      },
      {
        src: "/assets/images/galeria/sub11.webp",
        alt: "Equipa Sub-11 da AJAVP na baliza com treinadores",
        label: "Sub-11",
        objectPosition: "center 35%",
      },
      {
        src: "/assets/images/galeria/sub13.webp",
        alt: "Equipa Sub-13 da AJAVP equipada de verde e preto",
        label: "Sub-13",
        objectPosition: "center 25%",
      },
    ],
    ctaLabel: "Consultar Horários de Treino →",
    ctaHref: "#horarios",
    accentColor: "amber",
  },
  {
    id: "atletismo",
    title: "Atletismo & Corta-Mato",
    subtitle: "Todas as idades • Formação & Mestres",
    badge: "Campeões Concelhios 🏆",
    description:
      "Superação ao ar livre, velocidade em pista e resistência no corta-mato. Presença assídua no Espaço Agros e provas de estrada de Vila do Conde, incluindo a histórica Prova do 25 de Abril.",
    highlights: [
      "Treinos aos Domingos às 09h00 (Ponto de encontro JF)",
      "Corta-Mato XL JIF: 1.º Lugar Concelhio (34 pts) 🏆",
      "Acompanhamento para iniciantes, jovens e veteranos",
    ],
    photos: [
      {
        src: "/assets/images/galeria/corta_mato_equipa_2026.webp",
        alt: "Comitiva AJAVP Campeã Geral Concelhia de Corta-Mato nos XL JIF",
        label: "Campeões Corta-Mato",
        objectPosition: "center 35%",
      },
      {
        src: "/assets/images/galeria/prova_25_abril_2025_grupo.webp",
        alt: "Prova de Atletismo do 25 de Abril - Comitiva da AJAVP",
        label: "25 de Abril",
        objectPosition: "center center",
      },
      {
        src: "/assets/images/galeria/foto_01.webp",
        alt: "Atletas da AJAVP em prova de estrada",
        label: "Estrada",
        objectPosition: "center 25%",
      },
    ],
    ctaLabel: "Ver Pauta Homologada no Portal JIF",
    ctaHref: "/jif#resultados",
    secondaryCta: {
      label: "Calendário JIF (Milha e 25 de Abril) →",
      href: "/jif#calendario",
    },
    accentColor: "emerald",
  },
  {
    id: "tenis-mesa",
    title: "Ténis de Mesa",
    subtitle: "Jovens & Adultos • Salão Nobre JF",
    badge: "Sábados na Junta",
    description:
      "Agilidade de reflexos, precisão técnica e concentração mental. Mesas de competição oficiais instaladas no Salão Nobre da Junta de Freguesia de Vilar do Pinheiro.",
    highlights: [
      "Sessões aos Sábados: Sub-15 às 16h00 | Adultos às 17h00",
      "Torneio Individual JIF (21/Nov) e Torneio por Equipas (08/Mai)",
      "Raquetes e bolas disponibilizadas pelo clube",
    ],
    photos: [
      {
        src: "/assets/images/galeria/foto_22.webp",
        alt: "Jovens atletas da formação de Ténis de Mesa da AJAVP",
        label: "Formação Sub-15",
        objectPosition: "center 30%",
      },
      {
        src: "/assets/images/galeria/foto_23.webp",
        alt: "Atleta sénior da AJAVP em competição oficial de Ténis de Mesa",
        label: "Competição Sénior",
        objectPosition: "center 25%",
      },
    ],
    ctaLabel: "Consultar Horários de Treino →",
    ctaHref: "#horarios",
    accentColor: "blue",
  },
  {
    id: "duatlo",
    title: "Duatlo em Duplas",
    subtitle: "Duplas • BTT e Corrida",
    badge: "Prova 27 Fev",
    description:
      "Combinação vibrante de corrida pedestre e bicicleta de montanha (BTT) em circuito misto. Treinos regulares de transição técnica e preparação para a grande prova concelhia.",
    highlights: [
      "Prova Oficial JIF: 27 de Fevereiro de 2027",
      "Duplas Masculinas, Femininas e Mistas",
      "Orientação de transições rápidas e segurança de BTT",
    ],
    photos: [
      {
        src: "/assets/images/galeria/foto_17.webp",
        alt: "Duplas de Duatlo e BTT da AJAVP com capacetes e bicicletas",
        label: "Duplas BTT",
        objectPosition: "center 30%",
      },
      {
        src: "/assets/images/galeria/foto_15.webp",
        alt: "Convívio e preparação das bicicletas da equipa de Duatlo AJAVP",
        label: "Parque de Transição",
        objectPosition: "center 35%",
      },
    ],
    ctaLabel: "Quero Integrar uma Dupla →",
    ctaHref: "https://forms.gle/YJdnZyUsMB8aBADj6",
    externalCta: true,
    accentColor: "teal",
  },
  {
    id: "badminton",
    title: "Badminton",
    subtitle: "Pavilhão Coberto • Singulares e Pares",
    badge: "Sub-13 a Seniores",
    description:
      "O desporto de raquete mais veloz do mundo. Desenvolve reflexos fulgurantes, destreza e condicionamento físico em pavilhão com rede regulamentar.",
    highlights: [
      "Provas JIF: 23/Jan (Singulares) e 15/Mai (Pares)",
      "Campos oficiais no Pavilhão de Mindelo",
      "Escalões Sub-13, Sub-17 e Seniores",
    ],
    photos: [
      {
        src: "/assets/images/galeria/foto_02.webp",
        alt: "Equipa feminina de Badminton da AJAVP junto à rede no pavilhão",
        label: "Equipa AJAVP",
        objectPosition: "center 30%",
      },
    ],
    ctaLabel: "Inscrever no Badminton →",
    ctaHref: "https://forms.gle/YJdnZyUsMB8aBADj6",
    externalCta: true,
    accentColor: "purple",
  },
  {
    id: "futebol-praia",
    title: "Futebol de Praia",
    subtitle: "Maio e Junho • Areal de Vila do Conde",
    badge: "Frente Urbana",
    description:
      "Espetáculo, golos acrobáticos e ambiente balnear. Os torneios na areia marcam a reta final da época desportiva com grande entusiasmo de toda a comunidade.",
    highlights: [
      "Jornadas: 29 de Maio e 05 de Junho de 2027",
      "Praia da Frente Urbana de Vila do Conde",
      "Escalões de Formação e Seniores",
    ],
    photos: [
      {
        src: "/assets/images/galeria/foto_26.webp",
        alt: "Equipa jovem da AJAVP no torneio de Futebol de Praia em Vila do Conde",
        label: "Areal • Mancha Verde",
        objectPosition: "center 30%",
      },
      {
        src: "/assets/images/galeria/foto_04.webp",
        alt: "Comitiva e treinadores da AJAVP na baliza de Futebol de Praia",
        label: "Comitiva na Areia",
        objectPosition: "center 35%",
      },
    ],
    ctaLabel: "Inscrever no Futebol Praia →",
    ctaHref: "https://forms.gle/YJdnZyUsMB8aBADj6",
    externalCta: true,
    accentColor: "amber",
  },
];

export const ESCALOES_CROMOS: EscalaoCardData[] = [
  {
    escalao: "Sub-7",
    subtitle: "Iniciação & Descoberta",
    photo: "/assets/images/galeria/sub7banco.webp",
    photoAlt: "Atletas Sub-7 da AJAVP sorridentes no banco com o novo equipamento oficial",
    objectPosition: "center 25%",
    kitBadge: "Cromo Época 26/27",
    accent: "amber",
    sessions: [
      { day: "5.ª Feira", time: "19h00 - 20h00", venueCode: "R" },
      { day: "Sábado", time: "10h00 - 11h00", venueCode: "R", highlight: true },
    ],
    footerNote: "Total: 2h/sem (Rotativo Pavilhão*)",
  },
  {
    escalao: "Sub-9",
    subtitle: "Formação Base",
    photo: "/assets/images/galeria/sub9_treino_preto.webp",
    photoAlt: "Equipa Sub-9 da AJAVP no Ringue com o equipamento oficial de treino preto",
    objectPosition: "center 22%",
    kitBadge: "Treino Preto Oficial",
    accent: "emerald",
    sessions: [
      { day: "3.ª Feira", time: "19h00 - 20h30", venueCode: "R" },
      { day: "5.ª Feira", time: "19h00 - 20h00", venueCode: "P", highlight: true },
      { day: "Sábado", time: "09h00 - 10h00", venueCode: "R" },
    ],
    footerNote: "✓ Pavilhão MaiaSport (Partilha pontual*)",
  },
  {
    escalao: "Sub-11",
    subtitle: "Desenvolvimento Técnico",
    photo: "/assets/images/galeria/sub11.webp",
    photoAlt: "Plantel Sub-11 da AJAVP na baliza com o novo equipamento oficial",
    objectPosition: "center 30%",
    kitBadge: "Cromo Época 26/27",
    accent: "blue",
    sessions: [
      { day: "2.ª Feira", time: "19h00 - 20h30", venueCode: "R" },
      { day: "4.ª Feira", time: "18h30 - 20h00", venueCode: "C", highlight: true },
      { day: "Sábado", time: "10h00 - 11h00", venueCode: "R" },
    ],
    footerNote: "✓ 1x Canidelo | 48h Descanso",
  },
  {
    escalao: "Sub-13",
    subtitle: "Competição & Tática",
    photo: "/assets/images/galeria/sub13.webp",
    photoAlt: "Plantel Sub-13 da AJAVP com o novo equipamento oficial e capitão",
    objectPosition: "center 20%",
    kitBadge: "Cromo Época 26/27",
    accent: "purple",
    sessions: [
      { day: "4.ª Feira", time: "18h30 - 20h00", venueCode: "C", highlight: true },
      { day: "6.ª Feira", time: "19h00 - 20h00", venueCode: "R" },
      { day: "Sábado", time: "09h00 - 10h00", venueCode: "R" },
    ],
    footerNote: "⚠️ Treinos Seguidos (6.ª e Sáb)",
    warningNote: "Livre 6.ª se treinarem 5.ª no MaiaSport*",
  },
];

export const TRAINING_VENUES: TrainingVenue[] = [
  {
    code: "R",
    name: "Ringue Polidesportivo de Vilar do Pinheiro",
    location: "Rua do Campo de Futebol, Vilar do Pinheiro (Piso Sintético Exterior)",
    typeBadge: "Exterior",
    badgeColor: "emerald",
    scheduleTitle: "Modalidades & Escalões com Treino no Ringue:",
    scheduleBullets: [
      { bold: "2.ª Feira:", text: "Sub-11 (19h00–20h30)" },
      { bold: "3.ª Feira:", text: "Sub-9 (19h00–20h30)" },
      { bold: "5.ª Feira:", text: "Sub-7 (19h00–20h00)" },
      {
        bold: "6.ª Feira:",
        text: "Sub-13* (19h00–20h00, livre se treinarem 5.ª no MaiaSport)",
      },
      {
        bold: "Sábado:",
        text: "Sub-9 + Sub-13 (09h00–10h00) • Sub-7 + Sub-11 (10h00–11h00)",
      },
    ],
    mapsUrl:
      "https://www.google.com/maps/place/Ringue+%2F+Relvado+Sint%C3%A9tico/@41.2723525,-8.6634737,57m/data=!3m1!1e3!4m12!1m5!3m4!2zNDHCsDE2JzIwLjIiTiA4wrAzOSc0OC4yIlc!8m2!3d41.272285!4d-8.663397!3m5!1s0xd2469000483e1e7:0x1f8cafbb6e9a7922!8m2!3d41.2722915!4d-8.6633585!16s%2Fg%2F11ynb8d_z0",
    mapsLabel: "Abrir localização oficial do Ringue / Relvado Sintético",
  },
  {
    code: "C",
    name: "Pavilhão Desportivo Municipal de Canidelo",
    location: "Canidelo, Vila do Conde (Pavilhão Coberto Oficial)",
    typeBadge: "Pavilhão Coberto",
    badgeColor: "blue",
    scheduleTitle: "Modalidades & Escalões com Treino em Canidelo:",
    scheduleBullets: [
      {
        bold: "4.ª Feira (18h30–20h00):",
        text: "Treino conjunto de Futsal Formação para os escalões Sub-11 e Sub-13.",
      },
      {
        bold: "Garantia de Piso:",
        text: "Pavilhão municipal de alta qualidade técnica com balneários e bancada.",
      },
    ],
    mapsUrl:
      "https://www.google.com/maps/place/Pavilh%C3%A3o+Desportivo+Municipal+de+Canidelo+-+Vila+do+Conde/@41.3097411,-8.6434142,17z/data=!3m1!4b1!4m6!3m5!1s0xd245d6c0b94b30d:0x2ab0fc8bdb467fb6!8m2!3d41.3097411!4d-8.6434142!16s%2Fg%2F11p17h5_gf",
    mapsLabel: "Abrir localização oficial do Pavilhão de Canidelo",
  },
  {
    code: "P",
    name: "Pavilhão MaiaSport (Pedras Rubras)",
    location: "Pedras Rubras, Maia (Pavilhão Coberto)",
    typeBadge: "5.ªs Feiras",
    badgeColor: "amber",
    scheduleTitle: "Modalidades & Regime de Partilha:",
    scheduleBullets: [
      {
        bold: "5.ª Feira (19h00–20h00):",
        text: "Treino do escalão Sub-9.",
      },
      {
        bold: "Partilha Pontual:",
        text: "Poderá haver partilha com os escalões Sub-7 ou Sub-13.",
      },
      {
        bold: "Aviso Semanal:",
        text: "Caso os Sub-13 treinem no MaiaSport à 5.ª, o Ringue fica livre à 6.ª feira.",
      },
    ],
    mapsUrl:
      "https://www.google.com/maps/place/Maia+Sport/@41.2484458,-8.659225,139m/data=!3m1!1e3!4m12!1m5!3m4!2zNDHCsDE0JzU1LjEiTiA4wrAzOSczMS4yIlc!8m2!3d41.248649!4d-8.658671!3m5!1s0xd2467d8f56b23d7:0xb72aea0621b3c13e!8m2!3d41.2483775!4d-8.6588456!16s%2Fg%2F11hwywg7nl",
    mapsLabel: "Abrir localização oficial do Maia Sport",
  },
  {
    code: "JF",
    name: "Junta de Freguesia de Vilar do Pinheiro",
    location: "Rua da Igreja, Vilar do Pinheiro (Salão Nobre / Exterior)",
    typeBadge: "Salão • Exterior",
    badgeColor: "slate",
    scheduleTitle: "Modalidades & Horários Oficiais:",
    scheduleBullets: [
      {
        bold: "🏓 Ténis de Mesa (Sábados):",
        text: "16h00 (Sub-11 a Sub-15) e 17h00 (Seniores e Veteranos) no Salão Nobre da Junta.",
      },
      {
        bold: "🏃 Atletismo & Marcha (Domingos):",
        text: "09h00 (ponto de concentração na Junta de Freguesia para treinos e circuitos de corrida).",
      },
    ],
    mapsUrl:
      "https://maps.google.com/?q=Junta+de+Freguesia+de+Vilar+do+Pinheiro",
    mapsLabel: "Abrir Junta de Freguesia no Google Maps",
  },
];

export const KIT_HOTSPOTS: KitHotspot[] = [
  {
    id: "salimpa",
    sponsorName: "SALIMPA Facility Services",
    placementLabel: "Peito Frontal (Destaque Principal)",
    xPercent: 26,
    yPercent: 47,
    color: "teal",
    description:
      "Estampagem central na frente das camisolas de jogo (Verde) e de Guarda-Redes (Amarelo).",
  },
  {
    id: "seabra-vieira",
    sponsorName: "J. Seabra & Vieira, Lda.",
    placementLabel: "Costas Superior (Topo Dorsal)",
    xPercent: 42,
    yPercent: 40,
    color: "blue",
    description:
      "Presença de destaque acima do número oficial do atleta nas costas de todos os equipamentos.",
  },
  {
    id: "esplendido-destemido",
    sponsorName: "Esplêndido e Destemido",
    placementLabel: "Costas Inferior (Base Dorsal)",
    xPercent: 42,
    yPercent: 54,
    color: "amber",
    description:
      "Marca estampada abaixo do número oficial nas costas das camisolas de campo e guarda-redes.",
  },
  {
    id: "carlos-mota",
    sponsorName: "Carlos Mota Seguros",
    placementLabel: "Ombro / Peito Direito",
    xPercent: 23,
    yPercent: 39,
    color: "red",
    description:
      "Logótipo presente no ombro direito de todas as camisolas oficiais da época 2026/2027.",
  },
  {
    id: "alma-barbearia",
    sponsorName: "Alma Barbearia",
    placementLabel: "Ombro / Manga Esquerda",
    xPercent: 30,
    yPercent: 39,
    color: "emerald",
    description:
      "Insígnia oficial no lado esquerdo superior, acompanhando o emblema da AJAVP.",
  },
];

export const KIT_TEAM_PREVIEWS: KitTeamPreview[] = [
  {
    id: "sub7-banco",
    label: "Sub-7 • No Banco",
    badge: "Equipamento Oficial",
    src: "/assets/images/galeria/sub7banco.webp",
    alt: "Atletas Sub-7 no banco com a camisola oficial da AJAVP",
    caption:
      "A alegria dos nossos Sub-7 no banco do pavilhão a estrear a nova camisola com todos os patrocinadores.",
    objectPosition: "center 25%",
  },
  {
    id: "sub9-11",
    label: "Sub-9 & Sub-11",
    badge: "Verde + GR Amarelo",
    src: "/assets/images/galeria/Sub-9e11.webp",
    alt: "Comitiva Sub-9 e Sub-11 com equipamento verde e guarda-redes amarelo",
    caption:
      "Plantel Sub-9 e Sub-11 lado a lado: equipamentos de campo (Verde) e de guarda-redes (Amarelo/Laranja) em ação.",
    objectPosition: "center 35%",
  },
  {
    id: "sub7-tatica",
    label: "Sub-7 • Roda Tática",
    badge: "Costas & Ombros",
    src: "/assets/images/galeria/sub7.webp",
    alt: "Treinador a explicar tática aos Sub-7",
    caption:
      "Concentração máxima na instrução tática: detalhe real das costas e ombros do novo equipamento.",
    objectPosition: "center 35%",
  },
  {
    id: "sub11",
    label: "Escalão Sub-11",
    badge: "Equipa em Jogo",
    src: "/assets/images/galeria/sub11.webp",
    alt: "Equipa Sub-11 da AJAVP na baliza",
    caption:
      "Os nossos Sub-11 e equipa técnica prontos para mais uma jornada oficial dos XL JIF.",
    objectPosition: "center 30%",
  },
  {
    id: "sub13",
    label: "Escalão Sub-13",
    badge: "Campo & Capitão",
    src: "/assets/images/galeria/sub13.webp",
    alt: "Equipa Sub-13 da AJAVP",
    caption:
      "O escalão Sub-13 com o equipamento principal e braçadeira de capitão.",
    objectPosition: "center 25%",
  },
  {
    id: "sub9-preto",
    label: "Sub-9 • Treino Preto",
    badge: "Kit de Treino",
    src: "/assets/images/galeria/sub9_treino_preto.webp",
    alt: "Equipa Sub-9 com equipamento de treino preto no Ringue",
    caption:
      "Rigor também nos treinos: os nossos Sub-9 no Ringue Polidesportivo com o equipamento oficial de treino Preto.",
    objectPosition: "center 20%",
  },
];

export const SPONSORS_LIST: SponsorItem[] = [
  {
    id: "salimpa",
    name: "SALIMPA Facility Services",
    tier: "principal",
    categoryBadge: "Facility Services & Limpeza",
    secondaryBadge: "Líder do Setor",
    logoWebp: "/assets/images/patrocinadores/salimpa.webp",
    logoFallback: "/assets/images/patrocinadores/salimpa.png",
    logoStageBg: "white",
    accentColor: "teal",
    description:
      "Líderes de confiança em soluções completas de limpeza profissional, higienização de instalações e gestão ambiental. A SALIMPA assume um papel primordial no suporte às equipas da AJAVP, garantindo espaços saudáveis e apoiando ativamente a juventude da freguesia.",
    bullets: [
      "Higienização profissional, desinfeção e facility management",
      "Patrocinador de topo na frente dos equipamentos e provas da AJAVP",
    ],
    footerLeft: "Patrocínio Forte",
    footerRight: "Nosso Pilar",
  },
  {
    id: "esplendido-destemido",
    name: "Esplêndido e Destemido",
    tier: "principal",
    categoryBadge: "Canalizações & Redes de Água",
    secondaryBadge: "Assistência Técnica",
    logoWebp: "/assets/images/patrocinadores/esplendido_destemido.webp",
    logoFallback: "/assets/images/patrocinadores/esplendido_destemido.png",
    logoStageBg: "black",
    accentColor: "amber",
    description:
      "Especialistas de referência em canalizações, instalação e reparação de redes de águas, saneamento e assistência urgente. A Esplêndido e Destemido é um dos apoios mais sólidos da AJAVP, garantindo energia e recursos para os nossos escalões de formação.",
    bullets: [
      "Instalações de canalização, desentupimentos e reparações",
      "Contacto Direto: 912 722 171",
    ],
    phone: "912722171",
    footerLeft: "Ligar: 912 722 171",
    footerRight: "Nosso Pilar",
  },
  {
    id: "seabra-vieira",
    name: "J. Seabra & Vieira, Lda.",
    tier: "principal",
    categoryBadge: "Oficina Automóvel & Pneus",
    secondaryBadge: "Mecânica Rápida",
    logoWebp: "/assets/images/patrocinadores/seabra_vieira.webp",
    logoFallback: "/assets/images/patrocinadores/seabra_vieira.png",
    logoStageBg: "white",
    accentColor: "blue",
    description:
      "Oficina de referência na região para montagem, calibragem e alinhamento de pneus, mecânica geral e revisões periódicas. A J. Seabra & Vieira caminha lado a lado com a AJAVP, sendo um dos maiores pilares de suporte às nossas atividades desportivas.",
    bullets: [
      "Pneus multimarca, alinhamento 3D e revisões oficiais",
      "Marcações e Assistência: 933 778 739",
    ],
    phone: "933778739",
    footerLeft: "Ligar: 933 778 739",
    footerRight: "Nosso Pilar",
  },
  {
    id: "carlos-mota-seguros",
    name: "Carlos Mota Seguros",
    tier: "oficial",
    categoryBadge: "Mediação de Seguros & Consultoria",
    secondaryBadge: "Particulares e Empresas",
    logoWebp: "/assets/images/patrocinadores/carlos_mota_seguros.webp",
    logoFallback: "/assets/images/patrocinadores/carlos_mota_seguros.png",
    logoStageBg: "slate",
    accentColor: "red",
    description:
      "Com sólida experiência em consultoria e mediação de risco, a Carlos Mota Seguros garante proteção familiar, automóvel, empresarial, de vida e acidentes pessoais. O parceiro essencial para a tranquilidade das nossas equipas e famílias.",
    bullets: [
      "Soluções personalizadas em todos os ramos de seguros",
      "Apoio continuado aos eventos e equipamentos da AJAVP",
    ],
    footerLeft: "Patrocinador Oficial AJAVP",
    footerRight: "Proteção Confiável",
  },
  {
    id: "alma-barbearia",
    name: "Alma Barbearia",
    tier: "oficial",
    categoryBadge: "Barbearia & Estilo Masculino",
    secondaryBadge: "Vilar do Pinheiro • Since 2021",
    logoWebp: "/assets/images/patrocinadores/alma_barbearia.webp",
    logoFallback: "/assets/images/patrocinadores/alma_barbearia.png",
    logoStageBg: "black",
    accentColor: "emerald",
    description:
      "Espaço moderno de referência em Vilar do Pinheiro especializado em cortes clássicos e tendências, design de barba e cuidados masculinos de topo. Desde 2021 que a Alma Barbearia apoia o futsal jovem e o espírito de comunidade.",
    bullets: [
      "Cortes masculinos modernos, barba tradicional e atendimento de excelência",
      "Apoio direto aos escalões de Futsal & Formação AJAVP",
    ],
    footerLeft: "Patrocinador Oficial AJAVP",
    footerRight: "Apoio com Alma",
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  // Novo Equipamento 26/27 & Futebol/Futsal Recentes
  {
    id: "kit-oficial-26-27",
    src: "/assets/images/equipamento.webp",
    title: "👕 Apresentação Oficial do Novo Equipamento AJAVP 2026/2027 (Campo e Guarda-Redes)",
    badge: "Novo Equipamento 26/27",
    category: "equipamento",
    featuredNew: true,
  },
  {
    id: "sub7-tatica-novo",
    src: "/assets/images/galeria/sub7.webp",
    title: "🥅 Escalão Sub-7 em roda tática com o treinador no pavilhão (Novo Equipamento)",
    badge: "Sub-7 • Tática",
    category: "equipamento",
    featuredNew: true,
    objectPosition: "center 35%",
  },
  {
    id: "sub7-banco-novo",
    src: "/assets/images/galeria/sub7banco.webp",
    title: "🥅 Sorrisos dos nossos Sub-7 no banco do pavilhão a estrear o equipamento 26/27",
    badge: "Sub-7 • Estreia",
    category: "equipamento",
    featuredNew: true,
    objectPosition: "center 25%",
  },
  {
    id: "sub9-11-novo",
    src: "/assets/images/galeria/Sub-9e11.webp",
    title: "⚽ Comitiva conjunta Sub-9 e Sub-11 equipada a rigor para a época 2026/2027",
    badge: "Sub-9 & Sub-11",
    category: "equipamento",
    featuredNew: true,
    objectPosition: "center 35%",
  },
  {
    id: "sub11-novo",
    src: "/assets/images/galeria/sub11.webp",
    title: "⚽ Plantel Sub-11 e equipa técnica da AJAVP com o novo equipamento oficial",
    badge: "Sub-11 • 26/27",
    category: "equipamento",
    featuredNew: true,
    objectPosition: "center 30%",
  },
  {
    id: "sub13-novo",
    src: "/assets/images/galeria/sub13.webp",
    title: "⚽ Escalão Sub-13 da AJAVP com o novo equipamento verde e preto e braçadeira de capitão",
    badge: "Sub-13 • 26/27",
    category: "equipamento",
    featuredNew: true,
    objectPosition: "center 20%",
  },
  {
    id: "sub9-treino-preto",
    src: "/assets/images/galeria/sub9_treino_preto.webp",
    title: "👕 Escalão Sub-9 no Ringue Polidesportivo com o Equipamento Oficial de Treino (Preto)",
    badge: "Sub-9 • Treino Preto",
    category: "equipamento",
    featuredNew: true,
    objectPosition: "center 22%",
  },
  // Atletismo & Corta-Mato & 25 de Abril
  {
    id: "corta-mato-2026",
    src: "/assets/images/galeria/corta_mato_equipa_2026.webp",
    title: "🏆 Comitiva AJAVP Campeã Geral Concelhia de Corta-Mato nos XL JIF no Espaço Agros (34 pts)",
    badge: "Campeões Corta-Mato",
    category: "atletismo",
    objectPosition: "center 35%",
  },
  {
    id: "25-abril-grupo",
    src: "/assets/images/galeria/prova_25_abril_2025_grupo.webp",
    title: "🏃 Prova de Atletismo do 25 de Abril - Comitiva Oficial da AJAVP em Vila do Conde",
    badge: "25 de Abril",
    category: "familia",
  },
  {
    id: "25-abril-aquecimento",
    src: "/assets/images/galeria/prova_25_abril_2025_aquecimento.webp",
    title: "🏃 Prova do 25 de Abril - Aquecimento dos Atletas de Formação da AJAVP",
    badge: "25 de Abril",
    category: "atletismo",
    objectPosition: "center 35%",
  },
  {
    id: "25-abril-caminhada",
    src: "/assets/images/galeria/prova_25_abril_2025_caminhada.webp",
    title: "🏃 Prova do 25 de Abril - A Mancha Verde a Caminho da Partida em Vila do Conde",
    badge: "Mancha Verde",
    category: "familia",
    objectPosition: "center 40%",
  },
  {
    id: "25-abril-comitiva",
    src: "/assets/images/galeria/prova_25_abril_2025_comitiva.webp",
    title: "🏃 Prova do 25 de Abril - Juventude e Monitores de Vilar do Pinheiro",
    badge: "Comitiva AJAVP",
    category: "familia",
  },
  {
    id: "foto-01",
    src: "/assets/images/galeria/foto_01.webp",
    title: "🏃 Atletismo - Prova de Corrida de Estrada AJAVP",
    badge: "Atletismo",
    category: "atletismo",
  },
  {
    id: "foto-10",
    src: "/assets/images/galeria/foto_10.webp",
    title: "🏃 Equipa Jovem e Adultos com dorsais na prova de Corta-Mato",
    badge: "Corta-Mato",
    category: "atletismo",
  },
  {
    id: "foto-16",
    src: "/assets/images/galeria/foto_16.webp",
    title: "🏃 Atletas da AJAVP na Milha e Provas de Estrada",
    badge: "Milha & Estrada",
    category: "atletismo",
  },
  {
    id: "foto-30",
    src: "/assets/images/galeria/foto_30.webp",
    title: "🏃 Chegada à Meta em Vila do Conde",
    badge: "Atletismo",
    category: "atletismo",
  },
  // Outras Modalidades (Badminton, Ténis de Mesa, Duatlo BTT, Futebol Praia)
  {
    id: "foto-02",
    src: "/assets/images/galeria/foto_02.webp",
    title: "🏸 Badminton - Equipa oficial da AJAVP junto à rede em pavilhão",
    badge: "Badminton",
    category: "outras",
  },
  {
    id: "foto-22",
    src: "/assets/images/galeria/foto_22.webp",
    title: "🏓 Ténis de Mesa - Jovens atletas da formação da AJAVP em torneio",
    badge: "Ténis de Mesa",
    category: "outras",
  },
  {
    id: "foto-23",
    src: "/assets/images/galeria/foto_23.webp",
    title: "🏓 Ténis de Mesa - Competição sénior da AJAVP em ação",
    badge: "Ténis de Mesa",
    category: "outras",
  },
  {
    id: "foto-11",
    src: "/assets/images/galeria/foto_11.webp",
    title: "🏓 Ténis de Mesa - Representação oficial da Mancha Verde",
    badge: "Ténis de Mesa",
    category: "outras",
  },
  {
    id: "foto-17",
    src: "/assets/images/galeria/foto_17.webp",
    title: "🚴 Duatlo em Duplas - Jovens e adultos com bicicletas de BTT e capacetes",
    badge: "Duatlo BTT",
    category: "outras",
  },
  {
    id: "foto-15",
    src: "/assets/images/galeria/foto_15.webp",
    title: "🚴 Duatlo BTT - Preparação das duplas no parque de transição",
    badge: "Duatlo BTT",
    category: "outras",
  },
  {
    id: "foto-26",
    src: "/assets/images/galeria/foto_26.webp",
    title: "🏖️ Futebol de Praia - Escalão de formação no areal de Vila do Conde",
    badge: "Futebol Praia",
    category: "outras",
  },
  {
    id: "foto-04",
    src: "/assets/images/galeria/foto_04.webp",
    title: "🏖️ Futebol de Praia - Comitiva e treinadores na baliza de areia",
    badge: "Futebol Praia",
    category: "outras",
  },
  // Futsal & Futebol (Histórico & Treinos)
  {
    id: "foto-29",
    src: "/assets/images/galeria/foto_29.webp",
    title: "🏆 Jovens atletas da AJAVP a erguer a taça no pavilhão",
    badge: "Conquista 🏆",
    category: "futsal",
  },
  {
    id: "foto-37",
    src: "/assets/images/galeria/foto_37.webp",
    title: "🥅 Palestra técnica e união no treino de Futsal em Pavilhão Coberto",
    badge: "Futsal Pavilhão",
    category: "futsal",
  },
  {
    id: "foto-41",
    src: "/assets/images/galeria/foto_41.webp",
    title: "⚽ Futebol Formação - Alegria dos mais pequenos no relvado",
    badge: "Futebol Formação",
    category: "futsal",
  },
  {
    id: "foto-18",
    src: "/assets/images/galeria/foto_18.webp",
    title: "🥅 Sessão de treino no Ringue Polidesportivo de Vilar do Pinheiro",
    badge: "Ringue Vilar",
    category: "futsal",
  },
  {
    id: "foto-03",
    src: "/assets/images/galeria/foto_03.webp",
    title: "🥅 Instruções no banco durante jornada de Futsal em pavilhão",
    badge: "Futsal JIF",
    category: "futsal",
  },
  {
    id: "foto-12",
    src: "/assets/images/galeria/foto_12.webp",
    title: "🥅 Preparação da equipa antes de entrar em campo",
    badge: "Futsal",
    category: "futsal",
  },
  {
    id: "foto-13",
    src: "/assets/images/galeria/foto_13.webp",
    title: "🥅 Concentração da formação no balneário antes do jogo",
    badge: "Balneário AJAVP",
    category: "futsal",
  },
  {
    id: "foto-31",
    src: "/assets/images/galeria/foto_31.webp",
    title: "⚽ Equipa de formação e equipa técnica em torneio exterior",
    badge: "Formação",
    category: "futsal",
  },
  {
    id: "foto-36",
    src: "/assets/images/galeria/foto_36.webp",
    title: "🥅 Grupo de atletas no treino noturno em pavilhão",
    badge: "Treino Futsal",
    category: "futsal",
  },
  {
    id: "foto-09",
    src: "/assets/images/galeria/foto_09.webp",
    title: "⚽ Exercícios técnicos de Futebol e Futsal",
    badge: "Treino",
    category: "futsal",
  },
  // Família, Valores & Pódios
  {
    id: "contactos-uniao",
    src: "/assets/images/galeria/contactos_uniao_equipa.webp",
    title: "💚 União e Espírito de Equipa da Família AJAVP",
    badge: "União AJAVP",
    category: "familia",
  },
  {
    id: "foto-07",
    src: "/assets/images/galeria/foto_07.webp",
    title: "🏳️ Orgulho na bandeira e brasão de Vilar do Pinheiro",
    badge: "Vilar do Pinheiro",
    category: "familia",
  },
  {
    id: "foto-14",
    src: "/assets/images/galeria/foto_14.webp",
    title: "🏅 Pódios, Troféus e Medalhas conquistadas pela AJAVP",
    badge: "Pódios & Medalhas",
    category: "familia",
  },
  {
    id: "foto-28",
    src: "/assets/images/galeria/foto_28.webp",
    title: "🤝 Espírito de Equipa, Amizade e Família AJAVP",
    badge: "Família AJAVP",
    category: "familia",
  },
  {
    id: "foto-39",
    src: "/assets/images/galeria/foto_39.webp",
    title: "❤️ Companheirismo e Valores Desportivos em Vilar do Pinheiro",
    badge: "Valores",
    category: "familia",
  },
  {
    id: "foto-05",
    src: "/assets/images/galeria/foto_05.webp",
    title: "🏃 Sorrisos da formação nas provas concelhias",
    badge: "Formação",
    category: "familia",
  },
];

export const VIDEOS_LIST: VideoItem[] = [
  {
    id: "reel-corta-mato",
    externalUrl: "https://www.instagram.com/ajavp.javip",
    thumbnail: "/assets/images/instagram/reel_corta_mato.webp",
    badge: "Corta-Mato 26/27",
    isReel: true,
    dateLabel: "03/Out/2026",
    title: "Promoção do Corta-Mato dos XL JIF",
    description:
      "O vídeo de aquecimento e motivação dos atletas para a grande prova no Espaço Agros onde a AJAVP foi Campeã Concelhia (34 pts).",
    highlightBadge: "1.º Lugar Geral (34 pts)",
  },
  {
    id: "festa-futebol",
    youtubeId: "z6y5z2Rvz3k",
    thumbnail: "https://i.ytimg.com/vi/z6y5z2Rvz3k/hqdefault.jpg",
    badge: "Futebol",
    title: "Festa do Futebol Final de Época",
    description:
      "Celebração de encerramento da época com todos os escalões e entrega de prémios.",
  },
  {
    id: "corta-mato-25-26",
    youtubeId: "ga7ouvyWdN8",
    thumbnail: "https://i.ytimg.com/vi/ga7ouvyWdN8/hqdefault.jpg",
    badge: "Atletismo",
    title: "Prova de Corta-Mato Época 25/26",
    description:
      "Superação e velocidade dos nossos atletas nas pistas de corta-mato.",
  },
  {
    id: "tenis-mesa-video",
    youtubeId: "8AnzOtDopgc",
    thumbnail: "https://i.ytimg.com/vi/8AnzOtDopgc/hqdefault.jpg",
    badge: "Ténis de Mesa",
    title: "Encontros de Ténis de Mesa",
    description:
      "Os momentos mais intensos de competição e convívio nas mesas da AJAVP.",
  },
  {
    id: "duatlo-video",
    youtubeId: "OJr7tweWsiM",
    thumbnail: "https://i.ytimg.com/vi/OJr7tweWsiM/hqdefault.jpg",
    badge: "Duatlo",
    title: "Duatlo em Duplas 25/26",
    description:
      "Corrida e bicicleta em sintonia perfeita com equipas em duplas.",
  },
  {
    id: "equipa-para-todos",
    youtubeId: "AXcuh4QRXew",
    thumbnail: "https://i.ytimg.com/vi/AXcuh4QRXew/hqdefault.jpg",
    badge: "Espírito",
    title: "AJAVP - Uma Equipa Para Todos",
    description:
      "A força coletiva, integração de gerações e valores de Vilar do Pinheiro.",
  },
  {
    id: "resumo-epoca",
    youtubeId: "bj3W5UlWn9Y",
    thumbnail: "https://i.ytimg.com/vi/bj3W5UlWn9Y/hqdefault.jpg",
    badge: "Geral",
    title: "AJAVP Época Resumo 25/26",
    description:
      "Compilação dos melhores momentos e conquistas de todas as modalidades.",
  },
];

export const CONTACTOS_FAQ: FaqItem[] = [
  {
    question: "1. Como funciona o treino experimental?",
    answer:
      "Qualquer atleta novo pode realizar um ou mais treinos gratuitos sem compromisso. Basta trazer calçado desportivo e a ficha de autorização para treino experimental assinada pelo encarregado de educação.",
  },
  {
    question: "2. O seguro desportivo está incluído?",
    answer:
      "Sim. Todos os atletas formalmente inscritos na AJAVP e na ADCCVC para os Jogos Inter-Freguesias estão cobertos pela apólice oficial de acidentes pessoais durante treinos e provas oficiais.",
  },
  {
    question: "3. Qual é o equipamento de treino obrigatório?",
    answer:
      "O equipamento oficial de treino da AJAVP é de cor Preta. A apresentação com este equipamento é obrigatória em todas as sessões de treino para manter a uniformidade e identidade da equipa.",
  },
  {
    question: "4. Como é assegurado o transporte para os jogos?",
    answer:
      "Para as jornadas dos JIF nos vários pavilhões concelhios de Vila do Conde, a organização e os encarregados organizam boleias partilhadas (carpooling) coordenadas pelo grupo de WhatsApp oficial de cada escalão.",
  },
];

