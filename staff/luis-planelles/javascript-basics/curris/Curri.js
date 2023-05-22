class Curri {
  constructor() {
    if (arguments.length === 1 && typeof arguments[0] === 'number') {
      this.length = arguments[0];
    } else {
      for (let i = 0; i < arguments.length; i++) {
        this[i] = arguments[i];
      }
      this.length = arguments.length;
    }
  }

  static of() {
    const result = new Curri();

    for (let i = 0; i < arguments.length; i++) {
      result[i] = arguments[i];

      result.length++;
    }

    return result;
  }

  forEach(callback = false) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  }

  map(callback) {
    const mapped = new Curri();

    for (let i = 0; i < this.length; i++) {
      const element = this[i];

      mapped[mapped.length] = callback(element);
      mapped.length++;
    }

    return mapped;
  }

  at(index) {
    index = index < 0 ? this.length + index : index;
    return this[index];
  }

  concat(curri) {
    let arrayResult = new Curri();

    for (let i = 0; i < this.length; i++) {
      arrayResult[i] = this[i];
      arrayResult.length++;
    }

    for (let i = 0; i < curri.length; i++) {
      arrayResult[arrayResult.length] = curri[i];
      arrayResult.length++;
    }

    return arrayResult;
  }

  every(callback) {
    for (let i = 0; i < this.length; i++) {
      const result = callback(this[i]);
      if (!result) {
        return false;
      }
    }
    return true;
  }

  fill(fillItem, startIndex = 0, endIndex = this.length) {
    startIndex = startIndex < 0 ? this.length + startIndex : startIndex;

    endIndex = endIndex < 0 ? this.length + endIndex : endIndex;
    endIndex = endIndex < this.length ? endIndex : this.length;

    for (let i = startIndex; i < endIndex; i++) {
      this[i] = fillItem;
    }

    return this;
  }

  filter(callback) {
    const filtered = new Curri();
    let index = 0;
    for (let i = 0; i < this.length; i++) {
      const result = callback(this[i]);
      if (result) {
        filtered[index] = this[i];
        index++;
        filtered.length = index;
      }
    }
    return filtered;
  }
  find(callback) {
    for (let i = 0; i < this.length; i++) {
      const result = callback(this[i], i);
      if (result) {
        return this[i];
      }
    }
  }
  findIndex(callback) {
    for (let i = 0; i < this.length; i++) {
      const result = callback(this[i]);
      if (result) {
        return i;
      }
    }
    return -1;
  }

  from(arg, callback) {
    for (let i = 0; i < arg.length; i++) {
      if (callback) {
        this[i] = callback(arg[i]);
      } else {
        this[i] = arg[i];
      }
    }
    this.length = arg.length;
    return this;
  }

  some(callback) {
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i])) {
        return true;
      }
    }
  }

  includes(item) {
    for (let i = 0; i < this.length; i++) {
      if (this[i] === item) {
        return true;
      }
    }
    return false;
  }

  indexOf(matchItem, startPosition = 0) {
    for (let i = startPosition; i < this.length; i++) {
      if (this[i] === matchItem) {
        return i;
      }
    }
    return -1;
  }

  static isCurri(curri) {
    if (
      curri &&
      typeof curri === 'object' &&
      curri.length &&
      !curri.byteLength
    ) {
      return true;
    }
    return false;
  }

  join(slitItem = ',') {
    let resultString = '';

    for (let i = 0; i < this.length; i++) {
      if (i > 0) {
        resultString += slitItem;
      }
      resultString += this[i];
    }
    return resultString;
  }

  lastIndexOf(matchItem, fromIndex = 0) {
    let indexLastItem = -1;

    for (let i = fromIndex; i < this.length; i++) {
      if (this[i] === matchItem) {
        indexLastItem = i;
      }
    }
    return indexLastItem;
  }

  pop() {
    const lastItem = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;

    return lastItem;
  }

  push(...args) {
    for (let i = 0; i < args.length; i++) {
      this[this.length] = args[i];
      this.length++;
    }
    return this.length;
  }

  reduce(callback, initialValue = 0) {
    if (!this.length && !initialValue) throw new Error('TypeError');

    let reduced = initialValue;

    for (let i = 0; i < this.length; i++) {
      const item = this[i];

      if (item && !isNaN(item) && item.length) {
        for (let j = 0; i < item.length; i++) {
          const itemInItem = item[j];
          reduced = callback(reduced, itemInItem, index);
        }
      } else {
        reduced = callback(reduced, item, i);
      }
    }

    return reduced;
  }

  reverse() {
    for (let i = 0; i < this.length / 2; i++) {
      const previousItem = this[i];
      this[i] = this[this.length - 1 - i];
      this[this.length - 1 - i] = previousItem;
    }
    return this;
  }

  shift() {
    const firstItem = this[0];

    for (let i = 0; i < this.length - 1; i++) {
      this[i] = this[i + 1];
    }
    if (this.length) {
      delete this[this.length - 1];
      this.length--;
    }
    return firstItem;
  }

  slice(sliceStart = 0, sliceEnd = false) {
    let curriResult = new Curri();

    if (!arguments.length) {
      return curriResult;
    }

    let index = 0;

    sliceStart = sliceStart < 0 ? this.length + sliceStart : sliceStart;
    sliceEnd = sliceEnd < 0 ? this.length + sliceEnd : sliceEnd;

    for (let i = sliceStart; i < this.length; i++) {
      if (i !== sliceEnd) {
        curriResult[index] = this[i];
        curriResult.length++;
        index++;
      }
    }

    return curriResult;
  }

  splice(start, itemsAdd = false, ...items) {
    let spliced = new Curri();
    start = start < 0 ? this.length + start : start;

    if (itemsAdd) {
      for (i = 0; i < itemsAdd; i++) {
        spliced[i] = this[start + i];
      }
    }
    itemsAdd = !itemsAdd ? start : itemsAdd;

    if (!items.length) {
      for (let i = start; i < this.length - 1; i++) {
        this[i] = this[i + itemsAdd];
      }
      this.length = this.length - itemsAdd;
    } else {
      for (let i = this.length - 1; i >= start; i--) {
        this[i + items.length - itemsAdd] = this[i];
      }
      for (let i = 0; i < items.length; i++) {
        this[start + i] = items[i];
      }
    }

    return spliced;
  }

  toReversed() {
    const reversed = new Curri();
    for (let i = 0; i < this.length; i++) {
      reversed[i] = this[this.length - 1 - i];
      reversed.length++;
    }
    return reversed;
  }

  unshift(...args) {
    const curriShifted = new Curri();
    let index = 0;

    for (let i = 0; i < args.length + this.length; i++) {
      if (i < args.length) {
        curriShifted[i] = args[i];
      } else {
        curriShifted[i] = this[i - args.length];
      }
      curriShifted.length++;
    }
    for (let i = 0; i < curriShifted.length; i++) {
      this[index] = curriShifted[i];
      index++;
    }
    this.length = index;

    return this.length;
  }
}
export default Curri;
