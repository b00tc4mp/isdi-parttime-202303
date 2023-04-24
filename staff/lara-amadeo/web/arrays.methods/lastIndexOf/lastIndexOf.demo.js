import { lastIndexOf } from "./lastIndexOf.js";

const numbers = [2, 5, 9, 2];

console.log(lastIndexOf(numbers, 2)) // 3
console.log(lastIndexOf(numbers, 7))  // -1

console.log(lastIndexOf(numbers, 2, 3)) // 3
console.log(lastIndexOf(numbers, 2, 2)) // 0

console.log(lastIndexOf(numbers, 2, -2)) // 0
console.log(lastIndexOf(numbers, 2, -1)) // 3
