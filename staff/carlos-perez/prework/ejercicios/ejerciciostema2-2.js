//Arrays

//Ejercicio 1

const name = ['C', 'A', 'R', 'L', 'O', 'S', 'P', 'E', 'R', 'E', 'Z'];
function myName(name) {
    return name.join('/');
}
const result = myName(name);
console.log(result);

//Ejercicio 2

let nombre = [];

for (let i = 0; i < 6; i++) {
    nombre.push(name[i]);
}

console.log(nombre.join("|"));

//Ejercicio 3

let nombreYPos = [];

for (let i = 0; i < nombre.length; i++) {
    nombreYPos.push((i + 1) + "º " + nombre[i]);
}

console.log(nombreYPos.join(", "));

//Ejercicio 4

let apellido = [];

for (let i = 6; i < name.length; i++) {
    apellido.push(name[i]);
}


let apellidoYPos = [];

for (let i = 0; i < apellido.length; i++) {
    apellidoYPos.push((i + 1) + "º " + apellido[i]);
}

console.log(apellidoYPos.join(", "));


//Ejercicio 5

console.log(nombre[0] + '.' + apellido[0] + '.');

//Ejercicio 6

let datos = ['Carlos', 'Perez', 30];

console.log('Mi nombre es ' + datos[0] + ' y tengo ' + datos[2] + ' años');

//Ejercicio 7

function addCiudad(datos, ciudad) {
    datos.push(ciudad);
    console.log('Ciudad añadida');
}

addCiudad(datos, 'Huelva');

console.log(datos);

//Ejercicio 8

function deleteCiudad(datos) {
    datos.pop();
    console.log("Ciudad eliminada");
}

deleteCiudad(datos);
console.log(datos);

//Ejercicio 9

datos.shift();
console.log(datos);

//Ejercicio 10

datos.splice(0, 0, 'Carlos');
console.log(datos);

//Ejercicio 11

let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let numeros2 = numeros.map(function (numero) { return numero * 2 });
console.log(numeros2);

//Ejercicio 12

const num = 3;

let numeros3 = numeros.map(function (numero) { return numero * num });
console.log(numeros3);

//Ejercicio 13

function ordena(a, b) {
    return b - a;
}

let numerosReverso = numeros.sort(ordena);
console.log(numerosReverso);

//Ejercicio 14

let repetidos = name.reduce((acc, currentValue, index, array) => {
    if (array.indexOf(currentValue) != index && !acc.includes(currentValue)) acc.push(currentValue);
    return acc;
}, []);

console.log(repetidos);

let repeticion;
let acumulado=[]

for (let i = 0; i < repetidos.length; i++) {
    repeticion=0;
    for (let j = 0; j < name.length; j++) {
        if(name[j]==repetidos[i]){
            repeticion++;
        }
    }
    acumulado.push(repeticion);
}

console.log(acumulado);

function imprime(nombre, apellido, repetidos, acumulado){
    let letras=[];
    for(let i=0; i<repetidos.length; i++){
       letras.push(repetidos[i]+" => "+acumulado[i]+" veces"); 
    }
    let mensaje = letras.join(', ');
    let resultado=nombre+' '+apellido+' la letra '+mensaje;
    console.log(resultado);
}
imprime(datos[0], datos[1], repetidos, acumulado);

//Ejercicio 15

function repetido (valor){
    return !repetidos.includes(valor);
}

let norepetidos=name.filter(repetido);

function imprime2(norepetidos){
    let letrasnorep=norepetidos.join(', ');
    return letrasnorep;
}

console.log(datos[0]+' '+datos[1]+'las letras ' +imprime2(norepetidos)+' no están repetidas. El nombre es '+norepetidos.join(''));