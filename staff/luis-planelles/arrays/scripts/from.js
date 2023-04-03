//
const from = (iterable, functionAdded) => {
  let arrayResult = [];
  for (let i = 0; i < iterable.length; i++) {
    arrayResult[i] = functionAdded ? functionAdded(iterable[i]) : iterable[i];
  }
  return arrayResult;
};

console.log(from("foo"));
// Expected output: Array ["f", "o", "o"]

console.log(from([1, 2, 3], (x) => x + x));
// Expected output: Array [2, 4, 6]
