const splice = (array, start, itemsAdd = false, ...items) => {
  let spliced = [];
  start = start < 0 ? array.length + start : start;

  if (itemsAdd) {
    for (i = 0; i < itemsAdd; i++) {
      spliced[i] = array[start + i];
    }
  }
  itemsAdd = !itemsAdd ? start : itemsAdd;

  if (!items.length) {
    for (let i = start; i < array.length - 1; i++) {
      array[i] = array[i + itemsAdd];
    }
    array.length = array.length - itemsAdd;
  } else {
    for (let i = array.length - 1; i >= start; i--) {
      array[i + items.length - itemsAdd] = array[i];
    }
    for (let i = 0; i < items.length; i++) {
      array[start + i] = items[i];
    }
  }

  return spliced;
};
