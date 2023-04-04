import forEach from "./forEach.js"

const array1 = ['a', 'b', 'c'];

forEach(array1, element => console.log(element));

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"