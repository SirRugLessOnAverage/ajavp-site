import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  obterNoticiasPublicadas,
  getNoticiaCoverUrl,
  getNoticiaLink,
} from "@/lib/noticias";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Notícias e Atualidade de Vilar do Pinheiro",
  description:
    "Todas as notícias, crónicas desportivas, pódios nos XL Jogos Inter-Freguesias e comunicados oficiais da Associação de Jovens e Adultos de Vilar do Pinheiro.",
  alternates: {
    canonical: `${SITE_URL}/noticias`,
  },
  openGraph: {
    title: "Notícias e Atualidade de Vilar do Pinheiro",
    description:
      "Crónicas desportivas, vitórias nos XL JIF e atualidade oficial da AJAVP.",
    url: `${SITE_URL}/noticias`,
    siteName: "AJAVP",
    locale: "pt_PT",
    type: "website",
    images: [
      {
        url: "/assets/images/galeria/tenis-mesa/tenis_mesa_2026_medalhados_tarde_ajavp.webp",
        width: 1200,
        height: 630,
        alt: "Atualidade Desportiva AJAVP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notícias e Atualidade • AJAVP",
    description: "Crónicas desportivas, pódios nos XL JIF e vida associativa em Vilar do Pinheiro.",
    images: ["/assets/images/galeria/tenis-mesa/tenis_mesa_2026_medalhados_tarde_ajavp.webp"],
  },
};

export default async function NoticiasArquivoPage() {
  const noticias = await obterNoticiasPublicadas(50);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-4">
          <Breadcrumbs items={[{ label: "Notícias & Atualidade" }]} />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Arquivo Oficial AJAVP</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-brand-navy dark:text-white tracking-tight">
            Notícias &amp; Destaques Desportivos
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            Todas as vitórias, comunicados de época, novidades de equipamentos e momentos da #ManchaVerde em Vilar do Pinheiro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticias.map((item) => {
            const formattedDate = item.publicado_em
              ? new Date(item.publicado_em).toLocaleDateString("pt-PT", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : null;
            const coverSrc = getNoticiaCoverUrl(item);
            const cta = getNoticiaLink(item);
            const articleHref = `/noticias/${item.slug}`;

            return (
              <article
                key={item.id}
                className="motion-card group flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-500/40 transition-all duration-300 hover:shadow-xl"
              >
                <Link
                  href={articleHref}
                  className="relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-800 block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverSrc}
                    alt={item.titulo}
                    className="w-full h-full object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {item.categoria && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold tracking-wide uppercase border border-white/15">
                      {item.categoria}
                    </span>
                  )}
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  {formattedDate && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-brand-green dark:text-emerald-400" />
                      <time>{formattedDate}</time>
                    </div>
                  )}
                  <Link href={articleHref} className="block mb-2">
                    <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white group-hover:text-brand-green dark:group-hover:text-emerald-400 transition-colors leading-snug">
                      {item.titulo}
                    </h2>
                  </Link>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed flex-1 mb-4">
                    {item.resumo}
                  </p>
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-200/80 dark:border-white/10 mt-auto">
                    <Link
                      href={articleHref}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-navy dark:text-white hover:text-brand-green dark:hover:text-emerald-400 transition-colors"
                    >
                      <span>Ler notícia</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={cta.href}
                      className="text-[11px] font-bold text-brand-green dark:text-emerald-400 hover:underline text-right"
                    >
                      {cta.label}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
