'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, Calendar, MapPin, FileText, ArrowRight, Award, Compass, ShieldCheck, Flame, ChevronRight } from 'lucide-react';
import JifPavilhoesList from './JifPavilhoesList';
import JifCalendarList from './JifCalendarList';
import JifComunicadosList from './JifComunicadosList';
import { JIF_MASTER_EVENTS, getRelativeDateLabel } from '@/data/jif/calendario';
import { resolveGpsLinks } from '@/data/jif/pavilhoes';

export type JifTabType = 'geral' | 'calendario' | 'pavilhoes' | 'comunicados';

interface JifHubTabsProps {
  initialTab?: JifTabType;
}

export default function JifHubTabs({ initialTab = 'geral' }: JifHubTabsProps) {
  const [activeTab, setActiveTab] = useState<JifTabType>(initialTab);

  // Sync hash on mount and hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['geral', 'calendario', 'pavilhoes', 'comunicados'].includes(hash)) {
        setActiveTab(hash as JifTabType);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const changeTab = (tab: JifTabType) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${tab}`);
    }
  };

  // Find next 2 upcoming events for the Overview tab
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  const upcomingEvents = JIF_MASTER_EVENTS.filter((e) => e.date >= todayStr).slice(0, 2);

  return (
    <div className="space-y-8">
      {/* Tab Navigation Buttons */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs">
          <button
            type="button"
            onClick={() => changeTab('geral')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'geral'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Visão Geral</span>
          </button>

          <button
            type="button"
            onClick={() => changeTab('calendario')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'calendario'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Calendário (36)</span>
          </button>

          <button
            type="button"
            onClick={() => changeTab('pavilhoes')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'pavilhoes'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Pavilhões & GPS (12)</span>
          </button>

          <button
            type="button"
            onClick={() => changeTab('comunicados')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'comunicados'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Comunicados ADCCVC</span>
          </button>
        </div>
      </div>

      {/* Tab Panes */}
      {activeTab === 'geral' && (
        <div className="space-y-8">
          {/* Virtual Classification Callout Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-navy via-slate-900 to-emerald-950 text-white border border-emerald-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Quadro Concelhio Não-Oficial • 19 Freguesias</span>
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Vilar do Pinheiro no Topo dos XL JIF!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Vitória coletiva no Corta-Mato do Espaço Agros, Sub-11 no Pódio do Futebol em Retorta e 4 equipas ativas no Futsal Concelhio. Consulta a classificação virtual acumulada com base nas regras oficiais da ADCCVC.
              </p>
            </div>

            <Link
              href="/jif/classificacao"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-heading font-black text-xs sm:text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all shrink-0 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Ver Classificação Virtual</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Cards: Próxima Jornada & Pavilhões */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Próximas Provas */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500" />
                  <h4 className="font-heading font-black text-base text-slate-900 dark:text-white">
                    Próximas Jornadas
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => changeTab('calendario')}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {upcomingEvents.length === 0 ? (
                <p className="text-xs text-slate-500">Sem provas agendadas para os próximos dias.</p>
              ) : (
                <div className="space-y-3">
                  {upcomingEvents.map((evt) => {
                    const badge = getRelativeDateLabel(evt.date, todayStr);
                    const gps = resolveGpsLinks(evt.location);
                    return (
                      <div
                        key={evt.id}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex flex-col items-center justify-center shrink-0 font-heading font-black shadow-xs">
                            <span className="text-[8px] uppercase">{evt.month}</span>
                            <span className="text-base leading-none">{evt.day}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h5 className="font-bold text-xs text-slate-900 dark:text-white">
                                {evt.title}
                              </h5>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${badge.color}`}
                              >
                                {badge.text}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              {evt.location} • {evt.time}
                            </p>
                          </div>
                        </div>

                        <a
                          href={gps.maps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] shrink-0 transition-colors"
                          title={`Rota Maps para ${gps.name}`}
                        >
                          GPS
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Recintos Rápidos */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="font-heading font-black text-base text-slate-900 dark:text-white">
                    Recintos &amp; Pavilhões em Destaque
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => changeTab('pavilhoes')}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todos (12)</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">Pav. Modivas</span>
                  <p className="text-[11px] text-slate-500">~6 km • 8 min</p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Modivas+Vila+do+Conde"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-1"
                  >
                    Abrir Rota &rarr;
                  </a>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">Pav. Canidelo</span>
                  <p className="text-[11px] text-slate-500">~7 km • 10 min</p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Canidelo+Vila+do+Conde"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-1"
                  >
                    Abrir Rota &rarr;
                  </a>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">Pav. Fajozes</span>
                  <p className="text-[11px] text-slate-500">~5.5 km • 8 min</p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Fajozes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-1"
                  >
                    Abrir Rota &rarr;
                  </a>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">Caxinas (C2)</span>
                  <p className="text-[11px] text-slate-500">~10 km • 13 min</p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Caxinas+Vila+do+Conde"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-1"
                  >
                    Abrir Rota &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'calendario' && <JifCalendarList />}

      {activeTab === 'pavilhoes' && <JifPavilhoesList />}

      {activeTab === 'comunicados' && <JifComunicadosList />}
    </div>
  );
}
