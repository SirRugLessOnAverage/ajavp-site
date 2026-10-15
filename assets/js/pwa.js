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
  const VAPID_PUBLIC_KEY = 'BPzVDb-o6o1Mia1g4etMbzgrsQHS048pfOThK9QzWpt4dShSzGZzxseqwfX7YSpd2VgwEVZIKbNYEYTMrop93QA';

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

  async function subscribeUserToPush() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      alert('O teu navegador não suporta notificações Web Push.');
      return false;
    }

    if (isIOS && !isStandalone) {
      showIOSInstructions();
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        if (permission === 'denied') {
          alert('As notificações estão bloqueadas no teu dispositivo. Para receberes os avisos da AJAVP, vai às definições do navegador/telemóvel e permite as Notificações.');
        }
        return false;
      }

      const registration = await navigator.serviceWorker.ready;
      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY)
        });
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
        throw new Error('Falha ao registar subscrição no servidor');
      }

      localStorage.setItem('ajavp_push_subscribed', 'true');
      updatePushUI(true);
      showPushToast('✓ Avisos ativados com sucesso!');

      // Enviar notificação de teste/boas-vindas imediata no telemóvel
      try {
        if (registration && registration.showNotification) {
          registration.showNotification('AJAVP • Avisos Ativados! 🔔', {
            body: 'O teu dispositivo está pronto para receber avisos de treinos e convocatórias.',
            icon: '/assets/icons/icon-192.png',
            badge: '/assets/icons/icon-192.png',
            vibrate: [200, 100, 200],
            tag: 'ajavp-welcome',
            data: { url: '/' }
          });
        }
      } catch (e) {
        console.warn('Erro ao disparar notificação local:', e);
      }

      return true;
    } catch (err) {
      console.error('[PWA Push] Erro ao subscrever:', err);
      alert('Não foi possível ativar os avisos: ' + (err.message || 'Erro inesperado') + '. Se estiveres em janela anónima, tenta abrir normalmente.');
      return false;
    }
  }

  async function unsubscribeUserFromPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await fetch('/api/push-subscribe', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: subscription.endpoint })
        });
        await subscription.unsubscribe();
      }

      localStorage.removeItem('ajavp_push_subscribed');
      updatePushUI(false);
      showPushToast('Avisos desativados com sucesso.');
      return true;
    } catch (err) {
      console.error('[PWA Push] Erro ao cancelar:', err);
      return false;
    }
  }

  async function checkPushSubscription() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false;
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      const isSubscribed = !!subscription && Notification.permission === 'granted';
      updatePushUI(isSubscribed);
      return isSubscribed;
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
        textSpan.textContent = isSubscribed ? 'Avisos Ativos no Telemóvel (🔔)' : 'Ativar Avisos no Telemóvel';
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
      btn.title = isSubscribed ? 'Avisos Ativos (clica para enviar teste ou desativar)' : 'Ativar Avisos de Treinos e Provas';
    });
  }

  function showPushToast(msg) {
    const toast = document.createElement('div');
    toast.className =
      'fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-2xl text-xs font-bold shadow-2xl bg-slate-900 text-white border border-emerald-500/40 flex items-center gap-2.5 animate-slide-up';
    toast.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
      <span>${msg}</span>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-4');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // Convite discreto para ativar avisos na página inicial
  function showPushInvitationPrompt() {
    const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('index.html') || window.location.pathname === '';
    if (!isHome) return;

    if (localStorage.getItem('ajavp_push_subscribed') === 'true') return;
    if (Notification.permission === 'denied' || Notification.permission === 'granted') return;
    const dismissedTime = localStorage.getItem('ajavp_push_prompt_dismissed');
    if (dismissedTime && Date.now() - parseInt(dismissedTime, 10) < 7 * 24 * 3600 * 1000) return;

    if (document.getElementById('pushInviteBanner')) return;

    const banner = document.createElement('div');
    banner.id = 'pushInviteBanner';
    banner.className =
      'fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-28 sm:max-w-sm z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-amber-400/40 rounded-2xl p-4 shadow-2xl flex flex-col gap-3 animate-slide-up';
    banner.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0 border border-amber-300 dark:border-amber-500/30">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>
          <div>
            <h4 class="font-heading font-black text-sm text-brand-navy dark:text-white leading-tight">Avisos da AJAVP</h4>
            <p class="text-xs text-slate-500 dark:text-slate-300 leading-tight mt-0.5">Recebe avisos oficiais de treinos e convocatórias no telemóvel.</p>
          </div>
        </div>
        <button id="dismissPushInviteBtn" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="flex items-center gap-2 pt-1">
        <button id="acceptPushInviteBtn" class="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-heading font-bold text-xs py-2.5 px-3 rounded-xl shadow-md transition-all text-center cursor-pointer">
          Ativar Avisos
        </button>
        <button id="laterPushInviteBtn" class="px-3 py-2.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-semibold cursor-pointer">
          Mais Tarde
        </button>
      </div>
    `;

    document.body.appendChild(banner);

    const closeBanner = () => {
      banner.classList.add('opacity-0', 'translate-y-4');
      setTimeout(() => banner.remove(), 300);
      localStorage.setItem('ajavp_push_prompt_dismissed', Date.now().toString());
    };

    document.getElementById('dismissPushInviteBtn')?.addEventListener('click', closeBanner);
    document.getElementById('laterPushInviteBtn')?.addEventListener('click', closeBanner);
    document.getElementById('acceptPushInviteBtn')?.addEventListener('click', async () => {
      closeBanner();
      await subscribeUserToPush();
    });
  }

  // Ligar eventos globais
  window.addEventListener('DOMContentLoaded', () => {
    checkPushSubscription();

    document.querySelectorAll('[data-push-toggle]').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const isSubscribed = await checkPushSubscription();
        if (isSubscribed) {
          const action = confirm('Os avisos da AJAVP já estão ativos no teu dispositivo!\n\n• Clica em [OK] para disparar um aviso de teste agora no teu ecrã.\n• Clica em [Cancelar] se pretendes desativar os avisos.');
          if (action) {
            try {
              const reg = await navigator.serviceWorker.ready;
              if (reg && reg.showNotification) {
                reg.showNotification('AJAVP • Teste de Aviso 🔔', {
                  body: 'O teu telemóvel está a receber avisos oficiais da AJAVP com sucesso!',
                  icon: '/assets/icons/icon-192.png',
                  badge: '/assets/icons/icon-192.png',
                  vibrate: [200, 100, 200],
                  tag: 'ajavp-test',
                  data: { url: '/' }
                });
                showPushToast('✓ Aviso de teste enviado para o teu ecrã!');
              }
            } catch (err) {
              console.error(err);
            }
          } else {
            if (confirm('Tens a certeza que queres desativar os avisos da AJAVP?')) {
              await unsubscribeUserFromPush();
            }
          }
        } else {
          await subscribeUserToPush();
        }
      });
    });

    // Se o utilizador ainda não subscreveu, convite discreto na homepage após 6 segundos
    setTimeout(showPushInvitationPrompt, 6000);
  });

  // Exportar para controlo global se necessário
  window.AJAVP_PWA = {
    subscribePush: subscribeUserToPush,
    unsubscribePush: unsubscribeUserFromPush,
    checkPush: checkPushSubscription
  };
})();

