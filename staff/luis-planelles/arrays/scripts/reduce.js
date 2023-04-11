const reduce = (array, callback, initialValue = 0, index = 0) => {
  if (!array.length && !initialValue) throw new Error('TypeError');

  let reduced = initialValue;

  for (let item of array) {
    reduced = callback(reduced, item, index);
    index++;
  }
  return reduced;
};
