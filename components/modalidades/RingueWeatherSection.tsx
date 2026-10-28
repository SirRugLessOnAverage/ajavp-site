import React from "react";
import { MapPin, MessageCircle, ShieldAlert, Droplet } from "lucide-react";

interface OpenMeteoResponse {
  daily: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: (number | null)[];
  };
}

interface DayForecast {
  dateIso: string;
  dayName: string;
  dateStr: string;
  maxTemp: number;
  minTemp: number;
  rain: number;
  icon: string;
  desc: string;
  ringueStatus: "Ringue Apto" | "Atenção Piso" | "Risco Pavilhão";
  ringueClass: string;
}

const DAYS_PT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS_PT = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

function buildFallbackForecast(): DayForecast[] {
  const baseDate = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    return {
      dateIso: d.toISOString().slice(0, 10),
      dayName: i === 0 ? "Hoje" : DAYS_PT[d.getDay()],
      dateStr: `${d.getDate()} ${MONTHS_PT[d.getMonth()]}`,
      maxTemp: 19,
      minTemp: 12,
      rain: 10,
      icon: "⛅",
      desc: "Pouco Nublado",
      ringueStatus: "Ringue Apto",
      ringueClass:
        "bg-emerald-100 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300",
    };
  });
}

async function getWeeklyForecast(): Promise<DayForecast[]> {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=41.27&longitude=-8.66&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FLisbon",
      {
        next: { revalidate: 1800 },
      }
    );
    if (!res.ok) return buildFallbackForecast();

    const data = (await res.json()) as OpenMeteoResponse;
    if (!data?.daily?.time?.length) return buildFallbackForecast();

    return data.daily.time.slice(0, 7).map((timeStr, i) => {
      const date = new Date(`${timeStr}T12:00:00`);
      const dayName = i === 0 ? "Hoje" : DAYS_PT[date.getDay()];
      const dateStr = `${date.getDate()} ${MONTHS_PT[date.getMonth()]}`;
      const maxTemp = Math.round(data.daily.temperature_2m_max[i] ?? 18);
      const minTemp = Math.round(data.daily.temperature_2m_min[i] ?? 11);
      const rain = data.daily.precipitation_probability_max[i] ?? 0;
      const code = data.daily.weathercode[i] ?? 0;

      let icon = "☀️";
      let desc = "Céu Limpo";
      if (code > 2 && code < 50) {
        icon = "⛅";
        desc = "Pouco Nublado";
      } else if (code >= 51 && code <= 67) {
        icon = "🌧️";
        desc = "Chuva Fraca";
      } else if (code >= 80) {
        icon = "⛈️";
        desc = "Aguaceiros";
      }

      let ringueStatus: DayForecast["ringueStatus"] = "Ringue Apto";
      let ringueClass =
        "bg-emerald-100 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300";

      if (rain > 40) {
        ringueStatus = "Risco Pavilhão";
        ringueClass =
          "bg-rose-100 dark:bg-rose-500/10 border-rose-300 dark:border-rose-500/30 text-rose-800 dark:text-rose-300";
      } else if (rain > 20) {
        ringueStatus = "Atenção Piso";
        ringueClass =
          "bg-amber-100 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-300";
      }

      return {
        dateIso: timeStr,
        dayName,
        dateStr,
        maxTemp,
        minTemp,
        rain,
        icon,
        desc,
        ringueStatus,
        ringueClass,
      };
    });
  } catch {
    return buildFallbackForecast();
  }
}

export async function RingueWeatherSection() {
  const days = await getWeeklyForecast();

  return (
    <div
      id="tempo-semana"
      className="bg-linear-to-br from-sky-50 via-white to-blue-50 dark:from-slate-900 dark:via-sky-950 dark:to-slate-950 text-slate-800 dark:text-white rounded-3xl p-6 sm:p-8 border-2 border-sky-200 dark:border-sky-400/30 shadow-2xl relative overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-sky-200/60 dark:border-white/10 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-200 border border-sky-300 dark:border-sky-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span>Tempo Expectável em Tempo Real</span>
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              Vilar do Pinheiro (Vila do Conde)
            </span>
          </div>
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-brand-navy dark:text-white">
            Previsão Meteorológica &amp; Estado do Ringue
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
            Consulta as condições previstas ao longo da semana para planeares os
            treinos e jogos. Em caso de previsão de chuva no ringue ao ar livre,
            as confirmações são emitidas no WhatsApp oficial.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <a
            href="https://chat.whatsapp.com/BLxsjBfDw7AEAonDy72187"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl font-heading font-bold text-xs shadow-lg transition-colors motion-press whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Avisos de Treino no WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Weather Grid: 7 Days */}
      <div className="mt-6 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {days.map((day, i) => (
            <div
              key={day.dateIso}
              className={`bg-white dark:bg-white/5 hover:bg-sky-50/70 dark:hover:bg-white/10 motion-card rounded-2xl p-3.5 border ${
                i === 0
                  ? "border-sky-500 bg-sky-50/80 dark:bg-sky-900/30 ring-2 ring-sky-400/40 shadow-sm"
                  : "border-slate-200 dark:border-white/10 shadow-xs"
              } flex flex-col justify-between text-center relative group`}
            >
              {i === 0 && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-sky-600 dark:bg-sky-400 text-white dark:text-slate-950 font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow">
                  Hoje
                </span>
              )}
              <div>
                <div
                  className={`text-xs font-bold ${
                    i === 0
                      ? "text-sky-800 dark:text-sky-300"
                      : "text-slate-800 dark:text-slate-300"
                  }`}
                >
                  {day.dayName}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mb-2">
                  {day.dateStr}
                </div>
                <div
                  className="text-3xl my-1 select-none"
                  aria-hidden="true"
                >
                  {day.icon}
                </div>
                <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 truncate mt-0.5">
                  {day.desc}
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 dark:border-white/10 space-y-1.5">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                  <span className="text-slate-900 dark:text-white">
                    {day.maxTemp}°
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                    / {day.minTemp}°
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1 text-[10px] text-sky-700 dark:text-sky-300 font-semibold">
                  <Droplet className="w-3 h-3" />
                  <span>{day.rain}% chuva</span>
                </div>
                <div
                  className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md border ${day.ringueClass} tracking-tight`}
                >
                  {day.ringueStatus}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footnote / Ringue advice */}
      <div className="mt-6 pt-5 border-t border-sky-200/60 dark:border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-700 dark:text-slate-300 relative z-10">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            <strong>Regra para o Ringue:</strong> Em dias de chuva persistente
            ou piso escorregadio, o treino transita para pavilhão coberto ou
            trabalho funcional/teórico.
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />{" "}
            Ringue Apto
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400" />{" "}
            Atenção ao Piso
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 dark:bg-rose-400" />{" "}
            Risco Pavilhão
          </span>
        </div>
      </div>
    </div>
  );
}

