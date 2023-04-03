//
const fill = (array, fillItem, startIndex = 0, endIndex = array.length) => {
  startIndex = startIndex < 0 ? array.length + startIndex : startIndex;

  endIndex = endIndex < 0 ? array.length + endIndex : endIndex;
  endIndex = endIndex < array.length ? endIndex : array.length;

  for (let i = startIndex; i < endIndex; i++) {
    array[i] = fillItem;
  }

  return array;
};
