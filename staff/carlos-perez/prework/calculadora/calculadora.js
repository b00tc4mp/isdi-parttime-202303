//Calculadora

//Declaración de la estructura de datos para la entrada de datos
//Se almacena en un array por si, en el futuro, hay una entrada de más de 2 números

let entrada = []; //Array para almacenar los números dados por el usuario
let control; //Variable de control del flujo del programa. Asegurará que se ejecute mientras el usuario quiera
let salida = []; //Array para almacenar los datos de salida, tal y como pide el enunciado

//Funciones de operaciones básicas

function suma(a, b) {
    return a + b;
}

function resta(a, b) {
    return a - b;
}

function multiplicacion(a, b) {
    return a * b;
}

function division(a, b) {
    return a / b;
}

//Función para mostrar un mensaje de error para cundo el usuario no introduzca números
function errorNan() {
    console.log('Error: La entrada no es un número');
    alert('Error: La entrada no es un número');
}

//Función que calcula la suma, resta, multiplicación y división de los números a y b. Devuelve un Array con los resultados en orden.
function resultado(a, b) {
    let resSuma = enteroODecimal(Number(suma(a, b)));
    let resResta = enteroODecimal(Number(resta(a, b)));
    let resMulti = enteroODecimal(Number(multiplicacion(a, b)));
    let resDiv = enteroODecimal(Number(division(a, b)));

    let resultado = [resSuma, resResta, resMulti, resDiv];
    return resultado;
}

//Función para imprimir en la consola y en una alerta el resultado de las operaciones de cada vez
function imprimeResultado(a, b, resultado) {
    console.log('Los resultados de la suma, resta, multiplicación y división de ' + a + ' y ' + b + ' son '
        + resultado[0] + ' , ' + resultado[1] + ' , ' + resultado[2] + ' , ' + resultado[3]);
    alert('Los resultados de la suma, resta, multiplicación y división de ' + a + ' y ' + b + ' son '
        + resultado[0] + ' , ' + resultado[1] + ' , ' + resultado[2] + ' , ' + resultado[3]);
}

//Función para preparar la impresión de los resultados acumulados de una manera más legible
function imprimeResTotales(salida){
    let respuesta = 'Los resultados acumulados son: \n';
    for(let i = 0; i<salida.length; i+=4){
        respuesta+=(salida[i] + ' , ' + salida[i+1] + ' , ' + salida[i+2] + ' , ' + salida[i+3]+ ' \n');
    }
    return respuesta;
}

//Función para imprimir todos los resultados acumulados

function imprimeResAcumulados(salida) {
    let respuesta=imprimeResTotales(salida);
    console.log(respuesta);
    alert(respuesta);
}

//Función para comprobar si un número contiene decimales o no, y adecuarlo

function enteroODecimal(numero){
    if(Number.isInteger(numero)===false){
        return numero.toFixed(3);
    }
    else{
        return numero;
    }
}

//Inicio de programa

//Primero procedemos a pedir al usuario el o los números
do {
    function leeEntrada() {
        const peticion = prompt('Introduce los números separados por coma');
        if (!peticion) {
            return leeEntrada();
        }
        return peticion;
    }

    //Ahora habrá que parsear los datos y comprobar que el usuario ha introducido los datos de forma correcta

    let peticion = leeEntrada();

    if (peticion !== null) { //Primero comprobamos que no esté vacío
        entrada = peticion.split(","); //Parseamos
        if (entrada.length == 1) {
            if (isNaN(entrada[0])) { //Si se introduce un caracter, da error
                errorNan();
            }
            else {
                console.log('La raiz cuadrada de ' + entrada[0] + ' es ' + Math.sqrt(entrada[0]).toFixed(3)); //Raiz cuadrada en consola
                alert('La raiz cuadrada de ' + entrada[0] + ' es ' + Math.sqrt(entrada[0]).toFixed(3));//Raiz cuadrada en alerta
            }
        }
        else {
            if (isNaN(entrada[0]) || isNaN(entrada[1])) { //Comprueba que los dos datos introducidos sean números
                errorNan();
            }
            else { //Cálculo e impresión en la consola de los resultados
                salida.push.apply(salida, resultado(Number(entrada[0]), Number(entrada[1]))); //Añade los resultados al vector de resultados acumulados
                imprimeResultado(Number(entrada[0]), Number(entrada[1]), salida); //Imprime los resultados de esta vez
                imprimeResAcumulados(salida); //Imprime los resultados acumulados;
            }
        }
    }

    //Control de flujo del programa, para que el usuario pueda elegir hacer más operaciones
    control = confirm('¿Desea realizar otra operación?');
}
while (control !== false);