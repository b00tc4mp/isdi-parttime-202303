const createBingoCard = (bingoCard) => {
  let allNumbers = [];

  while (allNumbers.length < 15) {
    let number = Math.floor(Math.random() * 91);
    if (!allNumbers.includes(number) && number !== 0) {
      allNumbers.push(number);
    }
  }

  allNumbers = allNumbers.sort(compareNumbers);

  bingoCard[0] = [];
  bingoCard[1] = [];
  bingoCard[2] = [];

  for (let i = 0; i < 5; i++) {
    bingoCard[0].push(allNumbers.shift());
    bingoCard[1].push(allNumbers.shift());
    bingoCard[2].push(allNumbers.shift());
  }
};

const compareNumbers = (a, b) => {
  return a - b;
};

const generateNumberForBingo = (allNumbersBingo) => {
  const position = Math.floor(Math.random() * allNumbersBingo.length);
  const number = allNumbersBingo[position];
  allNumbersBingo.splice(position, 1);

  return { allNumbersBingo, number };
};

const spinBingoDrum = (bingoCard, count, allNumbersBingo) => {
  let randomNumbersBingoDrum = [];
  let isLine = false;
  let continueTurn = true;
  let isBingo = false;

  do {
    let infoNumberForBingo = generateNumberForBingo(allNumbersBingo);
    let number = infoNumberForBingo.number;
    allNumbersBingo = infoNumberForBingo.allNumbersBingo;

    if (!randomNumbersBingoDrum.includes(number)) {
      randomNumbersBingoDrum.push(number);

      count++;
      console.log(`Round ${count}: The number is ${number} 🔢`);
      alert(`Round ${count}: The number is ${number} 🔢`);

      for (let i = 0; i < bingoCard.length; i++) {
        for (let j = 0; j < bingoCard[i].length; j++)
          if (number === bingoCard[i][j]) {
            bingoCard[i][j] = 'X';
          }
      }

      console.table(bingoCard);

      if (!isLine) {
        if (
          0 === bingoCard[0].filter((number) => number !== 'X').length ||
          0 === bingoCard[1].filter((number) => number !== 'X').length ||
          0 === bingoCard[2].filter((number) => number !== 'X').length
        ) {
          isLine = true;
          console.log('LINE!! 👏');
          alert(
            'Congratulations! You have done LINE! 🎉 We continue for bingo 😜'
          );
        }
      }

      isBingo =
        bingoCard[0].filter((number) => number !== 'X').length === 0 &&
        bingoCard[1].filter((number) => number !== 'X').length === 0 &&
        bingoCard[2].filter((number) => number !== 'X').length === 0;

      if (!isBingo) {
        continueTurn = confirm('Do you want continue? 😉');
      }
    }
  } while (continueTurn && !isBingo);

  if (
    0 === bingoCard[0].filter((number) => number !== 'X').length &&
    0 === bingoCard[1].filter((number) => number !== 'X').length &&
    0 === bingoCard[2].filter((number) => number !== 'X').length
  ) {
    console.log('BINGO!! 👏');

    alert('Congratulations! You have done BINGO! 🎉');

    alert(`You have completed the game in ${count} turns 🏆`);
  }

  return count;
};

const generateNewCard = (bingoCard) => {
  do {
    createBingoCard(bingoCard);
    console.table(bingoCard);
  } while (confirm('Do you want a new Bingo card? 🔢'));
};

const createPointSystem = (count) => {
  if (15 <= count && count < 50) {
    return 100;
  }

  if (50 <= count && count < 75) {
    return 50;
  }

  if (75 <= count && count < 85) {
    return 25;
  }

  return 0;
};

let pointsRanking = [
  { name: 'Carolina', points: 100 },
  { name: 'Elena', points: 100 },
  { name: 'David', points: 75 },
  { name: 'Lucía', points: 25 },
  { name: 'Jorge', points: 50 },
  { name: 'Sara', points: 0 },
];

const compareRanking = (a, b) => {
  return b.points - a.points;
};

const createPointsRanking = (countPoints, user) => {
  pointsRanking.push({ name: user, points: countPoints });
  pointsRanking = pointsRanking.sort(compareRanking);

  let rankingInfo = '';
  pointsRanking.forEach((pointRanking) => {
    rankingInfo += `\nName: ${pointRanking.name}     Points: ${pointRanking.points}`;
  });
  return alert(`This is the Points Ranking 🔢🏆:\n${rankingInfo}`);
};

const bingoGame = () => {
  let allNumbersBingo = [];
  for (let i = 1; i < 91; i++) {
    allNumbersBingo.push(i);
  }

  const bingoCard = [];

  alert("Hello, let's go to play Bingo! 🎱");

  alert(
    "Before we start, I'll show you how the points system works:\n\n-If you get bingo before 50 turns, you get 100 points 🟢\n-If you get bingo before 75 turns, you get 50 points 🔵\n-If you get bingo before 85 turns, you get 25 points 🟠\n-If you get bingo after 85 turns, you get 0 points 🔴"
  );

  const user = prompt("What's your name? 🧡");

  alert(`Ok, ${user}, we are going to generate your Bingo card 🔢`);

  generateNewCard(bingoCard);

  alert("You're already chosen your Bingo card, good luck! 🍀");

  alert("Ok, let's go with the first round! 👏");

  let count = spinBingoDrum(bingoCard, 0, allNumbersBingo);

  let points = createPointSystem(count);

  alert(`Your points are ${points} 😳`);

  createPointsRanking(points, user);
};

do {
  bingoGame();
} while (confirm('Do you want to play again? 🥰'));

alert('Thanks for using me! Goodbye 🧡');
