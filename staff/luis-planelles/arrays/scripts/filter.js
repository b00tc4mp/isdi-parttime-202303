//
const filter = (array, callback) => {
  let arrayResult = [];
  for (item of array) {
    const result = callback(item);
    if (result) {
      arrayResult[arrayResult.length] = item;
    }
    if (item === undefined) {
      break;
    }
  }
  return arrayResult;
};
