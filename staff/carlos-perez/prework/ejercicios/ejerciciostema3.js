const character = {
    name: "Jon",
    family: "Snow",
    id: 1,
};


//Ejercicio 1
function muestraPersonaje(personaje) {
    let propiedades = Object.getOwnPropertyNames(personaje);
    let resultado = propiedades.toString();
    console.log(resultado);
}

muestraPersonaje(character);

//Ejercicio 2
function muestraValoresPersonaje(personaje) {
    let valores = [personaje.name, personaje.family, personaje.id];
    let resultado = valores.toString();
    console.log(resultado);
}

muestraValoresPersonaje(character);


//Ejercicio 3
character.family = "Lannister";
console.log(character.family);


//Ejercicio 4

delete character.id;
console.log(character.id);

//Ejercicio 5

character.age = 30;
console.log(character.age);

//Ejercicio 6

function numeroPropiedades(personaje) {
    let propiedades = Object.getOwnPropertyNames(personaje);
    console.log(propiedades.length);
}

numeroPropiedades(character);

//Ejercicio 7 y 7.1

character.fullName = character.name;
delete character.name;
character.fullName = "John Snow";
console.log(character.fullName);


//Ejercicio 8

function muestraPropiedadesPersonaje(personaje) {
    let resultado = '';
    for (let i in personaje) {
        resultado += i + ' = ' + personaje[i] + '\n';
    }
    console.log(resultado);
}

muestraPropiedadesPersonaje(character);

//O, más amigable

console.log('Hola, soy ' + character.fullName + ' tengo ' + character.age + ' años y pertenezco a la familia ' + character.family+'\n');

//Ejercicio 9 y 9.1

character.location="Tower of Joy";
character.pet="Wolf";
character.actor="Kit Harington";

muestraPropiedadesPersonaje(character);