const CACHE_NAME = 'sotrama-v3';
const urlsToCache = [
  '/devis-sotrama/',
  '/devis-sotrama/index.html',
  '/devis-sotrama/logo.png',
  '/devis-sotrama/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourner la version en cache si elle existe
        if (response) {
          return response;
        }
        // Sinon faire la requête réseau
        return fetch(event.request);
      })
  );
});
