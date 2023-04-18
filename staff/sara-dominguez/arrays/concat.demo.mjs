import concat from './concat.mjs'

const array1 = ['a', 'b', 'c', 6, 'w'];
const array2 = ['d', 'e', 'f'];
const array3 = []

console.log(concat(array3, array1, array2));
// Expected output: Array ["a", "b", "c", "d", "e", "f"]
