function indexOf(array, element, index = 0) {
  if (Math.sign(index) === -1) index = array.length + index;

  for (let i = index; i < array.length; i++) {
    if (array[i] === element) {
      return i;
    }
  }
  return -1;
}
