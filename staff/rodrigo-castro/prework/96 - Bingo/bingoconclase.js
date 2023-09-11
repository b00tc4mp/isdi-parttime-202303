class BingoGame {
  userCard = [[], [], []];
  usersRanking = [];
  userId = 0;
  usedNumbersInCard = [];
  usedNumbersInGame = [];
  lineCounter = [false, false, false];

  constructor() {
    alert("Welcome!");
    this.playBingo();
  }

  askForName() {
    this.usersRanking[this.userId] = [];
    const playerName = prompt("Hello! Tell me your name.");
    this.usersRanking[this.userId].push(playerName);
    console.log(`Enjoy your game ${playerName}!`);
  }

  generateRandomNumbers() {
    do {
      let cardNumber = Math.floor(Math.random() * 29) + 1;
      if (this.usedNumbersInCard.includes(cardNumber)) {
        return this.generateRandomNumbers();
      }
      this.usedNumbersInCard.push(cardNumber);
    } while (this.usedNumbersInCard.length < 15);
  }

  generateCard() {
    this.generateRandomNumbers();
    let globalCounter = 0;
    this.userCard.forEach((emptyLine) => {
      for (let i = 0; i < 5; i++) {
        emptyLine.push(this.usedNumbersInCard[globalCounter]);
        globalCounter++;
      }
    });
  }

  showPlayerCard() {
    console.log("Your actual card is this:");
    this.userCard.forEach((userLine) => {
      console.log("");
      console.log(userLine.join(" - "));
    });
  }

  randomNumber() {
    let roundNumber = Math.floor(Math.random() * 29) + 1;
    if (this.usedNumbersInGame.includes(roundNumber)) {
      return this.randomNumber();
    }
    this.usedNumbersInGame.push(roundNumber);
    console.log(`It has been drawn the number... ${roundNumber}!`);
    return roundNumber;
  }

  changeNumber(numberToChange) {
    for (let i = 0; i < this.userCard.length; i++) {
      for (let j = 0; j < this.userCard[i].length; j++) {
        if (this.userCard[i][j] === numberToChange) {
          this.userCard[i][j] = "X";
        }
      }
    }
  }

  checkForMatch(actualNumber) {
    let isAMatch = false;
    this.userCard.forEach((userLine) => {
      userLine.forEach((userNumber) => {
        if (userNumber === actualNumber) {
          console.log(`Congratulations, we've got a match!`);
          isAMatch = true;
          this.changeNumber(actualNumber);
          this.showPlayerCard();
        }
      });
    });
    if (!isAMatch) {
      console.log(`Better luck for the next round!`);
    }
  }

  checkForLine() {
    for (let i = 0; i < this.userCard.length; i++) {
      let isLine = this.userCard[i].every(
        (numberInLine) => numberInLine === "X"
      );
      if (
        isLine &&
        this.lineCounter.every(
          (singleLineCounter) => singleLineCounter === false
        )
      ) {
        console.log(`You've completed line number ${i + 1}!`);
        this.lineCounter[i] = true;
      }
    }
  }

  checkForBingo() {
    for (let i = 0; i < this.userCard.length; i++) {
      for (let j = 0; j < this.userCard[i].length; j++) {
        if (this.userCard[i][j] !== "X") {
          return false;
        }
      }
    }
    return true;
  }

  selectCard() {
    this.generateCard();
    this.showPlayerCard();
    const keepCard = confirm(`Do you want to keep this card?`);
    if (!keepCard) {
      this.cleanCard();
      return this.selectCard();
    }
  }

  cleanCard() {
    this.userCard.forEach((cleanLine) => {
      cleanLine.splice(0);
    });
    this.usedNumbersInCard.splice(0);
  }

  scoreSystemExplanation() {
    console.log(
      "The scoring is inverse to the numbers of rounds until you win."
    );
    console.log(
      "The perfect score is 100 points, equivalent to wining in 15 rounds."
    );
    console.log(
      "As long as you need more rounds to get a BINGO, your score will decrease 1 point per round."
    );
  }

  cleanAll() {
    this.usedNumbersInGame.splice(0);
    this.cleanCard();
    for (let i = 0; i < this.lineCounter.length; i++) {
      this.lineCounter[i] = false;
    }
  }

  playBingo() {
    let won;
    let keepPlaying;
    let myScore;
    this.askForName();
    this.scoreSystemExplanation();
    this.selectCard();
    let start = confirm(`Do you want to play?`);
    if (start) {
      do {
        let drawnNumber = this.randomNumber();
        this.checkForMatch(drawnNumber);
        this.checkForLine();
        won = this.checkForBingo();
        if (won) {
          keepPlaying = false;
          console.log(
            `BINGO! You've won in ${this.usedNumbersInGame.length} rounds!`
          );
          myScore = 115 - this.usedNumbersInGame.length;
          this.usersRanking[this.userId].push(myScore);
          console.log(`Your score is ${myScore}.`);
          this.userId++;
        } else {
          keepPlaying = confirm("Do you want to keep playing?");
        }
      } while (keepPlaying);
    }
    let playAgain = confirm(`Do you want to play again?`);
    if (playAgain) {
      this.cleanAll();
      return this.playBingo();
    } else {
      console.log(`Thanks for playing! Here is the final ranking.`);
      const sortedRanking = this.usersRanking.sort((a, b) => b[1] - a[1]);
      sortedRanking.forEach((singleUser) => {
        console.log(singleUser.join(` - `));
      });
    }
  }
}

const newBingo = new BingoGame();