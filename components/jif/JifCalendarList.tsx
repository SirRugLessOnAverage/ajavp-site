'use client';

import { useState } from 'react';
import { JIF_MASTER_EVENTS, JifEvent, getRelativeDateLabel } from '@/data/jif/calendario';
import { resolveGpsLinks } from '@/data/jif/pavilhoes';
import { Calendar, MapPin, Navigation, Map, CheckCircle2, Clock, Filter } from 'lucide-react';

export default function JifCalendarList() {
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [filterPeriod, setFilterPeriod] = useState<'all' | 'upcoming' | 'past'>('all');

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  const sports = [
    { id: 'all', label: 'Todas as Modalidades' },
    { id: 'futsal', label: 'Futsal' },
    { id: 'atletismo', label: 'Atletismo' },
    { id: 'futebol', label: 'Futebol' },
    { id: 'tenis-mesa', label: 'Ténis de Mesa' },
    { id: 'duatlo', label: 'Duatlo' },
    { id: 'praia', label: 'Praia' }
  ];

  const filteredEvents = JIF_MASTER_EVENTS.filter((e: JifEvent) => {
    const matchesSport =
      selectedSport === 'all' ||
      (selectedSport === 'futsal' && e.sport.includes('futsal')) ||
      (selectedSport === 'atletismo' && e.sport.includes('atletismo')) ||
      (selectedSport === 'futebol' && e.sport.includes('futebol')) ||
      (selectedSport === 'tenis-mesa' && e.sport.includes('tenis-mesa')) ||
      (selectedSport === 'duatlo' && e.sport.includes('duatlo')) ||
      (selectedSport === 'praia' && e.sport.includes('praia')) ||
      e.sport === selectedSport;

    const isPast = e.date < todayStr;
    const matchesPeriod =
      filterPeriod === 'all' ||
      (filterPeriod === 'upcoming' && !isPast) ||
      (filterPeriod === 'past' && isPast);

    return matchesSport && matchesPeriod;
  });

  return (
    <div className="space-y-6">
      {/* Filters Header */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs">
        {/* Timing Pill (Todas / Próximas / Concluídas) */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/10 p-1 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setFilterPeriod('all')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filterPeriod === 'all'
                ? 'bg-brand-navy dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Todas as Provas (36)
          </button>
          <button
            type="button"
            onClick={() => setFilterPeriod('upcoming')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filterPeriod === 'upcoming'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Próximas Jornadas
          </button>
          <button
            type="button"
            onClick={() => setFilterPeriod('past')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filterPeriod === 'past'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Concluídas
          </button>
        </div>

        {/* Sports Scrollable Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block shrink-0" />
          {sports.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedSport(s.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedSport === s.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-white/10 text-slate-400">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm">Nenhuma jornada encontrada com os filtros selecionados.</p>
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
                {/* Left side: Date Badge + Details */}
                <div className="flex items-start sm:items-center gap-3.5 flex-1">
                  {/* Calendar Badge */}
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

                  {/* Title & Metadata */}
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

                {/* Right side: 1-Tap GPS Routing */}
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
