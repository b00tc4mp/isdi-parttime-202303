let enteredNumbers = [];

const questionExit = ()=>{
  let question = confirm("Ei! No numbers has been entered, do you want to enter more?\nIf you do, please press Accept.\nIf you want to make the operations, please press 'Cancel'.")
  if (question === false && enteredNumbers.length === 0) alert("Thank you for using our calculator, good bye!");
  else if (question === true) return askNumbers();
  else return;
}

const askNumbers = () => {
  let userInput;
  if (enteredNumbers.length === 0) userInput = prompt("Please, enter the number you want to operate with.")
  else if (enteredNumbers.length === 1) userInput = prompt("Hello there! Please, enter the number you want to operate with.\nIf you already entered only one and want to do the square root of it, leave it blank and press 'Accept', or press 'Cancel'.");
  else userInput = prompt("Hello there! Please, enter the number you want to operate with.\nIf you already entered more than one and don't want to introduce more, leave it blank and press 'Accept', or press 'Cancel'.")

  if (!userInput && enteredNumbers.length === 1) return;
  else if (!userInput) questionExit()
  else {
    if (isNaN(userInput)) {
      alert("The value entered is not a number.");
      return askNumbers();
    } else {
      userInput = Number(userInput);
      enteredNumbers.push(userInput);
      return askNumbers();
    }
  }
  return enteredNumbers;
};

const addition = () => {
  let total = enteredNumbers[0];
  for (i = 1; i < enteredNumbers.length; i++) {
    total += enteredNumbers[i];
  }
  return total;
};
const substraction = () => {
  let total = enteredNumbers[0];
  for (i = 1; i < enteredNumbers.length; i++) {
    total -= enteredNumbers[i];
  }
  return total;
};
const multiplication = () => {
  let total = enteredNumbers[0];
  for (i = 1; i < enteredNumbers.length; i++) {
    total = total * enteredNumbers[i];
    total = Number.isInteger(total) ? total : total.toFixed(3)
  }
  return total;
};
const division= () => {
  let total = enteredNumbers[0];
  for (i = 1; i < enteredNumbers.length; i++) {
    total = total / enteredNumbers[i];
    total = Number.isInteger(total) ? total : total.toFixed(3)
  }
  return total;
};

const calculator = () => {
  alert("Hello there! You are using our calculator app.")
  alert("If you wanto to do any operation you only have to enter different numbers.\nIn case you wanto to do the square root of a number, enter just one number.\nBut if you wanto to the other operations, wich are: to add, to substract, to multiply, and to divide, you will need to enter more than one.\nSo...let's go!.")
  askNumbers();
  if (enteredNumbers.length === 1) {
    squareRoot = Math.sqrt(enteredNumbers[0]);
    fixedSquareRoot = Number.isInteger(squareRoot) ? squareRoot : squareRoot.toFixed(3);
    alert(`The square root of ${enteredNumbers[0]} is ${fixedSquareRoot}.`);
    continueOperating();
  } else if (enteredNumbers.length > 1) {
    let results = [];
    let toAdd = (`The result of the sum of the numbers is: ${addition()}.`);
    let toSubstract = (`The result of substracting the numbers is: ${substraction()}.`);
    let toMultiply = (`The result of multiplying the numbers is: ${multiplication()}.`);
    let toDivide = (`The result of dividing the numbers is: ${division()}.`);
    results.push(toAdd, toSubstract, toMultiply, toDivide);
    results = results.join('\n')
    alert('The numbers are:\n' + results);
    continueOperating();
  }
};

const continueOperating = ()=>{
  let questionToContinue = confirm("You are about to exit ,dou you want to do another operation?\nIf you do, please press Accept.\nIf you want to exit, please press 'Cancel'.")
  if (questionToContinue === false) alert("Thank you for using our calculator, good bye!");
  else if (questionToContinue === true) {
  enteredNumbers = []
  return calculator();
  }
}
calculator();

