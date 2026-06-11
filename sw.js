const CACHE_NAME = "lingyin-handpan-pwa-v18";
const APP_SHELL = [
  "./",
  "./index.html",
  "./catalog.html",
  "./product-detail.html",
  "./products.json",
  "./products.js?v=20260609-products",
  "./success.html",
  "./thank-you.html",
  "./styles.css?v=20260610-nav-pages",
  "./manifest.json",
  "./robots.txt",
  "./sitemap.xml",
  "./assets/app-icon-192.png",
  "./assets/app-icon-512.png",
  "./assets/hero-gold-handpan-cutout-clean.png",
  "./assets/craft-workshop-wide.jpg",
  "./assets/craft-tuning-worker.jpg",
  "./assets/craft-tuning-close.jpg",
  "./assets/craft-maker.jpg",
  "./assets/craft-machine.jpg",
  "./images/products/d-kurd-10-note-handpan-main.webp",
  "./images/products/d-kurd-10-note-handpan-purple.webp",
  "./images/products/d-kurd-10-note-handpan-black.webp",
  "./images/products/d-kurd-10-note-handpan-gold.webp",
  "./images/products/d-kurd-10-note-handpan-silver.webp",
  "./images/products/d-kurd-10-note-handpan-blue.webp",
  "./images/products/d-kurd-10-note-handpan-main-display.webp",
  "./images/products/d-kurd-10-note-handpan-purple-display.webp",
  "./images/products/d-kurd-10-note-handpan-black-display.webp",
  "./images/products/d-kurd-10-note-handpan-gold-display.webp",
  "./images/products/d-kurd-10-note-handpan-silver-display.webp",
  "./images/products/d-kurd-10-note-handpan-blue-display.webp",
  "./images/products/d-kurd-10-note-handpan-spiral-blue.webp",
  "./images/products/d-kurd-10-note-handpan-spiral-gold.webp",
  "./images/products/d-kurd-10-note-handpan-golden-eye.webp",
  "./images/products/custom-patterns/custom-handpan-pattern-01.webp",
  "./images/products/custom-patterns/custom-handpan-pattern-02.webp",
  "./images/products/custom-patterns/custom-handpan-pattern-03.webp",
  "./images/products/custom-patterns/custom-handpan-pattern-04.webp",
  "./images/products/custom-patterns/custom-handpan-pattern-05.webp",
  "./images/products/custom-patterns/custom-handpan-pattern-06.webp",
  "./images/products/custom-patterns/custom-handpan-pattern-07.webp",
  "./images/products/custom-patterns/custom-handpan-pattern-08.webp"
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

  if (request.destination === "style" || request.destination === "script") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request))
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
