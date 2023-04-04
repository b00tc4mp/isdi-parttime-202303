import map from './arrays.prototype.map.mjs'

const array1 = [1, 4, , NaN, 9, 16];

const multiplicateByTwo = (element) => element * 2

// Pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map(array1, multiplicateByTwo))
console.log(map1);
// Expected output: Array [2, 8, 18, 32]