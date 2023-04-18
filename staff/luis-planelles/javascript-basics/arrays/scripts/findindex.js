//
const findIndex = (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    const result = callback(array[i]);
    if (result) {
      return i;
    }
  }
  return -1;
};
