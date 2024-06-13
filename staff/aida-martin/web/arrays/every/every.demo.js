import every from "./every.js";

const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(every(array1, isBelowThreshold));
// Expected output: true

const prueba = (element) => element > 10;

console.log(every(array1, prueba));
//EXTRA Expected output: false

const array2 = [];

console.log(every(array2, isBelowThreshold));
//EXTRA Expected output: true

console.log(every(array2, prueba));
//EXTRA Expected output: true
