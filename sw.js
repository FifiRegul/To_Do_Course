// Service Worker - Liste de Courses Famille
// Cache le "shell" de l'app pour l'installabilité PWA et un minimum
// d'usage hors-ligne. Les données (Firestore) restent gérées en ligne
// avec cache local automatique par le SDK Firebase.

const CACHE_NAME = "liste-famille-v1";
const SHELL_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./css/print.css",
  "./js/firebase-config.js",
  "./js/rayons-default.js",
  "./js/auth.js",
  "./js/notifications.js",
  "./js/app.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Ne jamais mettre en cache les appels Firebase/Firestore : réseau uniquement.
  if (event.request.url.includes("firestore") || event.request.url.includes("firebaseio")) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

// Affichage d'une notification reçue via Firebase Cloud Messaging (push),
// si la version avancée avec Cloud Function est mise en place.
self.addEventListener("push", (event) => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.notification?.title || "Liste de Courses", {
      body: data.notification?.body || "",
      icon: "icons/icon-192.png"
    })
  );
});
