//
const find = (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    const result = callback(array[i], i);
    if (result) {
      return array[i];
    }
  }
};
