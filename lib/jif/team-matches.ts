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

function normalizarNome(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Padroniza a exibição de equipas:
 * Converte qualquer variante de "Vilar do Pinheiro" ou "AJAVP" para "AJAVP (Vilar do Pinheiro)".
 */
export function formatarNomeEquipa(nome?: string): string {
  if (!nome) return '';
  const n = nome.trim();
  const lower = n.toLowerCase();

  if (
    lower === 'vilar do pinheiro' ||
    lower === 'vilar' ||
    lower === 'ajavp' ||
    lower === 'vilar do pinheiro (ajavp)' ||
    lower === 'ajavp (vilar do pinheiro)' ||
    lower === 'ajavp / vilar do pinheiro'
  ) {
    return 'AJAVP (Vilar do Pinheiro)';
  }

  return n;
}

export function equipaCorresponde(nomeBusca: string, nomeEquipa: string): boolean {
  const b = normalizarNome(nomeBusca);
  const e = normalizarNome(nomeEquipa);

  if (b === e) return true;

  // Equivalência especial para AJAVP / Vilar do Pinheiro
  const isAjavpBusca = b.includes('vilar') || b.includes('ajavp');
  const isAjavpEquipa = e.includes('vilar') || e.includes('ajavp');
  if (isAjavpBusca && isAjavpEquipa) return true;

  return e.includes(b) || b.includes(e);
}

const ORDEM_ESCALOES = ['Sub-7', 'Sub-9', 'Sub-11', 'Sub-13', 'Sub-16'];

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

        const matchId = `j${j.number}-${m.category}-${m.homeTeam}-${m.awayTeam}`;
        matchesMap.set(matchId, {
          id: matchId,
          jornadaNumero: j.number,
          jornadaLabel: j.label,
          data: j.formattedDate || j.date,
          hora: m.time,
          escalao: m.category,
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
      for (const p of j.pavilhoes) {
        for (const jogo of p.jogos) {
          const correspondeCasa = equipaCorresponde(nomeEquipa, jogo.casa);
          const correspondeFora = equipaCorresponde(nomeEquipa, jogo.fora);

          if (!correspondeCasa && !correspondeFora) continue;

          const isCasa = correspondeCasa;
          const adversarioRaw = isCasa ? jogo.fora : jogo.casa;
          const adversario = formatarNomeEquipa(adversarioRaw);
          const casaFormatada = formatarNomeEquipa(jogo.casa);
          const foraFormatada = formatarNomeEquipa(jogo.fora);

          const golosCasa = Number(jogo.golosCasa ?? 0);
          const golosFora = Number(jogo.golosFora ?? 0);
          const isCompleted = j.estado.toLowerCase().includes('concl') || (golosCasa > 0 || golosFora > 0);

          let resultado: 'V' | 'E' | 'D' | 'Agendado' = 'Agendado';
          if (isCompleted) {
            const meusGolos = isCasa ? golosCasa : golosFora;
            const golosAdv = isCasa ? golosFora : golosCasa;
            if (meusGolos > golosAdv) resultado = 'V';
            else if (meusGolos === golosAdv) resultado = 'E';
            else resultado = 'D';
          }

          const matchId = `j${j.numero}-${jogo.escalao || 'Geral'}-${jogo.casa}-${jogo.fora}`;
          matchesMap.set(matchId, {
            id: matchId,
            jornadaNumero: j.numero,
            jornadaLabel: `${j.numero}ª Jornada`,
            data: j.data,
            hora: jogo.hora,
            escalao: jogo.escalao || 'Futsal',
            pavilhao: p.nome,
            campo: jogo.campo,
            casa: casaFormatada,
            fora: foraFormatada,
            adversario,
            isCasa,
            golosCasa,
            golosFora,
            score: `${golosCasa}-${golosFora}`,
            isCompleted,
            resultado,
            isAjavp: Boolean(jogo.isAjavp),
          });
        }
      }
    }
  }

  const allMatches = Array.from(matchesMap.values()).sort((a, b) => {
    if (a.jornadaNumero !== b.jornadaNumero) return a.jornadaNumero - b.jornadaNumero;
    return a.hora.localeCompare(b.hora);
  });

  // Obter lista única de escalões em que esta equipa joga
  const escaloesSet = new Set<string>();
  for (const m of allMatches) {
    if (m.escalao) escaloesSet.add(m.escalao);
  }
  const escaloesDisponiveis = ORDEM_ESCALOES.filter((esc) => escaloesSet.has(esc));
  // Adicionar outros que não estejam na ordem padrão se houver
  for (const esc of escaloesSet) {
    if (!escaloesDisponiveis.includes(esc)) escaloesDisponiveis.push(esc);
  }

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
