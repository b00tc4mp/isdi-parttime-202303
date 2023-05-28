import concat from './concat.mjs'

const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = ['h', 'i', 'j'];

console.log(concat(array1, array2, array3));
// Expected output: Array ["a", "b", "c", "d", "e", "f"]

const alpha = ['a', 'b', 'c'];

const alphaNumeric = concat(alpha, 1, [2], [3]);

console.log(alphaNumeric);
// expected output: ["a", "b", "c", 1, 2, 3]
 
 
 