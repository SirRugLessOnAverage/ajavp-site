"use client";

import React, { useState } from "react";
import { MapPin, Calendar, Clock, Trophy, CheckCircle2 } from "lucide-react";
import type { FutsalJornada, FutsalJogo, FutsalPavilhao } from "@/data/jif/futsal";

interface FutsalPavilhoesTabsProps {
  jornadas: FutsalJornada[];
  jornadaAtivaNumero: number;
}

export function FutsalPavilhoesTabs({
  jornadas,
  jornadaAtivaNumero,
}: FutsalPavilhoesTabsProps) {
  const [jornadaSelecionada, setJornadaSelecionada] = useState<number>(jornadaAtivaNumero);
  const [pavilhaoAtivo, setPavilhaoAtivo] = useState<string>("todos");

  const jornadaAtual =
    jornadas.find((j) => j.numero === jornadaSelecionada) || jornadas[0];

  const pavilhoes = jornadaAtual?.pavilhoes || [];

  const pavilhoesFiltrados =
    pavilhaoAtivo === "todos"
      ? pavilhoes
      : pavilhoes.filter((p) => p.nome === pavilhaoAtivo);

  return (
    <section id="jogos" className="space-y-6 scroll-mt-24">
      {/* Cabeçalho da Secção com Seletor de Jornada */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-brand-green dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>Resultados Homologados</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Resultados Oficiais por Pavilhão
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {jornadaAtual?.data} &bull; Jornada {jornadaAtual?.numero} ({jornadaAtual?.estado})
          </p>
        </div>

        {/* Seletor de Jornada */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 hidden sm:inline">
            Jornada:
          </span>
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10">
            {jornadas.map((j) => (
              <button
                key={j.numero}
                onClick={() => {
                  setJornadaSelecionada(j.numero);
                  setPavilhaoAtivo("todos");
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  jornadaSelecionada === j.numero
                    ? "bg-brand-green text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Jornada {j.numero}
                {j.numero === jornadaAtivaNumero && (
                  <span className="ml-1 text-[9px] px-1 py-0.2 rounded bg-amber-400 text-slate-950 font-black">
                    Ativa
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Abas de Pavilhões (Tabs) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setPavilhaoAtivo("todos")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            pavilhaoAtivo === "todos"
              ? "bg-brand-navy dark:bg-amber-400 text-white dark:text-slate-950 shadow-md"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
          }`}
        >
          Todos os Pavilhões ({pavilhoes.reduce((acc, p) => acc + p.jogos.length, 0)} Jogos)
        </button>

        {pavilhoes.map((p) => {
          const temJogoAjavp = p.jogos.some((j) => j.isAjavp);
          return (
            <button
              key={p.nome}
              onClick={() => setPavilhaoAtivo(p.nome)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                pavilhaoAtivo === p.nome
                  ? "bg-brand-navy dark:bg-amber-400 text-white dark:text-slate-950 shadow-md"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 opacity-70" />
              <span>{p.nome}</span>
              {temJogoAjavp && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Jogo da AJAVP" />
              )}
            </button>
          );
        })}
      </div>

      {/* Lista de Pavilhões e Jogos */}
      <div className="space-y-8">
        {pavilhoesFiltrados.map((pavilhao) => (
          <div
            key={pavilhao.nome}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs overflow-hidden"
          >
            {/* Topo do Pavilhão */}
            <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-black text-sm text-slate-900 dark:text-white">
                  {pavilhao.nome}
                </h3>
              </div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {pavilhao.jogos.length} jogos realizados
              </span>
            </div>

            {/* Grelha de Jogos deste Pavilhão */}
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
                    {/* Meta: Escalão / Campo / Hora */}
                    <div className="flex items-center gap-2 shrink-0 sm:w-44">
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
                      <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {jogo.hora}
                      </span>
                    </div>

                    {/* Confronto Central e Marcador */}
                    <div className="flex-1 flex items-center justify-center gap-2 sm:gap-4 my-1 sm:my-0">
                      {/* Equipa Casa */}
                      <div className="flex-1 text-right">
                        <span
                          className={`text-xs sm:text-sm font-bold ${
                            jogo.casa.includes("AJAVP")
                              ? "text-brand-green dark:text-emerald-400 font-black"
                              : "text-slate-800 dark:text-slate-100"
                          }`}
                        >
                          {jogo.casa}
                        </span>
                      </div>

                      {/* Placar */}
                      <div className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 font-mono font-black text-sm sm:text-base text-slate-900 dark:text-white shrink-0 tracking-wider">
                        {jogo.golosCasa} – {jogo.golosFora}
                      </div>

                      {/* Equipa Fora */}
                      <div className="flex-1 text-left">
                        <span
                          className={`text-xs sm:text-sm font-bold ${
                            jogo.fora.includes("AJAVP")
                              ? "text-brand-green dark:text-emerald-400 font-black"
                              : "text-slate-800 dark:text-slate-100"
                          }`}
                        >
                          {jogo.fora}
                        </span>
                      </div>
                    </div>

                    {/* Badge de Destaque AJAVP */}
                    <div className="sm:w-32 flex justify-end shrink-0">
                      {isAjavp && (
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
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

