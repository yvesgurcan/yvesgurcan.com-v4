const enableTouch = () => {
    touchEnabled = true;
};

const disableTouch = () => {
    touchEnabled = false;
};

(function() {
    const ACHIEVEMENT_LIST_ELEMENT_ID = 'latest-achievements';
    const ACHIEVEMENT_CLASS = 'achievement';
    const ACHIEVEMENT_INFO_CLASS = 'achievement-info';

    const sortedAchievements = achievements.sort(function(a, b) {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });

    const mostRecentAchievements = sortedAchievements.slice(0, 10);

    const achievementList = document.getElementById(
        ACHIEVEMENT_LIST_ELEMENT_ID
    );

    if (achievementList) {
        mostRecentAchievements.forEach((rawAchievement, index) => {
            if (index === 0) {
                const publicActivity = document.getElementById('achievements');
                if (publicActivity) {
                    const publicActivityInner = document.createElement('div');
                    publicActivityInner.id = 'social-wall-inner';
                }
            }

            const achievement = new Achievement(rawAchievement, index);
            const achievementImage = document.createElement('img');
            achievementImage.onmouseover = () => achievement.onMouseOver();
            achievementImage.onmouseout = () => achievement.onMouseOut();
            achievementImage.onclick = () => achievement.toggleInfo();

            if (achievement.data.image) {
                achievementImage.src = `assets/achievements/${
                    achievement.data.image
                }.png`;
            } else {
                achievementImage.src = `assets/achievements/mario_box.png`;
            }

            const achievementDetails = document.createElement('div');
            achievementDetails.id = `achievement-info${index}`;
            achievementDetails.className = `${ACHIEVEMENT_INFO_CLASS} hidden`;

            const achievementName = document.createElement('div');
            achievementName.innerHTML = achievement.data.name;
            achievementDetails.append(achievementName);

            const achievementDescription = document.createElement('div');
            achievementDescription.innerHTML = achievement.data.description;
            achievementDetails.append(achievementDescription);

            const achievementTags = document.createElement('div');
            achievementTags.innerHTML = `Tags: ${achievement.data.tags}`;
            achievementDetails.append(achievementTags);

            const achievementDate = document.createElement('div');
            achievementDate.innerHTML = `Unlocked: ${achievement.data.date}`;
            achievementDetails.append(achievementDate);

            const achievementItem = document.createElement('li');
            achievementItem.className = ACHIEVEMENT_CLASS;

            achievementItem.append(achievementImage);
            achievementItem.append(achievementDetails);

            achievementList.append(achievementItem);
        });
    } else {
        console.error(
            `Could not find element #${ACHIEVEMENT_LIST_ELEMENT_ID}.`
        );
    }
})();
