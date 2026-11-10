import type { Metadata } from "next";
import Link from "next/link";
import {
  IdCard,
  Users,
  CheckCircle2,
  Heart,
  Vote,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  PlayCircle,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GESTAO_LINKS, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Torna-te Sócio da AJAVP • Quotas & Vantagens 2026/2027",
  description:
    "Junta-te à família da AJAVP. Quotas transparentes (Adulto 12€/ano e Menores isentos), cartão digital com QR Code no telemóvel e apoio direto ao desporto de Vilar do Pinheiro.",
  alternates: {
    canonical: `${SITE_URL}/socios`,
  },
};

export default function SociosPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-linear-to-b from-emerald-50/70 via-white to-slate-50 dark:from-ajavp-green-dark/40 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-white/10 transition-colors">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-emerald-500/10 dark:from-ajavp-green/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Breadcrumbs
            items={[{ label: "Sócios & Quotas" }]}
            className="mb-6 justify-center"
          />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/30 text-emerald-900 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
            Veste a Mancha Verde • Época 2026/2027
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy dark:text-white tracking-tight leading-[1.08] mb-6">
            O Teu Apoio Faz o{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-green via-emerald-600 to-amber-600 dark:from-emerald-300 dark:via-emerald-400 dark:to-amber-400">
              Desporto Acontecer
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Ser sócio da AJAVP é muito mais do que ter um número: é garantir treinos, bolas, carrinhas e equipamentos a mais de 80 jovens atletas de Vilar do Pinheiro.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={GESTAO_LINKS.inscricao}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-press w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-green hover:bg-brand-greenDark text-white font-bold text-sm sm:text-base transition-colors shadow-lg shadow-brand-green/25"
            >
              <Users className="w-5 h-5" />
              <span>Quero Ser Sócio Agora</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={GESTAO_LINKS.socio}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-press w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-slate-100 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-semibold text-sm sm:text-base transition-colors shadow-xs"
            >
              <IdCard className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              <span>Já Sou Sócio (Cartão Digital)</span>
            </a>
          </div>
        </div>
      </section>

      {/* TABELA DE QUOTAS */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-brand-green dark:text-emerald-400 text-xs font-bold uppercase tracking-widest block mb-2">
              Quotas Transparentes • Simples de Apoiar
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-brand-navy dark:text-white mb-3">
              Escolhe a Tua Categoria de Sócio
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              Sem jóias escondidas nem burocracia. Um valor simbólico que tem um impacto gigantesco na nossa terra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* SÓCIO ADULTO (POPULAR / RECOMENDADO) */}
            <div className="motion-card relative rounded-3xl p-8 bg-linear-to-b from-emerald-500/10 via-white to-white dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 border-2 border-emerald-500/40 dark:border-emerald-400/40 shadow-xl flex flex-col justify-between">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-600 text-white text-xs font-black uppercase tracking-wider shadow-md">
                Mais Escolhido
              </span>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-heading text-2xl font-black text-brand-navy dark:text-white">
                      Sócio Adulto
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Maiores de 18 anos • Cidadãos & Encarregados de Educação
                    </p>
                  </div>
                  <span className="text-3xl">🌿</span>
                </div>

                <div className="mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-brand-navy dark:text-white">
                      12€
                    </span>
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                      / ano
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                    Equivale a apenas 1€ por mês
                  </p>
                </div>

                <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Cartão de Sócio Digital</strong> com QR Code no telemóvel</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Direito a voto</strong> nas Assembleias Gerais do clube</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Descontos exclusivos</strong> em equipamentos e iniciativas</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Apoio direto a mais de 80 crianças da formação</span>
                  </li>
                </ul>
              </div>

              <a
                href={GESTAO_LINKS.inscricao}
                target="_blank"
                rel="noopener noreferrer"
                className="motion-press w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-md shadow-emerald-600/20"
              >
                <span>Aderir como Sócio Adulto</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* SÓCIO MENOR / ATLETA */}
            <div className="motion-card relative rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-heading text-2xl font-black text-brand-navy dark:text-white">
                      Sócio Menor / Atleta
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Até aos 17 anos • Escalões de Formação & Escolinhas
                    </p>
                  </div>
                  <span className="text-3xl">⚽</span>
                </div>

                <div className="mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-emerald-600 dark:text-emerald-400">
                      0€
                    </span>
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                      / ano (Isento)
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                    Quota gratuita com a inscrição na modalidade
                  </p>
                </div>

                <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Cartão de Atleta Digital</strong> oficial da época 26/27</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Inscrição oficial nos XL JIF</strong> (Vila do Conde)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Treinos de captação gratuitos</strong> durante todo o ano</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Seguro desportivo oficial de competição incluído</span>
                  </li>
                </ul>
              </div>

              <a
                href={GESTAO_LINKS.inscricao}
                target="_blank"
                rel="noopener noreferrer"
                className="motion-press w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/20 text-white font-bold text-sm transition-colors border border-transparent dark:border-white/10"
              >
                <span>Inscrever Jovem Atleta (0€)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* NOTA SOBRE FUNDADORES E BENEMÉRITOS */}
          <div className="mt-8 p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-400/20 text-center text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            <span className="font-bold">✨ Sócios Fundadores & Beneméritos:</span> Os membros fundadores e parceiros que pretendam contribuir com donativos extraordinários têm estatuto de honra nos órgãos sociais e menção especial na história do clube.
          </div>
        </div>
      </section>

      {/* 4 GRANDES VANTAGENS */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">
              Valor Real & Pertença
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-brand-navy dark:text-white">
              Porquê Ser Sócio da AJAVP?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl mb-4">
                <IdCard className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-lg text-slate-900 dark:text-white mb-2">
                Cartão de Sócio Digital no Telemóvel
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Sem cartões de plástico perdidos na carteira. O teu cartão oficial está sempre disponível com QR Code de validação instantânea no telemóvel.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl mb-4">
                <Vote className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-lg text-slate-900 dark:text-white mb-2">
                Voz Ativa nas Decisões do Clube
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Participa e vota nas Assembleias Gerais da AJAVP. Ajuda a decidir investimentos, novas modalidades e os projetos prioritários da nossa terra.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-lg text-slate-900 dark:text-white mb-2">
                Apoio a +80 Crianças da Formação
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                O teu euro mensal financia inscrições federadas, seguros de jogo, equipamentos completos e transporte para todos os atletas de formação.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-lg text-slate-900 dark:text-white mb-2">
                Descontos em Eventos e Parcerias
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Acesso preferencial e condições especiais no novo equipamento oficial 26/27, almoços associativos, festas e na rede de parceiros locais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECÇÃO DO GUIA EM VÍDEO 16:9 & FUNIL EM PASSOS SIMPLES */}
      <section
        id="guia-video"
        className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-t border-b border-slate-200 dark:border-white/10 transition-colors"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
              <PlayCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Demonstração Oficial &bull; 1 Minuto</span>
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-brand-navy dark:text-white mb-3">
              Como Funciona a Inscrição Online
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Sem burocracia nem impressões em papel. Vê em menos de 1 minuto como preencher os dados, confirmar a isenção de menores e assinar a ficha digitalmente no telemóvel.
            </p>
          </div>

          {/* Player de Vídeo 16:9 de Alto Impacto */}
          <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/30 dark:border-emerald-400/20 bg-black group mb-12">
            <video
              src="/videos/ajavp_guia_inscricao_16x9.mp4"
              poster="/assets/images/cartaz_horizontal_16x9.jpg"
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-contain"
            >
              O seu navegador não suporta a reprodução deste vídeo.
            </video>
          </div>

          {/* 3 Passos Essenciais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 relative">
              <span className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center mb-4 shadow-md">
                1
              </span>
              <h3 className="font-heading font-black text-lg text-slate-900 dark:text-white mb-2">
                Preenche a Ficha Online
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Demora apenas 1 minuto. Escolhe Atleta JIF ou Sócio Adulto no formulário seguro.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 relative">
              <span className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center mb-4 shadow-md">
                2
              </span>
              <h3 className="font-heading font-black text-lg text-slate-900 dark:text-white mb-2">
                Isenção ou Quota Simples
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Menores de 18 anos ficam automaticamente isentos (0€). Adultos pagam 12€/ano com MB WAY.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 relative">
              <span className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center mb-4 shadow-md">
                3
              </span>
              <h3 className="font-heading font-black text-lg text-slate-900 dark:text-white mb-2">
                Assinatura no Ecrã
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Assina diretamente com o dedo e obtém de imediato o teu número provisório e cartão digital.
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href={GESTAO_LINKS.inscricao}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-press inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-brand-green hover:bg-brand-greenDark text-white font-heading font-bold text-base transition-colors shadow-xl shadow-brand-green/25"
            >
              <span>Começar Inscrição Online</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* CALLOUT FINAL PARA QUEM JÁ É SÓCIO */}
      <section className="py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 rounded-3xl bg-linear-to-r from-brand-navy via-slate-900 to-emerald-950 text-white border border-white/10 shadow-xl">
            <h3 className="font-heading font-black text-2xl sm:text-3xl mb-3">
              Já és Sócio da AJAVP?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
              Consulta o teu número de sócio, o teu cartão digital com QR Code e o estado da quota na tua Área Reservada.
            </p>
            <a
              href={GESTAO_LINKS.socio}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all hover:scale-105"
            >
              <IdCard className="w-4 h-4 text-emerald-400" />
              <span>Aceder à Área de Sócio</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

