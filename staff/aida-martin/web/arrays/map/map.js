function map(array, callback) {
  let newArray = [];

  for (const element of array) {
    newArray[newArray.length] = callback(element);
  }
  return newArray;
}

export default map;
