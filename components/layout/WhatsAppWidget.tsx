"use client";

import React, { useState } from "react";
import { UserPlus, Bell, ChevronRight, X } from "lucide-react";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      id="whatsappWidget"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end"
    >
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2.5rem)] sm:w-88 max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden transform transition-all duration-300 origin-bottom-right">
          <div className="bg-linear-to-r from-emerald-600 to-teal-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-white/10 p-1 flex items-center justify-center shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/images/logo.webp"
                  alt="AJAVP"
                  className="w-full h-full object-contain dark:hidden"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/images/logo_white.webp"
                  alt="AJAVP"
                  className="w-full h-full object-contain hidden dark:block"
                />
              </div>
              <div>
                <div className="font-heading font-bold text-sm leading-tight text-white">
                  AJAVP &bull; Apoio Oficial
                </div>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Disponível no WhatsApp</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Fechar WhatsApp"
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-950 space-y-3">
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <p className="font-semibold text-slate-900 dark:text-white">
                Olá! 👋 Bem-vindo à AJAVP.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Como te podemos ajudar hoje? Escolhe uma das opções para falar
                diretamente connosco:
              </p>
            </div>

            <div className="space-y-2">
              <a
                href="https://wa.me/351917194933?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20inscri%C3%A7%C3%B5es%20e%20treinos%20na%20AJAVP."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-emerald-300 transition-all shadow-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <span className="font-heading font-bold text-xs text-slate-800 dark:text-white block">
                    Inscrições &amp; Treinos
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                    Experimentar treino gratuito ou inscrever atleta
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href="https://chat.whatsapp.com/BLxsjBfDw7AEAonDy72187"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-emerald-300 transition-all shadow-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <span className="font-heading font-bold text-xs text-slate-800 dark:text-white block">
                    Comunidade &amp; Avisos
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                    Estado do ringue, treinos e notícias
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Falar no WhatsApp (AJAVP)"
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <svg
          className="w-6 h-6 shrink-0"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.79.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z" />
        </svg>
        <span className="font-heading font-bold text-xs hidden sm:inline-block tracking-wide">
          Falar no WhatsApp
        </span>
      </button>
    </div>
  );
}
