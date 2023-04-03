function reverse(array) {
  let reversedArray = [];

  for (var i = array.length - 1; i >= 0; i--) {
    reversedArray[reversedArray.length] = array[i];
  }

  return reversedArray;
}
