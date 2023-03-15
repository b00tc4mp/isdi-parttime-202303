'use strict'

let bingoCard = [];
let rowsCounter = 0;
let points = 0;
let completedLinea = 0; 
let completedBingo = false;
let rankingTable = [];


class CreateBingoNumber {
    constructor(number,matched){
        this.number = number;
        this.matched = matched;
    }
    setMatched(){
        this.matched = true;
    }
    getMatched(){
        return this.matched;
    }
}

const resetPreviousNumbers = (previousNumbers) => previousNumbers = [];

const resetRowsCounter = () => rowsCounter = 0;

const resetPoints = () => points = 0;

const explainGame = (userName) =>{
    alert(`Ok ${userName} let's play bingo. in console, there will be a bit more explanations in how to play`)
    console.log("You will have a bingo-card. In each row, a number will be shown off. If this number appears in your card, it will be replaced for an 'X'.");
    console.log("If you have a completed row with 'X' in your bingo card, you will earn 200 points and a alert sign will be shown off saying 'LINEA!!!'.");
    console.log(" if You complete the whole card with 'X' you will win 500 points and a alert sing will be shown off saying 'BINGO!!'.");
    console.log("Each row you will lose 2 points, so you better hurry up and complete the card ASAP!!");
    console.log("Once 'BINGO!' is shown, it will be indicative that the game has finished ;), hope you like to play again tho!...");
    console.log("At the end of the game your score will be shown and you'll can compare youself with the rest of the contestants ;)")
}

const askUserName = () => {
    let userName;
    userName = prompt("Welcome new user, can you type your name?");
    if (!userName){
        alert("You havent typed anything, please type your name :) ");
        return askUserName();
    }
    return userName;
}

const createRandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const createNumbers = () => {
    let cardNumbers = [];
    let cardNumbersInObject = [];
    while (cardNumbers.length < 15){
        let randomNumber = createRandomNumber(1,90);
        if (!cardNumbers.includes(randomNumber)){
            cardNumbers.push(randomNumber);
        }
    }
    cardNumbers.sort((a,b) => a - b);
    
    for (let number of cardNumbers){
        cardNumbersInObject.push(new CreateBingoNumber(number,false));
    }
    return cardNumbersInObject;
}

const createBingoCard = () => {
    
    let temporalNumbers = createNumbers();
    let firstRow = temporalNumbers.slice(0,5);
    let secondRow = temporalNumbers.slice(5,10);
    let thirdRow = temporalNumbers.slice(10,15);
    bingoCard = [firstRow,secondRow,thirdRow];
    return bingoCard;
}

const printBingoCard = () => {
    console.log(`------------------------------
| ${bingoCard[0][0].number}   | ${bingoCard[0][1].number}   | ${bingoCard[0][2].number}  | ${bingoCard[0][3].number}  | ${bingoCard[0][4].number} |
| ${bingoCard[1][0].number}  | ${bingoCard[1][1].number}  | ${bingoCard[1][2].number}  | ${bingoCard[1][3].number}  | ${bingoCard[1][4].number} |
| ${bingoCard[2][0].number}  | ${bingoCard[2][1].number}  | ${bingoCard[2][2].number}  | ${bingoCard[2][3].number}  | ${bingoCard[2][4].number} |
------------------------------`)
}

const confirmBingoCard = (userName) => {
    let answer;
    alert(`${userName} this is the generated bingo-card:`);
    printBingoCard();
    answer = confirm("Do you want to play with this Bingo-card?")
    if(!answer){
        alert("ok, let's create a new Bingo-Card for you");
        createBingoCard();
        confirmBingoCard(userName);
    }else {
        alert("Perfect, let's use this selected card");
        alert(`Are you readdy ${userName}? lets start!!`);
    }
}


const generateBingoRowNumber = (previousNumbers) => {
    
    let actualRowNumber = createRandomNumber(1,90);
    if (previousNumbers.includes(actualRowNumber)){
        return generateBingoRowNumber(previousNumbers); //! AQUI TUVIMOS EL ERROR, NOS FALTO PONER ESE RETURN
    }
    previousNumbers.push(actualRowNumber);
    alert (`this row number is --> ${actualRowNumber}`);
    previousNumbers.sort((a,b) => a - b);
    
    return actualRowNumber;
}

const checkIfNumberMatches = (number) => {
    for (let row of bingoCard){
        for (let rowNumber of row){
            if ( rowNumber.number === number){
                console.log("we have a match, lets replace into an 'x'!!");
                rowNumber.matched = true;
                return true;
            }
        }
    }
}

const replaceNumberByX = (number) => {
    alert("Great, we have a coincidence!!");
    for (let row of bingoCard){
        for (let rowNumber of row){
            if ( rowNumber.matched === true){
                rowNumber.number = "X"
            }
        }
    }
}

const checkLinea = (bingoCard) => {
    let onlyNumberMatched = [[],[],[]];
    for (let i = 0; i < bingoCard.length; i ++){
        for (let j = 0; j < bingoCard[i].length; j ++ ){
            if(bingoCard[i][j].matched === true){
                onlyNumberMatched[i].push(bingoCard[i][j].matched);
            }
        }
    }
    for (let matchedRows of onlyNumberMatched){
        if(matchedRows.length === 5){
            completedLinea += 1;
        }
    }
    if (completedLinea === 1){
        alert("LINEA!!!");
        points += 200;
    }
}

const checkBingo = (bingoCard) => {
    let onlyNumberMatched = [];
    for (let i = 0; i < bingoCard.length; i ++){
        for (let j = 0; j < bingoCard[i].length; j ++ ){
            if(bingoCard[i][j].matched === true){
                onlyNumberMatched.push(bingoCard[i][j].matched);
            }
        }
    }
    if (onlyNumberMatched.length === 15){
        completedBingo = true;
        points += 500;
        alert("BINGO!!!!!");
    }
}

const finishGame = (userName) => {

    console.log(`${userName} you have finished your bingo-card in ${rowsCounter} rows.`);
    console.log(`your points are: ${points - rowsCounter * 2}`);
    console.log("there is all the previous user's results: ");
    printRanking(userName);
}

const printRanking = (userName) => {
    rankingTable.push([userName, (points - rowsCounter * 2)]);
    rankingTable.sort((currentName, name) => {
        return currentName[1] - name[1]
    })
    rankingTable.forEach((user,index) => {
        console.log(`${index + 1} Position  --> User name: ${user[0]}   Points: ${user[1]}`);
    })
}

const doNewRow = (previousNumbers) => {
    console.log("---------NEW ROW------------")
    rowsCounter += 1; 
    let currentNumber = generateBingoRowNumber(previousNumbers);
    if (checkIfNumberMatches(currentNumber)){
        replaceNumberByX(currentNumber);
    } 
    printBingoCard();
    checkLinea(bingoCard);
    checkBingo(bingoCard);
}

const askToContinue = (userName,previousNumbers) => {
    let question
    if (completedBingo){
        finishGame(userName);
        resetPoints();
        resetRowsCounter();
        resetPreviousNumbers(previousNumbers);
        completedBingo = false;
        playAgain(userName);
        return question = false;
    }
    question = confirm(`do you want to continue?`)
    return question;
}

const playAgain = () => {
    let confirmationMessage = confirm("do you want to play again?");
    if (confirmationMessage){
        bingo();
    } 
}


const bingo = () => { 
    let previousNumbers = [];
    let userName = askUserName();
    explainGame(userName);
    createBingoCard();
    confirmBingoCard(userName);
    rowsCounter +=1;
    let response = true;
    while(response){
        doNewRow(previousNumbers);
        response = askToContinue(userName,previousNumbers);
    }
    alert(`thank you very much ${userName} for playing, we hope to see you soon!!! ;) `);
}
bingo();