function fill(array, value, start = 0, end = array.length) {
  if (start < 0) start = array.length + start;

  if (end < 0) end = array.length + end;

  for (let i = start; i < end; i++) {
    array[i] = value;
  }
  return array;
}
