const map = (array, callback) => {
  let arrayResult = [];
  for (i = 0; i < array.length; i++) {
    arrayResult[i] = callback(array[i], i);
  }

  return arrayResult;
};
