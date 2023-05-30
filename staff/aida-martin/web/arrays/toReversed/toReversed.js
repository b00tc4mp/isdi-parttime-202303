export default function toReversed(array) {
  const newArray = [];

  for (let i = 0; i < array.length; i++) {
    newArray[i] = array[array.length - i - 1];
    newArray[newArray.length - i - 1] = array[i];
  }
  return newArray;
}
