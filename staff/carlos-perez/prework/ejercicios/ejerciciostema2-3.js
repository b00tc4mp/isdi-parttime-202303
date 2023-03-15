//Numbers

//Ejercicio 1

let fecha =new Date();

fecha.setHours(10);
fecha.setMinutes(45);


function dimeHyM(fecha){
    let hora = fecha.getHours().toString();
    let minutos = fecha.getMinutes().toString();
    let tiempo=[hora,minutos];
    return tiempo;
}

let tiempo=dimeHyM(fecha);

console.log('Son las '+tiempo[0]+':'+tiempo[1]+' de la mañana');


//Ejercicio 2

console.log('Son sobre las '+tiempo[0]+' horas aproximadamente');

//Ejercicio 3

function horaYMinutosDecimal(fecha){
    let hora = fecha.getHours();
    let minutos=fecha.getMinutes();
    let minutosDecimales=((minutos*100)/60)/100;
    hora=hora+minutosDecimales;
    return hora;
}

console.log(Math.round(horaYMinutosDecimal(fecha)));

//Ejercicio 4

function suma(a,b){
    return a+b;
}

const a=3;
const b=4;

console.log('La suma de '+a+' y '+b+' es '+suma(a,b));

//Ejercicio 5

function resta(a,b){
    return a-b;
}

console.log('La suma y resta de '+a+' y '+b+' es '+suma(a,b)+' y '+resta(a,b));

//Ejercicio 6

function multiplicacion(a,b){
    return a*b;
}

console.log('La suma, resta y multiplicación de '+a+' y '+b+' es '+suma(a,b)+' , '+resta(a,b)+ ' y '+multiplicacion(a,b));

//Ejercicio 7

function division(a,b){
    return a/b;
}

console.log('La suma, resta, multiplicación y división de '+a+' y '+b+' es '+suma(a,b)+' , '+resta(a,b)+ ' , '+multiplicacion(a,b)+' y '+division(a,b));

//Ejercicio 8

console.log(multiplicacion(10, "hour"));

//Ejercicio 9

let result = multiplicacion(10, "hour");

if(isNaN(result)){
    console.log("Operación no válida. Revisa entrada");
}
else{
    console.log(result);
}