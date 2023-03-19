let valueToShow = '';
let valueToOperate = '';
let doSquareRoot = false
let superiorScreenText;
let inferiorScreenText;

const createCalculator = ()=> {
superiorScreenText = document.getElementById('superiorScreenText')
inferiorScreenText = document.getElementById('inferiorScreenText')
let buttons = document.querySelectorAll('.button')

  buttons.forEach(button => button.addEventListener('click', (e)=> {
  if (e.target.value === 'squareRoot') doSquareRoot = true;
  if (doSquareRoot === true) return squareRoot(e.target.value);
  if (doSquareRoot === false) return makeOperations(e.target.value)
}))
return;
}

let squareRootSymbol = false
let temporaryValue = '';
let squareRootValue;

const squareRoot = (value)=>{
  superiorScreenText.textContent = 0;
  if (temporaryValue === 'result') {
    returnToInitialValues();
    temporaryValue = value;
  }
  if (squareRootSymbol === false) {
    if (valueToShow !== '') {
    doSquareRoot = false;
    return;
    }
    if (inferiorScreenText.classList.contains('centralResult')) {
     inferiorScreenText.classList.remove('centralResult')
     inferiorScreenText.classList.add('inferiorScreenText')
    }
   inferiorScreenText.textContent = '√';
    squareRootSymbol = true;
    
    } else {
    if (value === 'delete') {
      valueToShow += '';
      valueToShow = valueToShow.slice(0, valueToShow.length - 1);
      inferiorScreenText.textContent = '√' + valueToShow;
      valueToShow = Number(valueToShow);
      squareRootValue = Math.sqrt(valueToShow);
      if (Number.isInteger(squareRootValue)) squareRootValue;
      else squareRootValue = squareRootValue.toFixed(5);
      superiorScreenText.textContent = squareRootValue;

    }else if (value === 'result') {
      superiorScreenText.textContent = '';
      inferiorScreenText.textContent = squareRootValue;
      inferiorScreenText.classList.remove('inferiorScreenText');
      inferiorScreenText.classList.add('centralResult');
      doSquareRoot = false;
      squareRootSymbol = false;
      valueToShow = '';
      return;

    } else if (value === 'ac') {
      superiorScreenText.textContent = '';
      inferiorScreenText.textContent = '';
      valueToShow = '';
      doSquareRoot = false;
      squareRootSymbol = false;
      return;

    } else {
      if (isNaN(value) === true && value !== '.') {
        superiorScreenText.textContent = squareRootValue;
        return;

      } else if (isNaN(value) === false) {
        console.log(value)
        valueToShow += value;
        valueToShow = Number(valueToShow);
        squareRootValue = Math.sqrt(valueToShow);
        if (Number.isInteger(squareRootValue)) squareRootValue;
        else squareRootValue = squareRootValue.toFixed(5);
        superiorScreenText.textContent = squareRootValue;
        inferiorScreenText.textContent = '√' + valueToShow;

      } else if (value === '.') {
        valueToShow += value;
        inferiorScreenText.textContent = '√' + valueToShow;
      }
    }
  }
}

const returnToInitialValues = ()=> {
  superiorScreenText.textContent = '';
  inferiorScreenText.textContent = '';
  firstValue = '';
  secondValue = '';
  operationSymbol = '';
  valueToShow = '';
  valueToOperate = '';
}

const calculateValue = (firstValue, secondValue, operationSymbol)=> {
  firstValue = Number(firstValue)
  secondValue = Number(secondValue)

  if (operationSymbol === '+') {
    let operation = firstValue + secondValue;
    if (Number.isInteger(operation) === true) return operation;
    else return operation.toFixed(3);
  } 
  if (operationSymbol === '-') {
    let operation = firstValue - secondValue;
    if (Number.isInteger(operation) === true) return operation;
    else return operation.toFixed(3);
  } 
  if (operationSymbol === 'x') {
    let operation = firstValue * secondValue;
    if (Number.isInteger(operation) === true) return operation;
    else return operation.toFixed(3);
  } 
  if (operationSymbol === '/') {
    let operation = firstValue / secondValue;
    if (Number.isInteger(operation) === true) return operation;
    else return operation.toFixed(5);
  }
}

let firstValue = '';
let secondValue = '';
let operationSymbol = '';

const makeOperations = (value)=>{
  if (inferiorScreenText.classList.contains('centralResult')) {
   inferiorScreenText.classList.remove('centralResult')
   inferiorScreenText.classList.add('inferiorScreenText')
  }
  
  if (temporaryValue === 'result') {
    returnToInitialValues();
  }
  if (firstValue === '') superiorScreenText.textContent = 0;

  if ((temporaryValue === '+' || temporaryValue === '-' || temporaryValue === 'x' || temporaryValue === '/') && (value === '+' || value === '-' || value === 'x' || value === '/')) {
    return;
  }
  
  if (value === 'delete') {
    lasCharacter = valueToShow.charAt(valueToShow.length - 1)
    if (isNaN(lasCharacter) === false || lasCharacter === '.') {
      valueToShow = valueToShow.slice(0, valueToShow.length - 1);
      inferiorScreenText.textContent = valueToShow;
      temporaryValue = value;
      return;
    } else {
      return;
    }
    
  } else if (value === 'result') {
    valueToOperate = calculateValue(firstValue, secondValue, operationSymbol);
    superiorScreenText.textContent = '';

    if (valueToOperate === 'Infinity') {
      valueToOperate = 'Error';
      inferiorScreenText.textContent = valueToOperate;
    } else inferiorScreenText.textContent = valueToOperate;

    inferiorScreenText.classList.remove('inferiorScreenText');
    inferiorScreenText.classList.add('centralResult');
    temporaryValue = value;
    return;

  } else if (value === 'ac') {
    returnToInitialValues();
    temporaryValue = 'ac';

  } else {
    valueToShow += value;
    inferiorScreenText.textContent = valueToShow;

    if ((isNaN(value) === false || value === '.') && operationSymbol === '') {
      if (firstValue.includes('.') && value === '.') {
        valueToShow = valueToShow.slice(0, valueToShow.length - 1);
        inferiorScreenText.textContent = valueToShow;
        return;
      }
      firstValue += value;
      temporaryValue = value;
      return;
    }
    if ((isNaN(value) === false || value === '.') && operationSymbol !== '') {
      if (secondValue.includes('.') && value === '.') {
        valueToShow = valueToShow.slice(0, valueToShow.length - 1);
        inferiorScreenText.textContent = valueToShow;
        return;
      }
      secondValue += value;
      temporaryValue = value;
      return;
    }
    if (isNaN(value) === true && value !== '.' && operationSymbol === '') {
      if (firstValue === '' && (value === '+' || value === '-' || value === 'x' || value === '/')) {
        firstValue = 0;
        operationSymbol = value;
        temporaryValue = secondValue;
        return;
      } 
      operationSymbol = value;
      temporaryValue = operationSymbol;
      return;
    }
    if (isNaN(value) === true && value !== '.' && operationSymbol !== '' && isNaN(temporaryValue) === false) {
      valueToOperate = calculateValue(firstValue, secondValue, operationSymbol);
      superiorScreenText.textContent = valueToOperate;
      inferiorScreenText.textContent = valueToShow;
      temporaryValue = value;
      firstValue = valueToOperate;
      operationSymbol = value;
      secondValue = '';
      return;
    } 
  }
}

createCalculator();