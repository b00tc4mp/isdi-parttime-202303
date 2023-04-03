console.log(from(Array, 'foo'));
// Expected output: Array ["f", "o", "o"]

console.log(from(Array, [1, 2, 3], x => x + x));
// Expected output: Array [2, 4, 6]