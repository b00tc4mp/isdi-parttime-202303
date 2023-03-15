const questionsSetOne = [
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
const questionsSetTwo = [
	{letter: "a", answer: "alcachofa", status: 0, question: ("CON LA A. Planta comestible con tallos blancos y hojas verdes. También está en la ducha")},
	{letter: "b", answer: "botiquin", status: 0, question: ("CON LA B. Caja en la que se guardan medicinas")},
	{letter: "c", answer: "camilla", status: 0, question: ("CON LA C. Cama en la que se llevan de un lado a otro heridos o enfermos")},
	{letter: "d", answer: "dedicatoria", status: 0, question: ("CON LA D. Palabras que se escriben y se dicen como regalo a alguien")},
	{letter: "e", answer: "empañar", status: 0, question: ("CON LA E. Mancharse un cristal con el vapor de agua")},
	{letter: "f", answer: "fabula", status: 0, question: ("CON LA F. Cuento en el que los personajes son animales, con el que se aprende algo a través de una moraleja")},
	{letter: "g", answer: "guisar", status: 0, question: ("CON LA G. Preparar alimentos cocinándolos con calor")},
	{letter: "h", answer: "hamaca", status: 0, question: ("CON LA H. Tela resistente que se cuelga de sus extremos y se utiliza como cama")},
	{letter: "i", answer: "imperdible", status: 0, question: ("CON LA I. Alfiler que se abrocha quedando su punta dentro de un gancho")},
	{letter: "j", answer: "jinete", status: 0, question: ("CON LA J. Persona que monta a caballo")},
	{letter: "k", answer: "karaoke", status: 0, question: ("CON LA K. Diversión consistente en interpretar una canción grabada, mientras se sigue la letra que aparece en una pantalla")},
	{letter: "l", answer: "litera", status: 0, question: ("CON LA L. Mueble formado por dos camas puestas una encima de la otra")},
	{letter: "m", answer: "mayonesa", status: 0, question: ("CON LA M. Salsa que se hace batiendo huevo y aceite")},
	{letter: "n", answer: "nuca", status: 0, question: ("CON LA N. Parte posterior de la cabeza situada encima del cuello")},
	{letter: "ñ", answer: "teñir", status:0, question: ("CONTIENE LA Ñ. Dar color al pelo con un tinte especial, permanente o que se va tras algunos lavados")},
	{letter: "o", answer: "orilla", status: 0, question: ("CON LA O. Borde del mar, de un lago o de un río")},
	{letter: "p", answer: "planchar", status: 0, question: ("CON LA P. Quitar las arrugas a una prenda")},
	{letter: "q", answer: "quitamanchas", status: 0, question: ("CON LA Q. Producto natural o preparado que sirve para quitar manchas")},
	{letter: "r", answer: "racimo", status: 0, question: ("CON LA R. Conjunto de uvas sostenidas en un mismo tallo")},
	{letter: "s", answer: "sembrar", status: 0, question: ("CON LA S. Enterrar semillas en la tierra para que crezcan")},
	{letter: "t", answer: "taburete", status: 0, question: ("CON LA T. Asiento sin respaldo")},
	{letter: "u", answer: "untar", status: 0, question: ("CON LA U. Extender mantequilla sobre una rebanada de pan")},
	{letter: "v", answer: "vecino", status: 0, question: ("CON LA V. Persona que vive en el mismo barrio o edificio que otra")},
	{letter: "w", answer: "wifi", status: 0, question: ("CON LA W. Sistema de conexión inalámbrica para conectarse a internet")},
	{letter: "x", answer: "fenix", status: 0, question: ("CONTIENE LA X. Ave fabulosa que los antiguos creyeron que era única y renacía de sus cenizas")},
	{letter: "y", answer: "yunque", status: 0, question: ("CON LA Y. Hueso que se encuentra dentro del oído, situado entre el martillo y el estribo")},
	{letter: "z", answer: "zumbido", status: 0, question: ("CON LA Z. Sonido que producen algunos insectos como la abeja o el mosquito")},
];
const questionsSetThree = [
	{letter: "a", answer: "arteria", status: 0, question: ("CON LA A. Conducto por donde va la sangre desde el corazón a las demás partes del cuerpo")},
	{letter: "b", answer: "bitacora", status: 0, question: ("CON LA B. En los barcos, especie de armario que está fijo en la cubierta y situado muy cerca del timón donde se pone la brújula")},
	{letter: "c", answer: "cicerone", status: 0, question: ("CON LA C. Persona que sirve a otras de guía y les va enseñando y explicando lugares y cosas interesantes")},
	{letter: "d", answer: "diplomacia", status: 0, question: ("CON LA D. Actividad que realiza un país para mantener buenas relaciones con el resto de países")},
	{letter: "e", answer: "quinoccio", status: 0, question: ("CON LA E. Cada uno de los dos momentos del año en que, por estar el Sol sobre el ecuador, los días y las noches duran lo mismo en toda la Tierra")},
	{letter: "f", answer: "fisiologia", status: 0, question: ("CON LA F. Ciencia que estudia las funciones de los órganos de los seres vivos")},
	{letter: "g", answer: "glaciacion", status: 0, question: ("CON LA G. Cada una de las épocas, hace miles de años, en las que hacía mucho más frío que en la actualidad y gran parte de la Tierra estaba cubierta por hielo")},
	{letter: "h", answer: "hinojo", status: 0, question: ("CON LA H. Planta de flores amarillas que se usa como condimento, por el sabor de sus frutos parecido al del anís, y también en medicina porque ayuda a hacer la digestión")},
	{letter: "i", answer: "ingenio", status: 0, question: ("CON LA I. Capacidad para inventar cosas o para pensar y hablar con gracia")},
	{letter: "j", answer: "jade", status: 0, question: ("CON LA J. Mineral muy duro, de color verde o blanquecino, que se emplea en joyería y para hacer objetos de adorno")},
	{letter: "k", answer: "kilimanjaro", status: 0, question: ("CON LA K. Montaña más alta de África")},
	{letter: "l", answer: "lema", status: 0, question: ("CON LA L. Frase que expresa la forma en que debe actuar una persona")},
	{letter: "m", answer: "miriñaque", status: 0, question: ("CON LA M. Prenda rígida o almidonada, a veces con aros, que antiguamente llevaban las mujeres bajo la falda para darle vuelo")},
	{letter: "n", answer: "ninfa", status: 0, question: ("CON LA N. En las leyendas mitológicas, diosa con forma de muchacha que vivía en los bosques, las fuentes o los ríos")},
	{letter: "ñ", answer: "ñandu", status:0, question: ("CONTIENE LA Ñ. Ave parecida al avestruz, pero más pequeña y con tres dedos en cada pie")},
	{letter: "o", answer: "onomatopeya", status: 0, question: ("CON LA O. Palabra que imita el sonido que hace un animal o una cosa")},
	{letter: "p", answer: "pabellon", status: 0, question: ("CON LA P. Edificio que es parte de un conjunto, de otro edificio más grande, o que está muy cerca de él")},
	{letter: "q", answer: "quimera", status: 0, question: ("CON LA Q. Cosa que, sin ser real, alguien la imagina como posible o verdadera")},
	{letter: "r", answer: "remora", status: 0, question: ("CON LA R. Pez marino que tiene una especie de ventosa en la cabeza con la que se fija a otros peces más grandes")},
	{letter: "s", answer: "sotana", status: 0, question: ("CON LA S. Traje negro y largo parecido a una túnica que llevan algunos curas y religiosos")},
	{letter: "t", answer: "testamento", status: 0, question: ("CON LA T. Escrito o declaración de palabra en el que alguien dice lo que quiere que se haga después de su muerte, sobre todo con su dinero o sus pertenencias")},
	{letter: "u", answer: "urbanizacion", status: 0, question: ("CON LA U. Conjunto de casas y edificios que suelen ser parecidos y donde hay tiendas, parques y otros espacios que necesitan las personas que allí viven")},
	{letter: "v", answer: "vencejo", status: 0, question: ("CON LA V. Pájaro de color casi siempre negro o pardo que tiene el pico delgado, las alas muy largas y la cola en forma de horquilla. Vuela muy rápido")},
	{letter: "w", answer: "whisky", status: 0, question: ("CONTIENE LA W. Licor con mucho alcohol que se hace al fermentar la cebada o algunos otros cereales")},
	{letter: "x", answer: "xilografia", status: 0, question: ("CONTIENE LA X. Manera de hacer grabados sobre madera, dejando vacías las partes que deben quedar blancas en el dibujo")},
	{letter: "y", answer: "yak", status: 0, question: ("CONTIENE LA Y. Mamífero de gran tamaño parecido a un toro, pero con el cuero cubierto de un abundante pelo que lo protege del frío")},
	{letter: "z", answer: "zocalo", status: 0, question: ("CON LA Z. Banda más o menos ancha, cubierta de otro material o pintada, que hay en la parte baja de las paredes de una habitación")},
];

let allLetter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let correctAnswers = 0;
let errors = 0;
let possibleQuestions = [];
let singleQuestion;
let letsPlay = true;
let gameIsOn = true;
const ranking = [];
let playingSet = [];
let userAnswer;


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

const askQuestion = (letterIndex) => {
	for (questionPosition = 0; questionPosition < playingSet.length; questionPosition++) {
        if (playingSet[questionPosition].letter === allLetter[0]) {
            singleQuestion = playingSet[questionPosition];
        };    
    }
    userAnswer = prompt (`Aciertos = ${correctAnswers}
Fallos = ${errors}
Quedan ${allLetter.length} preguntas!

${singleQuestion.question}`);
	userAnswer = userAnswer.toLowerCase();
    if (userAnswer === 'pasapalabra') {
        allLetter.push(allLetter[0]);
        allLetter.splice(0, 1);
    };
	if (userAnswer === 'end') {
		gameIsOn = false;
	}
    if (userAnswer === singleQuestion.answer) {
        correctAnswers++
        allLetter.splice(0, 1);
    } else if (userAnswer != 'pasapalabra' && userAnswer != 'end' && userAnswer != singleQuestion.answer) {
        errors++
        allLetter.splice(0, 1);
    };
	/*console.log(`Aciertos = ${correctAnswers}
Fallos = ${errors}`)*/
};

const getQuestionsSet = () => {
    const randomizedSet = Math.floor(Math.random() * 3) + 1;
    if (randomizedSet === 1) {
        playingSet = questionsSetOne;
    };
    if (randomizedSet === 2) {
        playingSet = questionsSetTwo;
    };
    if (randomizedSet === 3) {
        playingSet = questionsSetThree;
    };
}

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
            playingSet;
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
        getQuestionsSet();
		do {
    		if (allLetter.length > 0) {
        		askQuestion();
        		//console.log(`Quedan ${allLetter.length} preguntas`)
    		};
    		if (allLetter.length === 0) {
        		gameIsOn = false;
    		};
		} while (gameIsOn);
		alert (`${userName}, has acertado ${correctAnswers} preguntas y has fallado ${errors} preguntas!`)
		if (userAnswer != 'end') {
            alert (getRanking());
        }
        endGame();
	} while (letsPlay);
};

playPasapalabra();





//
const isAnswerCorrect = () => {
	//const element = document.getElementById("letterA");

	// questionsSetOne[0].answer == singleQuestion.answer
	if (userAnswer.toLowerCase() === 'pasapalabra') {
        allLetter.push(allLetter[0]);
        allLetter.splice(0, 1);
    };

	if (userAnswer.toLowerCase() === 'end') {
		gameIsOn = false;
	};

    if (userAnswer.toLowerCase() === singleQuestion.answer) {
        correctAnswers++
        allLetter.splice(0, 1);
    };

	if (userAnswer.toLowerCase() != 'pasapalabra' && userAnswer.toLowerCase() != 'end' && userAnswer.toLowerCase() != singleQuestion.answer) {
        errors++
        allLetter.splice(0, 1);
    };
}