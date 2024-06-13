import some from "./some.js";

const array = [1, 2, 3, 4, 5];

// Checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(some(array, even));
// Expected output: true

const even1 = (element) => element === 0;

console.log(some(array, even1));
//EXTRA Expected output: false

const even2 = (element) => element === 1;

console.log(some(array, even2));
//EXTRA Expected output: true

const array1 = [];

const even3 = (element) => element === "";

console.log(some(array1, even3));
//EXTRA Expected output: false

console.log(some([1, , 3], (x) => x === undefined)); // false

console.log(some([1, , 1], (x) => x !== 1)); // false
console.log(some([1, undefined, 1], (x) => x !== 1)); // true
