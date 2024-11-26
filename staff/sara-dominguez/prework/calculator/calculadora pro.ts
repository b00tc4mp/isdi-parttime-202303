let arrayNumbers =[];

//Funcion preguntar un número
const numbersAsked = () =>{
    let numberAsk = +prompt("Please, enter a number")
    
    if(isNaN(numberAsk)){
        alert("You introduced a wrong answer")
        numbersAsked();
    }
    if(!isNaN(numberAsk)){
    arrayNumbers.push(numberAsk)
    }
    return numberAsk;
};


//Funcion para pregunar el segundo número
const numbersAdded = () =>{
    let numberAdd = +prompt("Please, add a number")

    if(isNaN(numberAdd)){
        alert("You introduced a wrong answer")
        numbersAdded();
    }
    if(!isNaN(numberAdd)){
        arrayNumbers.push(numberAdd)
    }
    
    return numberAdd;
};

//Funcion para preguntar si quieres seguir añadiendo números a los dos anteriores.
const continueAddingNumbers = () =>{
    let continueAddingNumber = +prompt("Do you want to add another number? Please 1 for YES or 2 for No")
    if(!continueAddingNumber){
        alert("You did not enter any value")
        continueAddingNumbers();
    }
    if(continueAddingNumber === 1){
        numberAdded();
        console.log(arrayNumbers)
        continueAddingNumbers();
    }
    console.log(arrayNumbers)
    return continueAddingNumber;
}

//Funciones Varias

// Raiz cuadrada
const squareRootNumbers = () =>{
    let squareRootNumber;
    if(arrayNumbers[0] === 0){
        let SquareRootNumber = (Math.sqrt(arrayNumbers[1]).toFixed(3));// Raíz cuadrada
        alert(`The square root of ${arrayNumbers[1]} is ${SquareRootNumber}`);   
    }
return squareRootNumber;
};

const squareRootAddNumbers = () =>{
    let squareRootAddNumber=[]
    if(arrayNumbers[1] === 0){
        let squareRootAddNumber = (Math.sqrt(arrayNumbers[0]).toFixed(3)); // Raiz cuadrada
        alert(`The square root of ${arrayNumbers[0]} is ${squareRootAddNumber}`);
    }      
return squareRootAddNumber;
};


// Función suma
const addition = () => {
    totalAddition = arrayNumbers[0];
        for(let i = 1; i < arrayNumbers.length; i++){
            totalAddition += arrayNumbers[i]
        }
    return totalAddition.toFixed(3)
}

// Funcion resta 

const substration = () => {
    totalSubstration = arrayNumbers[0];
        for(let i = 1; i < arrayNumbers.length; i++){
            totalSubstration -= arrayNumbers[i]
        }
    return totalSubstration.toFixed(3)
}

const multiplication = () => {
    totalMultiplication = arrayNumbers[0];
        for(let i = 1; i < arrayNumbers.length; i++){
            totalMultiplication *= arrayNumbers[i]
        }
    return totalMultiplication.toFixed(3)
}

// Función división

const division = () => {
    totalDivision = arrayNumbers[0];
        for(let i = 1; i <  arrayNumbers.length; i++){
            totalDivision /= arrayNumbers[i]
        }
    return totalDivision.toFixed(3)
}

// FUNCION CALCULADORA

const OperationsResults = () =>{
    operationsResult = []
    operationsResult[0] = addition(arrayNumbers);
    operationsResult[1] = substration(arrayNumbers);
    operationsResult[2] = multiplication(arrayNumbers)
    operationsResult[3] = division(arrayNumbers)

    if(arrayNumbers[0] !== 0 && arrayNumbers[1] !== 0){
        alert(`The  total addition  is ${addition(arrayNumbers)}, total substration  is ${substration(arrayNumbers)}, the  total multiplication  is ${multiplication(arrayNumbers)}, the  total division  is ${division(arrayNumbers)}`);
    };
    return operationsResult;
    
}
// Funcion de bienvenida
const welcomeUser = () =>{
    alert("Welcome to ISDI PRO Calculator!")
};

// Función despedida
const goodbyeUser = () =>{
const goodbye = +prompt("Do you to continue calculating opeations? Please, enter 0 for YES or 1 for NO")
    if(goodbye === 0){
        calculator();
    }else{
        alert("We hope you enjoyed! See you soon!")
    }
};
    



//Funcion Maestra
 const calculator = () =>{
    welcomeUser();
    numbersAsked();
    numbersAdded();
    continueAddingNumbers();
    squareRootNumbers();
    squareRootAddNumbers();
    OperationsResults();
    goodbyeUser();
    
};

calculator();


