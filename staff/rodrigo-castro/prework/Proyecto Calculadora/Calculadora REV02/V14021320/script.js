class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clearDisplay()
    }

    clearDisplay = () => {
        this.currentOperand = ''
        this.previousOperand = ''
        this.previousOperandTextElement.innerText = ''
        this.operation = undefined
    }

    deleteNumber = () => {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
        if (this.currentOperand === "-") {
            this.currentOperand = ""
        }
    }
 
    appendNumber = (numberSelected) => {
        if (numberSelected === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + numberSelected.toString()
    }

    chooseOperation = (operation) => {
        // este if impide que pueda seleccionar una operación si no he cargado ningún número aún
        if (this.currentOperand === '') return
        // este if hace que si hago varias operaciones consecutivas, el previousOperand vaya siendo el resultado de esas operaciones
        if (this.previousOperand !== '') {
            this.computeOperation()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    computeOperation = () => {
        let computation //este sera el resultado de computeOperation
        const previousOperandNumber = parseFloat(this.previousOperand) // convierte el previousOperand de string a número
        const currentOperandNumber = parseFloat(this.currentOperand) // convierte el currentOperand de string a número
        // el siguiente if lo que hace es salir de la función si le doy al igual y no hay previous number o current number
        if (isNaN(previousOperandNumber) || isNaN(currentOperandNumber)) return
        switch (this.operation){
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
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
        this.previousOperandTextElement.innerText = ""
    }

    updateDisplay = () => {
        if (this.currentOperand === Infinity) {
            this.currentOperandTextElement.innerText = "Error - División por 0"
            this.currentOperand = ""
        } else {
            this.currentOperandTextElement.innerText = this.currentOperand
        }
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }
    }

}

const numberButtons = document.querySelectorAll('.data-number')
const operationButtons = document.querySelectorAll('.data-operation')
const equalsButton = document.querySelector('.data-equals')
const deleteButton = document.querySelector('.data-delete')
const allClearButton = document.querySelector('.data-all-clear')
const previousOperandTextElement = document.querySelector('.previous-operand')
const currentOperandTextElement = document.querySelector('.current-operand')
const exitButton = document.querySelector('.exit-app')
const goBackButton = document.querySelector('.go-back')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

// cuando se cliquea el boton de IGUAL esto hace que se llame a la función computeOperation y a actualizar display
equalsButton.addEventListener('click', button => {
    calculator.computeOperation()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clearDisplay()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.deleteNumber()
    calculator.updateDisplay()
})
