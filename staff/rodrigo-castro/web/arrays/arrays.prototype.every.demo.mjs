import every from './arrays.prototype.every.mjs'

const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13, 42];


console.log(every(array1, isBelowThreshold))
console.log(array1.every(isBelowThreshold));
// Expected output: true
