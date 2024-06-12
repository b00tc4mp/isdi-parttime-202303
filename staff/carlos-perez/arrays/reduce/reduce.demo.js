const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = reduce(array1,
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);


const getMax = (a, b) => Math.max(a, b);

// callback is invoked once for element at index 1
console.log(reduce([1, 100], getMax)); // 100

// callback is not invoked
console.log(reduce([50], getMax)); // 50
console.log(reduce([], getMax, 1)); // 1

try {
    reduce([], getMax); // TypeError
}
catch (e) {
    console.log(e.message);
}
