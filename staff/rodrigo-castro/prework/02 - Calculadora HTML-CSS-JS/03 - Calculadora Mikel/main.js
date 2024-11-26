
const emptyMessage = 'Click on "-" for substract, on "+" for add, <br> or "restart" to set counter on 0.'
let numbers = []
let screenNumbers = []
let history = []
let result
let cache = []
let currentValue
let tmp = [[], []]
let dotStatus = false
let isFirstOperation = true;
let previousOperator = ''

window.onload = () => {
const addNumber = document.querySelector('.number')
const restartNumber = document.querySelector('.restart')
const message = document.querySelector('.message')
let currentValue = 'number'


  // substractNumber.onclick = () => {
  //   const messageIfNumberIsLess = 'You cannot sustract <br>if currrent number is 0'
  //   if (number === 0) {
  //     message.innerHTML = messageIfNumberIsLess;
  //   }
  //   if (number > 0) {
  //     message.innerHTML = emptyMessage;
  //     number --
  //     numberFrontEnd.innerHTML = number;
  //   }
  // }

  restartNumber.onclick = () => {
    let numberFrontEnd = document.querySelector('.first-value')

    numbers = []
    screenNumbers = []
    numberFrontEnd.innerHTML = numbers;
    console.log('screenNumbers', screenNumbers)

  }

}


const addValue = (number) => {
  let numberFrontEnd = document.querySelector('.first-value')
  const historyFrontEnd = document.querySelector('.history')
  
  if (number === '.' && numbers.includes('.')) return // para que no entre el . si ya lo hay
  screenNumbers.push(number) // YO los convertiría a número justo antes de realizar la operación, no ahora. Entonces lo conservas como STRING y puedes agregar el punto decimal con esta misma función!!
  numbers.push(number)
  console.log(screenNumbers)
  console.log(numbers)
  // console.log('screenNumbers', screenNumbers)
     // numbers = Number(number)

  numberFrontEnd.innerHTML = screenNumbers.join('')
  currentValue = 'number'
  // -> ojo, no quieres mostrar los números en el display superior sino hasta que se seleccione un botón de operador!
  history.push(number) 
  // historyFrontEnd.innerHTML = history.join('')
}



const addOperator = (operator) => {

  const historyFrontEnd = document.querySelector('.history')

//   if (currentValue === 'operator') {
//     // screenNumbers.pop()
//   history.pop()
//   currentValue = 'number'
// }
  if (previousOperator === '') {

    if (currentValue === 'number' && operator === '+') {
    
       if (historyFrontEnd.innerHTML !== "START") {
         history.push('+')
         historyFrontEnd.innerHTML = history.join('')
         document.querySelector('.first-value').innerText = "";
       } 
  
      // if (!isFirstOperation) {
      //   history.pop();
      //   history = (parseFloat(history.join("")) + parseFloat(numbers.join(""))).toString().split("");
      //   history.push('+')
      //   historyFrontEnd.innerHTML = history.join('')
      //   document.querySelector('.first-value').innerText = ""
      // }
      
      screenNumbers = [];
      numbers = [];
      currentValue = 'operator'
      console.log("history: " + history)
      isFirstOperation = false // se deberia reinicializar al darle al AC o =
      previousOperator = operator
  
    }

    if (currentValue === 'number' && operator === '-') {
    
       if (historyFrontEnd.innerHTML !== "START") {
         history.push('-')
         historyFrontEnd.innerHTML = history.join('')
         document.querySelector('.first-value').innerText = "";
       } 
  
      // if (!isFirstOperation) {
      //   history.pop();
      //   history = (parseFloat(history.join("")) - parseFloat(numbers.join(""))).toString().split("");
      //   history.push('-')
      //   historyFrontEnd.innerHTML = history.join('')
      //   document.querySelector('.first-value').innerText = ""
      // }
      
      screenNumbers = [];
      numbers = [];
      currentValue = 'operator'
      console.log("numbers: " + numbers)
      isFirstOperation = false // se deberia reinicializar al darle al AC o =
      previousOperator = operator
  
    }
}

  if (currentValue === 'number' && previousOperator === '+') {
    
    // if (historyFrontEnd.innerHTML !== "START") {
    //   history.push('+')
    //   console.log("******************")
    //   historyFrontEnd.innerHTML = history.join('')
    //   document.querySelector('.first-value').innerText = "";
    // } 

    if (!isFirstOperation) {
      history.pop();
      history = (parseFloat(history.join("")) + parseFloat(numbers.join(""))).toString().split("");
      history.push(operator.toString())
      historyFrontEnd.innerHTML = history.join('')
      document.querySelector('.first-value').innerText = ""
    }
    
    screenNumbers = [];
    numbers = [];
    currentValue = 'operator'
    console.log("history: " + history)
    isFirstOperation = false // se deberia reinicializar al darle al AC o =
    previousOperator = operator

      if (false) {    tmp[0] = numbers
          tmp[1] = cache
          // console.log('numbers', numbers)
          console.log('tmp', tmp)
          const sumOperation = (...numbers) => {
            let result = numbers.reduce((a, b) => a + b);
            return Math.round( result * 1000 + Number.EPSILON ) / 1000    
        }
          result = sumOperation(...tmp)
          cache = Number(result)
          screenNumbers = [Number(result)]
          console.log('Number(result)', Number(result))
          currentValue = 'operator'
          numbers = []
          result = []}
  }


  if (currentValue === 'number' && previousOperator === '-') {
    
    // if (historyFrontEnd.innerHTML !== "START") {
    //   history.push('-')
    //   historyFrontEnd.innerHTML = history.join('')
    //   document.querySelector('.first-value').innerText = "";
    // } 

    if (!isFirstOperation) {
      history.pop();
      history = (parseFloat(history.join("")) - parseFloat(numbers.join(""))).toString().split("");
      history.push(operator.toString())
      historyFrontEnd.innerHTML = history.join('')
      document.querySelector('.first-value').innerText = ""
    }
    
    screenNumbers = [];
    numbers = [];
    currentValue = 'operator'
    console.log("numbers: " + numbers)
    isFirstOperation = false // se deberia reinicializar al darle al AC o =
    previousOperator = operator

      if (false) {    tmp[0] = numbers
          tmp[1] = cache
          // console.log('numbers', numbers)
          console.log('tmp', tmp)
          const sumOperation = (...numbers) => {
            let result = numbers.reduce((a, b) => a + b);
            return Math.round( result * 1000 + Number.EPSILON ) / 1000    
        }
          result = sumOperation(...tmp)
          cache = Number(result)
          screenNumbers = [Number(result)]
          console.log('Number(result)', Number(result))
          currentValue = 'operator'
          numbers = []
          result = []}
  }


  if (false) {
    if (currentValue === 'number' && operator === '-') {
      history.push('-')
      historyFrontEnd.innerHTML = history.join('')
      tmp[0] = numbers
      tmp[1] = cache
      console.log('tmp', tmp)
      const substractOperation = (...numbers) => {
        let result = numbers.reduce((a, b) => a - b);
        return Math.round( result * 1000 + Number.EPSILON ) / 1000    
    }
      result = substractOperation(...tmp)
      cache = Number(result)
      screenNumbers = [Number(result)]
      console.log('Number(result)', Number(result))
      currentValue = 'operator'
      numbers = []
      result = []
    }
  }

  if (currentValue === 'number' && operator === '*') {
    
    if (historyFrontEnd.innerHTML !== "START") {
      console.log("history: " + history)
      console.log("numbers: " + numbers)
      history.push('*')
      historyFrontEnd.innerHTML = history.join('')
      document.querySelector('.first-value').innerText = "";
      console.log("history: " + history)
      console.log("numbers: " + numbers)
    } 

    if (!isFirstOperation) {
      console.log("history: " + history)
      console.log("numbers: " + numbers)
      history.pop();
      history = (parseFloat(numbers.join("")) * parseFloat(history.join(""))).toString().split("");
      history.push('*')
      historyFrontEnd.innerHTML = history.join('')
      document.querySelector('.first-value').innerText = ""
      console.log("history: " + history)
      console.log("numbers: " + numbers)
    }
    
    screenNumbers = [];
    numbers = [];
    currentValue = 'operator'
    console.log("numbers: " + numbers)
    isFirstOperation = false // se deberia reinicializar al darle al AC o =
      if (false) {    tmp[0] = numbers
          tmp[1] = cache
          // console.log('numbers', numbers)
          console.log('tmp', tmp)
          const sumOperation = (...numbers) => {
            let result = numbers.reduce((a, b) => a + b);
            return Math.round( result * 1000 + Number.EPSILON ) / 1000    
        }
          result = sumOperation(...tmp)
          cache = Number(result)
          screenNumbers = [Number(result)]
          console.log('Number(result)', Number(result))
          currentValue = 'operator'
          numbers = []
          result = []}
  }

  
if (false){  if (currentValue === 'number' && operator === '*') {
    history.push('*')
    historyFrontEnd.innerHTML = history.join('')
    tmp[0] = numbers
    tmp[1] = cache
    console.log('tmp', tmp)
    const multiplyOperation = (...numbers) => {
      let result = numbers.reduce((a, b) => a * b);
      return Math.round( result * 1000 + Number.EPSILON ) / 1000    
  }
    result = multiplyOperation(...tmp)
    cache = Number(result)
    screenNumbers = [Number(result)]
    console.log('Number(result)', Number(result))
    currentValue = 'operator'
    numbers = []
    result = []
  }}


  if (currentValue === 'number' && operator === '/') {
    history.push('/')
    historyFrontEnd.innerHTML = history.join('')
    tmp[0] = numbers
    tmp[1] = cache
    console.log('tmp', tmp)
    const divisionOperation = (...numbers) => {
      let result = numbers.reduce((a, b) => a / b);
      return Math.round( result * 1000 + Number.EPSILON ) / 1000    
  }
    result = divisionOperation(...tmp)
    cache = Number(result)
    screenNumbers = [Number(result)]
    console.log('Number(result)', Number(result))
    currentValue = 'operator'
    numbers = []
    result = []
  }
  if (currentValue === 'number') {
  let numberFrontEnd = document.querySelector('.first-value')

  // screenNumbers.push(operator)
    // console.log('screenNumbers', screenNumbers)

    numberFrontEnd.innerHTML = screenNumbers.join('')
    screenNumbers = []
  }
}

const getResult = () => {
  let numberFrontEnd = document.querySelector('.first-value')

    console.log('screenNumbers', screenNumbers)
    
    // result = screenNumbers.join('')
    console.log('result', result)
    numberFrontEnd.innerHTML = result
}