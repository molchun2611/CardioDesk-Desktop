const STATIC_CACHE = 'cardiodesk-static-v14-nav-hints';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/cardiocalc.html',
  '/iv-drugs-calculator.html',
  '/caprini-calculator.html',
  '/solution-calculator.html',
  '/renal-calculator.html',
  '/ldl-calculator.html',
  '/lipid-therapy-calculator.html',
  '/manifest.webmanifest',
  '/app-icon-64.png',
  '/app-icon-180.png',
  '/app-icon-192.png',
  '/app-icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith('cardiodesk-static-') && key !== STATIC_CACHE)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cached = await caches.match(request) || await caches.match('/') || await caches.match('/index.html');
      const refresh = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, response.clone())).catch(() => {});
          }
          return response;
        })
        .catch(() => null);

      if (cached) {
        event.waitUntil(refresh);
        return cached;
      }

      const network = await refresh;
      return network || Response.error();
    })());
    return;
  }

  const isStatic = /\.(?:html|webmanifest|png)$/i.test(url.pathname);
  if (!isStatic) return;

  event.respondWith((async () => {
    const cached = await caches.match(request);
    const refresh = fetch(request)
      .then((response) => {
        if (response && response.ok) {
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, response.clone())).catch(() => {});
        }
        return response;
      })
      .catch(() => null);

    if (cached) {
      event.waitUntil(refresh);
      return cached;
    }

    return (await refresh) || Response.error();
  })());
});
