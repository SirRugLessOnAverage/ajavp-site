import { Metadata } from 'next';
import Link from 'next/link';
import { Medal, Calendar, MapPin, Users, Award, ChevronRight, UserPlus, Flame } from 'lucide-react';
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
      <section className="relative bg-slate-950 text-white py-12 lg:py-16 overflow-hidden hero-pattern border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium" aria-label="Caminho de navegação">
            <Link href="/" className="hover:text-white transition-colors">
              Início
            </Link>
            <span className="text-slate-600">&gt;</span>
            <span className="text-amber-400 font-bold">JIF 2026/2027</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
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
                  href="https://forms.gle/YJdnZyUsMB8aBADj6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-heading font-bold text-xs sm:text-sm border border-white/20 transition-colors"
                >
                  <UserPlus className="w-4 h-4 text-emerald-400" />
                  <span>Inscrever Atleta na AJAVP</span>
                </Link>
              </div>
            </div>

            {/* Key Metrics Stats */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
                <div className="text-2xl sm:text-3xl font-heading font-black text-amber-400">36</div>
                <div className="text-xs font-bold text-slate-200">Provas Oficiais</div>
                <div className="text-[10px] text-slate-400">Atletismo a Futsal</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
                <div className="text-2xl sm:text-3xl font-heading font-black text-emerald-400">19</div>
                <div className="text-xs font-bold text-slate-200">Freguesias</div>
                <div className="text-[10px] text-slate-400">Concelho em Prova</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
                <div className="text-2xl sm:text-3xl font-heading font-black text-cyan-400">12</div>
                <div className="text-xs font-bold text-slate-200">Recintos com GPS</div>
                <div className="text-[10px] text-slate-400">Google Maps &amp; Waze</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
                <div className="text-2xl sm:text-3xl font-heading font-black text-amber-300">4</div>
                <div className="text-xs font-bold text-slate-200">Escalões AJAVP</div>
                <div className="text-[10px] text-slate-400">Sub-7, 9, 11 e 13</div>
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
            href="https://forms.gle/YJdnZyUsMB8aBADj6"
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
