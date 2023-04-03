//
const reverse = (array) => {
  for (let i = 0; i < array.length / 2; i++) {
    let item = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = item;
  }
  return array;
};
