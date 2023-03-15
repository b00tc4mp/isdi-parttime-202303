const datos = ['Rodrigo', 'Castro', 31];

for (let i = 0; i < datos.length; i++){
    console.log(datos[i]);    
};

let numA = 25;
let numB;

if (numA>numB){
    console.log(numA);
} else if (numA<numB) {
    console.log(numB);
} else {
    console.log('Los numeros son iguales.');
};

let numeros = [4, 66, 22, 1, 51];

for (let j = 0; j < numeros.length; j++){
    console.log(numeros[j]);
    if (j === Math.floor(numeros.length/2)) {
        console.log('Estamos a mitad del loop')
    };
};

let myName = 'Rodrigo';
let myLastName = 'Castro';
let myAge = 31;

if (myName != datos[0] || myLastName != datos[1] || myAge != datos[2]){
    console.log('This is not you');
} else{
    console.log('Hi! Glad to see you again!');
};

let listado1 = ['Rodrigo', 'Perez', 'Juan', 42, 77, 31, 'Castro', 'Ramirez'];
for (i = 0; i < listado1.length; i++){
    if (myName === listado1[i]){
        console.log('We have found your data: ' + listado1[i])
    } else if (myLastName === listado1[i]) {
        console.log('We have found your data: ' + listado1[i])
    } else if (myAge === listado1[i]) {
        console.log('We have found your data: ' + listado1[i])
    }
}

let listado2 = [['Rodrigo', 'Perez', 31], ['Ramiro', 'Sanchez', 22], ['Rodrigo', 'Castro', 31], ['Fernando', 'Roman', 14]];

for (i = 0; i < listado.length; i++){
    let j = 0;
    if (listado[i][j] === datos[j]){
        j++
        if (listado[i][j] === datos[j]){
            j++
            if (listado[i][j] === datos[j]){
                console.log('We have found your data: '+ listado[i]);
            }
        }
//    if (listado[i][0] === datos[0] && listado[i][1] === datos[1] && listado[i][2] === datos[2]){
//        console.log('We have found your data: '+ listado[i]);
        }
}