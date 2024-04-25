import { findIndex } from "./findIndex.mjs";

const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(findIndex(array1, isLargeNumber));
// Expected output: 3
