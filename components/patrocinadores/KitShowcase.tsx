"use client";

import { useState } from "react";
import type { KitHotspot, KitTeamPreview } from "@/data/institucional";

interface KitShowcaseProps {
  hotspots: KitHotspot[];
  teamPreviews: KitTeamPreview[];
}

const HOTSPOT_COLOR_MAP: Record<
  KitHotspot["color"],
  { dot: string; ring: string; badge: string; border: string }
> = {
  teal: {
    dot: "bg-teal-400 text-slate-950",
    ring: "ring-teal-400/50",
    badge:
      "bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-500/20 dark:text-teal-300 dark:border-teal-400/30",
    border:
      "border-teal-300 bg-teal-50/70 dark:border-teal-400/60 dark:bg-teal-950/40",
  },
  amber: {
    dot: "bg-amber-400 text-slate-950",
    ring: "ring-amber-400/50",
    badge:
      "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-400/30",
    border:
      "border-amber-300 bg-amber-50/70 dark:border-amber-400/60 dark:bg-amber-950/35",
  },
  blue: {
    dot: "bg-blue-400 text-slate-950",
    ring: "ring-blue-400/50",
    badge:
      "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-400/30",
    border:
      "border-blue-300 bg-blue-50/70 dark:border-blue-400/60 dark:bg-blue-950/35",
  },
  red: {
    dot: "bg-rose-400 text-slate-950",
    ring: "ring-rose-400/50",
    badge:
      "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-400/30",
    border:
      "border-rose-300 bg-rose-50/70 dark:border-rose-400/60 dark:bg-rose-950/35",
  },
  emerald: {
    dot: "bg-emerald-400 text-slate-950",
    ring: "ring-emerald-400/50",
    badge:
      "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-400/30",
    border:
      "border-emerald-300 bg-emerald-50/70 dark:border-emerald-400/60 dark:bg-emerald-950/35",
  },
};

export function KitShowcase({ hotspots, teamPreviews }: KitShowcaseProps) {
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>(
    hotspots[0]?.id ?? "salimpa"
  );
  const [selectedTeamId, setSelectedTeamId] = useState<string>(
    teamPreviews[0]?.id ?? "sub7-banco"
  );

  const activeHotspot =
    hotspots.find((h) => h.id === selectedHotspotId) ?? hotspots[0];
  const activeTeam =
    teamPreviews.find((t) => t.id === selectedTeamId) ?? teamPreviews[0];

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 p-6 sm:p-8 lg:p-10 shadow-xl transition-colors">
      {/* Cabeçalho da Vitrine */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-400/40 text-amber-900 dark:text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-3">
            <span>👕</span> Época 2026/2027 • Estreia Oficial
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy dark:text-white">
            A Nova Pele da Mancha Verde: Do Papel para o Campo
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md">
          Clica nos pontos numerados sobre a maquete oficial para veres onde cada patrocinador está estampado e alterna ao lado entre as fotografias reais dos escalões em campo.
        </p>
      </div>

      {/* Grelha Dupla: Maquete Oficial com Hotspots (Esquerda) + Fotos Reais dos Escalões (Direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* COLUNA ESQUERDA: Maquete Oficial + Hotspots Interativos */}
        <div className="lg:col-span-6 space-y-5">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/15 bg-white shadow-lg">
            <img
              src="/assets/images/equipamento.webp"
              alt="Maquete oficial do novo equipamento 2026/2027 da AJAVP com patrocinadores"
              className="w-full h-auto block select-none"
            />

            {/* Hotspots Numerados Interativos */}
            {hotspots.map((hotspot, index) => {
              const isSelected = hotspot.id === activeHotspot.id;
              const style = HOTSPOT_COLOR_MAP[hotspot.color];
              return (
                <button
                  key={hotspot.id}
                  type="button"
                  onClick={() => setSelectedHotspotId(hotspot.id)}
                  style={{
                    left: `${hotspot.xPercent}%`,
                    top: `${hotspot.yPercent}%`,
                  }}
                  aria-label={`Ver posição de ${hotspot.sponsorName}: ${hotspot.placementLabel}`}
                  className={`motion-press -translate-x-1/2 -translate-y-1/2 absolute w-7 h-7 sm:w-8 sm:h-8 rounded-full font-black text-xs flex items-center justify-center shadow-lg transition-transform cursor-pointer ${
                    style.dot
                  } ${
                    isSelected
                      ? `scale-125 ring-4 ${style.ring} z-20`
                      : "opacity-90 hover:scale-110 z-10"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}

            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold">
              📐 Maquete Técnica 26/27 (Campo + GR)
            </div>
          </div>

          {/* Botões Seletores dos Patrocinadores no Equipamento */}
          <div className="flex flex-wrap gap-2">
            {hotspots.map((hotspot, index) => {
              const isSelected = hotspot.id === activeHotspot.id;
              const style = HOTSPOT_COLOR_MAP[hotspot.color];
              return (
                <button
                  key={hotspot.id}
                  type="button"
                  onClick={() => setSelectedHotspotId(hotspot.id)}
                  className={`motion-press px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? `${style.badge} shadow-xs`
                      : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-white/10"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center ${style.dot}`}
                  >
                    {index + 1}
                  </span>
                  <span>{hotspot.sponsorName}</span>
                </button>
              );
            })}
          </div>

          {/* Cartão de Detalhe da Posição Selecionada */}
          {activeHotspot && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
                HOTSPOT_COLOR_MAP[activeHotspot.color].border
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <h3 className="font-heading text-lg font-black text-brand-navy dark:text-white">
                  {activeHotspot.sponsorName}
                </h3>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                    HOTSPOT_COLOR_MAP[activeHotspot.color].badge
                  }`}
                >
                  📍 {activeHotspot.placementLabel}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {activeHotspot.description}
              </p>
            </div>
          )}
        </div>

        {/* COLUNA DIREITA: Comparador "Do Papel para o Campo" com Fotos Reais dos Escalões */}
        <div className="lg:col-span-6 space-y-5">
          {/* Seletor de Escalões */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green dark:text-emerald-400 block mb-2.5">
              📸 Escolhe o Escalão para Ver o Equipamento em Ação:
            </span>
            <div className="flex flex-wrap gap-2">
              {teamPreviews.map((team) => {
                const isSelected = team.id === activeTeam.id;
                return (
                  <button
                    key={team.id}
                    type="button"
                    onClick={() => setSelectedTeamId(team.id)}
                    className={`motion-press px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-brand-green text-white border-brand-green shadow-md shadow-brand-green/25"
                        : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {team.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Moldura da Fotografia Real do Escalão */}
          {activeTeam && (
            <div className="rounded-2xl overflow-hidden border-2 border-emerald-500/40 bg-zinc-900 shadow-xl">
              <div className="relative aspect-4/3 overflow-hidden bg-zinc-950">
                <img
                  key={activeTeam.src}
                  src={activeTeam.src}
                  alt={activeTeam.alt}
                  style={{ objectPosition: activeTeam.objectPosition ?? "center" }}
                  className="w-full h-full object-cover transition-opacity duration-200"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-bold text-white">
                    {activeTeam.label}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black uppercase tracking-wider">
                    {activeTeam.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-xs sm:text-sm text-gray-100 font-medium leading-relaxed drop-shadow">
                    {activeTeam.caption}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mini-galeria de pré-visualização rápida */}
          <div className="grid grid-cols-6 gap-2">
            {teamPreviews.map((team) => {
              const isSelected = team.id === activeTeam.id;
              return (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => setSelectedTeamId(team.id)}
                  aria-label={`Mostrar fotografia ${team.label}`}
                  className={`motion-press relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "border-amber-500 dark:border-amber-400 scale-105 shadow-md"
                      : "border-slate-300 dark:border-white/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={team.src}
                    alt={team.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
