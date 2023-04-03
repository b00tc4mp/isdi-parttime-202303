//
const reverse = (array) => {
  let reverseIndex = array.length - 1;
  let newArray = [];

  for (let i = 0; i < array.length; i++) {
    newArray[i] = array[reverseIndex];
    reverseIndex--;
  }
  for (let i = 0; i < array.length; i++) {
    array[i] = newArray[i];
  }
  return array;
};
