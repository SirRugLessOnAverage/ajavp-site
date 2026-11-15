import { supabasePublic } from '@/lib/supabase/public';
import {
  FUTSAL_DATA,
  type FutsalClassificacaoEscalao,
  type FutsalHubData,
  type FutsalJornada,
  type FutsalMarcadoresEscalao,
  type FutsalPavilhao,
} from '@/data/jif/futsal';
import { JIF_CLASSIFICACAO, type JifParishRanking } from '@/data/jif/classificacao';
import { JIF_CIRCULARS, type JifCircular, type JifCircularHighlight } from '@/data/jif/comunicados';

interface ExtractedJogoRaw {
  escalao?: string;
  casa?: string;
  fora?: string;
  golosCasa?: number;
  golosFora?: number;
  local?: string;
  hora?: string;
}

interface ExtractedTabelaRaw {
  escalao?: string;
  linhas?: Array<{
    pos?: number;
    equipa?: string;
    pontos?: number;
    jogos?: number;
    v?: number;
    e?: number;
    d?: number;
    gm?: number;
    gs?: number;
    saldo?: number;
  }>;
}

interface ExtractedMarcadoresRaw {
  escalao?: string;
  atletas?: Array<{
    pos?: number;
    nome?: string;
    equipa?: string;
    golos?: number;
  }>;
}

interface ExtractedEventoRaw {
  data?: string;
  hora?: string;
  modalidade?: string;
  titulo?: string;
  local?: string;
}

function normalizarChaveEscalao(escalao?: string): keyof FutsalHubData['classificacoes'] | null {
  const s = (escalao || '').toLowerCase().replace(/\s+/g, '');
  if (s.includes('sub-7') || s.includes('sub7')) return 'sub7';
  if (s.includes('sub-9') || s.includes('sub9')) return 'sub9';
  if (s.includes('sub-11') || s.includes('sub11')) return 'sub11';
  if (s.includes('sub-13') || s.includes('sub13')) return 'sub13';
  if (s.includes('sub-16') || s.includes('sub16')) return 'sub16';
  return null;
}

function adaptarExtractedParaFutsal(payload: Record<string, unknown>): FutsalHubData {
  const base: FutsalHubData = {
    ...FUTSAL_DATA,
    classificacoes: { ...FUTSAL_DATA.classificacoes },
    jornadas: [...FUTSAL_DATA.jornadas],
  };

  if (typeof payload.dataDocumento === 'string' && payload.dataDocumento) {
    base.ultimaAtualizacao = payload.dataDocumento;
  }

  const jogosRaw = Array.isArray(payload.jogos) ? (payload.jogos as ExtractedJogoRaw[]) : [];
  if (jogosRaw.length > 0) {
    const cores = ['emerald', 'sky', 'amber', 'indigo', 'purple'];
    const porPavilhao = new Map<string, FutsalPavilhao>();

    for (const j of jogosRaw) {
      const nomePav = (j.local || 'Pavilhão').trim();
      if (!porPavilhao.has(nomePav)) {
        porPavilhao.set(nomePav, {
          nome: nomePav,
          cor: cores[porPavilhao.size % cores.length],
          jogos: [],
        });
      }
      const casa = j.casa || '';
      const fora = j.fora || '';
      porPavilhao.get(nomePav)!.jogos.push({
        escalao: j.escalao,
        hora: j.hora || '--:--',
        casa,
        fora,
        golosCasa: Number(j.golosCasa ?? 0),
        golosFora: Number(j.golosFora ?? 0),
        isAjavp: /vilar|ajavp/i.test(`${casa} ${fora}`),
      });
    }

    const numJornada =
      typeof payload.numeroComunicado === 'number' && payload.numeroComunicado > 0
        ? payload.numeroComunicado
        : (FUTSAL_DATA.jornadaAtiva || 1) + 1;

    const novaJornada: FutsalJornada = {
      numero: numJornada,
      data: typeof payload.dataDocumento === 'string' ? payload.dataDocumento : base.ultimaAtualizacao,
      estado: 'Concluída',
      pavilhoes: Array.from(porPavilhao.values()),
    };

    base.jornadaAtiva = numJornada;
    base.jornadas = [novaJornada, ...base.jornadas.filter((j) => j.numero !== numJornada)];
  }

  const tabelasRaw = Array.isArray(payload.tabelasClassificacao)
    ? (payload.tabelasClassificacao as ExtractedTabelaRaw[])
    : [];
  for (const t of tabelasRaw) {
    const chave = normalizarChaveEscalao(t.escalao);
    if (!chave || !Array.isArray(t.linhas) || t.linhas.length === 0) continue;
    const escAtual: FutsalClassificacaoEscalao = base.classificacoes[chave];
    base.classificacoes[chave] = {
      titulo: t.escalao || escAtual.titulo,
      totalEquipas: t.linhas.length,
      tabela: t.linhas.map((l, idx) => {
        const pos = Number(l.pos ?? idx + 1);
        const equipa = l.equipa || '';
        return {
          pos,
          equipa,
          pontos: Number(l.pontos ?? 0),
          jogos: Number(l.jogos ?? 0),
          v: Number(l.v ?? 0),
          e: Number(l.e ?? 0),
          d: Number(l.d ?? 0),
          gm: Number(l.gm ?? 0),
          gs: Number(l.gs ?? 0),
          saldo: Number(l.saldo ?? 0),
          isAjavp: /vilar|ajavp/i.test(equipa),
          lider: pos === 1,
          podio: pos <= 3,
        };
      }),
    };
  }

  const marcadoresRaw = Array.isArray(payload.melhoresMarcadores)
    ? (payload.melhoresMarcadores as ExtractedMarcadoresRaw[])
    : [];
  if (marcadoresRaw.length > 0) {
    base.melhoresMarcadores = marcadoresRaw.map((m): FutsalMarcadoresEscalao => ({
      escalao: m.escalao || 'Escalão',
      atletas: (m.atletas || []).map((a, idx) => ({
        pos: Number(a.pos ?? idx + 1),
        nome: a.nome || '',
        equipa: a.equipa || '',
        golos: Number(a.golos ?? 0),
        isAjavp: /vilar|ajavp/i.test(a.equipa || ''),
      })),
    }));
  }

  return base;
}

/**
 * Obtém os dados de Futsal mais recentes.
 * Prioridade 1: Tabela partilhada `site_jif_dados` no Supabase (atualizada via Gemini IA na Direção).
 * Fallback: Ficheiro estático de contingência `data/jif-futsal.json`.
 */
export async function obterDadosFutsal(): Promise<FutsalHubData> {
  try {
    const { data, error } = await supabasePublic
      .from('site_jif_dados')
      .select('dados')
      .eq('tipo', 'futsal')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data?.dados && typeof data.dados === 'object') {
      const payload = data.dados as unknown as Record<string, unknown>;
      // Formato completo nativo
      if (payload.jornadaAtiva && payload.classificacoes) {
        return payload as unknown as FutsalHubData;
      }
      // Formato extraído pela IA (ExtractedJifData)
      if (
        Array.isArray(payload.jogos) ||
        Array.isArray(payload.tabelasClassificacao) ||
        Array.isArray(payload.melhoresMarcadores)
      ) {
        return adaptarExtractedParaFutsal(payload);
      }
    }
  } catch (err) {
    console.warn('Aviso: Leitura dinâmica de futsal indisponível, a usar fallback estático.', err);
  }

  return FUTSAL_DATA;
}

/**
 * Obtém a Classificação Geral Virtual mais recente dos JIF.
 * Prioridade 1: Tabela partilhada `site_jif_dados` no Supabase.
 * Fallback: Ficheiro estático de contingência `data/jif/classificacao.ts`.
 */
export async function obterDadosClassificacao(): Promise<JifParishRanking[]> {
  try {
    const { data, error } = await supabasePublic
      .from('site_jif_dados')
      .select('dados')
      .eq('tipo', 'classificacao_virtual')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data?.dados) {
      const payload = data.dados as unknown as Record<string, unknown>;
      if (Array.isArray(payload)) {
        return payload as unknown as JifParishRanking[];
      }
      if (Array.isArray(payload.classificacao)) {
        return payload.classificacao as unknown as JifParishRanking[];
      }
    }
  } catch (err) {
    console.warn('Aviso: Leitura dinâmica da classificação indisponível, a usar fallback estático.', err);
  }

  return JIF_CLASSIFICACAO;
}

/**
 * Obtém os Comunicados Oficiais mais recentes.
 * Prioridade 1: Tabela partilhada `site_jif_dados` no Supabase.
 * Fallback: Ficheiro estático de contingência `data/jif/comunicados.ts`.
 */
export async function obterDadosComunicados(): Promise<JifCircular[]> {
  try {
    const { data, error } = await supabasePublic
      .from('site_jif_dados')
      .select('dados')
      .eq('tipo', 'comunicados')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data?.dados) {
      const payload = data.dados as unknown as Record<string, unknown>;
      if (Array.isArray(payload)) {
        return payload as unknown as JifCircular[];
      }
      if (Array.isArray(payload.circulares)) {
        return payload.circulares as unknown as JifCircular[];
      }
      if (typeof payload.titulo === 'string' || typeof payload.resumo === 'string') {
        const num = typeof payload.numeroComunicado === 'number' ? payload.numeroComunicado : 99;
        const eventos = Array.isArray(payload.proximosEventos)
          ? (payload.proximosEventos as ExtractedEventoRaw[])
          : [];
        const highlights: JifCircularHighlight[] = eventos.map((ev) => ({
          title: ev.titulo || 'Evento JIF',
          badge: ev.modalidade || undefined,
          description: [ev.data, ev.hora, ev.local].filter(Boolean).join(' • '),
        }));
        const novoComunicado: JifCircular = {
          id: num,
          numberFormatted: String(num).padStart(2, '0'),
          date:
            typeof payload.dataDocumento === 'string' && payload.dataDocumento
              ? payload.dataDocumento
              : new Date().toISOString().slice(0, 10),
          formattedDate:
            typeof payload.dataDocumento === 'string' && payload.dataDocumento
              ? payload.dataDocumento
              : 'Atualizado via IA',
          badge: `Comunicado ${String(num).padStart(2, '0')}`,
          badgeColor: 'emerald',
          title: (payload.titulo as string) || 'Comunicado Oficial JIF',
          summaryQuote: typeof payload.resumo === 'string' ? payload.resumo : undefined,
          highlights,
        };
        return [novoComunicado, ...JIF_CIRCULARS.filter((c) => c.id !== num)];
      }
    }
  } catch (err) {
    console.warn('Aviso: Leitura dinâmica de comunicados indisponível, a usar fallback estático.', err);
  }

  return JIF_CIRCULARS;
}
