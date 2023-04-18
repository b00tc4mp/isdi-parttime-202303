//
const indexOf = (array, matchItem, startPosition = 0) => {
  for (let i = startPosition; i < array.length; i++) {
    if (array[i] === matchItem) {
      return i;
    }
  }
  return -1;
};
