//
let animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(slice(animals, 2));
// Expected output: Array ["camel", "duck", "elephant"]

animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(slice(animals, 2, 4));
// Expected output: Array ["camel", "duck"]

animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(slice(animals, 1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(slice(animals, -2));
// Expected output: Array ["duck", "elephant"]

animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(slice(animals, 2, -1));
// Expected output: Array ["camel", "duck"]

animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(slice(animals));
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
