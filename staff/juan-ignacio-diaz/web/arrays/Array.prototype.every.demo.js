const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];
const array2 = [1, 30, 39, 50, 10, 13];

console.log(array1.every(isBelowThreshold));
// Expected output: true

console.log(array2.every(isBelowThreshold));
// Expected output: false