import { Metadata } from 'next';
import Link from 'next/link';
import { Medal, Calendar, MapPin, Users, Award, ChevronRight, UserPlus, Flame } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import JifHubTabs from '@/components/jif/JifHubTabs';

export const metadata: Metadata = {
  title: 'Portal Oficial XL JIF 2026/2027 • AJAVP Vilar do Pinheiro',
  description:
    'Calendário oficial completo, recintos e GPS, comunicados ADCCVC e resultados da participação de Vilar do Pinheiro nos XL Jogos Inter-Freguesias de Vila do Conde.',
  alternates: {
    canonical: 'https://ajavp.vercel.app/jif'
  },
  openGraph: {
    title: 'Portal Oficial XL JIF 2026/2027 • AJAVP',
    description:
      'Acompanha a participação de Vilar do Pinheiro nos XL Jogos Inter-Freguesias: calendário das 36 provas, rotas GPS para os 12 pavilhões e comunicados oficiais.',
    url: 'https://ajavp.vercel.app/jif',
    siteName: 'AJAVP',
    images: [
      {
        url: '/assets/images/og-share.jpg',
        width: 1200,
        height: 630,
        alt: 'AJAVP nos XL Jogos Inter-Freguesias'
      }
    ],
    locale: 'pt_PT',
    type: 'website'
  }
};

export default function JifPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100">
      {/* Top Notice Banner */}
      <div className="bg-gradient-to-r from-brand-navy via-slate-900 to-emerald-950 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium shadow-inner flex items-center justify-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-400 text-slate-950">
          XL JIF 2026/27
        </span>
        <span className="hidden sm:inline">Vilar do Pinheiro no Topo dos Jogos Concelhios!</span>
        <Link
          href="/jif/classificacao"
          className="underline hover:text-amber-300 font-bold ml-1 inline-flex items-center gap-1"
        >
          <span>Ver Classificação Virtual</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white pt-12 pb-16 lg:pt-14 lg:pb-20 overflow-hidden hero-pattern border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <Breadcrumbs
            variant="dark"
            items={[{ label: "JIF 2026/2027" }]}
            className="mb-5"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Coluna Esquerda: Textos, Ações e KPIs */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Medal className="w-4 h-4 text-amber-400" />
                <span>XL Jogos Inter-Freguesias de Vila do Conde • 2026/2027</span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                O Orgulho de <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-white">
                  Vilar do Pinheiro nos JIF
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Toda a informação oficial da 40.ª edição dos Jogos Inter-Freguesias: calendário unificado das 36 provas, guias com rotas GPS em 1 toque para os recintos concelhios e comunicados homologados da ADCCVC.
              </p>

              {/* Quick Links */}
              <div className="flex items-center gap-3 pt-2 flex-wrap">
                <Link
                  href="/jif/classificacao"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-heading font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Classificação Virtual</span>
                </Link>

                <Link
                  href="https://ajavp-gestao.vercel.app/inscricao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-heading font-bold text-xs sm:text-sm border border-white/20 transition-colors"
                >
                  <UserPlus className="w-4 h-4 text-emerald-400" />
                  <span>Inscrever Atleta na AJAVP</span>
                </Link>
              </div>

              {/* Mini-KPIs no rodapé do Hero */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3">
                <div className="p-3 rounded-2xl bg-white/10 dark:bg-slate-900/60 backdrop-blur-md text-center space-y-0.5 border border-white/15">
                  <span className="text-[10px] text-slate-300 uppercase block font-semibold truncate">Provas</span>
                  <div className="text-lg sm:text-xl font-black text-amber-400">36</div>
                  <span className="text-[10px] text-emerald-200 block truncate">Atletismo &amp; Pavilhão</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/10 dark:bg-slate-900/60 backdrop-blur-md text-center space-y-0.5 border border-white/15">
                  <span className="text-[10px] text-slate-300 uppercase block font-semibold truncate">Freguesias</span>
                  <div className="text-lg sm:text-xl font-black text-emerald-400">19</div>
                  <span className="text-[10px] text-emerald-200 block truncate">Concelho em Prova</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/10 dark:bg-slate-900/60 backdrop-blur-md text-center space-y-0.5 border border-white/15">
                  <span className="text-[10px] text-slate-300 uppercase block font-semibold truncate">Recintos GPS</span>
                  <div className="text-lg sm:text-xl font-black text-cyan-400">12</div>
                  <span className="text-[10px] text-cyan-200 block truncate">Waze &amp; Maps</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/10 dark:bg-slate-900/60 backdrop-blur-md text-center space-y-0.5 border border-white/15">
                  <span className="text-[10px] text-slate-300 uppercase block font-semibold truncate">Escalões</span>
                  <div className="text-lg sm:text-xl font-black text-amber-300">4</div>
                  <span className="text-[10px] text-amber-200 block truncate">Sub-7 ao Sub-13</span>
                </div>
              </div>
            </div>

            {/* Coluna Direita: Mosaico Real com Fotografias Autênticas da AJAVP */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md rounded-3xl p-3 bg-slate-900/70 border-2 border-white/20 shadow-2xl backdrop-blur-md space-y-2.5">
                {/* Foto Superior Grande: Fair-play e Comitiva */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-white/10 group shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/images/jif/jif-fairplay-equipa.webp"
                    alt="Atletas da AJAVP nos JIF com faixas de Fair-play: Dá-me o exemplo, Não só os resultados contam"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-2.5 pt-6 flex items-end justify-between">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 block">
                        Fair-Play &bull; Ética Desportiva
                      </span>
                      <span className="text-[11px] font-bold text-white leading-tight block">
                        &quot;Não só os resultados contam&quot;
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 text-[9px] font-black uppercase">
                      JIF
                    </span>
                  </div>
                </div>

                {/* Grelha Inferior: 2 Modalidades Reais lado a lado */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Corta-Mato */}
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] border border-white/10 group shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/images/galeria/corta_mato_equipa_2026.webp"
                      alt="Comitiva de Corta-Mato da AJAVP"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-2">
                      <span className="text-[10px] font-bold text-emerald-300 block">
                        Corta-Mato 2026
                      </span>
                      <span className="text-[8px] text-slate-300 block">
                        Pista e Resistência
                      </span>
                    </div>
                  </div>

                  {/* Futsal */}
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] border border-white/10 group shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/images/futsal/hero-futsal-ajavp.webp"
                      alt="Formação de Futsal da AJAVP"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-2">
                      <span className="text-[10px] font-bold text-amber-300 block">
                        Futsal Pavilhões
                      </span>
                      <span className="text-[8px] text-slate-300 block">
                        Sub-7 a Sub-13
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rodapé da Moldura com Selo Oficial */}
                <div className="flex items-center justify-between px-2 pt-1 border-t border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-200">
                      Comitiva de Vilar do Pinheiro
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-amber-300 font-black text-[9px] uppercase tracking-wide border border-white/10">
                    Mosaico Real
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Simplified Hub Tabs */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <JifHubTabs initialTab="geral" />

        {/* Bottom Callout Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-brand-navy to-slate-900 text-white border border-emerald-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
              Queres vestir as cores de Vilar do Pinheiro?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              As inscrições para os escalões de formação e modalidades individuais mantêm-se abertas. Junta-te à família AJAVP e representa a nossa freguesia!
            </p>
          </div>

          <Link
            href="https://ajavp-gestao.vercel.app/inscricao"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-brand-green hover:from-emerald-400 hover:to-emerald-600 text-white font-heading font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all shrink-0 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Ficha de Inscrição Oficial</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
