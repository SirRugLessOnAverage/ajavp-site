import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Cookie, Lock, FileText, CheckCircle2, AlertCircle, Mail, MapPin } from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacidade, Gestão de Cookies & RGPD • AJAVP",
  description:
    "Política de Privacidade e Gestão de Cookies da AJAVP. Transparência total sobre a proteção de dados dos sócios e atletas, isenção de cookies de rastreio e conformidade com o RGPD.",
  alternates: {
    canonical: `${SITE_URL}/privacidade`,
  },
};

export default function PrivacidadePage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-14 lg:pb-20 overflow-hidden bg-linear-to-b from-emerald-50/70 via-white to-slate-50 dark:from-ajavp-green-dark/40 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-white/10 transition-colors">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-emerald-500/10 dark:from-ajavp-green/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs
            items={[{ label: "Privacidade & Cookies" }]}
            className="mb-5"
          />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/30 text-emerald-900 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest mb-5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Transparência & Conformidade RGPD</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy dark:text-white tracking-tight leading-tight mb-4">
            Política de Privacidade e{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-green to-emerald-600 dark:from-emerald-300 dark:to-emerald-500">
              Gestão de Cookies
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            A Associação de Jovens e Adultos de Vilar do Pinheiro (AJAVP) assume o compromisso de proteger a privacidade dos seus associados, atletas, encarregados de educação e visitantes, garantindo o estrito cumprimento do Regulamento Geral sobre a Proteção de Dados (RGPD) e da legislação aplicável.
          </p>
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* DESTAQUE PRINCIPAL: ISENÇÃO DE COOKIES DE RASTREIO */}
        <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 shadow-xs">
          <div className="flex items-start gap-4">
            <span className="p-3 rounded-2xl bg-emerald-600 text-white shrink-0 shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </span>
            <div className="space-y-2">
              <h2 className="font-heading font-black text-lg sm:text-xl text-emerald-950 dark:text-emerald-200">
                Sem Cookies de Rastreio, Sem Publicidade, Sem Perfilagem
              </h2>
              <p className="text-sm text-emerald-900/90 dark:text-emerald-300/90 leading-relaxed">
                O portal público da AJAVP <strong>não utiliza cookies de rastreio publicitário, nem ferramentas intrusivas de perfilagem ou partilha comercial de dados com terceiros</strong> (como Meta Pixel, Google Ads ou redes de remarketing). A navegação é limpa, segura e respeita integralmente a tua privacidade desde o primeiro segundo.
              </p>
            </div>
          </div>
        </div>

        {/* SECÇÃO 1: POLÍTICA DE COOKIES E ARMAZENAMENTO TÉCNICO */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-green dark:text-emerald-400">
            <Cookie className="w-4 h-4" />
            <span>Armazenamento Local no Dispositivo</span>
          </div>
          <h2 className="font-heading text-2xl font-black text-brand-navy dark:text-white">
            1. Como Funciona a Gestão de Cookies e Dados Técnicos
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Ao abrigo da Diretiva ePrivacy (2002/58/CE) e da Lei n.º 41/2004 (alterada pela Lei n.º 46/2012), o armazenamento de informações técnicas estritamente necessárias para a prestação do serviço solicitado pelo utilizador está isento de consentimento prévio por banner. A AJAVP utiliza unicamente armazenamento local do navegador (<code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-xs font-mono">localStorage</code>) para as seguintes finalidades essenciais:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-xs mt-4">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold">
                <tr>
                  <th className="py-3 px-4">Chave / Tecnologia</th>
                  <th className="py-3 px-4">Tipo</th>
                  <th className="py-3 px-4">Finalidade</th>
                  <th className="py-3 px-4">Duração</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">theme</td>
                  <td className="py-3 px-4">Técnico / Preferência</td>
                  <td className="py-3 px-4">Memoriza a tua escolha de Modo Claro ou Modo Escuro para não reiniciar a cada clique.</td>
                  <td className="py-3 px-4">Persistente no browser</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">ajavp_a11y_*</td>
                  <td className="py-3 px-4">Acessibilidade WCAG</td>
                  <td className="py-3 px-4">Guarda as opções de alto contraste, tamanho de letra e espaçamento para pessoas com necessidades especiais.</td>
                  <td className="py-3 px-4">Persistente no browser</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">ajavp_pwa_*</td>
                  <td className="py-3 px-4">Aplicação Offline (PWA)</td>
                  <td className="py-3 px-4">Gere a experiência da aplicação instalada e a subscrição de alertas desportivos Web Push solicitada pelo utilizador.</td>
                  <td className="py-3 px-4">Persistente no browser</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">youtube-nocookie.com</td>
                  <td className="py-3 px-4">Vídeos Multimédia</td>
                  <td className="py-3 px-4">Utilizamos o domínio de privacidade reforçada do YouTube que impede o rastreio de publicidade antes da reprodução.</td>
                  <td className="py-3 px-4">Sessão da Google</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECÇÃO 2: DADOS DE ATLETAS E MENORES (RGPD) */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Lock className="w-4 h-4" />
            <span>Proteção de Atletas & Menores</span>
          </div>
          <h2 className="font-heading text-2xl font-black text-brand-navy dark:text-white">
            2. Proteção de Dados de Sócios, Menores e Jogos Concelhios (JIF)
          </h2>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              A prática desportiva de formação envolve o tratamento de dados pessoais de crianças e jovens. A AJAVP adota salvaguardas técnicas reforçadas:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Validação Pública de Sócios e Atletas:</strong> O nosso sistema de leitura por QR Code (<code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-xs font-mono">/validar/socio/[id]</code>) foi desenhado com base no princípio de <em>Privacy by Design</em>. A página pública apresenta exclusivamente o nome, número de sócio, modalidade desportiva e estado da quota, <strong>ocultando categoricamente moradas, NIF, contactos telefónicos, email ou dados sensíveis</strong>.
              </li>
              <li>
                <strong>Fotografias e Imagens Desportivas:</strong> As fotos de jogos e treinos publicadas na galeria e cromos têm finalidade estritamente associativa, documental e desportiva, mediante autorização prévia recolhida na ficha de inscrição pelo encarregado de educação.
              </li>
              <li>
                <strong>Inscrições e Assinatura Digital:</strong> O registo de novos atletas decorre no ecossistema protegido de secretaria (<code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-xs font-mono">AJAVP-Gestao</code>), com transmissão encriptada (HTTPS/TLS) e armazenamento em base de dados segura com controlo estrito de acessos (RLS - Row Level Security).
              </li>
            </ul>
          </div>
        </section>

        {/* SECÇÃO 3: DIREITOS DOS TITULARES */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <FileText className="w-4 h-4" />
            <span>Os Teus Direitos</span>
          </div>
          <h2 className="font-heading text-2xl font-black text-brand-navy dark:text-white">
            3. Como Exercer os Teus Direitos de Privacidade
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Nos termos dos Artigos 15.º a 22.º do Regulamento Geral sobre a Proteção de Dados, qualquer sócio, atleta ou encarregado de educação tem direito a:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Acesso e Retificação</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Consultar os dados registados na ficha de sócio e solicitar a retificação imediata de contactos ou morada.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Apagamento e Oposição</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Solicitar a remoção de fotografias da galeria pública ou a revogação do consentimento para notificações desportivas.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Portabilidade de Dados</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Obter uma cópia dos dados associativos e desportivos em formato estruturado e legível.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Reclamação à Autoridade</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Apresentar reclamação formal junto da Comissão Nacional de Proteção de Dados (CNPD - <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="underline text-brand-green dark:text-emerald-400">cnpd.pt</a>).
              </p>
            </div>
          </div>
        </section>

        {/* SECÇÃO 4: CONTACTO DO RESPONSÁVEL PELO TRATAMENTO */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-white/10 shadow-xl space-y-4">
          <h2 className="font-heading font-black text-xl text-white">
            4. Contacto do Responsável pelo Tratamento
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Para qualquer esclarecimento, pedido de retificação de dados ou exercício de direitos de privacidade, contacta a Direção da AJAVP:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-white/10 text-emerald-400 shrink-0">
                <Mail className="w-4 h-4" />
              </span>
              <div>
                <span className="text-slate-400 block text-xs">Email Oficial:</span>
                <a href="mailto:geralajavp@gmail.com" className="font-bold text-white hover:text-emerald-400 transition-colors">
                  geralajavp@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-white/10 text-amber-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </span>
              <div>
                <span className="text-slate-400 block text-xs">Sede:</span>
                <span className="font-medium text-slate-200">
                  Rua 103, nº 43, Urbanização de Real, 4485-823
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

