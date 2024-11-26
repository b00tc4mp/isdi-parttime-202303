//Clases

const avenger = {
    name: "Tony",
    class: "VII",
    id: 1,
};

//Ejercicio 1

const muestraAtributos = (clase) => {
    const atributos = Object.getOwnPropertyNames(clase);
    let respuesta = '';
    for (let i = 0; i < atributos.length; i++) {
        respuesta += atributos[i];
        if (i < (atributos.length - 1)) {
            respuesta += ', ';
        }
    }
    console.log(respuesta);
}

muestraAtributos(avenger);

//Ejercicio 2

const muestraDatos = (clase) => {
    console.log(clase.name + ' ' + clase.class + ' ' + clase.id);
}

muestraDatos(avenger);

//Ejercicio 3

avenger.class = 'XI';
muestraDatos(avenger);

//Ejercicio 4

delete avenger.id;
console.log("id" in avenger);

//Ejercicio 5

avenger.city = "New York";

//Ejercicio 5.1
console.log(avenger.city);

//Ejercicio 6

const numeroElementos = (clase) => {
    return Object.getOwnPropertyNames(clase).length;
}

console.log(numeroElementos(avenger));

//Ejercicio 7

avenger.fullName = avenger.name;
delete avenger.name;

//Ejercicio 7.1

console.log(avenger.fullName);

//Ejercicio 8

console.log("Hi, I'm " + avenger.fullName + ", I'm a class " + avenger.class + " avenger and I live in " + avenger.city);

//Ejercicio 8.1

avenger.markAverage = 1;
avenger.country = "USA";
avenger.job = "Inventor";

//Ejercicio 8.2

const mostrarTodosDatos = (clase) => {
    const atributos = Object.getOwnPropertyNames(clase);
    let respuesta = '';
    for (let i = 0; i < atributos.length; i++) {
        respuesta += atributos[i] + '         ' + clase[atributos[i]] + '\n';
    }
    console.log(respuesta);
}

mostrarTodosDatos(avenger);

//Ejercicio 9

function avengers(fullName, classRoom, city, job, studies, markAv) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job = job;
    this.studies = studies;
    this.markAv = markAv;
    //Ejercicio 11
    this.description = function () {
        console.log(this.fullName + ' , ' + this.classRoom + ' , ' + this.city + ' , ' + this.job + ' , ' + this.studies + ' , ' + this.markAv);
    }
}
const tonyStark = new avengers("Tony Stark", "XI", "NYC", "Ingeneer", "MIT", 10);
console.log(tonyStark);

//Ejercicio 10

const spiderman = new avengers("Peter Parker", "I", "NYC", "Student", "MIT", 11);
console.log(spiderman);

//Ejercicio 11

spiderman.description();

//Ejercicio 12

const vengadores = [tonyStark, spiderman];
const muestraNombres = (datos) => {
    vengadores.forEach(vengador => console.log(vengador.fullName));
}
muestraNombres(vengadores);

//Ejercicio 13

const filtracion = (clase, ciudad) => {
    const filtrado = clase.filter(elementos => elementos.city == ciudad);
    console.log('Hay '+filtrado.length+' vengadores en '+ciudad+': ');
    muestraNombres(filtrado);
}

filtracion(vengadores,"NYC");

//Ejercicio 14

const iCarlosPro = new avengers("Carlos Perez","I","Huelva","Front-End Developer","ISDI",8);
vengadores.push(iCarlosPro);

const mediaNotasMedias= (clases) =>{
let acumulador=0;
clases.forEach(vengador => acumulador+=vengador.markAv);
return acumulador/clases.length;
}

console.log('La nota media es '+mediaNotasMedias(vengadores));
