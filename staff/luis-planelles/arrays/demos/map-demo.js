const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = array1.map((x) => x * 2);

console.log(map1);
// Expected output: Array [2, 8, 18, 32]

const kvArray = [
  { key: 1, value: 10 },
  { key: 2, value: 20 },
  { key: 3, value: 30 },
];

const reformattedArray = map(kvArray, ({ key, value }) => ({ [key]: value }));

console.log(reformattedArray); // [{ 1: 10 }, { 2: 20 }, { 3: 30 }]
console.log(kvArray);
// [
//   { key: 1, value: 10 },
//   { key: 2, value: 20 },
//   { key: 3, value: 30 }
// ]

let numbers = [1, 4, 9];
const doubles = map(numbers, (num) => num * 2);

console.log(doubles); // [2, 8, 18]
console.log(numbers); // [1, 4, 9]

console.log(
  [1, , 3].map((x, index) => {
    console.log(`Visit ${index}`);
    return x * 2;
  })
);
// Visit 0
// Visit 2
// [2, empty, 6]

console.log(map(['1', '2', '3'], parseInt));

const returnInt = (element) => parseInt(element, 10);

console.log(map(['1', '2', '3'], returnInt)); // [1, 2, 3]
// Actual result is an array of numbers (as expected)

// Same as above, but using the concise arrow function syntax
console.log(map(['1', '2', '3'], (str) => parseInt(str))); // [1, 2, 3]

// A simpler way to achieve the above, while avoiding the "gotcha":
console.log(map(['1', '2', '3'], Number)); // [1, 2, 3]

// But unlike parseInt(), Number() will also return a float or (resolved) exponential notation:
console.log(map(['1.1', '2.2e2', '3e300'], Number)); // [1.1, 220, 3e+300]

// For comparison, if we use parseInt() on the array above:
console.log(map(['1.1', '2.2e2', '3e300'], (str) => parseInt(str))); // [1, 2, 3]

numbers = [1, 2, 3, 4];
const filteredNumbers = map(numbers, (num, index) => {
  if (index < 3) {
    return num;
  }
});

// index goes from 0, so the filterNumbers are 1,2,3 and undefined.
console.log(filteredNumbers);
// filteredNumbers is [1, 2, 3, undefined]
console.log(numbers);
// numbers is still [1, 2, 3, 4]
