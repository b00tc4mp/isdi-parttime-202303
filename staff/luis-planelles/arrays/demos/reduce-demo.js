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

console.log(reduce(array, reducer));
