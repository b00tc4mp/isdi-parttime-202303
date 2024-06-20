//
const shift = (array) => {
  const firstItem = array[0];

  for (let i = 0; i < array.length - 1; i++) {
    array[i] = array[i + 1];
  }
  if (array.length) {
    array.length--;
  }

  return firstItem;
};
