// Nama cache
const CACHE_NAME = "first-example-pwa-v2";

// Daftar asset dan halaman 
var urltoCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/images/icon-192x192.png",
    "/images/icon-512x512.png"
];

// Registrasi cache
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {

            // Simpan asset dan halaman dalam cache storage
            return cache.addAll(urltoCache);
        })
    );
});

// Gunakan asset dari cache storage
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {
            if (response) {
                console.log("Serviceworker: Gunakan asset dari cache: ", response.url);
                return response;
            }

            console.log("Serviceworker: Memuat aset dari server: ", event.request.url);
            return fetch(event.request);
        })
    )
})

// Hapus cache storage lama
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheName) {
            return Promise.all(
                cacheName.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("Serviceworker: cache" + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})