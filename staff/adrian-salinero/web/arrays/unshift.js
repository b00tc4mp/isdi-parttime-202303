function shift(array, ...elems) {
  array.length = array.length + elems.length;

  for (var i = array.length; i <= 0; i--) {
    array[i] = array[i - elems.length];
  }

  for (var i = 0; i <= elems.length; i++) {
    array[i] = elems[i];
  }

  return array.length;
}
