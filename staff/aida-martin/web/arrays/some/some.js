function some(array, callback) {
  if (array.length === 0) {
    return false;
  }

  for (const index in array) {
    if (callback(array[index])) {
      return true;
    }
  }
  return false;
}

export default some;
