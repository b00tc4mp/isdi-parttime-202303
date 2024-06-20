const every = (array, callback) => {
  for (index in array) {
    const result = callback(array[index]);
    if (!result) {
      return false;
    }
  }
  return true;
};
