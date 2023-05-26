import find from './arrays.prototype.find.mjs'

const greaterThanTen = (element) => element > 10

const array1 = [15, 7, 8, 130, 44];

const found = array1.find(element => element > 10);


console.log(find(array1 ,greaterThanTen))
console.log(found);
// Expected output: 12
