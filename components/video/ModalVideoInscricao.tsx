'use client';

import React, { useEffect, useRef } from 'react';
import { X, PlayCircle, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { GESTAO_LINKS } from '@/lib/site';

interface ModalVideoInscricaoProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalVideoInscricao({ isOpen, onClose }: ModalVideoInscricaoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fechar com Escape e restaurar scroll do body
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    containerRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Pausar o vídeo ao fechar
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-guia-site-titulo"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-white/10 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 ease-out duration-200 focus:outline-none transition-colors"
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-white/10 bg-slate-50/70 dark:bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <PlayCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 font-mono">
                  Demonstração Oficial • 1 Minuto
                </span>
                <span className="text-[11px] text-slate-400 font-medium">1080p Full HD</span>
              </div>
              <h3
                id="modal-guia-site-titulo"
                className="text-sm sm:text-base font-heading font-black text-slate-900 dark:text-white tracking-tight"
              >
                Como Fazer a Inscrição Online na AJAVP
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar Guia em Vídeo"
            className="w-10 h-10 rounded-2xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player 16:9 Nativo */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src="/videos/ajavp_guia_inscricao_16x9.mp4"
            poster="/assets/images/cartaz_horizontal_16x9.jpg"
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="w-full h-full object-contain"
          >
            O seu navegador não suporta a reprodução deste vídeo.
          </video>
        </div>

        {/* Destaques e CTA */}
        <div className="p-4 sm:p-5 bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            Processo 100% digital: cálculo automático de isenção de menor e assinatura no ecrã.
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-white/10 font-bold transition-all text-center"
            >
              Fechar
            </button>
            <a
              href={GESTAO_LINKS.inscricao}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white font-heading font-bold shadow-md hover:shadow-lg transition-all active:scale-95 text-center"
            >
              <span>Abrir Inscrição Online</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

