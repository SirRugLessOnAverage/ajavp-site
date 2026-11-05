import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";

// Rotas públicas indexáveis. O teste garante que correspondem a app/**/page.tsx.
export const SITEMAP_PATHS = [
  "/",
  "/jif",
  "/jif/futsal",
  "/jif/classificacao",
  "/modalidades",
  "/socios",
  "/associacao",
  "/patrocinadores",
  "/multimedia",
  "/contactos",
  "/acessibilidade",
  "/privacidade",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_PATHS.map((p) => ({
    url: `${SITE_URL}${p === "/" ? "" : p}`,
    changeFrequency: p.startsWith("/jif") ? "daily" : "monthly",
    priority: p === "/" ? 1 : p === "/socios" ? 0.9 : p.startsWith("/jif") ? 0.8 : 0.6,
  }));
}
