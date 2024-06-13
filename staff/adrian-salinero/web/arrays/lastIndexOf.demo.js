const animals = ["Dodo", "Tiger", "Penguin", "Dodo"];

//fromIndex < -array.length
console.log(lastIndexOf(animals, "Dodo", -90));
// Expected output: -1

//fromIndex is omitted

console.log(lastIndexOf(animals, "Dodo"));
// Expected output: 3

console.log(lastIndexOf(animals, "Tiger"));
// Expected output: 1

console.log(lastIndexOf(animals, "Dog"));
// Expected output: -1

//fromIndex is positive

console.log(lastIndexOf(animals, "Dodo", 5));
// Expected output: 3

console.log(lastIndexOf(animals, "Dodo", 4));
// Expected output: 3

console.log(lastIndexOf(animals, "Dodo", 3));
// Expected output: 3

console.log(lastIndexOf(animals, "Dodo", 2));
// Expected output: 0

console.log(lastIndexOf(animals, "Dodo", 1));
// Expected output: 0

console.log(lastIndexOf(animals, "Dodo", 0));
// Expected output: 0

console.log(lastIndexOf(animals, "Tiger", 0));
// Expected output: -1

//fromIndex is negative

console.log(lastIndexOf(animals, "Dodo", -5));
// Expected output: -1

console.log(lastIndexOf(animals, "Dodo", -4));
// Expected output: 0

console.log(lastIndexOf(animals, "Dodo", -3));
// Expected output: 0

console.log(lastIndexOf(animals, "Dodo", -2));
// Expected output: 0

console.log(lastIndexOf(animals, "Dodo", -1));
// Expected output: 3

console.log(lastIndexOf(animals, "Dog", -2));
// Expected output: -1

// const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

// //fromIndex < -array.length

// console.log(animals.lastIndexOf('Dodo', -90));
// // Expected output: -1

// //fromIndex is omitted

// console.log(animals.lastIndexOf('Dodo'));
// // Expected output: 3

// console.log(animals.lastIndexOf('Tiger'));
// // Expected output: 1

// console.log(animals.lastIndexOf('Dog'));
// // Expected output: 0

// //fromIndex is positive

// console.log(animals.lastIndexOf('Dodo', 5));
// // Expected output: 3

// console.log(animals.lastIndexOf('Dodo', 4));
// // Expected output: 3

// console.log(animals.lastIndexOf('Dodo', 3));
// // Expected output: 3

// console.log(animals.lastIndexOf('Dodo', 2));
// // Expected output: 0

// console.log(animals.lastIndexOf('Dodo', 1));
// // Expected output: 0

// console.log(animals.lastIndexOf('Dodo', 0));
// // Expected output: 0

// console.log(animals.lastIndexOf('Tiger', 0));
// // Expected output: -1

// //fromIndex is negative

// console.log(animals.lastIndexOf('Dodo', -5));
// // Expected output: -1

// console.log(animals.lastIndexOf('Dodo', -4));
// // Expected output: 0

// console.log(animals.lastIndexOf('Dodo', -3));
// // Expected output: 0

// console.log(animals.lastIndexOf('Dodo', -2));
// // Expected output: 0

// console.log(animals.lastIndexOf('Dodo', -1));
// // Expected output: 3

// console.log(animals.lastIndexOf('Dog', -2));
// // Expected output: -1
