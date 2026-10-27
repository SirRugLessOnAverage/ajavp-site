import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import type { SiteNoticia } from "@/lib/types/database";

interface NoticiasSectionProps {
  noticias: SiteNoticia[];
}

export function NoticiasSection({ noticias }: NoticiasSectionProps) {
  const publishedNews = noticias.filter((n) => n.publicado);

  return (
    <section id="noticias" className="py-16 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Notícias &amp; Comunicados</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
              Atualidade da AJAVP
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Fica a par de tudo o que acontece na nossa associação e nas modalidades.
            </p>
          </div>
          <Link
            href="/multimedia"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-green dark:text-emerald-400 hover:text-brand-greenDark transition-colors group"
          >
            <span>Ver arquivo multimédia</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Content */}
        {publishedNews.length === 0 ? (
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 text-center">
            <Newspaper className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-base text-slate-800 dark:text-slate-200">
              Sem comunicados recentes neste momento
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              As novidades oficiais são publicadas diretamente pela direção e secretaria. Consulta as nossas redes sociais para atualizações diárias.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedNews.map((item) => {
              const formattedDate = item.publicado_em
                ? new Date(item.publicado_em).toLocaleDateString("pt-PT", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : null;

              return (
                <article
                  key={item.id}
                  className="group flex flex-col bg-slate-50 dark:bg-slate-800/60 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-500/40 transition-all duration-300 hover:shadow-xl"
                >
                  {/* Capa */}
                  {item.capa_url ? (
                    <div className="relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-700">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.capa_url}
                        alt={item.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {item.categoria && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wide uppercase">
                          {item.categoria}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-brand-navy to-emerald-800 flex items-center justify-center p-6 text-white text-center">
                      <span className="font-heading font-bold text-sm tracking-wide opacity-90">
                        {item.categoria || "AJAVP Notícias"}
                      </span>
                    </div>
                  )}

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    {formattedDate && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <time>{formattedDate}</time>
                      </div>
                    )}
                    <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white group-hover:text-brand-green dark:group-hover:text-emerald-400 transition-colors leading-snug mb-2">
                      {item.titulo}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed flex-1">
                      {item.resumo}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
