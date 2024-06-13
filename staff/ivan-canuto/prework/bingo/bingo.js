const askUserName = () => {
  let namePlayer = prompt("Please, enter your name to start playing bingo.");
  if (!namePlayer) {
    alert("You haven't entered a name, please enter one.");
    return askUserName();
  }
  return namePlayer;
};

const showExplanations = () => {
  console.log(
    "Hello, welcome to our bingo game, please, take a card and enjoy it. :)\n\n"
  );
  console.log(
    "From the start you will have to choose a bingo card, if you don't like the one that we sow you, you can replace it for another one."
  );
  console.log(
    "Once you have the card, the bingo game will start. If you don't know how to play we explain you the basics thigs."
  );
  console.log(
    'There will be turns, and each turn a number will be shown off, and if the one shown matches with one in your card, this will be replaced with an x.'
  );
  console.log(
    "If there is in your card a completed row with 'X', that will mean you have completed a line, you will earn 100 points and an message in the screen will be shown saying: '¡¡LINEA!!\nAnd if finally you complete the whole bingo card with 'X' you will earn 400 points and a message will be shown off saying ¡¡'BINGO!!', meaning that you won the game."
  );
  console.log(
    "Each turn passed without having the bingo card completed you will lose 2 points, so you better hurry up."
  );
  console.log(
    "Once '!BINGO!' is shown, it will mean that the game has already finished"
  );
  console.log(
    "At the end of the game a table with the players' score will be shown and you'll can compare youself with the rest of the them."
  );
  console.log(
    "Of course, once the game is finished, you will have the oportunity to play again,anyways, we hope you'll enjoy it."
  );
};

const getRandomNumber = () => {
  let number = Math.floor(Math.random() * 100);
  while (number === 0) {
    number = Math.floor(Math.random() * 100);
  }
  return number;
};

const hasRepeatingNumber = (array) => {
  let numbersBingo = [];
  for (let i = 0; i < array.length; i++) {
    numbersBingo.push(array[i].number);
  }
  if (numbersBingo.length !== new Set(numbersBingo).size) {
    return true;
  }
  return false;
};

const showBingoCard = (array) => {
  console.log(
    `${array[0].number}  ${array[3].number}  ${array[6].number}  ${array[9].number}  ${array[12].number}\n${array[1].number}  ${array[4].number}  ${array[7].number}  ${array[10].number}  ${array[13].number}\n${array[2].number}  ${array[5].number}  ${array[8].number}  ${array[11].number}  ${array[14].number}`
  );
};

const askChangeBingoCard = (array) => {
  showBingoCard(array);

  let question = confirm(
    "If you like this bingo card you can press 'Acceppt' to continue and start the game.\nBut if not you can press 'Cancel' to get another one."
  );

  if (question) {
    console.log("------------------");
    alert("So this is the bingo card you selected. Let's start the game!");
    return false;
  } else if (!question) {
    console.log("------------------");
    return true;
  }
};

const getBingoCard = () => {
  let bingoCard = [];
  let numbersBingoCard = [];
  for (let i = 0; i < 15; i++) {
    let numberBingo = getRandomNumber();
    numbersBingoCard.push(numberBingo);
  }
  numbersBingoCard = numbersBingoCard.sort((a, b) => a - b);

  bingoCard = numbersBingoCard.map((number) => {
    return { number: number, matched: false };
  });

  while (hasRepeatingNumber(bingoCard)) {
    bingoCard = getBingoCard();
  }
  return bingoCard;
};

const renovateBingoCard = () => {
  let bingoCard = getBingoCard();
  if (askChangeBingoCard(bingoCard)) return renovateBingoCard();
  return bingoCard;
};

let numbersMatched = [];
let calledNumbers = [];

const generateNewTurn = (array) => {
  let numberBingo = getRandomNumber();
  if (calledNumbers.includes(numberBingo)) {
    return true;
  }
  calledNumbers.push(numberBingo);

  console.log("----NEW TURN----");
  alert(`The number generated is ${numberBingo}.`);
  for (let i = 0; i < array.length; i++) {
    if (array[i].number === numberBingo) {
      array[i].matched = true;
      numbersMatched.push(array[i]);
      console.log(
        `We have a coincidence, let's replace the number ${array[i].number} with an 'X'.`
      );
      alert(
        `The number ${array[i].number} matches with a number in our bingo card!`
      );
      array[i].number = "X";
    }
  }

  showBingoCard(array);
  checkCompletedRows(array);
  if (numbersMatched.length !== 15) {
    let questionExit = confirm(
      "Do you want to continue?\nIf yes press 'Accept', if no press 'Cancel'."
    );
    if (!questionExit) {
    alert("Thanks for playing our bingo game, we hope you enjoy it, bye!");
    return false;
  }
  
  }
  if (numbersMatched.length === 15) return false;
  else return true;
};

let linea = false;

const checkCompletedRows = (array) => {
  const rowsCompleted = [];
  const rows = [
    [0, 3, 6, 9, 12],
    [1, 4, 7, 10, 13],
    [2, 5, 8, 11, 14],
  ];

  for (let row of rows) {
    if (row.every((index) => array[index].number === "X") && linea === false) {
      rowsCompleted.push(row);
      linea = true;
    }
  }
  
  
  if (rowsCompleted.length === 1) {
    console.log("You have madea Linea. You have won 100 points.");
    alert("LINEA!!\nYou have madea Linea!");
  }
};

const getBingoExit = (namePlayer, players) => {
  alert('Congratulations! You have already completed the "Bingo"!!.');
  let pointsLost = calledNumbers.length * 2;
  let totalPoints = 500 -pointsLost;
  console.log(
    `You have lasted ${calledNumbers.length} turns to complete the bingo.`
  );
  console.log(
    `This means that you have ${pointsLost} less.\nYour total number of points is ${500 - pointsLost}.`
  );
  players.push({name: namePlayer, points: totalPoints})

  players.sort((a, b) => b.points - a.points)
  console.log(`Points ranking:\n`);

  for (let i = 0; i < players.length; i++) {
    console.log(`${i + 1}# ${players[i].name} with ${players[i].points} points.`)
  }
  if (players[0].name === namePlayer) {
    console.log("Congraturlations! You have finished in first position!");
    alert("Congraturlations! You have finished in first position!");
  }
  alert('You have ended our bingo game, we hope you enjoy it.')
};

const getFarewell = ()=>{
  let questionExit = confirm("If you really enjoy it and wanto to play it again, you can!\nPress 'Accept' to play again or press 'Cancel' for exit.")

  if (questionExit) {
    calledNumbers = [];
    numbersMatched = []
    linea = false
    bingo()
  }
  else {
    alert('Thank you for playing "Bingo", have a good day, bye!')
    console.log('Thank you for playing "Bingo", have a good day, bye!')
  }
}

const bingo = () => {
  alert(
    "Hello! Welcome to our bingo game, with this app you could play bingo digitally."
  );

  let namePlayer = askUserName();
  alert(
    `Hello ${namePlayer}! From now on, we will explain you how to play and show you all the data in the console. So pay attention to what happens there.`
  );

  showExplanations();
  alert("Please read the information appearing in the console.");
  alert(
    `Now that you read the explanations, a bingo card has been given to you.\nThis bingo card is going to be shown in the console.`
  );

  console.log("------------------");
  let bingoCard = renovateBingoCard();
  alert("Now let'ts start from the first turn, are you ready?");

  console.log('BINGO! The game has started!')
  alert('BINGO!\nThe game has started!')

  let newTurn = generateNewTurn(bingoCard);
  while (newTurn) {
    newTurn = generateNewTurn(bingoCard);
  }

  if (numbersMatched.length !== 15) return;
  
  const players = [
    {name: 'Jesús', points: 306},
    {name: 'Pilar', points: 308},
    {name: 'Jesús', points: 310},
  ]

  getBingoExit(namePlayer, players);
  getFarewell();
};

bingo();
