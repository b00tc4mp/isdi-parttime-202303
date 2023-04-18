//
const map = (array, callback) => {
  const mapped = [];
  for (i = 0; i < array.length; i++) {
    mapped[i] = callback(array[i], i);
  }

  return mapped;
};
