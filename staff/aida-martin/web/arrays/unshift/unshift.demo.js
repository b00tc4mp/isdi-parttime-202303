const array1 = [1, 2, 3];

console.log(unshift(array1, 4, 5));
// Expected output: 5

console.log(array1);
// Expected output: Array [4, 5, 1, 2, 3]

console.log(unshift(array1, 1, 2, 3, 4, 5, 6));
// EXTRA Expected output: 11

console.log(array1);
// EXTRA Expected output: Array [1, 2, 3, 4, 5, 6, 4, 5, 1, 2, 3]
