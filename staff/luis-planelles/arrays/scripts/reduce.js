const reduce = (array, callback, initialValue) => {
  let reduced = initialValue;

  for (let item of array) {
    reduced = callback(reduced, item);
  }
  return reduced;
};
