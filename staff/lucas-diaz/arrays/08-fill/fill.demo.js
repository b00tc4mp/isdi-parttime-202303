const array1 = [1, 2, 3, 4];


// Fill with 0 from position 2 until position 4
console.log(fill(array1,0, 2, 4));
// Expected output: Array [1, 2, 0, 0]

// Fill with 5 from position 1
console.log(fill(array1,5,1));
// Expected output: Array [1, 5, 5, 5]

console.log(fill(array1,6));
// Expected output: Array [6, 6, 6, 6]

const array2 = [1, 2, 3];

console.log(fill(array2,4));               // [4, 4, 4]
console.log(fill(array2,4, 1));            // [1, 4, 4]
console.log(fill(array2,4, 1, 2));         // [1, 4, 3]
console.log(fill(array2,4, 1, 1));         // [1, 2, 3]
console.log(fill(array2,4, 3, 3));         // [1, 2, 3]
console.log(fill(array2,4, -3, -2));       // [4, 2, 3]
console.log(fill(array2,4, NaN, NaN));     // [1, 2, 3]
console.log(fill(array2,4, 3, 5));         // [1, 2, 3]
console.log(Array(3).fill(4));             // [4, 4, 4]