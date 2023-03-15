var questions = [
	{letter: "a", answer: "abducir", status: 0, question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien")},
	{letter: "b", answer: "bingo", status: 0, question: ("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso")},
	{letter: "c", answer: "churumbel", status: 0, question: ("CON LA C. Niño, crío, bebé")},
	{letter: "d", answer: "diarrea", status: 0, question: ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida")},
	{letter: "e", answer: "ectoplasma", status: 0, question: ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación")},
	{letter: "f", answer: "facil", status: 0, question: ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad")},
	{letter: "g", answer: "galaxia", status: 0, question: ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas")},
	{letter: "h", answer: "harakiri", status: 0, question: ("CON LA H. Suicidio ritual japonés por desentrañamiento")},
	{letter: "i", answer: "iglesia", status: 0, question: ("CON LA I. Templo cristiano")},
	{letter: "j", answer: "jabali", status: 0, question: ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba")},
	{letter: "k", answer: "kamikaze", status: 0, question: ("CON LA K. Persona que se juega la vida realizando una acción temeraria")},
	{letter: "l", answer: "licantropo", status: 0, question: ("CON LA L. Hombre lobo")},
	{letter: "m", answer: "misantropo", status: 0, question: ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas")},
	{letter: "n", answer: "necedad", status: 0, question: ("CON LA N. Demostración de poca inteligencia")},
	{letter: "ñ", answer: "señal", status:0, question: ("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.")},
	{letter: "o", answer: "orco", status: 0, question: ("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien")},
	{letter: "p", answer: "protoss", status: 0, question: ("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft")},
	{letter: "q", answer: "queso", status: 0, question: ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche")},
	{letter: "r", answer: "raton", status: 0, question: ("CON LA R. Roedor")},
	{letter: "s", answer: "stackoverflow", status: 0, question: ("CON LA S. Comunidad salvadora de todo desarrollador informático")},
	{letter: "t", answer: "terminator", status: 0, question: ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984")},
	{letter: "u", answer: "unamuno", status: 0, question: ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914")},
	{letter: "v", answer: "vikingos", status: 0, question: ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa")},
	{letter: "w", answer: "sandwich", status: 0, question: ("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso")},
	{letter: "x", answer: "botox", status: 0, question: ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética")},
	{letter: "y", answer: "peyote", status: 0, question: ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos")},
	{letter: "z", answer: "zen", status: 0, question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional")},
];

let allLetter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let correctAnswers = 0;
let errors = 0;
let possibleQuestions = [];
let singleQuestion;
let letsPlay = true;
let gameIsOn = true;
const ranking = [];


const getName = () => {
    userName = prompt (`Bienvenido al juego de Pasapalabra de ISDI CODERS!
Por favor, introduce tu nombre:`);

    confirm (`${userName}, el juego consiste en adivinar palabras que empiezan o contienen una letra determinada del abecedario.
En orden alfabético cada ronda se realizará una pregunta con respecto a dicha palabra.
Cada palabra acertada equivale a 1 punto.
Se puede decir PASAPALABRA para pasar de pregunta y guardarla para más tarde.
Si se falla la respuesta no se gana el punto y se pierde la opción de acertar esa pregunta.
Empezamos!`);
};

const askQuestion = () => {
	
    let userAnswer = prompt (singleQuestion.question);
	userAnswer = userAnswer.toLowerCase();
    if (userAnswer === 'pasapalabra') {
        allLetter.push(allLetter[0]);
        allLetter.splice(0, 1);
    };
	if (userAnswer === 'end') {
		gameIsOn = false;
	}
    if (userAnswer === singleQuestion.answer) {
        Object.values(questions)[0].status = 1;
        correctAnswers++
        allLetter.splice(0, 1);
    } else if (userAnswer != 'pasapalabra' && userAnswer != 'end' && userAnswer != singleQuestion.answer) {
        Object.values(questions)[0].status = 2;
        errors++
        allLetter.splice(0, 1);
    };
	console.log(`Aciertos = ${correctAnswers}
Fallos = ${errors}`)
};

const getQuestionsSameLetter = () => {
	possibleQuestions = [];
	for (index = 0; index < questions.length; index++) {
		if (Object.values(questions)[index].letter === allLetter[0]) {
			possibleQuestions.push(questions[index]);
		};	
	};
    singleQuestion = possibleQuestions[Math.floor(Math.random()*possibleQuestions.length)];
};

const getRanking = () => {
	let playerDetails;
	const player = {};
	const playersFinalRankingList = [];
	player.name = userName;
	player.correct = correctAnswers;
	player.incorrect = errors;
	ranking.push(player);
	ranking.sort((a, b) => b.correct - a.correct)
	for (position = 0; position < ranking.length; position++) {
		ranking[position].ranked = position + 1;
	}
	for (players = 0; players < ranking.length; players++) {
		playerDetails = `En ${ranking[players].ranked}ª posición: ${ranking[players].name}, con ${ranking[players].correct} aciertos y ${ranking[players].incorrect} errores!`;
		playersFinalRankingList.push(playerDetails);
	}
	return playersFinalRankingList.join('\r\n');
};

const endGame = () => {
    let keepPlayingCheck = true;
    let keepPlaying = prompt (`Quieres empezar otra partida? si/no.`);
    do {keepPlaying = keepPlaying.toLowerCase();
        if (keepPlaying === 's' || keepPlaying === 'si') {
            keepPlayingCheck = false;
            allLetter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
			correctAnswers = 0;
			errors = 0;
			possibleQuestions = [];
			singleQuestion;
			letsPlay = true;
			gameIsOn = true;
        };
        if (keepPlaying === 'n' || keepPlaying === 'no') {
            keepPlayingCheck = false;
            letsPlay = false;
            alert (`Hasta la próxima ${userName}! Esperamos volverte a ver pronto en Pasapalabra ISDI CODERS!`);
        }; 
        if (keepPlaying != 's' && keepPlaying != 'si' && keepPlaying != 'n' && keepPlaying != 'no') {
            keepPlaying = prompt (`Por favor, responde si o no!`);
        };
    } while (keepPlayingCheck);
}

const playPasapalabra = () => {
	do {
		getName();
		do {
    		if (allLetter.length > 0) {
				getQuestionsSameLetter();
        		askQuestion();
        		console.log(`Quedan ${allLetter.length} preguntas`)
    		};
    		if (allLetter.length === 0) {
        		gameIsOn = false;
    		};
		} while (gameIsOn);
		alert (`${userName}, has acertado ${correctAnswers} preguntas y has fallado ${errors} preguntas!`)
		alert (getRanking());
		endGame();
	} while (letsPlay);
};

playPasapalabra();