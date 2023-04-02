function unshift(array, ...elements) {
  const length = array.length + elements.length;

  for (let i = length - 1; i > 0; i--) {
    array[i] = array[i - elements.length];
  }

  for (let j = 0; j < elements.length; j++) {
    array[j] = elements[j];
  }

  return array.length;
}
