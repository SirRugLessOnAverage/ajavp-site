import { supabasePublic } from "@/lib/supabase/public";
import type { SiteNoticia } from "@/lib/types/database";
import { FALLBACK_NOTICIAS, getNoticiaLink } from "@/components/home/NoticiasSection";

export { FALLBACK_NOTICIAS, getNoticiaLink };

export function getNoticiaCoverUrl(item: SiteNoticia): string {
  if (item.capa_url) return item.capa_url;
  if (item.slug?.includes("corta-mato")) {
    return "/assets/images/galeria/corta_mato_equipa_2026.webp";
  }
  return "/assets/images/galeria/Sub-9e11.webp";
}

export async function obterNoticiasPublicadas(limite = 24): Promise<SiteNoticia[]> {
  let dbNoticias: SiteNoticia[] = [];
  try {
    const { data, error } = await supabasePublic
      .from("site_noticias")
      .select("*")
      .eq("publicado", true)
      .order("publicado_em", { ascending: false })
      .limit(limite);

    if (!error && Array.isArray(data) && data.length > 0) {
      dbNoticias = data as SiteNoticia[];
    }
  } catch (err) {
    console.warn("Aviso: Leitura dinâmica de notícias indisponível, a usar fallback estático.", err);
  }

  // Combinar notícias locais mais recentes (não presentes ou mais atualizadas que o Supabase)
  const porSlug = new Map<string, SiteNoticia>();
  for (const item of dbNoticias) {
    if (item.slug) porSlug.set(item.slug, item);
  }
  for (const fallback of FALLBACK_NOTICIAS) {
    const existente = porSlug.get(fallback.slug);
    if (!existente) {
      porSlug.set(fallback.slug, fallback);
    } else if (fallback.updated_at && existente.updated_at && fallback.updated_at > existente.updated_at) {
      porSlug.set(fallback.slug, fallback);
    }
  }

  return Array.from(porSlug.values())
    .sort((a, b) => {
      const da = a.publicado_em || a.created_at || "";
      const db = b.publicado_em || b.created_at || "";
      return db.localeCompare(da);
    })
    .slice(0, limite);
}

export async function obterNoticiaPorSlug(slug: string): Promise<SiteNoticia | null> {
  if (!slug) return null;

  try {
    const { data, error } = await supabasePublic
      .from("site_noticias")
      .select("*")
      .eq("slug", slug)
      .eq("publicado", true)
      .maybeSingle();

    if (!error && data) {
      return data as SiteNoticia;
    }
  } catch (err) {
    console.warn("Aviso: Leitura de notícia por slug indisponível.", err);
  }

  return FALLBACK_NOTICIAS.find((n) => n.slug === slug) ?? null;
}
