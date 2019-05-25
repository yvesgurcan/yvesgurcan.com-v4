const CACHE_NAME = 'yvesgurcan.com';

const URLS_TO_CACHE = [
    '/',
    '/index.html',
    // fonts
    'https://fonts.googleapis.com/css?family=Roboto|Permanent+Marker&display=swap',
    'https://fonts.gstatic.com/s/roboto/v19/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
    'https://fonts.gstatic.com/s/permanentmarker/v8/Fh4uPib9Iyv2ucM6pGQMWimMp004La2Cf5b6jlg.woff2 ',
    // assets
    '/assets/linkedin.png',
    '/assets/github.png',
    '/assets/twitter.png',
    '/assets/medium.png',
    // achievements
    '/assets/achievements/mario_box.png',
    // data
    '/data/achievements.js',
    // scripts
    '/scripts/handle_service_worker.js',
    '/scripts/professional_experience.js',
    '/scripts/GitHubEvent.js',
    '/scripts/handle_github_activity.js',
    '/scripts/Achievement.js',
    '/scripts/handle_achievements.js',
    // styles
    '/styles/general.css',
    '/styles/landing.css',
    '/styles/achievements.css',
    '/styles/public_activity.css',
    '/styles/faq.css'
];

const GITHUB_USERNAME = 'yvesgurcan';
const USER_PUBLIC_ACTIVITY_ENDPOINT = `https://api.github.com/users/${GITHUB_USERNAME}/events/public`;

const URLS_DELAYED_REFETCHES = [USER_PUBLIC_ACTIVITY_ENDPOINT];

// we nuke the response/headers to get the current date in there
async function addTimestamp(response) {
    const newResponse = new Response(await response.arrayBuffer());
    newResponse.headers.set('Date', new Date());
    return newResponse;
}

async function addToCache() {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(URLS_TO_CACHE);
}

async function handleRequest(event) {
    const cache = await caches.open(CACHE_NAME);
    const result = await cache.match(event.request.url);

    if (result) {
        const urlsDelayedRefetches = URLS_DELAYED_REFETCHES.map(url => {
            return [
                url,
                `http://localhost:8080${url}`,
                `https://v4.yvesgurcan.com/${url}`
            ];
        }).flat();

        if (urlsDelayedRefetches.includes(event.request.url)) {
            const date = new Date(result.headers.get('Date'));

            // refresh cache every minutes
            if (Date.now() > date.getTime() + 1000 * 60) {
                try {
                    const response = await fetch(event.request);
                    const newResponse = await addTimestamp(response);

                    if (newResponse.ok) {
                        cache.put(event.request.url, newResponse.clone());
                        return newResponse;
                    }
                } catch (error) {}
            }
        } else {
            // refresh cache
            try {
                const response = await fetch(event.request);

                if (response.ok) {
                    cache.put(event.request.url, response.clone());
                }
            } catch (error) {}
        }

        return result;
    }

    console.log(`Request '${event.request.url}' not found in the cache.`);

    try {
        const response = await fetch(event.request);
        const newResponse = await addTimestamp(response.clone());

        if (newResponse.ok) {
            cache.put(event.request.url, newResponse.clone());
        }

        return newResponse;
    } catch (error) {
        return null;
    }
}

self.addEventListener('install', function(event) {
    self.skipWaiting();
    event.waitUntil(addToCache());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(handleRequest(event));
});
