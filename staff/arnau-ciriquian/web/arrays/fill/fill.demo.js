const array1 = [1, 2, 3, 4];

// Fill with 0 from position 2 until position 4
console.log(fill([1, 2, 3, 4], 0, 2, 4));
// Expected output: Array [1, 2, 0, 0]

// Fill with 5 from position 1
console.log(fill([1, 2, 3, 4], 5, 1));
// Expected output: Array [1, 5, 5, 5]

console.log(fill([1, 2, 3, 4], 6));
// Expected output: Array [6, 6, 6, 6]

console.log(fill([1, 2, 3, 4], 6, -1));
// Expected output: Array [1, 2, 3, 6]

console.log(fill([1, 2, 3, 4], 6, -3, -1));
// Expected output: Array [1, 6, 6, 4]

console.log(fill([1, 2, 3, 4], 6, -2, -4));
// Expected output: Array [1, 2, 3, 4]

console.log(fill([1, 2, 3, 4], 6, -7, -2));
// Expected output: Array [6, 6, 3, 4]