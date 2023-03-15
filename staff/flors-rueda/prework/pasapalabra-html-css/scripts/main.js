//import { questions } from "./scripts/questions.js";

const hideItem = (item) => {
  item.classList.add("hidden");
};

const showItem = (item) => {
  item.classList.remove("hidden");
};

export const displayGame = (buttonStart, buttonRank, usernameBar, buttonQuit, buttonSend, buttonPass, answerBar) => {
  hideItem(buttonStart);
  hideItem(buttonRank);
  hideItem(usernameBar);
  showItem(buttonQuit);
  showItem(buttonSend);
  showItem(buttonPass);
  showItem(answerBar);
};

export const displayMenu = (buttonStart, buttonRank, usernameBar, buttonQuit, buttonSend, buttonPass, buttonNext, answerBar) => {
  showItem(buttonStart);
  showItem(buttonRank);
  showItem(usernameBar);
  hideItem(buttonQuit);
  hideItem(buttonSend);
  hideItem(buttonPass);
  hideItem(buttonNext);
  hideItem(answerBar);
};

export const startGame = () => {
  
}

export const displayQuestion = (gameInfo, turn, info) => {
  let letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
  info.innerHTML = gameInfo.questions[turn].question;
  letter.classList.add("focus");
};

const answerQuestion = (questionInfo, buttonSend, buttonPass) => {
  let userAnswer = "";
  buttonSend.addEventListener("click", function (event) {
    event.preventDefault();
    userAnswer = document.querySelector(".answer").value.toLowerCase();
    if (questionInfo.answer === userAnswer) {
      letter.classList.add("correct");
      letter.classList.remove("focus");
      document.querySelector(".answer").value = "";
    } else {
      letter.classList.remove("focus");
      letter.classList.add("incorrect");
      document.querySelector(".answer").value = "";
    }
  });
  buttonPass.addEventListener("click", function (event) {
    event.preventDefault();
    letter.classList.remove("focus");
    document.querySelector(".answer").value = "";
  });
  
};



//TODO: fix game loop

export const uploadAnswer = (gameInfo, turn, userAnswer, letter, buttonNext, buttonPass, buttonSend) => {
  gameInfo.questions[turn].isAlreadyAnswered = true;
  if (gameInfo.questions[turn].answer === userAnswer) {
    letter.classList.add("correct");
    letter.classList.remove("focus");
    document.querySelector(".answer").value = "";
    gameInfo.questions[turn].isAnsweredCorrectly = true;
  } else {
    letter.classList.remove("focus");
    letter.classList.add("incorrect");
    document.querySelector(".answer").value = "";
    gameInfo.questions[turn].isAnsweredCorrectly = false;
    buttonNext.classList.remove("hidden");
    buttonPass.classList.add("hidden");
    buttonSend.classList.add("hidden");
  }
  return gameInfo
}
