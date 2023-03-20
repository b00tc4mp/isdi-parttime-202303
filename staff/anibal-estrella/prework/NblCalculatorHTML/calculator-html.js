alert("cambio de tamaño cuando son mas de nueve digits")

let digit;
let numberScreen;
let counter=0;

const addEventListeners = () => {
  const inputDigitButton = document.querySelectorAll(".button.digit");
  const clearButton = document.querySelector(".button.clear");
  const operatorButton = document.querySelector(".operator");
  const calcScreen = document.querySelector(".number");

  inputDigitButton.forEach( element => element.addEventListener('click', (event) => {
    event.preventDefault(); 
    if (counter === 0) {
clearScreen()    
    } 
      digit = element.innerHTML;
      displayInputDigitToScreen("number",digit)
  }));
  
  
  clearButton.addEventListener("click", (event) => {
    event.preventDefault(); 
    clearScreen();
    displayInputDigitToScreen("number",0);
    counter =0;
  });

  calcScreen.addEventListener("resize", (event) => {
    resizeScreenDigits()
  });
  
};

const createScreenNumber = (digit) =>{
  numberScreen=digit;
}



const displayInputDigitToScreen = (selector, text) => {
  ++counter;
  document.querySelector(`.${selector}`).innerText += text;
};

const resizeScreenDigits = ()=>{
  if (  document.querySelector(`.number`).offsetWidth > 360){
    changeElementStyle('number','font-size',"3.5rem")
  }
}



const changeElementStyle = (elementSelector, property, propertyValue) => {
  const element = document.querySelector(`.${elementSelector}`);
  element.style[property] = propertyValue;
};

const clearScreen = () => {
  document.querySelector(`.number`).innerText = "";
}


addEventListeners();