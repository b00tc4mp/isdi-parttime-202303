import findIndex from "./findIndex.mjs";

const array1 = [5, 11, 8, 13, 44];

const isLargeNumber = (element) => element > 10;

console.log(findIndex(array1, isLargeNumber));
// Expected output: 1