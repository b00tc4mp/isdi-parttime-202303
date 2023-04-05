function splice(array, start, itemsAdd, ...items) {
    let toSplice = [];
    start = start < 0 ? array.length + start : start;
    itemsAdd = !itemsAdd ? start : itemsAdd;
    for (i = 0; i < itemsAdd; i++) {
      toSplice[i] = array[start + i];
    }
  
    if (!items.length) {
      for (let i = start; i < array.length - 1; i++) {
        array[i] = array[i + itemsAdd];
      }
      array.length = array.length - itemsAdd;
    } else {
      for (let i = array.length - 1; i >= start; i--) {
        const element = array[i];
        array[i + items.length - itemsAdd] = element;
      }
      for (let i = 0; i < items.length; i++) {
        array[start + i] = items[i];
      }
    }
  
    if (toSplice.length) {
      return toSplice;
    }
    return [];
  }