console.clear();

let option=0;
let turns=0;

const initialBoard = ['|','|','|','-','|','|','---','|','|','-----','|','|','-------','|','|'];

const mostarMenu = () =>{
    console.clear();

    console.log("Torres de Hanoi");
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
        return true;
    }
    else{
        throw new Error("Opción no válida");
    }
}

const renderGame = () =>{
//Show board with spaces, to look like the actual game
}

const moveGame = () =>{
//Ask for the next move to the user
//Move forward the game one turn
//Anotate one more turn
}

const checkGame = (board) =>{
//Check if the game is over or not
//Return true if is over, false if not
}



mostarMenu();