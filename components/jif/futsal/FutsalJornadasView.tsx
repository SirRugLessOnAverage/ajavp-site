"use client";

import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Trophy,
  CheckCircle2,
  Navigation,
  Info,
  Users,
} from "lucide-react";
import type { FutsalJornada, FutsalJogo, FutsalPavilhao } from "@/data/jif/futsal";
import { FutsalPavilhaoModal } from "@/components/jif/futsal/FutsalPavilhaoModal";
import { FutsalTeamMatchesModal } from "@/components/jif/futsal/FutsalTeamMatchesModal";
import { FutsalDateModal } from "@/components/jif/futsal/FutsalDateModal";
import { identificarPavilhao, PavilhaoInfo } from "@/lib/jif/pavilhoes";
import type { ConsolidatedMatch } from "@/lib/jif/team-matches";

interface FutsalJornadasViewProps {
  jornadas: FutsalJornada[];
  jornadaAtivaNumero: number;
}

export function FutsalJornadasView({
  jornadas,
  jornadaAtivaNumero,
}: FutsalJornadasViewProps) {
  const [jornadaSelecionada, setJornadaSelecionada] = useState<number>(jornadaAtivaNumero);

  // Estados dos Modais Interativos
  const [equipaSelecionada, setEquipaSelecionada] = useState<string | null>(null);
  const [pavilhaoSelecionado, setPavilhaoSelecionado] = useState<PavilhaoInfo | null>(null);
  const [jogoCalendario, setJogoCalendario] = useState<ConsolidatedMatch | null>(null);

  const jornadaAtual =
    jornadas.find((j) => j.numero === jornadaSelecionada) || jornadas[0];

  const pavilhoes = jornadaAtual?.pavilhoes || [];
  const totalJogosJornada = pavilhoes.reduce((acc, p) => acc + p.jogos.length, 0);

  // Converte FutsalJogo em ConsolidatedMatch para o modal de calendário
  const abrirCalendarioJogo = (jogo: FutsalJogo, nomePavilhao: string) => {
    const isCompleted =
      jornadaAtual.estado.toLowerCase().includes("concl") ||
      jogo.golosCasa > 0 ||
      jogo.golosFora > 0;

    setJogoCalendario({
      id: `j${jornadaAtual.numero}-${jogo.escalao || "futsal"}-${jogo.casa}-${jogo.fora}`,
      jornadaNumero: jornadaAtual.numero,
      jornadaLabel: `${jornadaAtual.numero}ª Jornada`,
      data: jornadaAtual.data,
      hora: jogo.hora,
      escalao: jogo.escalao || "Futsal",
      pavilhao: nomePavilhao,
      campo: jogo.campo,
      casa: jogo.casa,
      fora: jogo.fora,
      adversario: jogo.fora,
      isCasa: true,
      golosCasa: jogo.golosCasa,
      golosFora: jogo.golosFora,
      score: `${jogo.golosCasa}-${jogo.golosFora}`,
      isCompleted,
      isAjavp: Boolean(jogo.isAjavp),
    });
  };

  const abrirModalPavilhao = (nome: string) => {
    setPavilhaoSelecionado(identificarPavilhao(nome));
  };

  return (
    <section id="jogos" className="space-y-6 scroll-mt-24">
      {/* Cabeçalho da Secção com Seletor de Jornadas */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-brand-green dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>Calendário Oficial XL JIF</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Resultados e Jogos por Jornada
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Clica nas equipas para ver o seu histórico, nos pavilhões para abrir GPS, ou nas horas para guardar na agenda.
          </p>
        </div>

        {/* Seletor Horizontal de Jornadas */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10">
            {jornadas.map((j) => {
              const isAtiva = j.numero === jornadaSelecionada;
              const isJornadaOficialAtiva = j.numero === jornadaAtivaNumero;

              return (
                <button
                  key={j.numero}
                  onClick={() => setJornadaSelecionada(j.numero)}
                  className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-[0.97] flex items-center gap-1.5 ${
                    isAtiva
                      ? "bg-brand-navy dark:bg-amber-400 text-white dark:text-slate-950 shadow-md"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <span>{j.numero}ª Jornada</span>
                  {isJornadaOficialAtiva && (
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded font-black ${
                        isAtiva
                          ? "bg-amber-400 dark:bg-slate-950 text-slate-950 dark:text-amber-400"
                          : "bg-amber-400 text-slate-950"
                      }`}
                    >
                      Ativa
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Barra de Contexto da Jornada Selecionada */}
      <div className="px-5 py-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-green dark:text-emerald-400 shrink-0" />
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {jornadaAtual?.data}
          </span>
          <span className="text-slate-400">&bull;</span>
          <span className="text-slate-600 dark:text-slate-400 font-medium">
            Estado:{" "}
            <strong className="text-slate-900 dark:text-white">
              {jornadaAtual?.estado}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
          <span>
            <strong className="text-slate-900 dark:text-white">{pavilhoes.length}</strong>{" "}
            pavilhões
          </span>
          <span>&bull;</span>
          <span>
            <strong className="text-slate-900 dark:text-white">{totalJogosJornada}</strong>{" "}
            jogos agendados
          </span>
        </div>
      </div>

      {/* Lista Sequencial de Todos os Pavilhões da Jornada (Sem Tabs!) */}
      <div className="space-y-8">
        {pavilhoes.map((pavilhao) => {
          const temJogoAjavp = pavilhao.jogos.some((j) => j.isAjavp);
          const pavInfo = identificarPavilhao(pavilhao.nome);

          return (
            <div
              key={pavilhao.nome}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs overflow-hidden"
            >
              {/* Topo do Pavilhão com Botão GPS */}
              <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => abrirModalPavilhao(pavilhao.nome)}
                        title="Ver morada e rotas GPS"
                        className="font-heading font-black text-sm sm:text-base text-slate-900 dark:text-white hover:text-brand-green dark:hover:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{pavilhao.nome}</span>
                        <Navigation className="w-3.5 h-3.5 opacity-60 text-emerald-600 dark:text-emerald-400" />
                      </button>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {pavInfo.freguesia} &bull; {pavilhao.jogos.length} jogos
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {temJogoAjavp && (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span>AJAVP em Prova</span>
                    </span>
                  )}

                  <button
                    onClick={() => abrirModalPavilhao(pavilhao.nome)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-all cursor-pointer active:scale-[0.97]"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Como Chegar</span>
                  </button>
                </div>
              </div>

              {/* Tabela de Jogos deste Pavilhão */}
              <div className="divide-y divide-slate-100 dark:divide-white/5">
                {pavilhao.jogos.map((jogo, jIdx) => {
                  const isAjavp = jogo.isAjavp;
                  const isVitoriaAjavp =
                    isAjavp &&
                    ((jogo.casa.includes("AJAVP") && jogo.golosCasa > jogo.golosFora) ||
                      (jogo.fora.includes("AJAVP") && jogo.golosFora > jogo.golosCasa));

                  return (
                    <div
                      key={jIdx}
                      className={`p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 transition-colors ${
                        isAjavp
                          ? "bg-amber-50/40 dark:bg-amber-500/5 hover:bg-amber-50/70 dark:hover:bg-amber-500/10"
                          : "hover:bg-slate-50/80 dark:hover:bg-white/5"
                      }`}
                    >
                      {/* Meta: Escalão / Campo / Hora (Clicável para Calendário) */}
                      <div className="flex items-center gap-2 shrink-0 sm:w-48">
                        {jogo.escalao && (
                          <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-md bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-200">
                            {jogo.escalao}
                          </span>
                        )}
                        {jogo.campo && (
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                            {jogo.campo}
                          </span>
                        )}

                        <button
                          onClick={() => abrirCalendarioJogo(jogo, pavilhao.nome)}
                          title="Adicionar à agenda"
                          className="text-xs text-slate-500 dark:text-slate-400 hover:text-brand-green dark:hover:text-emerald-400 flex items-center gap-1 font-mono hover:underline cursor-pointer"
                        >
                          <Clock className="w-3 h-3" />
                          <span>{jogo.hora}</span>
                        </button>
                      </div>

                      {/* Confronto Central e Marcador (Equipas Clicáveis!) */}
                      <div className="flex-1 flex items-center justify-center gap-2 sm:gap-4 my-1 sm:my-0">
                        {/* Equipa Casa Clicável */}
                        <div className="flex-1 text-right">
                          <button
                            onClick={() => setEquipaSelecionada(jogo.casa)}
                            title={`Ver todos os jogos de ${jogo.casa}`}
                            className={`text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-[0.97] hover:underline ${
                              jogo.casa.includes("AJAVP")
                                ? "text-brand-green dark:text-emerald-400 font-black"
                                : "text-slate-800 dark:text-slate-100 hover:text-brand-navy dark:hover:text-white"
                            }`}
                          >
                            {jogo.casa}
                          </button>
                        </div>

                        {/* Placar */}
                        <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 font-mono font-black text-sm sm:text-base text-slate-900 dark:text-white shrink-0 tracking-wider shadow-xs">
                          {jogo.golosCasa} – {jogo.golosFora}
                        </div>

                        {/* Equipa Fora Clicável */}
                        <div className="flex-1 text-left">
                          <button
                            onClick={() => setEquipaSelecionada(jogo.fora)}
                            title={`Ver todos os jogos de ${jogo.fora}`}
                            className={`text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-[0.97] hover:underline ${
                              jogo.fora.includes("AJAVP")
                                ? "text-brand-green dark:text-emerald-400 font-black"
                                : "text-slate-800 dark:text-slate-100 hover:text-brand-navy dark:hover:text-white"
                            }`}
                          >
                            {jogo.fora}
                          </button>
                        </div>
                      </div>

                      {/* Badge de Destaque AJAVP */}
                      <div className="sm:w-36 flex justify-end shrink-0">
                        {isAjavp ? (
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              isVitoriaAjavp
                                ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30"
                                : "bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30"
                            }`}
                          >
                            {isVitoriaAjavp ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                <span>Vitória AJAVP</span>
                              </>
                            ) : (
                              <span>AJAVP em Prova</span>
                            )}
                          </span>
                        ) : (
                          <button
                            onClick={() => setEquipaSelecionada(jogo.casa)}
                            className="hidden sm:inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                          >
                            <Users className="w-3 h-3" />
                            <span>Ver Ficha</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modais Integrados */}
      <FutsalTeamMatchesModal
        teamName={equipaSelecionada}
        isOpen={Boolean(equipaSelecionada)}
        onClose={() => setEquipaSelecionada(null)}
        hubJornadas={jornadas}
        onSelectPavilhao={(nome) => {
          abrirModalPavilhao(nome);
        }}
        onSelectDate={(match) => {
          setJogoCalendario(match);
        }}
      />

      <FutsalPavilhaoModal
        pavilhao={pavilhaoSelecionado}
        isOpen={Boolean(pavilhaoSelecionado)}
        onClose={() => setPavilhaoSelecionado(null)}
      />

      <FutsalDateModal
        match={jogoCalendario}
        isOpen={Boolean(jogoCalendario)}
        onClose={() => setJogoCalendario(null)}
      />
    </section>
  );
}
