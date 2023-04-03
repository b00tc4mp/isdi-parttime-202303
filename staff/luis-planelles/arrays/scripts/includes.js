//
const includes = (array, itemCheck) => {
  for (let item of array) {
    if (item === itemCheck) {
      return true;
    }
  }
  return false;
};

const array1 = [1, 2, 3];

console.log(includes(array1, 2));
// Expected output: true

const pets = ["cat", "dog", "bat"];

console.log(includes(pets, "cat"));
// Expected output: true

console.log(includes(pets, "at"));
// Expected output: false
