/**
 * AJAVP - Sistema de Acessibilidade e Usabilidade Web (A11y)
 * Inspirado nas melhores práticas de projetos open-source do GitHub (WCAG 2.1 / 2.2 AA)
 * e alinhado com o Decreto-Lei n.º 83/2018 (Selo de Usabilidade e Acessibilidade AMA).
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'ajavp_a11y_prefs';

  const defaultPrefs = {
    fontSize: 'normal',   // 'normal', 'medium', 'large'
    dyslexic: false,      // boolean
    spacing: false,       // boolean
    links: false,         // boolean
    contrast: 'normal',   // 'normal', 'high-dark', 'high-light', 'mono'
    motion: 'normal',     // 'normal', 'reduced'
    guide: false,         // boolean
    tts: false            // boolean (Text-to-Speech)
  };

  let currentPrefs = Object.assign({}, defaultPrefs);
  let activeUtterance = null;
  let lastFocusedElement = null;

  // 1. Carregar preferências do utilizador
  function loadPrefs() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        currentPrefs = Object.assign({}, defaultPrefs, JSON.parse(stored));
      }
    } catch (e) {
      console.debug('Erro ao carregar preferências a11y:', e);
    }
  }

  // 2. Guardar preferências
  function savePrefs() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPrefs));
    } catch (e) {
      console.debug('Erro ao guardar preferências a11y:', e);
    }
  }

  // 3. Anunciador para Leitores de Ecrã (ARIA Live Region)
  function announce(message) {
    let announcer = document.getElementById('a11yAnnouncer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'a11yAnnouncer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      document.body.appendChild(announcer);
    }
    announcer.textContent = '';
    setTimeout(function () {
      announcer.textContent = message;
    }, 50);
  }

  // 4. Aplicar estilos e atributos ao <html>
  function applyPrefs(shouldAnnounce) {
    const root = document.documentElement;

    // Tamanho da fonte
    if (currentPrefs.fontSize && currentPrefs.fontSize !== 'normal') {
      root.setAttribute('data-a11y-font', currentPrefs.fontSize);
    } else {
      root.removeAttribute('data-a11y-font');
    }

    // Fonte Dislexia
    if (currentPrefs.dyslexic) {
      root.setAttribute('data-a11y-dyslexic', 'true');
    } else {
      root.removeAttribute('data-a11y-dyslexic');
    }

    // Espaçamento de texto
    if (currentPrefs.spacing) {
      root.setAttribute('data-a11y-spacing', 'true');
    } else {
      root.removeAttribute('data-a11y-spacing');
    }

    // Sublinhar links
    if (currentPrefs.links) {
      root.setAttribute('data-a11y-links', 'true');
    } else {
      root.removeAttribute('data-a11y-links');
    }

    // Alto Contraste
    if (currentPrefs.contrast && currentPrefs.contrast !== 'normal') {
      root.setAttribute('data-a11y-contrast', currentPrefs.contrast);
    } else {
      root.removeAttribute('data-a11y-contrast');
    }

    // Movimento reduzido
    if (currentPrefs.motion === 'reduced') {
      root.setAttribute('data-a11y-motion', 'reduced');
    } else {
      root.removeAttribute('data-a11y-motion');
    }

    // Guia de leitura
    if (currentPrefs.guide) {
      root.setAttribute('data-a11y-guide', 'true');
    } else {
      root.removeAttribute('data-a11y-guide');
    }

    // Text to Speech
    if (currentPrefs.tts) {
      root.setAttribute('data-a11y-tts', 'true');
    } else {
      root.removeAttribute('data-a11y-tts');
      stopSpeaking();
    }

    updateModalUI();

    if (shouldAnnounce) {
      announce('Preferências de acessibilidade atualizadas.');
    }
  }

  // 5. Parar fala ativa do sintetizador
  function stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    document.querySelectorAll('.a11y-speaking').forEach(function (el) {
      el.classList.remove('a11y-speaking');
    });
  }

  // 6. Falar texto (Web Speech API)
  function speakText(element) {
    if (!('speechSynthesis' in window) || !currentPrefs.tts) return;

    stopSpeaking();

    const text = element.innerText || element.textContent;
    if (!text || !text.trim()) return;

    element.classList.add('a11y-speaking');

    const utterance = new SpeechSynthesisUtterance(text.trim());
    utterance.lang = 'pt-PT';
    utterance.rate = 1.0;

    // Tentar selecionar voz portuguesa se disponível
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(function (v) {
      return v.lang.startsWith('pt');
    });
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    utterance.onend = function () {
      element.classList.remove('a11y-speaking');
    };

    utterance.onerror = function () {
      element.classList.remove('a11y-speaking');
    };

    activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  // 7. Atualizar o estado visual dos botões do modal
  function updateModalUI() {
    // Fonte
    document.querySelectorAll('[data-a11y-set-font]').forEach(function (btn) {
      const val = btn.getAttribute('data-a11y-set-font');
      const isActive = currentPrefs.fontSize === val;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      btn.classList.toggle('active', isActive);
    });

    // Dislexia
    const dyslexicBtn = document.getElementById('a11yBtnDyslexic');
    if (dyslexicBtn) {
      dyslexicBtn.setAttribute('aria-pressed', currentPrefs.dyslexic ? 'true' : 'false');
      dyslexicBtn.classList.toggle('active', currentPrefs.dyslexic);
    }

    // Espaçamento
    const spacingBtn = document.getElementById('a11yBtnSpacing');
    if (spacingBtn) {
      spacingBtn.setAttribute('aria-pressed', currentPrefs.spacing ? 'true' : 'false');
      spacingBtn.classList.toggle('active', currentPrefs.spacing);
    }

    // Links
    const linksBtn = document.getElementById('a11yBtnLinks');
    if (linksBtn) {
      linksBtn.setAttribute('aria-pressed', currentPrefs.links ? 'true' : 'false');
      linksBtn.classList.toggle('active', currentPrefs.links);
    }

    // Contraste
    document.querySelectorAll('[data-a11y-set-contrast]').forEach(function (btn) {
      const val = btn.getAttribute('data-a11y-set-contrast');
      const isActive = currentPrefs.contrast === val;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      btn.classList.toggle('active', isActive);
    });

    // Movimento
    const motionBtn = document.getElementById('a11yBtnMotion');
    if (motionBtn) {
      const isReduced = currentPrefs.motion === 'reduced';
      motionBtn.setAttribute('aria-pressed', isReduced ? 'true' : 'false');
      motionBtn.classList.toggle('active', isReduced);
    }

    // Guia de Leitura
    const guideBtn = document.getElementById('a11yBtnGuide');
    if (guideBtn) {
      guideBtn.setAttribute('aria-pressed', currentPrefs.guide ? 'true' : 'false');
      guideBtn.classList.toggle('active', currentPrefs.guide);
    }

    // TTS
    const ttsBtn = document.getElementById('a11yBtnTTS');
    if (ttsBtn) {
      ttsBtn.setAttribute('aria-pressed', currentPrefs.tts ? 'true' : 'false');
      ttsBtn.classList.toggle('active', currentPrefs.tts);
    }
  }

  // 8. Injetar componentes HTML se não existirem
  function injectComponents() {
    // 8.1 Skip Link (Saltar para o Conteúdo)
    if (!document.querySelector('.a11y-skip-link')) {
      const skipLink = document.createElement('a');
      skipLink.href = '#mainContent';
      skipLink.className = 'a11y-skip-link';
      skipLink.textContent = 'Saltar para o conteúdo principal';
      document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // 8.2 Régua de Leitura
    if (!document.getElementById('a11yReadingGuide')) {
      const guide = document.createElement('div');
      guide.id = 'a11yReadingGuide';
      guide.setAttribute('aria-hidden', 'true');
      document.body.appendChild(guide);

      window.addEventListener('mousemove', function (e) {
        if (currentPrefs.guide) {
          guide.style.top = e.clientY + 'px';
        }
      }, { passive: true });

      window.addEventListener('touchmove', function (e) {
        if (currentPrefs.guide && e.touches.length > 0) {
          guide.style.top = e.touches[0].clientY + 'px';
        }
      }, { passive: true });
    }

    // 8.3 Botão Flutuante de Acessibilidade
    if (!document.getElementById('a11yTriggerBtn')) {
      const triggerBtn = document.createElement('button');
      triggerBtn.id = 'a11yTriggerBtn';
      triggerBtn.type = 'button';
      triggerBtn.setAttribute('aria-haspopup', 'dialog');
      triggerBtn.setAttribute('aria-expanded', 'false');
      triggerBtn.setAttribute('aria-controls', 'a11yModal');
      triggerBtn.setAttribute('title', 'Abrir Painel de Acessibilidade (Atalho: Alt + A)');
      triggerBtn.innerHTML = `
        <span class="text-base" aria-hidden="true">♿</span>
        <span class="hidden sm:inline">Acessibilidade</span>
        <span class="text-[10px] px-1.5 py-0.5 rounded bg-white/20 font-mono hidden md:inline">Alt+A</span>
      `;
      document.body.appendChild(triggerBtn);

      triggerBtn.addEventListener('click', function () {
        toggleModal();
      });
    }

    // 8.4 Painel Modal de Acessibilidade
    if (!document.getElementById('a11yModalBackdrop')) {
      const backdrop = document.createElement('div');
      backdrop.id = 'a11yModalBackdrop';
      backdrop.setAttribute('aria-hidden', 'true');

      backdrop.innerHTML = `
        <div id="a11yModal" role="dialog" aria-modal="true" aria-labelledby="a11yModalTitle" aria-describedby="a11yModalDesc">
          <!-- Cabeçalho -->
          <div class="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center font-bold text-lg shadow-sm">
                ♿
              </div>
              <div>
                <h2 id="a11yModalTitle" class="font-heading font-bold text-base sm:text-lg text-brand-navy dark:text-white leading-tight">
                  Acessibilidade &amp; Usabilidade
                </h2>
                <p id="a11yModalDesc" class="text-[11px] text-slate-500 dark:text-slate-400">
                  Normas W3C WCAG 2.1 AA &bull; DL n.º 83/2018
                </p>
              </div>
            </div>
            <button id="a11yCloseBtn" type="button" class="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors" aria-label="Fechar painel de acessibilidade">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- Corpo com opções -->
          <div class="p-5 overflow-y-auto space-y-6 max-h-[70vh]">
            
            <!-- 1. Tamanho do Texto -->
            <div class="space-y-2">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Tamanho do Texto (WCAG 1.4.4)
              </span>
              <div class="grid grid-cols-3 gap-2">
                <button type="button" class="a11y-btn-toggle" data-a11y-set-font="normal" aria-pressed="true">
                  <span>Padrão (100%)</span>
                </button>
                <button type="button" class="a11y-btn-toggle" data-a11y-set-font="medium">
                  <span class="text-base font-bold">A+</span> <span>Médio</span>
                </button>
                <button type="button" class="a11y-btn-toggle" data-a11y-set-font="large">
                  <span class="text-lg font-bold">A++</span> <span>Grande</span>
                </button>
              </div>
            </div>

            <!-- 2. Contraste & Cores -->
            <div class="space-y-2">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Contraste &amp; Cores (WCAG AAA)
              </span>
              <div class="grid grid-cols-2 gap-2">
                <button type="button" class="a11y-btn-toggle" data-a11y-set-contrast="normal">
                  <span>🎨 Cores Oficiais</span>
                </button>
                <button type="button" class="a11y-btn-toggle" data-a11y-set-contrast="high-dark">
                  <span>🌙 Alto Contraste Escuro</span>
                </button>
                <button type="button" class="a11y-btn-toggle" data-a11y-set-contrast="high-light">
                  <span>☀️ Alto Contraste Claro</span>
                </button>
                <button type="button" class="a11y-btn-toggle" data-a11y-set-contrast="mono">
                  <span>⚪ Monocromático</span>
                </button>
              </div>
            </div>

            <!-- 3. Apoio à Leitura & Dislexia -->
            <div class="space-y-2">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Leitura &amp; Tipografia
              </span>
              <div class="grid grid-cols-2 gap-2">
                <button type="button" id="a11yBtnDyslexic" class="a11y-btn-toggle">
                  <span>📖 Fonte Dislexia</span>
                </button>
                <button type="button" id="a11yBtnSpacing" class="a11y-btn-toggle">
                  <span>↔️ Mais Espaçamento</span>
                </button>
                <button type="button" id="a11yBtnLinks" class="a11y-btn-toggle">
                  <span>🔗 Sublinhar Links</span>
                </button>
                <button type="button" id="a11yBtnGuide" class="a11y-btn-toggle">
                  <span>📏 Régua de Leitura</span>
                </button>
              </div>
            </div>

            <!-- 4. Cognição & Multimédia -->
            <div class="space-y-2">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Movimento &amp; Voz
              </span>
              <div class="grid grid-cols-2 gap-2">
                <button type="button" id="a11yBtnMotion" class="a11y-btn-toggle">
                  <span>⏸️ Parar Animações</span>
                </button>
                <button type="button" id="a11yBtnTTS" class="a11y-btn-toggle">
                  <span>🔊 Leitor de Voz (TTS)</span>
                </button>
              </div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 italic">
                * Com o leitor ativado, clica em qualquer texto para ouvir a leitura em voz alta.
              </p>
            </div>

          </div>

          <!-- Rodapé com Ações & Link para Declaração -->
          <div class="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <button id="a11yResetBtn" type="button" class="w-full sm:w-auto px-4 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-bold transition-colors">
              Repor Predefinições
            </button>
            <a href="acessibilidade.html" class="w-full sm:w-auto text-center px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white font-bold transition-colors">
              Declaração de Acessibilidade &rarr;
            </a>
          </div>
        </div>
      `;

      document.body.appendChild(backdrop);

      // Eventos do Modal
      backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) {
          closeModal();
        }
      });

      document.getElementById('a11yCloseBtn').addEventListener('click', closeModal);

      // Botões de Tamanho de Fonte
      backdrop.querySelectorAll('[data-a11y-set-font]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          currentPrefs.fontSize = btn.getAttribute('data-a11y-set-font');
          savePrefs();
          applyPrefs(true);
        });
      });

      // Botões de Contraste
      backdrop.querySelectorAll('[data-a11y-set-contrast]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          currentPrefs.contrast = btn.getAttribute('data-a11y-set-contrast');
          savePrefs();
          applyPrefs(true);
        });
      });

      // Dislexia
      document.getElementById('a11yBtnDyslexic').addEventListener('click', function () {
        currentPrefs.dyslexic = !currentPrefs.dyslexic;
        savePrefs();
        applyPrefs(true);
      });

      // Espaçamento
      document.getElementById('a11yBtnSpacing').addEventListener('click', function () {
        currentPrefs.spacing = !currentPrefs.spacing;
        savePrefs();
        applyPrefs(true);
      });

      // Links
      document.getElementById('a11yBtnLinks').addEventListener('click', function () {
        currentPrefs.links = !currentPrefs.links;
        savePrefs();
        applyPrefs(true);
      });

      // Régua de Leitura
      document.getElementById('a11yBtnGuide').addEventListener('click', function () {
        currentPrefs.guide = !currentPrefs.guide;
        savePrefs();
        applyPrefs(true);
      });

      // Movimento Reduzido
      document.getElementById('a11yBtnMotion').addEventListener('click', function () {
        currentPrefs.motion = currentPrefs.motion === 'reduced' ? 'normal' : 'reduced';
        savePrefs();
        applyPrefs(true);
      });

      // Leitor de Voz (TTS)
      document.getElementById('a11yBtnTTS').addEventListener('click', function () {
        currentPrefs.tts = !currentPrefs.tts;
        savePrefs();
        applyPrefs(true);
      });

      // Repor Tudo
      document.getElementById('a11yResetBtn').addEventListener('click', function () {
        currentPrefs = Object.assign({}, defaultPrefs);
        savePrefs();
        applyPrefs(true);
        announce('Todas as predefinições de acessibilidade foram repostas.');
      });
    }

    // Delegar cliques para botões de cabeçalho / menu se existirem
    document.querySelectorAll('[data-a11y-open], #a11yHeaderBtn, #a11yMobileBtn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });

    // Delegar clique para leitura por voz
    document.body.addEventListener('click', function (e) {
      if (!currentPrefs.tts) return;
      // Não ler se o clique for dentro do modal ou em botões interativos de fechar
      if (e.target.closest('#a11yModal') || e.target.closest('#a11yTriggerBtn')) return;

      const readableTarget = e.target.closest('p, h1, h2, h3, h4, h5, h6, li, blockquote');
      if (readableTarget) {
        speakText(readableTarget);
      }
    });
  }

  // 9. Abrir e Fechar Modal com Gestão de Foco Acessível (Focus Trap)
  function openModal() {
    lastFocusedElement = document.activeElement;
    const backdrop = document.getElementById('a11yModalBackdrop');
    const triggerBtn = document.getElementById('a11yTriggerBtn');
    if (!backdrop) return;

    backdrop.classList.add('a11y-active');
    backdrop.setAttribute('aria-hidden', 'false');
    if (triggerBtn) {
      triggerBtn.setAttribute('aria-expanded', 'true');
    }

    const firstBtn = backdrop.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstBtn) {
      setTimeout(function () {
        firstBtn.focus();
      }, 50);
    }

    announce('Painel de acessibilidade aberto.');
  }

  function closeModal() {
    const backdrop = document.getElementById('a11yModalBackdrop');
    const triggerBtn = document.getElementById('a11yTriggerBtn');
    if (!backdrop) return;

    backdrop.classList.remove('a11y-active');
    backdrop.setAttribute('aria-hidden', 'true');
    if (triggerBtn) {
      triggerBtn.setAttribute('aria-expanded', 'false');
    }

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }

    announce('Painel de acessibilidade fechado.');
  }

  function toggleModal() {
    const backdrop = document.getElementById('a11yModalBackdrop');
    if (backdrop && backdrop.classList.contains('a11y-active')) {
      closeModal();
    } else {
      openModal();
    }
  }

  // 10. Atalhos de Teclado Globais (Alt + A para Acessibilidade & Escape para Fechar)
  window.addEventListener('keydown', function (e) {
    // Escape fecha o modal se estiver aberto
    if (e.key === 'Escape') {
      const backdrop = document.getElementById('a11yModalBackdrop');
      if (backdrop && backdrop.classList.contains('a11y-active')) {
        closeModal();
      }
    }

    // Alt + A (ou Option + A no Mac) abre/fecha o modal
    if (e.altKey && (e.key === 'a' || e.key === 'A' || e.code === 'KeyA')) {
      e.preventDefault();
      toggleModal();
    }

    // Focus trap dentro do modal
    const backdrop = document.getElementById('a11yModalBackdrop');
    if (backdrop && backdrop.classList.contains('a11y-active')) {
      const modal = document.getElementById('a11yModal');
      const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusables.length === 0) return;

      const firstItem = focusables[0];
      const lastItem = focusables[focusables.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstItem) {
            e.preventDefault();
            lastItem.focus();
          }
        } else {
          if (document.activeElement === lastItem) {
            e.preventDefault();
            firstItem.focus();
          }
        }
      }
    }
  });

  // 11. Inicialização
  function init() {
    loadPrefs();
    injectComponents();
    applyPrefs(false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expor API no window para integrações
  window.ajavpA11y = {
    open: openModal,
    close: closeModal,
    toggle: toggleModal,
    getPrefs: function () { return Object.assign({}, currentPrefs); },
    setPref: function (key, value) {
      if (key in currentPrefs) {
        currentPrefs[key] = value;
        savePrefs();
        applyPrefs(true);
      }
    },
    reset: function () {
      currentPrefs = Object.assign({}, defaultPrefs);
      savePrefs();
      applyPrefs(true);
    }
  };
})();
