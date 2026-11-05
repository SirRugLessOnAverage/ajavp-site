import React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  ArrowRight,
  Trophy,
  Flame,
} from "lucide-react";
import { JIF_MASTER_EVENTS, type JifEvent } from "@/data/jif/calendario";

const SPORT_CONFIG: Record<
  string,
  { label: string; icon: string; badgeClass: string }
> = {
  futsal: {
    label: "Futsal",
    icon: "⚽",
    badgeClass:
      "bg-blue-100 text-blue-900 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700/50",
  },
  "tenis-mesa": {
    label: "Ténis de Mesa",
    icon: "🏓",
    badgeClass:
      "bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700/50",
  },
  atletismo: {
    label: "Atletismo",
    icon: "🏃",
    badgeClass:
      "bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700/50",
  },
  futebol: {
    label: "Futebol 7",
    icon: "⚽",
    badgeClass:
      "bg-green-100 text-green-900 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700/50",
  },
  duatlo: {
    label: "Duatlo BTT",
    icon: "🚴",
    badgeClass:
      "bg-purple-100 text-purple-900 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-700/50",
  },
  "badminton futsal": {
    label: "Badminton & Futsal",
    icon: "🏸",
    badgeClass:
      "bg-pink-100 text-pink-900 border-pink-200 dark:bg-pink-900/40 dark:text-pink-300 dark:border-pink-700/50",
  },
  praia: {
    label: "Fut. Praia",
    icon: "🏖️",
    badgeClass:
      "bg-yellow-100 text-yellow-900 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-700/50",
  },
  all: {
    label: "Cerimónia Oficial",
    icon: "🏆",
    badgeClass:
      "bg-slate-200 text-slate-900 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-white/10",
  },
};

export function formatPortugueseDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

export function getWeekdayName(dateStr: string): string {
  const dt = new Date(`${dateStr}T12:00:00`);
  const raw = dt.toLocaleDateString("pt-PT", { weekday: "long" });
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

export function getRelativeBadge(
  dateStr: string,
  todayStr: string
): { label: string; isLive: boolean; badgeClass: string } {
  if (dateStr === todayStr) {
    return {
      label: "Hoje no Terreno",
      isLive: true,
      badgeClass:
        "bg-emerald-500 text-white font-black shadow-xs ring-2 ring-emerald-400/40",
    };
  }

  const d1 = new Date(`${dateStr}T00:00:00`);
  const d0 = new Date(`${todayStr}T00:00:00`);
  const diffDays = Math.round(
    (d1.getTime() - d0.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 1) {
    return {
      label: "Amanhã",
      isLive: false,
      badgeClass: "bg-amber-400 text-slate-950 font-black shadow-xs",
    };
  }

  if (diffDays > 1 && diffDays <= 7) {
    const weekday = getWeekdayName(dateStr);
    return {
      label: `Este ${weekday}`,
      isLive: false,
      badgeClass:
        "bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-300 font-bold border border-amber-300/60 dark:border-amber-400/30",
    };
  }

  if (diffDays > 7) {
    return {
      label: `Em ${diffDays} dias`,
      isLive: false,
      badgeClass:
        "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300 font-semibold",
    };
  }

  return {
    label: "Concluído",
    isLive: false,
    badgeClass: "bg-slate-200 text-slate-600 dark:bg-white/5 dark:text-slate-400",
  };
}

export function getUpcomingEvents(
  events: JifEvent[] = JIF_MASTER_EVENTS,
  now: Date = new Date(),
  limit: number = 3
): JifEvent[] {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const todayStr = `${year}-${month}-${day}`;

  const upcoming = events.filter((e) => e.date >= todayStr);
  if (upcoming.length >= limit) {
    return upcoming.slice(0, limit);
  }
  if (upcoming.length > 0) {
    return upcoming;
  }
  // Se toda a época estiver concluída, devolve os últimos eventos
  return events.slice(-limit);
}

export function JifLiveTicker() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const todayStr = `${year}-${month}-${day}`;

  const upcoming = getUpcomingEvents(JIF_MASTER_EVENTS, now, 3);

  return (
    <section className="bg-white dark:bg-slate-900/90 border-b border-slate-200/90 dark:border-white/10 py-5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Barra */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                XL JIF 2026/2027
              </span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
              <h2 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                Próximas Provas em Calendário
              </h2>
            </div>
          </div>

          <Link
            href="/jif#calendario"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green dark:text-emerald-400 hover:text-brand-greenDark dark:hover:text-emerald-300 group transition-colors"
          >
            <span>Ver calendário completo (36 provas)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grelha das Próximas Provas (Formato Português DD/MM/YYYY) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {upcoming.map((ev) => {
            const datePt = formatPortugueseDate(ev.date);
            const weekday = getWeekdayName(ev.date);
            const relBadge = getRelativeBadge(ev.date, todayStr);
            const sportCfg = SPORT_CONFIG[ev.sport] || {
              label: ev.sport,
              icon: "🏅",
              badgeClass: "bg-slate-100 text-slate-800",
            };

            return (
              <Link
                key={ev.id}
                href="/jif#calendario"
                className="group p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/90 dark:border-white/10 hover:border-emerald-500/60 dark:hover:border-emerald-400/60 hover:shadow-md transition-all flex flex-col justify-between space-y-3 cursor-pointer"
              >
                {/* Linha Topo: Modalidade & Badge Relativo */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${sportCfg.badgeClass}`}
                  >
                    <span>{sportCfg.icon}</span>
                    <span>{sportCfg.label}</span>
                  </span>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${relBadge.badgeClass}`}
                  >
                    {relBadge.isLive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white inline-block mr-1 animate-ping" />
                    )}
                    {relBadge.label}
                  </span>
                </div>

                {/* Data Central em Formato Português DD/MM/YYYY */}
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-black text-xl text-brand-navy dark:text-emerald-400 font-mono tracking-tight">
                      {datePt}
                    </span>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      {weekday}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 mt-1 leading-snug group-hover:text-brand-green dark:group-hover:text-emerald-300 transition-colors">
                    {ev.title}
                  </h3>
                </div>

                {/* Linha Rodapé: Horário & Local */}
                <div className="pt-2 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 font-medium truncate max-w-[190px]">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{ev.location}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-amber-800 dark:text-amber-300 shrink-0">
                    <Clock className="w-3 h-3 shrink-0" />
                    <span>{ev.time.split(" ")[0]}</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
