function at(array, index) {
  if (Math.sign(index) === 1) {
    return array[index];
  }
  return array[array.length + index];
}
