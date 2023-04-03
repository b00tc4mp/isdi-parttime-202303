function concat(...arrays) {
  const concatenatedArray = [];

  for (var i = 0; i < arrays.length; i++) {
    for (var j = 0; j < arrays[i].length; j++) {
      concatenatedArray[concatenatedArray.length] = arrays[i][j];
    }
  }

  return concatenatedArray;
}
