'use client';

import { useState } from 'react';
import { JifParishRanking, JIF_CLASSIFICACAO } from '@/data/jif/classificacao';
import { Trophy, Layers, Medal, Search, AlertCircle, TrendingUp, Minus } from 'lucide-react';

export default function JifRankingTable() {
  const [viewMode, setViewMode] = useState<'total' | 'breakdown' | 'medals'>('total');
  const [searchQuery, setSearchQuery] = useState<string>('');

  let items = [...JIF_CLASSIFICACAO];

  // Sorting
  if (viewMode === 'total' || viewMode === 'breakdown') {
    items.sort((a, b) => b.pontos - a.pontos);
  } else if (viewMode === 'medals') {
    items.sort((a, b) => b.gold - a.gold || b.silver - a.silver || b.bronze - a.bronze || b.pontos - a.pontos);
  }

  // Filter by search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    items = items.filter((item) => item.name.toLowerCase().includes(q));
  }

  return (
    <div className="space-y-6">
      {/* Table Toolbar & View Switcher */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Procurar freguesia..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
          />
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/10 p-1 rounded-xl text-xs font-bold overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setViewMode('total')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              viewMode === 'total'
                ? 'bg-brand-navy dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Geral Virtual</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('breakdown')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              viewMode === 'breakdown'
                ? 'bg-brand-navy dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Por Modalidade</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('medals')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              viewMode === 'medals'
                ? 'bg-brand-navy dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Medal className="w-3.5 h-3.5 text-amber-500" />
            <span>Medalhas</span>
          </button>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[650px] md:min-w-full">
            <thead>
              <tr className="bg-brand-navy text-white uppercase text-[10px] tracking-wider font-heading font-black">
                <th className="py-3 px-3 text-center w-12">Pos.</th>
                <th className="py-3 px-4 min-w-[170px] sticky left-0 z-20 bg-brand-navy shadow-xs">
                  Freguesia / Associação
                </th>
                <th className="py-3 px-3 text-center min-w-[110px]">
                  <span>🏃 Atletismo</span>
                  <span className="block text-[9px] font-normal text-slate-300">1º = 57 pts</span>
                </th>
                <th className="py-3 px-3 text-center min-w-[110px]">
                  <span>⚽ Futebol</span>
                  <span className="block text-[9px] font-normal text-slate-300">1º = 48 pts</span>
                </th>
                <th className="py-3 px-3 text-center min-w-[110px]">
                  <span>🥅 Futsal</span>
                  <span className="block text-[9px] font-normal text-slate-300">1º = 80 pts</span>
                </th>
                <th className="py-3 px-3 text-center min-w-[110px] bg-slate-950 text-amber-300 font-black">
                  <span>{viewMode === 'medals' ? 'Medalhas' : 'Total Pontos'}</span>
                  <span className="block text-[9px] font-normal text-slate-400">Classificação</span>
                </th>
                <th className="py-3 px-3 text-center min-w-[80px]">Medalheiro</th>
                <th className="py-3 px-3 text-center min-w-[90px]">Situação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-medium">
              {items.map((item, index) => {
                const pos = index + 1;
                const isTop3 = pos <= 3;
                const totalMedals = item.gold + item.silver + item.bronze;

                const stickyBg = item.isAjavp
                  ? 'bg-amber-50 dark:bg-emerald-950/80 font-black'
                  : 'bg-white dark:bg-slate-900';

                return (
                  <tr
                    key={item.name}
                    className={`transition-colors ${
                      item.isAjavp
                        ? 'bg-amber-50/70 dark:bg-emerald-950/40 border-l-4 border-l-brand-green font-bold shadow-2xs'
                        : 'hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    {/* Position Badge */}
                    <td className="py-3 px-2 text-center align-middle">
                      {pos === 1 && (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-amber-400 text-slate-950 font-black text-xs shadow-2xs">
                          1º
                        </span>
                      )}
                      {pos === 2 && (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-300 text-slate-900 font-black text-xs shadow-2xs">
                          2º
                        </span>
                      )}
                      {pos === 3 && (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-amber-700 text-white font-black text-xs shadow-2xs">
                          3º
                        </span>
                      )}
                      {pos > 3 && (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 font-bold text-xs">
                          {pos}º
                        </span>
                      )}
                    </td>

                    {/* Parish Name (Sticky Column for Mobile) */}
                    <td
                      className={`py-3 px-4 align-middle sticky left-0 z-10 ${stickyBg} shadow-xs border-r border-slate-200/60 dark:border-white/10`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs ${
                            item.isAjavp
                              ? 'text-brand-green dark:text-emerald-300 font-black text-sm'
                              : 'text-slate-900 dark:text-white font-bold'
                          }`}
                        >
                          {item.name}
                        </span>
                        {item.isAjavp && (
                          <span className="px-1.5 py-0.5 rounded-md bg-emerald-600 text-white font-black text-[8px] uppercase tracking-wider">
                            AJAVP
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Atletismo */}
                    <td className="py-3 px-3 text-center align-middle">
                      <span
                        className={`text-xs font-bold ${
                          item.cmRank === 1 ? 'text-amber-600 dark:text-amber-400 font-black' : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {item.cmRank}º
                      </span>
                      <span className="text-[10px] text-slate-400 block">({item.cmPts} pts)</span>
                    </td>

                    {/* Futebol */}
                    <td className="py-3 px-3 text-center align-middle">
                      {item.fbNp ? (
                        <div>
                          <span className="text-xs font-bold text-rose-600 dark:text-rose-400">N/P</span>
                          <span className="text-[10px] text-rose-500 font-bold block">(-15 pts)</span>
                        </div>
                      ) : (
                        <div>
                          <span
                            className={`text-xs font-bold ${
                              item.fbRank === 1 ? 'text-amber-600 dark:text-amber-400 font-black' : 'text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {item.fbRank}º
                          </span>
                          <span className="text-[10px] text-slate-400 block">({item.fbPts} pts)</span>
                        </div>
                      )}
                    </td>

                    {/* Futsal */}
                    <td className="py-3 px-3 text-center align-middle">
                      {item.fsNp ? (
                        <div>
                          <span className="text-xs font-bold text-rose-600 dark:text-rose-400">N/P</span>
                          <span className="text-[10px] text-rose-500 font-bold block">(-25 pts)</span>
                        </div>
                      ) : (
                        <div>
                          <span
                            className={`text-xs font-bold ${
                              item.fsRank === 1
                                ? 'text-amber-600 dark:text-amber-400 font-black'
                                : item.isAjavp
                                ? 'text-brand-green dark:text-emerald-400 font-black'
                                : 'text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {item.fsRank}º
                          </span>
                          <span className="text-[10px] text-slate-400 block">({item.fsPts} pts)</span>
                        </div>
                      )}
                    </td>

                    {/* Total Points or Medals */}
                    <td className="py-3 px-3 text-center align-middle bg-slate-50/70 dark:bg-white/5">
                      {viewMode === 'medals' ? (
                        <span className="font-heading font-black text-sm text-amber-500">
                          {totalMedals}
                        </span>
                      ) : item.pontos < 0 ? (
                        <div>
                          <span className="font-heading font-black text-sm text-rose-600 dark:text-rose-400">
                            {item.pontos}
                          </span>
                          <span className="text-[9px] text-rose-500 font-bold block">pts (N/P)</span>
                        </div>
                      ) : (
                        <div>
                          <span
                            className={`font-heading font-black text-sm ${
                              item.isAjavp
                                ? 'text-brand-green dark:text-emerald-300'
                                : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            {item.pontos}
                          </span>
                          <span className="text-[9px] text-slate-400 font-normal"> pts</span>
                        </div>
                      )}
                    </td>

                    {/* Medals */}
                    <td className="py-3 px-2 text-center align-middle text-[11px]">
                      {totalMedals === 0 ? (
                        <span className="text-slate-400">-</span>
                      ) : (
                        <span>
                          {item.gold > 0 && `${item.gold}🥇 `}
                          {item.silver > 0 && `${item.silver}🥈 `}
                          {item.bronze > 0 && `${item.bronze}🥉`}
                        </span>
                      )}
                    </td>

                    {/* Situation Indicator */}
                    <td className="py-3 px-2 text-center align-middle">
                      {item.pontos < 0 ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-rose-600 dark:text-rose-400 font-bold">
                          <AlertCircle className="w-3 h-3" />
                          <span>Penalizado</span>
                        </span>
                      ) : isTop3 ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                          <TrendingUp className="w-3 h-3" />
                          <span>Pódio</span>
                        </span>
                      ) : pos === 4 ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                          <TrendingUp className="w-3 h-3" />
                          <span>Top 4</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                          <Minus className="w-3 h-3" />
                          <span>Em Prova</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Legend Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> 1º Líder
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> 2º Pódio
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-700"></span> 3º Pódio
            </span>
            <span className="inline-flex items-center gap-1 font-bold text-brand-green dark:text-emerald-400">
              ⭐ AJAVP Destacada
            </span>
            <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> N/P (Penalização Negativa)
            </span>
          </div>
          <span className="italic text-[10px]">
            Fonte: Regulamento ADCCVC • Artigo XV • Simulador GERAL 26_27
          </span>
        </div>
      </div>
    </div>
  );
}
