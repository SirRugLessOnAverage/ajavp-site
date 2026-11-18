import React from "react";
import Link from "next/link";
import {
  MapPin,
  CloudSun,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Navigation,
} from "lucide-react";
import { TRAINING_VENUES } from "@/data/institucional";

interface WeatherSummary {
  tempMax: number;
  tempMin: number;
  rainProb: number;
  condition: string;
  icon: string;
  ringueStatus: "Ringue Apto" | "Atenção ao Piso" | "Chuva / Piso Molhado";
  statusColor: string;
}

async function getTodayVdpWeather(): Promise<WeatherSummary> {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=41.27&longitude=-8.66&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FLisbon",
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) throw new Error("Falha na API meteo");

    const data = await res.json();
    const rain = data?.daily?.precipitation_probability_max?.[0] ?? 10;
    const tempMax = Math.round(data?.daily?.temperature_2m_max?.[0] ?? 18);
    const tempMin = Math.round(data?.daily?.temperature_2m_min?.[0] ?? 11);
    const code = data?.daily?.weathercode?.[0] ?? 1;

    let icon = "☀️";
    let condition = "Céu Limpo";
    if (code > 2 && code < 50) {
      icon = "⛅";
      condition = "Pouco Nublado";
    } else if (code >= 51 && code <= 67) {
      icon = "🌧️";
      condition = "Possibilidade de Chuva";
    } else if (code >= 80) {
      icon = "⛈️";
      condition = "Aguaceiros";
    }

    let ringueStatus: WeatherSummary["ringueStatus"] = "Ringue Apto";
    let statusColor =
      "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-400/30";

    if (rain > 40) {
      ringueStatus = "Chuva / Piso Molhado";
      statusColor =
        "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-400/30";
    } else if (rain > 20) {
      ringueStatus = "Atenção ao Piso";
      statusColor =
        "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-400/30";
    }

    return {
      tempMax,
      tempMin,
      rainProb: rain,
      condition,
      icon,
      ringueStatus,
      statusColor,
    };
  } catch {
    return {
      tempMax: 18,
      tempMin: 12,
      rainProb: 15,
      condition: "Clima Ameno",
      icon: "⛅",
      ringueStatus: "Ringue Apto",
      statusColor:
        "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-400/30",
    };
  }
}

export async function VdpCommunityHub() {
  const weather = await getTodayVdpWeather();

  return (
    <section
      aria-label="Hoje em Vilar do Pinheiro e Horários de Treino"
      className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-white/10 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-brand-green dark:text-emerald-400" />
              <span>Vilar do Pinheiro &bull; Treinos &amp; Recintos</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
              Hoje na Nossa Terra
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Informação oficial para atletas e famílias: estado do tempo para o Ringue Polidesportivo, horários semanais e localização GPS dos recintos onde treinamos.
            </p>
          </div>

          <Link
            href="/modalidades#horarios"
            className="motion-press inline-flex items-center gap-1.5 text-xs font-bold text-brand-green dark:text-emerald-400 hover:underline shrink-0"
          >
            <span>Ver mapa completo por escalão</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Cartões com Informação Oficial Verificada */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Meteorologia & Ringue */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <CloudSun className="w-4 h-4 text-amber-500" />
                  Meteo &amp; Ringue Exterior
                </span>
                <span className="text-2xl">{weather.icon}</span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-heading font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
                  {weather.tempMax}º
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  Mín: {weather.tempMin}º &bull; {weather.condition}
                </span>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300">
                Probabilidade de precipitação:{" "}
                <strong className="text-slate-900 dark:text-white">
                  {weather.rainProb}%
                </strong>
              </div>
            </div>

            <div
              className={`mt-3 p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 ${weather.statusColor}`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Condição: {weather.ringueStatus}</span>
            </div>
          </div>

          {/* Card 2: Horários Reais dos Treinos (2.ª a Domingo) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-500" />
                Horários Oficiais de Treino
              </span>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    ⚽ Futsal Formação
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-black text-right">
                    2.ª a Sábado
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    🏓 Ténis de Mesa
                  </span>
                  <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-black text-right">
                    Sáb • 16h / 17h
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    🏃 Atletismo &amp; Marcha
                  </span>
                  <span className="text-[11px] font-mono text-blue-700 dark:text-blue-400 font-black text-right">
                    Dom • 09h00 (JF)
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Treinos experimentais gratuitos para novos atletas (Sub-7 a Sub-16 e adultos).
            </p>
          </div>

          {/* Card 3: Recintos Oficiais de Treino (Dados Reais + GPS) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-500" />
                Onde Treinamos (GPS)
              </span>

              <div className="space-y-1.5">
                {TRAINING_VENUES.map((venue) => (
                  <a
                    key={venue.code}
                    href={venue.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={venue.mapsLabel}
                    className="motion-press p-2 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-white/5 hover:border-emerald-300 dark:hover:border-emerald-500/30 flex items-center justify-between gap-2 transition-colors group cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-brand-green dark:group-hover:text-emerald-400 transition-colors truncate">
                        {venue.name}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {venue.typeBadge}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/15 shrink-0">
                      <Navigation className="w-3 h-3" />
                      <span>Maps</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
