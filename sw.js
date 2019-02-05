const cacheVersion = "pwa-quintoandar-v2";
const filesToCache = [
  "/",
  "/index.html",
  "/dist/bundle.css",
  "/dist/bundle.js"
];

self.addEventListener("install", function(e) {
  console.log("[ServiceWorker] install");
  e.waitUntil(
    caches.open(cacheVersion).then(function(cache) {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => {
      return response || fetch(event.request);
    })
  );
});