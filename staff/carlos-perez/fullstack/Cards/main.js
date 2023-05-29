console.clear();

let option = 0;
let turns = 0;
const cards = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K'];
let board = [];
let hiddenBoard = [];
let stateBoard = [];

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const generateBoards = () => {
    board = cards.concat(cards);
    shuffleArray(board);
    for (let i = 0; i < board.length; i++) {
        hiddenBoard.push('#');
        stateBoard.push(0);
    }
}

const game = () => {
    generateBoards();
    console.log(board);
    renderBoard();
    renderGameBoard();
    renderStateBoard();
}

const renderBoard = () => {
    //Show board 
    console.log('* * A B C D *');
    console.log('* * * * * * *')
    for (let i = 0; i < 6; i++) {
        let row = (i + 1) + ' * ';
        for (let j = 0; j < 4; j++) {
            row += board[(i * 4) + j] + ' ';
        }
        row += '*';
        console.log(row);
    }
    console.log('* * * * * * *');
    console.log('');
}

const renderGameBoard = () => {
    console.log('* * A B C D *');
    console.log('* * * * * * *')
    for (let i = 0; i < 6; i++) {
        let row = (i + 1) + ' * ';
        for (let j = 0; j < 4; j++) {
            row += hiddenBoard[(i * 4) + j] + ' ';
        }
        row += '*';
        console.log(row);
    }
    console.log('* * * * * * *');
    console.log('');
}

const renderStateBoard = () => {
    console.log('* * A B C D *');
    console.log('* * * * * * *')
    for (let i = 0; i < 6; i++) {
        let row = (i + 1) + ' * ';
        for (let j = 0; j < 4; j++) {
            row += stateBoard[(i * 4) + j] + ' ';
        }
        row += '*';
        console.log(row);
    }
    console.log('* * * * * * *');
    console.log('');
}


const turn = (firstCard, secondCard) => {
    if (checkCardAvailability(firstCard) && checkCardAvailability(secondCard)) {
        if (board[firstCard] === board[secondCard]) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        throw new Error('Una o ambas de las cartas seleccionadas no está disponible');
    }

}


const mostarMenu = () => {
    console.clear();

    console.log("Parejas de Cartas");
    console.log(' ');
    console.log(' ');
    console.log('1. Jugar');
    console.log('2. Salir');
    console.log(' ');
    console.log(' ');

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Elija una opción: ', (opt) => {
        option = opt;
        try {
            optionChecker(option);
        }
        catch (e) {
            console.log(e.message);
        }
        readline.close();
    })
}

const checkCardPosition = (position) => {
    const row = (parseInt(position[0], 10) - 1);
    const letter = position[1].toUpperCase();
    let column;
    switch (letter) {
        case 'A': column = 0; break;
        case 'B': column = 1; break;
        case 'C': column = 2; break;
        case 'D': column = 3; break;
        default: throw new Error('Columna no válida');
    }
    return row + (4 * column);
}

const checkCardAvailability = (card) => {
    if (hiddenBoard[card] === '#') {
        return true;
    }
    else {
        return false;
    }
}

const showTurnMessages = () => {
    console.log('Turno ' + turns);
    console.log(' ');

    let firstCard = '';
    let secondCard = '';

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Elija una opción: ', (opt) => {
        option = opt;
        try {
            firstCard = checkCardPosition(option);
            checkCardAvailability(firstCard);
            hiddenBoard[firstCard] = board[firstCard];
            renderGameBoard();
        }
        catch (e) {
            console.log(e.message);
        }
        finally {
            readline.close();
        }
    })

    const readline2 = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {
        secondCard = checkCardPosition(option);
        checkCardAvailability(secondCard);
        hiddenBoard[secondCard] = board[secondCard];
        renderGameBoard();
    }
    catch (e) {
        console.log(e.message);
    }

    readline2.question('Elija una opción: ', (opt) => {
        option = opt;
        try {
            secondCard = checkCardPosition(option);
        }
        catch (e) {
            console.log(e.message);
        }
        finally {
            readline2.close();
        }
    })

    let turnResult = turn(firstCard, secondCard);
    if (turnResult) {
        
    }
}

const optionChecker = (option) => {
    if (option === '1' || option === '2') {
        liveGame();
    }
    else {
        throw new Error("Opción no válida");
    }
}

const liveGame = () => {
    let condition = false;
    do {
        game();

    }
    while (!condition);
}




mostarMenu();