const cacheName = "moodtracker_15_6_23_v3";

const assets = [
  "./",
  "./index.html",
  "./logs.html",
  "./backup.html",
  "./styles/index.css",
  "./styles/logs.css",
  "./styles/backup.css",
  "./scripts/index.js",
  "./scripts/logs.js",
  "./scripts/backup.js",
  "./scripts/localdb.js",
  "./manifest.json",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (e) => {
  self.skipWaiting();

  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cacheRes) => {
      return cacheRes || fetch(e.request);
    })
  );
});
