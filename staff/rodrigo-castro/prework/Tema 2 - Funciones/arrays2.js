const nombre = ['R', 'O', 'D', 'R', 'I', 'G', 'O', 'C', 'A', 'S', 'T', 'R', 'O'];
const nombre2 = ['R', 'O', 'D', 'R', 'I', 'G', 'O', 'C', 'A', 'S', 'T', 'R', 'O'];
const nombre3 = ['R', 'O', 'D', 'R', 'I', 'G', 'O', 'C', 'A', 'S', 'T', 'R', 'O'];

function miNombre (nombre){
    return nombre.join('/');
};

function miApellido (nombre){
    return nombre.join('|');
};

function namePosition (nombre){
    let salidaPosiciones = [];
    for(let i = 0; i < 7; i++){
        let position = i+1;
        salidaPosiciones.push(position + 'º'+nombre[i]);
    }
    return salidaPosiciones
}

function lastNamePosition (nombre){
    let salidaPosiciones = [];
    for(let i = 7; i < nombre.length; i++){
        let position = i+1;
        salidaPosiciones.push(position + 'º'+nombre[i]);
    }
    return salidaPosiciones
}

function changeAll (nombre){
    nombre[0] = 'Rodrigo';
    nombre[1] = 'Castro';
    nombre[2] = 31;
    nombre.splice(3);
    return nombre;
}

function addCity (nombre){
    nombre.push('Mar del Plata');
    return nombre;
}

function deleteCity(nombre){
    nombre.splice(3);
    return nombre;
}

function deleteName(nombre){
    nombre.shift();
    return nombre
}

function addName(nombre){
    nombre.splice(0,0,'Rodrigo');
    return nombre;
}

function multiplicador(numbers,n){
    for(let i = 0; i < numbers.length; i++){
        numbers[i] = numbers[i] * n;
    };
    return numbers;
}

function nombreAux(nombre){
    let nombreAuxiliar = nombre.sort();
    let counter = 1;
    let unicosElementos = [];
    let contadorRepetidos = [];

    for (let i = 0; i < nombreAuxiliar.length; i++){
        if (nombreAuxiliar[i+1] === nombreAuxiliar[i]){
//            console.log('Se repite el caracter: ' + nombreAuxiliar[i]);
            counter++;
        } else {
            unicosElementos.push(nombreAuxiliar[i]);
            contadorRepetidos.push(counter);
            counter = 1;
        };
    };
    for (let j = 0; j < unicosElementos.length; j++){
        if (contadorRepetidos[j] > 1){
            console.log('El elemento ' + unicosElementos[j] + ' se repite ' + contadorRepetidos[j] + ' veces.');
        };
    };
    let noRepetidos = [];
    for (let j = 0; j < unicosElementos.length; j++){
        if (contadorRepetidos[j] === 1){
            console.log('El elemento ' + unicosElementos[j] + ' no se repite.');
            noRepetidos.push(unicosElementos[j]);
        };
    };
    return noRepetidos;
};

function quitarSimples (noRepetidos, nombre2){
    for(let i = 0; i < nombre2.length; i++){
        for (let j = 0; j < noRepetidos.length; j++){
            if(nombre2[i] === noRepetidos[j]){
                delete nombre2[i];
            }
        }
    }
    return nombre2;
}

let salida1 = miNombre(nombre);
console.log(salida1);

let salida2 = miApellido(nombre.slice(7));
console.log(salida2);

let salida3 = namePosition(nombre);
console.log(salida3);

let salida4 = lastNamePosition(nombre);
console.log(salida4);

console.log(salida3[0][2] + salida4[0][2]);

let salida5 = changeAll(nombre);
console.log('My name is ' + salida5[0] + ' and Im ' + salida5[2] + ' years young.');

let salida6 = addCity(nombre);
console.log(nombre);

let salida7 = deleteCity(nombre);
console.log(salida7)

let salida8 = deleteName(nombre);
console.log(salida8);

let salida9 = addName(nombre);
console.log(nombre);

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(multiplicador(numbers,3));

console.log(numbers.reverse());

//let nombreAuxiliar = nombre2.sort();
//console.log(nombreAuxiliar);

let nombreAuxiliar = nombreAux(nombre2);
console.log(nombre2);
console.log(nombreAuxiliar);

let sinSimples = quitarSimples(nombreAuxiliar, nombre3);
console.log(sinSimples);





//console.log(nombre);