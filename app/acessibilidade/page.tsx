import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Declaração de Acessibilidade e Usabilidade • AJAVP",
  description:
    "Declaração de Acessibilidade e Usabilidade da AJAVP em conformidade com o Decreto-Lei n.º 83/2018 e as diretrizes W3C WCAG 2.1 Nível AA.",
};

const WCAG_PRINCIPLES = [
  {
    step: "Princípio 1",
    title: "Perceptível",
    description:
      "Textos alternativos descritivos nas fotografias dos escalões, contraste elevado e suporte a leitores de ecrã.",
  },
  {
    step: "Princípio 2",
    title: "Operável",
    description:
      "Navegação integral por teclado (Tab, Enter, Escape, Setas na Galeria), foco visível e links de salto direto.",
  },
  {
    step: "Princípio 3",
    title: "Compreensível",
    description:
      "Linguagem clara, hierarquia de títulos semântica, rotulagem previsível e suporte a tipografia amigável para dislexia.",
  },
  {
    step: "Princípio 4",
    title: "Robusto",
    description:
      "HTML5 semântico, atributos WAI-ARIA em modais e galerias, e compatibilidade multi-dispositivo e PWA.",
  },
];

const A11Y_FEATURES = [
  {
    icon: "🔠",
    title: "Escala e Redimensionamento de Texto (WCAG 1.4.4)",
    description:
      "Permite aumentar o tamanho de todo o corpo de texto até 130% sem perda de legibilidade, sem sobreposição de caixas e sem necessidade de scroll horizontal.",
  },
  {
    icon: "📖",
    title: "Tipografia para Dislexia (Lexend)",
    description:
      "Suporta substituição tipográfica para reduzir o stress visual e melhorar a diferenciação entre caracteres semelhantes.",
  },
  {
    icon: "🎨",
    title: "Alto Contraste & Paleta Acessível (WCAG AAA)",
    description:
      "Contraste otimizado entre texto branco/ouro sobre fundos escuros profundos, garantindo leitura nítida em ambientes interiores e exteriores (no Ringue ou Pavilhão).",
  },
  {
    icon: "⌨️",
    title: "Navegação Total por Teclado (WCAG 2.1.1)",
    description:
      "Todos os filtros da galeria, seletores do novo equipamento 26/27, Lightbox (Setas ← / → e Escape) e formulários funcionam 100% via teclado.",
  },
  {
    icon: "📏",
    title: "Estrutura Landmark & Skip Links (WCAG 2.4.1)",
    description:
      "Uso rigoroso de regiões semânticas (header, nav, main, footer, article, section) para navegação rápida por utilizadores de leitores de ecrã.",
  },
  {
    icon: "⏸️",
    title: "Respeito por Movimento Reduzido (WCAG 2.3.3)",
    description:
      "Deteta automaticamente a preferência de sistema prefers-reduced-motion: reduce, desativando animações e transições para evitar desconforto vestibular.",
  },
];

export default function AcessibilidadePage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <div id="conteudo-principal">
        {/* HERO BANNER */}
        <section className="relative pt-12 pb-16 lg:pt-14 lg:pb-20 overflow-hidden bg-linear-to-b from-emerald-50/80 via-white to-slate-50 dark:from-ajavp-green-dark/45 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs
              items={[{ label: "Acessibilidade & Usabilidade" }]}
              className="mb-5"
            />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 dark:bg-ajavp-green/20 border border-brand-green/30 dark:border-ajavp-green-light/30 text-brand-green dark:text-ajavp-green-light text-xs font-bold uppercase tracking-widest mb-6">
              <span aria-hidden="true">♿</span>
              <span>Decreto-Lei n.º 83/2018 • WCAG 2.1 Nível AA</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-black text-brand-navy dark:text-white tracking-tight leading-tight mb-6">
              Declaração de Acessibilidade &{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-green via-emerald-700 to-amber-700 dark:from-ajavp-green-light dark:via-emerald-400 dark:to-ajavp-gold">
                Usabilidade
              </span>
            </h1>
            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
              A{" "}
              <strong className="text-slate-900 dark:text-white">
                AJAVP – Associação Jovens e Adultos de Vilar do Pinheiro
              </strong>{" "}
              assume o compromisso de tornar o seu sítio web acessível a todos os associados, atletas, encarregados de educação e munícipes, garantindo que o acesso à informação desportiva e institucional é inclusivo, digno e sem barreiras.
            </p>
          </div>
        </section>

        {/* CORPO DA DECLARAÇÃO */}
        <section className="py-16 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* 1. Estado de Conformidade */}
            <article className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 space-y-5 shadow-md">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-brand-green/15 dark:bg-ajavp-green/30 border border-brand-green/30 dark:border-ajavp-green-light/40 text-brand-green dark:text-ajavp-green-light flex items-center justify-center font-black text-xl shrink-0">
                  ✓
                </div>
                <div>
                  <h2 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                    1. Estado de Conformidade Técnica
                  </h2>
                  <span className="text-xs font-bold text-brand-green dark:text-ajavp-green-light uppercase tracking-wider">
                    Conforme com os requisitos W3C WCAG 2.1 Nível AA
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                O sítio web da AJAVP (<code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-amber-800 dark:text-ajavp-gold font-bold">ajavp.pt</code>) está{" "}
                <strong className="text-slate-900 dark:text-white">
                  plenamente adaptado às Diretrizes de Acessibilidade para Conteúdo Web (WCAG) 2.1
                </strong>{" "}
                no nível de conformidade <strong className="text-slate-900 dark:text-white">AA</strong>, e cumpre os requisitos do{" "}
                <strong className="text-slate-900 dark:text-white">Decreto-Lei n.º 83/2018</strong>, que transpôs para a ordem jurídica portuguesa a Diretiva (UE) 2016/2102 do Parlamento Europeu e do Conselho (norma europeia EN 301 549).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {WCAG_PRINCIPLES.map((item) => (
                  <div
                    key={item.step}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-center"
                  >
                    <span className="text-[11px] font-bold uppercase text-amber-800 dark:text-ajavp-gold block">
                      {item.step}
                    </span>
                    <strong className="text-sm font-bold text-slate-900 dark:text-white block mt-1">
                      {item.title}
                    </strong>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* 2. Recursos e Funcionalidades de Acessibilidade */}
            <article className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-green dark:text-ajavp-green-light">
                  Recursos ao Dispor do Utilizador
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-brand-navy dark:text-white">
                  2. Funcionalidades de Acessibilidade Nativas
                </h2>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  O portal foi desenhado desde a raiz com suporte nativo a tecnologias de apoio e preferências de sistema:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {A11Y_FEATURES.map((feat) => (
                  <div
                    key={feat.title}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 space-y-2 shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white text-sm">
                      <span className="text-lg" aria-hidden="true">
                        {feat.icon}
                      </span>
                      <h3>{feat.title}</h3>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* 3. Metodologia de Avaliação e Testes */}
            <article className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 space-y-4 shadow-xs">
              <h2 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                3. Metodologia de Avaliação & Auditoria
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A conformidade deste sítio web é aferida através de métodos combinados de auditoria técnica:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li>
                  <strong className="text-slate-900 dark:text-white">Validadores Automáticos:</strong>{" "}
                  Testes periódicos com o <em>AccessMonitor</em> (ferramenta oficial da Administração Pública Portuguesa baseada em WCAG 2.1 AA) e{" "}
                  <em>Lighthouse Accessibility</em>.
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white">Inspeções Manuais:</strong>{" "}
                  Validação através dos <em>W3C Easy Checks</em> e da checklist dos 10 aspetos críticos de acessibilidade funcional da AMA.
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white">Tecnologias de Apoio:</strong>{" "}
                  Testes de navegação apenas por teclado (<code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-amber-800 dark:text-ajavp-gold font-bold">Tab</code>,{" "}
                  <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-amber-800 dark:text-ajavp-gold font-bold">Shift+Tab</code>,{" "}
                  <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-amber-800 dark:text-ajavp-gold font-bold">Enter</code>,{" "}
                  <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-amber-800 dark:text-ajavp-gold font-bold">Espaço</code>,{" "}
                  <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-amber-800 dark:text-ajavp-gold font-bold">Escape</code>) e verificação com leitores de ecrã (NVDA no Windows e VoiceOver no iOS/macOS).
                </li>
              </ul>
              <p className="text-xs text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-white/10">
                Última revisão formal efetuada a{" "}
                <strong className="text-slate-900 dark:text-white">28 de Outubro de 2026</strong>.
              </p>
            </article>

            {/* 4. Canal Direto de Contacto e Apoio */}
            <article className="p-6 sm:p-8 rounded-3xl bg-emerald-50/80 dark:bg-ajavp-green-dark/30 border-2 border-brand-green/35 dark:border-ajavp-green-light/40 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-green dark:bg-ajavp-green text-white flex items-center justify-center font-bold shrink-0">
                  ✉️
                </div>
                <div>
                  <h2 className="font-heading font-bold text-xl text-brand-navy dark:text-white">
                    4. Canal Direto de Contacto & Apoio
                  </h2>
                  <span className="text-xs text-brand-green dark:text-ajavp-green-light font-semibold">
                    Reporte de eventuais dificuldades de acesso à informação
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                Apesar de todos os esforços contínuos de conformidade, se detetar algum conteúdo ou funcionalidade inacessível ou se necessitar de formatos alternativos de algum comunicado ou documento, por favor contacte a equipa da AJAVP:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="mailto:geralajavp@gmail.com?subject=Acessibilidade%20Site%20AJAVP"
                  className="motion-press inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-green hover:bg-ajavp-green-light text-white font-bold text-xs transition-colors shadow-sm"
                >
                  <span>✉️</span>
                  <span>geralajavp@gmail.com</span>
                </a>
                <Link
                  href="/contactos"
                  className="motion-press inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 dark:bg-white/10 dark:hover:bg-white/15 text-slate-900 dark:text-white font-bold text-xs border border-slate-300 dark:border-white/15 transition-colors shadow-xs"
                >
                  <span>📞</span>
                  <span>Página de Contactos & Secretaria</span>
                </Link>
              </div>
            </article>

            {/* 5. Procedimento de Mediação */}
            <article className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <h2 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                5. Procedimento de Cumprimento e Mediação
              </h2>
              <p className="leading-relaxed">
                Nos termos do artigo 9.º do Decreto-Lei n.º 83/2018, caso não obtenha uma resposta satisfatória da AJAVP no prazo de 10 dias úteis, tem o direito de apresentar uma reclamação formal junto do{" "}
                <strong className="text-slate-900 dark:text-slate-200">
                  Instituto Nacional para a Reabilitação, I.P. (INR)
                </strong>{" "}
                ou da entidade coordenadora da modernização administrativa (AMA / ARTE).
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}

