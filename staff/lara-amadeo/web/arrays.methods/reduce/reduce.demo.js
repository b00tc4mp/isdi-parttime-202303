import reduce from "./reduce.js";


const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;

const result = reduce(array1, (accumulator, currentValue) => accumulator + currentValue, initialValue);

console.log(result);
// Expected output: 10


const array2 = [10, 20, 30, 40];

const result2 = reduce(array2, (accumulator, currentValue) => accumulator + currentValue);

console.log(result2);
// Expected output: 100

