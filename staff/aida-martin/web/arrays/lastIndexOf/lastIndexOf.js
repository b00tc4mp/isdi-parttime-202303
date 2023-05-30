function lastIndexOf(array, element, index = array.length - 1) {
  if (index < 0) index = array.length + index;

  for (let i = index; i < array.length; i--) {
    if (array[i] === element) {
      return i;
    }
  }
  return -1;
}
