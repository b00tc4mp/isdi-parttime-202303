function fill(array, value, start = 0, end = array.length) {
  //Start
  if (start < -array.length) {
    start = 0;
  } else if (start < 0) {
    start = start + array.length;
  } else if (start >= array.length) {
    return array;
  }

  //End
  if (end < 0) {
    end = end + array.length;
  } else if (end < -array.length) {
    end = 0;
  } else if (end >= array.length) {
    end = array.length;
  }

  //Replace values
  for (var i = start; i < end; i++) {
    array[i] = value;
  }

  return array;
}
