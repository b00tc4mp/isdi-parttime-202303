

const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const result = array1.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);

console.log(result);
// Expected output: 10
