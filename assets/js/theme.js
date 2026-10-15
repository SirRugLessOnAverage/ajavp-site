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
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
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

    // Escutar alterações do SO caso o utilizador não tenha preferência gravada
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
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
})();
