let array1 = [1, 2, 3, 4];

// Fill with 0 from position 2 until position 4
console.log(fill(array1, 0, 2, 4));
// Expected output: Array [1, 2, 0, 0]

// Fill with 5 from position 1
array1 = [1, 2, 3, 4];
console.log(fill(array1, 5, 1));
// Expected output: Array [1, 5, 5, 5]

// Fill with 5 from position 0
array1 = [1, 2, 3, 4];
console.log(array1.fill(5, 0));
// Expected output: Array [5, 5, 5, 5]

array1 = [1, 2, 3, 4];
console.log(fill(array1, 6));
// Expected output: Array [6, 6, 6, 6]

//Value
array1 = [1, 2, 3, 4];
console.log(fill(array1, [1, 2], 2, 4));
// Expected output: Array [1, 2], Array [1, 2], Array [1, 2], Array [1, 2]

//Start
//Negative index counts back from the end of the array — if start < 0, start + array.length is used.
array1 = [1, 2, 3, 4];
console.log(fill(array1, 0, -3, 4));
// Expected output: Array [1, 0, 0, 0]

array1 = [1, 2, 3, 4];
console.log(fill(array1, 0, -1, 4));
// Expected output: Array [1, 2, 3, 0]

//If start < -array.length or start is omitted, 0 is used.
array1 = [1, 2, 3, 4];
console.log(fill(array1, 0, -10, 4));
// Expected output: Array [0, 0, 0, 0]

//If start >= array.length, no index is filled.
array1 = [1, 2, 3, 4];
console.log(fill(array1, 0, 99, 4));
// Expected output: Array [1, 2, 3, 4]

//END

//Negative index counts back from the end of the array — if end < 0, end + array.length is used.
array1 = [1, 2, 3, 4];
console.log(fill(array1, 0, 2, -1));
// Expected output: Array [1, 2, 0, 4]

//If end < -array.length, 0 is used.
array1 = [1, 2, 3, 4];
console.log(fill(array1, 0, 2, -99));
// Expected output: Array [1, 2, 3, 4]

//If end >= array.length or end is omitted, array.length is used, causing all indices until the end to be filled.
array1 = [1, 2, 3, 4];
console.log(fill(array1, 0, 2, 99));
// Expected output: Array [1, 2, 0, 0]

//If end is positioned before or at start after normalization, no index is filled.
array1 = [1, 2, 3, 4];
console.log(fill(array1, 0, 3, 2));
// Expected output: Array [1, 2, 3, 4]

// let array1 = [1, 2, 3, 4];

// // Fill with 0 from position 2 until position 4
// console.log(array1.fill(0, 2, 4));
// // Expected output: Array [1, 2, 0, 0]

// // Fill with 5 from position 1
// array1 = [1, 2, 3, 4];
// console.log(array1.fill(5, 1));
// // Expected output: Array [1, 5, 5, 5]

// // Fill with 5 from position 0
// array1 = [1, 2, 3, 4];
// console.log(array1.fill(5, 0));
// // Expected output: Array [5, 5, 5, 5]

// array1 = [1, 2, 3, 4];
// console.log(array1.fill(6));
// // Expected output: Array [6, 6, 6, 6]

// //Value
// array1 = [1, 2, 3, 4];
// console.log(array1.fill([1,2],2,4));
// // Expected output: Array [1, 2], Array [1, 2], Array [1, 2], Array [1, 2]

// //Start
// //Negative index counts back from the end of the array — if start < 0, start + array.length is used.
// array1 = [1, 2, 3, 4];
// console.log(array1.fill(0, -3, 4));
// // Expected output: Array [1, 0, 0, 0]

// array1 = [1, 2, 3, 4];
// console.log(array1.fill(0, -1, 4));
// // Expected output: Array [1, 2, 3, 0]

// //If start < -array.length or start is omitted, 0 is used.
// array1 = [1, 2, 3, 4];
// console.log(array1.fill(0, -10, 4));
// // Expected output: Array [0, 0, 0, 0]

// //If start >= array.length, no index is filled.
// array1 = [1, 2, 3, 4];
// console.log(array1.fill(0, 99, 4));
// // Expected output: Array [1, 2, 3, 4]

// //END

// //Negative index counts back from the end of the array — if end < 0, end + array.length is used.
// array1 = [1, 2, 3, 4];
// console.log(array1.fill(0, 2, -1));
// // Expected output: Array [1, 2, 0, 4]

// //If end < -array.length, 0 is used.
// array1 = [1, 2, 3, 4];
// console.log(array1.fill(0, 2, -99));
// // Expected output: Array [1, 2, 3, 4]

// //If end >= array.length or end is omitted, array.length is used, causing all indices until the end to be filled.
// array1 = [1, 2, 3, 4];
// console.log(array1.fill(0, 2, 99));
// // Expected output: Array [1, 2, 0, 0]

// //If end is positioned before or at start after normalization, no index is filled.
// array1 = [1, 2, 3, 4];
// console.log(array1.fill(0, 3, 2));
// // Expected output: Array [1, 2, 3, 4]
