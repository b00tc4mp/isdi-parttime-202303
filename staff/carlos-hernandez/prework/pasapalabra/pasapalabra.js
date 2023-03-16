const initialQuestions = [
  {
    letter: "a",
    answer: "abducir",
    status: null,
    question:
      "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien",
  },
  {
    letter: "b",
    answer: "bingo",
    status: null,
    question:
      "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso",
  },
  {
    letter: "c",
    answer: "churumbel",
    status: null,
    question: "CON LA C. Niño, crío, bebé",
  },
  {
    letter: "d",
    answer: "diarrea",
    status: null,
    question:
      "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida",
  },
  {
    letter: "e",
    answer: "ectoplasma",
    status: null,
    question:
      "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación",
  },
  {
    letter: "f",
    answer: "facil",
    status: null,
    question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad",
  },
  {
    letter: "g",
    answer: "galaxia",
    status: null,
    question:
      "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas",
  },
  {
    letter: "h",
    answer: "harakiri",
    status: null,
    question: "CON LA H. Suicidio ritual japonés por desentrañamiento",
  },
  {
    letter: "i",
    answer: "iglesia",
    status: null,
    question: "CON LA I. Templo cristiano",
  },
  {
    letter: "j",
    answer: "jabali",
    status: null,
    question:
      "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba",
  },
  {
    letter: "k",
    answer: "kamikaze",
    status: null,
    question:
      "CON LA K. Persona que se juega la vida realizando una acción temeraria",
  },
  {
    letter: "l",
    answer: "licantropo",
    status: null,
    question: "CON LA L. Hombre lobo",
  },
  {
    letter: "m",
    answer: "misantropo",
    status: null,
    question:
      "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas",
  },
  {
    letter: "n",
    answer: "necedad",
    status: null,
    question: "CON LA N. Demostración de poca inteligencia",
  },
  {
    letter: "ñ",
    answer: "señal",
    status: null,
    question:
      "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.",
  },
  {
    letter: "o",
    answer: "orco",
    status: null,
    question:
      "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien",
  },
  {
    letter: "p",
    answer: "protoss",
    status: null,
    question:
      "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft",
  },
  {
    letter: "q",
    answer: "queso",
    status: null,
    question:
      "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche",
  },
  { letter: "r", answer: "raton", status: null, question: "CON LA R. Roedor" },
  {
    letter: "s",
    answer: "stackoverflow",
    status: null,
    question: "CON LA S. Comunidad salvadora de todo desarrollador informático",
  },
  {
    letter: "t",
    answer: "terminator",
    status: null,
    question:
      "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984",
  },
  {
    letter: "u",
    answer: "unamuno",
    status: null,
    question:
      "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914",
  },
  {
    letter: "v",
    answer: "vikingos",
    status: null,
    question:
      "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa",
  },
  {
    letter: "w",
    answer: "sandwich",
    status: null,
    question:
      "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso",
  },
  {
    letter: "x",
    answer: "botox",
    status: null,
    question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética",
  },
  {
    letter: "y",
    answer: "peyote",
    status: null,
    question:
      "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos",
  },
  {
    letter: "z",
    answer: "zen",
    status: null,
    question:
      "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional",
  },
];
let endTime;
let puntos;
let time;
let pasapalabraAlert = false;

let questions = [...initialQuestions];
let actualIndexQuestion;
let letterToPaint;
let letterInQuestion;

const StartGame = () => {
  actualIndexQuestion = 0;
  puntos = 0;
  time = 150;
  endTime = false;
  questions = [...initialQuestions];
  resetLetterColors();
  habilitar();
  next();
  timer();
  focus();
};

// ****FUNCIONES*****
//cargar la suguiente pregunta

function runScript(e) {
  //See notes about 'which' and 'key'
  if (e.keyCode == 13) {
    verifyAnswer();
  }
}

const focus = () => {
  document.getElementById("answer").focus();
};

const next = () => {
  if (actualIndexQuestion === questions.length) {
    questions = questions.filter((question) => question.status === 2);
    debugger;
    if (questions.length === 0) {
      endProgram();
    }
    if (questions.length > 0) {
      actualIndexQuestion = 0;

      updateUI();
    }
  } else {
    updateUI();
  }
};

const updateUI = () => {
  document.getElementById("questions").innerHTML =
    questions[actualIndexQuestion].question;

  letterInQuestion = questions[actualIndexQuestion].letter;
  letterToPaint = document.getElementById(`${letterInQuestion}`);
  letterToPaint.classList.remove("green");
  letterToPaint.classList.remove("incorrect");
  letterToPaint.classList.remove("yellow");
  letterToPaint.classList.add("gray");
};

const verifyAnswer = () => {
  const answer = document.getElementById("answer").value;

  if (answer === questions[actualIndexQuestion].answer) {
    questions[actualIndexQuestion].status = 1;

    swal("respuesta correcta, has ganado 1 punto!", "", "success").then(() => {
      focus();
    });
    puntos++;
    letterToPaint.classList.remove("gray");
    letterToPaint.classList.remove("yellow");
    letterToPaint.classList.add("green");
  } else {
    questions[actualIndexQuestion].status = 0;
    swal("respuesta incorrecta!", "", "error").then(() => {
      focus();
    });
    letterToPaint.classList.remove("gray");
    letterToPaint.classList.remove("yellow");

    letterToPaint.classList.add("incorrect");
  }

  document.getElementById("answer").value = null;
  actualIndexQuestion++;
  next();
};

const habilitar = () => {
  let section = document.getElementById("container");
  section.classList.toggle("disabled");
};

const paintLetterAddClass = (letter) => {
  let letters = document.querySelectorAll("li");
  letters.forEach((element) => {
    if (element.innerText === letter) {
      element.classList.add("gray");
    }
  });
};

const pasapalabra = () => {
  document.getElementById("answer").value = null;

  letterInQuestion = questions[actualIndexQuestion].letter;
  console.log(letterInQuestion);
  letterToPaint = document.getElementById(`${letterInQuestion}`);
  console.log(letterToPaint);
  letterToPaint.classList.add("yellow");
  questions[actualIndexQuestion].status = 2;
  if (pasapalabraAlert === false) {
    swal(
      "cada respuesta que responda con  PASAPALABRA, se le repetirá al terminar",
      "",
      "info"
    ).then(() => {
      focus();
    });

    pasapalabraAlert = true;
  }
  actualIndexQuestion++;
  next();
};

const resetLetterColors = () => {
  let letters = document.querySelectorAll("li");
  letters.forEach((element) => {
    element.classList.remove("gray");
    element.classList.remove("green");
    element.classList.remove("incorrect");
    element.classList.remove("yellow");
  });
};

const endProgram = () => {
  document.getElementById("questions").innerHTML = "FIN";
  if (endTime === false) {
    swal(
      `has terminado el juego en ${time} segundos, has ganado ${puntos} puntos! `,

      "info"
    );
  }
  if (endTime === true) {
    swal(` Se a acabado el tiempo!, has ganado ${puntos} puntos. `);
  }

  clearInterval(tiempoRegresivoId);
  document.getElementById("temporizador").innerHTML = 00;
  habilitar();
  return;
};

let tiempoRegresivoId = null;

const timer = () => {
  clearInterval(tiempoRegresivoId);

  let mostrarTiempo = document.getElementById("temporizador");

  tiempoRegresivoId = setInterval(() => {
    time--;

    mostrarTiempo.innerHTML = `  ${time}  `;
    if (time === 0) {
      endTime = true;
      endProgram();
    }
  }, 1000);
};
