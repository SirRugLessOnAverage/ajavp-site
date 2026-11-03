"use client";

import { useState } from "react";
import {
  TENIS_MESA_ENCONTROS,
  TENIS_MESA_ESCALOES,
  TENIS_MESA_SECOES_REGULAMENTO,
  TenisMesaSecaoRegulamento,
} from "@/data/jif/tenis-de-mesa";

interface JifRegulamentoTenisMesaProps {
  defaultExpanded?: boolean;
  className?: string;
}

export function JifRegulamentoTenisMesa({
  defaultExpanded = false,
  className = "",
}: JifRegulamentoTenisMesaProps) {
  // Guarda os IDs das secções abertas
  const [openSections, setOpenSections] = useState<string[]>(() =>
    defaultExpanded ? TENIS_MESA_SECOES_REGULAMENTO.map((s) => s.id) : ["formato-encontros", "escaloes-horarios"]
  );

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenSections(TENIS_MESA_SECOES_REGULAMENTO.map((s) => s.id));
  };

  const collapseAll = () => {
    setOpenSections([]);
  };

  const allExpanded = openSections.length === TENIS_MESA_SECOES_REGULAMENTO.length;

  return (
    <div
      id="regulamento-tenis-mesa"
      className={`rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/90 shadow-xl overflow-hidden transition-colors ${className}`}
    >
      {/* CABEÇALHO */}
      <div className="p-6 sm:p-8 bg-linear-to-r from-blue-900/10 via-emerald-900/5 to-transparent border-b border-slate-200 dark:border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-xl border border-blue-500/30 shadow-xs">
              🏓
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-900 dark:text-blue-300 font-black text-[10px] uppercase tracking-wider border border-blue-300 dark:border-blue-400/30">
                  ADCCVC • Regulamento Oficial
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 font-bold text-[10px] uppercase tracking-wider border border-emerald-300 dark:border-emerald-400/30">
                  XL JIF 2026/2027
                </span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-navy dark:text-white mt-1">
                Ténis de Mesa • Regulamento das Provas Oficiais
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={allExpanded ? collapseAll : expandAll}
              type="button"
              className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 transition-colors border border-slate-300 dark:border-white/15 cursor-pointer"
            >
              {allExpanded ? "Recolher Todos" : "Expandir Todos"}
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
          Consulte o caderno completo das regras oficiais da modalidade, com 3 encontros na{" "}
          <strong className="text-slate-900 dark:text-white">Casa da Juventude de Guilhabreu</strong>, partidas a 11 pontos, 6 escalões em prova (manhã e tarde) e apuramento concelhio pelo Artigo XV.
        </p>

        {/* 4 CARDS DESTAQUE RÁPIDO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
              📍 Palco Único dos 3 Encontros
            </span>
            <span className="text-sm font-black text-slate-900 dark:text-white block">
              C. Juv. Guilhabreu
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Mesas oficiais ADCCVC
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-400/20">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block mb-1">
              📅 1.º Encontro Concelhio
            </span>
            <span className="text-sm font-black text-amber-900 dark:text-amber-200 block">
              Sáb, 07 de Novembro 2026
            </span>
            <span className="text-[11px] text-amber-700/80 dark:text-amber-300/80">
              Manhã 09h30 • Tarde 14h30
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-400/20">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 block mb-1">
              🏓 Formato das Partidas
            </span>
            <span className="text-sm font-black text-blue-900 dark:text-blue-200 block">
              Melhor de 3 Jogos a 11 Pts
            </span>
            <span className="text-[11px] text-blue-700/80 dark:text-blue-300/80">
              Grupos e eliminatórias
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-400/20">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
              ⚖️ Pontuação Concelhia (Art. XV)
            </span>
            <span className="text-sm font-black text-emerald-900 dark:text-emerald-200 block">
              Incremento de 3 Pts
            </span>
            <span className="text-[11px] text-emerald-700/80 dark:text-emerald-300/80">
              3 melhores atletas por escalão
            </span>
          </div>
        </div>
      </div>

      {/* ACCORDION DE 5 SECÇÕES */}
      <div className="divide-y divide-slate-200 dark:divide-white/10">
        {TENIS_MESA_SECOES_REGULAMENTO.map((secao) => {
          const isOpen = openSections.includes(secao.id);
          return (
            <div key={secao.id} className="transition-colors">
              <button
                type="button"
                onClick={() => toggleSection(secao.id)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pr-4">
                  <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {secao.titulo}
                  </span>
                  <span className="self-start px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider border border-slate-200 dark:border-white/10">
                    {secao.badge}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 shrink-0">
                  <span className="text-xs hidden sm:inline text-slate-500 dark:text-slate-400">
                    {isOpen ? "Ocultar" : "Ver regras"}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-6 sm:px-6 sm:pb-8 pt-1 bg-slate-50/40 dark:bg-slate-950/40">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 italic">
                    {secao.subtitulo}
                  </p>

                  {/* CASO ESPECIAL: SE FOR A SECÇÃO 2, APRESENTAR A TABELA DOS ESCALÕES E HORÁRIOS */}
                  {secao.id === "escaloes-horarios" && (
                    <div className="mb-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-xs">
                      <div className="p-3.5 bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                          Quadro de Escalões Oficiais & Tolerâncias (Guilhabreu)
                        </span>
                        <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                          ⚠️ Sem Sub-7 e Sem Sub-9
                        </span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 dark:bg-slate-950/50 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-white/10">
                            <tr>
                              <th className="py-2.5 px-3">Escalão</th>
                              <th className="py-2.5 px-3">Turno</th>
                              <th className="py-2.5 px-3">Nascimentos</th>
                              <th className="py-2.5 px-3">Início Jogo</th>
                              <th className="py-2.5 px-3">Presença Limite</th>
                              <th className="py-2.5 px-3">Alterações Até</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {TENIS_MESA_ESCALOES.map((esc) => (
                              <tr key={esc.nome} className="hover:bg-slate-50 dark:hover:bg-white/5">
                                <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                                  {esc.nome}
                                </td>
                                <td className="py-2.5 px-3">
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                      esc.periodo === "Manhã"
                                        ? "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300"
                                        : "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300"
                                    }`}
                                  >
                                    {esc.periodo}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                                  {esc.anosNascimento}
                                </td>
                                <td className="py-2.5 px-3 font-black text-slate-900 dark:text-white">
                                  {esc.horarioInicio}
                                </td>
                                <td className="py-2.5 px-3 text-red-600 dark:text-red-400 font-bold">
                                  {esc.horarioInscricaoLimite}
                                </td>
                                <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">
                                  {esc.horarioAlteracaoLimite}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* GRELHA DE REGRAS E ITENS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {secao.itens.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border transition-all ${
                          item.aviso
                            ? "bg-red-50/70 border-red-200 dark:bg-red-950/20 dark:border-red-500/30 text-red-900 dark:text-red-200"
                            : item.destaque
                            ? "bg-blue-50/70 border-blue-200 dark:bg-blue-950/20 dark:border-blue-500/30 text-blue-950 dark:text-blue-200"
                            : "bg-white border-slate-200 dark:bg-slate-900 dark:border-white/10 text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          {item.aviso && <span className="text-red-500 font-bold">⚠️</span>}
                          {item.destaque && !item.aviso && (
                            <span className="text-blue-500 font-bold">★</span>
                          )}
                          <h4 className="text-xs font-black uppercase tracking-wider">
                            {item.rotulo}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                          {item.detalhe}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CASO ESPECIAL: CALENDÁRIO DOS 3 ENCONTROS */}
                  {secao.id === "formato-encontros" && (
                    <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-3">
                        📅 Calendário Oficial dos 3 Encontros de Ténis de Mesa
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {TENIS_MESA_ENCONTROS.map((enc) => (
                          <div
                            key={enc.numero}
                            className={`p-3 rounded-xl border text-xs ${
                              enc.numero === 1
                                ? "bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 dark:border-amber-400/30"
                                : "bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-white/10"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-black text-slate-900 dark:text-white">
                                {enc.numero}º Encontro
                              </span>
                              <span
                                className={`px-2 py-0.2 rounded-full text-[9px] font-bold ${
                                  enc.numero === 1
                                    ? "bg-amber-200 text-amber-900 dark:bg-amber-500/30 dark:text-amber-300"
                                    : "bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300"
                                }`}
                              >
                                {enc.estado}
                              </span>
                            </div>
                            <div className="font-bold text-slate-800 dark:text-slate-200">
                              {enc.data}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                              {enc.local}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* RODAPÉ DO COMPONENTE COM NOTA DE TRANSPARÊNCIA */}
      <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span>📜</span>
          <span>
            Documento Oficial ADCCVC aprovado pela Comissão Organizadora dos XL JIF (2026/2027).
          </span>
        </div>
        <a
          href="/assets/docs/Regulamento_Tenis_Mesa_2026_2027.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          <span>Descarregar PDF Oficial</span>
          <span>↗</span>
        </a>
      </div>
    </div>
  );
}

