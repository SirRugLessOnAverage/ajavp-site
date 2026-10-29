import { Metadata } from 'next';
import Link from 'next/link';
import { Award, Trophy, ChevronRight, Scale, AlertTriangle, ArrowLeft, Info, HelpCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import JifPodioRanking from '@/components/jif/JifPodioRanking';
import JifRankingTable from '@/components/jif/JifRankingTable';
import { JIF_CLASSIFICACAO, JIF_PONTUACAO_RULES } from '@/data/jif/classificacao';

export const metadata: Metadata = {
  title: 'Classificação Virtual XL JIF 2026/2027 • Quadro Concelhio Não-Oficial | AJAVP',
  description:
    'Quadro Concelhio e Classificação Virtual das 19 freguesias nos XL Jogos Inter-Freguesias de Vila do Conde 2026/2027. Consulta posições, pautas de Corta-Mato, Futebol e Futsal e medalheiro oficial.',
  alternates: {
    canonical: 'https://ajavp.vercel.app/jif/classificacao'
  },
  openGraph: {
    title: 'Classificação Virtual XL JIF 2026/2027 • AJAVP',
    description:
      'Quadro Concelhio Não-Oficial das 19 freguesias nos XL Jogos Inter-Freguesias. Vilar do Pinheiro no Top 4 Concelhio com Corta-Mato, Futebol e Futsal!',
    url: 'https://ajavp.vercel.app/jif/classificacao',
    siteName: 'AJAVP',
    images: [
      {
        url: '/assets/images/og-share.jpg',
        width: 1200,
        height: 630,
        alt: 'Classificação Virtual XL JIF'
      }
    ],
    locale: 'pt_PT',
    type: 'website'
  }
};

export default function JifClassificacaoPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100">
      {/* Top Banner */}
      <div className="bg-brand-green text-white py-2 px-4 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-inner">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-400 text-slate-950">
          Classificação Virtual
        </span>
        <span>XL Jogos Inter-Freguesias 2026/2027 • Corta-Mato, Futebol e Futsal Integrados! 🏆</span>
        <Link href="/jif" className="underline hover:text-amber-200 font-semibold ml-1 hidden sm:inline">
          Ver Hub Principal JIF &rarr;
        </Link>
      </div>

      {/* Hero Header */}
      <section className="relative bg-slate-950 text-white pt-12 pb-14 lg:pt-14 lg:pb-16 overflow-hidden hero-pattern border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "JIF 2026/2027", href: "/jif" },
              { label: "Classificação Virtual" },
            ]}
            className="mb-5"
          />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Simulador Virtual Concelhio • Época 2026/2027</span>
              </div>
              <h1 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
                Classificação Virtual dos <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-white">
                  XL Jogos Inter-Freguesias
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Tabela concelhia das 19 freguesias nos XL JIF de Vila do Conde em conformidade com o simulador oficial da ADCCVC (Artigo XV).
              </p>
            </div>

            <Link
              href="/jif"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-heading font-bold text-xs border border-white/15 transition-colors self-start md:self-auto cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Portal JIF</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Notice of Virtual Projection */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-500/40 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-heading font-black text-xs sm:text-sm text-amber-950 dark:text-amber-200 uppercase tracking-wide">
                Sistema Oficial de Pontuação ADCCVC • Artigo XV das Regras Gerais JIF
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Esta classificação virtual cumpre o simulador oficial da organização: Futsal (80 a 5 pts, N/P -25), Atletismo (57 a 3 pts, N/P -15) e Futebol (48 a 3 pts, N/P -15). As faltas de comparência são penalizadas com pontuações negativas expressas.
              </p>
            </div>
          </div>

          <a
            href="#regras-pontuacao"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-navy dark:bg-white text-white dark:text-slate-900 font-bold text-xs shrink-0 hover:opacity-90 transition-opacity"
          >
            <Scale className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
            <span>Ver Escalas Art. XV</span>
          </a>
        </div>

        {/* Podium Highlight */}
        <JifPodioRanking rankings={JIF_CLASSIFICACAO} />

        {/* Interactive Virtual Ranking Table */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900 dark:text-white">
              Tabela Geral Virtual (19 Freguesias)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Alterna entre a pontuação total virtual, o detalhe por modalidade ou a tabela ordenada por medalhas.
            </p>
          </div>

          <JifRankingTable />
        </div>

        {/* Official Rules Breakdown */}
        <section id="regras-pontuacao" className="pt-6 border-t border-slate-200 dark:border-white/10 space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Scale className="w-4 h-4" />
              <span>Regulamento ADCCVC • Artigo XV</span>
            </div>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900 dark:text-white">
              Como Funciona o Sistema de Pontuação
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Escalas de pontuação atribuídas por modalidade e penalizações obrigatórias por não participação (N/P):
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {JIF_PONTUACAO_RULES.map((rule, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                    {rule.modalidade}
                  </h4>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                    {rule.escala}
                  </span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div><strong>Incremento:</strong> {rule.incremento}</div>
                  <div className="text-rose-600 dark:text-rose-400 font-medium">
                    <strong>Penalização N/P:</strong> {rule.npPenalizacao}
                  </div>
                </div>
              </div>
            ))}

            {/* Tie-breaking rule */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                  Critério de Desempate
                </h4>
                <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                  Artigo XV.1
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Em caso de empate em pontos, prevalece o maior número de melhores classificações alcançadas por escalão (mais 1.ºs, depois 2.ºs).
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
