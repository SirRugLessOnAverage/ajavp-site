import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { KitShowcase } from "@/components/patrocinadores/KitShowcase";
import {
  KIT_HOTSPOTS,
  KIT_TEAM_PREVIEWS,
  SPONSORS_LIST,
  type SponsorItem,
} from "@/data/institucional";

export const metadata: Metadata = {
  title: "Patrocinadores e Novo Equipamento 26/27 • AJAVP",
  description:
    "Conhece os Parceiros Institucionais, Patrocinadores Principais e Oficiais que vestem a Mancha Verde na época 2026/2027 da AJAVP.",
};

const SPONSOR_ACCENT_STYLES: Record<
  SponsorItem["accentColor"],
  { border: string; badge: string; dot: string }
> = {
  teal: {
    border:
      "border-teal-300 hover:border-teal-500 dark:border-teal-500/30 dark:hover:border-teal-400/70",
    badge:
      "bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-400/30",
    dot: "text-teal-700 dark:text-teal-400",
  },
  amber: {
    border:
      "border-amber-300 hover:border-amber-500 dark:border-amber-400/30 dark:hover:border-amber-400/70",
    badge:
      "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-400/30",
    dot: "text-amber-700 dark:text-amber-400",
  },
  blue: {
    border:
      "border-blue-300 hover:border-blue-500 dark:border-blue-500/30 dark:hover:border-blue-400/70",
    badge:
      "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-400/30",
    dot: "text-blue-700 dark:text-blue-400",
  },
  red: {
    border:
      "border-rose-300 hover:border-rose-500 dark:border-rose-500/30 dark:hover:border-rose-400/70",
    badge:
      "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-400/30",
    dot: "text-rose-700 dark:text-rose-400",
  },
  emerald: {
    border:
      "border-emerald-300 hover:border-emerald-500 dark:border-emerald-500/30 dark:hover:border-emerald-400/70",
    badge:
      "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-400/30",
    dot: "text-emerald-700 dark:text-emerald-400",
  },
};

const LOGO_STAGE_BG: Record<SponsorItem["logoStageBg"], string> = {
  white: "bg-white border-b border-slate-200 dark:border-white/10",
  black: "bg-zinc-950 border-b border-slate-200 dark:border-white/10",
  slate: "bg-slate-100 border-b border-slate-200 dark:border-white/10",
};

export default function PatrocinadoresPage() {
  const mainSponsors = SPONSORS_LIST.filter((s) => s.tier === "principal");
  const officialSponsors = SPONSORS_LIST.filter((s) => s.tier === "oficial");

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <div>
        {/* HERO COM FOTOGRAFIA REAL DOS ESCALÕES E OS PATROCINADORES */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-linear-to-b from-emerald-50/70 via-white to-slate-50 dark:from-ajavp-green-dark/45 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-white/10 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs
              items={[{ label: "Patrocinadores & Apoios" }]}
              className="mb-6"
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-400/40 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-widest mb-6">
                  <span>🤝</span> Rede de Parceiros & Mecenas 2026/2027
                </div>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy dark:text-white tracking-tight leading-[1.08] mb-6">
                  Quem Faz Crescer a{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-green via-emerald-600 to-amber-600 dark:from-emerald-300 dark:via-emerald-400 dark:to-amber-400">
                    Mancha Verde
                  </span>
                </h1>
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">
                  Cada treino, cada deslocação aos Jogos Inter-Freguesias e cada sorriso dos nossos jovens atletas só é possível graças às instituições e empresas que acreditam no desporto associativo de{" "}
                  <strong className="text-slate-900 dark:text-white">Vilar do Pinheiro</strong>.
                </p>

                <div className="flex flex-wrap gap-3.5">
                  <a
                    href="#novo-equipamento"
                    className="motion-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-green hover:bg-brand-greenDark text-white font-bold text-sm transition-colors shadow-lg shadow-brand-green/25"
                  >
                    👕 Ver Novo Equipamento 26/27
                  </a>
                  <a
                    href="#tornar-parceiro"
                    className="motion-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold text-sm transition-colors shadow-xs"
                  >
                    ✨ Quero Ser Patrocinador
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="motion-photo relative rounded-3xl overflow-hidden border-2 border-amber-400/60 bg-zinc-900 shadow-2xl aspect-4/3">
                  <img
                    src="/assets/images/galeria/Sub-9e11.webp"
                    alt="Escalões Sub-9 e Sub-11 da AJAVP envergando o novo equipamento 2026/2027 com os patrocinadores"
                    className="motion-photo-zoom w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300 block">
                        Época 2026 / 2027
                      </span>
                      <span className="text-sm font-bold text-white">
                        Sub-9 & Sub-11 com a Nova Camisola Oficial
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-brand-green text-white text-xs font-bold">
                      100% Formação
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PARCEIRO INSTITUCIONAL PRINCIPAL: JUNTA DE FREGUESIA DE VILAR DO PINHEIRO */}
        <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-linear-to-r from-emerald-50 via-white to-amber-50/40 dark:from-ajavp-green-dark/40 dark:via-slate-900 dark:to-slate-900 border-2 border-amber-300 dark:border-amber-400/40 p-6 sm:p-10 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4 flex flex-col items-center justify-center bg-white rounded-2xl p-6 border border-slate-200 dark:border-transparent shadow-sm">
                  <picture>
                    <source
                      srcSet="/assets/images/patrocinadores/brasao_junta_vilar_pinheiro.webp"
                      type="image/webp"
                    />
                    <img
                      src="/assets/images/patrocinadores/brasao_junta_vilar_pinheiro.png"
                      alt="Brasão e Logótipo da Junta de Freguesia de Vilar do Pinheiro"
                      className="max-h-32 w-auto object-contain"
                    />
                  </picture>
                </div>

                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-400/40 text-amber-900 dark:text-amber-300 text-xs font-black uppercase tracking-widest mb-3">
                    🏛️ Parceiro Institucional Principal
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy dark:text-white mb-3">
                    Junta de Freguesia de Vilar do Pinheiro
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-5">
                    O pilar institucional da nossa associação. A{" "}
                    <strong className="text-slate-900 dark:text-white">
                      Junta de Freguesia de Vilar do Pinheiro
                    </strong>{" "}
                    assegura o apoio logístico, a cedência de espaços desportivos e a inscrição oficial da nossa comitiva nos{" "}
                    <strong className="text-amber-800 dark:text-amber-300">
                      Jogos Inter-Freguesias de Vila do Conde (JIF)
                    </strong>
                    , promovendo o desporto gratuito e acessível para as famílias da nossa terra.
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs font-bold">
                    <span className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/15">
                      ✓ Apoio à Formação Desportiva
                    </span>
                    <span className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/15">
                      ✓ Cedência do Salão Nobre & Infraestruturas
                    </span>
                    <span className="px-3.5 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-400/30">
                      ✓ Representação Oficial nos XL JIF
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VITRINE INTERATIVA: A NOVA PELE DA MANCHA VERDE (IDEIA 2) */}
        <section
          id="novo-equipamento"
          className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-white/10 scroll-mt-20 transition-colors"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <KitShowcase
              hotspots={KIT_HOTSPOTS}
              teamPreviews={KIT_TEAM_PREVIEWS}
            />
          </div>
        </section>

        {/* PATROCINADORES PRINCIPAIS (3 PILARES) */}
        <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">
                Destaque Principal nos Equipamentos 26/27
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-brand-navy dark:text-white mb-3">
                Patrocinadores Principais
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                Empresas de referência que assumem a linha da frente no apoio aos nossos escalões de formação.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
              {mainSponsors.map((sponsor) => {
                const style = SPONSOR_ACCENT_STYLES[sponsor.accentColor];
                return (
                  <article
                    key={sponsor.id}
                    className={`motion-card rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 ${style.border} overflow-hidden flex flex-col justify-between shadow-lg`}
                  >
                    <div>
                      {/* Palco do Logótipo */}
                      <div
                        className={`h-44 p-6 flex items-center justify-center relative ${
                          LOGO_STAGE_BG[sponsor.logoStageBg]
                        }`}
                      >
                        <picture>
                          <source srcSet={sponsor.logoWebp} type="image/webp" />
                          <img
                            src={sponsor.logoFallback}
                            alt={`Logótipo oficial de ${sponsor.name}`}
                            className="max-h-28 max-w-[220px] w-auto object-contain"
                          />
                        </picture>
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/85 text-white text-[10px] font-bold uppercase tracking-wider">
                          {sponsor.secondaryBadge}
                        </span>
                      </div>

                      {/* Corpo do Cartão */}
                      <div className="p-6">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold border mb-3 ${style.badge}`}
                        >
                          {sponsor.categoryBadge}
                        </span>
                        <h3 className="font-heading text-2xl font-black text-brand-navy dark:text-white mb-3">
                          {sponsor.name}
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-5">
                          {sponsor.description}
                        </p>

                        <ul className="space-y-2 border-t border-slate-200 dark:border-white/10 pt-4">
                          {sponsor.bullets.map((bullet, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200"
                            >
                              <span className={`font-bold ${style.dot}`}>✓</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Rodapé do Cartão */}
                    <div className="px-6 py-3.5 bg-slate-100 dark:bg-black/40 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                      {sponsor.phone ? (
                        <a
                          href={`tel:${sponsor.phone}`}
                          className="font-bold text-amber-800 dark:text-amber-300 hover:underline"
                        >
                          📞 {sponsor.footerLeft}
                        </a>
                      ) : (
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {sponsor.footerLeft}
                        </span>
                      )}
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-green dark:text-emerald-400">
                        {sponsor.footerRight}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* PATROCINADORES OFICIAIS (2 PARCEIROS NOS OMBROS) */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-brand-green dark:text-emerald-400 text-xs font-bold uppercase tracking-widest block mb-2">
                Insígnias Oficiais nos Ombros
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-navy dark:text-white">
                Patrocinadores Oficiais
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {officialSponsors.map((sponsor) => {
                const style = SPONSOR_ACCENT_STYLES[sponsor.accentColor];
                return (
                  <article
                    key={sponsor.id}
                    className={`motion-card rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 ${style.border} overflow-hidden flex flex-col justify-between shadow-lg`}
                  >
                    <div>
                      <div
                        className={`h-40 p-6 flex items-center justify-center relative ${
                          LOGO_STAGE_BG[sponsor.logoStageBg]
                        }`}
                      >
                        <picture>
                          <source srcSet={sponsor.logoWebp} type="image/webp" />
                          <img
                            src={sponsor.logoFallback}
                            alt={`Logótipo oficial de ${sponsor.name}`}
                            className="max-h-24 max-w-[200px] w-auto object-contain"
                          />
                        </picture>
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/85 text-white text-[10px] font-bold uppercase tracking-wider">
                          {sponsor.secondaryBadge}
                        </span>
                      </div>

                      <div className="p-6">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold border mb-3 ${style.badge}`}
                        >
                          {sponsor.categoryBadge}
                        </span>
                        <h3 className="font-heading text-xl font-black text-brand-navy dark:text-white mb-2.5">
                          {sponsor.name}
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4">
                          {sponsor.description}
                        </p>
                        <ul className="space-y-1.5 border-t border-slate-200 dark:border-white/10 pt-3">
                          {sponsor.bullets.map((bullet, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200"
                            >
                              <span className={`font-bold ${style.dot}`}>✓</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="px-6 py-3 bg-slate-100 dark:bg-black/40 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {sponsor.footerLeft}
                      </span>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                        {sponsor.footerRight}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* IMPACTO SOCIAL & CONVITE A NOVOS MECENAS */}
        <section
          id="tornar-parceiro"
          className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 scroll-mt-20 transition-colors"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-linear-to-r from-emerald-50 via-white to-amber-50/40 dark:from-ajavp-green-dark/50 dark:via-slate-900 dark:to-slate-900 border-2 border-emerald-300 dark:border-emerald-500/30 p-8 sm:p-12 text-center shadow-xl">
              <span className="inline-block px-4 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-400/30 text-xs font-bold uppercase tracking-widest mb-4">
                Junta a Tua Marca à AJAVP
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-brand-navy dark:text-white mb-4">
                Queres Ver a Tua Empresa nos Campos da Região?
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-base max-w-2xl mx-auto mb-8 leading-relaxed">
                Ao apoiar a AJAVP, a tua marca ganha visibilidade semanal nos pavilhões dos JIF, nas nossas redes sociais e no equipamento dos nossos atletas, enquanto investe diretamente na saúde e formação das crianças de Vilar do Pinheiro.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-8">
                <div className="p-4 rounded-2xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 shadow-2xs">
                  <span className="text-2xl block mb-1">👕</span>
                  <h3 className="font-bold text-brand-navy dark:text-white text-sm mb-1">
                    Presença nos Equipamentos
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Visibilidade em todos os jogos oficiais dos JIF, torneios e eventos da freguesia.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 shadow-2xs">
                  <span className="text-2xl block mb-1">📱</span>
                  <h3 className="font-bold text-brand-navy dark:text-white text-sm mb-1">
                    Divulgação Digital & Site
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Destaque permanente no site oficial, convocatórias e publicações nas redes sociais.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 shadow-2xs">
                  <span className="text-2xl block mb-1">💚</span>
                  <h3 className="font-bold text-brand-navy dark:text-white text-sm mb-1">
                    Impacto Local Direto
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    100% do apoio reverte para material desportivo, inscrições e formação juvenil.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contactos#formulario-contacto"
                  className="motion-press inline-flex items-center gap-2 px-7 py-4 rounded-full bg-amber-400 text-slate-950 font-black text-sm hover:bg-amber-300 transition-colors shadow-md"
                >
                  🤝 Falar com a Direção sobre Patrocínios
                </Link>
                <a
                  href="mailto:geralajavp@gmail.com?subject=Proposta%20de%20Patrocinio%20AJAVP"
                  className="motion-press inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-slate-100 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-bold text-sm transition-colors shadow-2xs"
                >
                  ✉️ geralajavp@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
