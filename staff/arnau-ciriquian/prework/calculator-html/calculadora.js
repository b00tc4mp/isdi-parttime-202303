let counterNumber = 0;
let firstNumber = 0;
let value = [];
let lastOperator;
let memoryView;
let memoryValues = [];
let isMemeOn = false;

const addValue = (character) => {
    if (isMemeOn === false) {
        value.push(character);
        counterNumber = Number(value.join(''));
        if (counterNumber.toString().length > 7) {
            getExponential(counterNumber, 2);
        }
        document.getElementById("counter").innerHTML = counterNumber;
        memoryValues.push(character);
        memoryView = memoryValues.join('');
        document.getElementById("memory").innerHTML = memoryView;
    }
}

const addComma = (character) => {
    if (isMemeOn === false) {
        if (!value.includes('.')) {
            value.push('.');
            counterNumber = Number(value.join(''));
            document.getElementById("counter").innerHTML = counterNumber;
            memoryValues.push(character);
            memoryView = memoryValues.join('');
            document.getElementById("memory").innerHTML = memoryView;
        }
    }
}

const getOperator = (character) => {
    const lastMemoryValue = memoryValues[memoryValues.length - 1];
    const operators = ['+', '-', '*', '/']

    if (lastOperator !== undefined && value.length > 0) {
        getResult();
    }
    if (isMemeOn === false && !operators.includes(lastMemoryValue)) {
        firstNumber = counterNumber;
        lastOperator = character;
        memoryValues.push(lastOperator);
        memoryView = memoryValues.join('');
        document.getElementById("memory").innerHTML = memoryView;
        value = [];
    }
}

const calculateSum = () => counterNumber = Number(firstNumber) + Number(counterNumber);

const calculateDifference = () => counterNumber = Number(firstNumber) - Number(counterNumber);

const calculateMultiplication = () => counterNumber = Number(firstNumber) * Number(counterNumber);

const calculateDivision = () => counterNumber = Number(firstNumber) / Number(counterNumber);

const reduceDecimals = (resultedNumber) => {
    if (resultedNumber % 1 !== 0) {
        counterNumber = resultedNumber.toFixed(2);
    }
}

function getExponential(number, decimals) {
    counterNumber = Number.parseFloat(number).toExponential(decimals);
}

const getResult = () => {
    value = [];
    if (lastOperator === '+') {
        calculateSum();
    }

    if (lastOperator === '-') {
        calculateDifference();
    }

    if (lastOperator === '*') {
        calculateMultiplication();
    }

    if (lastOperator === '/') {
        if (counterNumber !== 0) {
            calculateDivision();
        }
        if (counterNumber === 0) {
            document.getElementById("globalCounter").innerHTML = "<img src='https://themathbehindthemagic.files.wordpress.com/2014/03/divide-by-zero1.jpg?w=500&h=375' id='zeroDivisionMeme'>"
            isMemeOn = true;
        }
    }

    if (isMemeOn === false) {
        reduceDecimals(counterNumber);
        if (counterNumber.toString().length > 7) {
            getExponential(counterNumber, 2);
        }
        document.getElementById("counter").innerHTML = counterNumber;
        lastOperator = '';
    }
}

const resetCounter = () => {
    document.getElementById("globalCounter").innerHTML ='<div><p id="memory"></p></div><div><p id="counter">0</p></div>';
    counterNumber = 0;
    memoryView = '';
    memoryValues = [];
    value = [];
    isMemeOn = false;
    document.getElementById("counter").innerHTML = counterNumber;
    document.getElementById("memory").innerHTML = memoryView;
}