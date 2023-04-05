//
const array1 = [5, 12, 8, 130, 44];

const found = find(array1, (element) => element > 10);

console.log(found);
// Expected output: 12

const inventory = [
  { name: 'apples', quantity: 2 },
  { name: 'bananas', quantity: 0 },
  { name: 'cherries', quantity: 5 },
];

function isCherries(fruit) {
  return fruit.name === 'cherries';
}

console.log(find(inventory, isCherries));
// { name: 'cherries', quantity: 5 }

const inventory2 = [
  { name: 'apples', quantity: 2 },
  { name: 'bananas', quantity: 0 },
  { name: 'cherries', quantity: 5 },
];

const result = find(inventory2, ({ name }) => name === 'cherries');

console.log(result); // { name: 'cherries', quantity: 5 }

function isPrime(element, index, array) {
  let start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log(find([4, 6, 8, 12], isPrime)); // undefined, not found
console.log(find([4, 5, 8, 12], isPrime)); // 5

// Declare array with no elements at indexes 2, 3, and 4
const array = [0, 1, , , , 5, 6];

// Shows all indexes, not just those with assigned values
find(array, (value, index) => {
  console.log('Visited index', index, 'with value', value);
});
// Visited index 0 with value 0
// Visited index 1 with value 1
// Visited index 2 with value undefined
// Visited index 3 with value undefined
// Visited index 4 with value undefined
// Visited index 5 with value 5
// Visited index 6 with value 6

// Shows all indexes, including deleted
find(array, (value, index) => {
  // Delete element 5 on first iteration
  if (index === 0) {
    console.log('Deleting array[5] with value', array[5]);
    delete array[5];
  }
  // Element 5 is still visited even though deleted
  console.log('Visited index', index, 'with value', value);
});
// Deleting array[5] with value 5
// Visited index 0 with value 0
// Visited index 1 with value 1
// Visited index 2 with value undefined
// Visited index 3 with value undefined
// Visited index 4 with value undefined
// Visited index 5 with value undefined
// Visited index 6 with value 6
