import forEach from "./arrays.prototype.foreach.mjs";

const array1 = ['a', 'b', 'c'];
const printInConsole = (element) => console.log(element)

array1.forEach(element => console.log(element));
forEach(array1, printInConsole)
// Expected output: "a"
// Expected output: "b"
// Expected output: "c"
