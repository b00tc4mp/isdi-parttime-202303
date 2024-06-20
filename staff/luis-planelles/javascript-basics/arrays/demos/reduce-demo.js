const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = reduce(
  array1,
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);
// Expected output: 10

const getMax = (a, b) => Math.max(a, b);

console.log(reduce([1, 100], getMax, 50)); // 100
console.log(reduce([50], getMax, 10)); // 50

// callback is invoked once for element at index 1
console.log(reduce([1, 100], getMax)); // 100

// callback is not invoked
console.log(reduce([50], getMax)); // 50
console.log(reduce([], getMax, 1)); // 1

// console.log(reduce([], getMax)); // TypeError

const array = [15, 16, 17, 18, 19];

function reducer(accumulator, currentValue, index) {
  const returns = accumulator + currentValue;
  console.log(
    `accumulator: ${accumulator}, currentValue: ${currentValue}, index: ${index}, returns: ${returns}`
  );
  return returns;
}

console.log(reduce(array, reducer)); // 85

const objects = [{ x: 1 }, { x: 2 }, { x: 3 }];
const sum = reduce(
  objects,
  (accumulator, currentValue) => accumulator + currentValue.x,
  0
);

console.log(sum); // 6

const flattened = [
  [0, 1],
  [2, 3],
  [4, 5],
];

const reduceResult = reduce(
  flattened,
  (accumulator, currentValue) => accumulator.concat(currentValue),
  []
);
console.log(reduceResult);
// flattened is [0, 1, 2, 3, 4, 5]

const names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

const countedNames = reduce(
  names,
  (allNames, name) => {
    const currCount = allNames[name] ?? 0;
    return {
      ...allNames,
      [name]: currCount + 1,
    };
  },
  {}
);

console.log(countedNames);
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }

const people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 },
];

function groupBy(objectArray, property) {
  return reduce(
    objectArray,
    (acc, obj) => {
      const key = obj[property];
      const curGroup = acc[key] ?? [];

      return { ...acc, [key]: [...curGroup, obj] };
    },
    {}
  );
}

const groupedPeople = groupBy(people, 'age');
console.log(groupedPeople);
// {
//   20: [
//     { name: 'Max', age: 20 },
//     { name: 'Jane', age: 20 }
//   ],
//   21: [{ name: 'Alice', age: 21 }]
// }

// friends - an array of objects
// where object field "books" is a list of favorite books
const friends = [
  {
    name: 'Anna',
    books: ['Bible', 'Harry Potter'],
    age: 21,
  },
  {
    name: 'Bob',
    books: ['War and peace', 'Romeo and Juliet'],
    age: 26,
  },
  {
    name: 'Alice',
    books: ['The Lord of the Rings', 'The Shining'],
    age: 18,
  },
];

// allbooks - list which will contain all friends' books +
// additional list contained in initialValue
const allbooks = reduce(
  friends,
  (accumulator, currentValue) => [...accumulator, ...currentValue.books],
  ['Alphabet']
);
console.log(allbooks);
// [
//   'Alphabet', 'Bible', 'Harry Potter', 'War and peace',
//   'Romeo and Juliet', 'The Lord of the Rings',
//   'The Shining'
// ]

const myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd'];
const myArrayWithNoDuplicates = reduce(
  myArray,
  (accumulator, currentValue) => {
    if (!accumulator.includes(currentValue)) {
      return [...accumulator, currentValue];
    }
    return accumulator;
  },
  []
);

console.log(myArrayWithNoDuplicates);
// ['a', 'b', 'c', 'e', 'd']

const numbers = [-5, 6, 2, 0];

const doubledPositiveNumbers = reduce(
  numbers,
  (accumulator, currentValue) => {
    if (currentValue > 0) {
      const doubled = currentValue * 2;
      return [...accumulator, doubled];
    }
    return accumulator;
  },
  []
);

console.log(doubledPositiveNumbers); // [12, 4]

/**
 * Chain a series of promise handlers.
 *
 * @param {array} arr - A list of promise handlers, each one receiving the
 * resolved result of the previous handler and returning another promise.
 * @param {*} input - The initial value to start the promise chain
 * @return {Object} - Final promise with a chain of handlers attached
 */
function runPromiseInSequence(arr, input) {
  return reduce(
    arr,
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
    Promise.resolve(input)
  );
}

// promise function 1
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

// function 3 - will be wrapped in a resolved promise by .then()
function f3(a) {
  return a * 3;
}

// promise function 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}

const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10).then(console.log); // 1200

const double = (x) => 2 * x;
const triple = (x) => 3 * x;
const quadruple = (x) => 4 * x;

// Function composition enabling pipe functionality
const pipe =
  (...functions) =>
  (initialValue) =>
    reduce(functions, (acc, fn) => fn(acc), initialValue);

// Composed functions for multiplication of specific values
const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(quadruple, quadruple);
const multiply24 = pipe(double, triple, quadruple);

// Usage
console.log(multiply6(6)); // 36
console.log(multiply9(9)); // 81
console.log(multiply16(16)); // 256
console.log(multiply24(10)); // 240

console.log(reduce([1, 2, , 4], (a, b) => a + b)); // 7
console.log(reduce([1, 2, undefined, 4], (a, b) => a + b)); // NaN
