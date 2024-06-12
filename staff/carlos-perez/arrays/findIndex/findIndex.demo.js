const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(findIndex(array1, isLargeNumber));
// Expected output: 3

function isPrime(element, index, array) {
    var start = 2;
    while (start <= Math.sqrt(element)) {
        if (element % start < 1) {
            return false;
        } else {
            start++;
        }
    }
    return element > 1;
}

console.log(findIndex([4, 6, 8, 12], isPrime)); // -1, no encontrado
console.log(findIndex([4, 6, 7, 12], isPrime)); // 2

const fruits = ["apple", "banana", "cantaloupe", "blueberries", "grapefruit"];

const index = findIndex(fruits, fruit => fruit === "blueberries");

console.log(index); // 3
console.log(fruits[index]); // blueberries

