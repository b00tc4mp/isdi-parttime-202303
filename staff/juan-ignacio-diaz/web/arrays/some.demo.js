import some from "./some.js"

const array = [1, 2, 3, 4, 5];
const array2 = [1, 3, 3, 7, 5];

// Checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(some(array, even));
// Expected output: true

console.log(some(array2, even));
// Expected output: false