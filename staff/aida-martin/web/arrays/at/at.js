function at(array, index) {
  if (index < 0) {
    return array[array.length + index];
  }
  return array[index];
}
