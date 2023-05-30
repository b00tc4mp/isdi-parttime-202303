function slice(array, start = 0, end = array.length) {
  let arrayCopy = [...array];
  let newArray = [];

  if (start < 0) start = array.length + start;

  if (end < 0) end = array.length + end;

  if (start > array.length) return newArray;

  if (end > array.length) end = array.length;

  for (let i = start; i < end; i++) {
    newArray[newArray.length] = arrayCopy[i];
  }
  return newArray;
}
