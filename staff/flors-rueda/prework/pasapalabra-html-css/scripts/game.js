import { questions } from "./questions.js";

const getRandomQuestion = (letterQuestions) => {
  return letterQuestions[Math.floor(Math.random() * letterQuestions.length)];
};

const setQuestionByLetter = (questions, letterPosition, letter) => {
  let question = {};
  const letterQuestions = questions[letterPosition];
  const randomQuestion = getRandomQuestion(letterQuestions);
  question.letter = letter;
  question.question = randomQuestion.question;
  question.answer = randomQuestion.answer;
  question.isAlreadyAnswered = false;
  return question;
};

export const createQuestionsList = (questions) => {
  const alphabet = "abcdefghijklmnñopqrstuvwxyz"
  let questionList = [];
  for (let letterPosition = 0; letterPosition < alphabet.length; letterPosition++) {
    let letterQuestion = setQuestionByLetter(
      questions,
      letterPosition,
      alphabet[letterPosition]
    );
    questionList.push(letterQuestion);
  }
  return questionList;
};

export const setGameInfo = (questions, username) => {
  let gameInfo = {};
  gameInfo.questions = createQuestionsList(questions);
  gameInfo.isGameOver = false;
  gameInfo.user = username
  return gameInfo;
};







  
  const playRound = (displayInfo, gameInfo) => {
    for (let i = 0; i < gameInfo.questions.length; i++) {
      if (gameInfo.questions[i].isAlreadyAnswered === false) {
        displayInfo.innerHTML = gameInfo.questions[i].question;
        let userInput = document.querySelector(".answer").value
        let userAnswer = userInput.toLowerCase();
        if (userAnswer !== "pasapalabra" && userAnswer !== "") {
          gameInfo.questions[i].isAlreadyAnswered = true;
          if (checkAnswer(gameInfo.questions[i].answer, userAnswer)) {
            gameInfo.score += 1;
            
          } else {
            displayInfo.innerHTML = "Oooh, la respuesta correcta era " + gameInfo.questions[i].answer;
          };
        };
      };
    };
    return gameInfo;
  };
  
  
  const checkIsGameOver = (gameInfo) => {
    return gameInfo.questions.every((question) => question.isAlreadyAnswered === true);
  };
  
export const playAllRounds = (displayInfo, gameInfo) => {
    let updatedGameInfo = playRound(displayInfo, gameInfo);
    if (updatedGameInfo.isGameOver || checkIsGameOver(updatedGameInfo)) {
      return updatedGameInfo;
    };
    return playAllRounds(displayInfo, updatedGameInfo);
  };
