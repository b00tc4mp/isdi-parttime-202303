import {startGame, restartGame, exitGame, selectColumn} from './functions.js';

const joinEventListeners = () => {
  const startButton = document.querySelector(".restart-button");
  const startButtonText = document.querySelector(".restart-text");
  const spacesInGame = document.querySelectorAll(".space");
  const exitButton = document.querySelector(".exit-button");
  let columnSelected = undefined;

  startButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (startButtonText.textContent === "START") {
      startGame();
    } else if (startButtonText.textContent === "RESTART") {
      restartGame();
    }
  });

  exitButton.addEventListener("click", (event) => {
    event.preventDefault();
    exitGame();
  });

  spacesInGame.forEach((button) => {
    button.addEventListener("click", () => {
      selectColumn(startButtonText, columnSelected, button);
    });
  });
};

joinEventListeners();
