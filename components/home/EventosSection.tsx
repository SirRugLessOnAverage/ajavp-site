import React from "react";
import Link from "next/link";
import { Calendar, MapPin, Trophy, Clock, ArrowRight } from "lucide-react";
import type { SiteEvento } from "@/lib/types/database";
import { JIF_MASTER_EVENTS, getRelativeDateLabel } from "@/data/jif/calendario";
import { FUTSAL_JORNADAS } from "@/data/jif/futsal-jogos";
import { JIF_VENUES } from "@/data/jif/pavilhoes";

interface EventosSectionProps {
  eventos: SiteEvento[];
}

interface DynamicAgendaItem {
  id: string;
  dateStr: string; // YYYY-MM-DD
  timeLabel: string;
  categoryLabel: string;
  title: string;
  opponent?: string;
  locationName: string;
  mapsUrl?: string;
  isAjavpMatch?: boolean;
}

const SPORT_LABELS: Record<string, string> = {
  futsal: "Futsal • XL JIF",
  futebol: "Futebol 7 • XL JIF",
  atletismo: "Atletismo • XL JIF",
  "tenis-mesa": "Ténis de Mesa • XL JIF",
  duatlo: "Duatlo BTT • XL JIF",
  "badminton futsal": "Badminton & Futsal • XL JIF",
  praia: "Futebol de Praia • XL JIF",
  all: "Cerimónia Oficial • XL JIF",
};

function findMapsUrlForLocation(locationText: string, venueId?: string): string {
  if (venueId) {
    const byId = JIF_VENUES.find((v) => v.id === venueId);
    if (byId) return byId.mapsUrl;
  }
  const lower = locationText.toLowerCase();
  const matched = JIF_VENUES.find(
    (v) =>
      lower.includes(v.id) ||
      lower.includes(v.shortName.toLowerCase().replace("pav. ", ""))
  );
  if (matched) return matched.mapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${locationText} Vila do Conde`
  )}`;
}

function buildDynamicAgenda(
  dbEventos: SiteEvento[],
  todayStr: string
): DynamicAgendaItem[] {
  const items: DynamicAgendaItem[] = [];

  // 1. Próxima Jornada de Futsal com jogos detalhados da AJAVP (se existir data >= hoje)
  const upcomingJornadas = FUTSAL_JORNADAS.filter((j) => j.date >= todayStr);
  const nextJornada = upcomingJornadas[0];

  if (nextJornada) {
    for (const session of nextJornada.venueSessions) {
      for (const match of session.matches) {
        if (match.isAjavp && !match.isCompleted) {
          const isHome = match.homeTeam.toLowerCase().includes("vilar do pinheiro");
          const opponent = isHome ? match.awayTeam : match.homeTeam;
          items.push({
            id: `futsal-j${nextJornada.number}-${match.category}-${match.time}`,
            dateStr: nextJornada.date,
            timeLabel: `${match.time.replace(":", "h")}`,
            categoryLabel: `Futsal ${nextJornada.label} • ${match.category}`,
            title: `${match.homeTeam} vs ${match.awayTeam}`,
            opponent,
            locationName: session.venueName,
            mapsUrl: findMapsUrlForLocation(session.venueName, session.venueId),
            isAjavpMatch: true,
          });
        }
      }
    }
  }

  // 2. Eventos futuros específicos na base de dados (site_eventos) com data >= hoje
  for (const ev of dbEventos) {
    if (ev.realizado) continue;
    const evDateStr = ev.data_hora ? ev.data_hora.slice(0, 10) : "";
    if (!evDateStr || evDateStr < todayStr) continue;

    // Evitar duplicar se já estiver coberto pelos jogos detalhados da próxima jornada
    const isDuplicate = items.some(
      (i) =>
        i.dateStr === evDateStr &&
        ev.escalao_id &&
        i.categoryLabel.toLowerCase().includes(ev.escalao_id.toLowerCase())
    );
    if (isDuplicate) continue;

    const dt = new Date(ev.data_hora);
    const timeStr = dt.toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
    });

    items.push({
      id: `db-${ev.id}`,
      dateStr: evDateStr,
      timeLabel: timeStr.replace(":", "h"),
      categoryLabel: `${(ev.modalidade_id || "Competição").toUpperCase()}${
        ev.escalao_id ? ` • ${ev.escalao_id.toUpperCase()}` : ""
      }`,
      title: ev.titulo,
      opponent: ev.adversario || undefined,
      locationName: ev.local_nome,
      mapsUrl: ev.maps_url || findMapsUrlForLocation(ev.local_nome),
      isAjavpMatch: true,
    });
  }

  // 3. Próximas Provas Oficiais do Calendário Mestre dos XL JIF (date >= hoje)
  const upcomingCalendarEvents = JIF_MASTER_EVENTS.filter(
    (e) => e.date >= todayStr
  );

  for (const calEv of upcomingCalendarEvents) {
    // Se já desdobrámos os jogos individuais da AJAVP para a nextJornada nesta mesma data, não repetir o cartão genérico dessa jornada
    if (nextJornada && calEv.date === nextJornada.date && calEv.sport === "futsal") {
      continue;
    }

    items.push({
      id: `cal-${calEv.id}`,
      dateStr: calEv.date,
      timeLabel: calEv.time,
      categoryLabel: SPORT_LABELS[calEv.sport] || "XL JIF 2026/27",
      title: calEv.title,
      locationName: calEv.location,
      mapsUrl: findMapsUrlForLocation(calEv.location),
      isAjavpMatch: calEv.title.toLowerCase().includes("ajavp"),
    });
  }

  // Ordenar cronologicamente por data e hora e devolver os próximos 6
  items.sort((a, b) => {
    if (a.dateStr !== b.dateStr) return a.dateStr.localeCompare(b.dateStr);
    return a.timeLabel.localeCompare(b.timeLabel);
  });

  return items.slice(0, 6);
}

export function EventosSection({ eventos }: EventosSectionProps) {
  const todayStr = new Date().toISOString().slice(0, 10);
  const agendaItems = buildDynamicAgenda(eventos, todayStr);

  return (
    <section
      id="eventos"
      className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors border-t border-slate-200/70 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-300/60 dark:border-amber-400/30">
              <Calendar className="w-3.5 h-3.5" />
              <span>Agenda Oficial Dinâmica • Época 2026/2027</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
              Próximos Jogos &amp; Provas
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Atualizado automaticamente conforme o calendário avança. Vem apoiar Vilar do Pinheiro nos pavilhões e pistas!
            </p>
          </div>

          <Link
            href="/jif#calendario"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-green dark:text-emerald-400 hover:text-brand-greenDark transition-colors group shrink-0"
          >
            <span>Ver calendário completo (35 provas)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {agendaItems.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-center">
            <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-base text-slate-800 dark:text-slate-200">
              Época Desportiva Concluída
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Consulta todos os resultados homologados e classificações no Portal Oficial dos JIF.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agendaItems.map((ev) => {
              const dt = new Date(`${ev.dateStr}T12:00:00`);
              const dateFormatted = dt.toLocaleDateString("pt-PT", {
                weekday: "short",
                day: "2-digit",
                month: "short",
              });
              const relBadge = getRelativeDateLabel(ev.dateStr, todayStr);

              return (
                <article
                  key={ev.id}
                  className={`bg-white dark:bg-slate-900 rounded-3xl p-6 border transition-all shadow-xs hover:shadow-xl flex flex-col justify-between ${
                    ev.isAjavpMatch
                      ? "border-emerald-300/90 dark:border-emerald-500/40 ring-1 ring-emerald-500/15"
                      : "border-slate-200/80 dark:border-white/10 hover:border-amber-300 dark:hover:border-amber-500/30"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs mb-3">
                      <span className="font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wide text-[11px]">
                        {ev.categoryLabel}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 flex items-center gap-1 ${relBadge.color}`}
                      >
                        {relBadge.pulse && (
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                        )}
                        <span>{relBadge.text}</span>
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-2.5 leading-snug">
                      {ev.title}
                    </h3>

                    {ev.opponent && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-xs font-bold text-emerald-900 dark:text-emerald-300 mb-3">
                        <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>Adversário: {ev.opponent}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-2 text-xs text-slate-700 dark:text-slate-300 mt-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-brand-green dark:text-emerald-400 shrink-0" />
                      <span className="capitalize">{dateFormatted}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-amber-800 dark:text-amber-300 font-bold">
                        {ev.timeLabel}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                        <span className="truncate">{ev.locationName}</span>
                      </div>
                      {ev.mapsUrl && (
                        <a
                          href={ev.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 dark:bg-white/10 dark:hover:bg-emerald-500/20 text-[11px] font-bold text-brand-green dark:text-emerald-300 transition-colors shrink-0"
                        >
                          <span>GPS</span>
                          <span>&rarr;</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
