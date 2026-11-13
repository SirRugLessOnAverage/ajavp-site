"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Trophy,
  Clock,
  ArrowRight,
  Compass,
  Navigation,
  Sparkles,
  Flame,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import type { SiteEvento } from "@/lib/types/database";
import { JIF_MASTER_EVENTS, getRelativeDateLabel } from "@/data/jif/calendario";
import { FUTSAL_JORNADAS } from "@/data/jif/futsal-jogos";
import { JIF_VENUES } from "@/data/jif/pavilhoes";

export interface AgendaMatchCenterProps {
  eventos: SiteEvento[];
}

export interface DynamicAgendaItem {
  id: string;
  dateStr: string; // YYYY-MM-DD
  timeLabel: string;
  categoryLabel: string;
  sportKey: "futsal" | "tenis-mesa" | "atletismo" | "futebol" | "outras";
  title: string;
  opponent?: string;
  locationName: string;
  mapsUrl?: string;
  wazeUrl?: string;
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

function findVenueInfo(locationText: string, venueId?: string) {
  if (venueId) {
    const byId = JIF_VENUES.find((v) => v.id === venueId);
    if (byId) return { mapsUrl: byId.mapsUrl, wazeUrl: byId.wazeUrl };
  }
  const lower = locationText.toLowerCase();
  const matched = JIF_VENUES.find(
    (v) =>
      lower.includes(v.id) ||
      lower.includes(v.shortName.toLowerCase().replace("pav. ", ""))
  );
  if (matched) return { mapsUrl: matched.mapsUrl, wazeUrl: matched.wazeUrl };

  const encoded = encodeURIComponent(`${locationText} Vila do Conde`);
  return {
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encoded}`,
    wazeUrl: `https://waze.com/ul?q=${encoded}&navigate=yes`,
  };
}

export function buildDynamicAgenda(
  dbEventos: SiteEvento[],
  todayStr: string
): DynamicAgendaItem[] {
  const items: DynamicAgendaItem[] = [];

  // 1. Próxima Jornada de Futsal com jogos detalhados da AJAVP
  const upcomingJornadas = FUTSAL_JORNADAS.filter((j) => j.date >= todayStr);
  const nextJornada = upcomingJornadas[0];

  if (nextJornada) {
    for (const session of nextJornada.venueSessions) {
      for (const match of session.matches) {
        if (match.isAjavp && !match.isCompleted) {
          const isHome = match.homeTeam.toLowerCase().includes("vilar do pinheiro");
          const opponent = isHome ? match.awayTeam : match.homeTeam;
          const venue = findVenueInfo(session.venueName, session.venueId);

          items.push({
            id: `futsal-j${nextJornada.number}-${match.category}-${match.time}`,
            dateStr: nextJornada.date,
            timeLabel: `${match.time.replace(":", "h")}`,
            categoryLabel: `Futsal ${nextJornada.label} • ${match.category}`,
            sportKey: "futsal",
            title: `${match.homeTeam} vs ${match.awayTeam}`,
            opponent,
            locationName: session.venueName,
            mapsUrl: venue.mapsUrl,
            wazeUrl: venue.wazeUrl,
            isAjavpMatch: true,
          });
        }
      }
    }
  }

  // 2. Eventos futuros da base de dados (site_eventos)
  for (const ev of dbEventos) {
    if (ev.realizado) continue;
    const evDateStr = ev.data_hora ? ev.data_hora.slice(0, 10) : "";
    if (!evDateStr || evDateStr < todayStr) continue;

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

    const mId = (ev.modalidade_id || "").toLowerCase();
    let sportKey: DynamicAgendaItem["sportKey"] = "outras";
    if (mId.includes("futsal")) sportKey = "futsal";
    else if (mId.includes("tenis") || mId.includes("mesa")) sportKey = "tenis-mesa";
    else if (mId.includes("atletismo") || mId.includes("corta")) sportKey = "atletismo";
    else if (mId.includes("futebol")) sportKey = "futebol";

    const venue = findVenueInfo(ev.local_nome);

    items.push({
      id: `db-${ev.id}`,
      dateStr: evDateStr,
      timeLabel: timeStr.replace(":", "h"),
      categoryLabel: `${(ev.modalidade_id || "Competição").toUpperCase()}${
        ev.escalao_id ? ` • ${ev.escalao_id.toUpperCase()}` : ""
      }`,
      sportKey,
      title: ev.titulo,
      opponent: ev.adversario || undefined,
      locationName: ev.local_nome,
      mapsUrl: ev.maps_url || venue.mapsUrl,
      wazeUrl: venue.wazeUrl,
      isAjavpMatch: true,
    });
  }

  // 3. Próximas Provas Oficiais do Calendário Mestre dos XL JIF
  const upcomingCalendarEvents = JIF_MASTER_EVENTS.filter(
    (e) => e.date >= todayStr
  );

  for (const calEv of upcomingCalendarEvents) {
    if (nextJornada && calEv.date === nextJornada.date && calEv.sport === "futsal") {
      continue;
    }

    let sportKey: DynamicAgendaItem["sportKey"] = "outras";
    if (calEv.sport === "futsal") sportKey = "futsal";
    else if (calEv.sport === "tenis-mesa") sportKey = "tenis-mesa";
    else if (calEv.sport === "atletismo") sportKey = "atletismo";
    else if (calEv.sport === "futebol") sportKey = "futebol";

    const venue = findVenueInfo(calEv.location);

    items.push({
      id: `cal-${calEv.id}`,
      dateStr: calEv.date,
      timeLabel: calEv.time,
      categoryLabel: SPORT_LABELS[calEv.sport] || "XL JIF 2026/27",
      sportKey,
      title: calEv.title,
      locationName: calEv.location,
      mapsUrl: venue.mapsUrl,
      wazeUrl: venue.wazeUrl,
      isAjavpMatch: calEv.title.toLowerCase().includes("ajavp"),
    });
  }

  // Ordenar cronologicamente por data e hora
  items.sort((a, b) => {
    if (a.dateStr !== b.dateStr) return a.dateStr.localeCompare(b.dateStr);
    return a.timeLabel.localeCompare(b.timeLabel);
  });

  return items;
}

const FILTER_TABS = [
  { key: "todos", label: "Todos os Jogos" },
  { key: "futsal", label: "Futsal JIF" },
  { key: "tenis-mesa", label: "Ténis de Mesa" },
  { key: "atletismo", label: "Corta-Mato / Corrida" },
  { key: "outras", label: "Outras Provas" },
] as const;

export function AgendaMatchCenter({ eventos }: AgendaMatchCenterProps) {
  const [activeFilter, setActiveFilter] = useState<string>("todos");
  const [tempoRestante, setTempoRestante] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const allAgendaItems = useMemo(
    () => buildDynamicAgenda(eventos, todayStr),
    [eventos, todayStr]
  );

  // Spotlight: Próximo jogo da AJAVP ou primeiro evento
  const proximoJogo = useMemo(() => {
    return allAgendaItems.find((i) => i.isAjavpMatch) || allAgendaItems[0] || null;
  }, [allAgendaItems]);

  // Contagem decrescente em tempo real para o Spotlight
  useEffect(() => {
    if (!proximoJogo) return;

    const [ano, mes, dia] = proximoJogo.dateStr.split("-").map(Number);
    // Parse hora aproximada (ex: "08h45" ou "10h00")
    let hora = 9;
    let minuto = 0;
    const horaMatch = proximoJogo.timeLabel.match(/(\d{1,2})h(\d{2})?/i);
    if (horaMatch) {
      hora = parseInt(horaMatch[1], 10);
      if (horaMatch[2]) minuto = parseInt(horaMatch[2], 10);
    }

    const dataAlvo = new Date(ano, mes - 1, dia, hora, minuto, 0).getTime();

    const atualizar = () => {
      const agora = Date.now();
      const diff = dataAlvo - agora;

      if (diff <= 0) {
        setTempoRestante({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
        return;
      }

      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diff / (1000 * 60)) % 60);
      const segundos = Math.floor((diff / 1000) % 60);

      setTempoRestante({ dias, horas, minutos, segundos });
    };

    atualizar();
    const interval = setInterval(atualizar, 1000);
    return () => clearInterval(interval);
  }, [proximoJogo]);

  // Filtragem dos eventos
  const filteredItems = useMemo(() => {
    if (activeFilter === "todos") return allAgendaItems.slice(0, 8);
    return allAgendaItems
      .filter((i) => {
        if (activeFilter === "outras") {
          return i.sportKey === "outras" || i.sportKey === "futebol";
        }
        return i.sportKey === activeFilter;
      })
      .slice(0, 8);
  }, [allAgendaItems, activeFilter]);

  return (
    <section
      id="agenda"
      aria-label="Centro de Jogos & Agenda Desportiva da AJAVP"
      className="py-14 sm:py-20 bg-slate-50 dark:bg-slate-950 transition-colors border-t border-slate-200/80 dark:border-white/5 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Cabeçalho da Secção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-400/30 text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Centro de Jogos &amp; Próximas Jornadas • 2026/27</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight">
              Agenda Desportiva &amp; Próximas Provas
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Acompanha as 36 provas oficiais dos XL JIF e os jogos das nossas equipas de formação. Consulta recintos com rotas GPS num só toque.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/jif#calendario"
              className="motion-press inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-green hover:bg-brand-greenDark text-white font-heading font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-[transform,background-color] duration-160 active:scale-[0.97] group cursor-pointer"
            >
              <span>Ver Calendário Completo (36 Provas)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/jif/classificacao"
              className="motion-press inline-flex items-center gap-2 px-4.5 py-3 rounded-full bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-colors shadow-2xs"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Classificação Geral</span>
            </Link>
          </div>
        </div>

        {/* 1. SPOTLIGHT: PRÓXIMO CONFRONTO AJAVP (CARD NOBRE COM CONTAGEM DECRESCENTE) */}
        {proximoJogo && (
          <div className="relative overflow-hidden rounded-3xl sm:rounded-4xl bg-linear-to-r from-brand-navy via-slate-900 to-emerald-950 text-white border border-white/10 shadow-2xl p-6 sm:p-8 lg:p-10">
            {/* Ambient Glows */}
            <div
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Lado Esquerdo do Spotlight */}
              <div className="lg:col-span-7 space-y-4 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Próximo Jogo AJAVP
                  </span>

                  {(() => {
                    const badge = getRelativeDateLabel(proximoJogo.dateStr, todayStr);
                    return (
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${badge.color}`}>
                        {badge.text}
                      </span>
                    );
                  })()}

                  <span className="text-xs font-bold text-slate-300">
                    {proximoJogo.categoryLabel}
                  </span>
                </div>

                <h3 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                  {proximoJogo.title}
                </h3>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm text-slate-300">
                  <span className="inline-flex items-center gap-1.5 font-bold text-amber-300">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    {new Date(`${proximoJogo.dateStr}T12:00:00`).toLocaleDateString("pt-PT", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                    })}{" "}
                    &bull; {proximoJogo.timeLabel}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    {proximoJogo.locationName}
                  </span>
                </div>

                {/* Botões GPS rápidos para o recinto */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
                    Rotas GPS:
                  </span>
                  {proximoJogo.mapsUrl && (
                    <a
                      href={proximoJogo.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="motion-press inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors active:scale-[0.97]"
                    >
                      <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Google Maps</span>
                    </a>
                  )}
                  {proximoJogo.wazeUrl && (
                    <a
                      href={proximoJogo.wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="motion-press inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors active:scale-[0.97]"
                    >
                      <Compass className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Waze</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Lado Direito do Spotlight: Contagem Decrescente */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-center shadow-xl">
                  <span className="text-[11px] font-black uppercase tracking-widest text-emerald-300 block mb-3">
                    Tempo Restante Para o Jogo
                  </span>

                  <div className="grid grid-cols-4 gap-2 text-center select-none font-heading">
                    <div className="p-2 sm:p-3 rounded-xl bg-slate-900/60 border border-white/10">
                      <span className="block font-black text-2xl sm:text-3xl text-emerald-400 tabular-nums">
                        {tempoRestante.dias}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Dias</span>
                    </div>

                    <div className="p-2 sm:p-3 rounded-xl bg-slate-900/60 border border-white/10">
                      <span className="block font-black text-2xl sm:text-3xl text-emerald-400 tabular-nums">
                        {String(tempoRestante.horas).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Horas</span>
                    </div>

                    <div className="p-2 sm:p-3 rounded-xl bg-slate-900/60 border border-white/10">
                      <span className="block font-black text-2xl sm:text-3xl text-emerald-400 tabular-nums">
                        {String(tempoRestante.minutos).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Min</span>
                    </div>

                    <div className="p-2 sm:p-3 rounded-xl bg-slate-900/60 border border-white/10">
                      <span className="block font-black text-2xl sm:text-3xl text-amber-400 tabular-nums">
                        {String(tempoRestante.segundos).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Seg</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 mt-3.5 leading-snug">
                    Veste a Mancha Verde e vem apoiar os atletas de Vilar do Pinheiro no pavilhão!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. BARRA DE FILTROS POR MODALIDADE (PILLS) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar touch-pan-y scroll-smooth">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`motion-press px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-[transform,background-color,border-color,color] duration-160 ease-out active:scale-[0.97] cursor-pointer shrink-0 border ${
                  isActive
                    ? "bg-brand-navy dark:bg-emerald-500 text-white dark:text-slate-950 border-brand-navy dark:border-emerald-400 shadow-sm"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 border-slate-200 dark:border-white/10"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3. GRELHA DESKTOP & CARROSSEL SNAP MOBILE (MOBILE-NATIVE) */}
        {filteredItems.length === 0 ? (
          <div className="p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-center space-y-2">
            <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
              Sem jogos agendados para esta categoria
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Seleciona &ldquo;Todos os Jogos&rdquo; ou consulta o calendário integral das 36 provas concelhias.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 sm:overflow-visible overflow-x-auto sm:pb-0 pb-4 snap-x snap-mandatory touch-pan-y no-scrollbar sm:grid">
            {filteredItems.map((ev) => {
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
                  className={`motion-card min-w-[285px] sm:min-w-0 snap-start bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border transition-[transform,box-shadow,border-color] duration-160 shadow-xs hover:shadow-xl flex flex-col justify-between ${
                    ev.isAjavpMatch
                      ? "border-emerald-300/90 dark:border-emerald-500/40 ring-1 ring-emerald-500/15"
                      : "border-slate-200/80 dark:border-white/10 hover:border-amber-300 dark:hover:border-amber-500/30"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[10px] sm:text-[11px] truncate">
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

                    <h4 className="font-heading font-black text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                      {ev.title}
                    </h4>

                    {ev.opponent && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                        <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>Adversário: {ev.opponent}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-2.5 text-xs text-slate-700 dark:text-slate-300 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-brand-green dark:text-emerald-400 shrink-0" />
                        <span className="capitalize">{dateFormatted}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-amber-800 dark:text-amber-300 font-bold">
                          {ev.timeLabel}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span className="truncate font-medium">{ev.locationName}</span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {ev.mapsUrl && (
                          <a
                            href={ev.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="motion-press px-2 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 dark:bg-white/10 dark:hover:bg-emerald-500/20 text-[10px] font-black text-brand-green dark:text-emerald-300 transition-colors flex items-center gap-1 active:scale-[0.97]"
                            title="Abrir no Google Maps"
                          >
                            <Navigation className="w-3 h-3" />
                            <span>Maps</span>
                          </a>
                        )}
                        {ev.wazeUrl && (
                          <a
                            href={ev.wazeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="motion-press px-2 py-1 rounded-lg bg-slate-100 hover:bg-cyan-50 dark:bg-white/10 dark:hover:bg-cyan-500/20 text-[10px] font-black text-cyan-700 dark:text-cyan-300 transition-colors flex items-center gap-1 active:scale-[0.97]"
                            title="Abrir no Waze"
                          >
                            <Compass className="w-3 h-3" />
                            <span>Waze</span>
                          </a>
                        )}
                      </div>
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

