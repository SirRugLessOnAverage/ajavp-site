"use client";

import React, { useState } from "react";
import {
  Bike,
  Footprints,
  ChevronDown,
  ShieldAlert,
  Navigation,
  Clock,
  Users,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import {
  DUATLO_INFO_GERAL,
  DUATLO_ESCALOES,
  DUATLO_SECOES_REGULAMENTO,
} from "@/data/jif/duatlo";

export function JifRegulamentoDuatlo({ className = "" }: { className?: string }) {
  const [secoesAbertas, setSecoesAbertas] = useState<Record<string, boolean>>({
    "segmentos-transicao": true,
    "conduta-acompanhamento": false,
    "penalizacoes-classificacao": false,
  });

  const toggleSecao = (id: string) => {
    setSecoesAbertas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="duatlo"
      className={`rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden scroll-mt-24 ${className}`}
    >
      {/* Cabeçalho do Módulo Duatlo */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-950 via-brand-navy to-slate-900 text-white border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider">
                Próxima Prova • 05 Dezembro
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold">
                135 Atletas Inscritos
              </span>
            </div>

            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white flex items-center gap-2.5">
              <Bike className="w-7 h-7 text-amber-400 shrink-0" />
              <span>Regulamento &amp; Percursos • Duatlo Individual</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong>{DUATLO_INFO_GERAL.dataFormatada}</strong> &bull; Concentração no{" "}
              <strong>{DUATLO_INFO_GERAL.concentracao}</strong>.{" "}
              {DUATLO_INFO_GERAL.ordemPartida}.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs text-center min-w-[110px]">
              <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                <Clock className="w-3.5 h-3.5" />
                <span>Início</span>
              </div>
              <div className="font-heading font-black text-xl text-white mt-0.5">
                {DUATLO_INFO_GERAL.horaInicio}
              </div>
            </div>

            <a
              href={DUATLO_INFO_GERAL.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-press inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-black text-xs sm:text-sm shadow-lg transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>Rota GPS • Cividade</span>
            </a>
          </div>
        </div>
      </div>

      {/* Matriz Oficial de Escalões e Distâncias */}
      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <h3 className="font-heading font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Footprints className="w-5 h-5 text-brand-green dark:text-emerald-400" />
              <span>Distâncias Oficiais por Escalão (Atletismo + BTT + Atletismo)</span>
            </h3>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>1 a 3 atletas por escalão (exceção até 5)</span>
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 uppercase text-[10px] sm:text-xs font-black tracking-wider">
                <tr>
                  <th className="px-4 py-3">Escalão</th>
                  <th className="px-4 py-3">Nascimento</th>
                  <th className="px-4 py-3">1.º Atletismo</th>
                  <th className="px-4 py-3">Ciclismo (BTT)</th>
                  <th className="px-4 py-3">2.º Atletismo</th>
                  <th className="px-4 py-3">Percurso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {DUATLO_ESCALOES.map((esc) => (
                  <tr
                    key={esc.escalao}
                    className="hover:bg-slate-50/70 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      {esc.escalao}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300 font-mono text-xs whitespace-nowrap">
                      {esc.anosNascimento}
                    </td>
                    <td className="px-4 py-3 font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                      {esc.atletismo1}
                    </td>
                    <td className="px-4 py-3 font-bold text-amber-700 dark:text-amber-400 whitespace-nowrap">
                      {esc.btt}
                    </td>
                    <td className="px-4 py-3 font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                      {esc.atletismo2}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300 text-xs">
                      {esc.notaPercurso}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Regras Críticas em Acordeão */}
        <div className="space-y-3">
          <h3 className="font-heading font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            <span>Regras Obrigatórias da Prova &amp; Zona de Transição</span>
          </h3>

          {DUATLO_SECOES_REGULAMENTO.map((sec) => {
            const aberta = Boolean(secoesAbertas[sec.id]);
            return (
              <div
                key={sec.id}
                className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden bg-slate-50/60 dark:bg-slate-950/50"
              >
                <button
                  type="button"
                  onClick={() => toggleSecao(sec.id)}
                  aria-expanded={aberta}
                  className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                        {sec.titulo}
                      </span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300">
                        {sec.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {sec.subtitulo}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      aberta ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {aberta && (
                  <div className="px-5 pb-5 pt-2 grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-slate-200/70 dark:border-white/10">
                    {sec.itens.map((item) => (
                      <div
                        key={item.rotulo}
                        className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                          item.aviso
                            ? "bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-500/30"
                            : item.destaque
                            ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-500/30"
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10"
                        }`}
                      >
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          {item.aviso ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          )}
                          <span>{item.rotulo}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {item.detalhe}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
