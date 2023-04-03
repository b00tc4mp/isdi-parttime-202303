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
