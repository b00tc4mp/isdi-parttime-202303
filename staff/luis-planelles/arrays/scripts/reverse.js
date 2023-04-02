const reverse = (array) => {
  let reverseIndex = array.length - 1;
  let newArray = [];
  for (i = 0; i < array.length; i++) {
    newArray[i] = array[reverseIndex];
    reverseIndex--;
  }
  for (i = 0; i < array.length; i++) {
    array[i] = newArray[i];
  }
  return array;
};

const array1 = ["one", "two", "three"];

const reversed = reverse(array1);
console.log(reversed);
// Expected output:  ["three", "two", "one"]

// Careful: reverse is destructive -- it changes the original array.
console.log(array1);
// Expected output: ["three", "two", "one"]
