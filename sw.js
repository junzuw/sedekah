const CACHE_NAME = 'donasi-tracker-v2';
const ASSETS = [
  './',
  './index.html',
  'https://cdn-icons-png.flaticon.com/512/3771/3771278.png'
];

// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetching assets
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
