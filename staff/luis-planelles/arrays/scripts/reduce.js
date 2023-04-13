const reduce = (array, callback, initialValue = 0) => {
  if (!array.length && !initialValue) throw new Error('TypeError');

  let reduced = initialValue;

  for (const index in array) {
    const item = array[index];

    if (item && !isNaN(item) && item.length) {
      for (i in item) {
        const itemInItem = item[i];
        reduced = callback(reduced, itemInItem, index);
      }
    } else {
      reduced = callback(reduced, item, index);
    }
  }

  return reduced;
};
