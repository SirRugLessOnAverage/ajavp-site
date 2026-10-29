import Link from "next/link";
import Image from "next/image";
import { Play, Table, Medal, ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import type { DestaqueSemana } from "@/data/jif/futsal";

interface FutsalHeroProps {
  destaqueSemana: DestaqueSemana;
}

export function FutsalHero({ destaqueSemana }: FutsalHeroProps) {
  return (
    <section className="relative bg-slate-950 text-white pt-10 pb-12 sm:pt-12 sm:pb-16 overflow-hidden hero-pattern border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-8">
        
        {/* Breadcrumb oficial padronizado */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "JIF 2026/2027", href: "/jif" },
              { label: "Futsal Semanal" },
            ]}
          />
          <Link
            href="/jif"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl border border-white/15 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Portal JIF</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Textos, Atalhos e KPIs */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Época 2026/2027 &bull; XL JIF Vila do Conde</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-tight">
              Hub de Futsal Semanal <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-white">
                Resultados &amp; Escalões
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 max-w-2xl font-normal leading-relaxed">
              Acompanha em detalhe o percurso das 4 equipas da AJAVP (Sub-7, Sub-9, Sub-11 e Sub-13) nos 4 pavilhões concelhios e Caxinas. Folha de resultados oficiais, classificações e os melhores marcadores da prova.
            </p>

            {/* Ações Rápidas de Salto */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href="#jogos"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resultados dos Pavilhões</span>
              </a>
              <a
                href="#classificacoes"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md border border-white/20 transition-all cursor-pointer"
              >
                <Table className="w-3.5 h-3.5 text-emerald-300" />
                <span>Tabelas dos 5 Escalões</span>
              </a>
              <a
                href="#marcadores"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md border border-white/20 transition-all cursor-pointer"
              >
                <Medal className="w-3.5 h-3.5 text-amber-300" />
                <span>Artilheiros AJAVP</span>
              </a>
            </div>

            {/* Grelha de Mini-KPIs Oficiais */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4">
              {destaqueSemana.kpis.map((kpi, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white/10 dark:bg-slate-900/60 backdrop-blur-md text-center space-y-0.5 border border-white/15"
                >
                  <span className="text-[10px] text-slate-300 uppercase block font-semibold truncate">
                    {kpi.label}
                  </span>
                  <div className="text-lg sm:text-xl font-black text-amber-400">
                    {kpi.valor}
                  </div>
                  <span className="text-[10px] text-emerald-200 block truncate">
                    {kpi.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fotografia Oficial de Formação */}
          <div className="lg:col-span-5 flex justify-center">
            <figure className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900/60 backdrop-blur-md group transform hover:scale-[1.01] transition-transform duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/futsal/hero-futsal-ajavp.webp"
                alt="Atletas da equipa de Futsal da AJAVP nos JIF Vila do Conde"
                className="w-full h-auto object-cover max-h-[440px] sm:max-h-[500px]"
                loading="eager"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-4 pt-12">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 block">
                      Formação &bull; AJAVP
                    </span>
                    <p className="text-xs font-bold text-white">
                      Equipas Jovens nos XL JIF Vila do Conde
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] uppercase shadow-xs">
                    Oficial
                  </span>
                </div>
              </div>
            </figure>
          </div>
        </div>

      </div>
    </section>
  );
}

