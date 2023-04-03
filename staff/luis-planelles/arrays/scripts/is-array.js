//
const isArray = (array) => {
  if (array && typeof array === "object" && array.length && !array.byteLength) {
    return true;
  }
  return false;
};

console.log(isArray([1, 3, 5]));
// Expected output: true

console.log(isArray("[]"));
// Expected output: false

console.log(isArray(new Array(5)));
// Expected output: true

console.log(isArray(new Int16Array([15, 33])));
// Expected output: false

console.log(isArray({ test: "test", 1: 1 }));
// Expected output: false

console.log(isArray(null));
// Expected output: false

const happyPath = [
  1,
  "a",
  ["a", "b", "c"],
  [1, 2, 3],
  {},
  { a: "a", 1: 1 },
  (a, b) => {
    return a + b;
  },
  ,
  null,
  undefined,
  0,
];

console.log(isArray(happyPath));
// Expected output: true
