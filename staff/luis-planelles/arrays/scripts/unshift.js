//
const unshift = (array, ...args) => {
  let argumentsArray = [];

  for (let i = 0; i < array.length + args.length; i++) {
    argumentsArray[i] = args[i];
  }
  for (let i = 0; i < array.length; i++) {
    argumentsArray[args.length + i] = array[i];
  }
  for (let i = 0; i < argumentsArray.length; i++) {
    array[i] = argumentsArray[i];
  }

  return argumentsArray.length;
};

let numbers = [1, 2, 3];
const unshiftResult = unshift(numbers, 4, 5);

console.log(numbers);
// Expected output: 5

console.log(unshiftResult);
// Expected output: Array [4, 5, 1, 2, 3]

let arr = [4, 5, 6];

arr.unshift(1, 2, 3);
console.log(arr);
// [1, 2, 3, 4, 5, 6]

arr = [4, 5, 6]; // resetting the array

unshift(arr, 1);
unshift(arr, 2);
unshift(arr, 3);

console.log(arr);
// [3, 2, 1, 4, 5, 6]

arr = [1, 2];

console.log(unshift(arr, 0)); // result of the call is 3, which is the new array length
console.log(arr);
// arr is [0, 1, 2]

console.log(unshift(arr, -2, -1)); // the new array length is 5
console.log(arr);
// arr is [-2, -1, 0, 1, 2]

console.log(unshift(arr, [-4, -3])); // the new array length is 6
console.log(arr);
// arr is [[-4, -3], -2, -1, 0, 1, 2]

console.log(unshift(arr, [-7, -6], [-5])); // the new array length is 8
console.log(arr);
// arr is [ [-7, -6], [-5], [-4, -3], -2, -1, 0, 1, 2 ]
