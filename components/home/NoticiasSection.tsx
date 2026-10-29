import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import type { SiteNoticia } from "@/lib/types/database";

interface NoticiasSectionProps {
  noticias: SiteNoticia[];
}

const FALLBACK_NOTICIAS: SiteNoticia[] = [
  {
    id: "fallback-n1",
    slug: "goleadas-sub9-sub11-2a-jornada-futsal-jif",
    titulo: "Goleadas dos Sub-9 (1-19) e Sub-11 (9-1) na 2.ª Jornada de Futsal",
    resumo:
      "Exibições de gala da formação da AJAVP na 2.ª jornada do Campeonato Concelhio de Futsal dos XL JIF, somando vitórias expressivas em Modivas, Canidelo e Caxinas.",
    conteudo_html: "",
    capa_url: "/assets/images/galeria/sub11.webp",
    categoria: "Futsal • JIF",
    autor_nome: "Direção Desportiva AJAVP",
    destaque: true,
    publicado: true,
    publicado_em: "2026-10-25T19:30:00Z",
    created_at: "2026-10-25T19:30:00Z",
    updated_at: "2026-10-25T19:30:00Z",
  },
  {
    id: "fallback-n2",
    slug: "apresentacao-oficial-novo-equipamento-2026-2027",
    titulo: "Apresentação Oficial do Novo Equipamento 2026/2027",
    resumo:
      "Os escalões de formação da AJAVP já estrearam em campo a nova camisola oficial verde e branca e o equipamento de guarda-redes da época 2026/2027, com o apoio dos patrocinadores oficiais.",
    conteudo_html: "",
    capa_url: "/assets/images/galeria/Sub-9e11.webp",
    categoria: "Clube & Equipamentos",
    autor_nome: "Direção AJAVP",
    destaque: true,
    publicado: true,
    publicado_em: "2026-10-22T14:00:00Z",
    created_at: "2026-10-22T14:00:00Z",
    updated_at: "2026-10-22T14:00:00Z",
  },
  {
    id: "fallback-n3",
    slug: "sub11-bronze-1o-torneio-futebol-xl-jif",
    titulo: "Sub-11 Conquistam o Bronze no 1.º Torneio de Futebol JIF 🥉",
    resumo:
      "No Parque de Jogos de Retorta, a comitiva de Vilar do Pinheiro alcançou o 6.º lugar geral concelhio entre 19 freguesias e subiu ao pódio com o 3.º lugar do escalão Sub-11.",
    conteudo_html: "",
    capa_url: "/assets/images/galeria/sub7banco.webp",
    categoria: "Futebol • JIF",
    autor_nome: "Direção Desportiva AJAVP",
    destaque: false,
    publicado: true,
    publicado_em: "2026-10-18T18:00:00Z",
    created_at: "2026-10-18T18:00:00Z",
    updated_at: "2026-10-18T18:00:00Z",
  },
  {
    id: "fallback-n4",
    slug: "escaloes-estreiam-equipamento-oficial-treino-preto",
    titulo: "Noites de Rigor: Escalões Estreiam Equipamento Oficial de Treino Preto",
    resumo:
      "Durante a semana, os nossos escalões de formação treinam a rigor com o novo Equipamento Oficial de Treino Preto no Ringue Polidesportivo e nos pavilhões de Canidelo e MaiaSport.",
    conteudo_html: "",
    capa_url: "/assets/images/galeria/sub9_treino_preto.webp",
    categoria: "Formação & Treinos",
    autor_nome: "Coordenação Técnica AJAVP",
    destaque: false,
    publicado: true,
    publicado_em: "2026-10-14T20:00:00Z",
    created_at: "2026-10-14T20:00:00Z",
    updated_at: "2026-10-14T20:00:00Z",
  },
  {
    id: "fallback-n5",
    slug: "vitoria-historica-corta-mato-xl-jif",
    titulo: "Vitória Histórica no Corta-Mato de Abertura dos XL JIF",
    resumo:
      "A AJAVP sagrou-se Campeã Geral Coletiva no Corta-Mato de Abertura dos XL Jogos Inter-Freguesias em Vila do Conde com 34 pontos e cinco presenças no pódio.",
    conteudo_html: "",
    capa_url: "/assets/images/galeria/corta_mato_equipa_2026.webp",
    categoria: "Atletismo • JIF",
    autor_nome: "Direção Desportiva AJAVP",
    destaque: true,
    publicado: true,
    publicado_em: "2026-10-04T18:00:00Z",
    created_at: "2026-10-04T18:00:00Z",
    updated_at: "2026-10-04T18:00:00Z",
  },
  {
    id: "fallback-n6",
    slug: "inscricoes-e-treinos-captacao-abertos-2026-2027",
    titulo: "Inscrições e Treinos de Captação Abertos para Toda a Comunidade",
    resumo:
      "Vem experimentar um treino gratuito na AJAVP! Futsal e Futebol a partir dos 4 anos, Atletismo, Ténis de Mesa na Junta de Freguesia, Duatlo BTT, Badminton e Futebol de Praia.",
    conteudo_html: "",
    capa_url: "/assets/images/galeria/prova_25_abril_2025_grupo.webp",
    categoria: "Comunidade",
    autor_nome: "Secretaria AJAVP",
    destaque: false,
    publicado: true,
    publicado_em: "2026-10-01T10:00:00Z",
    created_at: "2026-10-01T10:00:00Z",
    updated_at: "2026-10-01T10:00:00Z",
  },
];

function getNoticiaLink(item: SiteNoticia): { href: string; label: string } {
  const cat = (item.categoria || "").toLowerCase();
  const slug = (item.slug || "").toLowerCase();
  if (slug.includes("equipamento-oficial-treino") || cat.includes("treinos")) {
    return { href: "/modalidades#horarios", label: "Ver Horários & Escalões" };
  }
  if (slug.includes("equipamento") || cat.includes("equipamento")) {
    return { href: "/patrocinadores#novo-equipamento", label: "Ver Novo Equipamento 26/27" };
  }
  if (cat.includes("jif") || cat.includes("futsal") || cat.includes("futebol") || cat.includes("atletismo")) {
    return { href: "/jif#resultados", label: "Ver Resultados no Portal JIF" };
  }
  if (cat.includes("comunidade") || slug.includes("inscricoes")) {
    return { href: "/contactos", label: "Marcar Treino Gratuito" };
  }
  return { href: "/multimedia", label: "Ver Galeria & Destaques" };
}

export function NoticiasSection({ noticias }: NoticiasSectionProps) {
  const dbNews = noticias.filter((n) => n.publicado);
  const publishedNews = dbNews.length > 0 ? dbNews : FALLBACK_NOTICIAS;

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

              const cta = getNoticiaLink(item);
              const coverSrc =
                item.capa_url ||
                (item.slug?.includes("corta-mato")
                  ? "/assets/images/galeria/corta_mato_equipa_2026.webp"
                  : "/assets/images/galeria/Sub-9e11.webp");

              return (
                <article
                  key={item.id}
                  className="group flex flex-col bg-slate-50 dark:bg-slate-800/60 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-500/40 transition-all duration-300 hover:shadow-xl"
                >
                  {/* Capa */}
                  <div className="relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverSrc}
                      alt={item.titulo}
                      className="w-full h-full object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                    {item.categoria && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold tracking-wide uppercase border border-white/15">
                        {item.categoria}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    {formattedDate && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mb-2.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-green dark:text-emerald-400" />
                        <time>{formattedDate}</time>
                      </div>
                    )}
                    <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white group-hover:text-brand-green dark:group-hover:text-emerald-400 transition-colors leading-snug mb-2">
                      {item.titulo}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed flex-1 mb-4">
                      {item.resumo}
                    </p>
                    <Link
                      href={cta.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green dark:text-emerald-400 hover:underline pt-3 border-t border-slate-200/80 dark:border-white/10 mt-auto"
                    >
                      <span>{cta.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
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
