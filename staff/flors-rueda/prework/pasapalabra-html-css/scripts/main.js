import { displayGame, displayMenu, uploadAnswer, displayQuestion, hideItem, showItem, cleanScreen, setGameOver, displayRanking} from "./displayTools.js";
import { questions } from "./questions.js";
import { setGameInfo, setNextTurn, updateRanking, saveRanking, loadRanking, standardizeAnswer } from "./gameTools.js";

document.addEventListener("DOMContentLoaded", (event) => {
  let ranking = [];
  let username = "";
  let gameInfo = undefined;
  let turn = 0;
  let count = 0;
  let timeLeft = 250;

  window.onload = (event) => {
    ranking = loadRanking();
  };


  let info = document.querySelector(".information");
  let score = document.querySelector(".score");
  let usernameBar = document.querySelector(".name");
  let answerBar = document.querySelector(".answer");
  let buttonStart = document.querySelector(".start");
  let buttonRank = document.querySelector(".rank");
  let buttonQuit = document.querySelector(".quit");
  let buttonSend = document.querySelector(".sendAnswer");
  let buttonPass = document.querySelector(".pass");
  let buttonNext = document.querySelector(".next");
  let buttonRestart = document.querySelector(".restart");

  const letters = document.querySelectorAll(".letterCircle");
  let letter = document.querySelector(".a");

  let timer;

  const startTime = () => {
    clearInterval(timer)
    timer = setInterval(( ) =>{
      updateTime()
    }, 1000);
  }

  const pauseTime = () => {
    clearInterval(timer)
  }

  const updateTime = () => {
    let time = document.querySelector(".time");
    time.innerHTML = --timeLeft;
    if (timeLeft === 0) {
      setGameOver(gameInfo, count, info, buttonQuit, buttonSend, buttonPass, buttonNext, answerBar, buttonRestart)
      pauseTime()
    }
  }

  buttonStart.addEventListener("click", (event) => {
    event.preventDefault();
    displayGame(buttonStart, buttonRank, usernameBar, buttonQuit, buttonSend, buttonPass, answerBar);
    username = document.querySelector(".name").value;
    startTime();
    gameInfo = setGameInfo(questions, username);
    console.log(gameInfo)
    displayQuestion(gameInfo, turn, info);
  });

  buttonQuit.addEventListener("click", (event) => {
    event.preventDefault();
    pauseTime()
    setGameOver(gameInfo, count, info, buttonQuit, buttonSend, buttonPass, buttonNext, answerBar, buttonRestart);
  });

  buttonRestart.addEventListener("click", (event) => {
    event.preventDefault();
    if(gameInfo !== undefined){
      saveRanking(updateRanking(gameInfo, count, ranking));
    }
    displayMenu(buttonStart, buttonRank, usernameBar, buttonQuit, buttonSend, buttonPass, buttonNext, answerBar, buttonRestart);
    cleanScreen(letters, score, info);
    let time = document.querySelector(".time");
    username = "";
    gameInfo = undefined;
    turn = 0;
    count = 0;
    timeLeft = 250;
    time.innerHTML = timeLeft;
  });

  buttonRank.addEventListener("click", (event) => {
    event.preventDefault();
    hideItem(buttonStart, buttonRank, usernameBar);
    showItem(buttonRestart);
    displayRanking(ranking, info);
  });

  buttonSend.addEventListener("click", (event) => {
    event.preventDefault();
    letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
    let userAnswer = standardizeAnswer(document.querySelector(".answer").value);
    gameInfo = uploadAnswer(gameInfo, turn, userAnswer, letter);
    if(gameInfo.questions[turn].isAnsweredCorrectly === false) {
      hideItem(buttonSend, buttonPass, answerBar);
      showItem(buttonNext)
      pauseTime()
      info.innerHTML = `¡Oooh! la respuesta correcta era ${gameInfo.questions[turn].answer.toUpperCase()}`;
    } else {
      count += 1
      score.innerHTML = count;
      letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
      turn = setNextTurn(gameInfo, turn, letter);
      turn >= 0 ? displayQuestion(gameInfo, turn, info) : setGameOver(gameInfo, count, info, buttonQuit, buttonSend, buttonPass, buttonNext, answerBar, buttonRestart);
    }
  });

  buttonNext.addEventListener("click", (event) => {
    event.preventDefault();
    showItem(buttonSend, buttonPass, answerBar);
    hideItem(buttonNext);
    startTime();
    letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
    turn = setNextTurn(gameInfo, turn, letter);
    turn >= 0 ? displayQuestion(gameInfo, turn, info) : setGameOver(gameInfo, count, info, buttonQuit, buttonSend, buttonPass, buttonNext, answerBar, buttonRestart);
  });

  buttonPass.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".answer").value = "";
    letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
    turn = setNextTurn(gameInfo, turn, letter);
    turn >= 0 ? displayQuestion(gameInfo, turn, info) : setGameOver(gameInfo, count, info, buttonQuit, buttonSend, buttonPass, buttonNext, answerBar, buttonRestart);
  });


});

