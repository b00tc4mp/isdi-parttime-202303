function Curri() {
  this.length = 0;
}

Curri.prototype.forEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];

    callback(element);
  }
};

Curri.prototype.map = function map(callback) {
  const mapped = new Curri();

  for (let i = 0; i < this.length; i++) {
    const element = this[i];

    mapped[mapped.length] = callback(element);
    mapped.length++;
  }

  return mapped;
};

Curri.prototype.at = function at(index) {
  index = index < 0 ? this.length + index : index;
  return this[index];
};

Curri.prototype.concat = function concat(curri) {
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
};

Curri.prototype.every = function every(callback) {
  for (let i = 0; i < this.length; i++) {
    const result = callback(this[i]);
    if (!result) {
      return false;
    }
  }
  return true;
};

Curri.prototype.fill = function fill(
  fillItem,
  startIndex = 0,
  endIndex = this.length
) {
  startIndex = startIndex < 0 ? this.length + startIndex : startIndex;

  endIndex = endIndex < 0 ? this.length + endIndex : endIndex;
  endIndex = endIndex < this.length ? endIndex : this.length;

  for (let i = startIndex; i < endIndex; i++) {
    this[i] = fillItem;
  }

  return this;
};

Curri.prototype.filter = function filter(callback) {
  const filtered = new Curri();
  for (let i = 0; i < this.length; i++) {
    const result = callback(this[i]);
    if (result) {
      filtered[i] = this[i];
    }
  }
  return filtered;
};

Curri.prototype.find = function find(callback) {
  for (let i = 0; i < this.length; i++) {
    const result = callback(this[i], i);
    if (result) {
      return this[i];
    }
  }
};

Curri.prototype.findIndex = function findIndex(callback) {
  for (let i = 0; i < this.length; i++) {
    const result = callback(this[i]);
    if (result) {
      return i;
    }
  }
  return -1;
};

Curri.prototype.from = function from(callback) {
  let arrayResult = new Curri();

  if (!this.length) {
    for (let i = 0; i < this[0].length; i++) {
      arrayResult[i] = this[0][i];
    }
    return arrayResult;
  }

  for (let i = 0; i < this.length; i++) {
    arrayResult[i] =
      typeof callback === 'function' ? callback(this[i]) : this[i];
  }
  return arrayResult;
};

Curri.prototype.some = function some(callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      return true;
    }
  }
};

Curri.prototype.includes = function includes(item) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === item) {
      return true;
    }
  }
  return false;
};

Curri.prototype.indexOf = function indexOf(matchItem, startPosition = 0) {
  for (let i = startPosition; i < this.length; i++) {
    if (this[i] === matchItem) {
      return i;
    }
  }
  return -1;
};

Curri.prototype.isArray = function isArray() {
  if (this && typeof this === 'object' && this.length && !this.byteLength) {
    return true;
  }
  return false;
};

Curri.prototype.join = function join(slitItem = ',') {
  let resultString = '';

  for (let i = 0; i < this.length; i++) {
    if (i > 0) {
      resultString += slitItem;
    }
    resultString += this[i];
  }
  return resultString;
};

Curri.prototype.lastIndexOf = function lastIndexOf(matchItem, fromIndex = 0) {
  let indexLastItem = -1;

  for (let i = fromIndex; i < this.length; i++) {
    if (this[i] === matchItem) {
      indexLastItem = i;
    }
  }
  return indexLastItem;
};

Curri.prototype.pop = function pop() {
  const lastItem = this[this.length - 1];
  delete this[this.length - 1];
  this.length--;

  return lastItem;
};

Curri.prototype.push = function push(...args) {
  for (let i = 0; i < args.length; i++) {
    this[this.length] = args[i];
    this.length++;
  }
  return this.length;
};

Curri.prototype.reduce = function reduce(callback, initialValue = 0) {
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
};

Curri.prototype.reverse = function reverse(array) {
  for (let i = 0; i < this.length / 2; i++) {
    const previousItem = this[i];
    this[i] = this[this.length - 1 - i];
    this[this.length - 1 - i] = previousItem;
  }
  return this;
};

Curri.prototype.shift = function shift() {
  const firstItem = this[0];

  for (let i = 0; i < this.length - 1; i++) {
    this[i] = this[i + 1];
  }
  if (this.length) {
    this.length--;
  }

  return firstItem;
};

Curri.prototype.slice = function slice(sliceStart = 0, sliceEnd = false) {
  let curriResult = new Curri();
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
  const iterations = this.length - curriResult.length;

  for (let i = 0; i < iterations; i++) {
    this[i] = curriResult[i];
    curriResult.length++;
    delete this[this.length - 1];
    this.length--;
  }
  return this;
};

Curri.prototype.splice = function splice(start, itemsAdd = false, ...items) {
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
};

Curri.prototype.toReversed = function toReversed() {
  const reversed = new Curri();
  for (let i = 0; i < this.length; i++) {
    reversed[i] = this[this.length - 1 - i];
    reversed.length++;
  }
  return reversed;
};

Curri.prototype.unshift = function unshift(...args) {
  const curriShifted = new Curri();

  for (let i = 0; i < args.length + this.length; i++) {
    if (i < args.length) {
      curriShifted[i] = args[i];
    } else {
      curriShifted[i] = this[i - args.length];
    }
    curriShifted.length++;
  }
  for (let i = 0; i < curriShifted.length; i++) {
    this[i] = curriShifted[i];
  }

  return this.length;
};

export default Curri;
