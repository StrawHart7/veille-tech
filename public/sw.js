const CACHE_NAME = "veille-tech-v1"

const STATIC_ASSETS = [
  "/",
  "/search",
  "/manifest.json",
]

// Installation — cache les assets statiques
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

// Activation — supprime les vieux caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

// Fetch — Network first, fallback cache
self.addEventListener("fetch", (event) => {
  // Ignore les requêtes non-GET et les API externes
  if (event.request.method !== "GET") return
  if (event.request.url.includes("newsapi.org")) return
  if (event.request.url.includes("_next/webpack-hmr")) return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Mise en cache de la réponse fraîche
        const responseClone = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone)
        })
        return response
      })
      .catch(() => {
        // Offline — retourne le cache
        return caches.match(event.request).then((cached) => {
          if (cached) return cached
          // Fallback pour les pages non cachées
          return caches.match("/")
        })
      })
  )
})