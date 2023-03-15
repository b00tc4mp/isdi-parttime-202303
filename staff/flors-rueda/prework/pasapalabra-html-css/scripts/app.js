import { displayGame, displayMenu, uploadAnswer, displayQuestion } from "./main.js";
import { questions } from "./questions.js";
import { setGameInfo } from "./game.js";

document.addEventListener("DOMContentLoaded", (event) => {
  let ranking = [];
  let username = "";
  let gameInfo = {};
  let turn = 0

/*TODO: load ranking local storage
  window.onload = (event) => {};
*/

  const letters = document.querySelectorAll(".letterCircle");
  let info = document.querySelector(".information");
  let usernameBar = document.querySelector(".name");
  let answerBar = document.querySelector(".answer");
  let buttonStart = document.querySelector(".start");
  let buttonRank = document.querySelector(".rank");
  let buttonQuit = document.querySelector(".quit");
  let buttonSend = document.querySelector(".send");
  let buttonPass = document.querySelector(".pass");
  let buttonNext = document.querySelector(".next");

  let letter = document.querySelector(".a");

  buttonStart.addEventListener("click", function (event) {
    event.preventDefault();
    displayGame(buttonStart, buttonRank, usernameBar, buttonQuit, buttonSend, buttonPass, answerBar);
    username = document.querySelector(".name").value;
    gameInfo = setGameInfo(questions, username)
    info.innerHTML = gameInfo.questions[turn].question;
    letter.classList.add("focus");
    //TODO: add startGame 
  });

  buttonQuit.addEventListener("click", function (event) {
    event.preventDefault();
    displayMenu(buttonStart, buttonRank, usernameBar, buttonQuit, buttonSend, buttonPass, buttonNext, answerBar);
    letters.forEach((letter) => {
      letter.classList.remove("focus");
      letter.classList.remove("correct");
      letter.classList.remove("incorrect");
    });
    document.querySelector(".name").value = "";
    username = "";
    //TODO: save score to local storage 
  });

  buttonSend.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(turn)
    letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
    let userAnswer = document.querySelector(".answer").value.toLowerCase();
    gameInfo = uploadAnswer(gameInfo, turn, userAnswer, letter, buttonNext, buttonPass, buttonSend)
    if(gameInfo.questions[turn].isAnsweredCorrectly === false) {
      info.innerHTML = "Oooh, la respuesta correcta era " + gameInfo.questions[turn].answer;
      turn < 26 ? turn += 1 : turn = 0;
    } else {
      gameInfo.questions[turn].isAlreadyAnswered ? turn += 1 : displayQuestion(gameInfo, turn, info)
    }
  });

  buttonNext.addEventListener("click", function (event) {
    event.preventDefault();
    buttonNext.classList.add("hidden");
    buttonPass.classList.remove("hidden");
    buttonSend.classList.remove("hidden");
    info.innerHTML = gameInfo.questions[turn].question;
    letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
    letter.classList.remove("focus");
    gameInfo.questions[turn].isAlreadyAnswered ? turn += 1 : displayQuestion(gameInfo, turn, info)
  });

  buttonPass.addEventListener("click", function (event) {
    event.preventDefault();
    letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
    letter.classList.remove("focus");
    turn < 26 ? turn += 1 : turn = 0;
    //TODO: repeat in loop if more than one question is already answered
    gameInfo.questions[turn].isAlreadyAnswered ? turn += 1 : displayQuestion(gameInfo, turn, info)
  });


});


