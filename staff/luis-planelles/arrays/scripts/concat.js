const concat = (...args) => {
  let newArray = [];

  for (let arg of args) {
    if (arg.length) {
      for (a of arg) newArray[newArray.length] = a;
    } else {
      newArray[newArray.length] == arg;
    }
  }
  return newArray;
};

const array1 = ["a", "b", "c"];
const array2 = ["d", "e", "f"];
const array3 = concat(array1, array2);

console.log(array3);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]

const letters = ["a", "b", "c"];
const numbers = [1, 2, 3];

const alphaNumeric = letters.concat(numbers);
console.log(alphaNumeric);
// results in ['a', 'b', 'c', 1, 2, 3]

const num1 = [1, 2, 3];
const num2 = [4, 5, 6];
const num3 = [7, 8, 9];

const numbers2 = concat(num1, num2, num3);

console.log(numbers2);
// results in [1, 2, 3, 4, 5, 6, 7, 8, 9]

const number1 = [[1]];
const number2 = [2, [3]];

const numbers3 = concat(number1, number2);

console.log(numbers3);
// results in [[1], 2, [3]]

// modify the first element of num1
number1[0].push(4);

console.log(numbers3);
// results in [[1, 4], 2, [3]]
