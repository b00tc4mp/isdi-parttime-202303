//
const some = (array, callback) => {
  for (item of array) {
    if (item === undefined) {
      continue;
    }
    const result = callback(item);
    if (result) {
      return true;
    }
  }
  return false;
};
