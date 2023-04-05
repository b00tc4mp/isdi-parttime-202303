const array1 = ["a", "b", "c"];
const array2 = ["d", "e", "f"];
const array3 = concat(array1, array2);

console.log(array3);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]

const array4 = ["1", "2", "3"];
const array5 = ["x", "y", "z"];
const array6 = concat(array1, array2, array4, array5);

console.log(array6);
// Expected output: Array ["a", "b", "c", "d", "e", "f", "1", "2", "3", "x", "y", "z"]
