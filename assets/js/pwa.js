/**
 * AJAVP - PWA Helper & Installation Manager
 * Gere o registo do Service Worker, prompts de instalação (Android/Desktop)
 * e instruções para utilizadores iOS / Safari.
 */

(function () {
  'use strict';

  // 1. Registar Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          // Atualizações automáticas de versão do Service Worker
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('[PWA] Nova versão disponível da aplicação.');
                }
              };
            }
          };
        })
        .catch((error) => {
          console.warn('[PWA] Falha ao registar o Service Worker:', error);
        });
    });
  }

  // 2. Detetar se já está a correr como App Instalada (Standalone Mode)
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  if (isStandalone) {
    console.log('[PWA] A correr em modo aplicação instalada (Standalone).');
    // Esconder botões de instalação se a app já estiver instalada
    window.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('[data-pwa-install], #pwaInstallDrawerBtn').forEach((el) => {
        el.style.display = 'none';
      });
    });
    return;
  }

  // Ligar botões estáticos no menu drawer ou páginas
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-pwa-install], #pwaInstallDrawerBtn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('[PWA] Utilizador aceitou instalação via botão.');
            }
            deferredPrompt = null;
            hidePwaBanner();
          });
        } else if (isIOS) {
          showIOSInstructions();
        } else {
          // No Android/Desktop quando o prompt já foi usado ou o browser é Firefox/Safari desktop
          alert('Para instalar a app AJAVP, abre o menu do teu navegador e escolhe "Instalar aplicação" ou "Adicionar ao ecrã principal".');
        }
      });
    });
  });

  // 3. Gestão do Evento de Instalação (beforeinstallprompt - Android/Chrome/Edge)
  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    // Impedir que o browser mostre a mini-infobar padrão
    e.preventDefault();
    deferredPrompt = e;

    // Verificar se o utilizador já descartou o banner recentemente (ex: nas últimas 48h)
    const dismissedTime = localStorage.getItem('ajavp_pwa_dismissed');
    if (dismissedTime && Date.now() - parseInt(dismissedTime, 10) < 48 * 3600 * 1000) {
      return;
    }

    showPwaBanner();
  });

  // Notificar quando a app for instalada com sucesso
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] Aplicação AJAVP instalada com sucesso!');
    hidePwaBanner();
    deferredPrompt = null;
  });

  // 4. Detetar iOS (iPhone / iPad)
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // 5. Criar e Exibir Banner de Instalação
  function showPwaBanner() {
    if (document.getElementById('pwaInstallBanner')) return;

    const banner = document.createElement('div');
    banner.id = 'pwaInstallBanner';
    banner.className =
      'fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-24 sm:max-w-sm z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-4 shadow-2xl transition-all transform duration-300 animate-slide-up flex flex-col gap-3';

    banner.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-3">
          <img src="/assets/icons/icon-192.png" alt="AJAVP" class="w-11 h-11 rounded-xl shadow-md flex-shrink-0 object-contain p-0.5 bg-white border border-slate-100">
          <div>
            <h4 class="font-heading font-black text-sm text-brand-navy dark:text-white leading-tight">Instalar App AJAVP</h4>
            <p class="text-xs text-slate-500 dark:text-slate-300 leading-tight mt-0.5">Acesso rápido a resultados e treinos no telemóvel.</p>
          </div>
        </div>
        <button id="pwaDismissBtn" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg cursor-pointer" aria-label="Fechar">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="flex items-center gap-2 pt-1">
        <button id="pwaActionBtn" class="flex-1 bg-gradient-to-r from-brand-green to-emerald-600 hover:from-emerald-700 hover:to-emerald-800 text-white font-heading font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
          <span>Instalar Agora</span>
        </button>
      </div>
    `;

    document.body.appendChild(banner);

    // Eventos
    document.getElementById('pwaDismissBtn').addEventListener('click', () => {
      hidePwaBanner();
      localStorage.setItem('ajavp_pwa_dismissed', Date.now().toString());
    });

    document.getElementById('pwaActionBtn').addEventListener('click', () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('[PWA] Utilizador aceitou a instalação.');
          }
          deferredPrompt = null;
          hidePwaBanner();
        });
      } else if (isIOS) {
        showIOSInstructions();
      }
    });
  }

  function hidePwaBanner() {
    const banner = document.getElementById('pwaInstallBanner');
    if (banner) {
      banner.classList.add('opacity-0', 'translate-y-4');
      setTimeout(() => banner.remove(), 300);
    }
  }

  // 6. Modal de Instruções para iOS (Safari)
  function showIOSInstructions() {
    hidePwaBanner();
    if (document.getElementById('pwaIOSModal')) return;

    const modal = document.createElement('div');
    modal.id = 'pwaIOSModal';
    modal.className =
      'fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4';

    modal.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 space-y-4 border border-slate-100 dark:border-white/10 shadow-2xl animate-slide-up">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <img src="/assets/icons/icon-192.png" alt="AJAVP" class="w-10 h-10 rounded-xl shadow-md bg-white p-0.5">
            <h3 class="font-heading font-black text-base text-slate-900 dark:text-white">Instalar no iPhone</h3>
          </div>
          <button id="closeIOSModalBtn" class="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        
        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Para teres a app da AJAVP no ecrã de início do teu iPhone, segue estes 2 passos simples:
        </p>

        <div class="space-y-3 text-xs text-slate-700 dark:text-slate-200">
          <div class="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5">
            <span class="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">1</span>
            <span>Toca no botão de <strong>Partilhar</strong> na barra inferior do Safari (ícone <svg class="w-4 h-4 inline text-blue-500 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>).</span>
          </div>

          <div class="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5">
            <span class="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">2</span>
            <span>Desce na lista e escolhe <strong>"Adicionar ao Ecrã Principal"</strong> (+).</span>
          </div>
        </div>

        <button id="okIOSModalBtn" class="w-full bg-brand-green hover:bg-emerald-700 text-white font-heading font-bold text-xs py-3 rounded-xl transition-all shadow-md">
          Compreendi
        </button>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => modal.remove();
    document.getElementById('closeIOSModalBtn').addEventListener('click', closeModal);
    document.getElementById('okIOSModalBtn').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // 7. Se for utilizador iOS que ainda não instalou, mostrar o banner após 5 segundos
  if (isIOS && !isStandalone) {
    const dismissedTime = localStorage.getItem('ajavp_pwa_dismissed');
    if (!dismissedTime || Date.now() - parseInt(dismissedTime, 10) > 48 * 3600 * 1000) {
      setTimeout(() => {
        showPwaBanner();
      }, 5000);
    }
  }
})();
