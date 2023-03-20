const word = 'ajedrez';
const wordsToGuess = word.split("");
console.log(wordsToGuess);
const listOfLetter = [];

for (let i = 0; i < word.length; i++){
    listOfLetter.push({
        letter: word[i],
        isGuessed: false
    });
}

console.log(listOfLetter);

//const letters = {letter: 'a', isGuessed: false};