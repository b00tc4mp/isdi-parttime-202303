//
const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(findIndex(array1, isLargeNumber));
// Expected output: 3

function isPrime(element) {
  if (element % 2 === 0 || element < 2) {
    return false;
  }
  for (let factor = 3; factor <= Math.sqrt(element); factor += 2) {
    if (element % factor === 0) {
      return false;
    }
  }
  return true;
}

console.log(findIndex([4, 6, 8, 9, 12], isPrime)); // -1, not found
console.log(findIndex([4, 6, 7, 9, 12], isPrime)); // 2 (array[2] is 7)

console.log(findIndex([1, , 3], (x) => x === undefined)); // 1
