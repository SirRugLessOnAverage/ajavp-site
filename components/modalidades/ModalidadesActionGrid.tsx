"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Shield,
  Calendar,
  Trophy,
  Camera,
  Maximize2,
  X,
  ArrowRight,
} from "lucide-react";
import type { SportModality } from "@/data/institucional";

interface ModalidadesActionGridProps {
  modalidades: SportModality[];
}

const ACCENT_STYLES: Record<
  SportModality["accentColor"],
  {
    badgeBg: string;
    subtitleText: string;
    borderHover: string;
    activeThumbRing: string;
    ctaHover: string;
  }
> = {
  amber: {
    badgeBg: "bg-amber-500 text-slate-950",
    subtitleText: "text-amber-600 dark:text-amber-400",
    borderHover: "hover:border-amber-400/70 dark:hover:border-amber-400/50",
    activeThumbRing: "ring-2 ring-amber-400 border-amber-300",
    ctaHover:
      "hover:bg-amber-50 dark:hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300 hover:border-amber-300/80",
  },
  emerald: {
    badgeBg: "bg-brand-green text-white",
    subtitleText: "text-emerald-600 dark:text-emerald-400",
    borderHover: "hover:border-emerald-400/70 dark:hover:border-emerald-400/50",
    activeThumbRing: "ring-2 ring-emerald-400 border-emerald-300",
    ctaHover:
      "hover:bg-emerald-50 dark:hover:bg-emerald-500/15 hover:text-brand-green dark:hover:text-emerald-300 hover:border-emerald-300/80",
  },
  blue: {
    badgeBg: "bg-blue-600 text-white",
    subtitleText: "text-blue-600 dark:text-blue-400",
    borderHover: "hover:border-blue-400/70 dark:hover:border-blue-400/50",
    activeThumbRing: "ring-2 ring-blue-400 border-blue-300",
    ctaHover:
      "hover:bg-blue-50 dark:hover:bg-blue-500/15 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-300/80",
  },
  teal: {
    badgeBg: "bg-teal-600 text-white",
    subtitleText: "text-teal-600 dark:text-teal-400",
    borderHover: "hover:border-teal-400/70 dark:hover:border-teal-400/50",
    activeThumbRing: "ring-2 ring-teal-400 border-teal-300",
    ctaHover:
      "hover:bg-teal-50 dark:hover:bg-teal-500/15 hover:text-teal-700 dark:hover:text-teal-300 hover:border-teal-300/80",
  },
  purple: {
    badgeBg: "bg-purple-600 text-white",
    subtitleText: "text-purple-600 dark:text-purple-400",
    borderHover: "hover:border-purple-400/70 dark:hover:border-purple-400/50",
    activeThumbRing: "ring-2 ring-purple-400 border-purple-300",
    ctaHover:
      "hover:bg-purple-50 dark:hover:bg-purple-500/15 hover:text-purple-700 dark:hover:text-purple-300 hover:border-purple-300/80",
  },
};

export function ModalidadesActionGrid({
  modalidades,
}: ModalidadesActionGridProps) {
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<
    Record<string, number>
  >({});
  const [lightboxItem, setLightboxItem] = useState<{
    src: string;
    alt: string;
    label: string;
    sportTitle: string;
  } | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {modalidades.map((sport) => {
          const activeIdx = selectedPhotoIdx[sport.id] ?? 0;
          const activePhoto = sport.photos[activeIdx] ?? sport.photos[0];
          const styles = ACCENT_STYLES[sport.accentColor];

          return (
            <article
              key={sport.id}
              className={`group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-white/10 ${styles.borderHover} shadow-sm hover:shadow-xl motion-card overflow-hidden flex flex-col justify-between`}
            >
              <div>
                {/* Action Photo Header */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activePhoto.src}
                    alt={activePhoto.alt}
                    loading="lazy"
                    decoding="async"
                    style={{
                      objectPosition:
                        activePhoto.objectPosition ?? "center center",
                    }}
                    className="w-full h-full object-cover motion-photo motion-photo-zoom"
                  />

                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md ${styles.badgeBg}`}
                    >
                      {sport.badge}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setLightboxItem({
                          src: activePhoto.src,
                          alt: activePhoto.alt,
                          label: activePhoto.label,
                          sportTitle: sport.title,
                        })
                      }
                      aria-label={`Ampliar fotografia de ${sport.title}`}
                      className="p-2 rounded-full bg-slate-950/65 hover:bg-slate-950 text-white backdrop-blur-md border border-white/20 motion-press cursor-pointer"
                      title="Ampliar fotografia"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Bottom Photo Caption + Multi-Photo Selector Pills */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between gap-2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/75 backdrop-blur-md text-white text-[10px] font-bold border border-white/15">
                      <Camera className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate max-w-[150px]">
                        {activePhoto.label}
                      </span>
                    </span>

                    {sport.photos.length > 1 && (
                      <div
                        className="flex items-center gap-1.5 bg-slate-950/75 backdrop-blur-md p-1 rounded-xl border border-white/15"
                        role="tablist"
                        aria-label={`Fotografias de ${sport.title}`}
                      >
                        {sport.photos.map((photo, idx) => {
                          const isSelected = idx === activeIdx;
                          return (
                            <button
                              key={photo.src}
                              type="button"
                              role="tab"
                              aria-selected={isSelected}
                              onClick={() =>
                                setSelectedPhotoIdx((prev) => ({
                                  ...prev,
                                  [sport.id]: idx,
                                }))
                              }
                              title={photo.label}
                              className={`relative w-8 h-6 rounded-md overflow-hidden border transition-transform cursor-pointer motion-press ${
                                isSelected
                                  ? `${styles.activeThumbRing} scale-105`
                                  : "border-white/30 opacity-70 hover:opacity-100"
                              }`}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={photo.src}
                                alt={photo.label}
                                loading="lazy"
                                className="w-full h-full object-cover"
                              />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider block ${styles.subtitleText}`}
                    >
                      {sport.subtitle}
                    </span>
                    <h3 className="font-heading font-black text-2xl text-brand-navy dark:text-white mt-1">
                      {sport.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {sport.description}
                  </p>

                  <div className="space-y-2 pt-3 text-xs text-slate-700 dark:text-slate-200 border-t border-slate-100 dark:border-white/10">
                    {sport.highlights.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-green dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}

                    {sport.regulationLink && (
                      <div className="flex items-start gap-2 pt-0.5">
                        <Shield className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <Link
                          href={sport.regulationLink.href}
                          className="text-amber-700 dark:text-amber-400 underline font-semibold hover:text-amber-800 dark:hover:text-amber-300"
                        >
                          {sport.regulationLink.label}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer CTAs */}
              <div className="p-6 sm:p-7 pt-0 space-y-2">
                {sport.externalCta ? (
                  <a
                    href={sport.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-50 dark:bg-white/5 text-brand-navy dark:text-white font-bold text-xs transition-colors border border-slate-200/80 dark:border-white/10 motion-press ${styles.ctaHover}`}
                  >
                    <span>{sport.ctaLabel}</span>
                  </a>
                ) : (
                  <Link
                    href={sport.ctaHref}
                    className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl ${
                      sport.secondaryCta
                        ? "bg-amber-50 dark:bg-amber-500/15 hover:bg-amber-100 dark:hover:bg-amber-500/25 text-amber-900 dark:text-amber-300 border-amber-200/80 dark:border-amber-400/30"
                        : `bg-slate-50 dark:bg-white/5 text-brand-navy dark:text-white border-slate-200/80 dark:border-white/10 ${styles.ctaHover}`
                    } font-bold text-xs transition-colors border motion-press`}
                  >
                    {sport.secondaryCta && (
                      <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    )}
                    <span>{sport.ctaLabel}</span>
                  </Link>
                )}

                {sport.secondaryCta && (
                  <Link
                    href={sport.secondaryCta.href}
                    className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-50 dark:bg-white/5 text-brand-navy dark:text-white font-bold text-xs transition-colors border border-slate-200/80 dark:border-white/10 motion-press ${styles.ctaHover}`}
                  >
                    <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{sport.secondaryCta.label}</span>
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Quick Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.alt}
        >
          <div
            className="relative max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-brand-green text-white text-xs font-bold">
                  {lightboxItem.sportTitle}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-amber-300">
                  {lightboxItem.label}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Fechar fotografia"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxItem.src}
              alt={lightboxItem.alt}
              className="max-h-[78vh] w-auto rounded-2xl shadow-2xl object-contain border border-white/15"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 w-full px-2">
              <p className="text-xs sm:text-sm text-slate-200 font-medium">
                {lightboxItem.alt}
              </p>
              <Link
                href="/multimedia"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
              >
                <span>Ver Álbum Completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

