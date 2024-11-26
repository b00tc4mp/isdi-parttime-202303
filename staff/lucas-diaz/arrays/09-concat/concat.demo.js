const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];

console.log(concat(array1, array2)); // new arr

console.log(array1) // no muta 
console.log(array2) // no muta 

// Expected output: Array ["a", "b", "c", "d", "e", "f"]

//------------------------------------------------------------------------------


const letters = ['a', 'b', 'c'];
const numbers = [1, 2, 3];

console.log(concat(letters, numbers));
// result in ['a', 'b', 'c', 1, 2, 3]

//------------------------------------------------------------------------------


const num1 = [1, 2, 3];
const num2 = [4, 5, 6];
const num3 = [7, 8, 9];

const numbers2 = num1.concat(num2, num3);

console.log(numbers2);
// results in [1, 2, 3, 4, 5, 6, 7, 8, 9]



var alpha = ['a', 'b', 'c'];

var alphaNumeric = alpha.concat(1, [2, 3]);

console.log(alphaNumeric);
// Da como resultado: ['a', 'b', 'c', 1, 2, 3]


// Concatenando arrays anidados
