
const emptyMessage = 'Click on "-" for substract, on "+" for add, <br> or "restart" to set counter on 0.'
let numbers = []
let screenNumbers = []
let screenNumbersAfterOperator = []
let result
let cache = []
let currentValue
let tmp = [[], []]

window.onload = () => {
  const substractNumber = document.querySelector('.minus')
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
    let numberFrontEnd = document.querySelector('.screen')

    numbers = []
    screenNumbers = []
    numberFrontEnd.innerHTML = numbers;
    console.log('screenNumbers', screenNumbers)

  }

}


const addValue = (number) => {
  let numberFrontEnd = document.querySelector('.screen')

    screenNumbers.push(Number(number))
    // console.log('screenNumbers', screenNumbers)

    numbers = Number(number)
    numberFrontEnd.innerHTML = screenNumbers.join('')
    currentValue = 'number'
}

const addOperator = (operator) => {
  // hacer un array iterado dentro de una variable...?
// hacer uno otres elementos q almacenen datos...?
// hacer q cada vez q haces un sum, se almacene el dato, y siga con una nueva operacion pero en pantalla siga el historial?

// con el punto, hacer que haga un pop() del ultimo numero, para devolverlo pusheado con un . por delante
// para esto hay q hacer un controlador que devuelva un valor booleano para poder ponerlo una vez solamente

// par la pantalla y el tamaño. atraves de .length añadir una clase del rollo small || medium || big


if (currentValue === 'operator') {
  screenNumbers.pop()
}
  if (operator === '+') {
    tmp[0] = numbers
    tmp[1] = cache
    // console.log('numbers', numbers)
    // console.log('cache', cache)
    console.log('tmp', tmp)
    const sumOperation = (...numbers) => {
      let result = numbers.reduce((a, b) => a + b);
      return Math.round( result * 1000 + Number.EPSILON ) / 1000    
  }
  

    result = sumOperation(...tmp)
    cache = Number(result)
    // console.log('numbers', numbers)
    console.log('Number(result)', Number(result))
    currentValue = 'operator'
    numbers = []
    result = []
  }
  if (operator === '-') {
    numbers = Number(screenNumbers.join(''))
    cache = Number(numbers)
    console.log(numbers)
    result = Number(numbers - cache)
    console.log(result)
    
  }
  if (operator === '*') {
    numbers = Number(screenNumbers.join(''))
    cache = Number(numbers)
    console.log(numbers)
    result = numbers * cache
    console.log(result)
  }
  if (operator === '/') {
    numbers = Number(screenNumbers.join(''))
    cache = Number(numbers)
    console.log(numbers)
    result = numbers / cache
    console.log(result)
  }
  
  let numberFrontEnd = document.querySelector('.screen')

  // screenNumbers.push(operator)
    // console.log('screenNumbers', screenNumbers)

    numberFrontEnd.innerHTML = screenNumbers.join('')
    screenNumbers = []
}

const getResult = () => {
  let numberFrontEnd = document.querySelector('.screen')

    console.log('screenNumbers', screenNumbers)
    
    // result = screenNumbers.join('')
    console.log('result', result)
    numberFrontEnd.innerHTML = result
}