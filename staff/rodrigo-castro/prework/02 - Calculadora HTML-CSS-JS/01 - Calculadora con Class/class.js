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
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.computeOperation()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    computeOperation = () => {
        let computation 
        const previousOperandNumber = parseFloat(this.previousOperand) 
        const currentOperandNumber = parseFloat(this.currentOperand) 
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

export {Calculator}