const userNumbers = [];
const userResults = [];
let isMultiple;

const askNameAndGreet = () => {
  const userName = prompt("Hello! What's your name?");
  console.log(`Hello ${userName}! Let's begin.`);
};

const getNumbers = () => {
  const userNumber = +prompt("Insert a number.");
  if (isNaN(userNumber)) {
    return getNumbers();
  }
  userNumbers.push(+userNumber);
  isMultiple = confirm("Do you want to insert another number?");
  if (isMultiple) {
    return getNumbers();
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
    for (let i = 0; i < userNumbers.length; i++) {
      console.log("");
      if (userNumbers[i] % 1 === 0) {
        console.log(userNumbers[i]);
      } else {
        console.log(userNumbers[i].toFixed(3));
      }
    }
  }
};

const additionOperation = () => {
  let auxAddition = 0;
  for (let i = 0; i < userNumbers.length; i++) {
    auxAddition = auxAddition + userNumbers[i];
  }
  userResults.push(auxAddition);
  if (auxAddition % 1 === 0) {
    console.log(`Addition of the numbers is: ${auxAddition}`);
  } else {
    console.log(`Addition of the numbers is: ${auxAddition.toFixed(3)}`);
  }
};

const subtractionOperation = () => {
  let auxSubtraction = userNumbers[0];
  for (let i = 1; i < userNumbers.length; i++) {
    auxSubtraction = auxSubtraction - userNumbers[i];
  }
  userResults.push(auxSubtraction);
  if (auxSubtraction % 1 === 0) {
    console.log(`Subtraction of the numbers is: ${auxSubtraction}`);
  } else {
    console.log(`Subtraction of the numbers is: ${auxSubtraction.toFixed(3)}`);
  }
};

const multiplicationOperation = () => {
  let auxMultiplication = userNumbers[0];
  for (let i = 1; i < userNumbers.length; i++) {
    auxMultiplication = auxMultiplication * userNumbers[i];
  }
  userResults.push(auxMultiplication);
  if (auxMultiplication % 1 === 0) {
    console.log(`Multiplication of the numbers is: ${auxMultiplication}`);
  } else {
    console.log(
      `Multiplication of the numbers is: ${auxMultiplication.toFixed(3)}`
    );
  }
};

const splitOperation = () => {
  let auxDivision = userNumbers[0];
  for (let i = 1; i < userNumbers.length; i++) {
    auxDivision = auxDivision / userNumbers[i];
  }
  userResults.push(auxDivision);
  if (auxDivision % 1 === 0) {
    console.log(`Division of the numbers is: ${auxDivision}`);
  } else {
    console.log(`Division of the numbers is: ${auxDivision.toFixed(3)}`);
  }
};

const sqrtOperation = () => {
  if (userNumbers[0] < 0) {
    console.log("Cannot calculate square root of a negative number.");
  } else {
    auxSqrt = Math.sqrt(userNumbers[0]);
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
  askNameAndGreet();
  getNumbers();
  showNumbers();
  if (userNumbers.length === 1) {
    sqrtOperation();
  } else {
    additionOperation();
    subtractionOperation();
    multiplicationOperation();
    splitOperation();
  }
  const newOperation = confirm("Do you want to do a new operation?");
  if (newOperation) {
    userNumbers.splice(0);
    return playCalculator();
  }
  showResults();
};

playCalculator();
