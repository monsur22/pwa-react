const CACHE_NAME = "version-1"
const urlsToCache = ['index.html', 'offline.html'];
const self = this;

// install sw
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
          console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// listem for requests

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
            return response;
            }
            return fetch(event.request)
                .catch(() => caches.match('ofline.html'))
        }
        )
    );
})

// aCaching strategy

self.addEventListener('fetch', function(event) {
    const cacheWhiteList = ['index.html', 'offline.html'];
    cacheWhiteList.push(CACHE_NAME);
    event.respondWith(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
            ))
    )
})