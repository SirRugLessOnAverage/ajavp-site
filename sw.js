// AJAVP - Service Worker (PWA)
// Versão do Cache
const CACHE_NAME = 'ajavp-pwa-v6';

// Recursos essenciais para pré-cache (App Shell)
const PRECACHE_ASSETS = [
  '/',
  '/favicon.ico',
  '/index.html',
  '/jif.html',
  '/clube.html',
  '/modalidades.html',
  '/multimedia.html',
  '/contactos.html',
  '/manifest.webmanifest',
  '/manifest.json',
  '/assets/images/logo.png',
  '/assets/images/logo_white.png',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png',
  '/assets/icons/apple-touch-icon.png',
  '/assets/icons/icon-maskable-512.png',
  '/assets/icons/favicon-32.png'
];

// Instalação do Service Worker & Pre-cache
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          cache.add(url).catch((err) => console.warn(`[SW] Falha ao pre-carregar ${url}:`, err))
        )
      );
    })
  );
});

// Ativação e Limpeza de caches antigas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`[SW] A remover cache antiga: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceção de pedidos de rede (Fetch)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar pedidos que não sejam GET ou que venham de extensões
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // 1. Pedidos de Navegação (Páginas HTML) e Scripts/CSS locais: Estratégia Network First
  if (
    request.mode === 'navigate' ||
    url.pathname.startsWith('/assets/js/') ||
    url.pathname.startsWith('/assets/css/')
  ) {
    event.respondWith(
      fetch(request, { cache: 'no-cache' })
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request, { ignoreSearch: true });
          if (cachedResponse) {
            return cachedResponse;
          }
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
        })
    );
    return;
  }

  // 2. Pedidos de API (ex: /api/instagram): Network First com Cache Fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // 3. Recursos Estáticos (Imagens, Ícones, Fontes): Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {});

      return cachedResponse || fetchPromise;
    })
  );
});

// =============================================================
// GESTÃO DE NOTIFICAÇÕES PUSH (WEB PUSH)
// =============================================================
self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: 'AJAVP', body: event.data ? event.data.text() : 'Nova notificação da AJAVP' };
  }

  const title = data.title || 'AJAVP • Convocatória / Alerta';
  const options = {
    body: data.body || 'Tens uma nova informação oficial da AJAVP.',
    icon: '/assets/icons/icon-192.png',
    badge: '/assets/icons/icon-192.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'ajavp-notification',
    renotify: true,
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Se já houver um separador aberto no site, focar nele e navegar
      for (const client of windowClients) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      // Caso contrário, abrir nova janela
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

