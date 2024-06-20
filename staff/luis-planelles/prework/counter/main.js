//
(() => {
  "use strict";

  const buttons = document.querySelectorAll(".button"),
    increaseButton = buttons[0],
    decreaseButton = buttons[1],
    restartButton = buttons[2];

  let score = 0,
    small = document.querySelector("#score");

  const counter = () => {
    const increaseScore = (limitScoreMax = 50) => {
      score = score < limitScoreMax ? score + 1 : limitScoreMax;
      return score;
    };

    const decreaseScore = (limitScoreMin = 0) => {
      score = score > limitScoreMin ? score - 1 : limitScoreMin;
      return score;
    };

    increaseButton.addEventListener("click", () => {
      let scoreIncreased = increaseScore();
      small.innerText = scoreIncreased;
    });

    decreaseButton.addEventListener("click", () => {
      let scoreDecreased = decreaseScore();
      small.innerText = scoreDecreased;
    });

    restartButton.addEventListener("click", () => {
      score = 0;
      small.innerText = score;
    });
  };

  counter();
})();
