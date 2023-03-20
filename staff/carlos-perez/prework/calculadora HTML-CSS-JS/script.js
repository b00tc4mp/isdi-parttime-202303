let register = '';

const toScreen = (value) => {
    document.getElementById("screen").textContent += value;
}


const clearScreen = () => {
    document.getElementById("screen").textContent = "";
    document.getElementById("previous").textContent = "";
}

const signChange = () => {
    let expresion = document.getElementById("screen").textContent;
    let result = calculator(tokenize(expresion));
    result=isDecimal(result);
    result = result * (-1);
    document.getElementById("screen").textContent = result;
}

const percentage = () => {
    let expresion = document.getElementById("screen").textContent;
    let result = calculator(tokenize(expresion));
    result=isDecimal(result);
    result = result / 100;
    document.getElementById("screen").textContent = result;
}

const useRegister = () => {
    if (register !== '') {
        toScreen(register);
    }
}

const addToRegister = () => {
    register = document.getElementById("screen").textContent;
}

const deleteRegister = () => {
    register = '';
}

const generateRandom = () => {
    let randomNumber = Math.random();
    toScreen(randomNumber.toFixed(6).toString());
}


function tokenize(s) {
    const r = [];
    let token = '';
    for (const character of s) {
        if ('^*/+-'.includes(character)) {
            if (token === '' && character === '-') {
                token = '-';
            } else {
                r.push(parseFloat(token), character);
                token = '';
            }
        } else {
            token += character;
        }
    }
    if (token !== '') {
        r.push(parseFloat(token));
    }
    return r;
}

function calculator(tokens) {
    const operatorPrecedence = [{'^': (a, b) => Math.pow(a, b)},
               {'*': (a, b) => a * b, '/': (a, b) => a / b},
               {'+': (a, b) => a + b, '-': (a, b) => a - b}];
    let operator;
    for (const operators of operatorPrecedence) {
        const newTokens = [];
        for (const token of tokens) {
            if (token in operators) {
                operator = operators[token];
            } else if (operator) {
                newTokens[newTokens.length - 1] = 
                    operator(newTokens[newTokens.length - 1], token);
                operator = null;
            } else {
                newTokens.push(token);
            }
        }
        tokens = newTokens;
    }
    if (tokens.length > 1) {
        console.log('Error: No puede resolverse la operación');
        return tokens;
    } else {
        return tokens[0];
    }
}

const isDecimal = (number) =>{
    if(Number.isInteger(number)===false){
        return number.toFixed(6);
    }
    else{
        return number;
    }
}

const calculate = () => {
    let expresion = document.getElementById("screen").textContent;
    document.getElementById("previous").textContent = expresion;
    let result = calculator(tokenize(expresion));
    result=isDecimal(result);
    if (isNaN(result)) {
        clearScreen();
        alert('Error. Operación incorrecta');
    }
    else if(result === "Infinity"){
        clearScreen();
        alert('No se puede dividir por 0. Indeterminación');
    }
    else {
        document.getElementById("screen").textContent = result;
        if(expresion.length>15){
            document.getElementById("previous").textContent="";
        }
    }
}