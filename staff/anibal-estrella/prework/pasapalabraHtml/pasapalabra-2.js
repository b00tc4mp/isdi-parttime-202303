//ISDI PASAPALABRA > https://github.com/isdi-coders-env/pre-curso/blob/master/tema6-challenges/tema6-challenges.md

const questions = [
  {
    letter: "a",
    status: 0,
    question: "WITH THE LETTER A.\nSaid of a supposed extraterrestrial creature: Seize someone",
    question2:
      "WITH THE LETTER A.\nAny of the muscular-walled tubes forming part of the circulation system by which blood  is conveyed from the heart to all parts of the body",
    answer: "abduct",
    answer2: "artery",
    question3: "WITH THE LETTER A.\nA word or phrase made by using the letters of another word or phrase in a different order.",
    answer3: "anagram",
  },
  {
    letter: "b",
    status: 0,
    question: "WITH THE LETTER B.\nGame that has driven all the 'Skylabers' crazy in the pre-course sessions",
    answer: "bingo",
    question2:
      "WITH THE LETTER B.\nA game played on a large field by two teams of nine players who try to score runs by hitting a small ball with a bat and then running to each of the four bases without being put out.",
    answer2: "baseball",
    question3: "WITH THE LETTER B.\nSomeone who is unable to see.",
    answer3: "blind",
  },
  {
    letter: "c",
    status: 0,
    question: "WITH THE LETTER C.\nChild, kid, baby in spanish slang",
    answer: "churumbel",
    question2: "WITH THE LETTER C.\nMoney in the form of coins and bills.",
    answer2: "cash",
    question3: "WITH THE LETTER C.\nA state of total confusion WITHh no order.",
    answer3: "chaos",
  },
  {
    letter: "d",
    status: 0,
    question:
      "WITH THE LETTER D.\nAbnormality in the function of the digestive system characterized by frequent evacuations and its liquid consistency",
    answer: "diarrhea",
    answer2: "dance",
    question2: "WITH THE LETTER D.\nTo move your body in a way that goes with the rhythm and style of music that is being played.",
    question3:
      "WITH THE LETTER D.\nA process of separating substances from liquid by putting them through a thin piece of skin-like material, especially to make pure the blood of people whose kidneys are not working correctly.",
    answer3: "dialysis",
  },
  {
    letter: "e",
    status: 0,
    question: "WITH THE LETTER E.\nGelatinous and lies below the plasma membrane. Ghostbusters measured its radiation",
    answer: "ectoplasm",
    question2: "WITH THE LETTER E.\nThe line of hair that grows over the eye.",
    answer2: "eyebrow",
    question3: "WITH THE LETTER E.\nProfoundly immoral and wicked.",
    answer3: "evil",
  },
  {
    letter: "f",
    status: 0,
    question: "WITH THE LETTER F.\nQThat does not require great effort, capacity",
    answer: "fair",
    question2: "WITH THE LETTER F.\nStrong belief or trust in someone or something.",
    answer2: "faith",
    question3: "WITH THE LETTER F.\nAn unpleasant emotion caused by the threat of danger, pain, or harm.",
    answer3: "fear",
  },
  {
    letter: "g",
    status: 0,
    question: "WITH THE LETTER G.\nHuge set of stars, interstellar dust, gases and particles",
    answer: "galaxy",
    question2: "WITH THE LETTER G.\nMuch larger or more powerful than normal. A legendary creature with this characteristics.",
    answer2: "giant",
    question3:
      "WITH THE LETTER G.\nAn apparition of a dead person which is believed to appear or become manifest to the living, typically as a nebulous image.",
    answer3: "ghost",
  },
  {
    letter: "h",
    status: 0,
    question: "WITH THE LETTER H.\nJapanese ritual suicide by disembowelment",
    answer: "harakiri",
    question2: "WITH THE LETTER H.\nOne of two equal or nearly equal parts into which something can be divided.",
    answer2: "half",
    question3: "WITH THE LETTER H.\nA settled or regular tendency or practice, especially one that is hard to give up.",
    answer3: "habit",
  },
  {
    letter: "i",
    status: 0,
    question: "WITH THE LETTER I.\nTony Stark is the alta-ego of which superhero?",
    answer: "Ironman",
    question2: "WITH THE LETTER I.\nNot allowed by the law.",
    answer2: "illegal",
    question3: "WITH THE LETTER I.\nThe faculty or action of forming new ideas, or images or concepts of external objects not present to the senses.",
    answer3: "imagination",
  },
  {
    letter: "j",
    status: 0,
    question: "WITH THE LETTER J.\nWhich Italian football club based in Turin wears black and white stripes?",
    answer: "juventus",
    question2: "WITH THE LETTER J.\nSomething said or done to cause laughter.",
    answer2: "joke",
    question3: "WITH THE LETTER J.\nAn ornament or piece that contains a precious stone or stones.",
    answer3: "jewel",
  },
  {
    letter: "k",
    status: 0,
    question: "WITH THE LETTER K.\nPerson who risks his life carrying out a reckless action",
    answer: "kamikaze",
    question2: "WITH THE LETTER K.\nA device that is used to open a lock or start an automobile.",
    answer2: "key",
    question3: "WITH THE LETTER K.\nA recurrent urge to steal, typically WITHhout regard for need or profit.",
    answer3: "kleptomania",
  },
  {
    letter: "l",
    status: 0,
    question: "WITH THE LETTER L.\nWerewolf",
    answer: "lycanthrope",
    answer2: "lazy",
    question2: "WITH THE LETTER L.\nNot liking to work hard or to be active. Slow and relaxed.",
    question3: "WITH THE LETTER L.\nA person who doesn't tell the truth.",
    answer3: "lier",
  },
  {
    letter: "m",
    status: 0,
    question: "WITH THE LETTER M.\nPerson who flees from dealing with other people or feels great aversion towards them",
    answer: "misanthrope",
    answer2: "milk",
    question2:
      "WITH THE LETTER M.\nThe white liquid produced by cows, goats and some other animals as food for their young and used as a drink by humans.",
    question3:
      "WITH THE LETTER M.\nthe practice of being aware of your body, mind, and feelings in the present moment, thought to create a feeling of calm.",
    answer3: "mindfullness",
  },
  {
    letter: "n",
    status: 0,
    question: "WITH THE LETTER N.\nOpposite of day",
    answer: "night",
    question2: "WITH THE LETTER N.\nFailure to take the care that a responsible person usually takes : lack of normal care or attention.",
    answer2: "negligence",
    question3: "WITH THE LETTER N.\nA person who has an excessive interest in or admiration of themselves.",
    answer3: "narcissist",
  },
  {
    letter: "o",
    status: 0,
    question: "WITH THE LETTER O.\nFantastic humanoid with a terrible and bestial appearance, green skin created by the writer Tolkien",
    answer: "orc",
    answer2: "obsession",
    question2:
      "WITH THE LETTER O.\nA state in which someone thinks about someone or something constantly or frequently especially in a way that is not normal.",
    question3: "WITH THE LETTER O.\nThe Japanese art of folding paper into decorative shapes and figures.",
    answer3: "origami",
  },
  {
    letter: "p",
    status: 0,
    question: "WITH THE LETTER P.\nTechnologically advanced ancestral race characterized by its great psionic powers from the video game StarCraft",
    answer: "protoss",
    answer2: "pair",
    question2: "WITH THE LETTER P.\nTwo things that are the same and are meant to be used together.",
    question2:
      "WITH THE LETTER O.\nA state in which someone thinks about someone or something constantly or frequently especially in a way that is not normal.",
    answer2: "obsession",
    question3: "WITH THE LETTER P.\nAn oval fleshy fruit which is purple, reddish, or yellow when ripe and contains a flattish pointed stone.",
    answer3: "plum",
  },
  {
    letter: "q",
    status: 0,
    question: "WITH THE LETTER Q.\nA sentence worded or expressed so as to elicit information.",
    answer: "question",
    question2: "WITH THE LETTER Q.\nA woman who rules a country and who usually inherits her position and rules for life.",
    answer2: "queen",
    question3: "WITH THE LETTER Q.\nA list of questions that several people are asked so that information can be collected about something.",
    answer3: "questionnaire",
  },
  {
    letter: "r",
    tatus: 0,
    question: "WITH THE LETTER R. Roedor",
    answer: "raton",
    question2: "WITH THE LETTER R.\nTo feel sad or sorry about (something that you did or did not do).",
    answer2: "regret",
    question3: "WITH THE LETTER R.\nA full, deep, prolonged cry uttered by a lion or other large wild animal.",
    answer3: "roar",
  },
  {
    letter: "s",
    status: 0,
    question: "WITH THE LETTER S.\nCommunity that saves all computer.",
    answer: "stackoverflow",
    question2: "WITH THE LETTER S.\nAn amount of money that an employee is paid.",
    answer2: "salary",
    question3: "WITH THE LETTER S.\nUsed as a polite or respectful way of addressing a man, especially one in a position of authority.",
    answer3: "sir",
  },
  {
    letter: "t",
    status: 0,
    question: "WITH THE LETTER T.\nFilm by director James Cameron that established Arnold Schwarzenegger as an actor in 1984",
    answer: "terminator",
    question2: "WITH THE LETTER T.\nA building for worship.",
    answer2: "temple",
    question3: "WITH THE LETTER T.\nA greenish-blue colour.",
    answer3: "turquoise",
  },
  {
    letter: "u",
    status: 0,
    question: "WITH THE LETTER U.\nSpanish writer and philosopher of the generation of '98 author of the book 'Niebla' in 1914.",
    answer: "unamuno",
    question2:
      "WITH THE LETTER U.\nLocated or occurring below the surface of the earth. A system of trains that run below the ground in a large city.",
    answer2: "underground",
    question3:
      "WITH THE LETTER U.\nA final demand or statement of terms, the rejection of which will result in retaliation or a breakdown in relations.",
    answer3: "ultimatum",
  },
  {
    letter: "v",
    status: 0,
    question:
      "WITH THE LETTER V.\nName given to the members of the Nordic peoples originating from Scandinavia, famous for their raids and looting in Europe.",
    answer: "vikings",
    question2:
      "WITH THE LETTER V.\nA person who does not eat meat for health or religious reasons or because they want to avoid being cruel to animals.",
    answer2: "vegetarian",
    question3: "WITH THE LETTER V.\nThe sound produced in a person's larynx and uttered through the mouth, as speech or song.",
    answer3: "voice",
  },
  {
    letter: "w",
    status: 0,
    question: "INCLUDES THE LETTER W.\nFast food made with two slices of bread between which ham and cheese are placed",
    answer: "sandwich",
    question2:
      "WITH THE LETTER W.\nUncontrolled, violent, or extreme. / Used to refer to plants or animals that live or grow independently of people, in natural conditions and with natural characteristics.",
    answer2: "wild",
    question3: "WITH THE LETTER W.\nA piece of rope holded by the extremes which serves to jump.",
    answer3: "warp",
  },
  {
    letter: "x",
    status: 0,
    question: "INCLUDES THE LETTER X.\nBacterial toxin used in cosmetic surgery.",
    answer: "botox",
    question2: "Contains the letter X.\nTo become or to cause (something) to become less tense, tight, or stiff.",
    answer2: "relax",
    question3: "Contains the letter X.\nA plane figure WITHh six straight sides and angles.",
    answer3: "hexagon",
  },
  {
    letter: "y",
    status: 0,
    question: "INCLUDES THE LETTER Y.\nSmall cactus known for its psychoactive alkaloids used ritually and medicinally by Native Americans.",
    answer: "peyote",
    question2: "WITH THE LETTER Y.\nUsed to give a positive answer2 or reply to a question2, request, or offer.",
    answer2: "yes",
    question3: "WITH THE LETTER Y.\nThe time taken by the earth to make one revolution around the sun.",
    answer3: "year",
  },
  {
    letter: "z",
    status: 0,
    question: "WITH THE LETTER Z.\nSchool of Buddhism that seeks the experience of wisdom beyond rational discourse",
    answer: "zen",
    question2: "Contains the letter Z.\nA poisonous gas with a strong smell that is a form of oxygen.",
    answer2: "ozone",
    question3: "WITH THE LETTER Z.\nThe scientific study of animals, especially their structure.",
    answer3: "zoology",
  },
];

let start;
const timeLimit = 120;
let rounds = 0;
let answer;
let userName;

const askForNameAndGreet = (userNameInput, timeLimit) => {
  userName = userNameInput;
  if (userName === null || userName === "" || userName == " ") {
   alert(`Please enter your name!`)
  } else {
    console.log(
      `Hi ${userName}, let's Play Pasapalabra!\nType \"end\" to quit and \"pasapalabra\" to skip to next letter\n You have ${timeLimit} seconds limit to complete the game.`
    );
    return userName;
  }
};

const randomNumber = () => {
  return Math.round(Math.random() * 1) + 2;
};

const askLetter = (questions, userName, start) => {
  rounds++;
  alert(`Round: ${rounds}`);
  console.log(`// Round: ${rounds} ////////////////////////////`);
  let userAnswer, question, answer;
  for (let i = 0; i < questions.length; i++) {
    question = questions[i].question;
    answer = questions[i].answer;

    if (rounds > 1 && rounds <= 3) {
      question = questions[i]["question" + rounds];
      answer = questions[i]["answer" + rounds];
      userAnswer = prompt(`${question}`);
    } else {
      userAnswer = prompt(`${question}`);
    }
    while (userAnswer === null || userAnswer === "" || userAnswer == " ") {
      userAnswer = prompt(`${question}`);
    }

    if (userAnswer.toUpperCase() === "end".toUpperCase()) {
      return "end";
    } else {
      const status = checkAnswer(answer, userAnswer, questions, start, timeLimit);
      if (status === "time") {
        endGame(userName);
        return "time";
      } else if (status) {
        questions[i].status = 1;
        console.table(showAnsweredLetters(questions));
      }
    }
  }
};

const checkAnswer = (userAnswer, answer, questions, start, timeLimit) => {
  let millis = Date.now() - start;
  if (Math.floor(millis / 1000) >= timeLimit) {
    alert(`TIME'S UP!`);
    return "time";
  } else {
    console.log(`// Time left: ${timeLimit - Math.floor(millis / 1000)} seconds`);
  }
  if (userAnswer.toUpperCase() === answer.toUpperCase()) {
    console.log(`RIGHT ANSWER!! the word is: ${answer.toUpperCase()}`);
    alert(`RIGHT ANSWER!! the word is: ${answer.toUpperCase()}`);
    return true;
  } else if (answer.toUpperCase() === "pasapalabra".toUpperCase()) {
    console.log(`// PASAPALABRA!`);
    alert(`PASAPALABRA!`);
    return false;
  } else {
    console.log(`//WRONG ANSWER!! word isn't: ${answer}`);
    alert(`WRONG ANSWER!! word isn't: ${answer}`);
    return true;
  }
};

const showAnsweredLetters = (questions) => {
  const answeredLettersList = [];
  questions.forEach((element) => {
    let iter = rounds % 3;
    if (element.status === 1) {
      if (iter === 1) {
        answeredLettersList.push(element.letter, element.answer);
      } else if (iter === 2) {
        answeredLettersList.push(element.letter, element["answer" + 2]);
      } else {
        answeredLettersList.push(element.letter, element["answer" + 3]);
      }
    }
  });
  return answeredLettersList;
};

const endGame = (userName) => {
  console.log(`Bye ${userName}!\nThanks for playing ISDI Pasapalabra.\nThis is your game result so far:`);
  let result = showAnsweredLetters(questions);
  if (result.length > 0) {
    console.log(`Total RIGHT Letters answered: ${result.length / 2}`);
    console.table(showAnsweredLetters(questions));
  } else {
    console.log("Nothing answered!");
  }
  switch (confirm("Try again?")) {
    case true:
      rounds = 0;
      questions.forEach((element) => {
        element.status = 0;
      });
      return game();
    default:
      return alert(`Bye ${userName}!\nThanks for playing ISDI Pasapalabra.`);
  }
};

const game = () => {
  console.log(`// PASAPALABRA ///////////////////////////////////////////////////////////////`);
  const start = Date.now();

  const userName = askForNameAndGreet(timeLimit);
  do {
    answer = askLetter(questions, userName, start);
    if (answer === "end" || answer === "time") {
      endGame(userName);
      return;
    }
  } while (answer);

  let notAnswered = questions.filter((letter) => letter.status === 0);

  while (notAnswered.length > 0) {
    askLetter(
      questions.filter((letter) => letter.status === 0),
      userName
    );
    notAnswered = questions.filter((letter) => letter.status === 0);
  }
  alert(`Congrats ${userName}!\nYou've answered all Letters of PASAPALABRA!`);
  console.log(`// Congrats ${userName}!\nYou've answered all Letters of PASAPALABRA!\nNumber of ROUNDS to finish: ${rounds}`);
  endGame(userName);
};

const addEventListeners = () => {
  const inputUserName = document.querySelector(".input-user-name");
  const startGameButton = document.querySelector(".start-game");
  const inputAnswer = document.querySelector(".input-answer"); // load input text to refer to
  const sendAnswerButton = document.querySelector(".send-answer"); // load button to refer to
  const clearButton = document.querySelector(".clear-input"); // load button to refer to
  const endGameButton = document.querySelector(".end-game")
  //listen to a click on an specific element with an specific class name

  clearButton.addEventListener("click", (event) => {
    event.preventDefault(); // when event executes, prevent browser to exwcute default form actions and let JS handle it
    inputAnswer.value = ""; // fill the input text with an empty value
  });

  startGameButton.addEventListener("click", (event) => {
    event.preventDefault();
    start = Date.now();
    userNameInput = inputUserName.value;
    askForNameAndGreet(userNameInput, timeLimit);
    displayName(userNameInput);
  });

  sendAnswerButton.addEventListener("click", (event) => {
    event.preventDefault();
    inputAnswerText = inputAnswer.value; //saave input value to word variable
    console.log(inputAnswerText);
    checkAnswer(inputAnswerText, answer, questions, start, timeLimit);
  });

  endGameButton.addEventListener("click", (event) =>{
    event.preventDefault();
    endGame(userName);
  })
};
addEventListeners();

const displayName = (userName)=>{
const displayNameGreetings = document.querySelector(".greetings");
document.getElementsByClassName("greetings").innerHTML = `Hello ${userName}!`;

console.log(userName);
}

// game();
