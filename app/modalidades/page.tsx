import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ModalidadesActionGrid } from "@/components/modalidades/ModalidadesActionGrid";
import { RingueWeatherSection } from "@/components/modalidades/RingueWeatherSection";
import {
  MODALIDADES_LIST,
  ESCALOES_CROMOS,
  TRAINING_VENUES,
} from "@/data/institucional";

export const metadata: Metadata = {
  title: "Modalidades e Horários 2026/2027 • AJAVP — Vilar do Pinheiro",
  description:
    "Futsal e Futebol, Atletismo, Ténis de Mesa, Duatlo BTT, Badminton e Futebol de Praia. Consulta os Cromos Oficiais 26/27, o Horário de Treinos e a meteorologia do Ringue.",
};

const VENUE_BADGE_STYLE: Record<string, string> = {
  R: "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-400/30",
  C: "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-400/30",
  P: "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-400/30",
  JF: "bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-400/30",
};

export default function ModalidadesPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <div>
        {/* HERO COM MURAL POLAROID BENTO GRID DOS ATLETAS */}
        <section className="relative pt-12 pb-20 lg:pt-14 lg:pb-24 overflow-hidden bg-linear-to-b from-emerald-50/70 via-white to-slate-50 dark:from-ajavp-green-dark/40 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-white/10 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-emerald-500/10 dark:from-ajavp-green/20 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs
              items={[{ label: "Modalidades & Treinos" }]}
              className="mb-5"
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Coluna Esquerda: Texto e CTAs */}
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/30 text-emerald-900 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest mb-6">
                  <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
                  Desporto para Todos • Época 2026/2027
                </div>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy dark:text-white tracking-tight leading-[1.08] mb-6">
                  As Nossas <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-green via-emerald-600 to-amber-600 dark:from-emerald-300 dark:via-emerald-400 dark:to-amber-400">
                    Modalidades
                  </span>
                </h1>
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
                  Da formação de Futsal e Futebol a partir dos 5 anos até ao Atletismo, Ténis de Mesa, Duatlo BTT, Badminton e Futebol de Praia nos{" "}
                  <strong className="text-slate-900 dark:text-white">Jogos Inter-Freguesias de Vila do Conde (JIF)</strong>. Conhece os nossos escalões, os novos equipamentos 26/27 e os horários de treino.
                </p>

                <div className="flex flex-wrap gap-3.5">
                  <a
                    href="#horarios"
                    className="motion-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-green hover:bg-brand-greenDark text-white font-bold text-sm transition-colors shadow-lg shadow-brand-green/25"
                  >
                    📅 Horários & Cromos 26/27
                  </a>
                  <a
                    href="#tempo-semana"
                    className="motion-press inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-slate-100 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-semibold text-sm transition-colors shadow-xs"
                  >
                    🌤️ Meteorologia no Ringue
                  </a>
                  <a
                    href="https://forms.gle/YJdnZyUsMB8aBADj6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="motion-press inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-amber-100 hover:bg-amber-200 dark:bg-amber-500/20 dark:hover:bg-amber-500/30 border border-amber-300 dark:border-amber-400/40 text-amber-900 dark:text-amber-300 font-bold text-sm transition-colors"
                  >
                    📝 Inscrever Atleta
                  </a>
                </div>
              </div>

              {/* Coluna Direita: Bento Grid Polaroid com Fotos Reais */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-4 sm:space-y-5">
                  <div className="polaroid-left motion-photo relative rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-white/15 bg-zinc-900 shadow-xl aspect-4/3">
                    <img
                      src="/assets/images/galeria/sub7banco.webp"
                      alt="Sub-7 AJAVP no banco de suplentes com o novo equipamento 26/27"
                      className="motion-photo-zoom w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Sub-7 • Nova Pele 26/27</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                        Novo
                      </span>
                    </div>
                  </div>

                  <div className="polaroid-right motion-photo relative rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-white/15 bg-zinc-900 shadow-xl aspect-4/3">
                    <img
                      src="/assets/images/galeria/corta_mato_equipa_2026.webp"
                      alt="Comitiva de Corta-Mato e Atletismo da AJAVP"
                      className="motion-photo-zoom w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Atletismo & Corta-Mato</span>
                      <span className="px-2 py-0.5 rounded-full bg-brand-green text-white text-[10px] font-bold uppercase">
                        Campeões
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-5 pt-6 sm:pt-8">
                  <div className="polaroid-right motion-photo relative rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-white/15 bg-zinc-900 shadow-xl aspect-4/3">
                    <img
                      src="/assets/images/galeria/Sub-9e11.webp"
                      alt="União dos escalões Sub-9 e Sub-11 da AJAVP"
                      className="motion-photo-zoom w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Sub-9 & Sub-11 JIF</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/25 backdrop-blur-xs text-white text-[10px] font-bold uppercase">
                        Formação
                      </span>
                    </div>
                  </div>

                  <div className="polaroid-left motion-photo relative rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-white/15 bg-zinc-900 shadow-xl aspect-4/3">
                    <img
                      src="/assets/images/galeria/foto_17.webp"
                      alt="Duplas de Duatlo BTT da AJAVP"
                      className="motion-photo-zoom w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Duatlo em Duplas (BTT)</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                        JIF
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GRELHA DE ACTION CARDS DAS 6 MODALIDADES */}
        <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-brand-green dark:text-emerald-400 text-xs font-bold uppercase tracking-widest block mb-2">
                  6 Modalidades Oficiais • Fotografias Reais
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-black text-brand-navy dark:text-white">
                  Onde a Mancha Verde Entra em Campo
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md">
                Clica nas miniaturas de cada modalidade para alternar entre as fotos dos nossos atletas ou clica na imagem principal para ampliar em ecrã inteiro.
              </p>
            </div>

            <ModalidadesActionGrid modalidades={MODALIDADES_LIST} />
          </div>
        </section>

        {/* SECÇÃO HORÁRIOS, EQUIPAMENTO DE TREINO PRETO, METEOROLOGIA E CROMOS 26/27 */}
        <section
          id="horarios"
          className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 scroll-mt-20 transition-colors"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Cabeçalho da Secção */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-400/30 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
                <span>📅</span> Época Desportiva 2026 / 2027
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy dark:text-white mb-4">
                Horário Oficial de Treinos & Escalões
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base">
                Planeia a semana de treinos do teu educando com a meteorologia ao vivo para o Ringue Descoberto e conhece os plantéis da época 2026/2027.
              </p>
            </div>

            {/* DESTAQUE: EQUIPAMENTO OFICIAL DE TREINO (PRETO) - SUB-9 */}
            <div className="mb-12 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-900 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-5 relative aspect-4/3 lg:aspect-auto lg:h-full min-h-[280px] overflow-hidden bg-zinc-950">
                  <img
                    src="/assets/images/galeria/sub9_treino_preto.webp"
                    alt="Escalão Sub-9 da AJAVP com o equipamento oficial de treino preto no treino noturno"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                    👕 Equipamento de Treino (Preto)
                  </span>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10">
                  <span className="text-brand-green dark:text-emerald-400 text-xs font-bold uppercase tracking-widest block mb-2">
                    Noite de Treino em Vilar do Pinheiro • Escalão Sub-9
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-brand-navy dark:text-white mb-3">
                    Rigor nos Treinos, Orgulho ao Fim de Semana
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    Durante a semana, os nossos escalões de formação treinam com o{" "}
                    <strong className="text-slate-900 dark:text-white">Equipamento Oficial de Treino (Preto)</strong> com o emblema da AJAVP ao peito — aqui estreado pelos nossos{" "}
                    <strong className="text-amber-700 dark:text-amber-300">Sub-9</strong> no relvado sintético sob iluminação noturna. Nos jogos oficiais do fim de semana, vestimos a nova camisola listada verde e branca.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/patrocinadores#novo-equipamento"
                      className="motion-press inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                    >
                      ✨ Ver Novo Equipamento Oficial 26/27 →
                    </Link>
                    <a
                      href="https://forms.gle/YJdnZyUsMB8aBADj6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="motion-press inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-semibold text-xs uppercase tracking-wider transition-colors"
                    >
                      Inscrever nos Treinos de Captação
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* METEOROLOGIA 7 DIAS NO RINGUE (SERVER COMPONENT COM ISR 30 MIN) */}
            <div className="mb-14">
              <RingueWeatherSection />
            </div>

            {/* CROMOS OFICIAIS DA ÉPOCA 26/27 (4 ESCALÕES DE FORMAÇÃO COM FOTOS REAIS) */}
            <div className="mb-14">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
                <div>
                  <span className="text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-widest block mb-1">
                    Coleção Oficial 2026/2027
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-brand-navy dark:text-white">
                    Cromos dos Escalões de Formação
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Verifica o ano de nascimento do atleta e os respetivos dias e recintos de treino.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ESCALOES_CROMOS.map((cromo) => {
                  const accentBorder: Record<string, string> = {
                    amber: "border-amber-300 hover:border-amber-500 dark:border-amber-400/40 dark:hover:border-amber-400",
                    emerald: "border-emerald-300 hover:border-emerald-500 dark:border-emerald-400/40 dark:hover:border-emerald-400",
                    blue: "border-blue-300 hover:border-blue-500 dark:border-blue-400/40 dark:hover:border-blue-400",
                    purple: "border-purple-300 hover:border-purple-500 dark:border-purple-400/40 dark:hover:border-purple-400",
                  };
                  return (
                    <article
                      key={cromo.escalao}
                      className={`motion-card rounded-2xl bg-white dark:bg-slate-900 border-2 ${
                        accentBorder[cromo.accent] ?? "border-slate-200 dark:border-white/15"
                      } overflow-hidden flex flex-col shadow-lg`}
                    >
                      {/* Topo Fotográfico Estilo Cromo */}
                      <div className="relative aspect-4/3 overflow-hidden bg-zinc-950">
                        <img
                          src={cromo.photo}
                          alt={cromo.photoAlt}
                          loading="lazy"
                          style={{ objectPosition: cromo.objectPosition ?? "center" }}
                          className="motion-photo-zoom w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-black text-white uppercase tracking-wider">
                            {cromo.kitBadge}
                          </span>
                        </div>
                        <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-baseline justify-between">
                          <h4 className="font-heading text-2xl font-black text-white drop-shadow">
                            {cromo.escalao}
                          </h4>
                          <span className="text-xs font-semibold text-gray-200">
                            {cromo.subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Horários do Escalão */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <ul className="space-y-2.5">
                          {cromo.sessions.map((slot, idx) => (
                            <li
                              key={idx}
                              className="p-2.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs"
                            >
                              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white mb-1">
                                <span>{slot.day}</span>
                                <span className="text-amber-700 dark:text-amber-300">{slot.time}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-[11px]">
                                <span
                                  className={`px-1.5 py-0.5 rounded font-black text-[10px] border ${
                                    VENUE_BADGE_STYLE[slot.venueCode] ?? ""
                                  }`}
                                >
                                  {slot.venueCode}
                                </span>
                                <span>Recinto [{slot.venueCode}]</span>
                              </div>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-1.5">
                          <p className="text-[11px] text-slate-600 dark:text-slate-300">{cromo.footerNote}</p>
                          {cromo.warningNote && (
                            <p className="text-[11px] text-amber-800 dark:text-amber-300 font-semibold">
                              {cromo.warningNote}
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* GRELHA SEMANAL COMPLETA (2.ª FEIRA A DOMINGO - MATRIZ OFICIAL AJAVP) */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 overflow-hidden mb-10 shadow-lg">
              <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-brand-navy dark:text-white">
                    Grelha Semanal Completa (2.ª Feira a Domingo)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    Matriz oficial de todos os treinos semanais de Futsal Formação e Outras Modalidades.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className={`px-2.5 py-1 rounded-md border font-bold ${VENUE_BADGE_STYLE.R}`}>
                    R = Ringue AJAVP
                  </span>
                  <span className={`px-2.5 py-1 rounded-md border font-bold ${VENUE_BADGE_STYLE.C}`}>
                    C = Pavilhão Canidelo
                  </span>
                  <span className={`px-2.5 py-1 rounded-md border font-bold ${VENUE_BADGE_STYLE.P}`}>
                    P = MaiaSport
                  </span>
                  <span className={`px-2.5 py-1 rounded-md border font-bold ${VENUE_BADGE_STYLE.JF}`}>
                    JF = Junta Freguesia
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-700 dark:text-slate-200 border-collapse min-w-[980px]">
                  <thead>
                    <tr className="bg-brand-navy dark:bg-slate-950 text-white font-bold uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-white/10">
                      <th className="py-3.5 px-4 min-w-[160px]">Modalidade</th>
                      <th className="py-3.5 px-3 text-center min-w-[130px]">2.ª Feira</th>
                      <th className="py-3.5 px-3 text-center min-w-[130px]">3.ª Feira</th>
                      <th className="py-3.5 px-3 text-center min-w-[155px]">4.ª Feira</th>
                      <th className="py-3.5 px-3 text-center min-w-[175px]">5.ª Feira</th>
                      <th className="py-3.5 px-3 text-center min-w-[150px]">6.ª Feira</th>
                      <th className="py-3.5 px-3 text-center min-w-[175px]">Sábado</th>
                      <th className="py-3.5 px-3 text-center min-w-[120px]">Domingo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                    {/* Linha 1: Futsal Formação */}
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/2 transition-colors align-top">
                      <td className="py-4 px-4 bg-slate-50/70 dark:bg-white/2">
                        <div className="font-heading font-black text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                          <span>⚽</span>
                          <span>Futsal Formação</span>
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                          (Ringue e Pavilhões)
                        </div>
                      </td>

                      {/* 2.ª Feira */}
                      <td className="py-4 px-3 text-center">
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                          <div className="font-bold text-blue-900 dark:text-blue-300 text-xs">Sub-11</div>
                          <div className="text-[11px] text-slate-700 dark:text-slate-300 font-medium mt-0.5">
                            19h00 – 20h30{" "}
                            <span className="font-bold text-slate-900 dark:text-white">(R)</span>
                          </div>
                        </div>
                      </td>

                      {/* 3.ª Feira */}
                      <td className="py-4 px-3 text-center">
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                          <div className="font-bold text-emerald-900 dark:text-emerald-300 text-xs">Sub-9</div>
                          <div className="text-[11px] text-slate-700 dark:text-slate-300 font-medium mt-0.5">
                            19h00 – 20h30{" "}
                            <span className="font-bold text-slate-900 dark:text-white">(R)</span>
                          </div>
                        </div>
                      </td>

                      {/* 4.ª Feira */}
                      <td className="py-4 px-3 text-center">
                        <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-400/30 mb-1.5 shadow-2xs">
                          <div className="font-bold text-blue-950 dark:text-blue-200 text-xs">
                            Sub-11 + Sub-13
                          </div>
                          <div className="text-[11px] text-blue-900 dark:text-blue-300 font-semibold mt-0.5">
                            18h30 – 20h00{" "}
                            <span className="font-black text-blue-950 dark:text-white">(C)</span>
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium italic">
                          Ringue livre p/ GR (19h – 20h30)
                        </div>
                      </td>

                      {/* 5.ª Feira */}
                      <td className="py-4 px-3 text-center">
                        <div className="font-bold text-slate-800 dark:text-slate-200 text-[11px] mb-1">
                          19h00 – 20h00:
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-400/30 mb-1 shadow-2xs">
                          <div className="font-bold text-emerald-950 dark:text-emerald-200 text-xs">
                            Sub-9{" "}
                            <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-300">
                              (P - MaiaSport)*
                            </span>
                          </div>
                        </div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          Sub-7{" "}
                          <span className="text-[11px] text-slate-600 dark:text-slate-300 font-normal">
                            (R - Ringue)
                          </span>
                        </div>
                        <div className="text-[10px] text-amber-800 dark:text-amber-300 font-semibold italic mt-1 leading-tight">
                          *Partilha pontual c/ Sub-7 ou Sub-13 (ver nota)
                        </div>
                      </td>

                      {/* 6.ª Feira */}
                      <td className="py-4 px-3 text-center">
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                          <div className="font-bold text-purple-900 dark:text-purple-300 text-xs">Sub-13</div>
                          <div className="text-[11px] text-slate-700 dark:text-slate-300 font-medium mt-0.5">
                            19h00 – 20h00{" "}
                            <span className="font-bold text-slate-900 dark:text-white">(R)**</span>
                          </div>
                        </div>
                        <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-amber-900 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-400/30 leading-tight">
                          <span>Atenção: &lt; 24h descanso</span>
                        </div>
                        <div className="text-[10px] text-slate-600 dark:text-slate-400 italic mt-1 leading-tight">
                          **Ringue livre se treinarem 5.ª no MaiaSport
                        </div>
                      </td>

                      {/* Sábado */}
                      <td className="py-4 px-3 text-center space-y-1.5">
                        <div className="p-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-400/30 text-left">
                          <div className="font-bold text-emerald-950 dark:text-emerald-300 text-[11px]">
                            09h00 – 10h00:
                          </div>
                          <div className="text-[11px] text-slate-800 dark:text-slate-200 font-medium">
                            Sub-9 + Sub-13{" "}
                            <span className="font-bold text-slate-950 dark:text-white">(R)</span>
                          </div>
                        </div>
                        <div className="p-2 rounded-xl bg-blue-50/80 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-400/30 text-left">
                          <div className="font-bold text-blue-950 dark:text-blue-300 text-[11px]">
                            10h00 – 11h00:
                          </div>
                          <div className="text-[11px] text-slate-800 dark:text-slate-200 font-medium">
                            Sub-7 + Sub-11{" "}
                            <span className="font-bold text-slate-950 dark:text-white">(R)</span>
                          </div>
                        </div>
                      </td>

                      {/* Domingo */}
                      <td className="py-4 px-3 text-center align-middle font-bold text-slate-400 dark:text-slate-500">
                        -
                      </td>
                    </tr>

                    {/* Linha 2: Outras Modalidades */}
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/2 transition-colors align-top">
                      <td className="py-4 px-4 bg-slate-50/70 dark:bg-white/2">
                        <div className="font-heading font-black text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                          <span>🏓</span>
                          <span>Outras Modalidades</span>
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                          (Junta Freguesia)
                        </div>
                      </td>
                      <td className="py-4 px-3 text-center align-middle font-semibold text-slate-400 dark:text-slate-500">
                        -
                      </td>
                      <td className="py-4 px-3 text-center align-middle font-semibold text-slate-400 dark:text-slate-500">
                        -
                      </td>
                      <td className="py-4 px-3 text-center align-middle font-semibold text-slate-400 dark:text-slate-500">
                        -
                      </td>
                      <td className="py-4 px-3 text-center align-middle font-semibold text-slate-400 dark:text-slate-500">
                        -
                      </td>
                      <td className="py-4 px-3 text-center align-middle font-semibold text-slate-400 dark:text-slate-500">
                        -
                      </td>
                      <td className="py-4 px-3 text-center">
                        <div className="p-2.5 rounded-xl bg-purple-50/80 dark:bg-purple-500/15 border border-purple-200 dark:border-purple-400/30 text-left space-y-0.5">
                          <div className="font-bold text-slate-900 dark:text-white text-xs">
                            🏓 Ténis de Mesa:
                          </div>
                          <div className="text-[11px] text-slate-700 dark:text-slate-200">
                            <span className="font-semibold text-slate-900 dark:text-white">Sub-15:</span> 16h00{" "}
                            <span className="font-bold text-purple-900 dark:text-purple-300">(JF)</span>
                          </div>
                          <div className="text-[11px] text-slate-700 dark:text-slate-200">
                            <span className="font-semibold text-slate-900 dark:text-white">Adultos:</span> 17h00{" "}
                            <span className="font-bold text-purple-900 dark:text-purple-300">(JF)</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-3 text-center">
                        <div className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-400/30 text-left shadow-2xs">
                          <div className="font-bold text-emerald-950 dark:text-emerald-300 text-xs">
                            🏃 Atletismo:
                          </div>
                          <div className="text-[11px] text-slate-700 dark:text-slate-200 font-medium mt-0.5">
                            09h00{" "}
                            <span className="font-bold text-emerald-800 dark:text-emerald-300">(JF)</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* NOTA ASSERTIVA DE TREINOS: MAIASPORT (5.ªS FEIRAS) */}
            <div className="bg-amber-50/90 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-400/50 rounded-3xl p-5 md:p-6 mb-12 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md text-xl font-bold">
                  ⚠️
                </div>
                <div className="space-y-2.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-heading font-black text-sm uppercase tracking-wider text-amber-950 dark:text-amber-300">
                      Aviso Oficial • Pavilhão MaiaSport às 5.ªs Feiras
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-200/90 dark:bg-amber-500/20 text-amber-950 dark:text-amber-200 text-[10px] font-extrabold uppercase border border-amber-300 dark:border-amber-400/40">
                      Regime de Partilha
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-medium">
                    Refere-se de{" "}
                    <strong className="text-slate-950 dark:text-white">forma assertiva</strong> que, às{" "}
                    <strong className="text-slate-950 dark:text-white">quintas-feiras no Pavilhão MaiaSport</strong>, os{" "}
                    <strong className="text-slate-950 dark:text-white">
                      Sub-9 podem ter de partilhar o espaço de treino com os Sub-7 ou com os Sub-13
                    </strong>
                    . Caso isso aconteça com o escalão{" "}
                    <strong className="text-slate-950 dark:text-white">Sub-13</strong>, estes{" "}
                    <strong className="text-slate-950 dark:text-white">
                      deixarão o Ringue de Vilar do Pinheiro totalmente livre na sexta-feira
                    </strong>{" "}
                    seguinte.
                  </p>
                  <div className="pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-amber-200 dark:border-white/10">
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-emerald-200">
                      <span aria-hidden="true">🔔</span>
                      <span>
                        Estar atento ao WhatsApp oficial para saber em que semana(s) isso acontece!
                      </span>
                    </div>
                    <a
                      href="https://chat.whatsapp.com/BLxsjBfDw7AEAonDy72187"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white font-bold text-xs shadow-xs transition-colors self-start sm:self-auto shrink-0"
                    >
                      <span>💬</span>
                      <span>Avisos no WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* LEGENDA DETALHADA DAS INSTALAÇÕES E RECINTOS DESPORTIVOS */}
            <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200/60 dark:border-emerald-500/30">
                    <span>📍</span>
                    <span>Guia Oficial dos Locais de Treino • AJAVP</span>
                  </div>
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-brand-navy dark:text-white">
                    Legenda das Instalações &amp; Recintos Desportivos
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    Consulta abaixo a localização, tipo de piso, modalidades e horários de treino associados a cada sigla do mapa semanal.
                  </p>
                </div>
                <Link
                  href="/associacao#locais"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white font-bold text-xs border border-slate-200 dark:border-white/10 transition-colors self-start sm:self-auto shrink-0"
                >
                  <span>🗺️</span>
                  <span>Ver Mapas Interativos no Clube →</span>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {TRAINING_VENUES.map((venue) => (
                  <div
                    key={venue.code}
                    className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 p-5 flex flex-col justify-between hover:border-emerald-400 dark:hover:border-white/25 transition-colors shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`px-2.5 py-1 rounded-lg font-black text-xs border ${
                            VENUE_BADGE_STYLE[venue.code] ?? ""
                          }`}
                        >
                          [{venue.code}]
                        </span>
                        <span className="text-[11px] text-slate-600 dark:text-slate-300 font-semibold">
                          {venue.typeBadge}
                        </span>
                      </div>
                      <h4 className="font-heading text-base font-bold text-brand-navy dark:text-white mb-1.5">
                        {venue.name}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                        {venue.location}
                      </p>
                      <div className="text-[11px] text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900/80 rounded-xl p-3 border border-slate-200/80 dark:border-white/10 mb-4 space-y-1">
                        <span className="font-bold text-slate-900 dark:text-white block mb-1">
                          {venue.scheduleTitle}
                        </span>
                        {venue.scheduleBullets.map((b, idx) => (
                          <p key={idx}>
                            <strong className="text-amber-800 dark:text-amber-300">{b.bold}</strong> {b.text}
                          </p>
                        ))}
                      </div>
                    </div>

                    <a
                      href={venue.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between text-xs font-bold text-brand-green dark:text-emerald-400 hover:underline transition-colors pt-2 border-t border-slate-200 dark:border-white/10"
                    >
                      <span>{venue.mapsLabel}</span>
                      <span>↗</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
