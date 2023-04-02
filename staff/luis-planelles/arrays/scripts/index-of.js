const arrayTest = ["ant", "bison", "camel", "duck", "bison"];

const indexOf = (array, matchItem, startPosition = 0) => {
  for (let i = startPosition; i < array.length; i++) {
    if (array[i] === matchItem) {
      return i;
    }
  }
  return -1;
};

console.log(indexOf(arrayTest, "bison"));
// Expected output: 1

// Start from index 2
console.log(indexOf(arrayTest, "bison", 2));
// Expected output: 4

console.log(indexOf(arrayTest, "giraffe"));
// Expected output: -1
