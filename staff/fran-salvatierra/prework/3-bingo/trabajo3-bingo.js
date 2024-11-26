let playerName = prompt('¿Cómo quieres llamarte?');
let firstLane = [];
let secondLane = [];
let thirdLane = [];
let bingoCard = [firstLane, secondLane, thirdLane];
let numbersAppeared = [];
let actualturn = 0;
let laneReward = false;
let playerPoints = 0;
let bingoCompleted = 0;
let playerScore = [
    {name: 'Federico', points: 80}, 
    {name: 'Jorge', points: 70},
    {name: 'Rafael', points: 50},
    {name: 'Manuel', points: 35},
];
let playerRanking = [];


const initialGreeting = () => {
    sortRanking();
    if (playerName !== '') {
        alert(`Bienvenido/a, ${playerName} ¡Juguemos al Bingo!`);
    } else {
        playerName = 'Invitado'
        alert(`Bienvenido/a, ${playerName} ¡Juguemos al Bingo!`);
    };
    alert('Vas a jugar una partida de Bingo contra el ordenador.\nPara ganar tienes que completar el cartón antes del turno 80.\nCuantos menos turnos necesites, mayor será tu puntuación.');
    alert(`El ranking actual es:\n${playerRanking}.`);
    generateBingoCard();
    newBingoCard();
};

const sortRanking = () =>  {
    playerScore.sort((a,b) => b.points - a.points);
    playerScore.forEach((player, index) => {
        playerRanking.push(` ${index + 1}º ${player.name} - ${player.points} puntos`);
    });
}
const newBingoCard = () => {
    let regenerateBingoCard = prompt('¿Quieres un cartón nuevo? [yes/no]');
    if (regenerateBingoCard === 'yes') {
        firstLane = [];
        secondLane = [];
        thirdLane = [];
        generateBingoCard();
        newBingoCard();
    } else {
        bingoGame();
    }
}

const generateBingoCard = ()  => {
    for (let i = 0; i <10; i++) {
        if (firstLane.length < 5) {
            let randomNumberOne = (Math.floor(Math.random() * 100));
            if (!firstLane.includes(randomNumberOne) && randomNumberOne !== 0) {
                firstLane.push(randomNumberOne)
            };
        }
        
    };
    for (let i = 0; i < 10; i++) {
        if (secondLane.length < 5) {
            let randomNumberTwo = Math.floor(Math.random() * 100);
            if (!firstLane.includes(randomNumberTwo) && !secondLane.includes(randomNumberTwo) && randomNumberTwo !== 0) {
                secondLane.push(randomNumberTwo)
            };
        }
        
    };
    for (let i = 0; i < 10; i++) {
        if (thirdLane.length < 5) {
            let randomNumberThree = Math.floor(Math.random() * 100);
            if (!firstLane.includes(randomNumberThree) && !secondLane.includes(randomNumberThree) && !thirdLane.includes(randomNumberThree) && randomNumberThree !== 0) {
                thirdLane.push(randomNumberThree)
            };
        }
        
    };

    firstLane.sort();
    secondLane.sort();
    thirdLane.sort();

    alert(`Hola ${playerName}, este es tu cartón:\n${firstLane.join(' | ')}\n${secondLane.join(' | ')}\n${thirdLane.join(' | ')}\n`);
};



const bingoGame = () => {
    let randomNumber = Math.floor(Math.random() * 100);
    let keepPlaying = confirm('¿Quieres continuar?'); 
    if (!keepPlaying) {
        keepPlaying = false;
    };
    while (keepPlaying && !bingoCompleted && actualturn < 80) {
        actualturn++;
        
        while (numbersAppeared.includes(randomNumber) || randomNumber === 0) {
            randomNumber = Math.floor(Math.random() * 100);
        };
        numbersAppeared.push(randomNumber);
        numbersAppeared.sort();
        if (firstLane.includes(randomNumber)) {
            firstLane[firstLane.indexOf(randomNumber)] = 'X';
            alert(`-- ¡¡NÚMERO: ${randomNumber}!! --\nEste es el estado de tu cartón:\n${firstLane.join(' | ')}\n${secondLane.join(' | ')}\n${thirdLane.join(' | ')}\n`);
        } else if (secondLane.includes(randomNumber)) {
            secondLane[secondLane.indexOf(randomNumber)] = 'X';
            alert(`-- ¡¡NÚMERO: ${randomNumber}!! --\nEste es el estado de tu cartón:\n${firstLane.join(' | ')}\n${secondLane.join(' | ')}\n${thirdLane.join(' | ')}\n`);
        } else if (thirdLane.includes(randomNumber)) {
            thirdLane[thirdLane.indexOf(randomNumber)] = 'X';
            alert(`-- ¡¡NÚMERO: ${randomNumber}!! --\nEste es el estado de tu cartón:\n${firstLane.join(' | ')}\n${secondLane.join(' | ')}\n${thirdLane.join(' | ')}\n`);
        } else {
            alert(`-- NÚMERO: ${randomNumber}. --\nNo aparece en tu cartón:\n${firstLane.join(' | ')}\n${secondLane.join(' | ')}\n${thirdLane.join(' | ')}\n`);
        };
        keepPlaying = false;
        if (laneReward === 1) {
            alert('¡HAS CONSEGUIDO UNA LÍNEA!');
        }
        checkLane();
        checkBingo();
        bingoGame();
        rewardSystem();
        if (actualturn === 80) {
            bingoCompleted++;
            goodbye();
            
        }
    };    
};

const checkLane = () => {
        if (
            firstLane[0] === 'X' && firstLane[1] === 'X' && firstLane[2] === 'X' && firstLane[3] === 'X' && firstLane[4] === 'X' ||
            secondLane[0] === 'X' && secondLane[1] === 'X' && secondLane[2] === 'X' && secondLane[3] === 'X' && secondLane[4] === 'X' ||
            thirdLane[0] === 'X' && thirdLane[1] === 'X' && thirdLane[2] === 'X' && thirdLane[3] === 'X' && thirdLane[4] === 'X'
            
        ) {
            
            laneReward++;
        }
    
};

const checkBingo = () => {
    if (
        firstLane[0] === 'X' && firstLane[1] === 'X' && firstLane[2] === 'X' && firstLane[3] === 'X' && firstLane[4] === 'X' &&
        secondLane[0] === 'X' && secondLane[1] === 'X' && secondLane[2] === 'X' && secondLane[3] === 'X' && secondLane[4] === 'X' &&
        thirdLane[0] === 'X' && thirdLane[1] === 'X' && thirdLane[2] === 'X' && thirdLane[3] === 'X' && thirdLane[4] === 'X'
        
    ) {
        keepPlaying = false;
        bingoCompleted--;
        goodbye();
    
    }
};

const rewardSystem = () => {
    if (actualturn <= 15) {
        playerPoints = 100;
    } else if (actualturn > 5 && actualturn <= 15) {
        playerPoints = 70;
    } else if (actualturn > 15 && actualturn <= 25) {
        playerPoints = 50;
    } else if (actualturn > 45) {
        playerPoints = 30;
    } else if (laneReward) {
        playerPoints + 10
    }
}

const goodbye = () => {
    if (bingoCompleted === 1 && actualturn === 80) {
        alert(`Lo siento, ${playerName}. No lograste BINGO en 80 turnos.`);
        playerRanking = [];
        playerScore.push({name: `${playerName}`, points: `${playerPoints}`});
        sortRanking();
        alert(`El ranking actual es:\n${playerRanking}`)
        alert('Gracías por jugar ¡Hasta pronto!')
    } else if (bingoCompleted === -1 && keepPlaying === false) {
        alert(`¡HAS CONSEGUIDO HACER EL BINGO! ¡HAS GANADO EN ${actualturn} turnos!\nConseguiste: ${playerPoints} puntos.`);
        playerRanking = [];
        playerScore.push({name: `${playerName}`, points: `${playerPoints}`});
        sortRanking();
        alert(`El ranking actual es:\n${playerRanking}`)
        alert('Gracías por jugar ¡Hasta pronto!')
    }
}
const startProgramm = () => {
    initialGreeting();  
};

startProgramm();

