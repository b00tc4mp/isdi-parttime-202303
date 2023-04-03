//
//
const fill = (array, fillItem, startPosition = 0, endPosition) => {
  for (let i = 0; i < array.length; i++) {
    if (startPosition <= i) {
      array[i] = fillItem;
    }
  }
  return array;
};

let array1 = [1, 2, 3, 4];
console.log(fill(array1, 0, 2, 4));
// Expected output: Array [1, 2, 0, 0]

array1 = [1, 2, 3, 4];
console.log(fill(array1, 5, 1));
// Expected output: Array [1, 5, 5, 5]

array1 = [1, 2, 3, 4];
console.log(fill(array1, 6));
// Expected output: Array [6, 6, 6, 6]
