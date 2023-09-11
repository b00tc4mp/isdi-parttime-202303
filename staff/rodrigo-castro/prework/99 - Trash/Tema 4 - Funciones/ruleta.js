
const word = "ajedrez";
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const usedNumbers = [];
let rounds = 0;

const wordsToGuess = word
  .split("")
  .map((letter) => ({letter, isGuessed: false }));

console.log(wordsToGuess);

const getRandomLetter = () => {
  const randomNumber = Math.floor(Math.random() * (alphabet.length - 1));

  if (usedNumbers.includes(randomNumber)){
    return getRandomLetter();
  };

  usedNumbers.push(randomNumber);

  return alphabet.at(randomNumber);
};

const checkLetter = () => {
  const randomLetter = getRandomLetter();
  alert(`Your letter is...${randomLetter}!`);
  wordsToGuess.forEach((wordToGuess) => {
    if (wordToGuess.letter === randomLetter){
      wordToGuess.isGuessed = true;
    }
  })
}

const deathRullet = () => {
  let won;
  do {
    checkLetter();
    won = wordsToGuess.every((wordToGuess) => {
      return wordToGuess.isGuessed;
    });
    console.table(wordsToGuess);
  } while(!won);

    alert(`Congratulations! You've won in ${usedNumbers.length}`);
}