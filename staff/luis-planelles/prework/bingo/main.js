let bingoUserBoard = {};
let recordsTable = [];

const loosePointsByFail = 1;
const setPointsGame = 30;
let initialPointsUser = setPointsGame;

const generateBoard = () => {
  for (let i = 0; i < 5; i++) {
    const randomNumber = generateNumberRandom();
    if (bingoUserBoard[randomNumber] !== randomNumber) {
      bingoUserBoard[randomNumber] = randomNumber;
    } else {
      i--;
    }
  }
  return bingoUserBoard;
};

const generateNumberRandom = () => {
  const numberBingo = Math.floor(Math.random() * 10) + 1;

  return numberBingo;
};

const matchBoard = (numberToCompare) => {
  for (let number of Object.values(bingoUserBoard)) {
    if (bingoUserBoard[number] === numberToCompare) {
      bingoUserBoard[number] = "x";
    }
  }

  if (Object.values(bingoUserBoard).every((value) => value === "x")) {
    return false;
  }
  return bingoUserBoard;
};

const askForConfirm = (confirmMessage) => {
  const userConfirm = confirmMessage;

  return userConfirm;
};

const getAnswer = (userAnswer) => {
  if (userAnswer) {
    userAnswer = userAnswer.toLowerCase();
  }

  if (userAnswer === "yes") {
    return true;
  } else if (userAnswer !== "no") {
    alert("You should answer only 'yes' or 'no'");
  }
  return false;
};

const getPoints = (loosePointByTurn) => {
  let loosePoints = loosePointByTurn;
  initialPointsUser = initialPointsUser - loosePoints;

  if (initialPointsUser === 0) {
    return 0;
  }
  return initialPointsUser;
};

const endGameMessages = (pointsRemaining) => {
  let message = "";

  if (pointsRemaining) {
    message = "You win, congratulations.";
  } else {
    message = "Sorry, you loose.";
  }
  console.log(message);
};

const displayRecordsTable = (points, user) => {
  recordsTable.push([points, user]);

  let sortedRecords = recordsTable.sort(function (a, b) {
    return b[0] - a[0];
  });

  console.log("Records table");
  for (let i = 0; i < sortedRecords.length; i++) {
    let playerPoints = sortedRecords[i][0];
    let playerName = sortedRecords[i][1];
    console.log(`${playerPoints} points, ${playerName}.`);
  }
};

const bingo = () => {
  initialPointsUser = setPointsGame;
  let userGame = true;

  let userName = prompt("Shall we play a game? Write your name");

  if (!userName) {
    userName = "Anonymous";
  }

  do {
    bingoUserBoard = {};

    generateBoard();
    console.log("This is your board: ", bingoUserBoard);

    const askForChangeBoard = prompt(
      `${userName} do you want to change this board? Yes/No`,
      "yes or no"
    );

    changeBoard = getAnswer(askForChangeBoard);
  } while (changeBoard);

  do {
    const askForNextRound = confirm("Do you want to go to the next round?");
    nextRound = askForConfirm(askForNextRound);

    const numberHypeStock = generateNumberRandom();
    checkBoard = matchBoard(numberHypeStock);
    userPointsLeft = getPoints(loosePointsByFail);

    if (checkBoard && nextRound === false) {
      userGame = false;
      console.log("Record canceled");
    } else {
      console.log(bingoUserBoard, `You have ${userPointsLeft} points left.`);
    }
  } while (nextRound && userPointsLeft && checkBoard);

  if (userGame) {
    endGameMessages(userPointsLeft);
    displayRecordsTable(userPointsLeft, userName);
  }

  const askForPlayAgain = confirm("Shall we play again?");
  playBingo = askForConfirm(askForPlayAgain);

  if (playBingo) {
    bingo();
  }
};

bingo();
console.log("see you later");
