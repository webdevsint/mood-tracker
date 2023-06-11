const cacheName = "moodtracker-1.3";

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

// install event
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// activate event
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
