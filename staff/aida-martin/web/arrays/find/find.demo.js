import find from "./find.js";

const array1 = [5, 12, 8, 130, 44];

const found = find(array1, (element) => element > 10);

console.log(found);
// Expected output: 12

const found1 = find(array1, (element) => element < 10);

console.log(found1);
//EXTRA Expected output: 5

const found2 = find(array1, (element) => element === 10);

console.log(found2);
//EXTRA Expected output: undefined
