debugger;

const word = "ajedrez";
const alphabet = "abcdefghijklmnopqrstuvwxyz";

const wordsToGuess = word
  .split("")
  .map((letter) => ({ letter: letter, isGuessed: false }));

console.log(wordsToGuess);

const getRandomLetter = () => {
  const letterIndex = +(Math.random() * (alphabet.length - 1)).toFixed(0);
  return alphabet[letterIndex];
};
