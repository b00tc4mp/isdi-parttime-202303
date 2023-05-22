//
let array1 = [1, 2, 3, 4];
console.log(fill(array1, 0, 2, 4));
// Expected output: Array [1, 2, 0, 0]

array1 = [1, 2, 3, 4];
console.log(fill(array1, 5, 1));
// Expected output: Array [1, 5, 5, 5]

array1 = [1, 2, 3, 4];
console.log(fill(array1, 6));
// Expected output: Array [6, 6, 6, 6]

console.log(fill([1, 2, 3], 4)); // [4, 4, 4]
console.log(fill([1, 2, 3], 4, 1)); // [1, 4, 4]

console.log(fill([1, 2, 3], 4, 1, 2)); // [1, 4, 3]
console.log(fill([1, 2, 3], 4, 1, 1)); // [1, 2, 3]

console.log(fill([1, 2, 3], 4, 3, 3)); // [1, 2, 3]
console.log(fill([1, 2, 3], 4, -3, -2)); // [4, 2, 3]
console.log(fill([1, 2, 3], 4, NaN, NaN)); // [1, 2, 3]
console.log(fill([1, 2, 3], 4, 3, 5)); // [1, 2, 3]
console.log(fill(Array(3), 4)); // [4, 4, 4]

// A single object, referenced by each slot of the array:
const arr = Array(3).fill({}); // [{}, {}, {}]
arr[0].hi = 'hi'; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
console.log(arr[0]);
