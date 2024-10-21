console.log('hello');

const word = "ajedrez";
const alphabet="abcdefghijklmnopqrstuvwxyz";
const usedNumbers= [];
// generate an object from the word
const wordsToGuess= word.split("").map((letter) => ({letter: letter, isGuessed: false }));

const getRandomLetter = () => {
    const randomNumber = Math.floor(Math.random() * alphabet.length);

    if (usedNumbers.includes(randomNumber)){
        return getRandomLetter();
    }
    usedNumbers.push(randomNumber);
    return alphabet.charAt(randomNumber);
}


const checkLetter= () =>{
    const randomLetter= getRandomLetter();
    alert(`Your letter is.. ${randomLetter}`)
console.log(wordsToGuess)
    wordsToGuess.forEach((wordsToGuess) => {
    });
};

checkLetter()