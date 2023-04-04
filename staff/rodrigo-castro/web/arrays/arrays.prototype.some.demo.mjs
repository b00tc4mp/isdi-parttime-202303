import some from './arrays.prototype.some.mjs'

const array = [1, 2, 3, 4, 5];

// Checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(some(array, even))

console.log(array.some(even));
// Expected output: true
