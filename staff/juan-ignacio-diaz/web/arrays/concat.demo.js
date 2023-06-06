import concat from "./concat.js"

const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = concat(array1, array2);

console.log(array3);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]