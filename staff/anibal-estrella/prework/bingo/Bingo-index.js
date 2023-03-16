//https://github.com/isdi-coders-env/pre-curso/blob/master/tema4-functions/tema4-proyecto-bingo.md
const bingo = () => {
  let points=0;

  //ask userName
  const askUserName = () => {
    const answer = prompt(
      `Welcome to The ISDI Bingo Game!\n\nEach youser has ${numberOfTurns} points.
For every turn you play you will loose 1 point.
Bingo ends either if you loose all points or complete your card.
\nPlease, input your user name.\n\nPress "Cancel" to leave the Bingo game.`,
      "Anibal"
    );
    if (!answer) {
      alert("Bye!");
      return;
    } else {
      return answer.toUpperCase();
    }
  };

  //say bye to user
  const sayBye = (user) => {
    alert(`Bye ${user}!\nThank you for playing Bingo!`);
    console.log(`// Shutting down Bingo Game!`);
  };
  //display name
  const showName = (data) => {
    console.log(`// Hi ${data}! \n It's BINGO time!`);
  };


  //Random number GENERATOR Function
  function randomNumberGenerator(min, max) {
    return Math.ceil(Math.random(min, max) * max);
  }

  //Function to generate ONE LINE with random numbers
  const randomLineGenerator = () => {
    let lines = [
      { number: randomNumberGenerator(min, max), matched: false },
      { number: randomNumberGenerator(min, max), matched: false },
      { number: randomNumberGenerator(min, max), matched: false },
      { number: randomNumberGenerator(min, max), matched: false },
      { number: randomNumberGenerator(min, max), matched: false },
    ];

    return lines;
  };

  //Function to find Duplicates
  function findDuplicates(arr) {
    return arr.filter((currentValue, currentIndex) => arr.indexOf(currentValue) !== currentIndex);
  }

  // Function to generate the X  lines of random numbers ARRAY
  const linesGenerator = (data, lines) => {
    let numbers = [];
    let match = [];
    let i = 0;
    while (i !== lines) {
      data = randomLineGenerator();

      i++;
      data.forEach((val) => {
        numbers.push(val.number);
        match.push(val.matched);
        finalLines.push({ number: val.number, matched: val.matched });
      });
    }
    return finalLines;
  };

  //Function to SHOW card in a in 3 lines
  const showCard = (data) => {
    let numbersInCard = [];
    data.forEach((element) => numbersInCard.push(element.number));
    let line1 = numbersInCard.slice(0, 5).join(" ");
    let line2 = numbersInCard.slice(5, 10).join(" ");
    let line3 = numbersInCard.slice(10, 15).join(" ");
    let showNumbersInCard = `${line1}\n${line2}\n${line3}`;

    return showNumbersInCard;
  };

  //Function to confirm card numbers and return them
  const confirmCardNumbers = (card, linesOnCard) => {
    console.log(
      `// Do you want to keep this card numbers?\n${showCard(
        card
      )}\nType "yes" to keep the card.\nType "no" to generate a new card.\n\nPress "CANCEL" to EXIT.`
    );
    let confirmCard = prompt(
      `Do you want to keep this card numbers?\nType "yes" to keep it or "no" to generate a new card.\n\n${showCard(card)}\n\nPress "CANCEL" to EXIT.`,
      "yes"
    );
    if (confirmCard == null) {
      return;
    } else if (confirmCard !== "yes" && confirmCard !== "no") {
      confirmCardNumbers(card, linesOnCard);
      console.log("Oops!");
    } else if (confirmCard === "yes") {
      return card;
    } else if (confirmCard === "no") {
      return false;
    }
  };

  // function to SHOW COFIRMED card
  const showConfirmedCard = (card) => {
    console.log(`// You've chosen to play with the card containing the following numbers:\n${showCard(card)}`);
  };

  //Check if number is on the card mark x
  const checkNumberOnCard = (card, number, userName) => {
    card.indexOf(
      card.forEach((element, index) => {
        if (element.number === number) {
          numberFound.push(number);
          card[index].number = "X";
          card[index].matched = true;
        }
      })
    );
    if (numberFound.length === 0) {
      console.log(`// The number: ${number} is not on your card.\nThis is your card result:\n\n${showCard(card)}`);
    } else {
      console.log(`// These were the numbers found on your card:\n// ${numberFound}.`);
      console.log(`// This is your card result:\n\n${showCard(card)}`);

      return card;
    }
    return card;
  };



  let repeatedBalls = [];
  // turn function
  const newTurn = (confirmedCard, userName) => {

    if (numberOfTurns !== turnsCount++) {
      ballNumber = randomNumberGenerator(min, max);

      // console.table(ballsPlayed);

     while(ballsPlayed.find((i) => i.ball === ballNumber)) {
        let repeatedBall=ballsPlayed.find((i) => i.ball === ballNumber);
        repeatedBalls.push(ballsPlayed.find((i) => i.ball === ballNumber));
          ballNumber = randomNumberGenerator(min, max);
      };

        ballsPlayed.push({ turn: turnsCount, ball: ballNumber });

      turnsUsed = turnsCount;
      points = numberOfTurns - turnsCount;
      console.log(
        `/////////// turn number: ${turnsCount} Points left: ${points} of ${numberOfTurns} /////////////////////////////////////////////////`
      );
      console.log(`// The current ball number is: ${ballNumber}`);

      let turnResult = checkNumberOnCard(confirmedCard, ballNumber, userName);
      if (checkCardLine(confirmedCard, userName)) {
        showBallsPlayed();
        sayBye(userName);
        return;
      }
      if (!confirmTurn(userName, confirmedCard, ballNumber)) {
        sayBye(userName);
        return;
      }
      if (turnsCount === numberOfTurns) {
        console.log("// End of turns reached. /////////////////////////////////////////////////\nThese were the balls played each turn:\n");
        showBallsPlayed();
        alert(
          `${userName}!\nYou have ${points} points out of ${numberOfTurns}:, you have no more points left!\nThis is your final card of the game:\n\n${showCard(turnResult)}`
        );
        console.log(`This is your final card of the game:\n\n${showCard(turnResult)}`);
        sayBye(userName);
        return;
      } else if (turnsCount < numberOfTurns + 1) {
        if (turnResult === false) {
          sayBye(userName);
          return;
        } else {
          newTurn(confirmedCard, userName);
        }
      }
    }
    return;
  };
  // function to show all balls played each turn
  const showBallsPlayed = () => {
    ballsPlayed.forEach((element) => console.log(`turn: ${element.turn} > ball: ${element.ball}`));
  };

  //Function to confirm TURN
  const confirmTurn = (userName, confirmedCard, ballNumber) => {
    let confirmation = confirm(
      `${userName}!\nThe ball number played was: ${ballNumber}\nPoints left:${
points      }\nThis is your current card result:\n\n${showCard(
        confirmedCard
      )}\n\nPress "OK" to continue with next turn.\n\nPress "CANCEL" to end game.\n${showCard(confirmedCard)}`
    );
    return confirmation;
  };

  // Function to ask for new user
  let usersRanking = [
    { userName: "Emma", points: 12 },
    { userName: "Scott", points: 2 },
    { userName: "Eddie", points: 5 },
    { userName: "Dave", points: 0 },
  ];



  //function to show users Ranking
const sortUsersRanking = (usersRanking, userName,points) => {
    usersRanking.push({ userName: userName.toUpperCase(), points: points });
  usersRanking.sort((a, b) => {
    return a.points - b.points;
  });
  return usersRanking
};

const showRanking = (usersRanking)=>{
  console.log(`
██████  ██ ███    ██  ██████   ██████      ██████   █████  ███    ██ ██   ██ ██ ███    ██  ██████
██   ██ ██ ████   ██ ██       ██    ██     ██   ██ ██   ██ ████   ██ ██  ██  ██ ████   ██ ██       ██
██████  ██ ██ ██  ██ ██   ███ ██    ██     ██████  ███████ ██ ██  ██ █████   ██ ██ ██  ██ ██   ███
██   ██ ██ ██  ██ ██ ██    ██ ██    ██     ██   ██ ██   ██ ██  ██ ██ ██  ██  ██ ██  ██ ██ ██    ██ ██
██████  ██ ██   ████  ██████   ██████      ██   ██ ██   ██ ██   ████ ██   ██ ██ ██   ████  ██████
`);
  usersRanking.forEach((element) => {
    console.log(`// user:${element.userName}, points ${element.points}`);
  });
}


  //function to check card won a LINE
  let countLines = [
    { line1: [], shout: false },
    { line2: [], shout: false },
    { line3: [], shout: false },
  ];
  const checkCardLine = (confirmedCard, userName) => {
    confirmedCard.forEach((element, i) => {
      if (i <= 4 && element.matched && !countLines[0].line1.includes(i)) {
        countLines[0].line1.push(i);
      } else if (i > 4 && i <= 9 && element.matched && !countLines[1].line2.includes(i)) {
        countLines[1].line2.push(i);
      } else if (i > 9 && element.matched && !countLines[2].line3.includes(i)) {
        countLines[2].line3.push(i);
      }
    });
    if (countLines[0].line1.length + countLines[1].line2.length + countLines[2].line3.length === 15) {
      console.log(`${userName},
██████  ██ ███    ██  ██████   ██████  ██ ██
██   ██ ██ ████   ██ ██       ██    ██ ██ ██
██████  ██ ██ ██  ██ ██   ███ ██    ██ ██ ██
██   ██ ██ ██  ██ ██ ██    ██ ██    ██
██████  ██ ██   ████  ██████   ██████  ██ ██
total turns: ${ballsPlayed.length}
      `);
      alert(`${userName}, BINGO!!!`);
      return true;
    } else if (countLines[0].line1.length === 5 && !countLines[0].shout && !countLines[1].shout && !countLines[2].shout) {
      countLines[0].shout = true;
      console.log(`// ${userName},
██      ██ ███    ██ ███████ ██
██      ██ ████   ██ ██      ██
██      ██ ██ ██  ██ █████   ██
██      ██ ██  ██ ██ ██
███████ ██ ██   ████ ███████ ██


      `);
      alert(`LINE!`);
    } else if (countLines[1].line2.length === 5 && !countLines[1].shout && !countLines[0].shout && !countLines[2].shout) {
      countLines[1].shout = true;
      console.log(`// ${userName},
██      ██ ███    ██ ███████ ██
██      ██ ████   ██ ██      ██
██      ██ ██ ██  ██ █████   ██
██      ██ ██  ██ ██ ██
███████ ██ ██   ████ ███████ ██

       `);
      alert(`LINE!`);
    } else if (countLines[2].line3.length === 5 && !countLines[0].shout && !countLines[1].shout && !countLines[2].shout) {
      countLines[2].shout = true;
      console.log(`// ${userName},
██      ██ ███    ██ ███████ ██
██      ██ ████   ██ ██      ██
██      ██ ██ ██  ██ █████   ██
██      ██ ██  ██ ██ ██
███████ ██ ██   ████ ███████ ██
`);
      alert(`LINE!`);
    }
  };

  //function to show user won a LINE
  const showUserCompletedLine = (line) => {
    if (completedLines.line1 === true) {
      alert(`LINE!`);
    }
  };

  // BINGO SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const min = 1;
  const max = 100;
  const numberOfTurns = 100;
  let turnsUsed = 0;
  //save ball number
  let ballNumber = randomNumberGenerator(min, max);

  let numberFound = [];
  const linesOnCard = 3;
  let singleLine = randomLineGenerator();
  let finalLines = [];
  let turnsCount = 0;
  let ballsPlayed = [];
  let completedLines = { line1: false, line2: false, line3: false };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // function to run BINGO >>>>>

  const playBingo = () => {
    console.log("//START//**************************************");
    const userName = askUserName();
    if (userName === undefined) {
      return;
    }
    showName(userName);
    linesGenerator(singleLine, linesOnCard);

    let confirmedCard = confirmCardNumbers(finalLines, linesOnCard);

    if (confirmedCard === undefined) {
      sayBye(userName);
      return;
    }
    while (confirmedCard == false) {
      console.log("// Generating another card //////////////////////////////////////////");
      singleLine = randomLineGenerator();

      finalLines = [];
      linesGenerator(singleLine, linesOnCard);
      confirmedCard = confirmCardNumbers(finalLines, linesOnCard);
    }
    showConfirmedCard(confirmedCard);
    newTurn(confirmedCard, userName);
    sortUsersRanking(usersRanking, userName,points);
    showRanking(usersRanking)
    console.log("//END//***************************************");
    return;
  };

  playBingo();
};

const bingoGame = bingo();
