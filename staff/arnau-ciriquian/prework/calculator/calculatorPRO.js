let play = true;
const otherNumbersArray = [];
const numbersArray = [];

const calculateSingle = (ArrayOfNumbers) => {
    let squareRoot = Math.sqrt(ArrayOfNumbers[0])
    let total = [];
    total.push(squareRoot);
    for (let i = 0; i < total.length; i++){
        if (total[i] % 1 != 0) {
            total[i] = total[i].toFixed(3);
        }
    }
    return `For the number provided square root result is ${total[0]}.`
}

const calculateMultiple = (initialNumber, ...restOfNumbers) => {
    let sum = initialNumber;
    let difference = initialNumber;
    let multiplication = initialNumber;
    let division = initialNumber;
    let total = [];  
      
    for (const arg of restOfNumbers) {
      sum += arg;
      difference -= arg;
      multiplication *= arg;
      division /= arg;  
    }
    total.push(sum, difference, multiplication, division);
    for (let i = 0; i < total.length; i++){
        if (total[i] % 1 != 0) {
            total[i] = total[i].toFixed(3);
        }
    } 
    return `For the numbers provided results are: 
sum = ${total[0]}
difference = ${total[1]}
multiplication = ${total[2]}
division = ${total[3]}`;
}

while (play === true) {
    let firstNumberCheck = true;
    let firstNumber = prompt('Number 1');
    while (firstNumberCheck === true) {
        if (firstNumber.match(/^[+-]?\d+(\.\d+)?$/)) {
            firstNumber = Number(firstNumber);
            numbersArray.push(firstNumber);
            firstNumberCheck = false;
          } else if (firstNumber === '') {
            firstNumberCheck = false;
          } else {
            firstNumber = prompt("Error! Please enter a valid number:");
          }
    };

    let multipleNumbersCheck = true;

    while (multipleNumbersCheck === true) {
        let otherNumberCheck = true;
        let otherNumber = prompt('Add another number');
        while (otherNumberCheck === true) {
            if (otherNumber.match(/^[+-]?\d+(\.\d+)?$/)) {
                otherNumber = Number(otherNumber);
                numbersArray.push(otherNumber);
                otherNumberCheck = false;
              } else if (otherNumber === '') {
                otherNumberCheck = false;
              } else {
                otherNumber = prompt("Error! Please enter a valid number:");
              }
        };
        otherNumbersArray.push(otherNumber);
        
        let addMoreNumbersQuestionCheck = true;
        let moreNumbers = prompt('Add another number? Answer y/n');
        moreNumbers = moreNumbers.toLowerCase();
        while (addMoreNumbersQuestionCheck === true){
            if (moreNumbers === 'y' || moreNumbers === 'yes') {
                addMoreNumbersQuestionCheck = false;
                multipleNumbersCheck = true;
            } else if (moreNumbers === 'n' || moreNumbers === 'no') {
                addMoreNumbersQuestionCheck = false;
                multipleNumbersCheck = false;
            } else {
                moreNumbers = prompt ('Please, answer y/n');
            }
        }
    }

    if (numbersArray.length === 1) {
        alert(calculateSingle(numbersArray))
    } else if (numbersArray.length > 1) {
        alert(calculateMultiple(firstNumber, ...otherNumbersArray))
    } else {
        alert(`No numbers provided!`)
    }
    
    let keepPlayingCheck = true;
    let keepPlaying = prompt ('Calculate again? Answer y/n');
    keepPlaying = keepPlaying.toLowerCase();
    while (keepPlayingCheck === true)
    if (keepPlaying === 'y' || keepPlaying === 'yes') {
        keepPlayingCheck = false;
        play = true;
    } else if (keepPlaying === 'n' || keepPlaying === 'no') {
        keepPlayingCheck = false;
        play = false;
    } else {
        keepPlaying = prompt ('Please, answer y/n');
    }
}

alert('BYE!');