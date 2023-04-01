var array = [2, 5, 9, 2];
console.log(array.lastIndexOf(2));     // 3
console.log(array.lastIndexOf(7));     // -1
console.log(array.lastIndexOf(2, 3));  // 3
console.log(array.lastIndexOf(2, 2));  // 0
console.log(array.lastIndexOf(2, -2)); // 0
console.log(array.lastIndexOf(2, -1)); // 3