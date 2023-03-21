const result = document.getElementById('number-container');
const toDelete = document.getElementById('botonOn');
let isDivision = false;
let isMultiplication = false;
let isSubtraction = false;
let isSum = false;
let isOperation = false;
let lastResult = null;

const limitValue = () => {
  if (result.innerHTML.toString().length > 7) {
    result.innerHTML = Number.parseFloat(result.innerHTML).toExponential(2);
  }
};

const changeACButton = () => {
  if (result.innerHTML !== '0') {
    toDelete.innerHTML = 'C';
    return;
  }

  toDelete.innerHTML = 'AC';
};

const resetOperations = () => {
  isDivision = false;
  isMultiplication = false;
  isSubtraction = false;
  isSum = false;
};

const pressNumbers = (numberClick) => {
  const number = result.innerHTML;

  if (number === '0' || number === 'ERROR' || isOperation) {
    result.innerHTML = numberClick;
    changeACButton();
    isOperation = false;
    return;
  }

  if (number.length < 7) result.innerHTML = `${number}${numberClick}`;

  changeACButton();
};

const pressPoint = (pointClick) => {
  const number = result.innerHTML;

  if (!number.includes('.')) {
    result.innerHTML = `${number}${pointClick}`;
  }

  changeACButton();
};

const pressAC = () => {
  if (toDelete.innerHTML === 'AC') {
    resetOperations();
    lastResult = null;
  }

  result.innerHTML = '0';
  changeACButton();
};

const pressSignChanger = () => {
  result.innerHTML = result.innerHTML * -1;

  changeACButton();
};

const pressPercent = () => {
  result.innerHTML = parseFloat(result.innerHTML / 100);

  limitValue();
  changeACButton();
};

const updateLastResult = () => {
  lastResult = parseFloat(result.innerHTML);
};

const checkNumber = (number) => {
  if (number % 1 === 0) {
    return parseFloat(number);
  }

  return parseFloat(number.toFixed(2));
};

const toDoOperation = () => {
  const actualNumber = parseFloat(result.innerHTML);

  if (isDivision) {
    if (actualNumber === 0) {
      result.innerHTML = 'ERROR';
      return;
    }

    lastResult = checkNumber(lastResult / actualNumber);
    result.innerHTML = lastResult;
    return;
  }

  if (isMultiplication) {
    lastResult = checkNumber(lastResult * actualNumber);
    result.innerHTML = lastResult;
    return;
  }

  if (isSubtraction) {
    lastResult = checkNumber(lastResult - actualNumber);
    result.innerHTML = lastResult;
    return;
  }

  if (isSum) {
    lastResult = checkNumber(lastResult + actualNumber);
    result.innerHTML = lastResult;
    return;
  }
};

const division = () => {
  if (null !== lastResult) {
    toDoOperation();
  } else {
    updateLastResult();
  }

  isMultiplication = false;
  isSubtraction = false;
  isSum = false;
  isDivision = true;
  isOperation = true;

  limitValue();
  changeACButton();
};

const multiplication = () => {
  if (null !== lastResult) {
    toDoOperation();
  } else {
    updateLastResult();
  }

  isSubtraction = false;
  isSum = false;
  isDivision = false;
  isMultiplication = true;
  isOperation = true;

  limitValue();
  changeACButton();
};

const subtraction = () => {
  if (null !== lastResult) {
    toDoOperation();
  } else {
    updateLastResult();
  }

  isSum = false;
  isDivision = false;
  isMultiplication = false;
  isSubtraction = true;
  isOperation = true;

  limitValue();
  changeACButton();
};

const sum = () => {
  if (null !== lastResult) {
    toDoOperation();
  } else {
    updateLastResult();
  }

  isSubtraction = false;
  isDivision = false;
  isMultiplication = false;
  isSum = true;
  isOperation = true;

  limitValue();
  changeACButton();
};

const pressEqual = () => {
  if (null !== lastResult) {
    toDoOperation();
  } else {
    updateLastResult();
  }

  isSubtraction = false;
  isDivision = false;
  isMultiplication = false;
  isSum = false;
  isOperation = false;

  limitValue();
  changeACButton();
};
