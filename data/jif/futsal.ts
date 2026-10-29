import rawData from '@/public/assets/data/jif-futsal.json';

export interface KPIItem {
  label: string;
  valor: string;
  sub: string;
}

export interface DestaqueSemana {
  titulo: string;
  subtitulo: string;
  badge: string;
  kpis: KPIItem[];
}

export interface FutsalJogo {
  escalao?: string;
  campo?: string;
  hora: string;
  casa: string;
  fora: string;
  golosCasa: number;
  golosFora: number;
  isAjavp?: boolean;
}

export interface FutsalPavilhao {
  nome: string;
  cor: string;
  jogos: FutsalJogo[];
}

export interface FutsalJornada {
  numero: number;
  data: string;
  estado: string;
  pavilhoes: FutsalPavilhao[];
}

export interface FutsalClassificacaoLinha {
  pos: number;
  equipa: string;
  pontos: number;
  jogos: number;
  v: number;
  e: number;
  d: number;
  gm: number;
  gs: number;
  saldo: number;
  isAjavp?: boolean;
  lider?: boolean;
  podio?: boolean;
}

export interface FutsalClassificacaoEscalao {
  titulo: string;
  totalEquipas: number;
  tabela: FutsalClassificacaoLinha[];
}

export interface FutsalMarcadorAtleta {
  pos: number;
  nome: string;
  equipa: string;
  golos: number;
  isAjavp?: boolean;
  coroa?: boolean;
  medalha?: string;
}

export interface FutsalMarcadoresEscalao {
  escalao: string;
  atletas: FutsalMarcadorAtleta[];
}

export interface FutsalDestaqueAjavp {
  escalao: string;
  pavilhao: string;
  resultado: string;
  data: string;
  posicao: string;
  resumo: string;
  destaque: boolean;
}

export interface ProximaJornadaJogo {
  escalao: string;
  adversario: string;
  pavilhao: string;
  hora: string;
}

export interface ProximaJornada {
  numero: number;
  dataPrevisao: string;
  estado: string;
  jogosAjavp: ProximaJornadaJogo[];
}

export interface FutsalHubData {
  temporada: string;
  edicao: string;
  modalidade: string;
  ultimaAtualizacao: string;
  jornadaAtiva: number;
  destaqueSemana: DestaqueSemana;
  destaquesAjavp: FutsalDestaqueAjavp[];
  melhoresMarcadores: FutsalMarcadoresEscalao[];
  classificacoes: {
    sub7: FutsalClassificacaoEscalao;
    sub9: FutsalClassificacaoEscalao;
    sub11: FutsalClassificacaoEscalao;
    sub13: FutsalClassificacaoEscalao;
    sub16: FutsalClassificacaoEscalao;
  };
  jornadas: FutsalJornada[];
  proximaJornada: ProximaJornada;
}

export const FUTSAL_DATA: FutsalHubData = rawData as unknown as FutsalHubData;

