const CACHE_NAME = 'donasi-tracker-v3'; // Naikkan versi setiap kali update kode
const ASSETS = [
  './',
  './index.html',
  'https://cdn-icons-png.flaticon.com/512/3771/3771278.png'
];

// 1. Install: Simpan file ke memori
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Memaksa SW baru langsung aktif
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Activate: Hapus cache lama (Penting!)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('Menghapus cache lama:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim(); // Ambil kendali halaman segera
});

// 3. Fetch: Ambil dari cache, jika gagal ambil dari internet
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
