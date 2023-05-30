function every(array, callback) {
  if (array.length === 0) {
    return true;
  }

  for (const element of array) {
    if (!callback(element)) {
      return false;
    }
  }
  return true;
}

export default every;
