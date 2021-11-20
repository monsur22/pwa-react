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

// aCaching strategy