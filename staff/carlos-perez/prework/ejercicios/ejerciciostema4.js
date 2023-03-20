//Funciones
//Ejercicio 1
/*const func = (myName) => {
    console.log("hello "+myName); //output: 'hello myName'
  };*/
//Ejercicio 2
 /* const func = (myName) => {
    return "hello "+myName; // output: 'hello myName'
  };*/
//Ejercicio 3
  
const func = (myName,myAge) => {
    return "Hello "+myName+", you are "+myAge+" years old";
  };
console.log(func('Carlos',30));

//La diferencia entre console.log() y return es que una muestra un mensaje por la consola
//y la otra devuelve un tipo de dato u objeto que debe guardarse

const myFunction=func('Carlos',30);
