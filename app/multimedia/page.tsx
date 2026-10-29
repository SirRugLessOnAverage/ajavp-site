import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MediaGallery } from "@/components/multimedia/MediaGallery";
import { GALLERY_PHOTOS, VIDEOS_LIST } from "@/data/institucional";

export const metadata: Metadata = {
  title: "Galeria & Multimédia • AJAVP — Vilar do Pinheiro",
  description:
    "Explora o arquivo fotográfico oficial da AJAVP: estreia do novo equipamento 2026/2027, conquistas no Corta-Mato, Futsal, Ténis de Mesa, Duatlo BTT e vídeos da época.",
};

export default function MultimediaPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <div>
        {/* HERO DA PÁGINA MULTIMÉDIA */}
        <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden bg-linear-to-b from-emerald-50/70 via-white to-slate-50 dark:from-ajavp-green-dark/45 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-white/10 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs
              items={[{ label: "Galeria & Multimédia" }]}
              className="mb-6"
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/30 text-emerald-900 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest mb-6">
                  <span>📸</span> Memória Viva da Mancha Verde
                </div>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy dark:text-white tracking-tight leading-[1.08] mb-6">
                  Galeria &{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-green via-emerald-600 to-amber-600 dark:from-emerald-300 dark:via-emerald-400 dark:to-amber-400">
                    Multimédia
                  </span>
                </h1>
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">
                  Dos sorrisos dos nossos Sub-7 a estrear o novo equipamento 26/27 até aos pódios do Corta-Mato e à festa do 25 de Abril. Filtra por modalidade ou abre qualquer fotografia em ecrã inteiro.
                </p>

                <div className="flex flex-wrap gap-3.5">
                  <a
                    href="#galeria-fotos"
                    className="motion-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-green hover:bg-brand-greenDark text-white font-bold text-sm transition-colors shadow-lg shadow-brand-green/25"
                  >
                    🖼️ Explorar {GALLERY_PHOTOS.length} Fotografias
                  </a>
                  <a
                    href="#videos-epoca"
                    className="motion-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-semibold text-sm transition-colors shadow-2xs"
                  >
                    🎬 Ver {VIDEOS_LIST.length} Vídeos & Reels
                  </a>
                </div>
              </div>

              {/* Collage Rápida no Hero */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
                <div className="polaroid-left motion-photo rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-white/15 aspect-4/3 bg-zinc-900 shadow-xl">
                  <img
                    src="/assets/images/galeria/sub7.webp"
                    alt="Treinador e atletas Sub-7 em roda tática"
                    className="motion-photo-zoom w-full h-full object-cover"
                  />
                </div>
                <div className="polaroid-right motion-photo rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-white/15 aspect-4/3 bg-zinc-900 shadow-xl mt-4">
                  <img
                    src="/assets/images/galeria/sub11.webp"
                    alt="Plantel Sub-11 da AJAVP"
                    className="motion-photo-zoom w-full h-full object-cover"
                  />
                </div>
                <div className="polaroid-right motion-photo rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-white/15 aspect-4/3 bg-zinc-900 shadow-xl">
                  <img
                    src="/assets/images/galeria/sub13.webp"
                    alt="Plantel Sub-13 da AJAVP"
                    className="motion-photo-zoom w-full h-full object-cover"
                  />
                </div>
                <div className="polaroid-left motion-photo rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-white/15 aspect-4/3 bg-zinc-900 shadow-xl mt-4">
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
        <section className="py-16 lg:py-20 bg-white dark:bg-slate-900 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MediaGallery photos={GALLERY_PHOTOS} videos={VIDEOS_LIST} />
          </div>
        </section>

        {/* CTA REDES SOCIAIS & PARTILHA DE FOTOS */}
        <section className="py-16 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 transition-colors">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-navy dark:text-white mb-3">
              Tens Fotografias das Jornadas da AJAVP?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-6">
              Segue as nossas redes sociais oficiais para acompanhares os resultados em direto ou envia as tuas fotografias das provas para a equipa de comunicação da AJAVP.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/ajavp.javip"
                target="_blank"
                rel="noopener noreferrer"
                className="motion-press inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-pink-600 via-red-600 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg"
              >
                📱 Seguir @ajavp.javip no Instagram ↗
              </a>
              <a
                href="https://www.facebook.com/AJAVP.JAVIP"
                target="_blank"
                rel="noopener noreferrer"
                className="motion-press inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-colors"
              >
                👍 Página Oficial no Facebook ↗
              </a>
              <Link
                href="/contactos"
                className="motion-press inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs"
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
