function shift(array) {
  const firstElem = array[0];

  for (var i = 0; i < array.length - 1; i++) {
    array[i] = array[i + 1];
  }

  array.length = array.length - 1;

  return firstElem;
}
