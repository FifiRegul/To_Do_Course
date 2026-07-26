// Service Worker - Liste de Courses Famille
// Cache le "shell" de l'app pour l'installabilité PWA et un minimum
// d'usage hors-ligne. Les données (Firestore) restent gérées en ligne
// avec cache local automatique par le SDK Firebase.

// IMPORTANT : incrémenter ce numéro à CHAQUE déploiement qui modifie
// index.html, un fichier css/ ou js/. Cela force tous les navigateurs à
// récupérer la nouvelle version au lieu de resservir indéfiniment
// l'ancienne depuis le cache.
const CACHE_VERSION = "v6";
const CACHE_NAME = "liste-famille-" + CACHE_VERSION;
const SHELL_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./css/print.css",
  "./js/firebase-config.js",
  "./js/rayons-default.js",
  "./js/voyage-default.js",
  "./js/auth.js",
  "./js/notifications.js",
  "./js/app.js",
  "./vendor/firebase/firebase-app-compat.js",
  "./vendor/firebase/firebase-firestore-compat.js",
  "./vendor/firebase/firebase-messaging-compat.js",
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
  if (event.request.method !== "GET") return;
  // Ne jamais mettre en cache les appels Firebase/Firestore : réseau uniquement.
  if (event.request.url.includes("firestore") || event.request.url.includes("firebaseio")) {
    return;
  }

  // Réseau EN PRIORITE pour le HTML et le JS/CSS de l'app : garantit que
  // toute mise à jour de code est visible dès le prochain chargement,
  // avec repli sur le cache uniquement si hors-ligne.
  const url = new URL(event.request.url);
  const estShell = event.request.mode === "navigate" ||
    /\.(js|css|json)$/.test(url.pathname);

  if (estShell) {
    event.respondWith(
      fetch(event.request)
        .then((reponse) => {
          const clone = reponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return reponse;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first pour le reste (icônes...)
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
