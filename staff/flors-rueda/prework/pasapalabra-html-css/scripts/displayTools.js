import { countErrors, getHighScores } from "./gameTools.js";

export const hideItem = (...items) => {
  items.forEach((item) => {
    item.classList.add("hidden");
  });
};

export const showItem = (...items) => {
  items.forEach((item) => {
    item.classList.remove("hidden");
  });
};

export const displayGame = (
  buttonStart,
  buttonRank,
  usernameBar,
  buttonQuit,
  buttonSend,
  buttonPass,
  answerBar
) => {
  hideItem(buttonStart, buttonRank, usernameBar);
  showItem(buttonQuit, buttonSend, buttonPass, answerBar);
};

export const displayMenu = (
  buttonStart,
  buttonRank,
  usernameBar,
  buttonQuit,
  buttonSend,
  buttonPass,
  buttonNext,
  answerBar,
  buttonRestart
) => {
  showItem(buttonStart, buttonRank, usernameBar);
  hideItem(
    buttonQuit,
    buttonSend,
    buttonPass,
    buttonNext,
    answerBar,
    buttonRestart
  );
};

export const displayQuestion = (gameInfo, turn, info) => {
  let letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
  info.innerHTML = gameInfo.questions[turn].question;
  letter.classList.add("focus");
};

export const uploadAnswer = (gameInfo, turn, userAnswer, letter) => {
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
  }
  return gameInfo;
};

export const cleanScreen = (letters, score, info) => {
  letters.forEach((letter) => {
    letter.classList.remove("focus");
    letter.classList.remove("correct");
    letter.classList.remove("incorrect");
  });
  document.querySelector(".name").value = "";
  score.innerHTML = 0;
  info.innerHTML = "Envia la respuesta de cada pregunta pulsando el botón enviar y pasa con el de pasapalabra.";
};

export const setGameOver = (
  gameInfo,
  count,
  info,
  buttonQuit,
  buttonSend,
  buttonPass,
  buttonNext,
  answerBar,
  buttonRestart
) => {
  hideItem(buttonQuit, buttonSend, buttonPass, buttonNext, answerBar);
  showItem(buttonRestart);
  const errors = countErrors(gameInfo);
  info.innerHTML = `Tu puntuación es de ${count} aciertos y ${errors} fallos.`;
};

export const displayRanking = (ranking, info) => {
  if (ranking.length === 0) {
    info.innerHTML = "Aún no hay partidas registradas. ¡Juega ya y estrena el ranking!";
  } else {
    const highScores = getHighScores(ranking);
    console.log(highScores)
    let rankingInfo = "MEJORES PUNTUACIONES";
    for (let i = 0; i < highScores.length; i++) {
      rankingInfo += `<br>${i+1}. ${highScores[i].username.toUpperCase()} con ${highScores[i].score} aciertos y ${highScores[i].errors} fallos.`;
    };
    info.innerHTML = rankingInfo;
  };
}
