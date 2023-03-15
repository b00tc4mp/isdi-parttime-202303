const questions = [
  {
    letter: "a",
    answer: "aguacate",
    status: 0,
    question:
      "CON LA A. Ingrediente principal del guacamole",
  },
  {
    letter: "b",
    answer: "barba",
    status: 0,
    question:
      "CON LA B. Bello facial",
  },
  {
    letter: "c",
    answer: "corcho",
    status: 0,
    question: "CON LA C. Material producido a partir del alcornoque",
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
    answer: "enigma",
    status: 0,
    question:
      "CON LA E. Dicho o cosa que tiene un significado o un sentido oculto y que es difícil de comprender o interpretar",
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
    answer: "helio",
    status: 0,
    question: "CON LA H. Gas noble de bajo peso molecular",
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
      "CON LA K. Persona que da su vida realizando una acción temeraria",
  },
  {
    letter: "l",
    answer: "loro",
    status: 0,
    question: "CON LA L. Ave que copia y repite sonidos, incluyendo la voz humana",
  },
  {
    letter: "m",
    answer: "milanesa",
    status: 0,
    question:
      "CON LA M. Platillo originario de Milan que consiste en carne empanada",
  },
  {
    letter: "n",
    answer: "necedad",
    status: 0,
    question: "CON LA N. Demostración de poca inteligencia",
  },
  {
    letter: "ñ",
    answer: "sueño",
    status: 0,
    question:
      "CONTIENE LA Ñ. Situación imaginaria que sucede mientras dormimos.",
  },
  {
    letter: "o",
    answer: "olvidar",
    status: 0,
    question:
      "CON LA O. Acción de no recordar",
  },
  {
    letter: "p",
    answer: "pandemia",
    status: 0,
    question:
      "CON LA P. Epidemia con alcance global",
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
    answer: "siesta",
    status: 0,
    question: "CON LA S. Momento de descanso, normalmente realizado luego de comer.",
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
    answer: "unicornio",
    status: 0,
    question:
      "CON LA U. Animal fantástico similar al caballo pero con un cuerno en su frente",
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
    answer: "pez",
    status: 0,
    question:
      "CONTIENE LA Z. Ser vivo acuático que posee branqueas para respirar debajo del agua",
  },
];

const userAnswers = [];
let acertsCounter = 0;
let numberOfQuestion = 0
let secondsRemaining = 150;
let setIntervalID;

const countDown = () => {
  setIntervalID = setInterval(decreaseTime, 1000);
  secondsRemaining = 150;
  decreaseTime();
}

const startGame = () => {
  if ((document.querySelector(".ranking").textContent === "" || document.querySelector(".ranking").textContent === null) && secondsRemaining === 150) {
    document.querySelector(".js--options").classList.add('options');
    document.querySelector(".js--options").classList.remove('hidden');
    document.querySelector(".js--goodbye").classList.add('hidden');
    document.querySelector(".js--goodbye").classList.remove('goodbye');
    numberOfQuestion = 0;
      countDown();
    document.querySelector(".questions").textContent = questions[numberOfQuestion].question;
    document.querySelector(".text-input").value = "";
  }
}

const endGame = () => {
  if (document.querySelector(".questions").textContent !== "" && document.querySelector(".questions").textContent !== null) {
    document.querySelector(".js--options").classList.remove('options');
    document.querySelector(".js--options").classList.add('hidden');
    document.querySelector(".js--goodbye").classList.remove('hidden');
    document.querySelector(".js--goodbye").classList.add('goodbye');
    document.querySelector(".ranking").textContent = `Has conseguido ${acertsCounter} respuestas correctas.`
    document.querySelector(".text-input").value = "";  
  }
}

const skipWord = () => {
  if (document.querySelector(".questions").textContent !== null && document.querySelector(".questions").textContent !== "") {
    let auxiliaryWord = questions.splice(numberOfQuestion, 1)[0];
    questions.push(auxiliaryWord);
    document.querySelector(".questions").textContent = questions[numberOfQuestion].question;
    document.querySelector(".text-input").value = "";
  }
}

const decreaseTime = () => {
  secondsRemaining--;
  document.querySelector(".js--timer").textContent = secondsRemaining;
  if(secondsRemaining === 0){
    clearInterval(setIntervalID);
    endGame();
  }
}

const pressSend = () => {
  if (userAnswers.length < questions.length) {
    if (document.querySelector(".text-input").value !== "" && document.querySelector(".text-input").value !== null && document.querySelector(".questions").textContent !== null && document.querySelector(".questions").textContent !== "" && numberOfQuestion < questions.length) {
      userAnswers.push(document.querySelector(".text-input").value.toLowerCase());
      if (document.querySelector(".text-input").value.toLowerCase() === questions[numberOfQuestion].answer){
        document.querySelector(`.letter${questions[numberOfQuestion].letter}`).classList.add('correct');
        acertsCounter++;
      } else {
        document.querySelector(`.letter${questions[numberOfQuestion].letter}`).classList.add('incorrect');
      }
      numberOfQuestion++;
      if (userAnswers.length < questions.length) {
        document.querySelector(".questions").textContent = questions[numberOfQuestion].question;
      }
      document.querySelector(".text-input").value = "";
    }
  }
  
  if (userAnswers.length === questions.length){
    endGame();
  }
}

export {countDown ,startGame, endGame, skipWord, decreaseTime, pressSend, questions, userAnswers, acertsCounter, numberOfQuestion, secondsRemaining, setIntervalID};