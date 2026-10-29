"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, ChevronRight, Sparkles } from "lucide-react";
import { getProximoEventoJif, type ProximoEventoInfo } from "@/data/jif/calendario";

interface DynamicTopBannerProps {
  filtroSport?: string;
  className?: string;
}

export function DynamicTopBanner({
  filtroSport = "all",
  className = "",
}: DynamicTopBannerProps) {
  // Inicialização estável para evitar hydration mismatch e cálculo dinâmico no cliente
  const [info, setInfo] = useState<ProximoEventoInfo | null>(null);

  useEffect(() => {
    const eventoProximo = getProximoEventoJif(filtroSport);
    setInfo(eventoProximo);
  }, [filtroSport]);

  // Se ainda estiver a hidratar ou não houver evento futuro iminente, renderiza fallback institucional
  if (!info || !info.evento) {
    return (
      <div
        className={`bg-brand-green text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium shadow-inner flex items-center justify-center gap-2 ${className}`}
      >
        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-white text-brand-green uppercase tracking-wider">
          Inscrições Abertas
        </span>
        <span>
          &quot;Vem e Traz um Amigo&quot; &bull; Treinos e atividades para todas as idades na AJAVP! 🤩
        </span>
        <a
          href="https://ajavp-gestao.vercel.app/inscricao"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-amber-200 font-semibold ml-1 hidden sm:inline"
        >
          Inscreve-te &rarr;
        </a>
      </div>
    );
  }

  const { evento, labelRelativo, ehHoje, diasRestantes } = info;
  const isFutsal = evento.sport === "futsal";
  const destinoUrl = isFutsal ? "/jif/futsal" : "/jif#calendario";

  return (
    <div
      className={`bg-brand-green text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 text-center font-medium shadow-inner flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 transition-colors ${className}`}
    >
      {/* Badge Dinâmica baseada no calendário */}
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider ${
          labelRelativo.color
        } ${labelRelativo.pulse ? "animate-pulse" : ""}`}
      >
        {ehHoje && <span className="w-1.5 h-1.5 rounded-full bg-emerald-950 animate-ping" />}
        <span>{labelRelativo.text}</span>
      </span>

      {/* Título & Horário Dinâmico da Prova */}
      <span className="truncate max-w-[280px] xs:max-w-xs sm:max-w-md md:max-w-xl font-medium">
        <strong className="font-bold">{evento.title.split("•")[0]?.trim()}</strong>
        {evento.location && (
          <span className="opacity-90 hidden md:inline">
            {" "}
            &bull; {evento.location.split("(")[0]?.trim()}
          </span>
        )}
        {evento.time && (
          <span className="opacity-90 hidden lg:inline"> ({evento.time})</span>
        )}
      </span>

      {/* Link Dinâmico */}
      <Link
        href={destinoUrl}
        className="inline-flex items-center gap-0.5 text-amber-200 hover:text-white font-bold underline transition-colors shrink-0 ml-1"
      >
        <span>{isFutsal ? "Ver Jornada" : "Ver Calendário"}</span>
        <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
