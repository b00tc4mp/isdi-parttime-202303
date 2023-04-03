//
const pop = (array) => {
  const lastItem = array[array.length - 1];
  array.length--;

  return lastItem;
};
