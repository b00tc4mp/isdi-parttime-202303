const showTotalRanking = (totalRanking) => {
  const totalRankingShow = totalRanking
    .map(function (totalRankingUser, index) {
      return `${
        index + 1
      }º ${totalRankingUser.userName} --- ${totalRankingUser.userPoints} points`;
    })
    .join("\n");

  alert(`The current user ranking is:\n${totalRankingShow}`);
};

const getUserName = () => {
  const userName = prompt("What is your user name?");

  if (!userName) {
    alert("Please enter your username");
    return getUserName();
  }

  alert(`Hello, ${userName}`);

  return userName;
};

const generateFifteenRandomNumbersNonRepeating = () => {
  array = Array.from(new Array(99), (x, i) => i + 1);
  var i = array.length,
    j = 0,
    temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));

    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array.slice(0, 15).sort((a, b) => a - b);
};

const showBingoCard = (bingoCard) => {
  const bingoCardNumbers = bingoCard.map(function (bingoNumber) {
    return bingoNumber.number;
  });

  bingoCardNumbersJoined =
    bingoCardNumbers.slice(0, 3).join("-") +
    "\n" +
    bingoCardNumbers.slice(3, 6).join("-") +
    "\n" +
    bingoCardNumbers.slice(6, 9).join("-") +
    "\n" +
    bingoCardNumbers.slice(9, 12).join("-") +
    "\n" +
    bingoCardNumbers.slice(12, 15).join("-");

  alert(`The numbers of your bingo card are:\n${bingoCardNumbersJoined}`);
};

const generateNewBingoCard = () => {
  const fifteenRandomNumbersNonRepeating =
    generateFifteenRandomNumbersNonRepeating();

  const bingoCard = fifteenRandomNumbersNonRepeating.map((number) => {
    return {
      number: number,
      matched: false,
    };
  });

  showBingoCard(bingoCard);

  return bingoCard;
};

const checkNewBingoCard = () => {
  answer = prompt(
    "Do you want to keep this bingo card? Answer Yes/No \n If you answer 'No' we will generate a new bingo card"
  );

  switch (answer.toLowerCase()) {
    case "yes":
      return false;
    case "no":
      return true;
    default:
      alert("Answer Yes/No");
      return checkNewBingoCard();
  }
};

const getRandomNumber = (generatedNumbers) => {
  randomNumber = Math.floor(Math.random() * 99) + 1;

  if (generatedNumbers.includes(randomNumber)) {
    return getRandomNumber(generatedNumbers);
  }

  generatedNumbers.push(randomNumber);
  alert(`The random number generated for this turn is: ${randomNumber}`);
  return randomNumber;
};

const startNextTurn = (bingoCard, generatedNumbers, userVictory) => {
  const randomNumber = getRandomNumber(generatedNumbers);

  for (let i = 0; i < bingoCard.length; i++) {
    if (
      bingoCard[i].number === randomNumber &&
      bingoCard[i].matched === false
    ) {
      bingoCard[i].number = "X";
      bingoCard[i].matched = true;
      alert(
        `There is a match because the number ${randomNumber} has been found in the bingo card, we are going to replace it with "X"`
      );
      showBingoCard(bingoCard);

      if (bingoCard.every((e) => e.matched === true)) {
        userVictory = true;
      }
    }
  }

  return userVictory;
};

const checkNewTurn = () => {
  return confirm("Do you want to generate a new number?");
};

const addUserToRanking = (totalRanking, userName, turnsCompleted) => {
  alert(
    `Congratulations! You have won in ${turnsCompleted} turns! We will now add your user to the ranking`
  );
  totalRanking.push({ userName: userName, userPoints: 115 - turnsCompleted });
  totalRanking.sort((a, b) => b.userPoints - a.userPoints);
  showTotalRanking(totalRanking);
};

const checkPlayAgain = () => {
  return confirm("The current game has ended! Do you want to play again?");
};

const checkLine = (bingoCard) => {
  if (
    (bingoCard[0].number === bingoCard[1].number &&
      bingoCard[1].number === bingoCard[2].number) ||
    (bingoCard[3].number === bingoCard[4].number &&
      bingoCard[4].number === bingoCard[5].number) ||
    (bingoCard[6].number === bingoCard[7].number &&
      bingoCard[7].number === bingoCard[8].number) ||
    (bingoCard[9].number === bingoCard[10] &&
      bingoCard[9].number === bingoCard[11].number) ||
    (bingoCard[12].number === bingoCard[13].number &&
      bingoCard[12].number === bingoCard[14].number)
  ) {
    alert("LINEA!");
    return true;
  }

  return false;
};

const playBingo = () => {
  const totalRanking = [];

  do {
    alert(
      `The grading system used in this game works as follows: \n-At the beginning you get a bingo card with 15 numbers, if you don't like it you can generate another one. \n-Each turn you generate one number. \n-You start the game with 115 points. \n-Each turn you lose 1 point. \n-If you finish the game in 15 turns you will get 100 points, which is the maximum score`
    );

    showTotalRanking(totalRanking);
    const userName = getUserName();

    do {
      bingoCard = generateNewBingoCard();
    } while (checkNewBingoCard());

    let isKeepPlaying;
    let turnsCompleted = 0;
    let isUserVictory = false;
    let isLineFound = false;
    let generatedNumbers = [];

    do {
      isKeepPlaying = checkNewTurn();

      if (isKeepPlaying) {
        isUserVictory = startNextTurn(
          bingoCard,
          generatedNumbers,
          isUserVictory
        );
        turnsCompleted++;
        if (isLineFound === false) {
          isLineFound = checkLine(bingoCard);
        }
      }
    } while (isKeepPlaying && !isUserVictory);

    if (isUserVictory) {
      addUserToRanking(totalRanking, userName, turnsCompleted);
    }
  } while (checkPlayAgain());

  alert("Bye! Thanks for playing!");
};

playBingo();
