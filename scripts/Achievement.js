let activeElement = -1;
let touchEnabled = false;
let achievementDetails = null;

class Achievement {
  constructor(achievement, index) {
    this.data = achievement;
    this.index = index;
  }

  onMouseOver() {
    if (touchEnabled) {
      return;
    }

    const achievementInfoElem = document.getElementById(
      `achievement-info${this.index}`
    );
    achievementInfoElem.classList.remove("hidden");
  }

  onMouseOut() {
    if (touchEnabled) {
      return;
    }

    const achievementInfoElem = document.getElementById(
      `achievement-info${this.index}`
    );
    achievementInfoElem.classList.add("hidden");
  }

  toggleInfo() {
    const achievementInfoElem = document.getElementById(
      `achievement-info${this.index}`
    );
    achievementInfoElem.classList.toggle("hidden");

    activeElement = this.index;
  }
}
