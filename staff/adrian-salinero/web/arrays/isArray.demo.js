console.log(isArray([1, 3, 5]));
// Expected output: true

console.log(isArray("[]"));
// Expected output: false

console.log(isArray(new Array(5)));
// Expected output: true

console.log(isArray(new Int16Array([15, 33])));
// Expected output: false


//ARNAU

console.log(isArray({ test: "test", 1: 1 }));
// Expected output: false

console.log(isArray(null));
// Expected output: false