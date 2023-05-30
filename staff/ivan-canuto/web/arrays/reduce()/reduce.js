const reduce = (array, callback, initialValue) => {
  let accumulator = initialValue;

  for (let i = 0; i < array.length; i++) {
    if (initialValue === undefined) {
      accumulator = array[i];
      initialValue = true;
      continue;
    }
    let currentValue = array[i];
    accumulator = callback(accumulator, currentValue);
  }
  return accumulator;
};
