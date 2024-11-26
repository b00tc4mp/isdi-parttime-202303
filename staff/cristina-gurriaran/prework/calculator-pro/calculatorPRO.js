let numbers = [];
let results = [];
let variousNumbers;

const getNumbers = () => {
  let number = prompt("Please enter a number");

  if (Number.isNaN(+number)) {
    alert('The entered value is not a number');
    getNumbers();
    
    } else if (number === '' || number === null){
        alert('You have not entered any number');
        getNumbers();
    
    } else if (!Number.isNaN(+number)) {
        numbers.push(+number);
    }
    
    variousNumbers = confirm("Do you want to enter another number?");
    if (variousNumbers) {
      getNumbers();
    }    
}

const square = () => {

    let square = Math.sqrt(numbers[0]);
    
    if(numbers[0]<0){
        alert('The square root of a negative number does not exist in the real numbers');

    } else {    

    square = parseFloat(square.toFixed(3))
    alert(`The square of ${numbers[0]} is ${square}`);
    }
}

const addition = () => {
    let additionResult = numbers[0]
    for (let i = 1; i < numbers.length; i++){
        additionResult+= numbers[i]
        additionResult = Number.parseFloat(additionResult.toFixed(3));
        
    }
return results.push(additionResult)
} 

const substraction = () => {
    let substractionResult = numbers[0]
    for (let i = 1; i < numbers.length; i++){
        substractionResult-= numbers[i]
        substractionResult = Number.parseFloat(substractionResult.toFixed(3));
        
    }
return results.push(substractionResult)
} 

const multiplication = () => {
    let multiplicationResult = numbers[0]
    for (let i = 1; i < numbers.length; i++){
        multiplicationResult= multiplicationResult * numbers[i]
        multiplicationResult = Number.parseFloat(multiplicationResult.toFixed(3));
        
    }
return results.push(multiplicationResult)
} 

const divison = () => {
    let divisionResult = numbers[0]
    for (let i = 1; i < numbers.length; i++){
        divisionResult= divisionResult / numbers[i]
        divisionResult = Number.parseFloat(divisionResult.toFixed(3));
    }

    if(numbers.includes(0)){
        divisionResult = 'Division by 0 is not possible';
    }

return results.push(divisionResult);
}

const obtainedResults = () => {
    console.log(
        `The sum result is: ${results[0]} 
        \nThe substraction result is: ${results[1]} 
        \nThe multiplication result is: ${results[2]} 
        \nThe division result is: ${results[3]}`);
}

const newOperation = () => {
    
    let newMaths = confirm('Would you like to do another operation?')   
    if(!newMaths) {
        alert('Thank you for using this calculator. Bye!')
    } else if(newMaths){
        numbers = []
        results = []
        playCalculator();
    }
}

const greeting = () => {
   alert('Hello! Welcome to the calculatorPRO project') 
}


greeting();
const playCalculator = () => {
  
    getNumbers();
 
    if(numbers.length < 2){
        square()
    }

    if (numbers.length >= 2){
        addition();
        substraction();
        multiplication();
        divison();
        obtainedResults ()
    }   

    newOperation()

}

playCalculator ()