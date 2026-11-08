import { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { obterDadosFutsal } from "@/lib/jif/data-service";
import { FutsalHero } from "@/components/jif/futsal/FutsalHero";
import { FutsalPavilhoesTabs } from "@/components/jif/futsal/FutsalPavilhoesTabs";
import { FutsalClassificacoes } from "@/components/jif/futsal/FutsalClassificacoes";
import { FutsalMarcadores } from "@/components/jif/futsal/FutsalMarcadores";

export const metadata: Metadata = {
  title: "Futsal Semanal • XL JIF 2026/2027 • Resultados, Escalões e Marcadores | AJAVP",
  description:
    "Hub Oficial do Futsal nos XL Jogos Inter-Freguesias de Vila do Conde. Consulta resultados por pavilhão, classificações dos 5 escalões (Sub-7 a Sub-16) e quadro de melhores marcadores da AJAVP.",
  alternates: {
    canonical: `${SITE_URL}/jif/futsal`,
  },
  openGraph: {
    title: "Futsal Semanal • XL JIF 2026/2027 • Resultados e Classificações • AJAVP",
    description:
      "Acompanha todas as jornadas de Futsal da AJAVP: Sub-9 Líderes Concelhios (30 golos), Sub-11 no Pódio e melhores marcadores.",
    url: `${SITE_URL}/jif/futsal`,
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

export default async function JifFutsalPage() {
  const futsalData = await obterDadosFutsal();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 transition-colors">
      {/* Hero Oficial com Breadcrumbs e KPIs */}
      <FutsalHero destaqueSemana={futsalData.destaqueSemana} />

      {/* Corpo Principal com Abas Interativas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {/* Jogos e Resultados por Pavilhão */}
        <FutsalPavilhoesTabs
          jornadas={futsalData.jornadas}
          jornadaAtivaNumero={futsalData.jornadaAtiva}
        />

        {/* Tabelas dos 5 Escalões */}
        <FutsalClassificacoes classificacoes={futsalData.classificacoes} />

        {/* Quadro de Marcadores e Próxima Jornada */}
        <FutsalMarcadores
          marcadores={futsalData.melhoresMarcadores}
          proximaJornada={futsalData.proximaJornada}
        />
      </main>
    </div>
  );
}

