const playingSet = [
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

let userAnswer;
let playableLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let singleQuestion;
let userAnswerBox;

const getFocus = () => {
	userAnswerBox = document.querySelector('.userAnswerBox');
	userAnswerBox.addEventListener('keypress', function(e) {
		if (e.key === 'Enter') {
			playNextRound();  
		}
		if (e.key === ' ') {
			getNextWord();
		}
	});
	userAnswerBox.focus();
}

const registerEventListeners = () => {
	const pasapalabraButton = document.querySelector(".pasapalabra-button");
	pasapalabraButton.addEventListener("click", () => {
		getNextWord();
	});
  
	const sendButton = document.querySelector(".send-button");
	sendButton.addEventListener("click", () => {
		playNextRound();
	});
  };

const startPlayingPasapalabra = () => {
    document.querySelector(".startStopGame").innerHTML = '<button class="stopGame" onclick="finishGameEarly()">Finalizar!</button>';
	document.querySelector(".answerBox").innerHTML = `<input type="text" class="userAnswerBox">
	<button class="send-button">Enviar!</button>
	<button class="pasapalabra-button">Pasapalabra!</button>`;
	registerEventListeners();
	getFocus();
	playFirstRound();
	document.querySelector(".notifications").style.backgroundImage = 'radial-gradient(rgba(' + 255 + ',' + 255 + ',' + 255 + ',' + 0 +'), rgba(' + 255 + ',' + 196 + ',' + 0 + ',' + 0 +'))';
	document.querySelector(".notifications").innerHTML = '';
	document.querySelector(".hints").innerHTML = 'ENTER para enviar la palabra y el SPACE para hacer pasapalabra.'
}

const stopPlayingPasapalabra = () => {
    document.querySelector(".startStopGame").innerHTML = '<button class="startGame" onclick="startPlayingPasapalabra()">Empezar!</button>';
	userAnswer = document.querySelector('.userAnswerBox');
	playableLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	resetLettersStatus();
	document.querySelector(".answerBox").innerHTML = '';
	document.querySelector(".question-box").innerHTML = '<p class="question">¡¿Quieres volver a jugar?!</p>';
}

const getAnswer = () => {
    userAnswer = document.querySelector('.userAnswerBox').value;
}

const getQuestion = () => {
	for (questionPosition = 0; questionPosition < playingSet.length; questionPosition++) {
        if (playingSet[questionPosition].letter === playableLetters[0]) {
            singleQuestion = playingSet[questionPosition];
        };    
    } 
}

const getCorrectAnswer = () => {
	for (letterPosition = 0; letterPosition < playingSet.length; letterPosition++) {
        if (playingSet[letterPosition].letter === playableLetters[0]) {
            playingSet[letterPosition].status = 1;
        };    
    } 
}

const getIncorrectAnswer = () => {
	for (letterPosition = 0; letterPosition < playingSet.length; letterPosition++) {
        if (playingSet[letterPosition].letter === playableLetters[0]) {
            playingSet[letterPosition].status = 2;
        };    
    } 
}

const changeLetterColorStyle = () => {
	for (letterPosition = 0; letterPosition < playingSet.length; letterPosition++) {
		if (playingSet[letterPosition].status === 0) {
			document.getElementById(playingSet[letterPosition].letter).style.backgroundImage = 'radial-gradient(rgb(' + 255 + ',' + 255 + ',' + 255 + '), rgb(' + 255 + ',' + 196 + ',' + 0 + '))';
		}

		if (playingSet[letterPosition].status === 1) {
			document.getElementById(playingSet[letterPosition].letter).style.backgroundImage = 'radial-gradient(rgb(' + 255 + ',' + 255 + ',' + 255 + '), rgb(' + 0 + ',' + 255 + ',' + 0 + '))';
		}

		if (playingSet[letterPosition].status === 2) {
			document.getElementById(playingSet[letterPosition].letter).style.backgroundImage = 'radial-gradient(rgb(' + 255 + ',' + 255 + ',' + 255 + '), rgb(' + 255 + ',' + 0 + ',' + 0 + '))';
		} 
	}
}

const isAnswerCorrect = () => {
	if (userAnswer.toLowerCase() === 'pasapalabra') {
        playableLetters.push(playableLetters[0]);
        playableLetters.splice(0, 1);
		console.log('PASAPALABRA!')
    };

    if (userAnswer.toLowerCase() === singleQuestion.answer) {
		getCorrectAnswer();
        playableLetters.splice(0, 1);
    };
	
	if (userAnswer.toLowerCase() != 'pasapalabra' && userAnswer.toLowerCase() != 'stop' && userAnswer.toLowerCase() != singleQuestion.answer) {
		getIncorrectAnswer();
        playableLetters.splice(0, 1);
    };

	if (userAnswer.toLowerCase() === 'stop') {
		stopPlayingPasapalabra()
		document.querySelector(".question-box").innerHTML = '';
	};
}

const resetInput = () => {
	document.querySelector(".userAnswerBox").value = '';
}

const playFirstRound = () => {
	getQuestion();
	document.querySelector(".question-box").innerHTML = '<p>' + singleQuestion.question + '</p>';
};

const gameIsOver = () => {
	stopPlayingPasapalabra()
	//const counter glboal pk stopplaying no borri els resultats
	document.querySelector(".question-box").innerHTML = '<p>¡FIN DEL JUEGO!</p><p>Has acertado ' + getResults() + ' de 27 preguntas!</p><p>¿Quieres volver a jugar?</p>'
}

const resetLettersStatus = () => {
	for (letterPosition = 0; letterPosition < playingSet.length; letterPosition++) {
            playingSet[letterPosition].status = 0;    
    }
	changeLetterColorStyle();
}

const finishGameEarly = () => {
	stopPlayingPasapalabra();
	document.querySelector(".notifications").style.backgroundImage = 'radial-gradient(rgb(' + 3 + ',' + 44 + ',' + 120 + '), rgb(' + 2 + ',' + 7 + ',' + 51 + ')' + 70 + '% )';
	document.querySelector(".notifications").innerHTML = '<p class="rules">Has terminado el juego antes de completar el rosco! Vuelve a jugar y completa el rosco para ver tus resultados!</p>';
	document.querySelector(".hints").innerHTML = 'ENTER para enviar la palabra y el SPACE para hacer pasapalabra.'
}

const getResults = () => {
	let counter = 0;
	for (letterPosition = 0; letterPosition < playingSet.length; letterPosition++) {
		if (playingSet[letterPosition].status === 1) {
			counter++
		}
	}
	return counter;
}


const playNextRound = () => {
	if (playableLetters.length > 0) {
		getAnswer();
		resetInput();
		isAnswerCorrect();
		changeLetterColorStyle();
	}
	
	if (userAnswer.value != '' && playableLetters.length != 0) {
		getQuestion();
		document.querySelector(".question-box").innerHTML = '<p>' + singleQuestion.question + '</p>';
		userAnswerBox.focus();
	}
		
	if (playableLetters.length === 0) {
		gameIsOver();
	}
}

const getNextWord = () => {
	if (playableLetters.length > 0) {
		userAnswer = 'pasapalabra';
		resetInput();
		isAnswerCorrect();
		changeLetterColorStyle();
	}
	
	if (userAnswer.value != '' && playableLetters.length != 0) {
		getQuestion();
		document.querySelector(".question-box").innerHTML = '<p>' + singleQuestion.question + '</p>';
		userAnswerBox.focus();
	}
		
	if (playableLetters.length === 0) {
		gameIsOver();
	}
}