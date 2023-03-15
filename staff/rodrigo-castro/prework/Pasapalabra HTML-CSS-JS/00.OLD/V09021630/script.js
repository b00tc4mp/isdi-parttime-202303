const questions = [
  {
    letter: "a",
    answer: "abducir",
    status: 0,
    question:
      "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien",
  },
  {
    letter: "b",
    answer: "bingo",
    status: 0,
    question:
      "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso",
  },
  {
    letter: "c",
    answer: "churumbel",
    status: 0,
    question: "CON LA C. Niño, crío, bebé",
  },
  {
    letter: "d",
    answer: "diarrea",
    status: 0,
    question:
      "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida",
  },
  {
    letter: "e",
    answer: "ectoplasma",
    status: 0,
    question:
      "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación",
  },
  {
    letter: "f",
    answer: "facil",
    status: 0,
    question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad",
  },
  {
    letter: "g",
    answer: "galaxia",
    status: 0,
    question:
      "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas",
  },
  {
    letter: "h",
    answer: "harakiri",
    status: 0,
    question: "CON LA H. Suicidio ritual japonés por desentrañamiento",
  },
  {
    letter: "i",
    answer: "iglesia",
    status: 0,
    question: "CON LA I. Templo cristiano",
  },
  {
    letter: "j",
    answer: "jabali",
    status: 0,
    question:
      "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba",
  },
  {
    letter: "k",
    answer: "kamikaze",
    status: 0,
    question:
      "CON LA K. Persona que se juega la vida realizando una acción temeraria",
  },
  {
    letter: "l",
    answer: "licantropo",
    status: 0,
    question: "CON LA L. Hombre lobo",
  },
  {
    letter: "m",
    answer: "misantropo",
    status: 0,
    question:
      "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas",
  },
  {
    letter: "n",
    answer: "necedad",
    status: 0,
    question: "CON LA N. Demostración de poca inteligencia",
  },
  {
    letter: "ñ",
    answer: "señal",
    status: 0,
    question:
      "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.",
  },
  {
    letter: "o",
    answer: "orco",
    status: 0,
    question:
      "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien",
  },
  {
    letter: "p",
    answer: "protoss",
    status: 0,
    question:
      "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft",
  },
  {
    letter: "q",
    answer: "queso",
    status: 0,
    question:
      "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche",
  },
  { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor" },
  {
    letter: "s",
    answer: "stackoverflow",
    status: 0,
    question: "CON LA S. Comunidad salvadora de todo desarrollador informático",
  },
  {
    letter: "t",
    answer: "terminator",
    status: 0,
    question:
      "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984",
  },
  {
    letter: "u",
    answer: "unamuno",
    status: 0,
    question:
      "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914",
  },
  {
    letter: "v",
    answer: "vikingos",
    status: 0,
    question:
      "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa",
  },
  {
    letter: "w",
    answer: "sandwich",
    status: 0,
    question:
      "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso",
  },
  {
    letter: "x",
    answer: "botox",
    status: 0,
    question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética",
  },
  {
    letter: "y",
    answer: "peyote",
    status: 0,
    question:
      "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos",
  },
  {
    letter: "z",
    answer: "zen",
    status: 0,
    question:
      "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional",
  },
];

let playing;
const userAnswers = [];
let userId = 0;
let myName;
let userEnd = false;
let pasapalabra = false;
let acertsCounter = 0;
const ranking = [];
let nameAndScore = [];
let elapsedTime;
let numberOfQuestion = 0;
let start;
let timeRunOut;

const askForNameAndGreet = () => {
  const userName = prompt("Hola! Para comenzar, por favor, dime tu nombre!");
  if(userName === null || userName === ""){
    return askForNameAndGreet();
  }
  console.log(`Bienvenid@ ${userName}! Comencemos!`);
  return userName;
};

const rulesOfGame = () => {
  console.log(
    "El juego se llama PASAPALABRA. Consiste en acertar 27 palabras, cada una de las cuales se corresponde con una letra del rosco."
  );
  console.log(
    "Para ello, se brinda una definición relativa al concepto de dicha palabra. Cuanto mayor sea el número de palabras adivinadas, mayor será el puntaje obtenido al finalizar la partida."
  );
  console.log(
    "Si desea saltar la pregunta y responderla en la siguiente ronda, introduzca PASAPALABRA. Si desea terminar su partida, introduzca END."
  );
  const startGame = confirm("Deseas comenzar?");
  return startGame;
};

const roundOfQuestions = () => {
  for (let i = 0; i < questions.length; i++) {    
    showQuestion.textContent = questions[i].question;

    
    // let answerAux;
    // do {
    //   showQuestion.textContent = questions[i].question;
    // } while (answerAux === null || answerAux === "");
    // if (answerAux.toLowerCase() === "end") {
    //   userEnd = true;
    //   break;
    // }
    // if (answerAux.toLowerCase() === questions[i].answer){
    //   acertsCounter++;
    //   alert('Correcta! :)');
    // } else if (answerAux.toLowerCase() === "pasapalabra") {
    //   alert('Puedes responder en la siguiente ronda')
    // } else {
    //   alert('Incorrecta! :(');
    // };
    // if ((Date.now() - start)>50000){
    //   alert('Tiempo terminado!');
    //   timeRunOut = true;
    //   break;
    // }
    // userAnswers.push(answerAux.toLowerCase());
  }
};

const extraRounds = () => {
  let answerAuxiliar;
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === "pasapalabra" && !timeRunOut) {
      do {
        answerAuxiliar = prompt(questions[i].question);
      } while (answerAuxiliar === null || answerAuxiliar === "");
      if (answerAuxiliar.toLowerCase() === "end") {
        userEnd = true;
        break;
      }
      if (answerAuxiliar.toLowerCase() === questions[i].answer){
        acertsCounter++;
        alert('Correcta! :)');
      } else if (answerAuxiliar.toLowerCase() === "pasapalabra") {
        alert('Puedes responder en la siguiente ronda')
      } else {
        alert('Incorrecta! :(');
      };
      userAnswers[i] = answerAuxiliar;
      if ((Date.now() - start)>50000){
        alert('Tiempo terminado!');
        timeRunOut = true;
        break;
      }
    }
  }
};

const repeatRounds = () => {
  pasapalabra = userAnswers.includes("pasapalabra");
  if (pasapalabra && !timeRunOut) {
    playing = confirm(`Deseas continuar con la siguiente ronda?`);
  }
  if (pasapalabra && playing) {
    extraRounds();
    if (!userEnd) {
      return repeatRounds();
    }
  }
};

const scorePlot = () => {
  console.log(
    `La partida ha finalizado, has tenido ${acertsCounter} respuestas correctas y ${
      questions.length - acertsCounter
    } incorrectas.`
  );
};

const rankingPush = () => {
  nameAndScore.push(myName);
  nameAndScore.push(acertsCounter);
  ranking.push(nameAndScore);
};

const checkGameFinished = () => {
  if (userAnswers.length === 27 && !userAnswers.includes("pasapalabra")) {
    console.log("Has completado el rosco!");
    scorePlot();
  }
};

const resetGame = () => {
  userAnswers.splice(0);
  userEnd = false;
  pasapalabra = false;
  acertsCounter = 0;
  nameAndScore = [];
};

const showRanking = () => {
  console.log(`Gracias por jugar! A continuación puedes ver cómo ha quedado el ranking.`);
  const sortedRanking = ranking.sort((a, b) => b[1] - a[1]);
  sortedRanking.forEach((singleUser) => {
    console.log(singleUser.join(` - `));
  });
};

const showQuestionI = (i) => {
  
  showQuestion.textContent = questions[i].question;
  sendButton.addEventListener("click", (event) => {
    event.preventDefault();
    nextQuestion = true;
    debugger;
    const word = input.value;
  })
}

const playPasapalabra = () => {
  myName = askForNameAndGreet();
  playing = rulesOfGame();
  elapsedTime = 0;
  timeRunOut = false;
  start = Date.now();
  if (playing) {
    roundOfQuestions();
    if (playing && !userEnd && !timeRunOut) {
      repeatRounds();
    }
  }
  checkGameFinished();
  if (!userEnd) {
    rankingPush();
  } else {
    scorePlot();
  }
  if (!userEnd) {
    let playAgain = confirm("Quieres volver a jugar?");
    if (playAgain) {
      resetGame();
      return playPasapalabra();
    } else {
      showRanking();
    }
  } else {
    showRanking();
  }
  
};

// playPasapalabra();

// START

const addEventListeners = () => {
  const input = document.querySelector(".text-input");
  const sendButton =  document.querySelector(".send-button");
  const pasapalabraButton = document.querySelector(".pasapalabra-button");
  const startButton = document.querySelector(".start-button");
  const endButton = document.querySelector(".end-button");
  const showQuestion = document.querySelector(".questions");
  const finalRanking = document.querySelector(".ranking");
  const restartButton = document.querySelector(".restart")

  startButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (finalRanking.textContent === "" || finalRanking.textContent === null) {
      document.getElementById("js--options").classList.add('options');
      document.getElementById("js--options").classList.remove('hidden');
      document.getElementById("js--goodbye").classList.add('hidden');
      document.getElementById("js--goodbye").classList.remove('goodbye');
      numberOfQuestion = 0;
      showQuestion.textContent = questions[numberOfQuestion].question;
      input.value = "";
    }
    })

  endButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (showQuestion.textContent !== "" && showQuestion.textContent !== null) {
      document.getElementById("js--options").classList.remove('options');
      document.getElementById("js--options").classList.add('hidden');
      document.getElementById("js--goodbye").classList.remove('hidden');
      document.getElementById("js--goodbye").classList.add('goodbye');
      input.value = "";
      finalRanking.textContent = `Has conseguido ${acertsCounter} respuestas correctas.`
    }
  })

  restartButton.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("js--options").classList.add('options');
    document.getElementById("js--options").classList.remove('hidden');
    document.getElementById("js--goodbye").classList.add('hidden');
    document.getElementById("js--goodbye").classList.remove('goodbye');
    showQuestion.textContent = "";
    finalRanking.textContent = "";
    userAnswers = [];
    for (i = 0; i < questions.length; i++) {
      document.getElementById(`letter${i}`).classList.remove('correct');
      document.getElementById(`letter${i}`).classList.remove('incorrect');
    }
    acertsCounter = 0;
  })

  pasapalabraButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (showQuestion.textContent !== null && showQuestion.textContent !== "") {
      userAnswers.push("pasapalabra");
      numberOfQuestion++;
      showQuestion.textContent = questions[numberOfQuestion].question;
      input.value = "";
    }
  })

  sendButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (userAnswers.length < questions.length) {
      if (input.value !== "" && input.value !== null && showQuestion.textContent !== null && showQuestion.textContent !== "" && numberOfQuestion < questions.length) {
        userAnswers.push(input.value.toLowerCase());
        if (input.value.toLowerCase() === questions[numberOfQuestion].answer){
          document.getElementById(`letter${numberOfQuestion}`).classList.add('correct');
          acertsCounter++;
        } else {
          document.getElementById(`letter${numberOfQuestion}`).classList.add('incorrect');
        }
        numberOfQuestion++;
        if (userAnswers.length < questions.length) {
          showQuestion.textContent = questions[numberOfQuestion].question;
        }
        input.value = "";
      }
    } 
    
    if (numberOfQuestion === questions.length) {
      numberOfQuestion = 0;
    }

    if (userAnswers.length === questions.length && userAnswers.includes("pasapalabra")) {
      if (input.value !== "" && input.value !== null){
        userAnswers[numberOfQuestion] = input.value.toLowerCase();
        if (input.value.toLowerCase() === questions[numberOfQuestion].answer){
          document.getElementById(`letter${numberOfQuestion}`).classList.add('correct');
          acertsCounter++;
        } else {
          document.getElementById(`letter${numberOfQuestion}`).classList.add('incorrect');
        }
      }

      if (userAnswers[numberOfQuestion] !== "pasapalabra") {
        do {
          numberOfQuestion++;
         } while (userAnswers[numberOfQuestion] !== "pasapalabra" && numberOfQuestion < questions.length);
      }

       showQuestion.textContent = questions[numberOfQuestion].question;
       input.value = "";
    }
    
    if (userAnswers.length === questions.length && !userAnswers.includes("pasapalabra")){
      document.getElementById("js--options").classList.remove('options');
      document.getElementById("js--options").classList.add('hidden');
      document.getElementById("js--goodbye").classList.remove('hidden');
      document.getElementById("js--goodbye").classList.add('goodbye');
      input.value = "";
      finalRanking.textContent = `Has conseguido ${acertsCounter} respuestas correctas.`
    }

  })
}

addEventListeners()

