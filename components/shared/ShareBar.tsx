"use client";

import React, { useState } from "react";
import { Share2, Check, MessageCircle, Copy } from "lucide-react";

export interface ShareBarProps {
  title: string;
  text: string;
  url: string;
  compact?: boolean;
  darkSurface?: boolean;
}

export function ShareBar({
  title,
  text,
  url,
  compact = false,
  darkSurface = false,
}: ShareBarProps) {
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  const shareMessage = `${title}\n${text}\n${url}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  const showToastFeedback = (msg: string) => {
    setStatusFeedback(msg);
    setTimeout(() => setStatusFeedback(null), 3000);
  };

  const handleCopyFallback = async (customMsg = "Link e legenda copiados!") => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      showToastFeedback(customMsg);
    } catch {
      showToastFeedback("Copia o link do navegador para partilhar.");
    }
  };

  const handleInstagramOrNativeShare = async () => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return;
      }
    }
    await handleCopyFallback("Legenda + link copiados! Cola no Story ou Bio do Instagram.");
  };

  const basePill = darkSurface
    ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
    : "bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-white/10";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`motion-press inline-flex items-center gap-1.5 rounded-xl font-heading font-bold transition-all active:scale-[0.97] cursor-pointer ${
          compact ? "px-2.5 py-1.5 text-[11px]" : "px-3.5 py-2 text-xs"
        } bg-brand-green hover:bg-brand-greenDark text-white shadow-xs`}
        title="Partilhar no WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5 shrink-0" />
        <span>WhatsApp</span>
      </a>

      <a
        href={facebookHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`motion-press inline-flex items-center gap-1.5 rounded-xl font-heading font-bold transition-all active:scale-[0.97] cursor-pointer ${
          compact ? "px-2.5 py-1.5 text-[11px]" : "px-3.5 py-2 text-xs"
        } bg-blue-600 hover:bg-blue-700 text-white shadow-xs`}
        title="Partilhar no Facebook"
      >
        <Share2 className="w-3.5 h-3.5 shrink-0" />
        <span>Facebook</span>
      </a>

      <button
        type="button"
        onClick={handleInstagramOrNativeShare}
        className={`motion-press inline-flex items-center gap-1.5 rounded-xl font-heading font-bold transition-all active:scale-[0.97] cursor-pointer ${
          compact ? "px-2.5 py-1.5 text-[11px]" : "px-3.5 py-2 text-xs"
        } bg-gradient-to-r from-pink-600 to-amber-500 hover:from-pink-700 hover:to-amber-600 text-white shadow-xs`}
        title="Partilhar no Instagram / Menu do Telemóvel"
      >
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
        <span>Instagram / App</span>
      </button>

      {!compact && (
        <button
          type="button"
          onClick={() => handleCopyFallback()}
          className={`motion-press inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-heading font-bold text-xs transition-all active:scale-[0.97] cursor-pointer ${basePill}`}
          title="Copiar ligação e texto"
        >
          <Copy className="w-3.5 h-3.5 shrink-0" />
          <span>Copiar</span>
        </button>
      )}

      {statusFeedback && (
        <span
          role="status"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 text-[11px] font-bold"
        >
          <Check className="w-3.5 h-3.5 shrink-0" />
          <span>{statusFeedback}</span>
        </span>
      )}
    </div>
  );
}
