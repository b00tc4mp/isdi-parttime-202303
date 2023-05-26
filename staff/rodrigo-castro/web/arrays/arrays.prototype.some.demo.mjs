import some from './arrays.prototype.some.mjs'

const array = [1, 2, 3, 4, 5];

// Checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(some(array, even))

console.log(array.some(even));
// Expected output: true

console.log('EJEMPLOS PARTICULARES:')
console.log(some([1, , 3], (x) => x === undefined))
console.log(some([1, , 1], (x) => x !== 1))
console.log(some([1, undefined, 1], (x) => x !== 1))

console.log('EJEMPLOS PARTICULARES SOLUCION:')
console.log([1, , 3].some((x) => x === undefined)); // false
console.log([1, , 1].some((x) => x !== 1)); // false
console.log([1, undefined, 1].some((x) => x !== 1)); // true
