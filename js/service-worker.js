if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/js/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}

const cacheName = 'Visiogen-V1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                '/',
                'index.html',
                '/css/index.css',
                '/css/min.css',
                '/js/generator.js'

            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});