const array = [1, 2, 3, 4, 5];

// Checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(some(array, even));
// Expected output: true

function isBiggerThan10(element, index, array) {
  return element > 10;
}

console.log(some([2, 5, 8, 1, 4], isBiggerThan10)); // false
console.log(some([12, 5, 8, 1, 4], isBiggerThan10)); // true

console.log(some([2, 5, 8, 1, 4], (x) => x > 10)); // false
console.log(some([12, 5, 8, 1, 4], (x) => x > 10)); // true

const fruits = ['apple', 'banana', 'mango', 'guava'];

function checkAvailability(arr, val) {
  return some(fruits, (arrVal) => val === arrVal);
}

console.log(checkAvailability(fruits, 'kela')); // false
console.log(checkAvailability(fruits, 'banana')); // true

const TRUTHY_VALUES = [true, 'true', 1];

function getBoolean(value) {
  if (typeof value === 'string') {
    value = value.toLowerCase().trim();
  }

  return some(TRUTHY_VALUES, (t) => t === value);
}

console.log(getBoolean(false)); // false
console.log(getBoolean('false')); // false
console.log(getBoolean(1)); // true
console.log(getBoolean('true')); // true
