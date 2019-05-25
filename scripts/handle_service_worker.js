const listenToServiceWorkerUpdates = registration => {
    registration.addEventListener('updatefound', () => {
        registration.installing.addEventListener('statechange', event => {
            switch (event.target.state) {
                default: {
                }
                case 'installed': {
                    console.log('service worker installed.');
                }
                case 'activated': {
                    console.log('service worker activated.');
                }
            }
        });
    });
};

(function() {
    if (!('serviceWorker' in navigator)) {
        return;
    }

    if (!navigator.onLine) {
        return;
    }

    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(listenToServiceWorkerUpdates)
            .catch(error =>
                console.error(
                    'Something bad happened in the service worker 🔥',
                    {
                        error
                    }
                )
            );
    });
})();
