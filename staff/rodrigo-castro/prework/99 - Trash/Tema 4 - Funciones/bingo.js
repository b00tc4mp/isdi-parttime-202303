const userCard = [
  [],
  [],
  [],
];

const usersRanking = [];
let userId = 0;
const usedNumbersInCard = [];
const usedNumbersInGame = [];

const lineCounter = [false, false, false];

const askForName = () => {
  usersRanking[userId] = [];
  playerName = prompt("Hello! Tell me your name.")
  usersRanking[userId].push(playerName);
  console.log(`Enjoy your game ${playerName}!`);
};

const generateRandomNumbers = () => {
  do {
    cardNumber = Math.floor(Math.random() * 29) + 1;
    if (usedNumbersInCard.includes(cardNumber)){
      return generateRandomNumbers();
    }
    usedNumbersInCard.push(cardNumber);
  } while (usedNumbersInCard.length < 15);
};

const generateCard = () => {
  generateRandomNumbers();
  let globalCounter = 0;
  userCard.forEach((emptyLine) => {
    for (let i = 0; i < 5; i++){
      emptyLine.push(usedNumbersInCard[globalCounter]);
      globalCounter++;
    };
  });
  };

const showPlayerCard = () => {
  console.log("Your actual card is this:");
  userCard.forEach((userLine) => {
    console.log("");
    console.log(userLine.join(" - "));
  });
};

const randomNumber = () => {
  roundNumber = Math.floor(Math.random() * 29) + 1;
  if (usedNumbersInGame.includes(roundNumber)) {
    return randomNumber();
  }
  usedNumbersInGame.push(roundNumber);
  console.log(`It has been drawn the number... ${roundNumber}!`);
  return roundNumber;
};

const changeNumber = (numberToChange) => {
  for (let i = 0; i < userCard.length; i++) {
    for (let j = 0; j < userCard[i].length; j++) {
      if (userCard[i][j] === numberToChange) {
        userCard[i][j] = "X";
      }
    }
  }
};

const checkForMatch = (actualNumber) => {
  let isAMatch = false;
  userCard.forEach((userLine) => {
    userLine.forEach((userNumber) => {
      if (userNumber === actualNumber) {
        console.log(`Congratulations, we've got a match!`);
        isAMatch = true;
        changeNumber(actualNumber);
        showPlayerCard();
      }
    });
  });
  if (!isAMatch) {
    console.log(`Better luck for the next round!`);
  }
};

const checkForLine = () => {
    for (let i = 0; i < userCard.length; i++) {
      let isLine = userCard[i].every((numberInLine) => numberInLine === "X");
      if (isLine && lineCounter[i] === false){
          console.log(`You've completed line number ${i+1}!`);
          lineCounter[i] = true;
      }
    };
  };

const checkForBingo = () => {
  for (let i = 0; i < userCard.length; i++) {
    for (let j = 0; j < userCard[i].length; j++) {
      if (userCard[i][j] !== "X") {
        return false;
      }
    }
  }
  return true;
};

const selectCard = () => {
  generateCard();
  showPlayerCard();
  const keepCard = confirm(`Do you want to keep this card?`);
  if(!keepCard){
    cleanCard();
    return selectCard();
  };
};

const cleanCard = () => {
  userCard.forEach((cleanLine) => {
    cleanLine.splice(0);
  });
  usedNumbersInCard.splice(0);
};

const scoreSystemExplanation = () => {
  console.log('The scoring is inverse to the numbers of rounds until you win.');
  console.log('The perfect score is 100 points, equivalent to wining in 15 rounds.');
  console.log('As long as you need more rounds to get a BINGO, your score will decrease 1 point per round.');
};

const cleanAll = () => {
  usedNumbersInGame.splice(0);
  cleanCard();
  won = false;
  for (let i = 0; i < lineCounter.length; i++){
    lineCounter[i] = false;
  };
};

const playBingo = () => {
  let won;
  let keepPlaying;
  let myScore;
  askForName();
  scoreSystemExplanation();
  selectCard();
  let start = confirm(`Do you want to play?`);
  if (start) {
    do {
      let drawnNumber = randomNumber();
      checkForMatch(drawnNumber);
      checkForLine();
      won = checkForBingo();
      if (won) {
        keepPlaying = false;
        console.log(`BINGO! You've won in ${usedNumbersInGame.length} rounds!`);
        myScore = 115-usedNumbersInGame.length;
        usersRanking[userId].push(myScore);
        console.log(`Your score is ${myScore}.`);
        userId++;
      } else {
        keepPlaying = confirm("Do you want to keep playing?");
      }
    } while (keepPlaying);
  };
  let playAgain = confirm(`Do you want to play again?`);
  if(playAgain){
    cleanAll();
    return playBingo();
  } else {
    console.log(`Thanks for playing! Here is the final ranking.`);
    const sortedRanking = usersRanking.sort((a, b) => b[1] - a[1]);
    sortedRanking.forEach((singleUser) => {
      console.log(singleUser.join(` - `));
    });
  };
};

playBingo();
