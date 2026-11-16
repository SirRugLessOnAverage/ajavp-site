"use client";

import React, { useState } from "react";
import { Table, Award } from "lucide-react";
import type { FutsalClassificacaoEscalao, FutsalJornada } from "@/data/jif/futsal";
import {
  formatarNomeEquipa,
  chaveCanonicaEquipa,
  type ConsolidatedMatch,
} from "@/lib/jif/team-matches";
import { identificarPavilhao, type PavilhaoInfo } from "@/lib/jif/pavilhoes";
import { FutsalTeamMatchesModal } from "@/components/jif/futsal/FutsalTeamMatchesModal";
import { FutsalPavilhaoModal } from "@/components/jif/futsal/FutsalPavilhaoModal";
import { FutsalDateModal } from "@/components/jif/futsal/FutsalDateModal";

interface FutsalClassificacoesProps {
  classificacoes: {
    sub7: FutsalClassificacaoEscalao;
    sub9: FutsalClassificacaoEscalao;
    sub11: FutsalClassificacaoEscalao;
    sub13: FutsalClassificacaoEscalao;
    sub16: FutsalClassificacaoEscalao;
  };
  jornadas?: FutsalJornada[];
}

type EscalaoKey = "sub7" | "sub9" | "sub11" | "sub13" | "sub16";

const ESCALOES: { key: EscalaoKey; nome: string; labelCurto: string }[] = [
  { key: "sub9", nome: "Sub-9 (Benjamins)", labelCurto: "Sub-9" },
  { key: "sub11", nome: "Sub-11 (Traquinas)", labelCurto: "Sub-11" },
  { key: "sub7", nome: "Sub-7 (Petizes)", labelCurto: "Sub-7" },
  { key: "sub13", nome: "Sub-13 (Infantis)", labelCurto: "Sub-13" },
  { key: "sub16", nome: "Sub-16 (Iniciados/Juv.)", labelCurto: "Sub-16" },
];

const MAPA_ESCALAO_NOME: Record<EscalaoKey, string> = {
  sub7: "Sub-7",
  sub9: "Sub-9",
  sub11: "Sub-11",
  sub13: "Sub-13",
  sub16: "Sub-16",
};

function obterBadgeAjavpDinamico(
  tabela: FutsalClassificacaoEscalao["tabela"]
): { texto: string; cor: string } | null {
  const linhaAjavp = tabela.find(
    (l) => l.isAjavp || chaveCanonicaEquipa(l.equipa) === "ajavp"
  );
  if (!linhaAjavp || linhaAjavp.jogos === 0) return null;

  if (linhaAjavp.pos === 1) {
    return {
      texto: "1.º Líder 🥇",
      cor: "bg-amber-400 text-slate-950 font-black",
    };
  }
  if (linhaAjavp.pos === 2) {
    return {
      texto: "2.º Pódio 🥈",
      cor: "bg-emerald-500 text-slate-950 font-black",
    };
  }
  if (linhaAjavp.pos === 3) {
    return {
      texto: "3.º Pódio 🥉",
      cor: "bg-emerald-500 text-slate-950 font-black",
    };
  }
  return {
    texto: `${linhaAjavp.pos}.º Lugar`,
    cor: "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold",
  };
}

export function FutsalClassificacoes({
  classificacoes,
  jornadas,
}: FutsalClassificacoesProps) {
  const [escalaoAtivo, setEscalaoAtivo] = useState<EscalaoKey>("sub9");
  const [modalEquipa, setModalEquipa] = useState<{
    teamName: string;
    escalao: string;
  } | null>(null);
  const [pavilhaoSelecionado, setPavilhaoSelecionado] =
    useState<PavilhaoInfo | null>(null);
  const [jogoCalendario, setJogoCalendario] =
    useState<ConsolidatedMatch | null>(null);

  const dadosEscalao = classificacoes[escalaoAtivo];
  const nomeEscalaoAtivo = MAPA_ESCALAO_NOME[escalaoAtivo];

  return (
    <section id="classificacoes" className="space-y-6 scroll-mt-24">
      {/* Cabeçalho da Secção */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Classificação Dinâmica em Tempo Real</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Classificações dos 5 Escalões
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Calculadas automaticamente a partir dos jogos realizados nos XL JIF. Clica numa equipa para consultar os seus jogos neste escalão.
          </p>
        </div>
      </div>

      {/* Abas dos Escalões (Tabs com Badges Dinâmicos) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {ESCALOES.map((esc) => {
          const badgeDinamico = obterBadgeAjavpDinamico(
            classificacoes[esc.key]?.tabela || []
          );
          return (
            <button
              key={esc.key}
              onClick={() => setEscalaoAtivo(esc.key)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer active:scale-[0.97] ${
                escalaoAtivo === esc.key
                  ? "bg-brand-navy dark:bg-amber-400 text-white dark:text-slate-950 shadow-md scale-102"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
              }`}
            >
              <span>{esc.nome}</span>
              {badgeDinamico && (
                <span
                  className={`text-[9px] uppercase px-1.5 py-0.5 rounded ${badgeDinamico.cor}`}
                >
                  {badgeDinamico.texto}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tabela Classificativa do Escalão Ativo */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs overflow-hidden">
        {/* Topo do Escalão */}
        <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
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

          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Critérios: PTS &gt; SG &gt; GM &gt; Confronto Direto
          </span>
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
                const isAjavp =
                  Boolean(linha.isAjavp) ||
                  chaveCanonicaEquipa(linha.equipa) === "ajavp";
                const nomeFormatado = formatarNomeEquipa(linha.equipa);
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

                    {/* Nome da Equipa (Clicável para ver jogos deste escalão) */}
                    <td className="py-3 px-4 font-sans font-medium text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setModalEquipa({
                              teamName: linha.equipa,
                              escalao: nomeEscalaoAtivo,
                            })
                          }
                          title={`Ver jogos de ${nomeFormatado} em ${nomeEscalaoAtivo}`}
                          className={`text-left transition-all cursor-pointer active:scale-[0.97] hover:underline ${
                            isAjavp
                              ? "font-black text-brand-green dark:text-emerald-300"
                              : "hover:text-brand-navy dark:hover:text-white"
                          }`}
                        >
                          {nomeFormatado}
                        </button>
                        {isAjavp && (
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-full bg-emerald-600 text-white font-black tracking-wider shrink-0">
                            A Nossa Terra
                          </span>
                        )}
                        {linha.lider && (
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black shrink-0">
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

        {/* Rodapé informativo */}
        <div className="px-5 py-3 bg-slate-50/80 dark:bg-slate-800/40 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <span>
            Classificação calculada automaticamente com base nos resultados oficiais das jornadas realizadas (jogos da Taça não contam para a liga).
          </span>
        </div>
      </div>

      {/* Modais Integrados ao clicar numa equipa da tabela */}
      <FutsalTeamMatchesModal
        teamName={modalEquipa?.teamName || null}
        initialCategory={modalEquipa?.escalao}
        isOpen={Boolean(modalEquipa)}
        onClose={() => setModalEquipa(null)}
        hubJornadas={jornadas}
        onSelectPavilhao={(nome) => setPavilhaoSelecionado(identificarPavilhao(nome))}
        onSelectDate={(match) => setJogoCalendario(match)}
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
