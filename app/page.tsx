import React from "react";
import Link from "next/link";
import {
  Trophy,
  Users,
  ChevronRight,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  Shield,
  HeartHandshake,
  IdCard,
  LayoutDashboard,
  Bell,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { NoticiasSection } from "@/components/home/NoticiasSection";
import { EventosSection } from "@/components/home/EventosSection";
import type { SiteNoticia, SiteEvento } from "@/lib/types/database";

export const revalidate = 60;

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch das notícias publicadas
  let noticias: SiteNoticia[] = [];
  try {
    const { data, error } = await supabase
      .from("site_noticias")
      .select("*")
      .eq("publicado", true)
      .order("publicado_em", { ascending: false })
      .limit(6);

    if (!error && data) {
      noticias = data as SiteNoticia[];
    }
  } catch (err) {
    console.error("Erro ao carregar notícias:", err);
  }

  // Fetch dos eventos agendados
  let eventos: SiteEvento[] = [];
  try {
    const { data, error } = await supabase
      .from("site_eventos")
      .select("*")
      .order("data_hora", { ascending: true })
      .limit(6);

    if (!error && data) {
      eventos = data as SiteEvento[];
    }
  } catch (err) {
    console.error("Erro ao carregar eventos:", err);
  }

  return (
    <>
      {/* Hero Section com Imagem Amálgama das Modalidades */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-slate-200 dark:border-white/10 transition-colors">
        {/* Imagem de Fundo Amálgama com Overlay Gradiente Adaptativo */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/hero-amalgama.webp"
            alt="Amálgama desportiva da AJAVP: Futsal Formação, Corta-Mato, 25 de Abril, Duatlo BTT e Futebol de Praia"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center opacity-90 dark:opacity-75 contrast-105 saturate-110"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/82 to-white/20 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/25" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-50/90 via-transparent to-white/30 dark:from-slate-950/90 dark:via-transparent dark:to-slate-950/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/95 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/30 text-emerald-900 dark:text-emerald-300 text-xs font-bold tracking-wide shadow-2xs backdrop-blur-xs">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Associação Jovens e Adultos &bull; Época 2026/27</span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-brand-navy dark:text-white tracking-tight leading-[1.1] drop-shadow-2xs">
                A Tua Terra <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-green via-emerald-600 to-amber-600 dark:from-emerald-400 dark:via-teal-300 dark:to-amber-300">
                  Tem Futuro.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Promovemos o desporto, a formação de jovens e o convívio comunitário em Vilar do Pinheiro. Da formação ao escalão sénior, todos têm lugar na nossa equipa.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="https://ajavp-gestao.vercel.app/inscricao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-green hover:bg-brand-greenDark text-white font-heading font-bold px-7 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 text-sm sm:text-base cursor-pointer"
                >
                  <Users className="w-5 h-5" />
                  <span>Inscreve-te &bull; Treino Gratuito</span>
                </a>

                <Link
                  href="/jif"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/90 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900 border border-slate-300 dark:border-white/20 text-brand-navy dark:text-white font-heading font-bold px-7 py-4 rounded-2xl transition-all text-sm sm:text-base backdrop-blur-md shadow-md"
                >
                  <Trophy className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                  <span>XL Jogos Inter-Freguesias</span>
                </Link>
              </div>

              {/* Badges / Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-300/80 dark:border-white/15 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="font-heading font-black text-2xl sm:text-3xl text-brand-green dark:text-emerald-400">
                    6+
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 font-semibold">
                    Modalidades Ativas
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="font-heading font-black text-2xl sm:text-3xl text-amber-700 dark:text-amber-400">
                    150+
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 font-semibold">
                    Atletas e Jovens
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="font-heading font-black text-2xl sm:text-3xl text-brand-navy dark:text-white">
                    19
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 font-semibold">
                    Freguesias nos JIF
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl p-6 sm:p-8 bg-white/88 dark:bg-slate-950/82 backdrop-blur-xl border border-slate-200/90 dark:border-white/20 shadow-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Destaque Competitivo
                  </span>
                  <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-400/30">
                    Futsal JIF
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-brand-navy dark:text-white">
                    Hub Semanal de Futsal
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                    Acompanha marcadores, calendários e resultados dos escalões Sub-7, Sub-9, Sub-11, Sub-13, Sub-16 e Seniores nos XL Jogos Inter-Freguesias.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <Link
                    href="/jif/futsal"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 dark:bg-white/10 dark:hover:bg-white/15 transition-colors border border-slate-200 dark:border-white/10 group"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      Resultados e Marcadores Semanais
                    </span>
                    <ChevronRight className="w-4 h-4 text-brand-green dark:text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/jif-classificacao"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50/70 dark:bg-white/10 dark:hover:bg-white/15 transition-colors border border-slate-200 dark:border-white/10 group"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      Classificação Geral Virtual (19 Freguesias)
                    </span>
                    <ChevronRight className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="pt-2 text-center">
                  <Link
                    href="/jif"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green dark:text-emerald-300 hover:underline transition-colors"
                  >
                    <span>Explorar regulamentos e pavilhões</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Oficial de Notificações Web Push & Avisos no Telemóvel */}
      <section className="bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 py-5 sm:py-6 shadow-md border-y border-amber-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center md:text-left">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0 shadow-md">
                <Bell className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h3 className="font-heading font-black text-base sm:text-lg text-slate-950 leading-tight">
                    Avisos de Treinos &amp; Convocatórias no Telemóvel
                  </h3>
                  <span className="hidden sm:inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-950 text-amber-300">
                    Oficial PWA
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed mt-0.5">
                  Recebe alertas instantâneos de alterações de pavilhões, horários de jogos dos JIF e avisos urgentes.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-center">
              <button
                data-push-toggle
                type="button"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 active:bg-black text-white font-heading font-black text-xs uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer border border-slate-800"
              >
                <Bell className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="push-btn-text">Ativar Avisos no Telemóvel</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Supabase Dynamic News Section */}
      <NoticiasSection noticias={noticias} />

      {/* Supabase Dynamic Events Section */}
      <EventosSection eventos={eventos} />

      {/* Modalidades Grid Section */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              As Nossas Modalidades
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Desporto para Todas as Idades
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Treinos semanais com treinadores dedicados no Pavilhão de Vilar do Pinheiro e recintos desportivos da freguesia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Futsal Masculino & Feminino",
                desc: "Escalões de formação (Sub-7 a Sub-16) e seniores. Treinos no Pavilhão Municipal de Vilar do Pinheiro.",
                icon: "⚽",
                tag: "Formação & Seniores",
              },
              {
                title: "Atletismo & Corta-Mato",
                desc: "Participação nas provas oficiais dos JIF e eventos municipais de corta-mato e corrida de estrada.",
                icon: "🏃‍♂️",
                tag: "Todas as Idades",
              },
              {
                title: "Ténis de Mesa",
                desc: "Treinos técnicos e torneios de preparação para as jornadas competitivas inter-freguesias.",
                icon: "🏓",
                tag: "Individual & Equipas",
              },
              {
                title: "Duatlo em Duplas",
                desc: "Modalidade de resistência combinando corrida e ciclismo com espírito de entreajuda.",
                icon: "🚴",
                tag: "Duplas",
              },
              {
                title: "Badminton",
                desc: "Agilidade, reflexos e convívio desportivo em recintos cobertos para jovens e adultos.",
                icon: "🏸",
                tag: "Recreativo & JIF",
              },
              {
                title: "Futebol de Praia",
                desc: "Competição de verão nas praias de Vila do Conde com o entusiasmo da nossa terra.",
                icon: "🏖️",
                tag: "Verão",
              },
            ].map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-500/30 transition-all hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{m.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10">
                      {m.tag}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-slate-200/60 dark:border-white/5">
                  <Link
                    href="/modalidades"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green dark:text-emerald-400 hover:text-brand-greenDark transition-colors"
                  >
                    <span>Horários e Inscrições</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Banner / CTA */}
      <section className="py-16 bg-linear-to-r from-brand-navy to-emerald-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4" />
            <span>Faz Parte da Família AJAVP</span>
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-4xl max-w-2xl mx-auto leading-tight">
            Torna-te Sócio ou Inscreve o Teu Educando
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Apoia o desporto em Vilar do Pinheiro. Ficha digital de sócio, quotas simplificadas e seguro desportivo incluído nos treinos oficiais.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href="https://ajavp-gestao.vercel.app/socio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-heading font-bold px-7 py-3.5 rounded-full shadow-lg transition-all text-sm group"
            >
              <IdCard className="w-4 h-4 text-emerald-100 group-hover:scale-110 transition-transform" />
              <span>Área de Sócio (Cartão Digital)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="https://ajavp-gestao.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-heading font-semibold px-6 py-3.5 rounded-full border border-white/20 transition-all text-sm"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-300" />
              <span>Portal AJAVP Gestão</span>
            </a>

            <a
              href="https://ajavp-gestao.vercel.app/inscricao"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-heading font-bold px-7 py-3.5 rounded-full shadow-lg transition-all text-sm"
            >
              <Users className="w-4 h-4 text-slate-950" />
              <span>Formulário de Inscrição</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
