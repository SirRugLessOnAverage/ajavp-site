/**
 * site-data.js
 * Módulo de Integração Dinâmica com Supabase REST API (Site Público AJAVP)
 * Carrega notícias publicadas e próximos eventos oficiais com fallback gracioso para PWA/Offline.
 */

(function (window) {
  'use strict';

  const SUPABASE_CONFIG = {
    url: 'https://mudgnaajtolytggksvvq.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11ZGduYWFqdG9seXRnZ2tzdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNjAxODcsImV4cCI6MjEwNzYzNjE4N30.lL5jb84u0PUWH4BjQWdZ4uZLpGKybUuhGISGB9tvdIQ'
  };

  const AjavpSiteData = {
    config: SUPABASE_CONFIG,

    /**
     * Executa pedido à REST API com timeout e headers seguros
     */
    async query(endpoint, params = {}) {
      const url = new URL(`${this.config.url}/rest/v1/${endpoint}`);
      Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      try {
        const response = await fetch(url.toString(), {
          headers: {
            'apikey': this.config.anonKey,
            'Authorization': `Bearer ${this.config.anonKey}`,
            'Accept': 'application/json'
          },
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        if (!response.ok) throw new Error(`Supabase error: ${response.status}`);
        return await response.json();
      } catch (err) {
        clearTimeout(timeoutId);
        console.debug(`[AjavpSiteData] Fallback ativado para ${endpoint}:`, err.message);
        return null;
      }
    },

    /**
     * Obtém as notícias públicas mais recentes
     */
    async getNoticias(limit = 3) {
      return await this.query('site_noticias', {
        publicado: 'eq.true',
        order: 'publicado_em.desc',
        limit: String(limit)
      });
    },

    /**
     * Obtém os próximos eventos desportivos agendados
     */
    async getProximosEventos(limit = 4) {
      return await this.query('site_eventos', {
        realizado: 'eq.false',
        order: 'data_hora.asc',
        limit: String(limit)
      });
    },

    /**
     * Injeta avisos e notícias dinâmicas na Homepage se existirem dados no Supabase
     */
    async initHomepage() {
      const newsContainer = document.getElementById('supabaseNewsNotice');
      if (!newsContainer) return;

      const noticias = await this.getNoticias(2);
      if (!noticias || noticias.length === 0) return;

      const n = noticias[0];
      const dataFormatada = n.publicado_em 
        ? new Date(n.publicado_em).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' })
        : 'Recente';

      newsContainer.innerHTML = `
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 text-white border border-emerald-500/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i data-lucide="newspaper" class="w-5 h-5"></i>
            </div>
            <div class="space-y-0.5">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[9px] uppercase tracking-wider">Comunicado Oficial</span>
                <span class="text-[11px] text-emerald-300 font-semibold">${dataFormatada}</span>
              </div>
              <h4 class="font-heading font-black text-sm sm:text-base text-white">
                ${n.titulo}
              </h4>
              <p class="text-xs text-slate-300 line-clamp-2 max-w-3xl">
                ${n.resumo || ''}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0 w-full md:w-auto justify-end">
            <a href="/jif#resumo-atividades" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xs transition-colors">
              <span>Ler Comunicado</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        </div>
      `;
      newsContainer.classList.remove('hidden');
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }
  };

  window.AjavpSiteData = AjavpSiteData;

  // Inicialização automática quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AjavpSiteData.initHomepage());
  } else {
    AjavpSiteData.initHomepage();
  }
})(window);
