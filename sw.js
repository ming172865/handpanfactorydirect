const CACHE_NAME = "lingyin-handpan-pwa-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./success.html",
  "./styles.css",
  "./manifest.json",
  "./assets/app-icon-192.png",
  "./assets/app-icon-512.png",
  "./assets/hero-gold-handpan-cutout-clean.png",
  "./assets/craft-workshop-wide.jpg",
  "./assets/craft-tuning-worker.jpg",
  "./assets/craft-tuning-close.jpg",
  "./assets/craft-maker.jpg",
  "./assets/craft-machine.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => (key === CACHE_NAME ? null : caches.delete(key))))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) =>
      cached ||
      fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      })
    )
  );
});
