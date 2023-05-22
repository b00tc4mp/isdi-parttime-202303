//
const lastIndexOf = (array, matchItem, fromIndex = 0) => {
  let indexLastItem = -1;

  for (let i = fromIndex; i < array.length; i++) {
    if (array[i] === matchItem) {
      indexLastItem = i;
    }
  }
  return indexLastItem;
};
