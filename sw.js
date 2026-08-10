self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = event.request.url;
    if (url.includes('params_shard_0.bin') && !url.includes('.part')) {
        event.respondWith(
            caches.open('cyberllm-merge-cache').then((cache) => {
                return cache.match(event.request).then((response) => {
                    return response || fetch(event.request);
                });
            })
        );
    }
});