//
const filter = (array, callback) => {
  const filtered = [];
  for (item of array) {
    const result = callback(item);
    if (result) {
      filtered[filtered.length] = item;
    }
    if (item === undefined) {
      break;
    }
  }
  return filtered;
};
