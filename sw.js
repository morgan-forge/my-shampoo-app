/* global self, caches, fetch */
const CACHE_NAME = 'lather-cache-v3';
const swPath = self.location.pathname;
const BASE =
  swPath.lastIndexOf('/') >= 0 ? swPath.slice(0, swPath.lastIndexOf('/') + 1) : '/';
const ASSETS = [
  BASE,
  `${BASE}index.html`,
  `${BASE}manifest.json`,
  `${BASE}sw.js`,
  `${BASE}icon-192.png`,
  `${BASE}icon-512.png`
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  event.respondWith(caches.match(request).then((cached) => cached || fetch(request)));
});
