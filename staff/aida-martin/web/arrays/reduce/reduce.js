export default function reduce(array, callback, initialValue) {
  let accumulator = initialValue;
  let currentValue;

  for (let i = 0; i < array.length; i++) {
    currentValue = array[i];
    accumulator = callback(accumulator, currentValue, initialValue);
  }
  return accumulator;
}
