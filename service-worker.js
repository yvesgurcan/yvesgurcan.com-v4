const CACHE_NAME = 'yvesgurcan.com';
const GITHUB_API = 'https://api.github.com';

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
    '/scripts/moment-2.24.0.min.js',
    // styles
    '/styles/general.css',
    '/styles/landing.css',
    '/styles/achievements.css',
    '/styles/public_activity.css',
    '/styles/faq.css'
];

const URLS_DELAYED_REFETCHES = [GITHUB_API];

function isGitHubRateLimitedRequest(response) {
    // TODO: add more specific checks
    return response.status === 403;
}

function isDelayedUrl(targetUrl) {
    const isDelayed = URLS_DELAYED_REFETCHES.some(
        url => targetUrl.indexOf(url) > -1
    );
    return isDelayed;
}

// we nuke the response/headers to get the current date in there
async function addTimestamp(response) {
    const newResponse = new Response(await response.arrayBuffer());
    newResponse.headers.set('Date', new Date());
    return newResponse;
}

async function addAllToCache() {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(URLS_TO_CACHE);
}

async function putInCache(event, cache, cachedResponse, transform = true) {
    const response = await fetch(event.request);
    if (isGitHubRateLimitedRequest(response)) {
        return cachedResponse;
    }

    const newResponse = transform ? await addTimestamp(response) : response;

    if (newResponse.ok) {
        if (event.request.url.indexOf(GITHUB_API) > -1) {
            // do not cache requests that go beyond the GitHub API rate limit
            // if () {
            cache.put(event.request.url, newResponse.clone());
            return newResponse;
            // }
        } else {
            cache.put(event.request.url, newResponse.clone());
            return newResponse;
        }
    }
}

async function handleRequest(event) {
    const cache = await caches.open(CACHE_NAME);
    const result = await cache.match(event.request.url);

    if (result) {
        if (isDelayedUrl(event.request.url)) {
            const date = new Date(result.headers.get('Date'));

            // refresh cache every 5 minutes
            if (Date.now() > date.getTime() + 1000 * 60 * 5) {
                console.log('Cache expired', event.request.url);
                try {
                    return await putInCache(event, cache, result);
                } catch (error) {}
            }
        } else {
            // refresh cache immediately
            try {
                putInCache(event, cache, result, false);
            } catch (error) {}
        }

        return result;
    }

    console.log(`Request '${event.request.url}' not found in the cache.`);

    try {
        return await putInCache(event, cache, result, false);
    } catch (error) {
        return new Response();
    }
}

self.addEventListener('install', function(event) {
    self.skipWaiting();
    event.waitUntil(addAllToCache());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(handleRequest(event));
});
