
let rankingTable = [];

const createGameQuestions = (originalQuestions) => {
    let randomNumber = Math.floor(Math.random() * originalQuestions[0].answer.length);
    let actualGameUsedQuestions = [];
    originalQuestions.forEach(originalQuestion => {
        let temporalQuestion = {letter: originalQuestion.letter, answer: originalQuestion.answer[randomNumber], status: 0 ,question: originalQuestion.question[randomNumber]}
        actualGameUsedQuestions.push(temporalQuestion);
    });
    return actualGameUsedQuestions; 
}
const askPlayerName = () => {
    let playerName = prompt("Hello new player, can i have your name? 😊");
    if (!playerName){
        alert("You are not introducing anything, please type your name 😅")
        return askPlayerName();
    }
    return playerName;
}

const explainGame = (playerName) => {
    alert(`${playerName} the game's explanation will appear in the console, please read them`);
    console.log("this game it'a abouts question. in each row will appear a question with EACH letter of the alphabet");
    console.log("It can contain or start whith this letter, so, in total there will be 26 questions.")
    console.log("You'll only have one chance to answer each question🥶, or you can type 'PASAPALABRA' and automatically will skip this question and goes into the next question 😮‍💨")
    console.log("Once que question is answered you won't go back, so you better think about it 😥");
    console.log("If you finish all of your questions, and you have pending ones, they will show again in alphabetycal order ");
    console.log("At the end, we will show you yours corrects⭕ and incorrects❌ answers.");
    console.log("At the end of each game, a ranking will appear and you'll have the option to play again 😍");
    alert(`${playerName} are yo readdy to start the game? 🥰`)
}

const showQuestions = (questions) => {
    let isPlaying = true;
    questions.forEach(currentQuestion => {
        
        if(currentQuestion.status === 0 && isPlaying){
            alert(currentQuestion.question);
            console.log("---QUESTION---");
            console.log(currentQuestion.question);
            isPlaying = answerCurrentQuestion(currentQuestion);
        }
    });
}

const answerCurrentQuestion = (currentQuestion) => {
    let cuestionAnswer = prompt("Please answer the cuestion, type 🔸'PASAPALABRA'🔸 to skip this question or type 🔺'END'🔺 to exit game.");
    
    if(!cuestionAnswer){
        alert("You havent answered anything, please answer the cuestion, 'PASAPALABRA' or 'END'😅");
        return answerCurrentQuestion(currentQuestion);
    }
    cuestionAnswer = cuestionAnswer.toLowerCase();
    if(cuestionAnswer === "end"){
        alert('You have typed "END", so that mean that this row ends here...😞');
        return false;
    }
    if(cuestionAnswer === "pasapalabra"){
        alert("You have decide to skip this question, let's go for the next one 😉")
    }
    if(cuestionAnswer !== currentQuestion.answer && cuestionAnswer !== "end" && cuestionAnswer !== "pasapalabra"){
        alert(`❌ I'm afraid that "${cuestionAnswer}" is incorrect. The correct one was ${currentQuestion.answer}`)
        currentQuestion.status -= 1;
    }
    if (currentQuestion.answer === cuestionAnswer){
        alert(`⭕ That's correct, let's go to the next one!`)
        currentQuestion.status += 1;
    }
    return true;
}

const getCorrectAndIncorrectAnswers = (questions) => {
    let correctAnswersAndIncorrectAnswers = [0,0];
    questions.forEach((question) => {
        if (question.status === 1){
            correctAnswersAndIncorrectAnswers[0] ++;
        }
        if (question.status === -1){
            correctAnswersAndIncorrectAnswers[1] ++;
        }
    });
    return correctAnswersAndIncorrectAnswers;
}

const checkIfFinished = (questions) => {
    return questions.every((question) => question.status !== 0);
}

const checkIfCanEnterInRanking = (isFinished, rankingTable, userName,correctAnswers) => {
    if (isFinished){
        alert("Just because you have finished, we will add you into our ranking, please look at the console🥸");
        printInRanking(rankingTable,userName,correctAnswers)
    }
    else{
        alert("Just because you haven't finished the game, we wont be able to print your scores into our winner's ranking... maybe next time? 🤔");
    }
}

const printInRanking = (rankingTable,userName,correctAnswers) => {
    rankingTable.push([userName,correctAnswers[0]]);
    console.log("------HALL OF FAME------");
    
    let sortedRankingTable = rankingTable.sort((currentName, name) =>  name[1] - currentName[1] );
    sortedRankingTable.forEach((user,index) => {
        console.log(`${index + 1} Position  --> User name: ${user[0]}   Correct answers: ${user[1]}`);
    })
}

const playPasaPalabras = () => {
    let questions = [
        {letter: "a", answer: ["abducir","alegria","almendra"], status: 0, question: [("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"), ("CON LA A. Emocion que nos hace estar contentos"), ("CON LA A. fruto seco con el cual se atragantó Fernando simon")]},
        {letter: "b", answer: ["bingo","brocoli","barba"], status: 0, question: [("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"),("CON LA B. Verdura poco apetecible para los niños"), ("CON LA B. Pelo largo en la cara, caracteristicos de magos")]},
        {letter: "c", answer: ["churumbel","cuadrado","crisalida"], status: 0, question: [("CON LA C. Niño, crío, bebé"),("CON LA C. figura de 4 lados iguales"),("CON LA C. Insecto que se encuentra en la fase de desarrollo posterior a la forma de larva y anterior a la forma adulta")]},
        {letter: "d", answer: ["diarrea","dragon","delantal"], status: 0, question: [("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"),("CON LA D. Animal mitologico del que se dice que puede lanzar fuego por la boca"),("CON LA D. Bata que se usa en ciertas actividades o profesiones para proteger la ropa, como uniforme o por razones de higiene y asepsia")]},
        {letter: "e", answer: ["ectoplasma","emilio","esteban"], status: 0, question: [("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"),("CON LA E. Nombre del portero del ilustre edificio de la calle desengaño 21"), ("CON LA E. Apellido de la figura publica que esta dispuesta a matar por su hija")]},
        {letter: "f", answer: ["facil","flashback","fruta"], status: 0, question: [("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"), ("CON LA F. Recurso cinematografico que se basa en recordar fugazmente un acontecimiento del pasado"), ("CON LA F. Al tomate erroneamente se lo asocia con una verdura, pero realmente es una ...")]},
        {letter: "g", answer: ["galaxia","guiñar","grua"], status: 0, question: [("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"),("CON LA G. Gesto de cerrar un solo ojo durante un momento."),("CON LA G. Máquina que se usa para levantar y transportar grandes pesos.")]},
        {letter: "h", answer: ["harakiri","helado","hormiga"], status: 0, question: [("CON LA H. Suicidio ritual japonés por desentrañamiento"),("CON LA H. postre frio que se suele servir en un cono."),("CON LA H. Insecto capaz de levantar entre 10 a 50 veces su propio peso.")]},
        {letter: "i", answer: ["iglesia","isleño","italiano"], status: 0, question: [("CON LA I. Templo cristiano"),("CON LA I. Persona que vive en una isla"),("CON LA I. Gentilicio de italia")]},
        {letter: "j", answer: ["jabali","jalapeño","jugador"], status: 0, question: [("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"),("CON LA J. Variedad de chile medianamente picante"),("CON LA J. Persona que juega a un juego")]},
        {letter: "k", answer: ["kamikaze","kiwi","karaoke"], status: 0, question: [("CON LA K. Persona que se juega la vida realizando una acción temeraria"),("CON LA K. Animal que tambien es una fruta"),("CON LA K. actividad con origen japones basado en cantar canciones con sus letras sobre una base instrumental.")]},
        {letter: "l", answer: ["licantropo","legalizar","loop"], status: 0, question: [("CON LA L. Hombre lobo"),("CON LA L. Accion de volver algo ilegal a legal"),("CON LA L. En el mundo de la programacion, bucle en ingles.")]},
        {letter: "m", answer: ["misantropo","mascarilla","madera"], status: 0, question: [("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"),("CON LA M. Item que se usaba en la cara en epoca de pandemia para disminuir los contagios"),("CON LA M. Elemento del cual está hecho el tronco de un arbol")]},
        {letter: "n", answer: ["necedad","nieve","nevera"], status: 0, question: [("CON LA N. Demostración de poca inteligencia"),("CON LA N. Elemento de invierno cuyos copos presentan diferentes patrones"),("CON LA N. Electrodomestico que mantiene fresco todo lo que se le introduzca")]},
        {letter: "o", answer: ["orco","orca","oro"], status: 0, question: [("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"),("CON LA O. Animal que a menudo se la confunde con un delfin. Con colores negro y blanco"),("CON LA O. La piedra filosofal, segun las leyendas de la alquimia podia transmutar metales basicos en ...")]},
        {letter: "p", answer: ["protoss","piña","pato"], status: 0, question: [("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"),("CON LA P. La casa de bob-esponja."),("CON LA P. Animal cuyo 1% del corazon e higado han hecho rica a la industria de la homeopatia.")]},
        {letter: "q", answer: ["queso","quimera","quince"], status: 0, question: [("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"),("CON LA Q. Monstruo de la mitologia griega, con cabeza de leon, cuerpo de cabra y cola de dragon"),("CON LA Q. tres veces cinco")]},
        {letter: "r", answer: ["raton","ropa","reloj"], status: 0, question: [("CON LA R. Roedor"),("CON LA R. Items que se usan para cubrir el cuerpo humano"),("CON LA R. Item que se usa para sabe el tiempo")]},
        {letter: "s", answer:["stackoverflow","serpiente","sombra"], status: 0, question: [("CON LA S. Comunidad salvadora de todo desarrollador informático"),("CON LA S. animal que repta y puede ser venenoso."),("CON LA S. Silueta que se genera cuando se pone en algun angulo con respecto al sol.")]},
        {letter: "t", answer: ["terminator", "termometro", "tortilla"], status: 0, question: [("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"), ("CON LA T. Item que se utiliza para saber la temperatura"),("CON LA T. Comida de origen mexicano que se basa en una tortilla de maiz tostada con ingredientes dentro.")]},
        {letter: "u", answer: ["unamuno","uva","unir"], status: 0, question: [("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"),("CON LA U. Fruta la cual da origen al vino"),("CON LA U. Juntar dos o mas elementos distintos para formar un todo.")]},
        {letter: "v", answer: ["vikingos","volcan","vino"], status: 0, question: [("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"),("CON LA V. estructura geológica por la que emerge el magma."),("CON LA V.  bebida hecha de uva, mediante la fermentación alcohólica de su mosto o zumo.")]},
        {letter: "w", answer: ["sandwich","software","hardware"], status: 0, question: [("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"),("CONTIENE LA W. sistema formal de un sistema informático, que comprende el conjunto de los componentes lógicos necesarios que hace posible la realización de tareas específicas."),("CONTIENE LA W. partes físicas, tangibles, de un sistema informático, sus componentes eléctricos, electrónicos, electromecánicos.")]},
        {letter: "x", answer: ["botox","taxi","examen"], status: 0, question: [("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"),("CONTIENE LA X. Automóvil de servicio público que transporta de un lugar a otro a las personas que lo solicitan a cambio de dinero."),("CONTIENE LA X. Prueba escrita u oral que se realiza para demostrar la suficiencia en una materia determinada o la aptitud para cierta actividad o cargo.")]},
        {letter: "y", answer: ["peyote","yegua","yate"], status: 0, question: [("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"),("CON LA Y. Mamífero équido, hembra, se domestica con facilidad y suele usarse para la monta."),("CON LA Y. Embarcación de recreo a motor o a vela, de manga o anchura mayor que un velero, con camarotes y generalmente lujosa.")]},
        {letter: "z", answer: ["zen","zombie","zelda"], status: 0, question: [("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"),("CON LA Z. Persona que se supone muerta que es reanimada, pero a diferencia de humanos, no son capaces de pensar y generalmente atacan y comen humanos."),("CON LA Z.  personaje de la saga de unos videojuegos. Es la princesa descendiente de la Familia Real de Hyrule.")]},
    ];
    let actualQuestions = createGameQuestions(questions);
    let userName = askPlayerName();
    let rounds = 1;    
    explainGame(userName);
    let isFinished = false;

    do{
        console.log(`----------ROW NUMBER${rounds}----------`);
        alert(`----------ROW NUMBER${rounds}----------`);
        showQuestions(actualQuestions);
        isFinished = checkIfFinished(actualQuestions);
        rounds++;
    } while (!isFinished && confirm("Do you want to play Again?"));

    let correctAndIncorrectAnswers = getCorrectAndIncorrectAnswers(actualQuestions);
    console.log(`you had ⭕ ${correctAndIncorrectAnswers[0]} corrects and ❌ ${correctAndIncorrectAnswers[1]} incorrects 😉`)
    checkIfCanEnterInRanking(isFinished,rankingTable,userName,correctAndIncorrectAnswers);
    
    if (isFinished){
        alert(`${userName} you've finished all the question, scores and points are in console!😊`);
    }

    if (confirm("Do you wanto play PASAPALABRAS once more??🤩🤩")){
        return playPasaPalabras();
    }

    alert(`Thank you for playing PASAPALABRAS, we hope to see you soon...😊`)
}

playPasaPalabras();
