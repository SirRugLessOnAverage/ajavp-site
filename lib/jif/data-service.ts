import { supabasePublic } from '@/lib/supabase/public';
import { FUTSAL_DATA, type FutsalHubData } from '@/data/jif/futsal';
import { JIF_CLASSIFICACAO, type JifParishRanking } from '@/data/jif/classificacao';
import { JIF_CIRCULARS, type JifCircular } from '@/data/jif/comunicados';

/**
 * Obtém os dados de Futsal mais recentes.
 * Prioridade 1: Tabela partilhada `site_jif_dados` no Supabase (atualizada via Gemini IA na Direção).
 * Fallback: Ficheiro estático de contingência `data/jif-futsal.json`.
 */
export async function obterDadosFutsal(): Promise<FutsalHubData> {
  try {
    const { data, error } = await supabasePublic
      .from('site_jif_dados')
      .select('dados')
      .eq('tipo', 'futsal')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data?.dados && typeof data.dados === 'object') {
      const payload = data.dados as unknown as Record<string, unknown>;
      // Se tiver a estrutura esperada de FutsalHubData, utiliza-a
      if (payload.jornadaAtiva && payload.classificacoes) {
        return payload as unknown as FutsalHubData;
      }
    }
  } catch (err) {
    console.warn('Aviso: Leitura dinâmica de futsal indisponível, a usar fallback estático.', err);
  }

  return FUTSAL_DATA;
}

/**
 * Obtém a Classificação Geral Virtual mais recente dos JIF.
 * Prioridade 1: Tabela partilhada `site_jif_dados` no Supabase.
 * Fallback: Ficheiro estático de contingência `data/jif/classificacao.ts`.
 */
export async function obterDadosClassificacao(): Promise<JifParishRanking[]> {
  try {
    const { data, error } = await supabasePublic
      .from('site_jif_dados')
      .select('dados')
      .eq('tipo', 'classificacao_virtual')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data?.dados) {
      const payload = data.dados as unknown as Record<string, unknown>;
      if (Array.isArray(payload)) {
        return payload as unknown as JifParishRanking[];
      }
      if (Array.isArray(payload.classificacao)) {
        return payload.classificacao as unknown as JifParishRanking[];
      }
    }
  } catch (err) {
    console.warn('Aviso: Leitura dinâmica da classificação indisponível, a usar fallback estático.', err);
  }

  return JIF_CLASSIFICACAO;
}

/**
 * Obtém os Comunicados Oficiais mais recentes.
 * Prioridade 1: Tabela partilhada `site_jif_dados` no Supabase.
 * Fallback: Ficheiro estático de contingência `data/jif/comunicados.ts`.
 */
export async function obterDadosComunicados(): Promise<JifCircular[]> {
  try {
    const { data, error } = await supabasePublic
      .from('site_jif_dados')
      .select('dados')
      .eq('tipo', 'comunicados')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data?.dados) {
      const payload = data.dados as unknown as Record<string, unknown>;
      if (Array.isArray(payload)) {
        return payload as unknown as JifCircular[];
      }
      if (Array.isArray(payload.circulares)) {
        return payload.circulares as unknown as JifCircular[];
      }
    }
  } catch (err) {
    console.warn('Aviso: Leitura dinâmica de comunicados indisponível, a usar fallback estático.', err);
  }

  return JIF_CIRCULARS;
}
