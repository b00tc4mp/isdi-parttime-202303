//
const lastIndexOf = (array, matchItem, fromIndex = 0) => {
  indexLastItem = -1;
  for (i = fromIndex; i < array.length; i++) {
    if (array[i] === matchItem) {
      indexLastItem = i;
    }
  }
  return indexLastItem;
};

const animals = ["Dodo", "Tiger", "Penguin", "Dodo"];

console.log(lastIndexOf(animals, "Dodo"));
// Expected output: 3

console.log(lastIndexOf(animals, "Tiger"));
// Expected output: 1

console.log(lastIndexOf(animals, "Duck"));
// Expected output: -1
