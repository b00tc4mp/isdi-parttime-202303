const userNumbers = [];

const askWantMoreNumbers = () => {
    answer = prompt("Quieres introducir otro numero? Si/No");

    switch (answer.toLowerCase()) {      
    case "si":
        askNumbers();
    case "no":
        break;
    default:
        alert("Responde Si/No");
        askWantMoreNumbers ();
    };
};

const askNumbers = () => {
    const receivedNumber = +prompt("Por favor, introduce un número");
    
    if (Number.isNaN(receivedNumber)) {
        alert("Ese valor no es un número, por favor utiliza únicamente números");
        askNumbers();
    };
    
    userNumbers.push(receivedNumber);
    askWantMoreNumbers();
};


const sum = () => {
    let total = 0;
    for (const number of userNumbers) {
        total += number;
    };
    console.log("La suma de los numeros que has proporcionado es: " + total);
    return total;
};


const minus = () => {
    let total = 0;
    for (const number of userNumbers) {
        total -= number;
    }
    console.log("La resta de los numeros que has proporcionado es: " + total);
    return total;
};


const multiplication = () => {
    let total = 1;
    for (const number of userNumbers) {
        total *= number;
    };
    console.log("La multiplicacion de los numeros que has proporcionado es: " + total);
    return total;
};


const division = () => {
    let total = 0;
    for (const number of userNumbers) {
        total /= number;
    };
    console.log("La division de los numeros que has proporcionado es: " + total);
    return total;
};


const askNewOperation = () => {

    let answer = prompt("Quieres volver a realizar otra operación? Si/No");
    
    switch (answer.toLowerCase()) {
        case "si":
            userNumbers.length = 0;
            calculatorPro();
        case "no":
            alert("Bye!")
            break;
        default:
            alert("Responde Si o No");
            askNewOperation();
    };
};

const calculatorPro = () => {
    alert('Bienvenido a la CalculadoraPro!');
    askNumbers();
    console.log("Los numeros que has introducido son: " + userNumbers);

    if (userNumbers.length === 1){
        console.log("La raiz cuadrada del único número que has proporcionado es: " + Math.sqrt(userNumbers[0]));
    };
    
    if (userNumbers.length > 1){
        sum();
        minus();
        multiplication();
        division();
    };
    askNewOperation();
};

calculatorPro();