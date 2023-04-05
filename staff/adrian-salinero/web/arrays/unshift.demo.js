const array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// Expected output: 5

console.log(array1);
// Expected output: Array [4, 5, 1, 2, 3]

const array2 = [1, 2, 3, 4, 5];

console.log(array2.unshift(6, 7, 8, 9));
// Expected output: 9

console.log(array2);
// Expected output: Array [4, 5, 1, 2, 3]
