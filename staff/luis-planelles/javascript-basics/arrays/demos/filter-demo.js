//
let words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = filter(words, (word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]

function isBigEnough(value) {
  return value >= 10;
}

const filtered = filter([12, 5, 8, 130, 44], isBigEnough);
console.log(filtered);
// filtered is [12, 130, 44]

const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function isPrime(num) {
  for (let i = 2; num > i; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
}

console.log(filter(array, isPrime)); // [2, 3, 5, 7, 11, 13]

const arr = [
  { id: 15 },
  { id: -1 },
  { id: 0 },
  { id: 3 },
  { id: 12.2 },
  {},
  { id: null },
  { id: NaN },
  { id: 'undefined' },
];

let invalidEntries = 0;

function filterByID(item) {
  if (Number.isFinite(item.id) && item.id !== 0) {
    return true;
  }
  invalidEntries++;
  return false;
}

const arrByID = filter(arr, filterByID);

console.log('Filtered Array\n', arrByID);
// Filtered Array
// [{ id: 15 }, { id: -1 }, { id: 3 }, { id: 12.2 }]

console.log('Number of Invalid Entries =', invalidEntries);
// Number of Invalid Entries = 5

const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

/**
 * Filter array items based on search criteria (query)
 */
function filterItems(arr, query) {
  return filter(arr, (el) => el.toLowerCase().includes(query.toLowerCase()));
}

console.log(filterItems(fruits, 'ap')); // ['apple', 'grapes']
console.log(filterItems(fruits, 'an')); // ['banana', 'mango', 'orange']

console.log(filter([1, , undefined], (x) => x === undefined)); // [undefined]
console.log(filter([1, , undefined], (x) => x !== 2)); // [1, undefined]
