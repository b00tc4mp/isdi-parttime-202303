
const at = (array, index) => {
  index = index < 0 ? array.length + index : index;
  return array[index];
};
