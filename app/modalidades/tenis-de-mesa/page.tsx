import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, ShieldCheck, Trophy } from "lucide-react";
import { GESTAO_LINKS, SITE_URL } from "@/lib/site";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FaqJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Ténis de Mesa para Jovens e Adultos em Vila do Conde",
  description:
    "Escola e equipa de Ténis de Mesa da AJAVP em Vilar do Pinheiro, Vila do Conde. 1.º Lugar Geral nos XL JIF! Treinos aos sábados na Junta de Freguesia e inscrição gratuita para experimentar.",
  alternates: {
    canonical: `${SITE_URL}/modalidades/tenis-de-mesa`,
  },
  openGraph: {
    title: "Ténis de Mesa • Campeões Gerais XL JIF • AJAVP",
    description:
      "Aulas e treinos de Ténis de Mesa aos sábados no Salão Nobre da Junta de Freguesia de Vilar do Pinheiro (Sub-11 a Seniores).",
    url: `${SITE_URL}/modalidades/tenis-de-mesa`,
    siteName: "AJAVP",
    locale: "pt_PT",
    type: "website",
    images: [
      {
        url: "/assets/images/galeria/tenis-mesa/tenis_mesa_2026_medalhados_tarde_ajavp.webp",
        width: 1200,
        height: 630,
        alt: "Medalhados da AJAVP em Ténis de Mesa nos XL JIF",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ténis de Mesa • AJAVP Vilar do Pinheiro",
    description: "Treinos aos sábados na Junta de Freguesia. Vem experimentar grátis!",
    images: ["/assets/images/galeria/tenis-mesa/tenis_mesa_2026_medalhados_tarde_ajavp.webp"],
  },
};

export default function TenisDeMesaPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <FaqJsonLd
        items={[
          {
            question: "Onde e quando decorrem os treinos de Ténis de Mesa da AJAVP?",
            answer:
              "Os treinos realizam-se todos os sábados no Salão Nobre da Junta de Freguesia de Vilar do Pinheiro: às 16h00 para camadas jovens (Sub-11 a Sub-15) e às 17h00 para adultos/seniores.",
          },
          {
            question: "Preciso de ter raquete própria para começar a treinar?",
            answer:
              "Não! A AJAVP disponibiliza mesas oficiais de competição, bolas e raquetes de iniciação para quem quiser experimentar gratuitamente.",
          },
          {
            question: "Quem pode competir nos Jogos Inter-Freguesias (JIF) de Vila do Conde?",
            answer:
              "Podem competir oficialmente pela AJAVP os atletas que tenham nascido, residam ou estudem no concelho de Vila do Conde.",
          },
        ]}
      />

      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 bg-linear-to-b from-blue-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Modalidades", href: "/modalidades" },
              { label: "Ténis de Mesa" },
            ]}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-400/30 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-widest">
                <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>1.º Lugar Geral no Ténis de Mesa • XL JIF</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl font-black text-brand-navy dark:text-white tracking-tight leading-[1.08]">
                Escola e Equipa de{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-green to-blue-600 dark:from-emerald-300 dark:to-blue-400">
                  Ténis de Mesa
                </span>
              </h1>

              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed max-w-2xl">
                Desenvolve reflexos, concentração e técnica com mesas oficiais de competição em{" "}
                <strong className="text-slate-900 dark:text-white">Vilar do Pinheiro, Vila do Conde</strong>. Aberto a jovens dos Sub-11 aos Sub-16 e a adultos.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-4 space-y-1">
                  <div className="flex items-center gap-2 text-brand-green dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>Horário aos Sábados</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    16h00 (Jovens) • 17h00 (Adultos)
                  </p>
                </div>

                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-4 space-y-1">
                  <div className="flex items-center gap-2 text-brand-green dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    <span>Localização</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Salão Nobre • Junta de Freguesia
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3.5">
                <a
                  href={GESTAO_LINKS.inscricao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="motion-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-green hover:bg-brand-greenDark text-white font-bold text-sm transition-colors shadow-lg shadow-brand-green/25"
                >
                  <span>Inscrever • Treino Experimental Grátis</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <Link
                  href="/jif#regulamento-tenis-mesa"
                  className="motion-press inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-slate-100 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-semibold text-sm transition-colors"
                >
                  <span>Regulamento & Quadro de Honra JIF</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-white/15 shadow-2xl aspect-4/3 bg-slate-900">
                <img
                  src="/assets/images/galeria/tenis-mesa/tenis_mesa_2026_medalhados_tarde_ajavp.webp"
                  alt="Medalhados de Ténis de Mesa da AJAVP nos XL Jogos Inter-Freguesias"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    XL Jogos Inter-Freguesias
                  </p>
                  <p className="text-sm font-semibold">
                    Pódio e espírito familiar em Vilar do Pinheiro
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 p-6 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-brand-green dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <strong>Elegibilidade JIF Vila do Conde:</strong> Para representar a AJAVP nos encontros oficiais dos Jogos Inter-Freguesias, o atleta tem de{" "}
              <strong>ter nascido, residir ou estudar em Vila do Conde</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
