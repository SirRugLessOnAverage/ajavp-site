import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MediaGallery } from "@/components/multimedia/MediaGallery";
import { GALLERY_PHOTOS, VIDEOS_LIST } from "@/data/institucional";

export const metadata: Metadata = {
  title: "Galeria & Multimédia • AJAVP — São Pedro de Avioso",
  description:
    "Explora o arquivo fotográfico oficial da AJAVP: estreia do novo equipamento 2026/2027, conquistas no Corta-Mato, Futsal, Ténis de Mesa, Duatlo BTT e vídeos da época.",
};

export default function MultimediaPage() {
  return (
    <div className="bg-ajavp-black text-white">
      <div id="conteudo-principal">
        {/* HERO DA PÁGINA MULTIMÉDIA */}
        <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden bg-gradient-to-b from-ajavp-green-dark/45 via-ajavp-black to-ajavp-black border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs
              items={[{ label: "Galeria & Multimédia" }]}
              className="mb-6"
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ajavp-green/20 border border-ajavp-green-light/30 text-ajavp-green-light text-xs font-bold uppercase tracking-widest mb-6">
                  <span>📸</span> Memória Viva da Mancha Verde
                </div>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6">
                  Galeria &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-ajavp-green-light via-emerald-400 to-ajavp-gold">
                    Multimédia
                  </span>
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
                  Dos sorrisos dos nossos Sub-7 a estrear o novo equipamento 26/27 até aos pódios do Corta-Mato e à festa do 25 de Abril. Filtra por modalidade ou abre qualquer fotografia em ecrã inteiro.
                </p>

                <div className="flex flex-wrap gap-3.5">
                  <a
                    href="#galeria-fotos"
                    className="motion-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ajavp-green hover:bg-ajavp-green-light text-white font-bold text-sm transition-colors shadow-lg shadow-ajavp-green/25"
                  >
                    🖼️ Explorar {GALLERY_PHOTOS.length} Fotografias
                  </a>
                  <a
                    href="#videos-epoca"
                    className="motion-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm transition-colors"
                  >
                    🎬 Ver {VIDEOS_LIST.length} Vídeos & Reels
                  </a>
                </div>
              </div>

              {/* Collage Rápida no Hero */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
                <div className="polaroid-left motion-photo rounded-2xl overflow-hidden border-2 border-white/15 aspect-[4/3] bg-zinc-900 shadow-xl">
                  <img
                    src="/assets/images/galeria/sub7.webp"
                    alt="Treinador e atletas Sub-7 em roda tática"
                    className="motion-photo-zoom w-full h-full object-cover"
                  />
                </div>
                <div className="polaroid-right motion-photo rounded-2xl overflow-hidden border-2 border-white/15 aspect-[4/3] bg-zinc-900 shadow-xl mt-4">
                  <img
                    src="/assets/images/galeria/sub11.webp"
                    alt="Plantel Sub-11 da AJAVP"
                    className="motion-photo-zoom w-full h-full object-cover"
                  />
                </div>
                <div className="polaroid-right motion-photo rounded-2xl overflow-hidden border-2 border-white/15 aspect-[4/3] bg-zinc-900 shadow-xl">
                  <img
                    src="/assets/images/galeria/sub13.webp"
                    alt="Plantel Sub-13 da AJAVP"
                    className="motion-photo-zoom w-full h-full object-cover"
                  />
                </div>
                <div className="polaroid-left motion-photo rounded-2xl overflow-hidden border-2 border-white/15 aspect-[4/3] bg-zinc-900 shadow-xl mt-4">
                  <img
                    src="/assets/images/galeria/sub9_treino_preto.webp"
                    alt="Escalão Sub-9 com o equipamento de treino preto"
                    className="motion-photo-zoom w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPONENTE INTERATIVO DE GALERIA E VÍDEOS */}
        <section className="py-16 lg:py-20 bg-ajavp-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MediaGallery photos={GALLERY_PHOTOS} videos={VIDEOS_LIST} />
          </div>
        </section>

        {/* CTA REDES SOCIAIS & PARTILHA DE FOTOS */}
        <section className="py-16 bg-zinc-950 border-t border-white/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white mb-3">
              Tens Fotografias das Jornadas da AJAVP?
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-6">
              Segue as nossas redes sociais oficiais para acompanhares os resultados em direto ou envia as tuas fotografias das provas para a equipa de comunicação da AJAVP.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/ajavp.javip"
                target="_blank"
                rel="noopener noreferrer"
                className="motion-press inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg"
              >
                📱 Seguir @ajavp.javip no Instagram ↗
              </a>
              <a
                href="https://www.facebook.com/AJAVP.JAVIP"
                target="_blank"
                rel="noopener noreferrer"
                className="motion-press inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-colors"
              >
                👍 Página Oficial no Facebook ↗
              </a>
              <Link
                href="/contactos"
                className="motion-press inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                ✉️ Contactar Equipa de Comunicação
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

