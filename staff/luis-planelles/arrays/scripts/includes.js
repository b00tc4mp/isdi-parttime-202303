//
const includes = (array, itemCheck) => {
  for (let item of array) {
    if (item === itemCheck) {
      return true;
    }
  }
  return false;
};
