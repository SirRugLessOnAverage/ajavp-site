import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";
import { obterNoticiasPublicadas } from "../lib/noticias";

// Rotas públicas indexáveis. O teste garante que correspondem a app/**/page.tsx.
export const SITEMAP_PATHS = [
  "/",
  "/jif",
  "/jif/futsal",
  "/jif/classificacao",
  "/modalidades",
  "/modalidades/futsal",
  "/modalidades/atletismo-ciclismo",
  "/modalidades/tenis-de-mesa",
  "/socios",
  "/noticias",
  "/associacao",
  "/patrocinadores",
  "/multimedia",
  "/contactos",
  "/acessibilidade",
  "/privacidade",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = SITEMAP_PATHS.map((p) => ({
    url: `${SITE_URL}${p === "/" ? "" : p}`,
    changeFrequency: p.startsWith("/jif") || p === "/noticias" ? "daily" : "monthly",
    priority: p === "/" ? 1 : p === "/socios" ? 0.9 : p.startsWith("/jif") || p === "/noticias" ? 0.8 : 0.6,
  }));

  const noticias = await obterNoticiasPublicadas(50);
  const noticiasEntries: MetadataRoute.Sitemap = noticias
    .filter((n) => Boolean(n.slug))
    .map((n) => ({
      url: `${SITE_URL}/noticias/${n.slug}`,
      lastModified: n.updated_at || n.publicado_em || undefined,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [...staticEntries, ...noticiasEntries];
}
