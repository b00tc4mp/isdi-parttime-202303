const initialQuestions = [
  {
    letter: "a",
    status: 0,
    questions: [
      {
        answer: "abducir",
        question:
          "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien",
      },
      {
        answer: "amistad",
        question:
          "CON LA A. Relación de afecto, simpatía y confianza que se establece entre personas que no son familia.",
      },
      {
        answer: "abogado",
        question:
          "CON LA A. Persona que ejerce profesionalmente la defensa jurídica de una de las partes en juicio, así como los procesos judiciales y administrativos ocasionados o sufridos por ella.",
      },
    ],
  },
  {
    letter: "b",
    status: 0,
    questions: [
      {
        answer: "bingo",
        question:
          "CON LA B. Juego que ha sacado de quicio a todos los 'Coders' en las sesiones de precurso",
      },
      {
        answer: "bicicleta",
        question:
          "CON LA B. Vehículo de transporte personal con dos ruedas que se mueve gracias a la fuerza ejercida por el usuario sobre los pedales.",
      },
      {
        answer: "badminton",
        question:
          "CON LA B. Deporte que se practica con raquetas y un volante o shuttlecock que se golpea por encima de una red.",
      },
    ],
  },
  {
    letter: "c",
    status: 0,
    questions: [
      {
        answer: "churumbel",
        question: "CON LA C. Niño, crío, bebé",
      },
      {
        answer: "carpinteria",
        question:
          "CON LA C. Oficio o arte de trabajar la madera para hacer construcciones, muebles u otros objetos.",
      },
      {
        answer: "circo",
        question:
          "CON LA C. Espectáculo público en el que se presentan diversos números artísticos como malabares, acrobacias y payasos.",
      },
    ],
  },
];

let recordsTable = [];
let resumeAnswers = [" ", "Estas fueron tus respuestas: "];
let correctAnswers = 0;

function removeAccents(word) {
  const normalizedWord = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return normalizedWord.replace(/\W/g, "");
}

const checkQuestions = (questionsToCheck, questionIndex) => {
  for (let check of questionsToCheck) {
    if (check.status === 0 || check.status === "pasapalabra") {
      let question = check.questions[questionIndex].question;
      let answer = check.questions[questionIndex].answer;

      console.log(question);

      let userAnswer = prompt("¿Cual es la palabra?");
      if (userAnswer) {
        userAnswer = removeAccents(userAnswer.toLowerCase());
      }

      if (userAnswer === "end") {
        return false;
      } else if (userAnswer === answer) {
        check.status = "correcta";
        correctAnswers += 1;
        console.log("Correcto, 1 punto!");
      } else if (userAnswer === "pasapalabra") {
        check.status = "pasapalabra";
        console.log("Pasapalabra");
      } else {
        check.status = "incorrecta";
        console.log(`Incorrecta, la palabra era ${answer}.`);
      }
    }
  }
  return correctAnswers;
};

const displayRecordsTable = (points, user) => {
  recordsTable.push([points, user]);

  let sortedRecords = recordsTable.sort(function (a, b) {
    return b[0] - a[0];
  });

  console.log([" ", "Records table", " "].join("\n"));
  for (let i = 0; i < sortedRecords.length; i++) {
    let playerPoints = sortedRecords[i][0];
    let playerName = sortedRecords[i][1];
    console.log(`${playerPoints} points, ${playerName}.`);
  }
};

const displayAnsweredQuestions = (questionsAnswered, answerIndex) => {
  for (let answer of questionsAnswered) {
    let answers = answer.questions[answerIndex];

    let question = answers.question;
    let answerStatus = answer.status;

    resumeAnswers.push(
      " ",
      `${question}`,
      " ",
      `Tu respuesta fue ${answerStatus}.`,
      " "
    );
  }
  return resumeAnswers;
};

const pasaPalabra = () => {
  const userName = prompt("¿Como te llamas?");
  const questionsIndex = Math.floor(Math.random() * 3);

  let questionsPlayers = JSON.parse(JSON.stringify(initialQuestions));
  let questionsToPlay = questionsPlayers.slice();

  console.log(`Jugemos a Pasapalabra ${userName}.`);

  do {
    correctAnswers = checkQuestions(questionsToPlay, questionsIndex);
    questionsToPlay = questionsToPlay.filter(
      (questions) => questions.status === "pasapalabra"
    );
  } while (questionsToPlay.length > 0 && correctAnswers);

  if (correctAnswers) {
    displayRecordsTable(correctAnswers, userName);
    correctAnswers = 0;
  }
  displayAnsweredQuestions(questionsPlayers, questionsIndex);
  console.log(resumeAnswers.join("\n"));
  resumeAnswers = [" ", `Estas fueron tus respuestas: `];
};

do {
  playGame = confirm("¿Jugamos a un juego?");

  if (playGame) {
    pasaPalabra();
  }
} while (playGame);

console.log("Hasta la vista!");
