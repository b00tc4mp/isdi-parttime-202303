import { every } from "./every.mjs";

const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(every(array1, isBelowThreshold));
// Expected output: true