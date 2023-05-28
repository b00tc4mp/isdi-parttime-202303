console.clear();

let option=0;
let turns=0;
const cards = ['1','2','3','4','5','6','7','8','9','J','Q','K'];
let board=[];
let hiddenBoard=[];
let stateBoard=[];

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const generateBoards = () =>{
board=cards.concat(cards);
shuffleArray(board);
for(let i=0; i<board.length; i++){
    hiddenBoard.push('#');
    stateBoard.push(0);
}
}

const game = () =>{
    generateBoards();
    console.log(board);
    renderBoard();
    renderGameBoard();
    renderStateBoard();
}

const renderBoard = () =>{
//Show board 
console.log('* * A B C D *');
console.log('* * * * * * *')
for(let i=0; i<6; i++){
    let row =(i+1)+' * ';
    for(let j=0; j<4; j++){
        row+=board[(i*4)+j]+' ';
    }
    row+='*';
    console.log(row);
}
console.log('* * * * * * *');
console.log('');
}

const renderGameBoard = ()=>{
    console.log('* * A B C D *');
    console.log('* * * * * * *')
    for(let i=0; i<6; i++){
        let row =(i+1)+' * ';
        for(let j=0; j<4; j++){
            row+=hiddenBoard[(i*4)+j]+' ';
        }
        row+='*';
        console.log(row);
    }
    console.log('* * * * * * *'); 
    console.log('');
}

const renderStateBoard = () => {
    console.log('* * A B C D *');
    console.log('* * * * * * *')
    for(let i=0; i<6; i++){
        let row =(i+1)+' * ';
        for(let j=0; j<4; j++){
            row+=stateBoard[(i*4)+j]+' ';
        }
        row+='*';
        console.log(row);
    }
    console.log('* * * * * * *'); 
    console.log('');
}


const turn = () =>{
//Ask for the next cards to show.
//Check if the cards are available, if not, return error message and reset turn
//Check, if it's the second one, if it's the same card. If true, show them. If false, reset turn
//Anotate one more turn

}


const mostarMenu = () =>{
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

    readline.question('Elija una opción: ', (opt)=>{
        option=opt;
        try{
        optionChecker(option);
        }
        catch(e){
            console.log(e.message);
        }
        readline.close();
    })
}

const optionChecker = (option) => {
    if(option === '1' || option === '2'){
        game();
    }
    else{
        throw new Error("Opción no válida");
    }
}





mostarMenu();