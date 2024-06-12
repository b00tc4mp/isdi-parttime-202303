const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);
// Expected output: 10


const getMax = (a, b) => Math.max(a, b);

// callback is invoked for each element in the array starting at index 0
console.log([1, 100].reduce(getMax, 50)); // 100
console.log([50].reduce(getMax, 10)); // 50

// callback is invoked once for element at index 1
console.log([1, 100].reduce(getMax)); // 100

// callback is not invoked
console.log([50].reduce(getMax)); // 50
console.log([].reduce(getMax, 1)); // 1

try{[].reduce(getMax);} // TypeError
catch(e){
    console.log(e.message);
}
