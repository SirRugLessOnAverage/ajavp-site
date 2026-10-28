import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="bg-ajavp-black text-white">
      <div id="conteudo-principal">
        {/* HERO COM FOTOGRAFIA DE UNIÃO DA EQUIPA */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-ajavp-green-dark/45 via-ajavp-black to-ajavp-black border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs
              items={[{ label: "Contactos & Inscrições" }]}
              className="mb-6"
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ajavp-green/20 border border-ajavp-green-light/30 text-ajavp-green-light text-xs font-bold uppercase tracking-widest mb-6">
                  <span>📞</span> Estamos Aqui para a Comunidade
                </div>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6">
                  Contactos &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-ajavp-green-light via-emerald-400 to-ajavp-gold">
                    Inscrições
                  </span>
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
                  Queres marcar um <strong className="text-white">treino experimental gratuito</strong> para o teu educando, inscrever-te nas modalidades dos JIF ou tornar-te sócio da AJAVP? Fala connosco diretamente.
                </p>

                <div className="flex flex-wrap gap-3.5">
                  <a
                    href="https://wa.me/351917194933?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20AJAVP."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="motion-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm transition-colors shadow-lg"
                  >
                    💬 WhatsApp Direto (+351 917 194 933)
                  </a>
                  <Link
                    href="/inscricao"
                    className="motion-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ajavp-gold text-black hover:bg-yellow-300 font-black text-sm transition-colors"
                  >
                    📝 Ficha de Inscrição Digital
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="motion-photo relative rounded-3xl overflow-hidden border-2 border-white/15 bg-zinc-900 shadow-2xl aspect-[4/3]">
                  <img
                    src="/assets/images/galeria/contactos_uniao_equipa.webp"
                    alt="União e espírito de equipa da família AJAVP"
                    className="motion-photo-zoom w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-ajavp-green-light block">
                        Família AJAVP
                      </span>
                      <span className="text-sm font-bold text-white">
                        Vilar do Pinheiro • Sempre de Portas Abertas
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-ajavp-gold text-black text-xs font-black">
                      Treino Grátis
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 CARTÕES DE CONTACTO DIRETO (WHATSAPP, EMAIL, SEDE SOCIAL) */}
        <section className="py-16 bg-ajavp-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {/* Cartão 1: WhatsApp & Telemóvel */}
              <div className="motion-card rounded-3xl p-7 bg-zinc-900/90 border border-white/10 flex flex-col justify-between space-y-6 shadow-xl">
                <div className="space-y-4">
                  <div className="w-13 h-13 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] flex items-center justify-center text-2xl">
                    💬
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#25D366] uppercase tracking-wider">
                      Atendimento Rápido
                    </span>
                    <h2 className="font-heading font-black text-xl text-white mt-1">
                      WhatsApp & Coordenação
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Fala diretamente com a coordenação desportiva da AJAVP para marcação de treinos experimentais e dúvidas urgentes.
                  </p>
                  <div className="pt-2 text-sm font-bold text-white">
                    <p>+351 917 194 933</p>
                    <p className="text-xs font-normal text-gray-400 mt-0.5">
                      Disponível nos dias úteis e fins de semana de jogo
                    </p>
                  </div>
                </div>
                <a
                  href="https://wa.me/351917194933?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20AJAVP."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="motion-press w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                >
                  <span>💬</span>
                  <span>Iniciar Conversa no WhatsApp</span>
                </a>
              </div>

              {/* Cartão 2: Email Oficial */}
              <div className="motion-card rounded-3xl p-7 bg-zinc-900/90 border border-white/10 flex flex-col justify-between space-y-6 shadow-xl">
                <div className="space-y-4">
                  <div className="w-13 h-13 rounded-2xl bg-blue-500/15 border border-blue-400/30 text-blue-400 flex items-center justify-center text-2xl">
                    ✉️
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                      Secretaria Administrativa
                    </span>
                    <h2 className="font-heading font-black text-xl text-white mt-1">
                      Correio Eletrónico
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Para envio de fichas de inscrição, comprovativos médicos, pedidos de parceria ou assuntos institucionais da direção.
                  </p>
                  <div className="pt-2 text-sm font-bold text-white">
                    <p className="font-mono text-ajavp-gold">
                      geralajavp@gmail.com
                    </p>
                    <p className="text-xs font-normal text-gray-400 mt-0.5">
                      Resposta habitual no próprio dia útil
                    </p>
                  </div>
                </div>
                <a
                  href="mailto:geralajavp@gmail.com"
                  className="motion-press w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white py-3.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                >
                  <span>✉️</span>
                  <span>Enviar Email Oficial</span>
                </a>
              </div>

              {/* Cartão 3: Sede & Morada */}
              <div className="motion-card rounded-3xl p-7 bg-zinc-900/90 border border-white/10 flex flex-col justify-between space-y-6 shadow-xl">
                <div className="space-y-4">
                  <div className="w-13 h-13 rounded-2xl bg-ajavp-gold/15 border border-ajavp-gold/30 text-ajavp-gold flex items-center justify-center text-2xl">
                    📍
                  </div>
                  <div>
                    <span className="text-xs font-bold text-ajavp-gold uppercase tracking-wider">
                      Instalações Centrais
                    </span>
                    <h2 className="font-heading font-black text-xl text-white mt-1">
                      Sede Social
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Rua 103, nº 43, Urbanização de Real, 4485-823 Vilar do Pinheiro, Vila do Conde • NIPC 519 096 045 • NISS 25190960451.
                  </p>
                  <div className="pt-2 text-xs text-gray-300 space-y-1">
                    <p>
                      <strong className="text-white">GPS:</strong> 41.265929, -8.673955
                    </p>
                    <p className="text-[11px] text-ajavp-gold">
                      Atendimento presencial mediante marcação prévia ou nos horários de treino.
                    </p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=41.265929,-8.673955"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="motion-press w-full inline-flex items-center justify-center gap-2 bg-ajavp-gold text-black hover:bg-yellow-300 py-3.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider shadow-md transition-colors"
                >
                  <span>🗺️</span>
                  <span>Abrir Rota no Google Maps</span>
                </a>
              </div>
            </div>

            {/* FORMULÁRIO DE MENSAGEM / PRÉ-INSCRIÇÃO */}
            <div
              id="formulario-contacto"
              className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-zinc-900/95 border border-white/15 shadow-2xl mb-16 scroll-mt-24"
            >
              <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-ajavp-green-light">
                  Formulário Rápido de Contacto
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                  Envia-nos uma Mensagem
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">
                  Preenche os teus dados abaixo para enviar por Email ou iniciar imediatamente a conversa no WhatsApp com a equipa técnica.
                </p>
              </div>

              <ContactForm />
            </div>

            {/* RECINTOS DE TREINO E LOCALIZAÇÃO */}
            <div className="mb-16">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-ajavp-gold block mb-1">
                  Onde Treinamos
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
                  Recintos Desportivos da AJAVP
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {TRAINING_VENUES.map((venue) => (
                  <div
                    key={venue.code}
                    className="rounded-2xl bg-zinc-900/80 border border-white/10 p-5 flex flex-col justify-between"
                  >
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded-md bg-ajavp-green/25 text-ajavp-green-light text-xs font-black mb-2">
                        [{venue.code}] {venue.typeBadge}
                      </span>
                      <h3 className="font-heading text-base font-bold text-white mb-1">
                        {venue.name}
                      </h3>
                      <p className="text-xs text-gray-400 mb-4">
                        {venue.location}
                      </p>
                    </div>
                    <a
                      href={venue.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-ajavp-gold hover:underline inline-flex items-center justify-between pt-3 border-t border-white/10"
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
                <span className="text-xs font-bold uppercase tracking-widest text-ajavp-green-light">
                  Dúvidas Comuns
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                  Perguntas Frequentes (FAQ)
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CONTACTOS_FAQ.map((faq, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-zinc-900/90 border border-white/10 space-y-2"
                  >
                    <h3 className="font-heading font-bold text-base text-ajavp-gold">
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
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

