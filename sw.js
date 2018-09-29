const CACHE_NAME = 'pwa-demo-edteam-cache-v1';
const urlsToCache = [
    './',
    './?utm=homescreen',
    './index.html',
    './index.html?utm=homescreen',
    './style.css',
    './script.js',
    './sw.js',
    './favicon.ico',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
]

self.addEventListener('install', e => {
    console.log(`[Service Worker] Instalado com sucesso.`);
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log(`[Service Worker] Arquivo em cache.`);
                return cache.addAll(urlsToCache);
            })
            .catch(err => console.log(`[Service Worker] Falha n registro do log, erro: ${err}.`))
    );
});

self.addEventListener('activate', e => {
    console.log(`[Service Worker] Ativado com sucesso.`);
    const cacheList = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheList.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                )
            })
            .then(() => {
                console.log(`[Service Worker] Cache limpo e atualizado.`);
                return self.clients.claim();
            })
            .catch()
    );
});

self.addEventListener('fetch', e => {
    console.log(`[Service Worker] Fetch executado.`);
});

