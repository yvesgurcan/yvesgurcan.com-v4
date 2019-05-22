(function() {
  const YEAR_COUNT_ELEMENT_ID = "experience-count";

  const getMillisecondsSince = function(year, month = 0) {
    return new Date().getTime() - new Date(year, month, 1);
  };

  const getYearsSince = function(year, round = 1) {
    return (
      round *
      Math.floor(
        (1 / round) *
          Math.floor(
            getMillisecondsSince(year) / (1000 * 60 * 60 * 24 * 7 * 52)
          )
      )
    );
  };

  const element = document.getElementById(YEAR_COUNT_ELEMENT_ID);
  if (element) {
    element.innerHTML = `${getYearsSince(2015)}+`;
  } else {
    console.error(`Could not find element #${YEAR_COUNT_ELEMENT_ID}.`);
  }
})();
