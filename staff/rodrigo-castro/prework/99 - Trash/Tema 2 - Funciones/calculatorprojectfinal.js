const userNumbers = [];
const userResults = [];
let isMultiple;

const getNumbers = () => {
  const userNumber = +prompt("Insert a number.");
  if (isNaN(userNumber)) {
    return getNumbers();
  }
  userNumbers.push(+userNumber);
  if (userNumbers.length < 2) {
    isMultiple = confirm("Do you want to insert a second number?");
    if (isMultiple) {
      return getNumbers();
    }
  }
};

const showNumbers = () => {
  if (userNumbers.length < 2) {
    if (userNumbers[0] % 1 === 0) {
      console.log(`Your number is ${userNumbers[0]}`);
    } else {
      console.log(`Your number is ${userNumbers[0].toFixed(3)}`);
    }
  } else {
    console.log(`Your numbers are:`);
    if (userNumbers[0] % 1 === 0) {
      console.log(userNumbers[0]);
    } else {
      console.log(userNumbers[0].toFixed(3));
    }
    if (userNumbers[1] % 1 === 0) {
      console.log(userNumbers[1]);
    } else {
      console.log(userNumbers[1].toFixed(3));
    }
  }
};

const additionOperation = (a, b) => {
  const auxAddition = a + b;
  userResults.push(auxAddition);
  if (auxAddition % 1 === 0) {
    console.log(`Addition of the numbers is: ${auxAddition}`);
  } else {
    console.log(`Addition of the numbers is: ${auxAddition.toFixed(3)}`);
  }
};

const subtractionOperation = (a, b) => {
  const auxSubtraction = a - b;
  userResults.push(auxSubtraction);
  if (auxSubtraction % 1 === 0) {
    console.log(`Subtraction of the numbers is: ${auxSubtraction}`);
  } else {
    console.log(`Subtraction of the numbers is: ${auxSubtraction.toFixed(3)}`);
  }
};

const multiplicationOperation = (a, b) => {
  const auxMultiplication = a * b;
  userResults.push(auxMultiplication);
  if (auxMultiplication % 1 === 0) {
    console.log(`Multiplication of the numbers is: ${auxMultiplication}`);
  } else {
    console.log(
      `Multiplication of the numbers is: ${auxMultiplication.toFixed(3)}`
    );
  }
};

const splitOperation = (a, b) => {
  const auxSplit = a / b;
  userResults.push(auxSplit);
  if (auxSplit % 1 === 0) {
    console.log(`Division of the numbers is: ${auxSplit}`);
  } else {
    console.log(`Division of the numbers is: ${auxSplit.toFixed(3)}`);
  }
};

const sqrtOperation = (a) => {
  if (a < 0) {
    console.log("Cannot calculate square root of a negative number.");
  } else {
    const auxSqrt = Math.sqrt(a);
    userResults.push(auxSqrt);
    if (auxSqrt % 1 === 0) {
      console.log(`Square root of the number is: ${auxSqrt}`);
    } else {
      console.log(`Square root of the number is: ${auxSqrt.toFixed(3)}`);
    }
  }
};

const showResults = () => {
  console.log("Here you have a summary of your results:");
  userResults.forEach((singleResult) => {
    console.log("*****************");
    if (singleResult % 1 === 0) {
      console.log(singleResult);
    } else {
      console.log(singleResult.toFixed(3));
    }
  });
};

const playCalculator = () => {
  getNumbers();
  showNumbers();
  if (isMultiple) {
    additionOperation(userNumbers[0], userNumbers[1]);
    subtractionOperation(userNumbers[0], userNumbers[1]);
    multiplicationOperation(userNumbers[0], userNumbers[1]);
    splitOperation(userNumbers[0], userNumbers[1]);
  } else {
    sqrtOperation(userNumbers[0]);
  }
  const newOperation = confirm("Do you want to do a new operation?");
  if (newOperation) {
    userNumbers.splice(0);
    return playCalculator();
  }
  showResults();
};

playCalculator();
