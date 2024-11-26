let play = true;

while (play === true) {
    let firstNumberCheck = true;
    let secondNumberCheck = true;
    const numbersArray = [];
    const results = [];

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

    let secondNumber = prompt('Number 2');
    while (secondNumberCheck === true) {
        if (secondNumber.match(/^[+-]?\d+(\.\d+)?$/)) {
            secondNumber = Number(secondNumber);
            numbersArray.push(secondNumber);
            secondNumberCheck = false;
          } else if (secondNumber === '') {
            secondNumberCheck = false;
          } else {
            secondNumber = prompt("Error! Please enter a valid number:");
          }
    };


    if (numbersArray.length === 1) {
        let squareRoot = Math.sqrt(numbersArray[0])
        results.push(squareRoot)
        for (let i = 0; i < results.length; i++){
          if (results[i] % 1 != 0) {
            results[i] = results[i].toFixed(3);
          }
        }
        alert(`Result for number ${numbersArray[0]} is:
        
square root: ${results}`)

    } else if (numbersArray.length === 2) {
        let sum = firstNumber + secondNumber;
        let difference = firstNumber - secondNumber;
        let multiplication = firstNumber * secondNumber;
        let division = firstNumber / secondNumber;

        results.push(sum, difference, multiplication, division)

        for (let i = 0; i < results.length; i++){
          if (results[i] % 1 != 0) {
            results[i] = results[i].toFixed(3);
          }
        }
        
        alert(`Results for numbers ${firstNumber} and ${secondNumber} are:

sum: ${results[0]}
difference: ${results[1]}
multiplication: ${results[2]}
division: ${results[3]}`);

    } else {
      alert(`No numbers provided!`)
    }

    let keepPlayingCheck = true;
    let keepPlaying = prompt ('Calculate again? Answer y/n');
    while (keepPlayingCheck === true){
        keepPlaying = keepPlaying.toLowerCase();
        if (keepPlaying === 'y' || keepPlaying === 'yes') {
            keepPlayingCheck = false;  
            keeplaying = true;
        } else if (keepPlaying === 'n' || keepPlaying === 'no') {
            keepPlayingCheck = false;  
            play = false;
        } else {
          keepPlaying = prompt ('Please, answer y/n');
        }   
    }
};

alert('BYE!');