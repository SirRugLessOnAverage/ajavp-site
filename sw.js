// AJAVP - Service Worker (PWA)
// Versão do Cache
const CACHE_NAME = 'ajavp-pwa-v1';

// Recursos essenciais para pré-cache (App Shell)
const PRECACHE_ASSETS = [
  '/',
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
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Adiciona ficheiros essenciais (com tolerância a falhas individuais)
      return Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          cache.add(url).catch((err) => console.warn(`[SW] Falha ao pre-carregar ${url}:`, err))
        )
      );
    }).then(() => self.skipWaiting())
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

  // 1. Pedidos de Navegação (Páginas HTML): Estratégia Network First com Fallback para Cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(async () => {
          // Se estiver offline ou sem rede no pavilhão, procurar na cache
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fallback para a página inicial
          return caches.match('/');
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

  // 3. Recursos Estáticos (Imagens, Ícones, Scripts, CDNs externos): Stale-While-Revalidate
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
        .catch(() => {
          // Se falhar e não houver cache, não faz nada
        });

      return cachedResponse || fetchPromise;
    })
  );
});
