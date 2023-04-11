export default function toReversed(array) {
  const newArray = [];

  for (let i = 0; i < array.length; i++) {
    newArray[i] = array[array.length - i - 1];
    newArray[newArray.length - i - 1] = array[i];
  }
  return newArray;
}

//nuevo[0] = original[2 (3-0-1)]
//nuevo[2 (3-0-1)] = original[0]
