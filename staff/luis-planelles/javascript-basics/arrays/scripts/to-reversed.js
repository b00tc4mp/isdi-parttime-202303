const toReversed = (array) => {
  const reversed = [];
  for (let i = 0; i < array.length; i++) {
    reversed[i] = array[array.length - 1 - i];
  }
  return reversed;
};
