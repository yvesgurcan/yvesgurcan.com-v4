const githubReposInEvents = [];

const addDeferredRepoRequest = (url, eventId) => {
    const deferredRequestIndex = githubReposInEvents.findIndex(
        repoEvents => repoEvents.url === url
    );
    if (deferredRequestIndex > -1) {
        const deferredRequest = githubReposInEvents[deferredRequestIndex];
        githubReposInEvents[deferredRequestIndex] = {
            ...deferredRequest,
            eventIds: [...deferredRequest.eventIds, eventId]
        };
        return;
    }

    githubReposInEvents.push({ url, eventIds: [eventId] });
};

const handleRepoUrls = async () => {
    githubReposInEvents.forEach(async repoEvents => {
        const result = await fetch(repoEvents.url);
        if (result) {
            const data = await result.json();
            if (data) {
                repoEvents.eventIds.map(eventId => {
                    const repoElem = document.getElementById(
                        `event-repo${eventId}`
                    );
                    if (repoElem) {
                        repoElem.setAttribute('href', data.html_url);
                        repoElem.setAttribute('target', '_blank');
                        repoElem.setAttribute('rel', 'noopener');
                    }
                });
            }
        }
    });
};

(async function() {
    const EVENT_LIST_ELEMENT_ID = 'social-wall';
    const EVENT_CLASS = 'event';
    const GITHUB_USERNAME = 'yvesgurcan';
    const USER_PUBLIC_ACTIVITY_ENDPOINT = `https://api.github.com/users/${GITHUB_USERNAME}/events/public`;

    const eventList = document.getElementById(EVENT_LIST_ELEMENT_ID);

    if (eventList) {
        const publicActivityResponse = await fetch(
            USER_PUBLIC_ACTIVITY_ENDPOINT
        );

        if (publicActivityResponse.status !== 200) {
            return;
        }
        const publicActivity = await publicActivityResponse.json();

        publicActivity.forEach((rawEvent, index) => {
            const event = new GitHubEvent(rawEvent, index);

            // event details
            const eventDetails = document.createElement('div');
            eventDetails.classList = 'event-details';

            const eventItemInner = document.createElement('div');
            eventItemInner.classList = 'event-inner';

            const eventName = document.createElement('div');
            eventName.classList = 'event-title';
            eventName.innerHTML = event.title;
            eventDetails.append(eventName);

            const eventRepo = document.createElement('a');
            eventRepo.id = `event-repo${event.id}`;
            eventRepo.innerHTML = event.repo.name;
            eventDetails.append(eventRepo);

            const eventTime = document.createElement('div');
            eventTime.classList = 'event-time';
            eventTime.innerHTML = event.timeFromNow;
            eventDetails.append(eventTime);

            // event image
            if (event.icon) {
                const eventIcon = document.createElement('div');
                eventIcon.classList = 'event-icon';

                const eventIconInner = document.createElement('img');
                eventIconInner.classList = 'event-icon-inner';
                eventIconInner.setAttribute('src', event.icon);

                eventIcon.append(eventIconInner);
                eventItemInner.append(eventIcon);
            }

            // group children elements
            const eventItem = document.createElement('li');
            eventItem.className = EVENT_CLASS;
            eventItem.id = `event${event.id}`;

            eventItemInner.append(eventDetails);
            eventItem.append(eventItemInner);

            eventList.append(eventItem);

            // group requests for repo details to avoid sending duplicate requests concurrently
            addDeferredRepoRequest(event.repo.apiUrl, event.id);
        });

        // send all requests for repo details
        handleRepoUrls();

        console.log({ publicActivity });
    } else {
        console.error(`Could not find element #${ACTIVITY_LIST_ELEMENT_ID}.`);
    }
})();
