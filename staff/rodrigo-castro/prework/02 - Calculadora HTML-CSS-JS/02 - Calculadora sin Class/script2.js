const numberButtons = document.querySelectorAll('.data-number')
const operationButtons = document.querySelectorAll('.data-operation')
const equalsButton = document.querySelector('.data-equals')
const deleteButton = document.querySelector('.data-delete')
const allClearButton = document.querySelector('.data-all-clear')
const previousOperandTextElement = document.querySelector('.previous-operand')
const currentOperandTextElement = document.querySelector('.current-operand')

let currentOperand = '';
let previousOperand = '';
let previousOperational;
let operation;

const clearDisplay = () => {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    currentOperandTextElement.innerText = '';
    previousOperandTextElement.innerText = '';
}

const deleteNumber = () => {
    currentOperand = currentOperand.toString().slice(0, -1)
    if (currentOperand === "-") {
        currentOperand = ""
    }
}
 
const appendNumber = (numberSelected) => {
    if (numberSelected === '.' && currentOperand.includes('.')) return
    currentOperand = currentOperand.toString() + numberSelected.toString()
}

const chooseOperation = (operation) => {
    if (currentOperand === '') return
    if (previousOperand === '') {
        previousOperational = operation;
    } else {
        computeOperation();
        previousOperand = currentOperand
        previousOperational = operation;
        currentOperand = ''
    }
}

const computeOperation = () => {
    let computation 
    const previousOperandNumber = parseFloat(previousOperand) 
    const currentOperandNumber = parseFloat(currentOperand) 
    if (isNaN(previousOperandNumber) || isNaN(currentOperandNumber)) return
    switch (operation){
        case '+':
            computation = previousOperandNumber + currentOperandNumber
            break
        case '-':
            computation = previousOperandNumber - currentOperandNumber
            break
        case '*':
            computation = previousOperandNumber * currentOperandNumber
            break
        case '÷':
            computation = previousOperandNumber / currentOperandNumber
            break
        default:
            return
    }
    currentOperand = computation
    operation = undefined
    previousOperand = ''
    previousOperandTextElement.innerText = ""
}

const updateDisplay = () => {

    if (operation != null && (previousOperand !== null || previousOperand !== "")){
        previousOperational = operation;
        previousOperandTextElement.innerText = `${previousOperand} ${previousOperational}`;
        currentOperandTextElement.innerText = currentOperand;
    }

    if (operation != null && (previousOperand === null || previousOperand === "")) {
        previousOperand = currentOperand;
        previousOperational = operation;
        currentOperand = "";
        previousOperandTextElement.innerText = `${previousOperand} ${previousOperational}`;
        currentOperandTextElement.innerText = currentOperand;
    }

        if (currentOperand === Infinity || previousOperand === Infinity) {
        currentOperand = "";
        currentOperandTextElement.innerText = "Error - División por 0!";
        previousOperandTextElement.innerText = "Presione AC para continuar";
    } else {
        currentOperandTextElement.innerText = currentOperand
    }
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent)
        updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.textContent)
        operation = button.textContent;
        updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    computeOperation()
    updateDisplay()
})

allClearButton.addEventListener('click', () => {
    clearDisplay()
    updateDisplay()
})

deleteButton.addEventListener('click', () => {
    deleteNumber()
    updateDisplay()
})
