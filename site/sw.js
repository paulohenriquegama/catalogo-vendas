// Service worker do Catálogo Pr. Paulo.
// Guarda o site (HTML, CSS, JS, fontes, imagens) para abrir rápido.
// Os CSVs da planilha não passam pelo cache: sempre vão à rede.
const CACHE_VERSION = 'v2';
const CACHE_NAME = `catalogo-${CACHE_VERSION}`;
const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'img/icon-192.png',
  'img/icon-512.png',
  'img/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Planilha (CSV): rede sempre, sem cache.
  if (url.pathname.includes('/data/') || url.pathname.endsWith('.csv')) return;

  // Demais arquivos do site: rede primeiro, cache como reserva (e atualiza o cache).
  event.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then(hit => hit || caches.match('index.html')))
  );
});
