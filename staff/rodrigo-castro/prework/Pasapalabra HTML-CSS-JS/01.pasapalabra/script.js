import {startGame, endGame, skipWord, pressSend} from './functions.js'

const addEventListeners = () => {
  const sendButton =  document.querySelector(".send-button");
  const pasapalabraButton = document.querySelector(".pasapalabra-button");
  const startButton = document.querySelector(".start-button");
  const endButton = document.querySelector(".end-button");
  const restartButton = document.querySelector(".restart");

  startButton.addEventListener("click", (event) => {
    event.preventDefault();
      startGame();
    })

  endButton.addEventListener("click", (event) => {
    event.preventDefault();
      endGame();
  })

  restartButton.addEventListener("click", (event) => {
    event.preventDefault();
    location.reload();
  })

  pasapalabraButton.addEventListener("click", (event) => {
    event.preventDefault();
    skipWord();
  })

  sendButton.addEventListener("click", (event) => {
    event.preventDefault();
    pressSend();
  })
}

addEventListeners();
