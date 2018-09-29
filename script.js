if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
        .then(registration => {
            console.log(`[Service Worker] Registrado com sucesso em ${registration.scope}`);
        })
        .catch(err => {
            console.log(`[Service Worker] NÃO registrado, erro: ${err}`);
        })
    });
}