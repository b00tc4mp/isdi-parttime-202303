import reduce from "./reduce.js";

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

// EXTRA:
const array2 = [1, 2, 3, 4, 5, 6, 7];

const initialValue2 = 2;
const sumWithInitial2 = reduce(
  array2,
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue2
);

console.log(sumWithInitial2);
// Expected output: 30

// EXTRA:
const array3 = [1, 2, 3, 4, 5, -6];

const initialValue3 = -5;
const subtractionWithInitial = reduce(
  array3,
  (accumulator, currentValue) => accumulator - currentValue,
  initialValue3
);

console.log(subtractionWithInitial);
// Expected output: -14
