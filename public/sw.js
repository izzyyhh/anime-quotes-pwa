/* eslint-disable no-restricted-globals */
// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
const CACHE_VERSION = 1;
const CACHE_NAME = `ANIME_QUOTES_${CACHE_VERSION}`;
const TO_CACHE = [
  "icon_512.png",
  "icon_256.png",
  "icon_64.png",
  "offline.html",
  "static/js/bundle.js",
  "script.js",
  "manifest.json",
  "static/media/icon_256.c15defb8e0a1f2f2e977.png",
  "index.html",
  "/",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      return cache.addAll(TO_CACHE);
    })()
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((cachesNames) =>
      Promise.all(
        cachesNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          } else {
            return false;
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", function (event) {
  console.log("[Service Worker] Fetch", event.request.url);

  event.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        console.log("[Service Worker] Fetch failed;", error);

        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request.url);
        console.log(cachedResponse);
        console.log("returning from cache if existent", event.request.url);

        return cachedResponse;
      }
    })()
  );
});
