"use client";

import React, { useEffect } from "react";
import { X, Calendar, Clock, MapPin, Download, ExternalLink, Check } from "lucide-react";
import { formatarNomeEquipa, type ConsolidatedMatch } from "@/lib/jif/team-matches";

interface FutsalDateModalProps {
  match: ConsolidatedMatch | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Converte data em texto (ex: "14/11/2026" ou "2026-10-10" ou "14 de Novembro de 2026")
 * e hora (ex: "08:45" ou "08h45") num par de timestamps UTC para o Google Calendar e .ics
 */
function gerarDatasIso(dataStr: string, horaStr: string): { startIso: string; endIso: string; dataFormatada: string } {
  const agora = new Date();
  let ano = 2026;
  let mes = 10; // Novembro (0-indexed)
  let dia = 14;

  // Tenta extrair DD/MM/YYYY
  const regexDMY = /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/;
  const matchDMY = dataStr.match(regexDMY);
  if (matchDMY) {
    dia = parseInt(matchDMY[1], 10);
    mes = parseInt(matchDMY[2], 10) - 1;
    ano = parseInt(matchDMY[3], 10);
  } else {
    // Tenta YYYY-MM-DD
    const regexYMD = /(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/;
    const matchYMD = dataStr.match(regexYMD);
    if (matchYMD) {
      ano = parseInt(matchYMD[1], 10);
      mes = parseInt(matchYMD[2], 10) - 1;
      dia = parseInt(matchYMD[3], 10);
    }
  }

  // Extrair hora e minuto
  let hora = 10;
  let minuto = 0;
  const matchHora = horaStr.match(/(\d{1,2})[h:](\d{2})/i);
  if (matchHora) {
    hora = parseInt(matchHora[1], 10);
    minuto = parseInt(matchHora[2], 10);
  }

  const startDate = new Date(ano, mes, dia, hora, minuto);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hora de duração

  const pad = (n: number) => String(n).padStart(2, "0");
  const formatUtc = (d: Date) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

  const dataFormatada = `${pad(dia)}/${pad(mes + 1)}/${ano}`;

  return {
    startIso: formatUtc(startDate),
    endIso: formatUtc(endDate),
    dataFormatada,
  };
}

export function FutsalDateModal({
  match,
  isOpen,
  onClose,
}: FutsalDateModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !match) return null;

  const { startIso, endIso, dataFormatada } = gerarDatasIso(match.data, match.hora);
  const casaNome = formatarNomeEquipa(match.casa);
  const foraNome = formatarNomeEquipa(match.fora);

  const tituloEvento = `JIF Futsal: ${casaNome} vs ${foraNome} (${match.escalao})`;
  const descricaoEvento = `XL Jogos Inter-Freguesias de Vila do Conde\n${match.jornadaLabel} - Escalão ${match.escalao}\nConfronto: ${casaNome} vs ${foraNome}\nLocal: ${match.pavilhao}\nMais informações em: https://ajavp.pt/jif/futsal`;
  const localEvento = `${match.pavilhao}, Vila do Conde`;

  // URL Google Calendar
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    tituloEvento
  )}&dates=${startIso}/${endIso}&details=${encodeURIComponent(
    descricaoEvento
  )}&location=${encodeURIComponent(localEvento)}`;

  // Download .ics
  const handleDownloadIcs = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//AJAVP//XL JIF 2026-2027//PT",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${tituloEvento}`,
      `DESCRIPTION:${descricaoEvento.replace(/\n/g, "\\n")}`,
      `LOCATION:${localEvento}`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      `STATUS:CONFIRMED`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `jif-${match.casa}-${match.fora}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="date-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden transform transition-all duration-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Topo do Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-white/10 bg-slate-50/70 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                Calendário & Agenda Oficial
              </span>
              <h3
                id="date-modal-title"
                className="font-heading font-black text-base text-slate-900 dark:text-white"
              >
                Adicionar à Tua Agenda
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Detalhes do Jogo */}
        <div className="p-6 space-y-5">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/5 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-900 dark:bg-slate-700 text-white">
                {match.escalao}
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {match.jornadaLabel}
              </span>
            </div>

            <p className="font-heading font-black text-sm text-slate-900 dark:text-white">
              {match.casa} vs {match.fora}
            </p>

            <div className="pt-2 border-t border-slate-200/60 dark:border-white/5 space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  {dataFormatada} &bull; {match.hora}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">{match.pavilhao}</span>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-2.5">
            <a
              href={googleCalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs shadow-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all cursor-pointer active:scale-[0.97]"
            >
              <span>Adicionar ao Google Calendar</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <button
              onClick={handleDownloadIcs}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 font-bold text-xs shadow-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer active:scale-[0.97]"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Descarregar Ficheiro .ics (Apple / Outlook)</span>
            </button>
          </div>
        </div>

        {/* Rodapé */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-white/10 text-center">
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Sincroniza os jogos com o teu calendário no telemóvel ou computador.
          </p>
        </div>
      </div>
    </div>
  );
}
