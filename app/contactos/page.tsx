import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/contactos/ContactForm";
import { CONTACTOS_FAQ, TRAINING_VENUES } from "@/data/institucional";

export const metadata: Metadata = {
  title: "Contactos & Inscrições • AJAVP — Vilar do Pinheiro",
  description:
    "Fala diretamente com a direção e coordenação desportiva da AJAVP via WhatsApp, Email ou visita a nossa Sede Social e recintos de treino em Vilar do Pinheiro.",
};

export default function ContactosPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <div>
        {/* HERO COM FOTOGRAFIA DE UNIÃO DA EQUIPA */}
        <section className="relative pt-12 pb-20 lg:pt-14 lg:pb-24 overflow-hidden bg-linear-to-b from-emerald-50/70 via-white to-slate-50 dark:from-ajavp-green-dark/45 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-white/10 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs
              items={[{ label: "Contactos & Inscrições" }]}
              className="mb-5"
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/30 text-emerald-900 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest mb-6">
                  <span>📞</span> Estamos Aqui para a Comunidade
                </div>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy dark:text-white tracking-tight leading-[1.08] mb-6">
                  Contactos &{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-green via-emerald-600 to-amber-600 dark:from-emerald-300 dark:via-emerald-400 dark:to-amber-400">
                    Inscrições
                  </span>
                </h1>
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">
                  Queres marcar um <strong className="text-slate-900 dark:text-white">treino experimental gratuito</strong> para o teu educando, inscrever-te nas modalidades dos JIF ou tornar-te sócio da AJAVP? Fala connosco diretamente.
                </p>

                <div className="flex flex-wrap gap-3.5">
                  <a
                    href="https://wa.me/351917194933?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20AJAVP."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="motion-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1a8744] hover:bg-[#146c36] text-white font-bold text-sm transition-colors shadow-lg"
                  >
                    💬 WhatsApp Direto (+351 917 194 933)
                  </a>
                  <a
                    href="https://forms.gle/YJdnZyUsMB8aBADj6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="motion-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-amber-400 text-slate-950 hover:bg-amber-300 font-black text-sm transition-colors shadow-xs"
                  >
                    📝 Ficha de Inscrição Digital
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="motion-photo relative rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-white/15 bg-zinc-900 shadow-2xl aspect-4/3">
                  <img
                    src="/assets/images/galeria/contactos_uniao_equipa.webp"
                    alt="União e espírito de equipa da família AJAVP"
                    className="motion-photo-zoom w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block">
                        Família AJAVP
                      </span>
                      <span className="text-sm font-bold text-white">
                        Vilar do Pinheiro • Sempre de Portas Abertas
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
                      Treino Grátis
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 CARTÕES DE CONTACTO DIRETO (WHATSAPP, EMAIL, SEDE SOCIAL) */}
        <section className="py-16 bg-white dark:bg-slate-900 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {/* Cartão 1: WhatsApp & Telemóvel */}
              <div className="motion-card rounded-3xl p-7 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-6 shadow-lg">
                <div className="space-y-4">
                  <div className="w-13 h-13 rounded-2xl bg-emerald-100 dark:bg-[#25D366]/15 border border-emerald-300 dark:border-[#25D366]/30 text-emerald-800 dark:text-[#25D366] flex items-center justify-center text-2xl">
                    💬
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                      Atendimento Rápido
                    </span>
                    <h2 className="font-heading font-black text-xl text-brand-navy dark:text-white mt-1">
                      WhatsApp & Coordenação
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Fala diretamente com a coordenação desportiva da AJAVP para marcação de treinos experimentais e dúvidas urgentes.
                  </p>
                  <div className="pt-2 text-sm font-bold text-slate-900 dark:text-white">
                    <p>+351 917 194 933</p>
                    <p className="text-xs font-normal text-slate-600 dark:text-slate-400 mt-0.5">
                      Disponível nos dias úteis e fins de semana de jogo
                    </p>
                  </div>
                </div>
                <a
                  href="https://wa.me/351917194933?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20AJAVP."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="motion-press w-full inline-flex items-center justify-center gap-2 bg-[#1a8744] hover:bg-[#146c36] text-white py-3.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                >
                  <span>💬</span>
                  <span>Iniciar Conversa no WhatsApp</span>
                </a>
              </div>

              {/* Cartão 2: Email Oficial */}
              <div className="motion-card rounded-3xl p-7 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-6 shadow-lg">
                <div className="space-y-4">
                  <div className="w-13 h-13 rounded-2xl bg-blue-100 dark:bg-blue-500/15 border border-blue-300 dark:border-blue-400/30 text-blue-800 dark:text-blue-400 flex items-center justify-center text-2xl">
                    ✉️
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                      Secretaria Administrativa
                    </span>
                    <h2 className="font-heading font-black text-xl text-brand-navy dark:text-white mt-1">
                      Correio Eletrónico
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Para envio de fichas de inscrição, comprovativos médicos, pedidos de parceria ou assuntos institucionais da direção.
                  </p>
                  <div className="pt-2 text-sm font-bold text-slate-900 dark:text-white">
                    <p className="font-mono text-amber-800 dark:text-amber-300">
                      geralajavp@gmail.com
                    </p>
                    <p className="text-xs font-normal text-slate-600 dark:text-slate-400 mt-0.5">
                      Resposta habitual no próprio dia útil
                    </p>
                  </div>
                </div>
                <a
                  href="mailto:geralajavp@gmail.com"
                  className="motion-press w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white py-3.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider shadow-xs transition-colors"
                >
                  <span>✉️</span>
                  <span>Enviar Email Oficial</span>
                </a>
              </div>

              {/* Cartão 3: Sede & Morada */}
              <div className="motion-card rounded-3xl p-7 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-6 shadow-lg">
                <div className="space-y-4">
                  <div className="w-13 h-13 rounded-2xl bg-amber-100 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-400/30 text-amber-800 dark:text-amber-300 flex items-center justify-center text-2xl">
                    📍
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                      Instalações Centrais
                    </span>
                    <h2 className="font-heading font-black text-xl text-brand-navy dark:text-white mt-1">
                      Sede Social
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Rua 103, nº 43, Urbanização de Real, 4485-823 Vilar do Pinheiro, Vila do Conde • NIPC 519 096 045 • NISS 25190960451.
                  </p>
                  <div className="pt-2 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <p>
                      <strong className="text-slate-900 dark:text-white">GPS:</strong> 41.265929, -8.673955
                    </p>
                    <p className="text-[11px] text-amber-800 dark:text-amber-300 font-semibold">
                      Atendimento presencial mediante marcação prévia ou nos horários de treino.
                    </p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=41.265929,-8.673955"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="motion-press w-full inline-flex items-center justify-center gap-2 bg-amber-400 text-slate-950 hover:bg-amber-300 py-3.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider shadow-md transition-colors"
                >
                  <span>🗺️</span>
                  <span>Abrir Rota no Google Maps</span>
                </a>
              </div>
            </div>

            {/* FORMULÁRIO DE MENSAGEM / PRÉ-INSCRIÇÃO */}
            <div
              id="formulario-contacto"
              className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/15 shadow-xl mb-16 scroll-mt-24"
            >
              <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-green dark:text-emerald-400">
                  Formulário Rápido de Contacto
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-brand-navy dark:text-white">
                  Envia-nos uma Mensagem
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  Preenche os teus dados abaixo para enviar por Email ou iniciar imediatamente a conversa no WhatsApp com a equipa técnica.
                </p>
              </div>

              <ContactForm />
            </div>

            {/* RECINTOS DE TREINO E LOCALIZAÇÃO */}
            <div className="mb-16">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 block mb-1">
                  Onde Treinamos
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-navy dark:text-white">
                  Recintos Desportivos da AJAVP
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {TRAINING_VENUES.map((venue) => (
                  <div
                    key={venue.code}
                    className="rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 p-5 flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-400/30 text-xs font-black mb-2">
                        [{venue.code}] {venue.typeBadge}
                      </span>
                      <h3 className="font-heading text-base font-bold text-brand-navy dark:text-white mb-1">
                        {venue.name}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
                        {venue.location}
                      </p>
                    </div>
                    <a
                      href={venue.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-brand-green dark:text-emerald-400 hover:underline inline-flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/10"
                    >
                      <span>{venue.mapsLabel}</span>
                      <span>↗</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ: PERGUNTAS FREQUENTES */}
            <div>
              <div className="max-w-2xl space-y-2 mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-green dark:text-emerald-400">
                  Dúvidas Comuns
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-brand-navy dark:text-white">
                  Perguntas Frequentes (FAQ)
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CONTACTOS_FAQ.map((faq, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 space-y-2 shadow-xs"
                  >
                    <h3 className="font-heading font-bold text-base text-brand-navy dark:text-amber-300">
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>
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
