'use strict'

const createFirstNumber = (screenNumber,screenNumbersButton, completeScreenNumber) => {
    let numberButtons = document.querySelectorAll(".numberButton");
    numberButtons.forEach((numberButton) => {
        numberButton.addEventListener("click",function(){
            screenNumber.push(numberButton.textContent);
            setNumberOnScreen(screenNumber,screenNumbersButton,completeScreenNumber);
        })
    })
}

const setNumberOnScreen = (screenNumber,screenNumbersButton,completeScreenNumber) => {
    completeScreenNumber = screenNumber.join("");
    screenNumbersButton.textContent = completeScreenNumber;
}

const UseACButton = (screenNumber,screenNumbersButton,clearButton,secondScreenNumbersDisplay,currentOperationSign,
                    previousResultSignDisplay) => {
    clearButton.addEventListener("click",() =>{
        screenNumber.splice(0,screenNumber.length);
        screenNumbersButton.textContent = 0;
        secondScreenNumbersDisplay.textContent = 0;
        currentOperationSign = "";
        previousResultSignDisplay.textContent = "";
    })
}

const addDot = (screenNumber) => {
    const dotButton = document.querySelector(".dotButton");
    dotButton.addEventListener("click", () => {
        if (screenNumber.includes(".") || screenNumber.length === 0 ){
            return;
        }
        screenNumber.push(dotButton.textContent);
    })
}

const setOperationsEvents = (squareRootButton, divideButton, multiplyButton, addButton, substractButton,
                            currentOperationSign,screenNumbersButton,secondScreenNumbersDisplay,screenNumber,
                            previousResultDisplaySign,equalButton) => {
    
    divideButton.addEventListener("click", () => {
        getOperationSign(divideButton,currentOperationSign,previousResultDisplaySign);
        moveScreenNumberToSecondScreenNumber(screenNumbersButton,secondScreenNumbersDisplay);
        clearScreenNumbersButton(screenNumbersButton,screenNumber);
    })
    multiplyButton.addEventListener("click", () => {
        getOperationSign(multiplyButton,currentOperationSign,previousResultDisplaySign);
        moveScreenNumberToSecondScreenNumber(screenNumbersButton,secondScreenNumbersDisplay);
        clearScreenNumbersButton(screenNumbersButton,screenNumber);
    })
    addButton.addEventListener("click", () => {
        getOperationSign(addButton,currentOperationSign,previousResultDisplaySign);
        moveScreenNumberToSecondScreenNumber(screenNumbersButton,secondScreenNumbersDisplay);
        clearScreenNumbersButton(screenNumbersButton,screenNumber);
    })
    substractButton.addEventListener("click", () => {
        getOperationSign(substractButton,currentOperationSign,previousResultDisplaySign);
        moveScreenNumberToSecondScreenNumber(screenNumbersButton,secondScreenNumbersDisplay);
        clearScreenNumbersButton(screenNumbersButton,screenNumber);
    })
    squareRootButton.addEventListener("click", () => {
        getOperationSign(squareRootButton,currentOperationSign,previousResultDisplaySign);
        moveScreenNumberToSecondScreenNumber(screenNumbersButton,secondScreenNumbersDisplay);
        clearScreenNumbersButton(screenNumbersButton,screenNumber);
    })
    equalButton.addEventListener("click", () => {
        doOperation(screenNumbersButton,secondScreenNumbersDisplay,previousResultDisplaySign);
    })
}

const getOperationSign = (operation,currentOperationSign,previousResultDisplaySign) => {
    currentOperationSign = operation.textContent
    previousResultDisplaySign.textContent = currentOperationSign;

}

const moveScreenNumberToSecondScreenNumber = (screenNumbersButton,secondScreenNumbersDisplay) => {
    secondScreenNumbersDisplay.textContent = screenNumbersButton.textContent;
}

const clearScreenNumbersButton = (screenNumbersButton,screenNumber) => {
    screenNumber.splice(0,screenNumber.length);
    screenNumbersButton.textContent = 0;
}

const doOperation = (screenNumbersButton,secondScreenNumbersDisplay,previousResultDisplaySign) => {

    if (previousResultDisplaySign.textContent === "/"){
        let resultNumber = parseFloat(secondScreenNumbersDisplay.textContent) / parseFloat(screenNumbersButton.textContent);
        if (!Number.isInteger(resultNumber)){
            resultNumber = resultNumber.toFixed(2);
        }
        if (screenNumbersButton.textContent === "0"){
            resultNumber = "Error";
        }
        screenNumbersButton.textContent = resultNumber;
        secondScreenNumbersDisplay.textContent = "";
        previousResultDisplaySign.textContent = "";
    }
    if (previousResultDisplaySign.textContent === "+"){
        let resultNumber = parseFloat(secondScreenNumbersDisplay.textContent) + parseFloat(screenNumbersButton.textContent);
        if (!Number.isInteger(resultNumber)){
            resultNumber = resultNumber.toFixed(2);
        }
        screenNumbersButton.textContent = resultNumber;
        secondScreenNumbersDisplay.textContent = "";
        previousResultDisplaySign.textContent = "";
    }
    if (previousResultDisplaySign.textContent === "-"){
        let resultNumber = parseFloat(secondScreenNumbersDisplay.textContent) - parseFloat(screenNumbersButton.textContent);
        if (!Number.isInteger(resultNumber)){
            resultNumber = resultNumber.toFixed(2);
        }
        screenNumbersButton.textContent = resultNumber;
        secondScreenNumbersDisplay.textContent = "";
        previousResultDisplaySign.textContent = "";
    }
    if(previousResultDisplaySign.textContent === "*") {
        let resultNumber = parseFloat(secondScreenNumbersDisplay.textContent) * parseFloat(screenNumbersButton.textContent);
        screenNumbersButton.textContent = resultNumber;
        secondScreenNumbersDisplay.textContent = "";
        previousResultDisplaySign.textContent = "";
    }
    if (previousResultDisplaySign.textContent === "√"){
        let resultNumber = parseFloat(secondScreenNumbersDisplay.textContent)
        
        if (!Number.isInteger(resultNumber)){
            resultNumber = resultNumber.toFixed(2);
        }
        resultNumber = Math.sqrt(resultNumber);
        if (!Number.isInteger(resultNumber)){
            resultNumber = resultNumber.toFixed(2);
        }
        screenNumbersButton.textContent = resultNumber;
        secondScreenNumbersDisplay.textContent = "";
        previousResultDisplaySign.textContent = "";
    }
}

const playCalculator = () => {
    const squareRootButton = document.querySelector(".squareRootButton");
    const divideButton = document.querySelector(".divideButton");
    const multiplyButton = document.querySelector(".multiplyButton");
    const addButton = document.querySelector(".addButton");
    const substractButton = document.querySelector(".substractButton");
    const clearButton = document.querySelector(".resetButton");

    const equalButton = document.querySelector(".equalButton");

    const screenNumbersButton = document.querySelector(".results p");
    const secondScreenNumbersDisplay = document.querySelector(".previousResult p");
    const previousResultDisplaySign = document.querySelector(".previousResultSign")

    const screenNumber = [];
    const completeScreenNumber = "";

    let currentOperationSign = "";

    createFirstNumber(screenNumber,screenNumbersButton,completeScreenNumber);
    setOperationsEvents(squareRootButton, divideButton, multiplyButton, addButton, substractButton,
                        currentOperationSign,screenNumbersButton,secondScreenNumbersDisplay,screenNumber,
                        previousResultDisplaySign,equalButton);
    UseACButton(screenNumber,screenNumbersButton,clearButton,secondScreenNumbersDisplay,currentOperationSign,
                previousResultDisplaySign);
    addDot(screenNumber);
}

playCalculator();

