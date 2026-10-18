const C = 'jarvis-v1';
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(C)
      .then(c => c.addAll(['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png']))
      .catch(() => {})
  );
});
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
