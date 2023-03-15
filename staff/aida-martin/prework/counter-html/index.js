const increment = () => {
  const counterText = document.getElementById('counter-text');
  const incrementValue = parseFloat(counterText.innerHTML) + 1;

  if (incrementValue > 99) {
    counterText.innerHTML = 99;
    return;
  }
  counterText.innerHTML = incrementValue;
};

const decrement = () => {
  const counterText = document.getElementById('counter-text');
  const decrementValue = parseFloat(counterText.innerHTML) - 1;

  if (decrementValue < 0) {
    counterText.innerHTML = 0;
    return;
  }
  counterText.innerHTML = decrementValue;
};

const restart = () => {
  const counterText = document.getElementById('counter-text');
  counterText.innerHTML = '0';
};

document
  .getElementById('button-increment')
  .addEventListener('click', increment);
document
  .getElementById('button-decrement')
  .addEventListener('click', decrement);
document.getElementById('button-restart').addEventListener('click', restart);
