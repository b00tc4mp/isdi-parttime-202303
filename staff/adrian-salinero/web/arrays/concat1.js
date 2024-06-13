function concat(array1, array2) {
  const concatenatedArray = [];

  for (var i = 0; i < array1.length; i++) {
    concatenatedArray[concatenatedArray.length] = array1[i];
  }

  for (var i = 0; i < array2.length; i++) {
    concatenatedArray[concatenatedArray.length] = array2[i];
  }

  return concatenatedArray;
}
