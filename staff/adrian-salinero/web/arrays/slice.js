function slice(array, start = 0, end = array.length) {
  let slicedArray = [];

  //start
  if (start < -array.length) {
    start = 0;
  } else if (start < 0) {
    start = start + array.length;
  }

  //end
  if (end < 0) {
    end = end + array.length;
  } else if (end < -array.length) {
    end = 0;
  } else if (end >= array.length) {
    end = array.length;
  }

  //slice
  for (var i = start; i < end; i++) {
    slicedArray[slicedArray.length] = array[i];
  }

  return slicedArray;
}
