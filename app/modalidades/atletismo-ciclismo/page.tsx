import type { Metadata } from "next";
import Link from "next/link";
import { Bike, Footprints, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { DiaAbertoForm } from "@/components/modalidades/DiaAbertoForm";

export const metadata: Metadata = {
  title: "Dia Aberto de Atletismo e Ciclismo Jovem em Vila do Conde",
  description:
    "Manifesta interesse no Dia Aberto de Atletismo e Ciclismo para camadas jovens da AJAVP em Vilar do Pinheiro, Vila do Conde. Pré-inscrição gratuita sem compromisso.",
  alternates: {
    canonical: `${SITE_URL}/modalidades/atletismo-ciclismo`,
  },
  openGraph: {
    title: "Dia Aberto de Atletismo e Ciclismo Jovem • AJAVP",
    description:
      "Estamos a preparar novas turmas jovens de Atletismo e Ciclismo em Vilar do Pinheiro. Regista o interesse do teu filho gratuitamente!",
    url: `${SITE_URL}/modalidades/atletismo-ciclismo`,
    siteName: "AJAVP",
    locale: "pt_PT",
    type: "website",
    images: [
      {
        url: "/assets/images/galeria/corta_mato_equipa_2026.webp",
        width: 1200,
        height: 630,
        alt: "Jovens atletas de Atletismo da AJAVP Vilar do Pinheiro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dia Aberto Atletismo e Ciclismo • AJAVP",
    description: "Pré-inscrição gratuita para jovens em Vilar do Pinheiro, Vila do Conde.",
    images: ["/assets/images/galeria/corta_mato_equipa_2026.webp"],
  },
};

export default function AtletismoCiclismoPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <FaqJsonLd
        items={[
          {
            question: "Como funciona o Dia Aberto de Atletismo e Ciclismo da AJAVP?",
            answer:
              "Estamos a recolher pré-inscrições de jovens interessados para formar os grupos por idade e agendar o primeiro dia de treino experimental gratuito em Vilar do Pinheiro.",
          },
          {
            question: "Quais são as idades abrangidas para o Atletismo e Ciclismo?",
            answer:
              "O Dia Aberto destina-se às camadas jovens (dos 5 aos 18 anos). O Atletismo também conta com treinos regulares aos domingos às 09h00 para jovens e adultos.",
          },
          {
            question: "Quem pode competir nos Jogos Inter-Freguesias (JIF) de Vila do Conde?",
            answer:
              "Para representar a freguesia nos JIF de Vila do Conde é necessário ter nascido, residir ou estudar no concelho de Vila do Conde. Os treinos de formação são abertos a todos.",
          },
        ]}
      />

      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 bg-linear-to-b from-emerald-50/80 via-white to-slate-50 dark:from-ajavp-green-dark/40 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Modalidades", href: "/modalidades" },
              { label: "Atletismo & Ciclismo (Dia Aberto)" },
            ]}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Coluna Esquerda: Contexto, Foto e Benefícios */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/30 text-emerald-900 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Captação Camadas Jovens • Dia Aberto</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl font-black text-brand-navy dark:text-white tracking-tight leading-[1.08]">
                Atletismo & Ciclismo para{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-green to-teal-500 dark:from-emerald-300 dark:to-teal-300">
                  Jovens Atletas
                </span>
              </h1>

              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                A AJAVP,{" "}
                <strong className="text-slate-900 dark:text-white">
                  Campeã Concelhia de Corta-Mato nos XL JIF
                </strong>
                , vai organizar um <strong className="text-slate-900 dark:text-white">Dia de Treino Aberto</strong> de Atletismo e Ciclismo para miúdos em Vilar do Pinheiro. Regista o interesse do teu filho para garantirmos turma e agendarmos a data!
              </p>

              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-white/15 shadow-xl aspect-16/10 bg-slate-900">
                <img
                  src="/assets/images/galeria/corta_mato_equipa_2026.webp"
                  alt="Jovens atletas de Atletismo da AJAVP na partida de Corta-Mato"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-3.5 left-4 right-4 text-white flex items-center justify-between gap-2">
                  <span className="text-xs font-bold">Comitiva Jovem AJAVP • Corta-Mato & Estrada</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                    1.º Lugar JIF
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-brand-green dark:text-emerald-400 font-bold text-sm">
                    <Footprints className="w-4 h-4" aria-hidden="true" />
                    <span>Atletismo & Corrida</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Coordenação motora, resistência, corta-mato e provas escolares/concelhias.
                  </p>
                </div>

                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-brand-green dark:text-emerald-400 font-bold text-sm">
                    <Bike className="w-4 h-4" aria-hidden="true" />
                    <span>Ciclismo & Duatlo</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Técnica de bicicleta, segurança rodoviária em circuito fechado e espírito de aventura.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-green dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong>Regra Oficial JIF Vila do Conde:</strong> Para participar nas provas competitivas dos Jogos Inter-Freguesias, o jovem deve{" "}
                  <strong>ter nascido, residir ou estudar em Vila do Conde</strong>.{" "}
                  <Link href="/jif" className="underline font-bold text-brand-green dark:text-emerald-400">
                    Ver Portal JIF
                  </Link>
                </p>
              </div>
            </div>

            {/* Coluna Direita: Formulário de Pré-Inscrição */}
            <div className="lg:col-span-6">
              <DiaAbertoForm />
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Trophy className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
                <span>Treinos regulares de Atletismo aos domingos às 09h00 na Junta de Freguesia.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
