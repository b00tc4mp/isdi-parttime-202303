const array = [1, 2, 3, 4, 5];

// Checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(array.some(even));
// Expected output: true

function isBiggerThan10(element, index, array) {
    return element > 10;
}
[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true

[2, 5, 8, 1, 4].some(elem => elem > 10);  // false
[12, 5, 8, 1, 4].some(elem => elem > 10); // true

var fruits = ['apple', 'banana', 'mango', 'guava'];

function checkAvailability(arr, val) {
    return arr.some(function (arrVal) {
        return val === arrVal;
    });
}

console.log(checkAvailability(fruits, 'kela'));   // false
console.log(checkAvailability(fruits, 'banana')); // true

function checkAvailability2(arr, val) {
    return arr.some(arrVal => val === arrVal);
}

checkAvailability2(fruits, 'kela');   // false
checkAvailability2(fruits, 'banana'); // true

var TRUTHY_VALUES = [true, 'true', 1];

function getBoolean(value) {
    'use strict';

    if (typeof value === 'string') {
        value = value.toLowerCase().trim();
    }

    return TRUTHY_VALUES.some(function (t) {
        return t === value;
    });
}

getBoolean(false);   // false
getBoolean('false'); // false
getBoolean(1);       // true
getBoolean('true');  // true

