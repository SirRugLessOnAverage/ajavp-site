import { supabasePublic } from '@/lib/supabase/public';
import {
  FUTSAL_DATA,
  type FutsalClassificacaoEscalao,
  type FutsalClassificacaoLinha,
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

export function obterDataHojePortugal(referenceDate: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Lisbon',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(referenceDate);
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

function construirJornadasBase(todayStr: string = obterDataHojePortugal()): FutsalJornada[] {
  return FUTSAL_JORNADAS.map((fj) => ({
    numero: fj.number,
    data: fj.formattedDate || fj.date,
    estado: fj.date < todayStr ? 'Concluída' : 'Agendada',
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
          adiado: Boolean(m.notes && m.notes.toLowerCase().includes('adiado')),
          nota: m.notes,
        };
      }),
    })),
  }));
}

/**
 * Funde as jornadas dinâmicas/JSON sobre o calendário oficial (1ª a 6ª Jornada)
 * utilizando chaves canónicas por confronto para nunca duplicar jogos nem descartar jornadas futuras.
 */
export function consolidarTodasJornadas(
  jornadasExistentes: FutsalJornada[],
  todayStr: string = obterDataHojePortugal()
): FutsalJornada[] {
  const mapa = new Map<number, FutsalJornada>();

  for (const baseJ of construirJornadasBase(todayStr)) {
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
          if (jogo.hora && !alvo.hora) alvo.hora = jogo.hora;
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

const ESCALOES_CLASSIFICACAO: Array<{
  chave: keyof FutsalHubData['classificacoes'];
  nome: string;
}> = [
  { chave: 'sub7', nome: 'Sub-7' },
  { chave: 'sub9', nome: 'Sub-9' },
  { chave: 'sub11', nome: 'Sub-11' },
  { chave: 'sub13', nome: 'Sub-13' },
  { chave: 'sub16', nome: 'Sub-16' },
];

/**
 * Calcula dinamicamente as tabelas classificativas dos 5 escalões (PTS, J, V, E, D, GM, GS, SG)
 * diretamente a partir dos resultados dos jogos realizados nas jornadas de campeonato (excluindo Taça).
 * Critérios oficiais de ordenação: PTS > SG > GM > Confronto Direto > Menor Nº Jogos.
 */
export function calcularClassificacoesDinamicas(
  jornadas: FutsalJornada[],
  baseClassificacoes: FutsalHubData['classificacoes'] = FUTSAL_DATA.classificacoes
): FutsalHubData['classificacoes'] {
  const tacaNumeros = new Set(
    FUTSAL_JORNADAS.filter((fj) => fj.isTaça).map((fj) => fj.number)
  );

  const resultado = {} as FutsalHubData['classificacoes'];

  for (const { chave, nome: escNome } of ESCALOES_CLASSIFICACAO) {
    const baseEscalao: FutsalClassificacaoEscalao = baseClassificacoes[chave];

    interface AcumuladoEquipa {
      chave: string;
      equipa: string;
      pontos: number;
      jogos: number;
      v: number;
      e: number;
      d: number;
      gm: number;
      gs: number;
    }

    const equipasMap = new Map<string, AcumuladoEquipa>();
    const h2h = new Map<string, { ptsDiff: number; gdDiff: number }>();

    const registarEquipa = (nomeBruto?: string): AcumuladoEquipa | null => {
      if (!nomeBruto) return null;
      const c = chaveCanonicaEquipa(nomeBruto);
      if (!c || c === 'folga') return null;
      const existente = equipasMap.get(c);
      if (existente) return existente;
      const novo: AcumuladoEquipa = {
        chave: c,
        equipa: formatarNomeEquipa(nomeBruto),
        pontos: 0,
        jogos: 0,
        v: 0,
        e: 0,
        d: 0,
        gm: 0,
        gs: 0,
      };
      equipasMap.set(c, novo);
      return novo;
    };

    // 1. Inicializar com todas as equipas conhecidas da tabela base do escalão
    for (const row of baseEscalao?.tabela || []) {
      registarEquipa(row.equipa);
    }

    // 2. Percorrer jornadas de campeonato e agregar resultados realizados
    for (const j of jornadas) {
      if (tacaNumeros.has(j.numero)) continue;
      const jornadaConcluida = j.estado.toLowerCase().includes('concl');

      for (const p of j.pavilhoes || []) {
        for (const jogo of p.jogos || []) {
          if (jogo.adiado) continue;
          if (normalizarEscalaoJogo(jogo.escalao, p.nome) !== escNome) continue;

          const sCasa = registarEquipa(jogo.casa);
          const sFora = registarEquipa(jogo.fora);
          if (!sCasa || !sFora) continue;

          const gc = Number(jogo.golosCasa ?? 0);
          const gf = Number(jogo.golosFora ?? 0);
          const foiRealizado = jornadaConcluida || gc > 0 || gf > 0;
          if (!foiRealizado) continue;

          sCasa.jogos += 1;
          sFora.jogos += 1;
          sCasa.gm += gc;
          sCasa.gs += gf;
          sFora.gm += gf;
          sFora.gs += gc;

          const kAB = `${sCasa.chave}|${sFora.chave}`;
          const kBA = `${sFora.chave}|${sCasa.chave}`;
          const hAB = h2h.get(kAB) || { ptsDiff: 0, gdDiff: 0 };
          const hBA = h2h.get(kBA) || { ptsDiff: 0, gdDiff: 0 };

          if (gc > gf) {
            sCasa.v += 1;
            sCasa.pontos += 3;
            sFora.d += 1;
            hAB.ptsDiff += 3;
            hBA.ptsDiff -= 3;
          } else if (gc < gf) {
            sFora.v += 1;
            sFora.pontos += 3;
            sCasa.d += 1;
            hAB.ptsDiff -= 3;
            hBA.ptsDiff += 3;
          } else {
            sCasa.e += 1;
            sFora.e += 1;
            sCasa.pontos += 1;
            sFora.pontos += 1;
          }

          hAB.gdDiff += gc - gf;
          hBA.gdDiff += gf - gc;
          h2h.set(kAB, hAB);
          h2h.set(kBA, hBA);
        }
      }
    }

    const ordenado = Array.from(equipasMap.values())
      .map((item) => ({
        ...item,
        saldo: item.gm - item.gs,
      }))
      .sort((a, b) => {
        if (b.pontos !== a.pontos) return b.pontos - a.pontos;
        if (b.saldo !== a.saldo) return b.saldo - a.saldo;
        if (b.gm !== a.gm) return b.gm - a.gm;
        const direto = h2h.get(`${a.chave}|${b.chave}`);
        if (direto) {
          if (direto.ptsDiff !== 0) return -direto.ptsDiff;
          if (direto.gdDiff !== 0) return -direto.gdDiff;
        }
        if (a.jogos !== b.jogos) return a.jogos - b.jogos;
        return a.equipa.localeCompare(b.equipa, 'pt');
      });

    const tabela: FutsalClassificacaoLinha[] = ordenado.map((item, idx) => ({
      pos: idx + 1,
      equipa: item.equipa,
      pontos: item.pontos,
      jogos: item.jogos,
      v: item.v,
      e: item.e,
      d: item.d,
      gm: item.gm,
      gs: item.gs,
      saldo: item.saldo,
      isAjavp: item.chave === 'ajavp',
      lider: idx === 0,
      podio: idx < 3,
    }));

    resultado[chave] = {
      titulo: baseEscalao?.titulo || `${escNome} Masculinos`,
      totalEquipas: tabela.length,
      tabela,
    };
  }

  return resultado;
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
  }

  // Motor 100% dinâmico: recalcula classificações diretamente a partir dos resultados das jornadas
  base.classificacoes = calcularClassificacoesDinamicas(base.jornadas, FUTSAL_DATA.classificacoes);

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

  return resolverEstadoDinamicoFutsal(base);
}

/**
 * Resolve dinamicamente o estado de cada jornada, a `jornadaAtiva`, o `destaqueSemana`
 * e `proximaJornada` com base na data civil em Portugal (`Europe/Lisbon`).
 * Transita automaticamente à meia-noite após a data oficial da jornada (`today > data`).
 */
export function resolverEstadoDinamicoFutsal(
  hubData: FutsalHubData,
  todayStr: string = obterDataHojePortugal()
): FutsalHubData {
  const metaPorNumero = new Map(FUTSAL_JORNADAS.map((fj) => [fj.number, fj]));

  const jornadasAtualizadas = (hubData.jornadas || []).map((jr) => {
    const meta = metaPorNumero.get(jr.numero);
    if (!meta) return jr;

    // A jornada mantém-se 'Agendada' durante todo o dia de jogo e passa a 'Concluída' no dia seguinte
    const estado = meta.date < todayStr ? 'Concluída' : 'Agendada';
    return {
      ...jr,
      data: meta.formattedDate || jr.data,
      estado,
    };
  });

  const proximaObj =
    jornadasAtualizadas.find((jr) => {
      const meta = metaPorNumero.get(jr.numero);
      if (meta) return meta.date >= todayStr;
      return !jr.estado.toLowerCase().includes('concl');
    }) || jornadasAtualizadas[jornadasAtualizadas.length - 1];

  if (!proximaObj) {
    return { ...hubData, jornadas: jornadasAtualizadas };
  }

  const metaAtiva = metaPorNumero.get(proximaObj.numero);
  const jogosAjavpDaAtiva: Array<{
    escalao: string;
    adversario: string;
    pavilhao: string;
    hora: string;
    horaSort: string;
  }> = [];

  for (const pav of proximaObj.pavilhoes || []) {
    for (const jogo of pav.jogos || []) {
      const ehAjavp =
        Boolean(jogo.isAjavp) ||
        chaveCanonicaEquipa(jogo.casa) === 'ajavp' ||
        chaveCanonicaEquipa(jogo.fora) === 'ajavp';

      if (!ehAjavp) continue;

      const casaEhAjavp = chaveCanonicaEquipa(jogo.casa) === 'ajavp';
      const adversario = formatarNomeEquipa(casaEhAjavp ? jogo.fora : jogo.casa);
      const escalao = normalizarEscalaoJogo(jogo.escalao, pav.nome) || 'Futsal';
      const horaNorm = normalizarHora(jogo.hora);

      jogosAjavpDaAtiva.push({
        escalao,
        adversario,
        pavilhao: pav.nome,
        hora: jogo.hora || horaNorm || '—',
        horaSort: horaNorm || '99:99',
      });
    }
  }

  jogosAjavpDaAtiva.sort((a, b) => a.horaSort.localeCompare(b.horaSort));

  const proximaJornada = {
    numero: proximaObj.numero,
    dataPrevisao: metaAtiva?.formattedDate || proximaObj.data,
    estado: metaAtiva?.isTaça ? 'Taça Concelhia' : proximaObj.estado,
    jogosAjavp: jogosAjavpDaAtiva.map((j) => ({
      escalao: j.escalao,
      adversario: j.adversario,
      pavilhao: j.pavilhao,
      hora: j.hora.replace(':', 'h'),
    })),
  };

  let destaqueSemana = hubData.destaqueSemana;
  if (jogosAjavpDaAtiva.length > 0) {
    const escaloesLista = Array.from(new Set(jogosAjavpDaAtiva.map((j) => j.escalao)));
    const pavilhoesCurtos = Array.from(
      new Set(
        jogosAjavpDaAtiva.map((j) =>
          j.pavilhao
            .replace(/^Pavilh[ãa]o\s*(Desportivo\s*de|Municipal\s*de|de)?\s*/i, '')
            .replace(/\s*\(Campo.*\)/i, '')
            .trim()
        )
      )
    );

    const titulo = metaAtiva?.isTaça
      ? `Taça Concelhia & ${proximaObj.numero}ª Jornada: ${escaloesLista.join(', ')}!`
      : `${proximaObj.numero}ª Jornada XL JIF: ${escaloesLista.join(', ')} em Campo!`;

    const subtitulo = `A AJAVP entra em ação em ${metaAtiva?.formattedDate || proximaObj.data} nos pavilhões de ${pavilhoesCurtos.join(', ')}. Vem apoiar a formação de Vilar do Pinheiro!`;
    const badge =
      metaAtiva?.date === todayStr ? 'Hoje é Dia de Jogo! 🔥' : 'Próxima Jornada 🚀';

    const kpis = jogosAjavpDaAtiva.slice(0, 4).map((j) => ({
      label: `${j.escalao} (${j.hora.replace(':', 'h')})`,
      valor: `vs ${j.adversario}`,
      sub: j.pavilhao.replace(/^Pavilh[ãa]o\s*(Desportivo\s*de|Municipal\s*de|de)?\s*/i, 'Pav. '),
    }));

    if (kpis.length < 4) {
      kpis.push({
        label: 'Apoio AJAVP',
        valor: 'Entrada Livre',
        sub: 'Vem apoiar Vilar do Pinheiro!',
      });
    }

    destaqueSemana = { titulo, subtitulo, badge, kpis };
  }

  return {
    ...hubData,
    jornadaAtiva: proximaObj.numero,
    jornadas: jornadasAtualizadas,
    destaqueSemana,
    proximaJornada,
  };
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
        // Formato extraído pela IA (ExtractedJifData) já retorna jornadas e classificações dinâmicas
        return adaptarExtractedParaFutsal(payload);
      }
    }
  } catch (err) {
    console.warn('Aviso: Leitura dinâmica de futsal indisponível, a usar fallback estático.', err);
  }

  const jornadasFinais = consolidarTodasJornadas(resultado.jornadas || []);
  const hubCalculado: FutsalHubData = {
    ...resultado,
    jornadas: jornadasFinais,
    classificacoes: calcularClassificacoesDinamicas(
      jornadasFinais,
      resultado.classificacoes || FUTSAL_DATA.classificacoes
    ),
  };

  return resolverEstadoDinamicoFutsal(hubCalculado);
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
