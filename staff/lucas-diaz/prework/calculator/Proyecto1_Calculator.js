'use strict'

let numbers = [];
let numbersCuantity;
const results = new Array(4); 


const askNumbers = () => {
    numbersCuantity = +prompt("En esta calculadora, ¿cuantos valores vas a introducir?",1);
    
    for (let i = 0; i < numbersCuantity; i++){
        let pushedNumber = +prompt("Introduzca un número");
        while (Number.isNaN(pushedNumber)){
            pushedNumber = +prompt("El valor introducido no es un numero, vuelve a ingresar un numero por favor");
        }
        numbers.push(pushedNumber);
    }
    console.log(numbers);
}
//Las operaciones, parseadas y fixeadas a decimales como max 3 decimales. 
const addNumbers = numbers => +numbers.reduce((accumulator,currentValue) => accumulator + currentValue).toFixed(3);
const substractNumbers = numbers => +numbers.reduce((accumulator,currentValue) => accumulator - currentValue).toFixed(3);
const multiplyNumbers = numbers => +numbers.reduce((accumulator,currentValue) => accumulator * currentValue).toFixed(3);
const divideNumbers = numbers => +numbers.reduce((accumulator,currentValue) => accumulator / currentValue).toFixed(3);
const doSquareRoot = numbers =>  +Math.sqrt(numbers[0]).toFixed(3);

const showOperations = () => {
    let results = ["Suma: " + addNumbers(numbers), "Resta: " + substractNumbers(numbers),"Multiplicación: " + multiplyNumbers(numbers),"División: " + divideNumbers(numbers)];
    if (numbersCuantity === 1){
        console.log("Raiz: " + doSquareRoot(numbers));
    } else {
        results.forEach(element => console.log(element));
    }
};
const repeatOperation = () => {
    let answer = prompt("quieres realizar una nueva operación?? (y/n)");
    switch (answer){
        case "y":
            numbers.splice(0,numbers.length); // reseteamos el arr numbers para volver a iniciarlo, si lo borramos iremos haciendo un acumulativo del arr numbers en cada ronda
            console.log(numbers);
            calculator();
            break;
        case "n":
            alert("Hasta luego!");
            break;
        default:
            alert("Estas ingresando otro valor que no es 'y' o 'n', por favor introduce un valor correcto.");
            repeatOperation();
            break;
    }
}


const calculator = () => {
    askNumbers();
    showOperations();
    repeatOperation(); 
}
calculator();



