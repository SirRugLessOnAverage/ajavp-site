'use client';

import { JIF_CIRCULARS, JIF_VICTORY_SPOTLIGHT } from '@/data/jif/comunicados';
import { Trophy, FileText, Calendar, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function JifComunicadosList() {
  return (
    <div className="space-y-8">
      {/* Historic Victory Spotlight */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/20 via-emerald-500/10 to-transparent border-2 border-amber-400 dark:border-amber-400/50 shadow-lg relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-xs flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" />
                <span>Homologação Oficial • Comunicado {JIF_VICTORY_SPOTLIGHT.circularNumber}</span>
              </span>
              <span className="text-xs text-amber-900 dark:text-amber-200 font-semibold">
                {JIF_VICTORY_SPOTLIGHT.date}
              </span>
            </div>

            <h3 className="font-heading font-black text-2xl sm:text-3xl text-brand-navy dark:text-white leading-tight">
              {JIF_VICTORY_SPOTLIGHT.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed max-w-3xl">
              {JIF_VICTORY_SPOTLIGHT.description}
            </p>
          </div>

          <div className="shrink-0 text-center lg:text-right p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-amber-300 dark:border-white/10 shadow-sm backdrop-blur-md">
            <div className="text-3xl sm:text-4xl font-heading font-black text-amber-600 dark:text-amber-400">
              {JIF_VICTORY_SPOTLIGHT.position}
            </div>
            <div className="text-xs text-slate-800 dark:text-slate-200 font-bold uppercase tracking-wider mt-1">
              {JIF_VICTORY_SPOTLIGHT.category}
            </div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
              {JIF_VICTORY_SPOTLIGHT.location}
            </div>
          </div>
        </div>
      </div>

      {/* Circulars List */}
      <div className="space-y-6">
        {JIF_CIRCULARS.map((circular) => (
          <div
            key={circular.id}
            className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-amber-400/60 shadow-xs hover:shadow-md transition-all space-y-5"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/10 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-heading font-black text-sm flex flex-col items-center justify-center shrink-0 shadow-xs">
                  <span className="text-[10px] leading-tight">COM</span>
                  <span className="text-lg leading-none">{circular.numberFormatted}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                      {circular.formattedDate}
                    </span>
                    {circular.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500 text-slate-950">
                        {circular.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-heading font-black text-base sm:text-lg text-brand-navy dark:text-white mt-1 leading-snug">
                    {circular.title}
                  </h4>
                </div>
              </div>

              <span className="text-xs text-slate-400 font-mono shrink-0 self-start sm:self-auto">
                ADCCVC / 2026
              </span>
            </div>

            {/* Optional Quote */}
            {circular.summaryQuote && (
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic bg-slate-50 dark:bg-white/5 p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/5">
                {circular.summaryQuote}
              </p>
            )}

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {circular.highlights.map((h, hIdx) => (
                <div
                  key={hIdx}
                  className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-1">
                    <h5 className="font-bold text-xs text-brand-navy dark:text-white flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{h.title}</span>
                    </h5>
                    {h.badge && (
                      <span className="px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 text-[9px] font-extrabold uppercase">
                        {h.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
