function lastIndexOf(array, searchElement, fromIndex) {
  if (fromIndex < -array.length) {
    return -1;
  } else if (fromIndex === undefined || fromIndex >= array.length) {
    for (var i = array.length - 1; i >= 0; i--) {
      if (array[i] === searchElement) {
        return i;
      }
    }
    return -1;
  } else if (fromIndex >= 0) {
    for (var i = fromIndex; i >= 0; i--) {
      if (array[i] === searchElement) {
        return i;
      }
    }
    return -1;
  } else if (fromIndex < 0) {
    for (var i = array.length + fromIndex; i >= 0; i--) {
      if (array[i] === searchElement) {
        return i;
      }
    }
    return -1;
  }
}
