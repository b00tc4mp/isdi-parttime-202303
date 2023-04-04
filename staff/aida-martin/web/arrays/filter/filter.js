function filter(array, callback) {
  let newArray = [];

  for (const element of array) {
    if (callback(element)) {
      newArray[newArray.length] = element;
    }
  }
  return newArray;
}

export default filter;
