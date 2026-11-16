"use client";

import React, { useEffect } from "react";
import { X, MapPin, Navigation, ExternalLink, Compass } from "lucide-react";
import { PavilhaoInfo } from "@/lib/jif/pavilhoes";

interface FutsalPavilhaoModalProps {
  pavilhao: PavilhaoInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export function FutsalPavilhaoModal({
  pavilhao,
  isOpen,
  onClose,
}: FutsalPavilhaoModalProps) {
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

  if (!isOpen || !pavilhao) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pavilhao-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden transform transition-all duration-300 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior com botão fechar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-white/10 bg-slate-50/70 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                Recinto Desportivo Oficial JIF
              </span>
              <h3
                id="pavilhao-modal-title"
                className="font-heading font-black text-lg text-slate-900 dark:text-white leading-tight"
              >
                {pavilhao.nome}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar janela"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo com Morada e Coordenadas */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Card de Morada */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/5 space-y-2">
            <div className="flex items-start gap-2.5">
              <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {pavilhao.morada}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {pavilhao.codigoPostal}
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>Coordenadas GPS:</span>
              <span className="font-mono font-medium">
                {pavilhao.lat.toFixed(4)}° N, {pavilhao.lng.toFixed(4)}° W
              </span>
            </div>
          </div>

          {/* Navegação Rápida com 1 Toque */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5" />
              <span>Abrir Navegação GPS</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Google Maps */}
              <a
                href={pavilhao.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs shadow-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all cursor-pointer active:scale-[0.97]"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              {/* Waze */}
              <a
                href={pavilhao.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-sky-500 text-white font-bold text-xs shadow-xs hover:bg-sky-600 transition-all cursor-pointer active:scale-[0.97]"
              >
                <span>Waze</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              {/* Apple Maps */}
              <a
                href={pavilhao.appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 font-bold text-xs shadow-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer active:scale-[0.97]"
              >
                <span>Apple Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>
        </div>

        {/* Rodapé informativo */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-white/10 text-center">
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Recinto homologado pela Comissão Executiva dos XL JIF Vila do Conde.
          </p>
        </div>
      </div>
    </div>
  );
}
