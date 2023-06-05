const array = [1, 2, 3, 4, 5];

// Checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(some(array,even));
// Expected output: true

var fruits = ['apple', 'banana', 'mango', 'guava'];

function checkAvailability(arr, val) {
    return some(arr,function (arrVal) {
        return val === arrVal;
    });
}

console.log(checkAvailability(fruits, 'kela'));   // false
console.log(checkAvailability(fruits, 'banana')); // true