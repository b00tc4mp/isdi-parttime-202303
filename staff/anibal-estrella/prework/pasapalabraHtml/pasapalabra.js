//ISDI PASAPALABRA > https://github.com/isdi-coders-env/pre-curso/blob/master/tema6-challenges/tema6-challenges.md

const questions = [
  {
    letter: "a",
    status: 0,
    question1:
      "WITH THE LETTER A.\nSaid of a supposed extraterrestrial creature: Seize someone",
    question2:
      "WITH THE LETTER A.\nAny of the muscular-walled tubes forming part of the circulation system by which blood  is conveyed from the heart to all parts of the body",
    answer1: "abduct",
    answer2: "artery",
    question3:
      "WITH THE LETTER A.\nA word or phrase made by using the letters of another word or phrase in a different order.",
    answer3: "anagram",
  },
  {
    letter: "b",
    status: 0,
    question1:
      "WITH THE LETTER B.\nGame that has driven all the 'Skylabers' crazy in the pre-course sessions",
    answer1: "bingo",
    question2:
      "WITH THE LETTER B.\nA game played on a large field by two teams of nine players who try to score runs by hitting a small ball with a bat and then running to each of the four bases without being put out.",
    answer2: "baseball",
    question3: "WITH THE LETTER B.\nSomeone who is unable to see.",
    answer3: "blind",
  },
  {
    letter: "c",
    status: 0,
    question1: "WITH THE LETTER C.\nChild, kid, baby in spanish slang",
    answer1: "churumbel",
    question2: "WITH THE LETTER C.\nMoney in the form of coins and bills.",
    answer2: "cash",
    question3: "WITH THE LETTER C.\nA state of total confusion WITHh no order.",
    answer3: "chaos",
  },
  {
    letter: "d",
    status: 0,
    question1:
      "WITH THE LETTER D.\nAbnormality in the function of the digestive system characterized by frequent evacuations and its liquid consistency",
    answer1: "diarrhea",
    answer2: "dance",
    question2:
      "WITH THE LETTER D.\nTo move your body in a way that goes with the rhythm and style of music that is being played.",
    question3:
      "WITH THE LETTER D.\nA process of separating substances from liquid by putting them through a thin piece of skin-like material, especially to make pure the blood of people whose kidneys are not working correctly.",
    answer3: "dialysis",
  },
  {
    letter: "e",
    status: 0,
    question1:
      "WITH THE LETTER E.\nGelatinous and lies below the plasma membrane. Ghostbusters measured its radiation",
    answer1: "ectoplasm",
    question2: "WITH THE LETTER E.\nThe line of hair that grows over the eye.",
    answer2: "eyebrow",
    question3: "WITH THE LETTER E.\nProfoundly immoral and wicked.",
    answer3: "evil",
  },
  {
    letter: "f",
    status: 0,
    question1:
      "WITH THE LETTER F.\nThat does not require great effort, capacity",
    answer1: "fair",
    question2:
      "WITH THE LETTER F.\nStrong belief or trust in someone or something.",
    answer2: "faith",
    question3:
      "WITH THE LETTER F.\nAn unpleasant emotion caused by the threat of danger, pain, or harm.",
    answer3: "fear",
  },
  {
    letter: "g",
    status: 0,
    question1:
      "WITH THE LETTER G.\nHuge set of stars, interstellar dust, gases and particles",
    answer1: "galaxy",
    question2:
      "WITH THE LETTER G.\nMuch larger or more powerful than normal. A legendary creature with this characteristics.",
    answer2: "giant",
    question3:
      "WITH THE LETTER G.\nAn apparition of a dead person which is believed to appear or become manifest to the living, typically as a nebulous image.",
    answer3: "ghost",
  },
  {
    letter: "h",
    status: 0,
    question1: "WITH THE LETTER H.\nJapanese ritual suicide by disembowelment",
    answer1: "harakiri",
    question2:
      "WITH THE LETTER H.\nOne of two equal or nearly equal parts into which something can be divided.",
    answer2: "half",
    question3:
      "WITH THE LETTER H.\nA settled or regular tendency or practice, especially one that is hard to give up.",
    answer3: "habit",
  },
  {
    letter: "i",
    status: 0,
    question1:
      "WITH THE LETTER I.\nTony Stark is the alta-ego of which superhero?",
    answer1: "Ironman",
    question2: "WITH THE LETTER I.\nNot allowed by the law.",
    answer2: "illegal",
    question3:
      "WITH THE LETTER I.\nThe faculty or action of forming new ideas, or images or concepts of external objects not present to the senses.",
    answer3: "imagination",
  },
  {
    letter: "j",
    status: 0,
    question1:
      "WITH THE LETTER J.\nWhich Italian football club based in Turin wears black and white stripes?",
    answer1: "juventus",
    question2: "WITH THE LETTER J.\nSomething said or done to cause laughter.",
    answer2: "joke",
    question3:
      "WITH THE LETTER J.\nAn ornament or piece that contains a precious stone or stones.",
    answer3: "jewel",
  },
  {
    letter: "k",
    status: 0,
    question1:
      "WITH THE LETTER K.\nPerson who risks his life carrying out a reckless action",
    answer1: "kamikaze",
    question2:
      "WITH THE LETTER K.\nA device that is used to open a lock or start an automobile.",
    answer2: "key",
    question3:
      "WITH THE LETTER K.\nA recurrent urge to steal, typically WITHhout regard for need or profit.",
    answer3: "kleptomania",
  },
  {
    letter: "l",
    status: 0,
    question1: "WITH THE LETTER L.\nWerewolf",
    answer1: "lycanthrope",
    answer2: "lazy",
    question2:
      "WITH THE LETTER L.\nNot liking to work hard or to be active. Slow and relaxed.",
    question3: "WITH THE LETTER L.\nA person who doesn't tell the truth.",
    answer3: "lier",
  },
  {
    letter: "m",
    status: 0,
    question1:
      "WITH THE LETTER M.\nPerson who flees from dealing with other people or feels great aversion towards them",
    answer1: "misanthrope",
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
    question1: "WITH THE LETTER N.\nOpposite of day",
    answer1: "night",
    question2:
      "WITH THE LETTER N.\nFailure to take the care that a responsible person usually takes : lack of normal care or attention.",
    answer2: "negligence",
    question3:
      "WITH THE LETTER N.\nA person who has an excessive interest in or admiration of themselves.",
    answer3: "narcissist",
  },
  {
    letter: "o",
    status: 0,
    question1:
      "WITH THE LETTER O. Fantastic humanoid with a terrible and bestial appearance, green skin created by the writer Tolkien",
    answer1: "orc",
    answer2: "obsession",
    question2:
      "WITH THE LETTER O. A state in which someone thinks about someone or something constantly or frequently especially in a way that is not normal.",
    question3:
      "WITH THE LETTER O. The Japanese art of folding paper into decorative shapes and figures.",
    answer3: "origami",
  },
  {
    letter: "p",
    status: 0,
    question1:
      "WITH THE LETTER P.\nTechnologically advanced ancestral race characterized by its great psionic powers from the video game StarCraft",
    answer1: "protoss",
    question2:
      "WITH THE LETTER P.\nThe inside part of the hand between the wrist and the fingers.",
    answer2: "palm",
    question3:
      "WITH THE LETTER P.\nAn oval fleshy fruit which is purple, reddish, or yellow when ripe and contains a flattish pointed stone.",
    answer3: "plum",
  },
  {
    letter: "q",
    status: 0,
    question1:
      "WITH THE LETTER Q.\nA sentence worded or expressed so as to elicit information.",
    answer1: "question",
    question2:
      "WITH THE LETTER Q.\nA woman who rules a country and who usually inherits her position and rules for life.",
    answer2: "queen",
    question3:
      "WITH THE LETTER Q.\nA list of questions that several people are asked so that information can be collected about something.",
    answer3: "questionnaire",
  },
  {
    letter: "r",
    status: 0,
    question1: "WITH THE LETTER R.\nRodent",
    answer1: "raton",
    question2:
      "WITH THE LETTER R.\nTo feel sad or sorry about (something that you did or did not do).",
    answer2: "regret",
    question3:
      "WITH THE LETTER R.\nA full, deep, prolonged cry uttered by a lion or other large wild animal.",
    answer3: "roar",
  },
  {
    letter: "s",
    status: 0,
    question1: "WITH THE LETTER S.\nCommunity that saves all computer.",
    answer1: "stackoverflow",
    question2:
      "WITH THE LETTER S. \nAn amount of money that an employee is paid.",
    answer2: "salary",
    question3:
      "WITH THE LETTER S\nUsed as a polite or respectful way of addressing a man, especially one in a position of authority.",
    answer3: "sir",
  },
  {
    letter: "t",
    status: 0,
    question1:
      "WITH THE LETTER T.\nFilm by director James Cameron that established Arnold Schwarzenegger as an actor in 1984",
    answer1: "terminator",
    question2: "WITH THE LETTER T.\nA building for worship.",
    answer2: "temple",
    question3: "WITH THE LETTER T.\nA greenish-blue colour.",
    answer3: "turquoise",
  },
  {
    letter: "u",
    status: 0,
    question1:
      "WITH THE LETTER U.\nSpanish writer and philosopher of the generation of '98 author of the book 'Niebla' in 1914.",
    answer1: "unamuno",
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
    question1:
      "WITH THE LETTER V.\nName given to the members of the Nordic peoples originating from Scandinavia, famous for their raids and looting in Europe.",
    answer1: "vikings",
    question2:
      "WITH THE LETTER V.\nA person who does not eat meat for health or religious reasons or because they want to avoid being cruel to animals.",
    answer2: "vegetarian",
    question3:
      "WITH THE LETTER V.\nThe sound produced in a person's larynx and uttered through the mouth, as speech or song.",
    answer3: "voice",
  },
  {
    letter: "w",
    status: 0,
    question1:
      "INCLUDES THE LETTER W.\nFast food made with two slices of bread between which ham and cheese are placed",
    answer1: "sandwich",
    question2:
      "WITH THE LETTER W.\nUncontrolled, violent, or extreme. / Used to refer to plants or animals that live or grow independently of people, in natural conditions and with natural characteristics.",
    answer2: "wild",
    question3:
      "WITH THE LETTER W.\nA piece of rope holded by the extremes which serves to jump.",
    answer3: "warp",
  },
  {
    letter: "x",
    status: 0,
    question1:
      "INCLUDES THE LETTER X.\nBacterial toxin used in cosmetic surgery.",
    answer1: "botox",
    question2:
      "Contains the letter X.\nTo become or to cause (something) to become less tense, tight, or stiff.",
    answer2: "relax",
    question3:
      "Contains the letter X.\nA plane figure WITHh six straight sides and angles.",
    answer3: "hexagon",
  },
  {
    letter: "y",
    status: 0,
    question1:
      "INCLUDES THE LETTER Y.\nSmall cactus known for its psychoactive alkaloids used ritually and medicinally by Native Americans.",
    answer1: "peyote",
    question2:
      "WITH THE LETTER Y.\nUsed to give a positive answer2 or reply to a question2, request, or offer.",
    answer2: "yes",
    question3:
      "WITH THE LETTER Y.\nThe time taken by the earth to make one revolution around the sun.",
    answer3: "year",
  },
  {
    letter: "z",
    status: 0,
    question1:
      "WITH THE LETTER Z.\nSchool of Buddhism that seeks the experience of wisdom beyond rational discourse",
    answer1: "zen",
    question2:
      "Contains the letter Z.\nA poisonous gas with a strong smell that is a form of oxygen.",
    answer2: "ozone",
    question3:
      "WITH THE LETTER Z.\nThe scientific study of animals, especially their structure.",
    answer3: "zoology",
  },
];

let userName, randomQuestionNumber, start;
const timeLimit = 120;
let rounds = 0;
let letterCounter = 0;
let userAnswer;
let answer;
let status;
let answeredLettersList = [];
let pasapalabraList = [];
let questionNumber = 0;
let pasapalabraQuestions = [];
let pasapalabraQuestionNumber;
let points = 0;
let timerInterval;
let showAnswers = false;
let ranking = [
  { name: "Ulises", points: 4 },
  { name: "Enki", points: 16 },
  { name: "Elisabet", points: 20 },
];

const randomNumber = () => {
  return Math.round(Math.random() * (3 - 1)) + 1;
};

const askLetter = (questions) => {
  let question, letter, status, answerNumber;
  randomQuestionNumber = randomNumber();
  questionNumber = "question" + randomQuestionNumber;
  answerNumber = "answer" + randomQuestionNumber;
  if (rounds > 1) {
    questionNumber = "question" + pasapalabraQuestionNumber;
    answerNumber = "answer" + pasapalabraQuestionNumber;
    question = pasapalabraQuestions[letterCounter].question1;
    answer = pasapalabraQuestions[letterCounter][answerNumber];
    status = pasapalabraQuestions[letterCounter].status;
    letter = pasapalabraQuestions[letterCounter].letter;
  } else {
    question = questions[letterCounter][questionNumber];
    answer = questions[letterCounter][answerNumber];
    status = questions[letterCounter].status;
    letter = questions[letterCounter].letter;
  }

  showQuestion(question);
  if (showAnswers) {
    inputAnswer.value = `${answer}`;
  }
};

const checkErrorInput = (userAnswer) => {
  if (userAnswer === null || userAnswer === "" || userAnswer === " ") {
    return true;
  }
  return false;
};

const checkAnswer = (
  userAnswer,
  letterCounter,
  start,
  letter,
  randomQuestionNumber
) => {
  if (userAnswer.toUpperCase() === answer.toUpperCase()) {
    if (rounds > 1) {
      pasapalabraQuestions[letterCounter].status = 1;
      changeLetterClass(
        pasapalabraQuestions[letterCounter].letter.toUpperCase(),
        "status-0",
        "status-1"
      );
    } else {
      changeLetterClass(letter.toUpperCase(), "status-0", "status-1");
      questions[letterCounter].status = 1;
      showPoints();
    }
  } else if (userAnswer.toUpperCase() === "pasapalabra".toUpperCase()) {
    if (rounds > 1) {
      pasapalabraQuestions[letterCounter].status = 3;
    } else {
      questions[letterCounter].status = 3;
    }
    if (rounds < 2) {
      pasapalabraQuestionNumber = randomQuestionNumber;
    }
  } else {
    if (rounds > 1) {
      pasapalabraQuestions[letterCounter].status = 2;
      changeLetterClass(letter, "status-0", "status-2");
    } else {
      questions[letterCounter].status = 2;
      changeLetterClass(letter, "status-0", "status-2");
    }
    answeredLettersList.push({
      letter: questions[letterCounter].letter,
      question: questions[letterCounter].question,
      answer: userAnswer,
    });
  }
  inputAnswer.value = ""; 
  nextRound(questions, pasapalabraQuestions);
};

const letterCounterReset = () => {
  if (
    letterCounter === questions.length - 1 &&
    pasapalabraQuestions.length > 0
  ) {
    rounds++;
    letterCounter = 0;
    displayContent("round-value", rounds);
  } else {
    letterCounter++;
  }
};

const nextRound = (questions, pasapalabraQuestions) => {
  letterCounterReset();
  if (rounds > 1 && checkPasapalabraStatus(pasapalabraQuestions)) {
    askLetter(pasapalabraQuestions, userName, start);
  } else if (rounds > 1 && !checkPasapalabraStatus(pasapalabraQuestions)) {
    endGame();
  } else if (
    rounds === 1 &&
    letterCounter > questions.length - 1 &&
    !checkPasapalabraStatus(pasapalabraQuestions)
  ) {
    endGame();
  } else {
    askLetter(questions, userName, start);
  }
};

const showAnsweredLetters = () => {
  let list = [];
  questions.forEach((element) => {
    if (element.status === 2) {
      list.push({
        letter: element.letter,
        question: element["question" + randomQuestionNumber],
        answer: "X",
      });
    } else if (element.status === 1) {
      list.push({
        letter: element.letter,
        question: element["question" + randomQuestionNumber],
        answer: element["answer" + randomQuestionNumber],
      });
    } else if (element.status === 3) {
      list.push({
        letter: element.letter,
        question: element["question" + randomQuestionNumber],
        answer: "PASAPALABRA!",
      });
    }
  });
  return list;
};

const endGame = () => {
  clearInterval(timerInterval);
  showDiv("content", false);
  showDiv("game-status", false);
  document.querySelector(".game-end").style.display = "flex";

  if (points > 0) {
    document.querySelector(".game-result").style.display = "flex";
    displayContent(
      "game-result",
      `Congrats ${userName}!! You've finished Pasapalabra!`
    );
  } else {
    showDiv("game-result", true);
    displayContent("game-result", `Bye ${userName}!!\nNothing answered!`);
  }
  saveGame(userName, points);
  showRanking(rankUsers(ranking));
  rounds = 0;
  answeredLettersList = [];
  pasapalabraList = [];
  points=0;
  questions.forEach((element) => {
    element.status = 0;
  });
};

const checkPasapalabraStatus = (questions) => {
  return questions.filter((letter) => letter.status === 3).length > 0;
};

const saveGame = (name, points) => {
  ranking.push({ name, points });
};

const rankUsers = () => {
  ranking.sort((a, b) => b.points - a.points);
  return ranking;
};

const showPoints = () => {
  points = questions.filter((letter) => letter.status === 1).length;
  const elementPoints = document.querySelector(".points-value");
  elementPoints.innerHTML = `${points}`;
};

const showRanking = () => {
  const ulRanking = document.querySelector(".ranking");
  for (let i = 0; i < ranking.length; i++) {
    const li = document.createElement("li");
    li.classList.add(`ranking-${i}`);
    li.innerHTML = `${i + 1}. ${ranking[i].name} - ${ranking[i].points} points`;
    ulRanking.appendChild(li);
  }
};

const inputAnswer = document.querySelector(".input-answer"); 

const addEventListeners = () => {
  const inputUserName = document.querySelector(".input-user-name");
  const inputShowAnswers = document.querySelector(".input-show-answers");
  const startGameButton = document.querySelector(".button-start-game");
  const sendAnswerButton = document.querySelector(".send-answer"); 
  const clearButton = document.querySelector(".clear-input");
  const endGameButton = document.querySelector(".end-game");
  const pasapalabraButton = document.querySelector(".pasapalabra");
  const restartGameButton = document.querySelector(".button-restart-game");
  const ulLetterList = document.querySelector("ul.letters-list"); 
  const ulRankingList = document.querySelector("ul.ranking"); 

  inputUserName.addEventListener('focus', (event) => {
    event.preventDefault(); 
    inputUserName.value = '';
  });

  clearButton.addEventListener("click", (event) => {
    event.preventDefault(); 
    inputAnswer.value = ""; 
  });

  startGameButton.addEventListener("click", (event) => {
    event.preventDefault();
    start = Date.now();
    userName = inputUserName.value;
    showAnswers = inputShowAnswers.value;

    let errorInput = checkErrorInput(userName);

    if (errorInput) {
      inputUserName.value = "Please type your Name!";
      return;
    }
    rounds++;
    displayContent("greetings-headline", `Hello ${userName}!`);
    displayContent("round-value", rounds);

    askLetter(questions);
    showDiv("game-intro", false);

    document.querySelector(".input-user-name").focus();
    document.querySelector(".game-status").style.display = "flex";
    document.querySelector(".content").style.display = "flex";
    document.querySelector(".input-answer").focus();

    timer();
    circleAlphabet();
  });

  sendAnswerButton.addEventListener("click", (event) => {
    event.preventDefault();
    userAnswer = inputAnswer.value; 
    checkAnswer(
      userAnswer,
      letterCounter,
      start,
      questions[letterCounter].letter,
      randomQuestionNumber
    );

    document.querySelector(".input-answer").focus();
  });

  pasapalabraButton.addEventListener("click", (event) => {
    event.preventDefault();
    userAnswer = "pasapalabra";
    checkAnswer(
      userAnswer,
      letterCounter,
      start,
      questions[letterCounter].letter,
      randomQuestionNumber
    );

    document.querySelector(".input-answer").focus();
    pasapalabraQuestions = questions.filter((letter) => letter.status === 3);
  });

  endGameButton.addEventListener("click", (event) => {
    event.preventDefault();
    endGame(userName);
  });

  restartGameButton.addEventListener("click", (event) => {
    event.preventDefault();
    letterCounter = 0;
    pasapalabraQuestions = [];
    ulLetterList.innerHTML = "";
    ulRankingList.innerHTML = "";

    clearInterval(timer);
    showDiv("game-end", false);
    showDiv("content", false);
    showDiv("game-status", false);
    document.querySelector(".game-intro").style.display = "flex";

    document.querySelector(".input-user-name").focus();
  });

  inputUserName.value = ``;
};

addEventListeners();

const showDiv = (elementClass, block, flex) => {
  const element = document.querySelector(`.${elementClass}`);
  if (block) {
    element.style.display = "block";
  } else if(flex){
    element.style.display = "flex";
  } else {
    element.style.display = "none";

  }
};

const displayContent = (selector, text) => {
  document.querySelector(`.${selector}`).innerText = text;
};

const showQuestion = (question) => {
  const showQuestionHeadline = document.querySelector(".question");
  document.querySelector(".question").innerText = `${question}`;
};

const changeElementStyle = (elementSelector, property, propertyValue) => {
  const element = document.querySelector(`.${elementSelector}`);
  element.style[property] = propertyValue;
};

const changeClassToElement = (oldClassName, newclassName) => {
  document
    .querySelector(`.${oldClassName}`)
    .classList.replace(oldClassName, newclassName);
};
const changeLetterClass = (letter, oldClassName, newclassName) => {
  document
    .querySelector("li.letter-" + letter.toUpperCase())
    .classList.replace(oldClassName, newclassName);
};

const circleAlphabet = () => {
  const ulLetters = document.querySelector(".letters-list");
  let diameter = ulLetters.offsetWidth - 64;
  let radius = diameter / 2;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < letters.length; i++) {
    const letter = letters.charAt(i);
    const angle = (i / letters.length) * Math.PI * 2;
    const x = Math.round(radius + radius * Math.sin(angle));
    const y = -Math.round(radius * -1 + radius * Math.cos(angle));
    const li = document.createElement("li");
    li.classList.add(`letter`, `letter-${letters[i]}`, "status-0");
    li.innerHTML = letters[i];
    li.style.left = x + "px";
    li.style.top = y + "px";
    ulLetters.appendChild(li);
  }

  window.addEventListener("resize", (event) => {
    event.preventDefault();
    diameter = ulLetters.offsetWidth - 64;
    radius = diameter / 2;
    for (let i = 0; i < ulLetters.children.length; i++) {
      const li = ulLetters.children[i];
      const angle = (i / letters.length) * Math.PI * 2;
      const x = Math.round(radius + radius * Math.sin(angle));
      const y = -Math.round(radius * -1 + radius * Math.cos(angle));
      li.style.left = x + "px";
      li.style.top = y + "px";
    }
  });
};

const timer = () => {
  const countDownDate = new Date().getTime() + timeLimit * 1000;
  const displayCountdown = () => {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.querySelector(
      ".time-left-value"
    ).innerText = `${minutes}m ${seconds}s`;
    if (distance < 0) {
      clearInterval(timerInterval);
      document.querySelector(".time-left-value").innerText = "TIME OUT!";
      endGame();
    }
  };
  timerInterval = setInterval(displayCountdown, 1000);
  return timerInterval;
};

document.querySelector(".input-user-name").focus();
