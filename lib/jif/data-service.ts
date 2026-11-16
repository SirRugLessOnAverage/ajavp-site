import { supabasePublic } from '@/lib/supabase/public';
import {
  FUTSAL_DATA,
  type FutsalClassificacaoEscalao,
  type FutsalHubData,
  type FutsalJogo,
  type FutsalJornada,
  type FutsalMarcadoresEscalao,
  type FutsalPavilhao,
} from '@/data/jif/futsal';
import { FUTSAL_JORNADAS } from '@/data/jif/futsal-jogos';
import { JIF_CLASSIFICACAO, type JifParishRanking } from '@/data/jif/classificacao';
import { JIF_CIRCULARS, type JifCircular, type JifCircularHighlight } from '@/data/jif/comunicados';
import {
  chaveCanonicaEquipa,
  normalizarEscalaoJogo,
  formatarNomeEquipa,
} from '@/lib/jif/team-matches';

interface ExtractedJogoRaw {
  jornada?: number;
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

function normalizarHora(hora?: string): string {
  if (!hora) return '';
  const m = hora.trim().match(/(\d{1,2})[h:](\d{2})/i);
  if (!m) return hora.trim();
  return `${m[1].padStart(2, '0')}:${m[2]}`;
}

function chaveConfronto(escalao?: string, pavNome?: string, casa?: string, fora?: string): string {
  const esc = normalizarEscalaoJogo(escalao, pavNome);
  return `${esc}-${chaveCanonicaEquipa(casa)}-${chaveCanonicaEquipa(fora)}`;
}

function construirJornadasBase(): FutsalJornada[] {
  return FUTSAL_JORNADAS.map((fj) => ({
    numero: fj.number,
    data: fj.formattedDate || fj.date,
    estado: fj.number < 4 ? 'Concluída' : 'Agendada',
    pavilhoes: fj.venueSessions.map((v) => ({
      nome: v.venueName,
      cor: 'emerald',
      jogos: v.matches.map((m) => {
        let golosCasa = 0;
        let golosFora = 0;
        if (m.score && m.score.includes('-')) {
          const parts = m.score.split('-').map((s) => Number(s.trim()));
          if (!isNaN(parts[0]) && !isNaN(parts[1])) {
            golosCasa = parts[0];
            golosFora = parts[1];
          }
        }
        return {
          escalao: normalizarEscalaoJogo(m.category, v.venueName),
          campo: v.subLocation,
          hora: m.time,
          casa: m.homeTeam,
          fora: m.awayTeam,
          golosCasa,
          golosFora,
          isAjavp: Boolean(m.isAjavp),
        };
      }),
    })),
  }));
}

/**
 * Funde as jornadas dinâmicas/JSON sobre o calendário oficial (1ª a 6ª Jornada)
 * utilizando chaves canónicas por confronto para nunca duplicar jogos nem descartar jornadas futuras.
 */
export function consolidarTodasJornadas(jornadasExistentes: FutsalJornada[]): FutsalJornada[] {
  const mapa = new Map<number, FutsalJornada>();

  for (const baseJ of construirJornadasBase()) {
    mapa.set(baseJ.numero, baseJ);
  }

  for (const j of jornadasExistentes) {
    const existente = mapa.get(j.numero);
    if (!existente) {
      mapa.set(j.numero, {
        ...j,
        pavilhoes: (j.pavilhoes || []).map((p) => ({
          ...p,
          jogos: (p.jogos || []).map((jogo) => ({
            ...jogo,
            escalao: normalizarEscalaoJogo(jogo.escalao, p.nome),
          })),
        })),
      });
      continue;
    }

    // Indexar os jogos base da jornada por chave canónica
    const indice = new Map<string, FutsalJogo>();
    for (const pBase of existente.pavilhoes) {
      for (const jogoBase of pBase.jogos) {
        const k = chaveConfronto(jogoBase.escalao, pBase.nome, jogoBase.casa, jogoBase.fora);
        indice.set(k, jogoBase);
      }
    }

    for (const p of j.pavilhoes || []) {
      for (const jogo of p.jogos || []) {
        const escalaoNorm = normalizarEscalaoJogo(jogo.escalao, p.nome);
        const k = chaveConfronto(escalaoNorm, p.nome, jogo.casa, jogo.fora);
        const alvo = indice.get(k);

        if (alvo) {
          alvo.golosCasa = Number(jogo.golosCasa ?? 0);
          alvo.golosFora = Number(jogo.golosFora ?? 0);
          if (jogo.hora) alvo.hora = jogo.hora;
          if (escalaoNorm) alvo.escalao = escalaoNorm;
          if (jogo.campo) alvo.campo = jogo.campo;
          alvo.isAjavp =
            Boolean(jogo.isAjavp) ||
            chaveCanonicaEquipa(alvo.casa) === 'ajavp' ||
            chaveCanonicaEquipa(alvo.fora) === 'ajavp';
        } else {
          // Confronto extra não previsto no calendário base
          let pavDestino = existente.pavilhoes.find(
            (pb) => pb.nome.toLowerCase() === p.nome.toLowerCase()
          );
          if (!pavDestino) {
            pavDestino = { nome: p.nome, cor: p.cor || 'emerald', jogos: [] };
            existente.pavilhoes.push(pavDestino);
          }
          const novoJogo: FutsalJogo = {
            ...jogo,
            escalao: escalaoNorm,
            isAjavp:
              Boolean(jogo.isAjavp) ||
              chaveCanonicaEquipa(jogo.casa) === 'ajavp' ||
              chaveCanonicaEquipa(jogo.fora) === 'ajavp',
          };
          pavDestino.jogos.push(novoJogo);
          indice.set(k, novoJogo);
        }
      }
    }

    if (j.estado?.toLowerCase().includes('concl')) {
      existente.estado = 'Concluída';
    }
    if (j.data) {
      existente.data = j.data;
    }
  }

  return Array.from(mapa.values()).sort((a, b) => a.numero - b.numero);
}

function calcularGolosPorEquipa(
  jornadas: FutsalJornada[],
  chaveEscalao: keyof FutsalHubData['classificacoes']
): Map<string, { gm: number; gs: number }> {
  const totais = new Map<string, { gm: number; gs: number }>();

  for (const j of jornadas) {
    if (!j.estado.toLowerCase().includes('concl')) continue;
    for (const p of j.pavilhoes) {
      for (const jogo of p.jogos) {
        if (normalizarChaveEscalao(normalizarEscalaoJogo(jogo.escalao, p.nome)) !== chaveEscalao) {
          continue;
        }
        const cCasa = chaveCanonicaEquipa(jogo.casa);
        const cFora = chaveCanonicaEquipa(jogo.fora);
        const gc = Number(jogo.golosCasa ?? 0);
        const gf = Number(jogo.golosFora ?? 0);

        if (cCasa) {
          const cur = totais.get(cCasa) || { gm: 0, gs: 0 };
          cur.gm += gc;
          cur.gs += gf;
          totais.set(cCasa, cur);
        }
        if (cFora) {
          const cur = totais.get(cFora) || { gm: 0, gs: 0 };
          cur.gm += gf;
          cur.gs += gc;
          totais.set(cFora, cur);
        }
      }
    }
  }

  return totais;
}

/**
 * Adapta os dados extraídos via IA (`site_jif_dados`) reconciliando os resultados
 * diretamente nas jornadas oficiais (1ª a 6ª Jornada) sem criar jornadas artificiais nem duplicar jogos.
 */
export function adaptarExtractedParaFutsal(payload: Record<string, unknown>): FutsalHubData {
  const jornadasConsolidadas = consolidarTodasJornadas(FUTSAL_DATA.jornadas);
  const base: FutsalHubData = {
    ...FUTSAL_DATA,
    classificacoes: { ...FUTSAL_DATA.classificacoes },
    jornadas: jornadasConsolidadas,
  };

  if (typeof payload.dataDocumento === 'string' && payload.dataDocumento) {
    base.ultimaAtualizacao = payload.dataDocumento;
  }

  const jogosRaw = Array.isArray(payload.jogos) ? (payload.jogos as ExtractedJogoRaw[]) : [];
  if (jogosRaw.length > 0) {
    // Indexar todas as ocorrências de confrontos em jornadasConsolidadas
    const indice = new Map<
      string,
      Array<{ jornada: FutsalJornada; pav: FutsalPavilhao; jogo: FutsalJogo }>
    >();
    for (const jornada of base.jornadas) {
      for (const pav of jornada.pavilhoes) {
        for (const jogo of pav.jogos) {
          const k = chaveConfronto(jogo.escalao, pav.nome, jogo.casa, jogo.fora);
          if (!indice.has(k)) indice.set(k, []);
          indice.get(k)!.push({ jornada, pav, jogo });
        }
      }
    }

    const jornadasTocadas = new Set<number>();

    for (const j of jogosRaw) {
      const escalaoNorm = normalizarEscalaoJogo(j.escalao, j.local);
      const cCasa = chaveCanonicaEquipa(j.casa);
      const cFora = chaveCanonicaEquipa(j.fora);
      const k = `${escalaoNorm}-${cCasa}-${cFora}`;
      const candidatos = indice.get(k) || [];

      let alvo =
        typeof j.jornada === 'number' && j.jornada > 0
          ? candidatos.find((c) => c.jornada.numero === j.jornada)
          : undefined;

      if (!alvo && candidatos.length === 1) {
        alvo = candidatos[0];
      } else if (!alvo && candidatos.length > 1) {
        const horaNorm = normalizarHora(j.hora);
        alvo =
          (horaNorm
            ? candidatos.find((c) => normalizarHora(c.jogo.hora) === horaNorm)
            : undefined) || candidatos[0];
      }

      if (alvo) {
        alvo.jogo.golosCasa = Number(j.golosCasa ?? 0);
        alvo.jogo.golosFora = Number(j.golosFora ?? 0);
        if (j.hora) alvo.jogo.hora = j.hora;
        if (escalaoNorm) alvo.jogo.escalao = escalaoNorm;
        alvo.jogo.isAjavp = cCasa === 'ajavp' || cFora === 'ajavp';
        jornadasTocadas.add(alvo.jornada.numero);
      } else if (typeof j.jornada === 'number' && j.jornada > 0) {
        // Jogo genuinamente novo com número de jornada explícito
        let jornadaDestino = base.jornadas.find((jr) => jr.numero === j.jornada);
        if (!jornadaDestino) {
          jornadaDestino = {
            numero: j.jornada,
            data:
              typeof payload.dataDocumento === 'string' && payload.dataDocumento
                ? payload.dataDocumento
                : base.ultimaAtualizacao,
            estado: 'Concluída',
            pavilhoes: [],
          };
          base.jornadas.push(jornadaDestino);
          base.jornadas.sort((a, b) => a.numero - b.numero);
        }
        const nomePav = (j.local || 'Pavilhão').trim();
        let pavDestino = jornadaDestino.pavilhoes.find(
          (p) => p.nome.toLowerCase() === nomePav.toLowerCase()
        );
        if (!pavDestino) {
          pavDestino = { nome: nomePav, cor: 'emerald', jogos: [] };
          jornadaDestino.pavilhoes.push(pavDestino);
        }
        const novoJogo: FutsalJogo = {
          escalao: escalaoNorm,
          hora: j.hora || '--:--',
          casa: j.casa || '',
          fora: j.fora || '',
          golosCasa: Number(j.golosCasa ?? 0),
          golosFora: Number(j.golosFora ?? 0),
          isAjavp: cCasa === 'ajavp' || cFora === 'ajavp',
        };
        pavDestino.jogos.push(novoJogo);
        if (!indice.has(k)) indice.set(k, []);
        indice.get(k)!.push({ jornada: jornadaDestino, pav: pavDestino, jogo: novoJogo });
        jornadasTocadas.add(jornadaDestino.numero);
      }
    }

    // Marcar como Concluída as jornadas atualizadas que tenham resultados registados
    for (const num of jornadasTocadas) {
      const jr = base.jornadas.find((item) => item.numero === num);
      if (!jr) continue;
      const temGolos = jr.pavilhoes.some((p) =>
        p.jogos.some((g) => g.golosCasa > 0 || g.golosFora > 0)
      );
      if (temGolos) {
        jr.estado = 'Concluída';
      }
    }

    const concluidas = base.jornadas
      .filter((jr) => jr.estado.toLowerCase().includes('concl'))
      .map((jr) => jr.numero);
    if (concluidas.length > 0) {
      base.jornadaAtiva = Math.max(...concluidas);
    }
  }

  const tabelasRaw = Array.isArray(payload.tabelasClassificacao)
    ? (payload.tabelasClassificacao as ExtractedTabelaRaw[])
    : [];
  for (const t of tabelasRaw) {
    const chave = normalizarChaveEscalao(t.escalao);
    if (!chave || !Array.isArray(t.linhas) || t.linhas.length === 0) continue;
    const escAtual: FutsalClassificacaoEscalao = base.classificacoes[chave];

    // Se todas as linhas tiverem gm=0 e gs=0 (tabela sumária sem golos), calcular/preservar golos
    const semGolosNaTabela = t.linhas.every(
      (l) => Number(l.gm ?? 0) === 0 && Number(l.gs ?? 0) === 0
    );
    const golosCalculados = semGolosNaTabela
      ? calcularGolosPorEquipa(base.jornadas, chave)
      : null;

    base.classificacoes[chave] = {
      titulo: t.escalao || escAtual.titulo,
      totalEquipas: t.linhas.length,
      tabela: t.linhas.map((l, idx) => {
        const pos = Number(l.pos ?? idx + 1);
        const equipaRaw = l.equipa || '';
        const cEquipa = chaveCanonicaEquipa(equipaRaw);

        let gm = Number(l.gm ?? 0);
        let gs = Number(l.gs ?? 0);
        let saldo = Number(l.saldo ?? 0);

        if (semGolosNaTabela && golosCalculados) {
          const calc = golosCalculados.get(cEquipa);
          const ant = escAtual.tabela.find(
            (row) => chaveCanonicaEquipa(row.equipa) === cEquipa
          );
          if (calc && (calc.gm > 0 || calc.gs > 0)) {
            gm = calc.gm;
            gs = calc.gs;
            saldo = gm - gs;
          } else if (ant) {
            gm = ant.gm;
            gs = ant.gs;
            saldo = ant.saldo;
          }
        }

        return {
          pos,
          equipa: formatarNomeEquipa(equipaRaw),
          pontos: Number(l.pontos ?? 0),
          jogos: Number(l.jogos ?? 0),
          v: Number(l.v ?? 0),
          e: Number(l.e ?? 0),
          d: Number(l.d ?? 0),
          gm,
          gs,
          saldo,
          isAjavp: cEquipa === 'ajavp',
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
        equipa: formatarNomeEquipa(a.equipa || ''),
        golos: Number(a.golos ?? 0),
        isAjavp: chaveCanonicaEquipa(a.equipa || '') === 'ajavp',
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
  let resultado: FutsalHubData = FUTSAL_DATA;

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
        resultado = payload as unknown as FutsalHubData;
      } else if (
        Array.isArray(payload.jogos) ||
        Array.isArray(payload.tabelasClassificacao) ||
        Array.isArray(payload.melhoresMarcadores)
      ) {
        // Formato extraído pela IA (ExtractedJifData) já retorna jornadas consolidadas
        return adaptarExtractedParaFutsal(payload);
      }
    }
  } catch (err) {
    console.warn('Aviso: Leitura dinâmica de futsal indisponível, a usar fallback estático.', err);
  }

  return {
    ...resultado,
    jornadas: consolidarTodasJornadas(resultado.jornadas || []),
  };
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
