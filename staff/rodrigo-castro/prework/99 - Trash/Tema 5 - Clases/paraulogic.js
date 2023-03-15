const words = [
    "doc",
    "cedo",
    "code",
    "codo",
    "déco",
    "doce",
    "cedro",
    "cerdo",
    "credo",
    "decor",
    "codero",
    "codeso",
    "deceso",
    "decoro",
    "deseco",
    "escodo",
    "recodo",
    "record",
    "récord",
    "cerdoso",
    "cocedor",
    "codorro",
    "cordero",
    "cosedor",
    "creedor",
    "cocedero",
    "corredor",
    "creedero",
    "decoroso",
    "descocer",
    "descoser",
    "corredero",
    "corroedor",
    "crecedero",
    "descorreo",
    "descorrer",
    "escorredor",
    "socorredor",
    "escorredero",
  ];
  
  const gameLetters = ["c", "o", "d", "e", "r", "s"];
  const requiredLetter = gameLetters[2];
  const guessesWords = [];
  let countPoints = 0;
  
  const askForNameAndGreet = () => {
    const userName = prompt(
      "Hello! Welcome to Isdi Paraulogic . Please, enter your name!"
    );
    if (userName === null || userName === "") {
      askForNameAndGreet();
    } else {
      console.log(`Hello ${userName}`);
      alert(
        `Hi ${userName} The letters for this game are ${gameLetters.join(
          "-"
        )} the required letter is ${requiredLetter}`
      );
      console.log(
        `Hi ${userName} The letters for this game are ${gameLetters.join(
          "-"
        )}the required letter is ${requiredLetter} Let's start!`
      );
    }
  }; 
  
  // Añadir condicion de espacio
  const askWords = () => {
    const myWords = prompt("Add a new Word");
    if (myWords === null || myWords === "") {
      return askWords();
    }
    if (!isNaN(myWords)) {
      return askWords();
    } else {
      return myWords;
    }
  };
  
  const checkWords = (word, wordArray) => {
    if (word.length < 3) {
      alert("Minimum word length is 3 letters");
      return;
    }
    if (!word.includes(requiredLetter)) {
      alert(`You didn't use the required letter: ${requiredLetter}`);
      return;
    }
    if (guessesWords.includes(word)) {
      alert("You already used this word!");
      return;
    }
    if (!wordArray.includes(word)) {
      alert("Wrong!");
      return;
    } else {
      guessesWords.push(word);
      getPoints(word);
      alert(`Good job`);
      console.log(`Guessed Word : ${word}`);
      return;
    }
  };
  
  const getPoints = (word) => {
    switch (word.length) {
      case 3:
        countPoints++;
        break;
      case 4:
        countPoints += 2;
        break;
      default:
        countPoints += word.length;
    }
  };
  
  const nextTurn = () => confirm("Keep playing?");
  
  const game = () => {
    askForNameAndGreet();
    do {
      const myNewWord = askWords();
      checkWords(myNewWord, words);
      if (guessesWords.length === words.length) {
        console.log("Congrulations");
        break;
      }
    } while (nextTurn());
    alert(
      `You have guessed: ${guessesWords.length} words. Your points are ${countPoints}`
    );
  };
  
  game();