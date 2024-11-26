let bingoCardCheatsheet = [];
let letsPlay = true;
let bingoCard = [];
let lineCheck = true;
let lineCalled = true;
let bingoCheck = true;
let bingoCalled = true;
let round = 0;
let gameIsOn = true;
let playedNumbersList = [];
let playedNumber;
let acceptedCardCheck = true;
let userName;

const getName = () => {
    userName = prompt (`Welcome to BingoCoders, the best online bingo since 1991!
Please insert your name:`);

    alert (`${userName}, this game consists in a 3x5 grid filled with random numbers from 1 to 60.
Each round a random number will be chosen.
If this number is present in your bingo sheet it will be scored.
The goal is to score all your sheet numbers with the least amount of rounds!
Good luck and have fun!`);
}

const generateBingoCard = () => {
    const numbersList = []
    for (i = 0; i < 15; i++) {
        let newNumber = {};
        let randomNumberCheck = true;
        let randomNumber = Math.floor(Math.random() * 60) + 1;
        do {if (numbersList.includes(randomNumber)){
                randomNumber = Math.floor(Math.random() * 60) + 1;
            } else {
                numbersList.push(randomNumber);
                randomNumberCheck = false;
            }
        } while (randomNumberCheck)
        newNumber.number = randomNumber;
        newNumber.matched = false;
        bingoCardCheatsheet.push(newNumber);
    }
};

const getBingoCard = () => {
    generateBingoCard();
        bingoCard = [
            [bingoCardCheatsheet[0].number, bingoCardCheatsheet[1].number, bingoCardCheatsheet[2].number, bingoCardCheatsheet[3].number, bingoCardCheatsheet[4].number],
            [bingoCardCheatsheet[5].number, bingoCardCheatsheet[6].number, bingoCardCheatsheet[7].number, bingoCardCheatsheet[8].number, bingoCardCheatsheet[9].number],
            [bingoCardCheatsheet[10].number, bingoCardCheatsheet[11].number, bingoCardCheatsheet[12].number, bingoCardCheatsheet[13].number, bingoCardCheatsheet[14].number],
        ];
        console.table(bingoCard);
        let userCardAcceptanceCheck = true;
        let userCardAcceptance = prompt (`Do you like your new card? (Look at the console!) y/n.`);
        do {
            userCardAcceptance = userCardAcceptance.toLowerCase();
            if (userCardAcceptance === 'y' || userCardAcceptance === 'yes') {
                userCardAcceptanceCheck = false;
                acceptedCardCheck = false;
            };
            if (userCardAcceptance === 'n' || userCardAcceptance === 'no') {
                userCardAcceptanceCheck = false;
                bingoCardCheatsheet = [];
                generateBingoCard();
                const bingoCard = [
                    [bingoCardCheatsheet[0].number, bingoCardCheatsheet[1].number, bingoCardCheatsheet[2].number, bingoCardCheatsheet[3].number, bingoCardCheatsheet[4].number],
                    [bingoCardCheatsheet[5].number, bingoCardCheatsheet[6].number, bingoCardCheatsheet[7].number, bingoCardCheatsheet[8].number, bingoCardCheatsheet[9].number],
                    [bingoCardCheatsheet[10].number, bingoCardCheatsheet[11].number, bingoCardCheatsheet[12].number, bingoCardCheatsheet[13].number, bingoCardCheatsheet[14].number],
                ];
            }; 
            if (userCardAcceptance != 'y' && userCardAcceptance != 'yes' && userCardAcceptance != 'n' && userCardAcceptance != 'no') {
                userCardAcceptance = prompt (`Please answer yes or no!`);
            };
        } while (userCardAcceptanceCheck);
}

const doAnotherRound = () => {
    let playedNumberCheck = true;
    let playedNumber = Math.floor(Math.random() * 60) + 1;
    do {if (playedNumbersList.includes(playedNumber)){
            playedNumber = Math.floor(Math.random() * 60) + 1;
        } else {
            playedNumbersList.push(playedNumber);
            playedNumberCheck = false;
        }
    } while (playedNumberCheck)
    round++;
    let roundConfirmation = confirm (`Round nº ${round}: played number is: ${playedNumber}`);
    if (roundConfirmation === false || round === 60) {
        gameIsOn = false;
    };
    for (i = 0; i < 3; i++) {
        for (j = 0; j < bingoCardCheatsheet.length; j++) {
            if (bingoCard[i][j] === playedNumber) {
                bingoCard[i][j] = 0;
                confirm (`Hey! You have number ${playedNumber} in your card! Let's cross it!`);
            }
        }
    }
}

const callLine = () => {
    for (z = 0; z < 3; z++) {
        let sumLine = 0;
        bingoCard[z].map(x => sumLine += x);
        if (sumLine === 0) {
            alert (`LINE! Keep playing to win BINGO!`);
            lineCheck = false;
            lineCalled = false;
        } else {
            lineCheck = false;
        }
    }
}

const callBingo = () => {
    let sumLineZero = 0;
    bingoCard[0].map(x => sumLineZero += x);
    let sumLineOne = 0;
    bingoCard[1].map(x => sumLineOne += x);
    let sumLineTwo = 0;
    bingoCard[2].map(x => sumLineTwo += x);
    if (sumLineZero === 0 && sumLineOne === 0 && sumLineTwo === 0) {
        alert (`Bingo! ${userName}, you won in ${round} rounds!`);
        bingoCheck = false;
        bingoCalled = false;
        gameIsOn = false;
    } else {
        bingoCheck = false;
    }
}

const endGame = () => {
    let keepPlayingCheck = true;
    let keepPlaying = prompt (`${userName}, do you want to play again? y/n.`);
    do {keepPlaying = keepPlaying.toLowerCase();
        if (keepPlaying === 'y' || keepPlaying === 'yes') {
            keepPlayingCheck = false;
            bingoCardCheatsheet = [];
            letsPlay = true;
            bingoCard = [];
            lineCheck = true;
            lineCalled = true;
            bingoCheck = true;
            bingoCalled = true;
            round = 0;
            gameIsOn = true;
            playedNumbersList = [];
            playedNumber;
            acceptedCardCheck = true;
            userName;
        };
        if (keepPlaying === 'n' || keepPlaying === 'no') {
            keepPlayingCheck = false;
            letsPlay = false;
            alert (`Goodbye ${userName}! Hope to see you again at BingoCoders!`);
        }; 
        if (keepPlaying != 'y' && keepPlaying != 'yes' && keepPlaying != 'n' && keepPlaying != 'no') {
            keepPlaying = prompt (`Please answer yes or no!`);
        };
    } while (keepPlayingCheck);
}
const playBingo = () => {
    getName();
    do {do {getBingoCard();
    } while (acceptedCardCheck);
       
    do {doAnotherRound();        
        console.log(`Round nº ${round}: played number is: ${playedNumber}`);
        console.table(bingoCard);
        if (lineCalled) {
            do {callLine();
            }   while (lineCheck)
        }
        if (bingoCalled) {
            do {callBingo();
            } while (bingoCheck)
        }
    } while (gameIsOn);
    endGame();
} while (letsPlay);
}

playBingo();