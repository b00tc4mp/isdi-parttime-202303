const bingoCardBoard = [1, 2]//, 3, 4, 5];
let userNames = [];
let totalRandomNumbers = [];
let randomNumber;
let totalShift = [];
let totalAddition= [];

const welcome = () => {
    alert(`Welcome to ISDI Bingo game!!`)
};

const goodbye = () =>{
    while(confirm(`We hope you enjoy the game!! Do you want to play again?`)){
        playBingo();
    }
    alert(`Thanks for your visit!! See you soon!!`)
};


const getName = () =>{
    const userName= prompt("Please, introcuce your name")
    userNames.push(userName);

    return userName;
};


const showBingoCardBoard = () =>{
    alert(`${userNames}, this is your bingo cardboard: ${bingoCardBoard} \n Let's start!!!`)
};


const getRandomNumber = () =>{
    const templateNumbers = [1, 2]//, 3, 4, 5, 6, 7, 8, 9, 10];
    randomNumber= Math.floor(Math.random() * templateNumbers.length + 1 )
    alert(`Number ${randomNumber}`);
    totalShift.push(1);
    console.log(`Turnos acumulados: ${totalShift.length}`)

    if(!totalRandomNumbers.includes(randomNumber)){ 
        totalRandomNumbers.push(randomNumber);
    }
    
    return randomNumber;
}

const bingoCardBoarAddition = () =>{
    totalAddition = bingoCardBoard[0]
    for(let i = 1; i < bingoCardBoard.length; i++){
        totalAddition += bingoCardBoard[i]
    }
return totalAddition;
}



const numbersAreMatched = (randomNumber) =>{
    const numberMatched = bingoCardBoard.includes(randomNumber)
    if(numberMatched === true){
        totalAddition -= randomNumber;
        console.log(totalAddition)
        alert (`Congratulations!! ${randomNumber} is on your bingo cardboard!!! `);
        bingoCardBoard[bingoCardBoard.indexOf(randomNumber)]= 0;
        alert(`Your bingo cardboard is ${bingoCardBoard}`);

    }
    
    return numberMatched;
};



const continuePlaying = () => {
    
    if(totalAddition === 0){
        goodbye();
    }
    while(confirm ("Do you want another number?")){
        console.log(totalAddition)
        getRandomNumber ();
        console.log(totalRandomNumbers)
        console.log(totalShift)
       
        console.log(numbersAreMatched(randomNumber))
    }
    alert(`You decided to abort this game.`)
    
    
};


const gameResults = () =>{

}

const finalScore =() =>{

};







const playBingo = () =>{
    welcome();
    getName();
    showBingoCardBoard();
    getRandomNumber();
    console.log(totalRandomNumbers);
   
    numbersAreMatched(randomNumber);
    console.log(numbersAreMatched(randomNumber))
    
    bingoCardBoarAddition();
    continuePlaying();
    
    goodbye();
    
};

playBingo();

