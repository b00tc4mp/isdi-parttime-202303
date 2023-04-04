import every from './arrays.prototype.every.mjs'

const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13, 42];


console.log(every(array1, isBelowThreshold))
console.log(array1.every(isBelowThreshold));
// Expected output: true

console.log('EJEMPLOS PARTICULARES:')
console.log(every([1, , 3], (x) => x !== undefined))
console.log(every([2, , 2], (x) => x === 2))
console.log(every([2, undefined, 2], (x) => x === 2))

console.log('SOLUCION EJEMPLOS PARTICULARES:')
console.log([1, , 3].every((x) => x !== undefined)); // true
console.log([2, , 2].every((x) => x === 2)); // true
console.log([2, undefined, 2].every((x) => x === 2)); //false