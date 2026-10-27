export interface SiteNoticia {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  conteudo_html: string;
  capa_url: string | null;
  categoria: string | null;
  autor_nome: string | null;
  destaque: boolean | null;
  publicado: boolean | null;
  publicado_em: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface SiteEvento {
  id: string;
  titulo: string;
  modalidade_id: string | null;
  escalao_id: string | null;
  data_hora: string;
  local_nome: string;
  maps_url: string | null;
  adversario: string | null;
  realizado: boolean | null;
  resultado: string | null;
  created_at: string | null;
}
