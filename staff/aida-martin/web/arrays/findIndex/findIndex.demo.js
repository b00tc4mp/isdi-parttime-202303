import findIndex from "./findIndex.js";

const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(findIndex(array1, isLargeNumber));
// Expected output: 3

const prueba = (element) => element < 13;

console.log(findIndex(array1, prueba));
//EXTRA Expected output: 0

console.log(findIndex(array1, (element) => element === 13));
//EXTRA Expected output: -1
