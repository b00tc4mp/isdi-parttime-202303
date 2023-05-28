import concat from './concat.mjs'

const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = []

console.log(concat(array3, array1, array2));
// Expected output: Array ["a", "b", "c", "d", "e", "f"]

const alpha = ['a', 'b', 'c'];

const alphaNumeric = concat(alpha, 1, [2], [3]);

console.log(alphaNumeric);

 
 
 