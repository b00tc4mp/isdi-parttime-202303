function concat(...arrays) {
  let newArray = [];

  for (let i = 0; i < arrays.length; i++) {
    for (let j = 0; j < arrays[i].length; j++) {
      const element = arrays[i][j];

      newArray[newArray.length] = element;
    }
  }
  return newArray;
}
