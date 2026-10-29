"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Medal, Trophy, Calendar, Sparkles, ArrowRight, MapPin, Clock } from "lucide-react";
import type { FutsalMarcadoresEscalao, ProximaJornada } from "@/data/jif/futsal";
import { getProximoEventoJif, type ProximoEventoInfo } from "@/data/jif/calendario";

interface FutsalMarcadoresProps {
  marcadores: FutsalMarcadoresEscalao[];
  proximaJornada: ProximaJornada;
}

export function FutsalMarcadores({
  marcadores,
  proximaJornada,
}: FutsalMarcadoresProps) {
  const [escalaoMarcador, setEscalaoMarcador] = useState<string>(
    marcadores[0]?.escalao || "Sub-9"
  );
  const [proximoEventoFutsal, setProximoEventoFutsal] = useState<ProximoEventoInfo | null>(null);

  useEffect(() => {
    const proximo = getProximoEventoJif("futsal");
    setProximoEventoFutsal(proximo);
  }, []);

  const listaAtual =
    marcadores.find((m) => m.escalao === escalaoMarcador) || marcadores[0];

  const eventoCalendario = proximoEventoFutsal?.evento;
  const labelRelativo = proximoEventoFutsal?.labelRelativo;

  return (
    <div className="space-y-12">
      {/* SECÇÃO: MELHORES MARCADORES */}
      <section id="marcadores" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Medal className="w-3.5 h-3.5" />
              <span>Goleadores &bull; Eficácia Concelhia</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Melhores Marcadores
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Quadro de artilheiros com destaque para os atletas de Vilar do Pinheiro no topo concelhio.
            </p>
          </div>
        </div>

        {/* Abas de Escalões de Marcadores */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {marcadores.map((m) => (
            <button
              key={m.escalao}
              onClick={() => setEscalaoMarcador(m.escalao)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                escalaoMarcador === m.escalao
                  ? "bg-brand-navy dark:bg-amber-400 text-white dark:text-slate-950 shadow-md"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
              }`}
            >
              {m.escalao}
            </button>
          ))}
        </div>

        {/* Tabela de Artilheiros */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {listaAtual?.atletas.map((atleta) => {
              const isAjavp = atleta.isAjavp;
              return (
                <div
                  key={atleta.pos + atleta.nome}
                  className={`p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors ${
                    isAjavp
                      ? "bg-amber-50/50 dark:bg-amber-500/10 hover:bg-amber-50/80 dark:hover:bg-amber-500/15"
                      : "hover:bg-slate-50/60 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Posição / Coroa */}
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0">
                      {atleta.coroa ? (
                        <span className="text-base" title="Melhor Marcador Concelhio">👑</span>
                      ) : (
                        <span className="text-slate-600 dark:text-slate-300">
                          {atleta.medalha || `${atleta.pos}.º`}
                        </span>
                      )}
                    </div>

                    {/* Nome e Equipa */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-black text-sm sm:text-base text-slate-900 dark:text-white">
                          {atleta.nome}
                        </span>
                        {isAjavp && (
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-md bg-emerald-600 text-white font-black">
                            AJAVP
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {atleta.equipa}
                      </span>
                    </div>
                  </div>

                  {/* Número de Golos */}
                  <div className="text-right shrink-0">
                    <span className="font-mono font-black text-xl sm:text-2xl text-amber-500 dark:text-amber-400">
                      {atleta.golos}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-bold">
                      Golos
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECÇÃO: PRÓXIMA JORNADA DINÂMICA (LIGADA AO CALENDÁRIO OFICIAL) */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-brand-green dark:text-emerald-400 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-lg text-slate-900 dark:text-white">
                  Próxima Jornada &bull; {eventoCalendario ? `${eventoCalendario.day}/${eventoCalendario.month}` : proximaJornada.dataPrevisao}
                </h3>
                {labelRelativo && (
                  <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${labelRelativo.color}`}>
                    {labelRelativo.text}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {eventoCalendario ? eventoCalendario.title : proximaJornada.estado}
              </p>
            </div>
          </div>
          <Link
            href="/jif#calendario"
            className="text-xs font-bold text-brand-green dark:text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Ver Calendário Geral</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card Destaque da Próxima Jornada Oficial */}
        {eventoCalendario ? (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 border border-emerald-200/80 dark:border-emerald-500/20 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-heading font-black text-sm text-slate-900 dark:text-white">
                  {eventoCalendario.title}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {eventoCalendario.time}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span><strong>Local:</strong> {eventoCalendario.location}</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {proximaJornada.jogosAjavp.map((jogo, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/10 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase px-2 py-0.5 rounded bg-brand-navy text-white">
                    {jogo.escalao}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {jogo.hora}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  vs {jogo.adversario}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  📍 {jogo.pavilhao}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* BANNER DE CALL TO ACTION: CLASSIFICAÇÃO GERAL VIRTUAL */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-navy via-slate-900 to-slate-950 text-white border border-white/10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulador Concelhio Oficial</span>
          </div>
          <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
            Como impacta o Futsal na Classificação Geral dos JIF?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Consulta a classificação geral virtual de todas as 19 freguesias com o somatório dos eventos homologados (Corta-Mato, Futebol e Futsal) segundo o Artigo XV do Regulamento ADCCVC.
          </p>
        </div>

        <Link
          href="/jif/classificacao"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer"
        >
          <Trophy className="w-4 h-4" />
          <span>Ver Classificação Geral Virtual</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
