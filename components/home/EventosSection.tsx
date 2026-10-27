import React from "react";
import { Calendar, MapPin, Trophy, Clock } from "lucide-react";
import type { SiteEvento } from "@/lib/types/database";

interface EventosSectionProps {
  eventos: SiteEvento[];
}

export function EventosSection({ eventos }: EventosSectionProps) {
  return (
    <section id="eventos" className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Agenda Oficial</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
              Próximos Jogos &amp; Provas
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Vem apoiar as equipas e atletas de Vilar do Pinheiro nos pavilhões e pistas!
            </p>
          </div>
        </div>

        {eventos.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-center">
            <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-base text-slate-800 dark:text-slate-200">
              Sem partidas agendadas para os próximos dias
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Acompanha a convocatória semanal dos JIF e os comunicados oficiais na secção desportiva.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventos.map((ev) => {
              const dt = new Date(ev.data_hora);
              const dateStr = dt.toLocaleDateString("pt-PT", {
                weekday: "short",
                day: "2-digit",
                month: "short",
              });
              const timeStr = dt.toLocaleTimeString("pt-PT", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={ev.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 hover:border-amber-300 dark:hover:border-amber-500/30 transition-all shadow-xs hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                        {ev.modalidade_id || "Competição"}
                        {ev.escalao_id ? ` • ${ev.escalao_id}` : ""}
                      </span>
                      {ev.realizado && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-[10px] font-bold">
                          Terminado
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-2">
                      {ev.titulo}
                    </h3>

                    {ev.adversario && (
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 mb-3">
                        <Trophy className="w-3.5 h-3.5 text-amber-500" />
                        <span>vs {ev.adversario}</span>
                        {ev.resultado && (
                          <span className="ml-auto font-black text-brand-green dark:text-emerald-400">
                            {ev.resultado}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>
                        {dateStr} às {timeStr}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{ev.local_nome}</span>
                      </div>
                      {ev.maps_url && (
                        <a
                          href={ev.maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-brand-green dark:text-emerald-400 hover:underline shrink-0 ml-2"
                        >
                          GPS &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
