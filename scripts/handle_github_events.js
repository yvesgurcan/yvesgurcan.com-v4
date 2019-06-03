const githubReposInEvents = [];
const githubEventsWithRepoLinks = {};

const addDeferredRepoRequest = event => {
    const { repo = {}, id: eventId, linkIsSameAsRepoUrl } = event;
    const { apiUrl: url } = repo;
    const deferredRequestIndex = githubReposInEvents.findIndex(
        repoEvents => repoEvents.url === url
    );

    if (linkIsSameAsRepoUrl) {
        githubEventsWithRepoLinks[eventId] = linkIsSameAsRepoUrl;
    }

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
        try {
            const result = await fetch(repoEvents.url);
            if (result) {
                const data = await result.json();
                if (data && data.html_url) {
                    repoEvents.eventIds.map(eventId => {
                        const repoElem = document.getElementById(
                            `event-repo${eventId}`
                        );
                        if (repoElem) {
                            repoElem.setAttribute('href', data.html_url);
                            repoElem.setAttribute('target', '_blank');
                            repoElem.setAttribute('rel', 'noopener');
                        }

                        const eventLink = githubEventsWithRepoLinks[eventId];
                        if (eventLink) {
                            const titleElem = document.getElementById(
                                `event-title${eventId}`
                            );

                            if (titleElem) {
                                let url = data.html_url;
                                if (eventLink.indexOf('https') === 0) {
                                    url = eventLink;
                                } else if (eventLink !== true) {
                                    url += eventLink;
                                }

                                titleElem.setAttribute('href', url);
                                titleElem.setAttribute('target', '_blank');
                                titleElem.setAttribute('rel', 'noopener');
                            }
                        }
                    });
                }
            }
        } catch (error) {
            console.error({ url: repoEvents.url, error });
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
            if (index === 0) {
                const activityContainer = document.getElementById('activity');
                if (activityContainer) {
                    const activityTitle = document.createElement('h2');
                    activityTitle.innerHTML = 'Public activity';
                    activityContainer.prepend(activityTitle);
                }
            }

            const event = new GitHubEvent(rawEvent, index);

            // event details
            const eventDetails = document.createElement('div');
            eventDetails.classList = 'event-details';

            const eventItemInner = document.createElement('div');
            eventItemInner.classList = 'event-inner';

            let eventName = document.createElement('a');

            if (event.link) {
                eventName.setAttribute('href', event.link);
                eventName.setAttribute('target', '_blank');
                eventName.setAttribute('rel', 'noopener');
            }

            eventName.id = `event-title${event.id}`;
            eventName.classList = 'event-title';
            eventName.innerHTML = event.title;
            eventDetails.append(eventName);

            const eventRepo = document.createElement('a');
            eventRepo.id = `event-repo${event.id}`;
            eventRepo.classList = 'event-repo';
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
            addDeferredRepoRequest(event);
        });

        // send all requests for repo details
        handleRepoUrls();

        console.log({ publicActivity });
    } else {
        console.error(`Could not find element #${ACTIVITY_LIST_ELEMENT_ID}.`);
    }
})();
