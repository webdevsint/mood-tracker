const cacheName = "moodtracker";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
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
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .open(cacheName)
      .then((cache) => cache.match(event.request, { ignoreSearch: true }))
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});