const animals = ["ant", "bison", "camel", "duck", "elephant"];

console.log(slice(animals, 2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(slice(animals, 2, 4));
// Expected output: Array ["camel", "duck"]

console.log(slice(animals, 1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(slice(animals, -2));
// Expected output: Array ["duck", "elephant"]

console.log(slice(animals, 2, -1));
// Expected output: Array ["camel", "duck"]

console.log(slice(animals));
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

//START
//Negative index counts back from the end of the array — if start < 0, start + array.length is used.
console.log(slice(animals, -3));
// Expected output: Array ["camel", "duck", "elephant"]

//If start < -array.length or start is omitted, 0 is used.
console.log(slice(animals, -99));
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

//If start >= array.length, nothing is extracted
console.log(slice(animals, 99));
// Expected output: Array []

//END

//Negative index counts back from the end of the array — if end < 0, end + array.length is used.
console.log(slice(animals, 1, -1));
// Expected output: Array ["bison", "camel", "duck"]

//If end < -array.length, 0 is used.
console.log(slice(animals, 2, -99));
// Expected output: Array []

//If end >= array.length or end is omitted, array.length is used, causing all elements until the end to be extracted.
console.log(slice(animals, 2, 99));
// Expected output: Array ["camel", "duck", "elephant"]

//If end is positioned before or at start after normalization, nothing is extracted.
console.log(slice(animals, 2, 2));
// Expected output: Array []

// const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

// console.log(animals.slice(2));
// // Expected output: Array ["camel", "duck", "elephant"]

// console.log(animals.slice(2, 4));
// // Expected output: Array ["camel", "duck"]

// console.log(animals.slice(1, 5));
// // Expected output: Array ["bison", "camel", "duck", "elephant"]

// console.log(animals.slice(-2));
// // Expected output: Array ["duck", "elephant"]

// console.log(animals.slice(2, -1));
// // Expected output: Array ["camel", "duck"]

// console.log(animals.slice());
// // Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

// //START
// //Negative index counts back from the end of the array — if start < 0, start + array.length is used.
// console.log(animals.slice(-3));
// // Expected output: Array ["camel", "duck", "elephant"]

// //If start < -array.length or start is omitted, 0 is used.
// console.log(animals.slice(-99));
// // Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

// //If start >= array.length, nothing is extracted
// console.log(animals.slice(99));
// // Expected output: Array []

// //END

// //Negative index counts back from the end of the array — if end < 0, end + array.length is used.
// console.log(animals.slice(1, -1));
// // Expected output: Array ["bison", "camel", "duck"]

// //If end < -array.length, 0 is used.
// console.log(animals.slice(2, -99));
// // Expected output: Array []

// //If end >= array.length or end is omitted, array.length is used, causing all elements until the end to be extracted.
// console.log(animals.slice(2, 99));
// // Expected output: Array ["camel", "duck", "elephant"]

// //If end is positioned before or at start after normalization, nothing is extracted.
// console.log(animals.slice(2, 2));
// // Expected output: Array []
