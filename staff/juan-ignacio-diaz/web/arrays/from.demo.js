import from from "./from.js"

console.log(from('foo'));
// Expected output: Array ["f", "o", "o"]

console.log(from([1, 2, 3], x => x + x));
// Expected output: Array [2, 4, 6]