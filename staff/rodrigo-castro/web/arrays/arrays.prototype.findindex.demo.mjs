import findIndex from './arrays.prototype.findindex.mjs'

const array1 = [5, 12, 18, 13, 44];

const isLargeNumber = (element) => element > 13;

console.log(findIndex(array1, isLargeNumber))
console.log(array1.findIndex(isLargeNumber));
// Expected output: 3
