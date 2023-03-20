

let counter = document.querySelector(".counter");
let incrementButton = document.querySelector("#incrementButton");
let decrementButton = document.querySelector("#decrementButton");
let resetButton = document.querySelector("#restartButton");


const incrementCounter = () => {
    let currentValue = counter.textContent = +counter.textContent + 1;
    if (currentValue > 10){
        counter.textContent = 10;
    }
}
const decrementCounter = () => {
    let currentValue = counter.textContent = +counter.textContent - 1;
    if (currentValue < 0 ){
        counter.textContent = 0;
    }
}
const setCounterToZero = () => {
    counter.textContent = 0;
}

incrementButton.setAttribute("onclick", "incrementCounter()");
decrementButton.setAttribute("onclick", "decrementCounter()");
resetButton.setAttribute("onclick","setCounterToZero()");

