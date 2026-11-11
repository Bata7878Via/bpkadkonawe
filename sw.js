/**
 * Service Worker: SI-MEPOKOASO BPKAD KONAWE
 * Memungkinkan aplikasi diinstal dan memenuhi standar PWA modern
 */
const CACHE_NAME = 'mepokoaso-pwa-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Listener fetch passthrough (wajib ada agar Chrome memicu dialog instalasi PWA)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});