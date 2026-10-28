"use client";

import { useState, useEffect, useCallback } from "react";
import type { GalleryPhoto, VideoItem } from "@/data/institucional";

interface MediaGalleryProps {
  photos: GalleryPhoto[];
  videos: VideoItem[];
}

type CategoryFilter = "todas" | GalleryPhoto["category"];

const CATEGORY_TABS: {
  id: CategoryFilter;
  label: string;
  icon: string;
}[] = [
  { id: "todas", label: "Todas as Fotos", icon: "✨" },
  { id: "equipamento", label: "Novo Equipamento 26/27", icon: "👕" },
  { id: "futsal", label: "Futsal & Futebol", icon: "🥅" },
  { id: "atletismo", label: "Atletismo & Campeões", icon: "🏃" },
  { id: "outras", label: "Outras Modalidades", icon: "🏓" },
  { id: "familia", label: "Família & 25 de Abril", icon: "💚" },
];

export function MediaGallery({ photos, videos }: MediaGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("todas");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const filteredPhotos =
    activeCategory === "todas"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const featuredNewPhotos = photos.filter((p) => p.featuredNew);

  const handlePrevPhoto = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || filteredPhotos.length === 0) return null;
      return (prev - 1 + filteredPhotos.length) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  const handleNextPhoto = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || filteredPhotos.length === 0) return null;
      return (prev + 1) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  useEffect(() => {
    if (lightboxIndex === null && activeVideo === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
        setActiveVideo(null);
      } else if (lightboxIndex !== null && e.key === "ArrowLeft") {
        handlePrevPhoto();
      } else if (lightboxIndex !== null && e.key === "ArrowRight") {
        handleNextPhoto();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, activeVideo, handlePrevPhoto, handleNextPhoto]);

  const openPhotoInLightbox = (photoId: string) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photoId);
    if (idx !== -1) {
      setLightboxIndex(idx);
    } else {
      setActiveCategory("todas");
      const globalIdx = photos.findIndex((p) => p.id === photoId);
      if (globalIdx !== -1) setLightboxIndex(globalIdx);
    }
  };

  const currentLightboxPhoto =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <div className="space-y-20">
      {/* SECÇÃO 1: DESTAQUE ESPECIAL - ESTREIA NOVO EQUIPAMENTO 26/27 */}
      <section aria-labelledby="destaque-equipamento-heading">
        <div className="rounded-3xl bg-linear-to-br from-ajavp-green-dark/40 via-zinc-900 to-zinc-950 border border-ajavp-gold/30 p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ajavp-gold/20 border border-ajavp-gold/40 text-ajavp-gold text-xs font-extrabold uppercase tracking-wider mb-3">
                ✨ Álbum em Destaque • Época 2026/2027
              </span>
              <h2
                id="destaque-equipamento-heading"
                className="font-heading text-2xl sm:text-3xl font-black text-white"
              >
                Estreia do Novo Equipamento & Escalões 26/27
              </h2>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm max-w-md">
              As primeiras fotografias oficiais dos nossos escalões Sub-7, Sub-9, Sub-11 e Sub-13 com a nova camisola de jogo e o equipamento de treino preto.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredNewPhotos.map((photo) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => openPhotoInLightbox(photo.id)}
                className="motion-card group text-left relative rounded-2xl overflow-hidden border border-white/15 bg-zinc-950 aspect-4/3 focus:outline-none focus:ring-2 focus:ring-ajavp-gold"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  style={{ objectPosition: photo.objectPosition ?? "center" }}
                  className="motion-photo-zoom w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-ajavp-gold text-black text-[10px] font-black uppercase tracking-wider">
                    Novo 26/27
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-bold border border-white/15">
                    {photo.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3.5 right-3.5">
                  <p className="text-xs sm:text-sm font-bold text-white line-clamp-2 group-hover:text-ajavp-gold transition-colors">
                    {photo.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECÇÃO 2: GALERIA COMPLETA COM FILTROS ANIMADOS POR CATEGORIA */}
      <section id="galeria-fotos" className="scroll-mt-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-ajavp-green-light text-xs font-bold uppercase tracking-widest block mb-2">
              Arquivo Fotográfico Oficial • {filteredPhotos.length} Fotografias
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white">
              Mural Fotográfico dos Nossos Atletas
            </h2>
          </div>

          {/* Filtros por Categoria */}
          <div
            role="tablist"
            aria-label="Filtrar fotografias por modalidade ou tema"
            className="flex flex-wrap gap-2"
          >
            {CATEGORY_TABS.map((tab) => {
              const isSelected = activeCategory === tab.id;
              const count =
                tab.id === "todas"
                  ? photos.length
                  : photos.filter((p) => p.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveCategory(tab.id);
                    setLightboxIndex(null);
                  }}
                  className={`motion-press inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                    isSelected
                      ? "bg-ajavp-green text-white border-ajavp-green-light shadow-lg shadow-ajavp-green/25"
                      : "bg-zinc-900/90 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                      isSelected
                        ? "bg-black/30 text-ajavp-gold"
                        : "bg-white/10 text-gray-300"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grelha de Fotografias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredPhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="motion-card group text-left relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 aspect-4/3 focus:outline-none focus:ring-2 focus:ring-ajavp-green-light"
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                style={{ objectPosition: photo.objectPosition ?? "center" }}
                className="motion-photo-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white">
                  {photo.badge}
                </span>
                <span className="w-7 h-7 rounded-full bg-black/65 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  🔍
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-xs font-semibold text-gray-100 line-clamp-2 group-hover:text-ajavp-gold transition-colors">
                  {photo.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* SECÇÃO 3: VÍDEOS & REELS DA ÉPOCA */}
      <section id="videos-epoca" className="scroll-mt-24 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-ajavp-gold text-xs font-bold uppercase tracking-widest block mb-2">
              AJAVP TV • Momentos em Movimento
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white">
              Vídeos & Reels das Nossas Equipas
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-md">
            Revê as reportagens de vídeo das conquistas no Corta-Mato, encontros de Ténis de Mesa, Duatlo BTT e Festa do Futebol.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <article
              key={video.id}
              className="motion-card rounded-2xl bg-zinc-900/90 border border-white/10 overflow-hidden flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="relative aspect-video bg-zinc-950 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    className="motion-photo-zoom w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    {video.youtubeId ? (
                      <button
                        type="button"
                        onClick={() => setActiveVideo(video)}
                        aria-label={`Reproduzir vídeo: ${video.title}`}
                        className="motion-press w-14 h-14 rounded-full bg-ajavp-green hover:bg-ajavp-green-light text-white flex items-center justify-center text-xl shadow-xl ring-4 ring-white/20 transition-colors"
                      >
                        ▶
                      </button>
                    ) : (
                      <a
                        href={video.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ver Reel no Instagram: ${video.title}`}
                        className="motion-press px-4 py-2.5 rounded-full bg-linear-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold text-xs shadow-xl flex items-center gap-2"
                      >
                        <span>📱</span> Ver Reel no Instagram ↗
                      </a>
                    )}
                  </div>

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 text-white text-[10px] font-bold uppercase tracking-wider">
                      {video.badge}
                    </span>
                    {video.highlightBadge && (
                      <span className="px-2.5 py-1 rounded-full bg-ajavp-gold text-black text-[10px] font-black uppercase">
                        {video.highlightBadge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  {video.dateLabel && (
                    <span className="text-[11px] text-ajavp-green-light font-semibold block mb-1">
                      📅 {video.dateLabel}
                    </span>
                  )}
                  <h3 className="font-heading text-lg font-bold text-white mb-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>

              <div className="px-5 py-3 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs">
                {video.youtubeId ? (
                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    className="font-bold text-ajavp-green-light hover:text-ajavp-gold transition-colors"
                  >
                    ▶ Assistir Vídeo no Site
                  </button>
                ) : (
                  <a
                    href={video.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-pink-400 hover:underline"
                  >
                    Abrir no Instagram Oficial ↗
                  </a>
                )}
                <span className="text-[11px] text-gray-400">AJAVP Multimédia</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* LIGHTBOX DE FOTOGRAFIAS (COM NAVEGAÇÃO ← / → / ESC) */}
      {currentLightboxPhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentLightboxPhoto.title}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barra Superior do Lightbox */}
            <div className="w-full flex items-center justify-between mb-3 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-ajavp-green text-white font-bold">
                  {currentLightboxPhoto.badge}
                </span>
                <span className="text-gray-400">
                  Foto {lightboxIndex + 1} de {filteredPhotos.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
              >
                ✕ Fechar (Esc)
              </button>
            </div>

            {/* Imagem Principal + Setas Laterais */}
            <div className="relative w-full flex items-center justify-center bg-zinc-950 rounded-2xl overflow-hidden border border-white/15">
              <button
                type="button"
                onClick={handlePrevPhoto}
                aria-label="Fotografia anterior"
                className="motion-press absolute left-3 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-ajavp-green text-white font-bold flex items-center justify-center border border-white/20 transition-colors"
              >
                ←
              </button>

              <img
                src={currentLightboxPhoto.src}
                alt={currentLightboxPhoto.title}
                className="max-h-[75vh] w-auto object-contain mx-auto select-none"
              />

              <button
                type="button"
                onClick={handleNextPhoto}
                aria-label="Próxima fotografia"
                className="motion-press absolute right-3 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-ajavp-green text-white font-bold flex items-center justify-center border border-white/20 transition-colors"
              >
                →
              </button>
            </div>

            {/* Legenda da Fotografia */}
            <p className="mt-4 text-sm sm:text-base font-bold text-white text-center max-w-2xl">
              {currentLightboxPhoto.title}
            </p>
          </div>
        </div>
      )}

      {/* MODAL DE VÍDEO YOUTUBE */}
      {activeVideo && activeVideo.youtubeId && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading text-lg font-bold text-white">
                {activeVideo.title}
              </h3>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
              >
                ✕ Fechar Vídeo (Esc)
              </button>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

