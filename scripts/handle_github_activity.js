const handleRepoUrl = async event => {
    const repoUrl = await event.getRepoUrl();
    const repoElem = document.getElementById(`event-repo${event.id}`);
    if (repoElem) {
        repoElem.setAttribute('href', repoUrl);
        repoElem.setAttribute('target', '_blank');
        repoElem.setAttribute('rel', 'noopener');
    }
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

            const eventDetails = document.createElement('div');
            eventDetails.id = `event${event.id}`;

            const eventName = document.createElement('div');
            eventName.classList = 'event-title';
            eventName.innerHTML = event.title;
            eventDetails.append(eventName);

            const eventRepo = document.createElement('a');
            eventRepo.id = `event-repo${event.id}`;
            eventRepo.innerHTML = event.repo.name;
            eventDetails.append(eventRepo);

            handleRepoUrl(event);

            const eventTime = document.createElement('div');
            eventTime.classList = 'event-time';
            eventTime.innerHTML = event.timeFromNow;
            eventDetails.append(eventTime);

            const eventItem = document.createElement('li');
            eventItem.className = EVENT_CLASS;

            eventItem.append(eventDetails);

            eventList.append(eventItem);
        });

        console.log({ publicActivity });
    } else {
        console.error(`Could not find element #${ACTIVITY_LIST_ELEMENT_ID}.`);
    }
})();
