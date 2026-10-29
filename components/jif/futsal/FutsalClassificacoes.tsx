"use client";

import React, { useState } from "react";
import { Table, Award, Shield, ChevronRight } from "lucide-react";
import type { FutsalClassificacaoEscalao } from "@/data/jif/futsal";

interface FutsalClassificacoesProps {
  classificacoes: {
    sub7: FutsalClassificacaoEscalao;
    sub9: FutsalClassificacaoEscalao;
    sub11: FutsalClassificacaoEscalao;
    sub13: FutsalClassificacaoEscalao;
    sub16: FutsalClassificacaoEscalao;
  };
}

type EscalaoKey = "sub7" | "sub9" | "sub11" | "sub13" | "sub16";

const ESCALOES: { key: EscalaoKey; nome: string; badge?: string; badgeColor?: string }[] = [
  { key: "sub9", nome: "Sub-9 (Benjamins)", badge: "Líder Concelhio 🥇", badgeColor: "bg-amber-400 text-slate-950 font-black" },
  { key: "sub11", nome: "Sub-11 (Traquinas)", badge: "3.º Pódio 🥉", badgeColor: "bg-emerald-500 text-slate-950 font-black" },
  { key: "sub7", nome: "Sub-7 (Petizes)" },
  { key: "sub13", nome: "Sub-13 (Infantis)" },
  { key: "sub16", nome: "Sub-16 (Iniciados/Juv.)" },
];

export function FutsalClassificacoes({ classificacoes }: FutsalClassificacoesProps) {
  const [escalaoAtivo, setEscalaoAtivo] = useState<EscalaoKey>("sub9");

  const dadosEscalao = classificacoes[escalaoAtivo];

  return (
    <section id="classificacoes" className="space-y-6 scroll-mt-24">
      {/* Cabeçalho da Secção */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Tabelas Concelhias Oficiais</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Classificações dos 5 Escalões
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Pontuações, registo de vitórias, empates, derrotas e saldo de golos nos XL JIF de Vila do Conde.
          </p>
        </div>
      </div>

      {/* Abas dos Escalões (Tabs) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {ESCALOES.map((esc) => (
          <button
            key={esc.key}
            onClick={() => setEscalaoAtivo(esc.key)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              escalaoAtivo === esc.key
                ? "bg-brand-navy dark:bg-amber-400 text-white dark:text-slate-950 shadow-md scale-102"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
            }`}
          >
            <span>{esc.nome}</span>
            {esc.badge && (
              <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded ${esc.badgeColor || "bg-slate-200 text-slate-800"}`}>
                {esc.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tabela Classificativa do Escalão Ativo */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs overflow-hidden">
        {/* Topo do Escalão */}
        <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Table className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-black text-sm sm:text-base text-slate-900 dark:text-white">
                {dadosEscalao.titulo}
              </h3>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {dadosEscalao.totalEquipas} equipas em competição
              </span>
            </div>
          </div>
        </div>

        {/* Tabela com Scroll Horizontal Responsivo */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/80 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-white/10">
                <th className="py-3 px-3 text-center w-12">Pos</th>
                <th className="py-3 px-4">Freguesia / Equipa</th>
                <th className="py-3 px-3 text-center font-black text-slate-900 dark:text-white">PTS</th>
                <th className="py-3 px-3 text-center">J</th>
                <th className="py-3 px-3 text-center">V</th>
                <th className="py-3 px-3 text-center">E</th>
                <th className="py-3 px-3 text-center">D</th>
                <th className="py-3 px-3 text-center">GM</th>
                <th className="py-3 px-3 text-center">GS</th>
                <th className="py-3 px-3 text-center">SG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono">
              {dadosEscalao.tabela.map((linha) => {
                const isAjavp = linha.isAjavp;
                return (
                  <tr
                    key={linha.pos + linha.equipa}
                    className={`transition-colors ${
                      isAjavp
                        ? "bg-amber-50/80 dark:bg-amber-500/15 font-bold"
                        : "hover:bg-slate-50/60 dark:hover:bg-white/5"
                    }`}
                  >
                    {/* Posição */}
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          linha.pos === 1
                            ? "bg-amber-400 text-slate-950 font-black shadow-xs"
                            : linha.pos <= 3
                            ? "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {linha.pos}
                      </span>
                    </td>

                    {/* Nome da Equipa */}
                    <td className="py-3 px-4 font-sans font-medium text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <span className={isAjavp ? "font-black text-brand-green dark:text-emerald-300" : ""}>
                          {linha.equipa}
                        </span>
                        {isAjavp && (
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-full bg-emerald-600 text-white font-black tracking-wider">
                            A Nossa Terra
                          </span>
                        )}
                        {linha.lider && (
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black">
                            Líder
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Pontos */}
                    <td className="py-3 px-3 text-center font-black text-sm text-brand-navy dark:text-amber-400">
                      {linha.pontos}
                    </td>

                    {/* Estatísticas */}
                    <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-300">{linha.jogos}</td>
                    <td className="py-3 px-3 text-center text-emerald-600 dark:text-emerald-400 font-bold">{linha.v}</td>
                    <td className="py-3 px-3 text-center text-slate-500 dark:text-slate-400">{linha.e}</td>
                    <td className="py-3 px-3 text-center text-rose-500">{linha.d}</td>
                    <td className="py-3 px-3 text-center text-slate-700 dark:text-slate-300">{linha.gm}</td>
                    <td className="py-3 px-3 text-center text-slate-500 dark:text-slate-400">{linha.gs}</td>
                    <td
                      className={`py-3 px-3 text-center font-bold ${
                        linha.saldo > 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : linha.saldo < 0
                          ? "text-rose-500"
                          : "text-slate-400"
                      }`}
                    >
                      {linha.saldo > 0 ? `+${linha.saldo}` : linha.saldo}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

