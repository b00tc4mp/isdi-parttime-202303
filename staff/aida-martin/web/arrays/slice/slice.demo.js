//Cogidos de los live examples del repositorio en Git de MDN

const animals = ["ant", "bison", "camel", "duck", "elephant"];

console.log(slice(animals, 2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(slice(animals, 2, 4));
// Expected output: Array ["camel", "duck"]

console.log(slice(animals, 1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(slice(animals, -2));
// Expected output: Array ["duck", "elephant"]

console.log(slice(animals, 2, -1));
// Expected output: Array ["camel", "duck"]

console.log(slice(animals, 9));
// EXTRA Expected output: Array []

console.log(slice(animals, 0, 9));
// EXTRA Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

console.log(slice(animals));
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
