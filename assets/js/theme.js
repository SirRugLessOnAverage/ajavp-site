/**
 * AJAVP - Sistema de Gestão de Tema (Modo Claro / Modo Escuro)
 * Suporta persistência em localStorage, preferência de sistema (prefers-color-scheme)
 * e sincronização instantânea em todos os botões de alternância.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark') {
      return 'dark';
    }
    // Por padrão absoluto, o site apresenta-se em White Mode (tons claros)
    return 'light';
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Atualizar labels e tooltips
    const buttons = document.querySelectorAll('[data-theme-toggle], #themeToggleBtn, #themeToggleBtnMobile, #themeToggleBtnDrawer');
    buttons.forEach((btn) => {
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      btn.setAttribute(
        'title',
        isDark ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'
      );
    });

    // Atualizar badges de estado se existirem
    const badgeClaro = document.querySelectorAll('.theme-badge-claro');
    const badgeEscuro = document.querySelectorAll('.theme-badge-escuro');
    badgeClaro.forEach((el) => {
      el.style.display = isDark ? 'none' : 'inline-flex';
    });
    badgeEscuro.forEach((el) => {
      el.style.display = isDark ? 'inline-flex' : 'none';
    });

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    // Disparar evento para componentes que precisem de redesenho (gráficos, mapas, etc.)
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  }

  // Inicializar quando o DOM estiver pronto
  function initTheme() {
    const theme = getPreferredTheme();
    applyTheme(theme);

    // Delegar eventos de clique para qualquer botão de alternância
    document.addEventListener('click', function (e) {
      const toggle = e.target.closest('[data-theme-toggle], #themeToggleBtn, #themeToggleBtnMobile, #themeToggleBtnDrawer');
      if (toggle) {
        e.preventDefault();
        toggleTheme();
      }
    });

    // Inicialização concluída com sucesso
  }

  // Executa imediatamente para garantir integridade
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  // Expor no window para debug e chamadas externas se necessário
  window.ajavpTheme = {
    get: getPreferredTheme,
    set: function (t) {
      localStorage.setItem(STORAGE_KEY, t);
      applyTheme(t);
    },
    toggle: toggleTheme,
  };

  // Detetar e Proteger Ambiente de Testes / Preview (Develop)
  function setupPreviewEnvironment() {
    const host = window.location.hostname;
    const isProduction = host === 'ajavp.vercel.app' || host === 'ajavp.pt' || host === 'www.ajavp.pt';

    if (!isProduction) {
      // 1. Garantir que robôs e aranhas nunca indexam o preview
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.name = 'robots';
        document.head.appendChild(metaRobots);
      }
      metaRobots.content = 'noindex, nofollow, noarchive, nosnippet';

      // 2. Apresentar badge discreto de Ambiente de Testes no canto inferior
      if (!document.getElementById('ajavpDevBadge')) {
        const badge = document.createElement('div');
        badge.id = 'ajavpDevBadge';
        badge.className = 'fixed bottom-3 left-3 z-50 px-3 py-1.5 rounded-full bg-amber-500/95 text-slate-950 font-bold text-[10px] shadow-2xl backdrop-blur-md border border-amber-300 flex items-center gap-1.5 select-none pointer-events-none tracking-wide';
        badge.innerHTML = `
          <span class="w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>
          <span>🛠️ Modo Teste (Develop)</span>
        `;
        document.body.appendChild(badge);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPreviewEnvironment);
  } else {
    setupPreviewEnvironment();
  }
})();
