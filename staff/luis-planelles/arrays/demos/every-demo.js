//
const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(every(array1, isBelowThreshold));
// Expected output: true

function isBigEnough(element, index, array) {
  return element >= 10;
}
console.log(every([12, 5, 8, 130, 44], isBigEnough)); // false
console.log(every([12, 54, 18, 130, 44], isBigEnough)); // true

const isSubset = (array1, array2) =>
  every(array2, (element) => array1.includes(element));

console.log(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 7, 6])); // true
console.log(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 8, 7])); // false

console.log(every([1, , 3], (x) => x !== undefined)); // true
console.log(every([2, , 2], (x) => x === 2)); // true
