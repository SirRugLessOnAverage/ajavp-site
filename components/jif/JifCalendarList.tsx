'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  JIF_MASTER_EVENTS,
  JifEvent,
  getRelativeDateLabel,
  getListaMesesCalendario,
  getEventosProximasDuasSemanas,
  type MesCalendarioInfo,
} from '@/data/jif/calendario';
import { resolveGpsLinks } from '@/data/jif/pavilhoes';
import {
  Calendar,
  MapPin,
  Navigation,
  Map,
  CheckCircle2,
  Clock,
  Filter,
  Zap,
  Sparkles,
} from 'lucide-react';

export default function JifCalendarList() {
  const [selectedSport, setSelectedSport] = useState<string>('all');
  
  // Chave do mês ('YYYY-MM'), '2semanas' ou 'all'
  const [activeView, setActiveView] = useState<string>('2semanas');

  const now = useMemo(() => new Date(), []);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;
  const currentMonthKey = `${year}-${month}`;

  const listaMeses = useMemo(() => getListaMesesCalendario(JIF_MASTER_EVENTS), []);
  const eventos2Semanas = useMemo(() => getEventosProximasDuasSemanas(JIF_MASTER_EVENTS, now), [now]);

  // Se não houver eventos nas próximas 2 semanas, seleciona o mês corrente ou o próximo mês com provas
  useEffect(() => {
    if (eventos2Semanas.length === 0) {
      const mesAtualTemEventos = listaMeses.some((m) => m.chave === currentMonthKey);
      if (mesAtualTemEventos) {
        setActiveView(currentMonthKey);
      } else {
        const proximoMes = listaMeses.find((m) => m.chave > currentMonthKey);
        if (proximoMes) {
          setActiveView(proximoMes.chave);
        } else {
          setActiveView('all');
        }
      }
    }
  }, [eventos2Semanas.length, currentMonthKey, listaMeses]);

  const sports = [
    { id: 'all', label: 'Todas as Modalidades' },
    { id: 'futsal', label: '⚽ Futsal' },
    { id: 'atletismo', label: '🏃 Atletismo' },
    { id: 'futebol', label: '⚽ Futebol' },
    { id: 'tenis-mesa', label: '🏓 Ténis de Mesa' },
    { id: 'duatlo', label: '🚴 Duatlo' },
    { id: 'praia', label: '🏐 Praia' },
  ];

  // Filtragem combinada: Período/Mês + Modalidade
  const filteredEvents = useMemo(() => {
    return JIF_MASTER_EVENTS.filter((e: JifEvent) => {
      // 1. Filtro de Modalidade
      const matchesSport =
        selectedSport === 'all' ||
        (selectedSport === 'futsal' && e.sport.includes('futsal')) ||
        (selectedSport === 'atletismo' && e.sport.includes('atletismo')) ||
        (selectedSport === 'futebol' && e.sport.includes('futebol')) ||
        (selectedSport === 'tenis-mesa' && e.sport.includes('tenis-mesa')) ||
        (selectedSport === 'duatlo' && e.sport.includes('duatlo')) ||
        (selectedSport === 'praia' && e.sport.includes('praia')) ||
        e.sport === selectedSport;

      if (!matchesSport) return false;

      // 2. Filtro Temporal (2 Semanas, Mês Específico ou Todas)
      if (activeView === '2semanas') {
        const limite14Dias = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
        const limStr = `${limite14Dias.getFullYear()}-${String(limite14Dias.getMonth() + 1).padStart(2, '0')}-${String(limite14Dias.getDate()).padStart(2, '0')}`;
        return e.date >= todayStr && e.date <= limStr;
      }

      if (activeView === 'all') {
        return true;
      }

      // Se for uma chave de mês "YYYY-MM"
      return e.date.startsWith(activeView);
    });
  }, [selectedSport, activeView, todayStr, now]);

  return (
    <div className="space-y-6">
      {/* 1. SELETOR DE VISUALIZAÇÃO TEMPORAL (Abas de Mês & 2 Semanas) */}
      <div className="bg-white dark:bg-slate-900/80 p-3 sm:p-4 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span>Navegação Temporal da Época 2026/2027</span>
          </div>
          <span className="text-[11px] text-slate-400">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'prova' : 'provas'}
          </span>
        </div>

        {/* Abas com Scroll Horizontal Suave */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {/* Botão Especial em Destaque: Próximas 2 Semanas */}
          <button
            type="button"
            onClick={() => setActiveView('2semanas')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeView === '2semanas'
                ? 'bg-amber-400 text-slate-950 shadow-md scale-102 ring-2 ring-amber-400/30'
                : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-300/60 dark:border-amber-400/30 hover:bg-amber-500/20'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Próximas 2 Semanas</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-mono">
              {eventos2Semanas.length}
            </span>
          </button>

          <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-1 shrink-0" />

          {/* Abas Individuais dos Meses da Época */}
          {listaMeses.map((m: MesCalendarioInfo) => {
            const isSelected = activeView === m.chave;
            const isCurrentMonth = m.chave === currentMonthKey;

            return (
              <button
                key={m.chave}
                type="button"
                onClick={() => setActiveView(m.chave)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-brand-navy dark:bg-white text-white dark:text-slate-950 shadow-xs'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                <span>{m.mesAbrev} {m.ano.substring(2)}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900'
                      : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {m.totalEventos}
                </span>
                {isCurrentMonth && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Mês Corrente" />
                )}
              </button>
            );
          })}

          <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-1 shrink-0" />

          {/* Botão Ver Época Completa */}
          <button
            type="button"
            onClick={() => setActiveView('all')}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
              activeView === 'all'
                ? 'bg-brand-navy dark:bg-white text-white dark:text-slate-950 shadow-xs'
                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
            }`}
          >
            Época Completa (36)
          </button>
        </div>
      </div>

      {/* 2. FILTROS POR MODALIDADE */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none px-1">
        <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block shrink-0" />
        {sports.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelectedSport(s.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedSport === s.id
                ? 'bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 font-bold shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Banner Informativo se Modo "Próximas 2 Semanas" estiver ativo */}
      {activeView === '2semanas' && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200/80 dark:border-amber-400/20 text-xs text-amber-950 dark:text-amber-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              A exibir apenas as provas marcadas para as <strong>próximas 2 semanas</strong> a partir de hoje ({todayStr}).
            </span>
          </div>
          <button
            type="button"
            onClick={() => setActiveView('all')}
            className="text-amber-800 dark:text-amber-300 font-bold hover:underline shrink-0 cursor-pointer"
          >
            Ver todas &rarr;
          </button>
        </div>
      )}

      {/* 3. LISTA DE JORNADAS */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-white/10 text-slate-400 space-y-2">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
              Nenhuma jornada agendada para este filtro.
            </p>
            <p className="text-xs text-slate-400">
              Experimenta selecionar outro mês ou ver a <button type="button" onClick={() => setActiveView('all')} className="text-brand-green font-bold underline cursor-pointer">Época Completa</button>.
            </p>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const isPast = event.date < todayStr;
            const badge = getRelativeDateLabel(event.date, todayStr);
            const gps = resolveGpsLinks(event.location);

            return (
              <div
                key={event.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isPast
                    ? 'bg-white/80 dark:bg-slate-900/60 border-slate-200/80 dark:border-white/5 opacity-85 hover:opacity-100'
                    : 'bg-white dark:bg-slate-900 border-amber-300/80 dark:border-amber-400/40 shadow-xs hover:shadow-md'
                }`}
              >
                {/* Lado Esquerdo: Badge Calendário + Detalhes */}
                <div className="flex items-start sm:items-center gap-3.5 flex-1">
                  <div
                    className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 font-heading font-black shadow-xs ${
                      isPast
                        ? 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                        : 'bg-amber-500 text-slate-950 shadow-md'
                    }`}
                  >
                    <span className="text-[9px] uppercase tracking-wider">{event.month}</span>
                    <span className="text-lg leading-tight">{event.day}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                        {event.title}
                      </h4>
                      {isPast ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>Concluído</span>
                        </span>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${badge.color} ${
                            badge.pulse ? 'animate-pulse' : ''
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          <span>{badge.text}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{event.location}</span>
                      </span>
                      <span className="hidden sm:inline text-slate-300 dark:text-white/20">&bull;</span>
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>

                {/* Lado Direito: Acesso GPS a 1 Toque (Maps & Waze) */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-white/5 w-full md:w-auto justify-end">
                  <a
                    href={gps.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs shadow-2xs hover:shadow-sm transition-all"
                    title={`Abrir rota no Google Maps para ${gps.name}`}
                  >
                    <Map className="w-3.5 h-3.5" />
                    <span>Maps</span>
                  </a>
                  <a
                    href={gps.waze}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-heading font-bold text-xs shadow-2xs hover:shadow-sm transition-all"
                    title={`Abrir rota no Waze para ${gps.name}`}
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Waze</span>
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
