const getNumbers = () => {
  let numbers = [];

  let firstNumber = prompt(
    "Give me the fist one of two numbers.",
    "Write here"
  );
  let secondNumber = prompt(
    "Give me the fist one of two numbers?",
    "Write here"
  );

  if (isNaN(firstNumber) && isNaN(secondNumber)) {
    console.alert("Both numbers must be valids.");
  } else if (!isNaN(firstNumber) && isNaN(secondNumber)) {
    return Math.sqrt(firstNumber);
  } else if (!isNaN(secondNumber) && isNaN(firstNumber)) {
    return Math.sqrt(secondNumber);
  } else {
    numbers.push(parseFloat(firstNumber));
    numbers.push(parseFloat(secondNumber));
  }

  return numbers;
};

const askForMoreNumbers = () => {
  let answer = prompt("New numbers? yes/no");
  if (answer) {
    answer = answer.toLowerCase();
  }

  if (answer === "no") {
    answer = "bye";
  } else if (answer == "yes") {
    answer = "yes";
  } else {
    answer = 'The answer must be "yes" or "no".';
  }

  return answer;
};

const sum = (numbers) => {
  let total = 0;
  for (const number of numbers) {
    total += number;
  }
  return total;
};

const difference = (numbers) => {
  let total = 0;

  for (const number of numbers) {
    total = Math.abs(total - number);
  }
  return total;
};

const multiply = (numbers) => {
  let total = 1;

  for (const number of numbers) {
    total *= number;
  }
  return total;
};

const divide = (numbers) => {
  let total = 1;

  for (const number of numbers) {
    total /= number;
  }
  return total;
};

const isFloat = (number) => {
  let regexPattern = /^-?[0-9]+$/;
  let result = regexPattern.test(number);

  if (result) {
    return number;
  } else {
    return parseFloat(number.toFixed(3));
  }
};

const calculator = (numbers) => {
  const sumResult = isFloat(sum(numbers));
  const differenceResult = isFloat(difference(numbers));
  const multiplyResult = isFloat(multiply(numbers));
  const divideResult = isFloat(divide(numbers));

  return {
    sumResult: sumResult,
    differenceResult: differenceResult,
    multiplyResult: multiplyResult,
    divideResult: divideResult,
  };
};

const run = (answer = "yes") => {
  let numbersForOperations = [];
  let squareRoot = 0;

  while (answer == "yes") {
    let numbers = getNumbers();
    answer = askForMoreNumbers();

    if (numbers.length > 1) {
      numbersForOperations = numbersForOperations.concat(numbers);
    } else {
      squareRoot = numbers;
    }
  }
  const result = calculator(numbersForOperations);

  const message = `
    The result of the sum is ${result["sumResult"]} . 

    The result of the subtraction is ${result["differenceResult"]} . 

    The result of the multiplication is ${result["multiplyResult"]} .  

    The result of the division is ${result["divideResult"]} .

    The square root is ${squareRoot} .
`;
  return message;
};

const result = run();
console.log(result);
