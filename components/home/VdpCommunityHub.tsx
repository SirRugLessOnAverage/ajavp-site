import React from "react";
import Link from "next/link";
import {
  MapPin,
  CloudSun,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface WeatherSummary {
  tempMax: number;
  tempMin: number;
  rainProb: number;
  condition: string;
  icon: string;
  ringueStatus: "Ringue Apto" | "Atenção ao Piso" | "Utilizar Pavilhão";
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
    let statusColor = "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-400/30";

    if (rain > 40) {
      ringueStatus = "Utilizar Pavilhão";
      statusColor = "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-400/30";
    } else if (rain > 20) {
      ringueStatus = "Atenção ao Piso";
      statusColor = "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-400/30";
    }

    return { tempMax, tempMin, rainProb: rain, condition, icon, ringueStatus, statusColor };
  } catch {
    return {
      tempMax: 18,
      tempMin: 12,
      rainProb: 15,
      condition: "Clima Ameno",
      icon: "⛅",
      ringueStatus: "Ringue Apto",
      statusColor: "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-400/30",
    };
  }
}

export async function VdpCommunityHub() {
  const weather = await getTodayVdpWeather();

  const contactosUteis = [
    { nome: "Pavilhão de Vilar do Pinheiro", desc: "Recinto Desportivo Oficial", tel: "+351252631200", telLabel: "252 631 200" },
    { nome: "Junta de Freguesia", desc: "Sede Comunitária VdP", tel: "+351229280450", telLabel: "229 280 450" },
    { nome: "Extensão de Saúde VdP", desc: "Atendimento Clínico Local", tel: "+351229280145", telLabel: "229 280 145" },
  ];

  return (
    <section
      aria-label="Hoje em Vilar do Pinheiro e Hub Comunitário"
      className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-white/10 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-brand-green dark:text-emerald-400" />
              <span>Vilar do Pinheiro &bull; Comunidade &amp; Desporto</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
              Hoje na Nossa Terra
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Informação de utilidade diária para atletas, famílias e vizinhos: estado do tempo, condições do piso para treinos e contactos imediatos da freguesia.
            </p>
          </div>

          <Link
            href="/modalidades"
            className="motion-press inline-flex items-center gap-1.5 text-xs font-bold text-brand-green dark:text-emerald-400 hover:underline shrink-0"
          >
            <span>Ver horários de todos os treinos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Cartões de Utilidade Diária */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Meteorologia & Ringue */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <CloudSun className="w-4 h-4 text-amber-500" />
                  Meteo &amp; Ringue Desportivo
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
                Probabilidade de precipitação: <strong className="text-slate-900 dark:text-white">{weather.rainProb}%</strong>
              </div>
            </div>

            <div className={`mt-3 p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 ${weather.statusColor}`}>
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Condição: {weather.ringueStatus}</span>
            </div>
          </div>

          {/* Card 2: Treinos Regulares da Semana */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-500" />
                Treinos da Formação AJAVP
              </span>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Futsal Sub-7 a Sub-16</span>
                  <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-black">Ter &amp; Qui 18h30</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Ténis de Mesa</span>
                  <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-black">Seg &amp; Sex 19h00</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Atletismo / Corta-Mato</span>
                  <span className="text-[11px] font-mono text-blue-700 dark:text-blue-400 font-black">Qua &amp; Sáb 09h30</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Treinos gratuitos para novos atletas com inscrição aberta.
            </p>
          </div>

          {/* Card 3: Contactos Imediatos da Freguesia */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-500" />
                Contactos Rápidos da Freguesia
              </span>

              <div className="space-y-2">
                {contactosUteis.map((c) => (
                  <a
                    key={c.nome}
                    href={`tel:${c.tel}`}
                    className="motion-press p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-white/5 hover:border-emerald-300 dark:hover:border-emerald-500/30 flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-brand-green dark:group-hover:text-emerald-400 transition-colors">
                        {c.nome}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {c.desc}
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/60 group-hover:text-emerald-800 dark:group-hover:text-emerald-200 transition-colors shrink-0">
                      {c.telLabel}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-1">
              <Link
                href="/contactos"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-brand-green dark:hover:text-emerald-400 transition-colors"
              >
                <span>Ver contactos da direção e secretária</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
