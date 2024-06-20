import filter from './arrays.prototype.filter.mjs'

const wordsLongerThanSix = (element) => element.length > 6

const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(filter(words, wordsLongerThanSix))
console.log(result);
console.log(words)
// Expected output: Array ["exuberant", "destruction", "present"]

console.log('**************** EXAMPLE 2 ****************')

const isBigEnough = (value) => value >= 10

const filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]

console.log(filter([12, 5, 8, 130, 44], isBigEnough))
console.log(filtered)

console.log('**************** EXAMPLE 3 ****************')

const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function isPrime(num) {
  for (let i = 2; num > i; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
}

console.log(array.filter(isPrime)); // [2, 3, 5, 7, 11, 13]
console.log(filter(array, isPrime))

console.log('**************** EXAMPLE 4 ****************')

const arr = [
    { id: 15 },
    { id: -1 },
    { id: 0 },
    { id: 3 },
    { id: 12.2 },
    {},
    { id: null },
    { id: NaN },
    { id: "undefined" },
  ];
  
  let invalidEntries = 0;
  
  function filterByID(item) {
    if (Number.isFinite(item.id) && item.id !== 0) {
      return true;
    }
    invalidEntries++;
    return false;
  }
  
  const arrByID = arr.filter(filterByID);
  
  console.log("Filtered Array\n", arrByID);
  // Filtered Array
  // [{ id: 15 }, { id: -1 }, { id: 3 }, { id: 12.2 }]

  invalidEntries = 0 //reseting counter

  console.log(filter(arr, filterByID))

  
  console.log("Number of Invalid Entries =", invalidEntries);
  // Number of Invalid Entries = 5

  const prueba1 = [1, 2, 3, , 5]

  const notOne = (element) => element !== 1

  console.log(filter(prueba1, notOne))
  console.log(prueba1.filter(notOne))

