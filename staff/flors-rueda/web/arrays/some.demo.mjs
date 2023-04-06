import { some } from "./some.mjs";

const array = [1, 2, 3, 4, 5];

// Checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(some(array, even));
// Expected output: true

console.log(some([1, , 3], (x) => x === undefined)); // false
console.log(some([1, , 1], (x) => x !== 1)); // false
console.log(some([1, undefined, 1], (x) => x !== 1)); // true


const fruits = ["apple", "banana", "mango", "guava"];

function checkAvailability(arr, val) {
  return some(arr, (arrVal) => val === arrVal);
}

checkAvailability(fruits, "kela"); // false
checkAvailability(fruits, "banana"); // true