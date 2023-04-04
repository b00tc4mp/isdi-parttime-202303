//
const some = (array, callback) => {
  for (item of array) {
    const result = callback(item);
    if (result) {
      return true;
    }
  }
  return false;
};
