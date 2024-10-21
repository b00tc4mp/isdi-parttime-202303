//ISDI PASAPALABRA > https://github.com/isdi-coders-env/pre-curso/blob/master/tema6-challenges/tema6-challenges.md

const questions = [
  {
    letter: "a",
    status: 0,
    question1: "WITH THE LETTER A. Said of a supposed extraterrestrial creature: Seize someone",
    question2:
      "WITH THE LETTER A. Any of the muscular-walled tubes forming part of the circulation system by which blood  is conveyed from the heart to all parts of the body",
    answer1: "abduct",
    answer2: "artery",
    question3: "WITH THE LETTER A. A word or phrase made by using the letters of another word or phrase in a different order.",
    answer3: "anagram",
  },
  {
    letter: "b",
    status: 0,
    question1: "WITH THE LETTER B. Game that has driven all the 'Skylabers' crazy in the pre-course sessions",
    answer1: "bingo",
    question2:
      "WITH THE LETTER B. A game played on a large field by two teams of nine players who try to score runs by hitting a small ball with a bat and then running to each of the four bases without being put out.",
    answer2: "baseball",
    question3: "WITH THE LETTER B. Someone who is unable to see.",
    answer3: "blind",
  },
  {
    letter: "c",
    status: 0,
    question1: "WITH THE LETTER C. Child, kid, baby in spanish slang",
    answer1: "churumbel",
    question2: "WITH THE LETTER C. Money in the form of coins and bills.",
    answer2: "cash",
    question3: "WITH THE LETTER C. A state of total confusion WITHh no order.",
    answer3: "chaos",
  },
  {
    letter: "d",
    status: 0,
    question1:
      "WITH THE LETTER D. Abnormality in the function of the digestive system characterized by frequent evacuations and its liquid consistency",
    answer1: "diarrhea",
    answer2: "dance",
    question2: "WITH THE LETTER D. To move your body in a way that goes with the rhythm and style of music that is being played.",
    question3:
      "WITH THE LETTER D. A process of separating substances from liquid by putting them through a thin piece of skin-like material, especially to make pure the blood of people whose kidneys are not working correctly.",
    answer3: "dialysis",
  },
  {
    letter: "e",
    status: 0,
    question1: "WITH THE LETTER E. Gelatinous and lies below the plasma membrane. Ghostbusters measured its radiation",
    answer1: "ectoplasm",
    question2: "WITH THE LETTER E. The line of hair that grows over the eye.",
    answer2: "eyebrow",
    question3: "WITH THE LETTER E. Profoundly immoral and wicked.",
    answer3: "evil",
  },
  {
    letter: "f",
    status: 0,
    question1: "WITH THE LETTER F. That does not require great effort, capacity",
    answer1: "fair",
    question2: "WITH THE LETTER F. Strong belief or trust in someone or something.",
    answer2: "faith",
    question3: "WITH THE LETTER F. An unpleasant emotion caused by the threat of danger, pain, or harm.",
    answer3: "fear",
  },
  {
    letter: "g",
    status: 0,
    question1: "WITH THE LETTER G. Huge set of stars, interstellar dust, gases and particles",
    answer1: "galaxy",
    question2: "WITH THE LETTER G. Much larger or more powerful than normal. A legendary creature with this characteristics.",
    answer2: "giant",
    question3:
      "WITH THE LETTER G. An apparition of a dead person which is believed to appear or become manifest to the living, typically as a nebulous image.",
    answer3: "ghost",
  },
  {
    letter: "h",
    status: 0,
    question1: "WITH THE LETTER H. Japanese ritual suicide by disembowelment",
    answer1: "harakiri",
    question2: "WITH THE LETTER H. One of two equal or nearly equal parts into which something can be divided.",
    answer2: "half",
    question3: "WITH THE LETTER H. A settled or regular tendency or practice, especially one that is hard to give up.",
    answer3: "habit",
  },
  {
    letter: "i",
    status: 0,
    question1: "WITH THE LETTER I. Tony Stark is the alta-ego of which superhero?",
    answer1: "Ironman",
    question2: "WITH THE LETTER I. Not allowed by the law.",
    answer2: "illegal",
    question3: "WITH THE LETTER I. The faculty or action of forming new ideas, or images or concepts of external objects not present to the senses.",
    answer3: "imagination",
  },
  {
    letter: "j",
    status: 0,
    question1: "WITH THE LETTER J. Which Italian football club based in Turin wears black and white stripes?",
    answer1: "juventus",
    question2: "WITH THE LETTER J. Something said or done to cause laughter.",
    answer2: "joke",
    question3: "WITH THE LETTER J. An ornament or piece that contains a precious stone or stones.",
    answer3: "jewel",
  },
  {
    letter: "k",
    status: 0,
    question1: "WITH THE LETTER K. Person who risks his life carrying out a reckless action",
    answer1: "kamikaze",
    question2: "WITH THE LETTER K. A device that is used to open a lock or start an automobile.",
    answer2: "key",
    question3: "WITH THE LETTER K. A recurrent urge to steal, typically WITHhout regard for need or profit.",
    answer3: "kleptomania",
  },
  {
    letter: "l",
    status: 0,
    question1: "WITH THE LETTER L. Werewolf",
    answer1: "lycanthrope",
    answer2: "lazy",
    question2: "WITH THE LETTER L. Not liking to work hard or to be active. Slow and relaxed.",
    question3: "WITH THE LETTER L. A person who doesn't tell the truth.",
    answer3: "lier",
  },
  {
    letter: "m",
    status: 0,
    question1: "WITH THE LETTER M. Person who flees from dealing with other people or feels great aversion towards them",
    answer1: "misanthrope",
    answer2: "milk",
    question2:
      "WITH THE LETTER M. The white liquid produced by cows, goats and some other animals as food for their young and used as a drink by humans.",
    question3:
      "WITH THE LETTER M. the practice of being aware of your body, mind, and feelings in the present moment, thought to create a feeling of calm.",
    answer3: "mindfullness",
  },
  {
    letter: "n",
    status: 0,
    question1: "WITH THE LETTER N. Opposite of day",
    answer1: "night",
    question2: "WITH THE LETTER N. Failure to take the care that a responsible person usually takes : lack of normal care or attention.",
    answer2: "negligence",
    question3: "WITH THE LETTER N. A person who has an excessive interest in or admiration of themselves.",
    answer3: "narcissist",
  },
  {
    letter: "o",
    status: 0,
    question1: "WITH THE LETTER O. Fantastic humanoid with a terrible and bestial appearance, green skin created by the writer Tolkien",
    answer1: "orc",
    answer2: "obsession",
    question2:
      "WITH THE LETTER O. A state in which someone thinks about someone or something constantly or frequently especially in a way that is not normal.",
    question3: "WITH THE LETTER O. The Japanese art of folding paper into decorative shapes and figures.",
    answer3: "origami",
  },
  {
    letter: "p",
    status: 0,
    question1: "WITH THE LETTER P. Technologically advanced ancestral race characterized by its great psionic powers from the video game StarCraft",
    answer1: "protoss",
    answer2: "pair",
    question2: "WITH THE LETTER P. Two things that are the same and are meant to be used together.",
    question2:
      "WITH THE LETTER O. A state in which someone thinks about someone or something constantly or frequently especially in a way that is not normal.",
    answer2: "obsession",
    question3: "WITH THE LETTER P. An oval fleshy fruit which is purple, reddish, or yellow when ripe and contains a flattish pointed stone.",
    answer3: "plum",
  },
  {
    letter: "q",
    status: 0,
    question1: "WITH THE LETTER Q. A sentence worded or expressed so as to elicit information.",
    answer1: "question",
    question2: "WITH THE LETTER Q. A woman who rules a country and who usually inherits her position and rules for life.",
    answer2: "queen",
    question3: "WITH THE LETTER Q. A list of questions that several people are asked so that information can be collected about something.",
    answer3: "questionnaire",
  },
  {
    letter: "r",
    tatus: 0,
    question1: "WITH THE LETTER R. Rodent",
    answer1: "raton",
    question2: "WITH THE LETTER R. To feel sad or sorry about (something that you did or did not do).",
    answer2: "regret",
    question3: "WITH THE LETTER R. A full, deep, prolonged cry uttered by a lion or other large wild animal.",
    answer3: "roar",
  },
  {
    letter: "s",
    status: 0,
    question1: "WITH THE LETTER S. Community that saves all computer.",
    answer1: "stackoverflow",
    question2: "WITH THE LETTER S. An amount of money that an employee is paid.",
    answer2: "salary",
    question3: "WITH THE LETTER S. Used as a polite or respectful way of addressing a man, especially one in a position of authority.",
    answer3: "sir",
  },
  {
    letter: "t",
    status: 0,
    question1: "WITH THE LETTER T. Film by director James Cameron that established Arnold Schwarzenegger as an actor in 1984",
    answer1: "terminator",
    question2: "WITH THE LETTER T. A building for worship.",
    answer2: "temple",
    question3: "WITH THE LETTER T. A greenish-blue colour.",
    answer3: "turquoise",
  },
  {
    letter: "u",
    status: 0,
    question1: "WITH THE LETTER U. Spanish writer and philosopher of the generation of '98 author of the book 'Niebla' in 1914.",
    answer1: "unamuno",
    question2:
      "WITH THE LETTER U. Located or occurring below the surface of the earth. A system of trains that run below the ground in a large city.",
    answer2: "underground",
    question3:
      "WITH THE LETTER U. A final demand or statement of terms, the rejection of which will result in retaliation or a breakdown in relations.",
    answer3: "ultimatum",
  },
  {
    letter: "v",
    status: 0,
    question1:
      "WITH THE LETTER V. Name given to the members of the Nordic peoples originating from Scandinavia, famous for their raids and looting in Europe.",
    answer1: "vikings",
    question2:
      "WITH THE LETTER V. A person who does not eat meat for health or religious reasons or because they want to avoid being cruel to animals.",
    answer2: "vegetarian",
    question3: "WITH THE LETTER V. The sound produced in a person's larynx and uttered through the mouth, as speech or song.",
    answer3: "voice",
  },
  {
    letter: "w",
    status: 0,
    question1: "INCLUDES THE LETTER W. Fast food made with two slices of bread between which ham and cheese are placed",
    answer1: "sandwich",
    question2:
      "WITH THE LETTER W. Uncontrolled, violent, or extreme. / Used to refer to plants or animals that live or grow independently of people, in natural conditions and with natural characteristics.",
    answer2: "wild",
    question3: "WITH THE LETTER W. A piece of rope holded by the extremes which serves to jump.",
    answer3: "warp",
  },
  {
    letter: "x",
    status: 0,
    question1: "INCLUDES THE LETTER X. Bacterial toxin used in cosmetic surgery.",
    answer1: "botox",
    question2: "Contains the letter X. To become or to cause (something) to become less tense, tight, or stiff.",
    answer2: "relax",
    question3: "Contains the letter X. A plane figure WITHh six straight sides and angles.",
    answer3: "hexagon",
  },
  {
    letter: "y",
    status: 0,
    question1: "INCLUDES THE LETTER Y. Small cactus known for its psychoactive alkaloids used ritually and medicinally by Native Americans.",
    answer1: "peyote",
    question2: "WITH THE LETTER Y. Used to give a positive answer2 or reply to a question2, request, or offer.",
    answer2: "yes",
    question3: "WITH THE LETTER Y. The time taken by the earth to make one revolution around the sun.",
    answer3: "year",
  },
  {
    letter: "z",
    status: 0,
    question1: "WITH THE LETTER Z. School of Buddhism that seeks the experience of wisdom beyond rational discourse",
    answer1: "zen",
    question2: "Contains the letter Z. A poisonous gas with a strong smell that is a form of oxygen.",
    answer2: "ozone",
    question3: "WITH THE LETTER Z. The scientific study of animals, especially their structure.",
    answer3: "zoology",
  },
];
let userName, randomQuestionNumber;
const timeLimit = 1170.43;
let rounds = 0;
let answeredLettersList = [];
let pasapalabraList = [];
let questionNumber = 0;
let pasapalabraQuestions;
let pasapalabraQuestionNumber;
let points=0;
let ranking=[{name: 'Anibal', points: 20},{name: 'Enki', points: 26},{name: 'Banano', points: 13}];

const askForNameAndGreet = (timeLimit) => {
  const userName = prompt("Hello! Welcome to ISDI PASAPALABRA. Please, enter your name!", "Anibal");
  if (userName === null || userName === "" || userName == " ") {
    askForNameAndGreet(timeLimit);
  } else {
    console.log(
      `Hi ${userName}, let's Play Pasapalabra!\nType \"end\" to quit and \"pasapalabra\" to skip to next letter\n You have ${timeLimit} seconds limit to complete the game.`
    );
    alert(
      `Hi ${userName}, let's Play Pasapalabra!\nType \"end\" to quit and \"pasapalabra\" to skip to next letter\n You have ${timeLimit} seconds limit to complete the game.`
    );
    return userName;
  }
};

const randomNumber = () => {
  return Math.round(Math.random() * (3 - 1)) + 1;
};

const askLetter = (questions, userName, start) => {
  rounds++;
  alert(`Round: ${rounds}`);
  console.log(`// Round: ${rounds} ////////////////////////////`);

  let userAnswer, status, question, answer, letter, answerNumber;

  randomQuestionNumber = randomNumber();
  questionNumber = "question" + randomQuestionNumber;
  answerNumber = "answer" + randomQuestionNumber;
  for (let i = 0; i < questions.length; i++) {
    if (rounds > 1 && checkPasapalabraStatus(questions)) {
      questionNumber = "question" + pasapalabraQuestionNumber;
      answerNumber = "answer" + pasapalabraQuestionNumber;
    }
    question = questions[i][questionNumber];
    answer = questions[i][answerNumber];
    questionsObject = i;
    status = questions[i].status;
    letter = questions[i].letter;

    userAnswer = prompt(`${question}`, `${answer}`);
    while (userAnswer === null || userAnswer === "" || userAnswer == " ") {
      userAnswer = prompt(`${question}`, `${answer}`);
    };

    let response = checkAnswer(questionsObject, question, userAnswer, answer, start, letter, status, randomQuestionNumber);



    if (response === "END") {
      return "END";
    } else if (response === "TIME") {
      console.log(`// TIME'S UP! ////////////////////////////`);
      alert(`TIME'S UP!`);
      return "TIME";
    }
  }
};

const checkAnswer = (questionsObject, question, userAnswer, answer, start, letter, status, randomQuestionNumber) => {
  let millis = Date.now() - start;
  if (Math.floor(millis / 1000) >= timeLimit) {
    return "TIME";
  } else {
    console.log(`// Time left: ${timeLimit - Math.floor(millis / 1000)} seconds`);
  }

  if (userAnswer.toUpperCase() === "END") {
    return "END";
  } else if (userAnswer.toUpperCase() === answer.toUpperCase()) {
    console.log(`RIGHT ANSWER!! the word is: ${answer.toUpperCase()}`);
    alert(`RIGHT ANSWER!! the word is: ${answer.toUpperCase()}`);
    //aquí no seleccina la respuesta correcta en el siguiente turno questionObject no coreresponde al array filtrado
    if (rounds>1) {
      pasapalabraQuestions[questionsObject].status = 1;
    } else {
      questions[questionsObject].status = 1;
    };
    console.table(showAnsweredLetters());
  } else if (userAnswer.toUpperCase() === "pasapalabra".toUpperCase()) {
    console.log(`// PASAPALABRA!`);
    alert(`PASAPALABRA!`);
    if (rounds > 1) {
      pasapalabraQuestions[questionsObject].status = 3;
    } else {
      questions[questionsObject].status = 3;
    }
    if (rounds < 2) {
      pasapalabraQuestionNumber = randomQuestionNumber;
    }

    // pasapalabraList.push({ letter, status: 3, question, answer });
    console.table(showAnsweredLetters());
  } else {
    console.log(`//WRONG ANSWER!! word isn't: ${userAnswer}`);
    alert(`WRONG ANSWER!! word isn't: ${userAnswer}`);
    if (rounds > 1) {
      pasapalabraQuestions[questionsObject].status = 2;
    } else {
      questions[questionsObject].status = 2;
    }
    answeredLettersList.push({ letter: questions[questionsObject].letter, question: questions[questionsObject].question, answer: userAnswer });

    console.table(showAnsweredLetters());
  }
};

const showAnsweredLetters = () => {
  let list = [];
  questions.forEach((element) => {
    if (element.status === 2) {
      list.push({ letter: element.letter, question: element["question" + randomQuestionNumber], answer: "X" });
    } else if (element.status === 1) {
      list.push({ letter: element.letter, question: element["question" + randomQuestionNumber], answer: element["answer" + randomQuestionNumber] });
    } else if (element.status === 3) {
      list.push({ letter: element.letter, question: element["question" + randomQuestionNumber], answer: "PASAPALABRA!" });
    }
  });
  return list;
};

const endGame = () => {
  console.log(`Bye ${userName}!\nThanks for playing ISDI Pasapalabra.\nThis is your game result:`);
  if (showAnsweredLetters(questions).length > 0) {
    points=questions.filter((letter) => letter.status === 1).length;
    console.log(`Total RIGHT Letters answered: ${points}`);
    console.table(showAnsweredLetters(questions));
    saveGame(userName, points);
    showRanking(rankUsers(ranking));
  } else {
    console.log("Nothing answered!");
  }
  switch (confirm("Try again?")) {
    case true:
      rounds = 0;
      answeredLettersList = [];
      pasapalabraList = [];
      questions.forEach((element) => {
        element.status = 0;
      });
      return game();
    default:
      return alert(`Bye ${userName}!\nThanks for playing ISDI Pasapalabra.`);
  }
};


const checkPasapalabraStatus = (questions) => {
  return questions.filter((letter) => letter.status === 3).length > 0;
};

const saveGame = (name, points) => {
ranking.push({name,points});
}


const rankUsers= () => {
  ranking.sort((a, b) => b.points - a.points);
  return ranking;
}

const showRanking = () =>{
console.log('//This is the Ranking:');
for (let i = 0; i < ranking.length; i++) {
  console.log(`${i + 1}. ${ranking[i].name} - ${ranking[i].points} points`);
};
};

const game = () => {
  console.log(`// PASAPALABRA ///////////////////////////////////////////////////////////////`);
  const start = Date.now();

  let action;

  userName = askForNameAndGreet(timeLimit);
  action = askLetter(questions, userName, start);
  if (action === "END" || action === "TIME") {
    endGame(userName);
    return console.log(`// PASAPALABRA ///////////////////////////////////////////////////////////// SEE YOU NEXT TIME! //`);
  }

  while (checkPasapalabraStatus(questions) && action !== "END" && action !== "TIME") {
    pasapalabraQuestions = questions.filter((letter) => letter.status === 3);
    action = askLetter(pasapalabraQuestions, userName, start);
  }
  alert(`Congrats ${userName}!\nYou've answered all Letters of PASAPALABRA!`);
  console.log(`// Congrats ${userName}!\nYou've answered all Letters of PASAPALABRA!\nNumber of ROUNDS to finish: ${rounds}`);
  endGame(userName);
};

game();
