let initialNumber = 0;
let numberCounter = document.getElementById('number');
numberCounter.textContent = initialNumber;

const toAdd = ()=> {
  if (initialNumber === 50) return addElement();
  initialNumber++;
  numberCounter.textContent = initialNumber;
}
const toSubstract = ()=> {
  if (initialNumber === 0) return addElement();
  initialNumber--;
  numberCounter.textContent = initialNumber;
}
const toRestart = ()=> {
  initialNumber = 0;
  numberCounter.textContent = initialNumber;
}

let increment = document.getElementById('increment')
let decrement = document.getElementById('decrement')
let restart = document.getElementById('restart')

increment.addEventListener('click', toAdd)
decrement.addEventListener('click', toSubstract)
restart.addEventListener('click', toRestart)

const addElement = ()=> {
  let newId = document.createElement('div');
  newId.classList.add('warning')
  if (initialNumber === 0) {
    newId.textContent = "You can't decrease the counter number below zero."
  }
  if (initialNumber === 50) {
    newId.textContent = "You can't increment the counter number above fifty."
  }
  let body = document.querySelector('body')
  body.appendChild(newId)
  setTimeout(()=> {
    body.removeChild(newId)
  }, 2000)
}