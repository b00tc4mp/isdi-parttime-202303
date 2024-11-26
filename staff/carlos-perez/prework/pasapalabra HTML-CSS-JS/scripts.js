//Pasapalabra

const gameTime = 150000; //150 segundos
let timerTime;

const help = () => {
    alert('Indica la palabra que creas que es después de la pista y pulsa Resolver. Si la aciertas, sumas un punto. Si fallas, no sumas, pero no restas. Si no lo tienes claro, pulsa Pasapalabra. Si quieres terminar la partida, pulsa Finalizar Partida.');
}


//Almacen de los users y sus points
// {user: userName, aciertos: numeroAciertos, partidaTerminada: booleano}
let usersAndPoints = [];


class Game {
    exit = false;
    status = false;
    corrects = 0;
    wrongs = 0;

    //status 0 = Ni acertada, ni fallada; status 1 = acertada; status 2 = fallada
    questions;

    constructor(questions) {
        this.questions = questions;
    }
}

class Word {
    letter;
    answer;
    status = 0;
    question;
    constructor(letter, answer, question) {
        this.letter = letter;
        this.answer = answer;
        this.question = question;
    }
}

const words =
    [
        ['a', ['abducir', 'CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien'], ['alabeo', 'CON LA A. Comba de cualquier cuerpo o superficie'], ['afable', 'CON LA A. Agradable, dulce, suave en la conversación y el trato']],
        ['b', ['bingo', 'CON LA B. Juego que ha sacado de quicio a todos los Coders en las sesiones de precurso'], ['bucio', 'CON LA B. Especie de caracol marino'], ['bobinar', 'CON LA B. Arrollar o devanar hilos, alambre, generalmente sobre un carrete']],
        ['c', ['churumbel', 'CON LA C. Niño, crío, bebé'], ['coadyuvar', 'CON LA C. Contribuir o ayudar a que algo se realice o tenga lugar'], ['clepsidra', 'CON LA C. Reloj de agua']],
        ['d', ['dacio', 'CON LA D. Tributo o imposición sobre algo'], ['debelar', 'CON LA D. Vencer de modo definitivo al adversario por la fuerza o con argumentos'], ['diarrea', 'CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida']],
        ['e', ['ebanista', 'CON LA E. Persona que tiene por oficio trabajar en ébano y otras maderas finas'], ['esbatimentar', 'CON LA E. Dicho de un cuerpo: Causar sombra en otro'], ['ectoplasma', 'CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación']],
        ['f', ['facazo', 'CON LA F. Golpe que se da con la faca'], ['foceifiza', 'CON LA F. Género de mosaico en el cual, con pedazos pequeños de vidrio dorado o de colores, los artífices musulmanes representaban árboles, ciudades, flores y otros dibujos.'], ['facil', 'CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad']],
        ['g', ['gablete', 'CON LA G. Remate formado por dos líneas rectas y ápice agudo, que se ponía en los edificios de estilo ojival'], ['gocete', 'CON LA G. Sobaquera de malla sujeta a la cuera de armar, para proteger las axilas'], ['galaxia', 'CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas']],
        ['h', ['haba', 'CON LA H. Simiente de ciertos frutos, como el café, el cacao, etc'], ['hobby', 'CON LA H. Actividad que, como afición o pasatiempo favorito, se practica habitualmente en los ratos de ocio'], ['harakiri', 'CON LA H. Suicidio ritual japonés por desentrañamiento']],
        ['i', ['iberico', 'CON LA I. Natural de Iberia'], ['ion', 'CON LA I. Átomo o agrupación de átomos que por pérdida o ganancia de uno o más electrones adquiere carga eléctrica'], ['iglesia', 'CON LA I. Templo cristiano']],
        ['j', ['jabegote', 'CON LA J. Cada uno de los hombres que tiran de los cabos de la jábega'], ['jofaina', 'CON LA J. Vasija en forma de taza, de gran diámetro y poca profundidad, que sirve principalmente para lavarse la cara y las manos'], ['jabali', 'CON LA J. Variedad salvaje del cerdo que sale en la película El Rey León, de nombre Pumba']],
        ['k', ['kappa', 'CON LA K. Décima letra del alfabeto griego'], ['karma', 'CON LA K. En algunas creencias, fuerza espiritual'], ['kamikaze', 'CON LA K. Persona que se juega la vida realizando una acción temeraria']],
        ['l', ['lacerto', 'CON LA L. Reptil terrestre del orden de los saurios, de 50 a 80 cm de largo, de color verdoso, cabeza ovalada, boca grande con muchos y agudos dientes, cuerpo alargado y casi cilíndrico, cola larga y cónica, y cuatro patas cortas'], ['lopigia', 'CON LA L. Caída o pérdida patológica del pelo'], ['licantropo', 'CON LA L. Hombre lobo']],
        ['m', ['meandro', 'CON LA M. Cada una de las curvas que describe el curso de un río'], ['mochete', 'CON LA M. Ave de rapiña, común en España, de unos 40 cm de largo, con cabeza abultada, pico y uñas negros y fuertes, y plumaje rojizo más oscuro por la espalda que por el pecho y manchado de negro'], ['misantropo', 'CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas']],
        ['n', ['nabla', 'CON LA N. Instrumento musical muy antiguo, semejante a la lira, pero de marco rectangular y diez cuerdas de alambre, que se pulsaban con ambas manos'], ['nictemero', 'CON LA N. Fenómeno que se repite cada 24 horas'], ['necedad', 'CON LA N. Demostración de poca inteligencia']],
        ['ñ', ['ñacurutu', 'CON LA Ñ. Ave nocturna, especie de lechuza, de color amarillento y gris, uñas y pico corvos'], ['ñanguero', 'CON LA Ñ. Cierta variedad de pargo que vive cerca de la ñanga'], ['señal', 'CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.']],
        ['o', ['ofidico', 'CON LA O. Perteneciente o relativo a los ofidios'], ['otero', 'CON LA O. Cerro aislado que domina un llano'], ['orco', 'CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien']],
        ['p', ['poceta', 'CON LA P. Depresión natural de la costa que se llena de agua por efecto de la marea'], ['porcipelo', 'CON LA P. Cerda fuerte y aguda del puerco'], ['psoas', 'CON LA P. Músculo que se inserta en la parte anterior de las vértebras lumbares y termina en el fémur']],
        ['q', ['quebracho', 'CON LA Q. Nombre genérico de varias especies botánicas de árboles americanos de madera muy dura'], ['quiasmo', 'CON LA Q. Disposición en órdenes inversos de los miembros de dos secuencias consecutivas'], ['quorum', 'CON LA Q. Número de individuos necesario para que un cuerpo deliberante tome ciertos acuerdos']],
        ['r', ['reactor', 'CON LA R. Recipiente diseñado para que en su interior se produzcan reacciones químicas o biológicas'], ['robancina', 'CON LA R. Robo continuado'], ['raton', 'CON LA R. Roedor']],
        ['s', ['selenita', 'CON LA S. Habitante imaginario de la Luna'], ['soasar', 'CON LA S. Medio asar o asar ligeramente algo'], ['stackoverflow', 'CON LA S. Comunidad salvadora de todo desarrollador informático']],
        ['t', ['taceta', 'CON LA T. Caldero pequeño de cobre que sirve en los molinos de aceite para trasegarlo'], ['tumbaburros', 'CON LA T. Repertorio en forma de libro o en soporte electrónico en el que se recogen, según un orden determinado, las words o expresiones de una o más lenguas, o de una materia concreta, acompañadas de su definición, equivalencia o explicación'], ['tsunami', 'CON LA T. Ola gigantesca producida por un maremoto o una erupción volcánica en el fondo del mar']],
        ['u', ['ubetense', 'CON LA U. Natural de Úbeda'], ['upar', 'CON LA U. Levantar, aupar'], ['ucronia', 'CON LA U. Reconstrucción de la historia sobre datos hipotéticos']],
        ['v', ['voladizo', 'CON LA V. Dicho de un elemento: Que vuela o sobresale en relación con el resto de la estructura'], ['viscoso', 'CON LA V. Pegajoso, glutinoso'], ['vetiver', 'CON LA V. Planta gramínea cuya raíz es usada en perfumería por sus propiedades aromáticas']],
        ['w', ['watt', 'CON LA W. Unidad de potencia del sistema internacional que da lugar a la producción de 1 julio por segundo'], ['webinario', 'CON LA W. Seminario web'], ['sandwich', 'CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso']],
        ['x', ['xenoglosia', 'CON LA X. Don de lenguas'], ['xeroteca', 'CON LA X. Archivo formado por xerocopias, normalmente ordenadas y encuadernadas'], ['xilofono', 'CON LA X. Instrumento musical de percusión formado por láminas generalmente de madera, ordenadas horizontalmente según su tamaño y sonido, que se hacen sonar golpeándolas con dos baquetas']],
        ['y', ['yak', 'CON LA Y. Bóvido que habita en las altas montañas del Tíbet'], ['yodurar', 'CON LA Y. Someter algo a la acción del yoduro'], ['yupi', 'CON LA Y. Para expresar júbilo']],
        ['z', ['zalmedina', 'CON LA Z. En las ciudades de la Edad Media, magistrado con jurisdicción civil y criminal en una ciudad'], ['zollipo', 'CON LA Z. Sollozo con hipo, y regularmente con llanto y aflicción'], ['zen', 'CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional']]
    ]

const giveRandomNumber = (words) => {
    return Math.floor(Math.random() * ((words.length - 1) - 1 + 1) + 1);
}

//Función para generar las preguntas

const fillQuestions = (words) => {
    let questions = [];
    for (let i in words) {
        let selection = giveRandomNumber(words[i]);
        const question = new Word(words[i][0], words[i][selection][0], words[i][selection][1]);
        questions.push(question);
    }
    return questions;
}
//Función para pedir el nombre al user

const askForName = () => {
    const petition = prompt('Introduzca su nombre: ');
    if (!petition) {
        return askForName();
    }
    return petition;
}


//Función para añadir el user y sus points después de la Game

const userToRanking = (usersAndPoints, userName, turns, status) => {
    usersAndPoints.push({ user: userName, points: turns, GameEnded: status });
}

//Función para mostrar el ranking de users

const showRanking = (usersAndPoints) => {
    if (usersAndPoints.length !== 0) {
        usersAndPoints.sort((a, b) => { return b.points - a.points }); //Ordena el Ranking
        let message = 'Ranking de users: \n';
        for (let i in usersAndPoints) {
            if (usersAndPoints[i].GameEnded === true) {
                message += usersAndPoints[i].user + ' ' + usersAndPoints[i].points + '\n';
            }
        }
        alert(message);
    }
}

let exitGeneral;
let GameActual;
let userName;

//Limpiar Panel

const clearPanel = () => {
    for (let i in words) {
        const currentLetter ="#"+words[i][0];
        const letterPanel = document.querySelector(currentLetter);
        letterPanel.style.backgroundColor = "inherit";
    }
}

//Deshabilitar botón de Nueva Partida

const disableButton = () =>{
    const button = document.querySelector("#buttonNewGame");
    button.classList.add('button-disabled');
}

//Habilitar el botón de nueva partida

const enableButton = () => {
    const button = document.querySelector("#buttonNewGame");
    button.classList.remove('button-disabled');
}

//Generar Turno

const generateTurn = () => {
    document.querySelector("#letter").textContent = GameActual.questions[0].letter.toUpperCase();
    document.querySelector("#question").textContent = GameActual.questions[0].question;
    document.querySelector("#answer").value = "";
    const currentLetter ="#"+GameActual.questions[0].letter;
    const letterPanel = document.querySelector(currentLetter);
    letterPanel.style.backgroundColor = "#ffff99";
    //console.log(GameActual.questions[0].answer);
}

//Temporizador

let setIntervalID;

const timer=()=>{
    timerTime--;
    //console.log(timerTime);
    document.querySelector("#time").textContent=timerTime;
    if(timerTime==0){
        console.log("timer finalizado");
        exitGeneral=true;
        clearInterval(setIntervalID);
    }
  }

//Crear Temporizador

const startTimer=()=>{
    setIntervalID=setInterval(timer, 1000);
    timerTime=gameTime/1000;
    timer();
  }

//Nueva Partida

const newGame = () => {
    exitGeneral=false;
    userName = askForName();
    clearPanel();
    disableButton();
    GameActual = new Game(fillQuestions(words));
    generateTurn();
    startTimer();
}

let gameCounter = 0;

//Avanzar Turno

const nextTurn = () => {
    if (exitGeneral === false) {
        let currentAnswer = document.querySelector("#answer").value.toUpperCase();
        if (GameActual.questions.length > 0) { //Si el juego no ha acabado
            if (currentAnswer === GameActual.questions[0].answer.toUpperCase()) { //Acertada
                GameActual.corrects++;
                //console.log("Acierto");
                const currentLetter ="#"+GameActual.questions[0].letter;
                const letterPanel = document.querySelector(currentLetter);
                letterPanel.style.backgroundColor = "#66ff66";
                GameActual.questions.shift();
                document.querySelector("#answer").textContent = "";
                if (GameActual.questions.length > 0) {
                    generateTurn();
                }
            }
            else { //Fallada
                GameActual.wrongs++;
                //console.log("Error");
                const currentLetter ="#"+GameActual.questions[0].letter;
                const letterPanel = document.querySelector(currentLetter);
                letterPanel.style.backgroundColor = "#ff471a";
                GameActual.questions.shift();
                document.querySelector("#answer").textContent = "";
                if (GameActual.questions.length > 0) {
                    generateTurn();
                }
            }

        }
    }
    if (GameActual.questions.length === 0 || exitGeneral == true) {
        alert("El juego ha terminado. Has tenido " + GameActual.corrects + " aciertos y " + GameActual.wrongs + " errores");
        if(GameActual.exit===false){
        userToRanking(usersAndPoints, userName, GameActual.corrects, true);
        GameActual.exit=true;
        }
        exitGeneral=true;
        clearInterval(setIntervalID);
        showRanking(usersAndPoints);
        enableButton();
    }
}

//Caso Pasapalabra

const doesntRememberNow = () => {
    if (exitGeneral === false) {
        if (GameActual.questions.length > 0) {
            const currentLetter ="#"+GameActual.questions[0].letter;
            const letterPanel = document.querySelector(currentLetter);
            letterPanel.style.backgroundColor = "inherit";
            let questionToBack = GameActual.questions.shift();
            GameActual.questions.push(questionToBack);
            document.querySelector("#answer").textContent = "";
            generateTurn();
        }
    }
    else{
        alert("El juego ha terminado. Has tenido " + GameActual.corrects + " aciertos y " + GameActual.wrongs + " errores");
        if(GameActual.exit===false){
        userToRanking(usersAndPoints, userName, GameActual.corrects, true);
        GameActual.exit=true;
        }
        exitGeneral=true;
        clearInterval(setIntervalID);
        showRanking(usersAndPoints);
        enableButton();
    }
}