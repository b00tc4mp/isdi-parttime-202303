//
const arrayTest = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(indexOf(arrayTest, 'bison'));
// Expected output: 1

// Start from index 2
console.log(indexOf(arrayTest, 'bison', 2));
// Expected output: 4

console.log(indexOf(arrayTest, 'giraffe'));
// Expected output: -1
