/* eslint-disable no-restricted-globals */
// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
const CACHE_VERSION = 1;
const CACHE_NAME = `ANIME_QUOTES_${CACHE_VERSION}`;
const TO_CACHE = [
  "/icon_512.png",
  "/icon_256.png",
  "/icon_64.png",
  "/static/js/bundle.js",
  "/script.js",
  "/manifest.json",
  "/offline.html",
  "/static/media/icon_256.c15defb8e0a1f2f2e977.png",
  "/index.html",
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

        if (event.request.url === "https://animechan.vercel.app/api/quotes") {
          console.log("serving fall back offline feed");
          const offlineFeed = [
            {
              anime: "Al Bert and O",
              character: "Albert",
              quote: "Offline World!",
            },
          ];
          return new Response(JSON.stringify(offlineFeed));
        } else {
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(event.request);
          console.log(cachedResponse);
          console.log("returning from cache if existent", event.request.url);

          return cachedResponse;
        }
      }
    })()
  );
});

self.addEventListener("message", function (event) {
  self.clients.matchAll().then((all) =>
    all.forEach((client) => {
      client.postMessage(event.data);
    })
  );
});

/* eslint-disable no-restricted-globals */
self.addEventListener("push", function (event) {
  console.log("[Service Worker] Push Received.");
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = "Quote of the Day";
  const options = {
    body: event.data.text(),
    icon: "images/icon.png",
    badge: "images/badge.png",
  };

  console.log(event.data);

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  console.log("[Service Worker] Notification click Received.");

  event.notification.close();

  // eslint-disable-next-line no-undef
  event.waitUntil(clients.openWindow("https://developers.google.com/web/"));
});
