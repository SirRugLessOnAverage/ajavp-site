import { FUTSAL_JORNADAS } from '@/data/jif/futsal-jogos';
import type { FutsalJornada as HubJornada } from '@/data/jif/futsal';

export interface ConsolidatedMatch {
  id: string;
  jornadaNumero: number;
  jornadaLabel: string;
  data: string;
  hora: string;
  escalao: string;
  pavilhao: string;
  campo?: string;
  casa: string;
  fora: string;
  adversario: string;
  isCasa: boolean;
  golosCasa?: number | null;
  golosFora?: number | null;
  score?: string;
  isCompleted: boolean;
  resultado?: 'V' | 'E' | 'D' | 'Agendado';
  isAjavp: boolean;
}

export interface TeamStatsSummary {
  equipa: string;
  equipaFormatada: string;
  escalaoAtivo: string;
  escaloesDisponiveis: string[];
  totalJogos: number;
  jogados: number;
  aJogar: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golosMarcados: number;
  golosSofridos: number;
  saldoGolos: number;
  pontosEstimados: number;
  jogosRealizados: ConsolidatedMatch[];
  proximosJogos: ConsolidatedMatch[];
}

export const ORDEM_ESCALOES = ['Sub-7', 'Sub-9', 'Sub-11', 'Sub-13', 'Sub-16'] as const;

function normalizarTextoBase(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Gera uma chave canónica determinística por freguesia/clube para deduplicação
 * entre diferentes fontes (calendário estático, JSON de fallback e extração IA).
 */
export function chaveCanonicaEquipa(nome?: string): string {
  if (!nome) return '';
  const n = normalizarTextoBase(nome);

  if (n.includes('vilar') || n.includes('ajavp')) return 'ajavp';
  if (n.includes('touguinha')) return 'touguinha';
  if (n.includes('outeiro')) return 'outeiro';

  return n.replace(/[^a-z0-9]+/g, ' ').trim();
}

/**
 * Normaliza o escalão de um jogo, inferindo-o pelo nome do pavilhão quando omitido
 * (ex: "Pavilhão de Caxinas (Sub-7)" -> "Sub-7").
 */
export function normalizarEscalaoJogo(escalao?: string, nomePavilhao?: string): string {
  const fontes = [escalao, nomePavilhao];
  for (const raw of fontes) {
    if (!raw) continue;
    const s = raw.toLowerCase().replace(/\s+/g, '');
    if (s.includes('sub-7') || s.includes('sub7')) return 'Sub-7';
    if (s.includes('sub-9') || s.includes('sub9')) return 'Sub-9';
    if (s.includes('sub-11') || s.includes('sub11')) return 'Sub-11';
    if (s.includes('sub-13') || s.includes('sub13')) return 'Sub-13';
    if (s.includes('sub-16') || s.includes('sub16')) return 'Sub-16';
  }
  return (escalao || '').trim();
}

/**
 * Padroniza a exibição de equipas:
 * Converte variantes de Vilar do Pinheiro, Touguinha/Touguinhó e Outeiro Maior para os seus nomes oficiais.
 */
export function formatarNomeEquipa(nome?: string): string {
  if (!nome) return '';
  const n = nome.trim();
  const chave = chaveCanonicaEquipa(n);

  if (chave === 'ajavp') return 'AJAVP (Vilar do Pinheiro)';
  if (chave === 'touguinha') return 'Touguinha Touguinhó';
  if (chave === 'outeiro') return 'Outeiro Maior';

  return n;
}

export function equipaCorresponde(nomeBusca: string, nomeEquipa: string): boolean {
  const cBusca = chaveCanonicaEquipa(nomeBusca);
  const cEquipa = chaveCanonicaEquipa(nomeEquipa);

  if (!cBusca || !cEquipa) return false;
  if (cBusca === cEquipa) return true;

  return false;
}

/**
 * Extrai todos os jogos de uma equipa cruzando os dados das jornadas (do Hub/Supabase e do Calendário Oficial).
 * Suporta filtro opcional por escalão ('todos' ou escalão específico).
 */
export function obterJogosDaEquipa(
  nomeEquipa: string,
  hubJornadas?: HubJornada[],
  escalaoFiltro?: string
): TeamStatsSummary {
  const matchesMap = new Map<string, ConsolidatedMatch>();

  // 1. Carregar do Calendário Completo FUTSAL_JORNADAS (6 Jornadas oficiais)
  for (const j of FUTSAL_JORNADAS) {
    for (const v of j.venueSessions) {
      for (const m of v.matches) {
        const correspondeCasa = equipaCorresponde(nomeEquipa, m.homeTeam);
        const correspondeFora = equipaCorresponde(nomeEquipa, m.awayTeam);

        if (!correspondeCasa && !correspondeFora) continue;

        const escalaoNorm = normalizarEscalaoJogo(m.category, v.venueName);
        let golosCasa: number | null = null;
        let golosFora: number | null = null;
        let isCompleted = Boolean(m.isCompleted);

        if (m.score && m.score.includes('-')) {
          const parts = m.score.split('-').map((s) => s.trim());
          if (parts.length === 2 && !isNaN(Number(parts[0])) && !isNaN(Number(parts[1]))) {
            golosCasa = Number(parts[0]);
            golosFora = Number(parts[1]);
            isCompleted = true;
          }
        }

        const isCasa = correspondeCasa;
        const adversarioRaw = isCasa ? m.awayTeam : m.homeTeam;
        const adversario = formatarNomeEquipa(adversarioRaw);
        const casaFormatada = formatarNomeEquipa(m.homeTeam);
        const foraFormatada = formatarNomeEquipa(m.awayTeam);

        let resultado: 'V' | 'E' | 'D' | 'Agendado' = 'Agendado';
        if (isCompleted && golosCasa !== null && golosFora !== null) {
          const meusGolos = isCasa ? golosCasa : golosFora;
          const golosAdv = isCasa ? golosFora : golosCasa;
          if (meusGolos > golosAdv) resultado = 'V';
          else if (meusGolos === golosAdv) resultado = 'E';
          else resultado = 'D';
        }

        const matchId = `j${j.number}-${escalaoNorm}-${chaveCanonicaEquipa(m.homeTeam)}-${chaveCanonicaEquipa(m.awayTeam)}`;
        matchesMap.set(matchId, {
          id: matchId,
          jornadaNumero: j.number,
          jornadaLabel: j.label,
          data: j.formattedDate || j.date,
          hora: m.time,
          escalao: escalaoNorm,
          pavilhao: v.venueName,
          campo: v.subLocation,
          casa: casaFormatada,
          fora: foraFormatada,
          adversario,
          isCasa,
          golosCasa,
          golosFora,
          score: m.score,
          isCompleted,
          resultado,
          isAjavp: m.isAjavp,
        });
      }
    }
  }

  // 2. Sobrepor / Fundir com dados reais do Hub (site_jif_dados do Supabase / jif-futsal.json)
  if (hubJornadas && hubJornadas.length > 0) {
    for (const j of hubJornadas) {
      const jornadaConcluida = j.estado.toLowerCase().includes('concl');

      for (const p of j.pavilhoes) {
        for (const jogo of p.jogos) {
          const correspondeCasa = equipaCorresponde(nomeEquipa, jogo.casa);
          const correspondeFora = equipaCorresponde(nomeEquipa, jogo.fora);

          if (!correspondeCasa && !correspondeFora) continue;

          const escalaoNorm = normalizarEscalaoJogo(jogo.escalao, p.nome);
          const isCasa = correspondeCasa;
          const adversarioRaw = isCasa ? jogo.fora : jogo.casa;
          const adversario = formatarNomeEquipa(adversarioRaw);
          const casaFormatada = formatarNomeEquipa(jogo.casa);
          const foraFormatada = formatarNomeEquipa(jogo.fora);

          const rawGolosCasa = Number(jogo.golosCasa ?? 0);
          const rawGolosFora = Number(jogo.golosFora ?? 0);
          const temGolos = rawGolosCasa > 0 || rawGolosFora > 0;
          const isCompleted = jornadaConcluida || temGolos;

          const golosCasa = isCompleted ? rawGolosCasa : null;
          const golosFora = isCompleted ? rawGolosFora : null;
          const score = isCompleted ? `${rawGolosCasa}-${rawGolosFora}` : undefined;

          let resultado: 'V' | 'E' | 'D' | 'Agendado' = 'Agendado';
          if (isCompleted && golosCasa !== null && golosFora !== null) {
            const meusGolos = isCasa ? golosCasa : golosFora;
            const golosAdv = isCasa ? golosFora : golosCasa;
            if (meusGolos > golosAdv) resultado = 'V';
            else if (meusGolos === golosAdv) resultado = 'E';
            else resultado = 'D';
          }

          const matchId = `j${j.numero}-${escalaoNorm}-${chaveCanonicaEquipa(jogo.casa)}-${chaveCanonicaEquipa(jogo.fora)}`;
          const existente = matchesMap.get(matchId);

          matchesMap.set(matchId, {
            id: matchId,
            jornadaNumero: j.numero,
            jornadaLabel: existente?.jornadaLabel || `${j.numero}ª Jornada`,
            data: j.data,
            hora: jogo.hora || existente?.hora || '--:--',
            escalao: escalaoNorm,
            pavilhao: p.nome,
            campo: jogo.campo || existente?.campo,
            casa: casaFormatada,
            fora: foraFormatada,
            adversario,
            isCasa,
            golosCasa,
            golosFora,
            score,
            isCompleted,
            resultado,
            isAjavp:
              Boolean(jogo.isAjavp) ||
              chaveCanonicaEquipa(jogo.casa) === 'ajavp' ||
              chaveCanonicaEquipa(jogo.fora) === 'ajavp',
          });
        }
      }
    }
  }

  const allMatches = Array.from(matchesMap.values()).sort((a, b) => {
    if (a.jornadaNumero !== b.jornadaNumero) return a.jornadaNumero - b.jornadaNumero;
    return a.hora.localeCompare(b.hora);
  });

  // Filtrar escalões apenas para os escalões oficiais válidos (nunca incluir 'Futsal' ou 'Geral')
  const escaloesSet = new Set<string>();
  for (const m of allMatches) {
    if (m.escalao && (ORDEM_ESCALOES as readonly string[]).includes(m.escalao)) {
      escaloesSet.add(m.escalao);
    }
  }
  const escaloesDisponiveis = ORDEM_ESCALOES.filter((esc) => escaloesSet.has(esc));

  // Filtragem se escalaoFiltro estiver ativo
  const escalaoNormalizado = escalaoFiltro?.trim();
  const filtrarPorEscalao =
    Boolean(escalaoNormalizado) &&
    escalaoNormalizado?.toLowerCase() !== 'todos' &&
    escalaoNormalizado !== '';

  const matchesFiltrados = filtrarPorEscalao
    ? allMatches.filter(
        (m) => m.escalao.toLowerCase() === escalaoNormalizado!.toLowerCase()
      )
    : allMatches;

  const jogosRealizados = matchesFiltrados.filter((m) => m.isCompleted);
  const proximosJogos = matchesFiltrados.filter((m) => !m.isCompleted);

  let vitorias = 0;
  let empates = 0;
  let derrotas = 0;
  let golosMarcados = 0;
  let golosSofridos = 0;

  for (const m of jogosRealizados) {
    if (m.resultado === 'V') vitorias++;
    else if (m.resultado === 'E') empates++;
    else if (m.resultado === 'D') derrotas++;

    if (m.golosCasa !== null && m.golosCasa !== undefined && m.golosFora !== null && m.golosFora !== undefined) {
      golosMarcados += m.isCasa ? m.golosCasa : m.golosFora;
      golosSofridos += m.isCasa ? m.golosFora : m.golosCasa;
    }
  }

  return {
    equipa: nomeEquipa,
    equipaFormatada: formatarNomeEquipa(nomeEquipa),
    escalaoAtivo: filtrarPorEscalao ? escalaoNormalizado! : 'todos',
    escaloesDisponiveis,
    totalJogos: matchesFiltrados.length,
    jogados: jogosRealizados.length,
    aJogar: proximosJogos.length,
    vitorias,
    empates,
    derrotas,
    golosMarcados,
    golosSofridos,
    saldoGolos: golosMarcados - golosSofridos,
    pontosEstimados: vitorias * 3 + empates,
    jogosRealizados,
    proximosJogos,
  };
}
