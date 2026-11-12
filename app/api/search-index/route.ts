import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { SearchItem } from "@/lib/search-index";

export async function GET() {
  try {
    const supabase = await createClient();

    const [noticiasRes, eventosRes] = await Promise.all([
      supabase
        .from("site_noticias")
        .select("id, slug, titulo, resumo, categoria, publicado_em")
        .eq("publicado", true)
        .order("publicado_em", { ascending: false })
        .limit(20),
      supabase
        .from("site_eventos")
        .select("id, titulo, data_hora, local_nome, adversario")
        .order("data_hora", { ascending: true })
        .limit(20),
    ]);

    const items: SearchItem[] = [];

    if (!noticiasRes.error && noticiasRes.data) {
      for (const n of noticiasRes.data) {
        items.push({
          id: `noticia-${n.id}`,
          title: n.titulo,
          subtitle: n.resumo || n.categoria || "Notícia Oficial AJAVP",
          category: "noticia",
          href: `/#noticias`,
          keywords: `${n.categoria ?? ""} ${n.slug ?? ""} ${n.resumo ?? ""} noticia`,
        });
      }
    }

    if (!eventosRes.error && eventosRes.data) {
      for (const ev of eventosRes.data) {
        const dataFmt = ev.data_hora
          ? new Date(ev.data_hora).toLocaleDateString("pt-PT", {
              day: "2-digit",
              month: "2-digit",
            })
          : "";
        const subParts = [dataFmt, ev.local_nome, ev.adversario].filter(Boolean);
        items.push({
          id: `evento-${ev.id}`,
          title: ev.titulo,
          subtitle: subParts.join(" • "),
          category: "evento",
          href: `/#eventos`,
          keywords: `${ev.local_nome ?? ""} ${ev.adversario ?? ""} evento jogo`,
        });
      }
    }

    return NextResponse.json(
      { items },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch {
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}

