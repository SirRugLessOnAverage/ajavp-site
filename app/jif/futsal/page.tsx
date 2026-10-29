import { Metadata } from "next";
import { FUTSAL_DATA } from "@/data/jif/futsal";
import { FutsalHero } from "@/components/jif/futsal/FutsalHero";
import { FutsalPavilhoesTabs } from "@/components/jif/futsal/FutsalPavilhoesTabs";
import { FutsalClassificacoes } from "@/components/jif/futsal/FutsalClassificacoes";
import { FutsalMarcadores } from "@/components/jif/futsal/FutsalMarcadores";

export const metadata: Metadata = {
  title: "Futsal Semanal • XL JIF 2026/2027 • Resultados, Escalões e Marcadores | AJAVP",
  description:
    "Hub Oficial do Futsal nos XL Jogos Inter-Freguesias de Vila do Conde. Consulta resultados por pavilhão, classificações dos 5 escalões (Sub-7 a Sub-16) e quadro de melhores marcadores da AJAVP.",
  alternates: {
    canonical: "https://ajavp.vercel.app/jif/futsal",
  },
  openGraph: {
    title: "Futsal Semanal • XL JIF 2026/2027 • Resultados e Classificações • AJAVP",
    description:
      "Acompanha todas as jornadas de Futsal da AJAVP: Sub-9 Líderes Concelhios (30 golos), Sub-11 no Pódio e melhores marcadores.",
    url: "https://ajavp.vercel.app/jif/futsal",
    siteName: "AJAVP",
    images: [
      {
        url: "/assets/images/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "Futsal Semanal XL JIF AJAVP",
      },
    ],
    locale: "pt_PT",
    type: "website",
  },
};

export default function JifFutsalPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 transition-colors">
      {/* Top Banner de Destaque */}
      <div className="bg-brand-green text-white py-2 px-4 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-inner">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-400 text-slate-950">
          Futsal JIF
        </span>
        <span>
          XL Jogos Inter-Freguesias 2026/2027 &bull; Acompanhamento Semanal da AJAVP! ⚽
        </span>
      </div>

      {/* Hero Oficial com Breadcrumbs e KPIs */}
      <FutsalHero destaqueSemana={FUTSAL_DATA.destaqueSemana} />

      {/* Corpo Principal com Abas Interativas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {/* Jogos e Resultados por Pavilhão */}
        <FutsalPavilhoesTabs
          jornadas={FUTSAL_DATA.jornadas}
          jornadaAtivaNumero={FUTSAL_DATA.jornadaAtiva}
        />

        {/* Tabelas dos 5 Escalões */}
        <FutsalClassificacoes classificacoes={FUTSAL_DATA.classificacoes} />

        {/* Quadro de Marcadores e Próxima Jornada */}
        <FutsalMarcadores
          marcadores={FUTSAL_DATA.melhoresMarcadores}
          proximaJornada={FUTSAL_DATA.proximaJornada}
        />
      </main>
    </div>
  );
}

