'use client';

import { JifParishRanking } from '@/data/jif/classificacao';
import { Trophy, Medal, Award, Flame, Star } from 'lucide-react';

interface JifPodioRankingProps {
  rankings: JifParishRanking[];
}

export default function JifPodioRanking({ rankings }: JifPodioRankingProps) {
  // Sort by points descending
  const sorted = [...rankings].sort((a, b) => b.pontos - a.pontos);
  const first = sorted[0];
  const second = sorted[1];
  const third = sorted[2];
  const ajavp = sorted.find((r) => r.isAjavp);
  const ajavpRank = ajavp ? sorted.indexOf(ajavp) + 1 : 4;

  return (
    <div className="space-y-6">
      {/* AJAVP Highlight Banner */}
      {ajavp && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-brand-navy to-slate-900 text-white border-2 border-emerald-400/80 dark:border-emerald-500/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 flex flex-col items-center justify-center shrink-0 font-heading font-black shadow-md">
              <span className="text-[10px] uppercase font-bold leading-none">Lugar</span>
              <span className="text-2xl leading-none">{ajavpRank}º</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-400 text-slate-950">
                  Destaque Concelhio
                </span>
                <span className="text-xs text-emerald-300 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>AJAVP • Vilar do Pinheiro</span>
                </span>
              </div>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
                {ajavp.pontos} Pontos Acumulados
              </h3>
              <p className="text-xs text-slate-300">
                1º Corta-Mato (57 pts) • 6º Futebol (33 pts) • 5º Futsal (60 pts) • 2🥇 2🥈 2🥉 Medalhas
              </p>
            </div>
          </div>

          <div className="self-end md:self-center shrink-0 text-right">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1.5 rounded-xl border border-amber-400/40">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>A 5 pts do Top 3 Geral</span>
            </span>
          </div>
        </div>
      )}

      {/* Podium Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-end pt-4">
        {/* 2nd Place */}
        {second && (
          <div className="order-2 md:order-1 p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-3 text-center relative">
            <div className="w-10 h-10 rounded-2xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 flex items-center justify-center font-heading font-black text-base mx-auto shadow-xs">
              2º 🥈
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Vice-Líder</span>
              <h4 className="font-heading font-black text-lg text-slate-900 dark:text-white mt-0.5">
                {second.name}
              </h4>
            </div>
            <div className="text-2xl font-heading font-black text-slate-800 dark:text-slate-100">
              {second.pontos} <span className="text-xs font-normal text-slate-400">pts</span>
            </div>
            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-white/5">
              🏃 {second.cmPts} pts • ⚽ {second.fbPts} pts • 🥅 {second.fsPts} pts
            </div>
          </div>
        )}

        {/* 1st Place (Leader) */}
        {first && (
          <div className="order-1 md:order-2 p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-amber-500/10 via-white to-amber-500/5 dark:from-amber-500/20 dark:via-slate-900 dark:to-slate-900 border-2 border-amber-400 dark:border-amber-400/60 shadow-lg space-y-3 text-center relative -translate-y-0 md:-translate-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-heading font-black text-xl mx-auto shadow-md">
              1º 🥇
            </div>
            <div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-400 text-slate-950">
                Líder Concelhio
              </span>
              <h4 className="font-heading font-black text-xl text-slate-900 dark:text-white mt-1">
                {first.name}
              </h4>
            </div>
            <div className="text-3xl font-heading font-black text-amber-600 dark:text-amber-400">
              {first.pontos} <span className="text-xs font-normal text-slate-400">pts</span>
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-300 pt-2 border-t border-amber-200 dark:border-white/10 font-medium">
              🏃 {first.cmPts} pts • ⚽ {first.fbPts} pts • 🥅 {first.fsPts} pts
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {third && (
          <div className="order-3 p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-3 text-center relative">
            <div className="w-10 h-10 rounded-2xl bg-amber-700/20 text-amber-700 dark:text-amber-300 flex items-center justify-center font-heading font-black text-base mx-auto shadow-xs border border-amber-700/30">
              3º 🥉
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Pódio Geral</span>
              <h4 className="font-heading font-black text-lg text-slate-900 dark:text-white mt-0.5">
                {third.name}
              </h4>
            </div>
            <div className="text-2xl font-heading font-black text-slate-800 dark:text-slate-100">
              {third.pontos} <span className="text-xs font-normal text-slate-400">pts</span>
            </div>
            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-white/5">
              🏃 {third.cmPts} pts • ⚽ {third.fbPts} pts • 🥅 {third.fsPts} pts
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
