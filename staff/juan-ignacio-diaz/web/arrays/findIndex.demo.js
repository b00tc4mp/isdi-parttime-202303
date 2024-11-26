import findIndex from "./findIndex.js"

const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(findIndex(array1, isLargeNumber));
console.log(array1.findIndex(isLargeNumber));
// Expected output: 3