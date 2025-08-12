self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("portfolio-cache").then(cache => {
            return cache.addAll([
                "/",
                "/index.html",
                "/style.css",
                "/script.js",
                "/manifest.json",
                "/images/project1.jpg",
                "/images/project2.jpg"
            ]);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
