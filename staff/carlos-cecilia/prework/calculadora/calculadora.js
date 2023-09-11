const sum = (...numbers) => {
    let total = 0;

    for (const numbersList of numbers) {
      total += numbersList;
    }
    return total;
};


const minus = (...numbers) => {
    let total = numbers[0];

    for (let i=1; i < numbers.length; i++) {
      total -= numbers[i];
    }
    return total;
  };

  const division = (...numbers) => {
    let total = numbers[0];

    for (let i=1; i < numbers.length; i++) {
      total /= numbers[i];
    }
    return total;
  };

const multiply = (...numbers) => {
    let total = 1;

    for (const numbersList of numbers) {
      total *= numbersList;
    }
    return total;
  };

  //function calculator(...numbers) { return [sum(...numbers), minus(...numbers), multiply(...numbers), division(...numbers)]}

let number1 = 0;
let number2 = 0;
let calculation = [];
let addCalculator;
let result = [];
do {
    let number1 = prompt("Por favor, indica el primer número", 1);
    let number2 = prompt("Por favor, indica el segundo número", 2);
    if(number1 === '') {
        number1 = null;
        } else {
        number1 = +number1;
        }
        if(number2 === '') {
        number2 = null;
        } else {
        number2 = +number2;
        }
        if (isNaN(number1) || isNaN(number2)) {
            console.log('Please fill in valid numbers');
          }
    
          if (isNaN(number2) || isNaN(number1)) {
            console.log('Please fill in a valid number');
        } else if(number1 === null && number2 === null) {
            console.log('Ingresa por lo menos un número');
        
        } else if(number2 === null){
        
            let result = Math.sqrt(number1);
            console.log('La raiz de ' + number1 +  ' es ' + result);
        } else if (number1 === null){
            let result = Math.sqrt(number2);
            console.log('La raiz de ' + number2 +  ' es ' + result);
        } else {
            let result =[
                number1 + ' + ' + number2 + ' = ' + sum(number1, number2).toFixed(3), 
                number1 + ' - ' + number2 + ' = ' + minus(number1, number2).toFixed(3), 
                number1 + ' x ' + number2 + ' = ' + multiply(number1, number2).toFixed(3), 
                number1 + ' / ' + number2 + ' = ' + division(number1, number2).toFixed(3)]
            console.log(result);
        }
    
    calculation.push(result);
    addCalculator = prompt('Quieres hacer otra multiplicación?')
} while (addCalculator === 'si');
console.log(calculation);

if (addCalculator != 'no') {alert('Respuesta incorrecta!')} else {alert('Gracias por usar calculadoraPro')}

