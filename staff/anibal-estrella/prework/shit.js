const word = "ajedrez";
const alphabet="abcdefghijklmnopqrstuvwxyz";
// generate an object from the word
const wordsToGuess= word.split("").map((letter) => ({letter: letter, isGuessed: false }));


