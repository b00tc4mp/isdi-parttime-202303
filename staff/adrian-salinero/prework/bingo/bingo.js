// const generateNewBingoCard = () => {
//   const bingoCard  = Array.from({length: 10}, () => Math.floor(Math.random() * 10));
//   console.log(`El bingo card es ${bingoCard}`);
//   return bingoCard = Array.from({length: 10}, () => Math.floor(Math.random() * 10));
// }

const generateNewBingoCard = () => {
  const bingoCard = Array.from({ length: 5 } , () => ({ number: Math.floor(Math.random() * 10), matched: false }));
  console.log(`The bingo card is: ${bingoCard}`);
  return bingoCard;
}

const askNewBingoCard  = () => {
  return confirm ("Do you want to get a new bingo card?")
}

const getRandomNumber = () => {
  return Math.floor(Math.random() * 10);
};

const startNextTurn = (bingoCard, randomNumber) => {
  for (let i = 0; i < bingoCard.length; i++){
    if (randomNumber === bingoCard[i]){
      bingoCard[i] = "X";
      console.log(`There is a match because the number ${randomNumber} has been found in the bingo card. The new bingo card after replacing the ${randomNumber} with "X" is: ${bingoCard}`);
    }
  }
}

const askNewTurn = () => {
  return confirm ("Do you want to get a new number?")
}


const playBingo = () => {

  let isKeepPlaying; 
  let randomNumber;

  let bingoCard = generateNewBingoCard();
  let isNewBingoCard;

  do {
    isNewBingoCard = askNewBingoCard()
      if (isNewBingoCard) {
        bingoCard = generateNewBingoCard();
      }
  } while (isNewBingoCard)


  do {
    isKeepPlaying = askNewTurn(); 

      if (isKeepPlaying){
        randomNumber = getRandomNumber()
        console.log(`The random number is ${randomNumber}`)
        startNextTurn(bingoCard, randomNumber);
      }

  } while (isKeepPlaying)

  alert("Bye!")

}

playBingo();