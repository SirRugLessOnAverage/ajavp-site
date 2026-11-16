"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Trophy,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Shield,
  Activity,
  Layers,
} from "lucide-react";
import {
  obterJogosDaEquipa,
  formatarNomeEquipa,
  ConsolidatedMatch,
  TeamStatsSummary,
} from "@/lib/jif/team-matches";
import type { FutsalJornada as HubJornada } from "@/data/jif/futsal";

interface FutsalTeamMatchesModalProps {
  teamName: string | null;
  initialCategory?: string;
  isOpen: boolean;
  onClose: () => void;
  hubJornadas?: HubJornada[];
  onSelectPavilhao?: (nomePavilhao: string) => void;
  onSelectDate?: (match: ConsolidatedMatch) => void;
}

export function FutsalTeamMatchesModal({
  teamName,
  initialCategory,
  isOpen,
  onClose,
  hubJornadas,
  onSelectPavilhao,
  onSelectDate,
}: FutsalTeamMatchesModalProps) {
  const [tabAtiva, setTabAtiva] = useState<"todos" | "realizados" | "proximos">("todos");
  const [escalaoAtivo, setEscalaoAtivo] = useState<string>("todos");

  // Atualizar escalão ativo sempre que o modal abre ou initialCategory muda
  useEffect(() => {
    if (isOpen) {
      setEscalaoAtivo(initialCategory || "todos");
      setTabAtiva("todos");
    }
  }, [isOpen, initialCategory]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !teamName) return null;

  // Obter dados recalculados dinamicamente com o escalão ativo
  const stats: TeamStatsSummary = obterJogosDaEquipa(teamName, hubJornadas, escalaoAtivo);
  const isAjavp =
    teamName.toLowerCase().includes("vilar") ||
    teamName.toLowerCase().includes("ajavp");

  const listaExibida: ConsolidatedMatch[] =
    tabAtiva === "realizados"
      ? stats.jogosRealizados
      : tabAtiva === "proximos"
      ? stats.proximosJogos
      : [...stats.jogosRealizados, ...stats.proximosJogos];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-2xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden transform transition-all duration-300 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Topo do Modal */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-white/10 bg-slate-50/80 dark:bg-slate-800/40">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${
                  isAjavp
                    ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                }`}
              >
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                    Futsal Concelhio &bull; XL JIF
                  </span>
                  {isAjavp && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full font-black bg-amber-400 text-slate-950">
                      Nossa Freguesia
                    </span>
                  )}
                  {escalaoAtivo !== "todos" && (
                    <span className="text-[9px] px-2 py-0.2 rounded-full font-black bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 uppercase">
                      {escalaoAtivo}
                    </span>
                  )}
                </div>
                <h3
                  id="team-modal-title"
                  className="font-heading font-black text-xl sm:text-2xl text-slate-900 dark:text-white"
                >
                  {stats.equipaFormatada}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Fechar"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Seletor Dinâmico de Escalões (Pills) */}
          <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-brand-green dark:text-emerald-400" />
              <span>Filtrar por Escalão:</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setEscalaoAtivo("todos")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap active:scale-[0.97] ${
                  escalaoAtivo === "todos"
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                Todos os Escalões
              </button>

              {stats.escaloesDisponiveis.map((esc) => (
                <button
                  key={esc}
                  onClick={() => setEscalaoAtivo(esc)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap active:scale-[0.97] ${
                    escalaoAtivo === esc
                      ? "bg-brand-navy dark:bg-amber-400 text-white dark:text-slate-950 shadow-xs"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {esc}
                </button>
              ))}
            </div>
          </div>

          {/* Mini Dashboard de Estatísticas Recalculadas */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-3">
            <div className="p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/5 text-center">
              <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400">
                Jogos
              </span>
              <span className="font-heading font-black text-sm text-slate-900 dark:text-white">
                {stats.jogados}/{stats.totalJogos}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/5 text-center">
              <span className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                Vitórias
              </span>
              <span className="font-heading font-black text-sm text-emerald-600 dark:text-emerald-400">
                {stats.vitorias}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/5 text-center">
              <span className="block text-[10px] font-bold text-amber-500">
                Empates
              </span>
              <span className="font-heading font-black text-sm text-amber-500">
                {stats.empates}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/5 text-center">
              <span className="block text-[10px] font-bold text-rose-500">
                Derrotas
              </span>
              <span className="font-heading font-black text-sm text-rose-500">
                {stats.derrotas}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/5 text-center hidden sm:block">
              <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400">
                Golos (M/S)
              </span>
              <span className="font-heading font-black text-sm text-slate-900 dark:text-white">
                {stats.golosMarcados}/{stats.golosSofridos}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/5 text-center hidden sm:block">
              <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400">
                Saldo
              </span>
              <span
                className={`font-heading font-black text-sm ${
                  stats.saldoGolos > 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : stats.saldoGolos < 0
                    ? "text-rose-500"
                    : "text-slate-600"
                }`}
              >
                {stats.saldoGolos > 0 ? `+${stats.saldoGolos}` : stats.saldoGolos}
              </span>
            </div>
          </div>
        </div>

        {/* Separadores de Filtro: Todos / Realizados / A Disputar */}
        <div className="px-6 pt-3 pb-2 flex items-center gap-2 border-b border-slate-100 dark:border-white/10 bg-white dark:bg-slate-900">
          <button
            onClick={() => setTabAtiva("todos")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tabAtiva === "todos"
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Todos ({stats.totalJogos})
          </button>
          <button
            onClick={() => setTabAtiva("realizados")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tabAtiva === "realizados"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Realizados ({stats.jogados})
          </button>
          <button
            onClick={() => setTabAtiva("proximos")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tabAtiva === "proximos"
                ? "bg-amber-500 text-slate-950 font-black shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            A Disputar ({stats.aJogar})
          </button>
        </div>

        {/* Lista de Jogos com Scroll */}
        <div className="p-6 space-y-3 overflow-y-auto flex-1">
          {listaExibida.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Activity className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">Nenhum jogo encontrado para {escalaoAtivo !== "todos" ? `o escalão ${escalaoAtivo}` : "este filtro"}.</p>
            </div>
          ) : (
            listaExibida.map((jogo) => {
              const badgeResultadoCor =
                jogo.resultado === "V"
                  ? "bg-emerald-500 text-white"
                  : jogo.resultado === "E"
                  ? "bg-amber-400 text-slate-950 font-bold"
                  : jogo.resultado === "D"
                  ? "bg-rose-500 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300";

              return (
                <div
                  key={jogo.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-colors space-y-3"
                >
                  {/* Cabeçalho do Jogo: Jornada / Escalão / Data / Pavilhão */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[10px] uppercase px-2 py-0.5 rounded-md bg-slate-900 dark:bg-slate-700 text-white">
                        {jogo.escalao}
                      </span>
                      <span className="font-semibold text-slate-600 dark:text-slate-300">
                        {jogo.jornadaLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Data clicável */}
                      <button
                        onClick={() => onSelectDate?.(jogo)}
                        title="Adicionar à agenda"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-green dark:hover:text-emerald-400 hover:underline cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{jogo.data}</span>
                      </button>

                      <span className="text-slate-300 dark:text-slate-700">&bull;</span>

                      {/* Pavilhão clicável */}
                      <button
                        onClick={() => onSelectPavilhao?.(jogo.pavilhao)}
                        title="Ver localização GPS do pavilhão"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-green dark:hover:text-emerald-400 hover:underline cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="truncate max-w-[140px] sm:max-w-[180px]">
                          {jogo.pavilhao}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Confronto e Resultado */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    {/* Equipa Casa */}
                    <div className="flex-1 text-right">
                      <span
                        className={`text-xs sm:text-sm ${
                          jogo.isCasa
                            ? "font-black text-slate-900 dark:text-white"
                            : "font-semibold text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {formatarNomeEquipa(jogo.casa)}
                      </span>
                    </div>

                    {/* Placar ou Hora */}
                    <div className="flex items-center gap-2 shrink-0">
                      {jogo.isCompleted && jogo.score ? (
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${badgeResultadoCor}`}
                            title={`Resultado: ${
                              jogo.resultado === "V"
                                ? "Vitória"
                                : jogo.resultado === "E"
                                ? "Empate"
                                : "Derrota"
                            }`}
                          >
                            {jogo.resultado}
                          </span>
                          <span className="px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 font-mono font-black text-sm text-slate-900 dark:text-white tracking-wider shadow-xs">
                            {jogo.score}
                          </span>
                        </div>
                      ) : (
                        <span className="px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 font-mono font-bold text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {jogo.hora}
                        </span>
                      )}
                    </div>

                    {/* Equipa Fora */}
                    <div className="flex-1 text-left">
                      <span
                        className={`text-xs sm:text-sm ${
                          !jogo.isCasa
                            ? "font-black text-slate-900 dark:text-white"
                            : "font-semibold text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {formatarNomeEquipa(jogo.fora)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Rodapé informativo */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>Dados atualizados via Ingestão Oficial JIF</span>
          <span className="font-semibold">{stats.totalJogos} jogos {escalaoAtivo !== "todos" ? `em ${escalaoAtivo}` : "no calendário"}</span>
        </div>
      </div>
    </div>
  );
}
