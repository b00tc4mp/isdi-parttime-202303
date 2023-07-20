function indexOf(array, searchElement, fromIndex = 0) {
  if (fromIndex >= array.length) {
    return -1;
  }

  if (fromIndex < 0) {
    for (var i = array.length + fromIndex; i < array.length; i++) {
      if (array[i] === searchElement) {
        return i;
      }
    }
    return -1;
  }

  for (var i = fromIndex; i < array.length; i++) {
    if (array[i] === searchElement) {
      return i;
    }
  }

  return -1;
}
