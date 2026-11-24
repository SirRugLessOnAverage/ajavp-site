"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, Check, X } from "lucide-react";

const CONSENT_STORAGE_KEY = "ajavp_cookie_consent_v1";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function abrirDefinicoesCookies() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("ajavp:open-cookie-banner"));
  }
}

export function CookieConsentBanner() {
  const [visivel, setVisivel] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const consentSalvo = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!consentSalvo) {
        // Sem decisão prévia: mostrar banner após breve intervalo para não colidir com o carregamento inicial
        const timer = setTimeout(() => setVisivel(true), 800);
        return () => clearTimeout(timer);
      } else if (consentSalvo === "granted") {
        // Reaplicar consentimento concedido previamente
        aplicarConsentimento("granted");
      }
    } catch {
      // Falha segura em browsers com localStorage restrito
    }

    const handler = () => setVisivel(true);
    window.addEventListener("ajavp:open-cookie-banner", handler);
    return () => window.removeEventListener("ajavp:open-cookie-banner", handler);
  }, []);

  const aplicarConsentimento = (status: "granted" | "denied") => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: status,
        ad_storage: status,
        ad_user_data: status,
        ad_personalization: status,
      });
    }
  };

  const handleEscolha = (status: "granted" | "denied") => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, status);
    } catch {}

    aplicarConsentimento(status);
    setVisivel(false);
  };

  if (!mounted || !visivel) return null;

  return (
    <aside
      aria-label="Consentimento de Cookies e Privacidade"
      role="dialog"
      aria-modal="false"
      className="fixed bottom-18 sm:bottom-6 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-white/10 shadow-2xl space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-brand-green dark:text-emerald-400 shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <h3 className="font-heading font-black text-sm sm:text-base text-slate-900 dark:text-white">
                Privacidade &amp; Métricas
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                RGPD
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Utilizamos medição estatística anónima (Google Analytics) para compreender que notícias e calendários dos JIF são mais úteis aos associados. Sem publicidade comercial ou venda de dados.
            </p>
          </div>
        </div>

        {/* Botões com Paridade e Altura Tátil Confortável */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleEscolha("granted")}
            className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-brand-green hover:bg-brand-greenDark dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white font-heading font-bold text-xs shadow-xs transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Aceitar Estatísticas</span>
          </button>
          <button
            type="button"
            onClick={() => handleEscolha("denied")}
            className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-heading font-bold text-xs transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
          >
            <X className="w-4 h-4" />
            <span>Apenas Essenciais</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-white/5">
          <Link
            href="/privacidade"
            className="hover:text-brand-green dark:hover:text-emerald-400 underline transition-colors"
          >
            Política de Privacidade &amp; Cookies
          </Link>
          <span className="flex items-center gap-1 text-[10px] text-slate-400">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            Conforme RGPD
          </span>
        </div>
      </div>
    </aside>
  );
}
