const CACHE_NAME = 'artplanner-v1';
const urlsToCache = [
  './',
  './index.html',
  './mantener.html',
  './aventura.html',
  './manifest.json',
  './icono.png'
];

// Instalar el Service Worker y guardar en caché el "cascarón"
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar las peticiones para que la app cargue rapidísimo
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});