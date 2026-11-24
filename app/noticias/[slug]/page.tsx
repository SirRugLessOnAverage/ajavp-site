import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, ArrowRight, UserCheck, Tag } from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { NewsArticleJsonLd } from "@/components/seo/JsonLd";
import { ShareBar } from "@/components/shared/ShareBar";
import {
  obterNoticiaPorSlug,
  obterNoticiasPublicadas,
  getNoticiaCoverUrl,
  getNoticiaLink,
} from "@/lib/noticias";

export const revalidate = 60;

interface NoticiaPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NoticiaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const noticia = await obterNoticiaPorSlug(slug);

  if (!noticia) {
    return {
      title: "Notícia não encontrada",
    };
  }

  const coverUrl = getNoticiaCoverUrl(noticia);
  const absoluteCover = coverUrl.startsWith("http") ? coverUrl : `${SITE_URL}${coverUrl}`;
  const canonicalUrl = `${SITE_URL}/noticias/${noticia.slug}`;

  return {
    title: noticia.titulo,
    description: noticia.resumo,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: noticia.titulo,
      description: noticia.resumo,
      url: canonicalUrl,
      siteName: "AJAVP",
      locale: "pt_PT",
      type: "article",
      publishedTime: noticia.publicado_em || noticia.created_at || undefined,
      modifiedTime: noticia.updated_at || noticia.publicado_em || undefined,
      images: [
        {
          url: absoluteCover,
          width: 1200,
          height: 630,
          alt: noticia.titulo,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: noticia.titulo,
      description: noticia.resumo,
      images: [absoluteCover],
    },
  };
}

function sanitizarHtmlBasico(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*(['"]).*?\1/gi, "");
}

export default async function NoticiaDetalhePage({ params }: NoticiaPageProps) {
  const { slug } = await params;
  const noticia = await obterNoticiaPorSlug(slug);

  if (!noticia) {
    notFound();
  }

  const outrasNoticias = (await obterNoticiasPublicadas(6)).filter(
    (n) => n.slug !== noticia.slug
  );

  const coverSrc = getNoticiaCoverUrl(noticia);
  const cta = getNoticiaLink(noticia);
  const canonicalUrl = `${SITE_URL}/noticias/${noticia.slug}`;
  const formattedDate = noticia.publicado_em
    ? new Date(noticia.publicado_em).toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  const corpoHtml = noticia.conteudo_html?.trim()
    ? sanitizarHtmlBasico(noticia.conteudo_html)
    : `<p>${noticia.resumo}</p>`;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white transition-colors py-10 sm:py-14">
      <NewsArticleJsonLd
        title={noticia.titulo}
        description={noticia.resumo}
        slug={noticia.slug}
        imageUrl={coverSrc}
        publishedAt={noticia.publicado_em}
        updatedAt={noticia.updated_at}
        authorName={noticia.autor_nome}
        category={noticia.categoria}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs
          items={[
            { label: "Notícias", href: "/noticias" },
            { label: noticia.titulo },
          ]}
        />

        {/* Cabeçalho do Artigo */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold">
            {noticia.categoria && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-400/30 uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5" />
                <span>{noticia.categoria}</span>
              </span>
            )}
            {formattedDate && (
              <span className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-brand-green dark:text-emerald-400" />
                <time dateTime={noticia.publicado_em || undefined}>{formattedDate}</time>
              </span>
            )}
            {noticia.autor_nome && (
              <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <UserCheck className="w-3.5 h-3.5" />
                <span>{noticia.autor_nome}</span>
              </span>
            )}
          </div>

          <h1 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-brand-navy dark:text-white tracking-tight leading-tight">
            {noticia.titulo}
          </h1>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            {noticia.resumo}
          </p>

          {/* Barra de Partilha Dinâmica */}
          <div className="pt-2">
            <ShareBar
              title={noticia.titulo}
              text={noticia.resumo}
              url={canonicalUrl}
            />
          </div>
        </header>

        {/* Imagem de Capa */}
        <div className="relative aspect-16/9 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl bg-slate-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverSrc}
            alt={noticia.titulo}
            fetchPriority="high"
            className="w-full h-full object-cover object-[center_30%]"
          />
        </div>

        {/* Corpo Editorial */}
        <div
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4 text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed [&_p]:mb-4 last:[&_p]:mb-0"
          dangerouslySetInnerHTML={{ __html: corpoHtml }}
        />

        {/* Ação Contextual e Navegação */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-6 rounded-3xl bg-emerald-50/90 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-brand-green dark:text-emerald-400 block">
              Explorar Dados Relacionados
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Consulta classificações, calendário e pódios oficiais no portal AJAVP.
            </p>
          </div>
          <Link
            href={cta.href}
            className="motion-press inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-brand-green hover:bg-brand-greenDark text-white font-heading font-bold text-xs shadow-md transition-all shrink-0"
          >
            <span>{cta.label}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mais Notícias */}
        {outrasNoticias.length > 0 && (
          <section className="pt-8 border-t border-slate-200 dark:border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-black text-xl text-slate-900 dark:text-white">
                Outras Notícias da AJAVP
              </h2>
              <Link
                href="/noticias"
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-green dark:text-emerald-400 hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Ver todas</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {outrasNoticias.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  href={`/noticias/${item.slug}`}
                  className="motion-card p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-500/40 transition-all space-y-2"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green dark:text-emerald-400">
                    {item.categoria || "Atualidade"}
                  </span>
                  <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug">
                    {item.titulo}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
