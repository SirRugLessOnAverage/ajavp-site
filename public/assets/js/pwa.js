/**
 * AJAVP - PWA Helper, Service Worker & Web Push Notification Manager (v4)
 * Gere o registo do Service Worker, prompts de instalação (Android/Desktop/iOS)
 * e ativação de Avisos Oficiais de Treinos e Provas no telemóvel.
 */

(function () {
  'use strict';

  // Helper para executar código assim que o DOM estiver pronto (mesmo que o script carregue no fim do body)
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  // 1. Registar Service Worker imediatamente e forçar verificação de atualização
  let swRegistrationPromise = null;

  function ensureServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      return Promise.reject(new Error('Service Worker não suportado neste navegador.'));
    }
    if (!swRegistrationPromise) {
      swRegistrationPromise = navigator.serviceWorker
        .register('/sw.js', { updateViaCache: 'none' })
        .then((registration) => {
          // Verificar atualizações do Service Worker
          registration.update().catch(() => {});
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
          return registration;
        })
        .catch((error) => {
          console.warn('[PWA] Falha ao registar o Service Worker:', error);
          swRegistrationPromise = null;
          throw error;
        });
    }
    return swRegistrationPromise;
  }

  // Iniciar registo logo no arranque
  if ('serviceWorker' in navigator) {
    ensureServiceWorker().catch(() => {});
  }

  // Obter ServiceWorkerRegistration ativa com timeout de segurança (nunca bloqueia indefinidamente no Android)
  async function getActiveServiceWorker() {
    await ensureServiceWorker();

    // Tentar obter via navigator.serviceWorker.ready com timeout de 6 segundos
    const readyWithTimeout = Promise.race([
      navigator.serviceWorker.ready,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Tempo limite excedido ao ativar o Service Worker.')), 6000)
      )
    ]);

    try {
      return await readyWithTimeout;
    } catch (e) {
      // Fallback: procurar registo diretamente
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg && (reg.active || reg.waiting || reg.installing)) {
        const worker = reg.active || reg.waiting || reg.installing;
        if (worker.state !== 'activated') {
          await new Promise((resolve) => {
            const checkState = () => {
              if (worker.state === 'activated') {
                worker.removeEventListener('statechange', checkState);
                resolve();
              }
            };
            worker.addEventListener('statechange', checkState);
            setTimeout(resolve, 3000);
          });
        }
        return reg;
      }
      throw e;
    }
  }

  // 2. Detetar se já está a correr como App Instalada (Standalone Mode)
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  if (isStandalone) {
    console.log('[PWA] A correr em modo aplicação instalada (Standalone).');
    onReady(() => {
      document.querySelectorAll('[data-pwa-install], #pwaInstallDrawerBtn').forEach((el) => {
        el.style.display = 'none';
      });
    });
  }

  // 3. Gestão do Evento de Instalação (beforeinstallprompt - Android/Chrome/Edge)
  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const dismissedTime = localStorage.getItem('ajavp_pwa_dismissed');
    if (dismissedTime && Date.now() - parseInt(dismissedTime, 10) < 48 * 3600 * 1000) {
      return;
    }

    showPwaBanner();
  });

  window.addEventListener('appinstalled', () => {
    console.log('[PWA] Aplicação AJAVP instalada com sucesso!');
    hidePwaBanner();
    deferredPrompt = null;
  });

  // 4. Detetar iOS (iPhone / iPad)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // Ligar botões de instalação da App
  onReady(() => {
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
          showPushToast('Abre o menu do navegador (⋮) e escolhe "Instalar aplicação" ou "Adicionar ao ecrã principal".');
        }
      });
    });
  });

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
            <p class="text-xs text-slate-500 dark:text-slate-300 leading-tight mt-0.5">Acesso rápido a resultados e avisos no telemóvel.</p>
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
          Para receberes notificações da AJAVP no iPhone, instala primeiro a aplicação no Ecrã Principal:
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

  // 8. Indicador Visual de Ligação de Rede (Online / Offline)
  function showNetworkStatus(isOnline) {
    let indicator = document.getElementById('pwaNetworkStatus');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'pwaNetworkStatus';
      indicator.className =
        'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-full text-xs font-bold shadow-lg transition-all duration-300 flex items-center gap-2 pointer-events-none';
      document.body.appendChild(indicator);
    }

    if (!isOnline) {
      indicator.className =
        'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-full text-xs font-bold shadow-xl transition-all duration-300 flex items-center gap-2 bg-amber-500 text-slate-950 border border-amber-300';
      indicator.innerHTML = `
        <span class="w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>
        <span>Modo Offline &bull; A usar dados guardados em cache</span>
      `;
      indicator.style.opacity = '1';
      indicator.style.transform = 'translate(-50%, 0)';
    } else {
      indicator.className =
        'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-full text-xs font-bold shadow-xl transition-all duration-300 flex items-center gap-2 bg-emerald-600 text-white border border-emerald-400';
      indicator.innerHTML = `
        <span>✓ Ligação restabelecida &bull; Online</span>
      `;
      indicator.style.opacity = '1';
      indicator.style.transform = 'translate(-50%, 0)';
      setTimeout(() => {
        indicator.style.opacity = '0';
        indicator.style.transform = 'translate(-50%, -20px)';
      }, 3500);
    }
  }

  window.addEventListener('offline', () => showNetworkStatus(false));
  window.addEventListener('online', () => showNetworkStatus(true));

  // =============================================================
  // 9. GESTÃO DE NOTIFICAÇÕES WEB PUSH (INSCRIÇÃO DE ASSOCIADOS)
  // =============================================================
  const VAPID_PUBLIC_KEY = 'BCy3mMCELwBoDIU1Vm4dhGpqnQ3wMthMmhV8qZXUE6r-NeXnyNoiMcAM8Vokqm3aWeZp4O87vbRVFi0fL2PNXZo';
  const VAPID_VERSION = 'v5';

  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function setButtonsLoadingState(isLoading) {
    document.querySelectorAll('[data-push-toggle]').forEach((btn) => {
      const textSpan = btn.querySelector('.push-btn-text');
      if (isLoading) {
        btn.disabled = true;
        btn.style.opacity = '0.8';
        if (textSpan) textSpan.textContent = '⏳ A ativar avisos...';
      } else {
        btn.disabled = false;
        btn.style.opacity = '1';
      }
    });
  }

  async function triggerLocalTestNotification(registration, title, body) {
    try {
      if (registration && registration.showNotification) {
        await registration.showNotification(title, {
          body: body,
          icon: '/assets/icons/icon-192.png',
          badge: '/assets/icons/icon-192.png',
          vibrate: [200, 100, 200],
          tag: 'ajavp-notice-' + Date.now(),
          data: { url: '/' }
        });
        return true;
      }
    } catch (e) {
      console.warn('Fallback Notification API:', e);
    }
    try {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
          body: body,
          icon: '/assets/icons/icon-192.png'
        });
        return true;
      }
    } catch (e2) {
      console.warn('Erro ao mostrar notificação local:', e2);
    }
    return false;
  }

  async function subscribeUserToPush() {
    if (isIOS && !isStandalone) {
      showIOSInstructions();
      return false;
    }

    if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
      showPushToast('⚠️ O teu navegador não suporta notificações Web Push. Instala a app no Chrome (Android) ou Safari (iOS).');
      return false;
    }

    setButtonsLoadingState(true);

    try {
      // IMPORTANTE: Pedir permissão IMEDIATAMENTE dentro do gesto de toque do utilizador
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setButtonsLoadingState(false);
        updatePushUI(false);
        if (permission === 'denied') {
          showPushBlockedModal();
        } else {
          showPushToast('Permissão de notificações não concedida.');
        }
        return false;
      }

      const registration = await getActiveServiceWorker();
      let subscription = await registration.pushManager.getSubscription();

      // Se existir uma subscrição antiga com chave VAPID anterior, renovar automaticamente
      if (subscription && localStorage.getItem('ajavp_vapid_version') !== VAPID_VERSION) {
        try {
          await subscription.unsubscribe();
        } catch (unsubErr) {
          console.warn('[PWA Push] A limpar subscrição antiga:', unsubErr);
        }
        subscription = null;
      }

      if (!subscription) {
        try {
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY)
          });
        } catch (subErr) {
          // Caso haja conflito de applicationServerKey anterior, limpar e tentar novamente
          const existing = await registration.pushManager.getSubscription();
          if (existing) {
            await existing.unsubscribe();
          }
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY)
          });
        }
      }

      const subData = subscription.toJSON();

      const response = await fetch('/api/push-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: subData.endpoint,
          keys: subData.keys,
          userAgent: navigator.userAgent
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Falha ao registar subscrição no servidor');
      }

      localStorage.setItem('ajavp_push_subscribed', 'true');
      localStorage.setItem('ajavp_vapid_version', VAPID_VERSION);

      setButtonsLoadingState(false);
      updatePushUI(true);
      showPushToast('✓ Avisos de Treinos e Provas ativados no telemóvel!');

      // Disparar notificação imediata de confirmação no telemóvel
      await triggerLocalTestNotification(
        registration,
        'AJAVP • Avisos Ativados! 🔔',
        'O teu telemóvel já está pronto para receber avisos de treinos e convocatórias da AJAVP.'
      );

      return true;
    } catch (err) {
      console.error('[PWA Push] Erro ao subscrever:', err);
      setButtonsLoadingState(false);
      updatePushUI(false);
      showPushToast('⚠️ Erro ao ativar: ' + (err.message || 'Tenta novamente.'));
      return false;
    }
  }

  async function unsubscribeUserFromPush() {
    try {
      const registration = await getActiveServiceWorker();
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await fetch('/api/push-subscribe', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: subscription.endpoint })
        }).catch(() => {});
        await subscription.unsubscribe();
      }

      localStorage.removeItem('ajavp_push_subscribed');
      updatePushUI(false);
      showPushToast('Avisos desativados neste dispositivo.');
      return true;
    } catch (err) {
      console.error('[PWA Push] Erro ao cancelar:', err);
      return false;
    }
  }

  async function checkPushSubscription() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
      return false;
    }
    try {
      const registration = await getActiveServiceWorker();
      const subscription = await registration.pushManager.getSubscription();
      const isValidVersion = localStorage.getItem('ajavp_vapid_version') === VAPID_VERSION;

      if (subscription && Notification.permission === 'granted') {
        if (!isValidVersion) {
          // Atualizar silenciosamente a subscrição para a nova chave VAPID e sincronizar com o Supabase
          return await subscribeUserToPush();
        }
        // Garantir que está sincronizado na base de dados
        const subData = subscription.toJSON();
        fetch('/api/push-subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            endpoint: subData.endpoint,
            keys: subData.keys,
            userAgent: navigator.userAgent
          })
        }).catch(() => {});

        localStorage.setItem('ajavp_push_subscribed', 'true');
        updatePushUI(true);
        return true;
      }

      localStorage.removeItem('ajavp_push_subscribed');
      updatePushUI(false);
      return false;
    } catch {
      return false;
    }
  }

  function updatePushUI(isSubscribed) {
    document.querySelectorAll('[data-push-toggle]').forEach((btn) => {
      const textSpan = btn.querySelector('.push-btn-text');
      const badge = btn.querySelector('.push-btn-badge');
      const icon = btn.querySelector('svg, i');
      if (textSpan) {
        textSpan.textContent = isSubscribed ? '✓ Avisos Ativos no Telemóvel (🔔)' : 'Ativar Avisos no Telemóvel';
      }
      if (badge) {
        badge.textContent = isSubscribed ? 'Ativo' : 'Avisos';
        badge.className = isSubscribed
          ? 'text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-600 text-white'
          : 'text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-500 text-slate-950';
      }
      if (icon) {
        if (isSubscribed) {
          icon.classList.remove('text-amber-500');
          icon.classList.add('text-emerald-500');
        } else {
          icon.classList.remove('text-emerald-500');
          icon.classList.add('text-amber-500');
        }
      }
      if (isSubscribed) {
        btn.classList.add('is-active', '!bg-emerald-600', '!text-white', '!border-emerald-500');
      } else {
        btn.classList.remove('is-active', '!bg-emerald-600', '!text-white', '!border-emerald-500');
      }
      btn.title = isSubscribed ? 'Avisos Ativos (toca para testar ou gerir)' : 'Ativar Avisos de Treinos e Provas';
    });
  }

  function showPushToast(msg) {
    const existing = document.getElementById('ajavpPushToast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'ajavpPushToast';
    toast.className =
      'fixed bottom-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-50 px-4 py-3.5 rounded-2xl text-xs font-bold shadow-2xl bg-slate-900 text-white border border-emerald-500/50 flex items-center justify-center gap-2.5 animate-slide-up';
    toast.innerHTML = `
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0"></span>
      <span>${msg}</span>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-4');
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  // Modal amigável quando os avisos já estão ativos (substitui confirm() nativo que pode falhar em PWAs Android)
  function showActivePushModal() {
    const existing = document.getElementById('ajavpActivePushModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'ajavpActivePushModal';
    modal.className = 'fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4';
    modal.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 space-y-4 border border-emerald-500/30 shadow-2xl animate-slide-up">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <span class="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center text-lg font-bold">🔔</span>
            <div>
              <h3 class="font-heading font-black text-base text-slate-900 dark:text-white">Avisos Ativos!</h3>
              <p class="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">O teu telemóvel está ligado à AJAVP</p>
            </div>
          </div>
          <button id="closeActivePushModal" class="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg cursor-pointer">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Receberás notificações oficiais sobre alterações de treinos e convocatórias para os JIF.
        </p>
        <div class="space-y-2.5 pt-1">
          <button id="testPushNowBtn" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2">
            <span>🔔 Enviar Notificação de Teste Agora</span>
          </button>
          <button id="disablePushNowBtn" class="w-full bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/40 text-slate-600 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-400 font-heading font-semibold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer">
            Desativar Avisos neste Dispositivo
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const close = () => modal.remove();
    document.getElementById('closeActivePushModal').addEventListener('click', close);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });

    document.getElementById('testPushNowBtn').addEventListener('click', async () => {
      close();
      const reg = await getActiveServiceWorker().catch(() => null);
      await triggerLocalTestNotification(
        reg,
        'AJAVP • Teste de Aviso 🔔',
        'Tudo a funcionar! O teu telemóvel recebe os avisos oficiais da AJAVP.'
      );
      showPushToast('✓ Notificação de teste enviada para o teu ecrã!');
    });

    document.getElementById('disablePushNowBtn').addEventListener('click', async () => {
      close();
      await unsubscribeUserFromPush();
    });
  }

  // Modal explicativo caso as notificações estejam bloqueadas nas definições do Android/Navegador
  function showPushBlockedModal() {
    const existing = document.getElementById('ajavpBlockedPushModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'ajavpBlockedPushModal';
    modal.className = 'fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4';
    modal.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 space-y-4 border border-amber-500/30 shadow-2xl animate-slide-up">
        <div class="flex items-center justify-between">
          <h3 class="font-heading font-black text-base text-slate-900 dark:text-white">Permissão Necessária 🔔</h3>
          <button id="closeBlockedPushModal" class="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg cursor-pointer">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          As notificações estão desativadas nas definições da aplicação ou navegador. Para ativares no Android:
        </p>
        <div class="space-y-2 text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/5">
          <p>1. Mantém premido o ícone da app <strong>AJAVP</strong> no telemóvel (ou toca no cadeado 🔒 na barra de endereço).</p>
          <p>2. Entra em <strong>Informações da aplicação &rarr; Notificações</strong>.</p>
          <p>3. Ativa a opção <strong>Permitir notificações</strong> e volta a tocar no botão.</p>
        </div>
        <button id="okBlockedPushModal" class="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-heading font-bold text-xs py-3 rounded-xl transition-all shadow-md cursor-pointer">
          Compreendi
        </button>
      </div>
    `;
    document.body.appendChild(modal);
    const close = () => modal.remove();
    document.getElementById('closeBlockedPushModal').addEventListener('click', close);
    document.getElementById('okBlockedPushModal').addEventListener('click', close);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
  }

  // Delegação global de cliques para qualquer botão [data-push-toggle] (funciona imediatamente em qualquer altura)
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-push-toggle]');
    if (!btn) return;

    e.preventDefault();

    // Se já estiver marcado como ativo, abrir modal de teste/gestão
    if (btn.classList.contains('is-active')) {
      showActivePushModal();
      return;
    }

    // Caso contrário, iniciar subscrição imediatamente (preservando o user gesture no Android/iOS)
    await subscribeUserToPush();
  });

  // Inicializar estado visual assim que o DOM estiver pronto
  onReady(() => {
    checkPushSubscription();
  });

  // Exportar para controlo global
  window.AJAVP_PWA = {
    subscribePush: subscribeUserToPush,
    unsubscribePush: unsubscribeUserFromPush,
    checkPush: checkPushSubscription
  };
})();
