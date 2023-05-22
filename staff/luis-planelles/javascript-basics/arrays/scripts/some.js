//
const some = (array, callback) => {
  for (const index in array) {
    if (callback(array[index])) {
      return true;
    }
  }
  return false;
};
