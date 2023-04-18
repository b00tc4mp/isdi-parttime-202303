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

export default Curri;
