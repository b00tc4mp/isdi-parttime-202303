window.onload = () => {
  const substractNumber = document.querySelector('.minus')
  const addNumber = document.querySelector('.plus')
  const restartNumber = document.querySelector('.restart')
  const message = document.querySelector('.message')
  let numberFrontEnd = document.querySelector('.number')
  const emptyMessage = 'Click on "-" for substract, on "+" for add, <br> or "restart" to set counter on 0.'
  let number = 0

  substractNumber.onclick = () => {
    const messageIfNumberIsLess = 'You cannot sustract <br>if currrent number is 0'
    if (number === 0) {
      message.innerHTML = messageIfNumberIsLess;
    }
    if (number > 0) {
      message.innerHTML = emptyMessage;
      number --
      numberFrontEnd.innerHTML = number;
    }
  }

  addNumber.onclick = () => {
    const messageIfNumberIsTooHigh = 'You cannot sum <br>if current number is 9'
    if (number === 9) {
      message.innerHTML = messageIfNumberIsTooHigh;
    }
    if (number < 9) {
      message.innerHTML = emptyMessage;
      number ++
      numberFrontEnd.innerHTML = number;
    }
  }

  restartNumber.onclick = () => {
    number = 0
    numberFrontEnd.innerHTML = number;
  }

}