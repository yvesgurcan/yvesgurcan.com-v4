(async function() {
  const EVENT_LIST_ELEMENT_ID = "social-wall";
  const EVENT_CLASS = "event";
  const GITHUB_USERNAME = "yvesgurcan";
  const userPublicActivityEndpoint = `https://api.github.com/users/${GITHUB_USERNAME}/events/public`;

  const eventList = document.getElementById(EVENT_LIST_ELEMENT_ID);

  if (eventList) {
    const publicActivityResponse = await fetch(userPublicActivityEndpoint);

    if (publicActivityResponse.status !== 200) {
      return;
    }
    const publicActivity = await publicActivityResponse.json();

    publicActivity.forEach((rawEvent, index) => {
      const event = new GitHubEvent(rawEvent, index);
      const eventImage = document.createElement("img");

      if (event.image) {
        // eventImage.src = `assets/achievements/${achievement.image}.png`;
      }

      const eventDetails = document.createElement("div");
      eventDetails.id = `event${event.id}`;

      const eventName = document.createElement("div");
      eventName.innerHTML = event.title;
      eventDetails.append(eventName);

      const eventDescription = document.createElement("div");
      // eventDescription.innerHTML = event.description;
      eventDetails.append(eventDescription);

      const eventItem = document.createElement("li");
      eventItem.className = EVENT_CLASS;

      eventItem.append(eventImage);
      eventItem.append(eventDetails);

      eventList.append(eventItem);
    });

    console.log({ publicActivity });
  } else {
    console.error(`Could not find element #${ACTIVITY_LIST_ELEMENT_ID}.`);
  }
})();
