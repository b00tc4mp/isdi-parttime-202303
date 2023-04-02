const arrayTest = [5, 12, 8, 130, 44];

const at = (array, index) => {
  index = index < 0 ? array.length + index : index;
  return array[index];
};

let index = 2;

console.log(
  `Using an index of ${index} the item returned is ${at(arrayTest, index)}`
);
// Expected output: "Using an index of 2 the item returned is 8"

index = -2;

console.log(
  `Using an index of ${index} item returned is ${at(arrayTest, index)}`
);
// Expected output: "Using an index of -2 item returned is 130"
