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
  
  const guessedWords = [];
  
  const gameLetters = ["c", "o", "d", "e", "r", "s"];
  
  const requiredLetter = gameLetters[2];
  
  const checkWord = (word, wordList, requiredLetter, guessedWords) => {
    if (guessedWords.includes(word)) {
      alert("You already used this word!");
      return;
    }
  
    if (word.length < 3) {
      alert("Minimum word length is 3 letters");
      return;
    }
  
    if (!word.includes(requiredLetter)) {
      alert(`You didn't use the required letter: ${requiredLetter}`);
      return;
    }
  
    if (!wordList.includes(word)) {
      alert("Wrong!");
      return;
    }
  
    guessedWords.push(word);
  
    addGuessed(word);
  
    alert("Correct!");
  
    return;
  };

  const addEventListeners = () => {
    const input = document.querySelector(".text-input");
    const sendButton = document.querySelector(".send-button");
    const clearButton = document.querySelector(".clear-button");
  
    clearButton.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Limpiando....");
      input.value = "";
    });
  
    sendButton.addEventListener("click", (event) => {
      event.preventDefault();
      const word = input.value;
      checkWord(word, words, requiredLetter, guessedWords);
    });
  };
  
  const addGuessed = (word) => {
    const guessedWord = document.createElement("li");
    guessedWord.textContent = word;
    guessedWords.className = "guessed-word";
  
    const guessedWordsList = document.querySelector(".words-list");
  
    guessedWordsList.appendChild(guessedWord);
  };
  
  addEventListeners();