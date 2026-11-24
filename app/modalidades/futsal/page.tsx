import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, ShieldCheck, Trophy, Users } from "lucide-react";
import { GESTAO_LINKS, SITE_URL } from "@/lib/site";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { ESCALOES_CROMOS, TRAINING_VENUES } from "@/data/institucional";

export const metadata: Metadata = {
  title: "Futsal de Formação Sub-7 a Sub-16 em Vila do Conde",
  description:
    "Escolinha e equipas de formação de Futsal (Sub-7 aos Sub-16) em Vilar do Pinheiro, Vila do Conde. Treino experimental gratuito e participação oficial nos XL Jogos Inter-Freguesias.",
  alternates: {
    canonical: `${SITE_URL}/modalidades/futsal`,
  },
  openGraph: {
    title: "Futsal de Formação Sub-7 a Sub-16 • AJAVP Vilar do Pinheiro",
    description:
      "Treinos semanais em pavilhão coberto e ringue, ambiente familiar e inscrição online simples para rapazes e raparigas.",
    url: `${SITE_URL}/modalidades/futsal`,
    siteName: "AJAVP",
    locale: "pt_PT",
    type: "website",
    images: [
      {
        url: "/assets/images/galeria/sub11.webp",
        width: 1200,
        height: 630,
        alt: "Equipa de Futsal Sub-11 da AJAVP Vilar do Pinheiro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Futsal Sub-7 a Sub-16 • Vilar do Pinheiro",
    description: "Inscreve o teu filho num treino experimental gratuito de Futsal na AJAVP.",
    images: ["/assets/images/galeria/sub11.webp"],
  },
};

export default function FutsalLandingPage() {
  const futsalVenues = TRAINING_VENUES.filter((v) => v.code !== "JF");

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <FaqJsonLd
        items={[
          {
            question: "Que escalões de Futsal existem na AJAVP?",
            answer:
              "Temos formação ativa dos Sub-7 aos Sub-16 (incluindo Sub-7, Sub-9, Sub-11, Sub-13 e Sub-15/16) para rapazes e raparigas em Vilar do Pinheiro, Vila do Conde.",
          },
          {
            question: "Quem pode jogar nos Jogos Inter-Freguesias (JIF) de Vila do Conde?",
            answer:
              "Segundo o regulamento oficial da ADCCVC, podem participar pelos escalões da AJAVP os atletas que tenham nascido, residam ou estudem no concelho de Vila do Conde. Os treinos são abertos a todos os jovens interessados.",
          },
          {
            question: "É possível fazer um treino experimental gratuito antes de inscrever?",
            answer:
              "Sim! Os jovens atletas podem experimentar uma sessão de treino gratuitamente antes de formalizar a inscrição online.",
          },
        ]}
      />

      {/* HERO */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden bg-linear-to-b from-emerald-50/80 via-white to-slate-50 dark:from-ajavp-green-dark/40 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Modalidades", href: "/modalidades" },
              { label: "Futsal de Formação" },
            ]}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-400/30 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-widest">
                <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Inscrições Abertas • Sub-7 aos Sub-16</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl font-black text-brand-navy dark:text-white tracking-tight leading-[1.08]">
                Escolinha de Futsal em{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-green to-amber-500 dark:from-emerald-300 dark:to-amber-400">
                  Vilar do Pinheiro
                </span>
              </h1>

              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed max-w-2xl">
                Formação desportiva dos <strong className="text-slate-900 dark:text-white">Sub-7 aos Sub-16</strong> com foco no espírito de equipa, amizade e competição saudável nos{" "}
                <strong className="text-slate-900 dark:text-white">XL Jogos Inter-Freguesias de Vila do Conde</strong>.
              </p>

              <div className="flex flex-wrap gap-3.5">
                <a
                  href={GESTAO_LINKS.inscricao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="motion-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-green hover:bg-brand-greenDark text-white font-bold text-sm transition-colors shadow-lg shadow-brand-green/25"
                >
                  <span>Inscrever Atleta • Treino Gratuito</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <Link
                  href="/jif/futsal"
                  className="motion-press inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-slate-100 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-semibold text-sm transition-colors"
                >
                  <span>Resultados e Jornadas JIF</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-white/15 shadow-2xl aspect-4/3 bg-slate-900">
                <img
                  src="/assets/images/galeria/sub11.webp"
                  alt="Equipa de Futsal Sub-11 da AJAVP Vilar do Pinheiro"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Mancha Verde • Vilar do Pinheiro
                  </p>
                  <p className="text-sm font-semibold">
                    Treinos semanais em pavilhão coberto e ringue sintético
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CRITÉRIO DE ELEGIBILIDADE JIF */}
      <section className="py-10 bg-white dark:bg-slate-900/60 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-brand-green text-white shrink-0">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-heading text-lg sm:text-xl font-extrabold text-brand-navy dark:text-white">
                  Elegibilidade Oficial nos Jogos Inter-Freguesias (Vila do Conde)
                </h2>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                  Para competir oficialmente pela AJAVP nos JIF, o jovem atleta deve cumprir{" "}
                  <strong>pelo menos um</strong> destes requisitos:{" "}
                  <strong>ter nascido</strong>, <strong>residir</strong> ou <strong>estudar</strong> no concelho de Vila do Conde.
                </p>
              </div>
            </div>
            <Link
              href="/jif#modalidades"
              className="motion-press shrink-0 px-5 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-500/40 text-brand-green dark:text-emerald-300 font-bold text-xs hover:bg-emerald-100/50 transition-colors"
            >
              Ver Regulamento JIF →
            </Link>
          </div>
        </div>
      </section>

      {/* ESCALÕES E HORÁRIOS */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-green dark:text-emerald-400">
              <Users className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Escalões de Formação</span>
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-navy dark:text-white mt-1">
              Horários Semanais de Treino
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Inclui também captação para os escalões Sub-15 e Sub-16.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ESCALOES_CROMOS.map((cromo) => (
            <div
              key={cromo.escalao}
              className="motion-card rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 overflow-hidden shadow-md flex flex-col"
            >
              <div className="relative h-48 bg-slate-900">
                <img
                  src={cromo.photo}
                  alt={cromo.photoAlt}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: cromo.objectPosition || "center" }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    {cromo.subtitle}
                  </span>
                  <h3 className="font-heading text-xl font-black">{cromo.escalao}</h3>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <ul className="space-y-2 text-xs">
                  {cromo.sessions.map((s, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-100 dark:border-white/10 last:border-0"
                    >
                      <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-green dark:text-emerald-400" aria-hidden="true" />
                        {s.day}
                      </span>
                      <span className="text-slate-600 dark:text-slate-300">
                        {s.time} ({s.venueCode})
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {cromo.footerNote}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RECINTOS */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {futsalVenues.map((venue) => (
            <div
              key={venue.code}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-5 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 text-xs font-black">
                  Recinto {venue.code}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {venue.typeBadge}
                </span>
              </div>
              <h3 className="font-heading font-bold text-base text-brand-navy dark:text-white">
                {venue.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">{venue.location}</p>
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green dark:text-emerald-400 hover:underline"
              >
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Ver no Google Maps</span>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
