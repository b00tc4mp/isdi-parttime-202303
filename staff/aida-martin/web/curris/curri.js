function curri() {
  this.length = 0;
}

curri.prototype.forEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];

    callback(element);
  }
};

curri.prototype.map = function (callback) {
  const mapped = new curri();

  for (let i = 0; i < this.length; i++) {
    const element = this[i];

    mapped[mapped.length] = callback(element);
    mapped.length++;
  }

  return mapped;
};

// TODO implement more Curri methods (same as Array methods)

curri.prototype.at = function at(index) {
  if (index < 0) {
    return this[this.length + index];
  }
  return this[index];
};

curri.prototype.concat = function (curri2) {
  const concatted = new curri();

  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    concatted[concatted.length] = element;
    concatted.length++;
  }

  for (let i = 0; i < curri2.length; i++) {
    const element2 = curri2[i];
    concatted[concatted.length] = element2;
    concatted.length++;
  }
  return concatted;
};

curri.prototype.every = function (callback) {
  if (this.length === 0) {
    return true;
  }

  for (let i = 0; i < this.length; i++) {
    const element = this[i];

    if (!callback(element)) {
      return false;
    }
  }

  return true;
};

curri.prototype.fill = function (value, start = 0, end = this.length) {
  if (start < 0) start = this.length + start;

  if (end < 0) end = this.length + end;

  for (let i = start; i < end; i++) {
    this[i] = value;
  }
  return this;
};

curri.prototype.filter = function (callback) {
  let filtered = new curri();

  for (let i = 0; i < this.length; i++) {
    const element = this[i];

    if (callback(element)) {
      filtered[filtered.length] = element;
      filtered.length++;
    }
  }
  return filtered;
};

curri.prototype.find = function (callback) {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];

    if (callback(element)) {
      return element;
    }
  }
  return undefined;
};

curri.prototype.findIndex = function (callback) {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];

    if (callback(element)) {
      return i;
    }
  }
  return -1;
};

curri.prototype.includes = function (item) {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];

    if (item === element) {
      return true;
    }
  }
  return false;
};

curri.prototype.indexOf = function (element, index = 0) {
  if (index < 0) index = this.length + index;

  for (let i = index; i < this.length; i++) {
    if (this[i] === element) {
      return i;
    }
  }
  return -1;
};

// curri.prototype.isArray = function () {
//   if (this === null) return false;

//   if (typeof this !== "object") return false;

//   return `${this}` !== "[object Object]";
// };

curri.prototype.join = function (separator = ",") {
  let result = "";

  for (let i = 0; i < this.length - 1; i++) {
    result += `${this[i]}${separator}`;
  }

  return `${result}${this[this.length - 1]}`;
};

curri.prototype.lastIndexOf = function (element, index = this.length - 1) {
  if (index < 0) index = this.length + index;

  for (let i = index; i < this.length; i--) {
    if (this[i] === element) {
      return i;
    }
  }
  return -1;
};

curri.prototype.pop = function () {
  const last = this[this.length - 1];

  delete this[this.length - 1];
  this.length--;

  return last;
};

curri.prototype.push = function (...elements) {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    this[this.length] = element;
    this.length++;
  }

  return this.length;
};

curri.prototype.reduce = function (callback, initialValue) {
  const hasInitialValue = initialValue !== undefined;

  let accumulator = hasInitialValue ? initialValue : this[0];

  for (let i = hasInitialValue ? 0 : 1; i < this.length; i++) {
    accumulator = callback(accumulator, this[i]);
  }
  return accumulator;
};

curri.prototype.reverse = function () {
  const reversed = { ...this };
  //Se puede utilizar Object.assign({}, this);

  for (let i = 0; i < reversed.length; i++) {
    this[i] = reversed[reversed.length - i - 1];
    reversed[reversed.length - i - 1] = reversed[i];
  }
  return this;
};

curri.prototype.shift = function () {
  const first = this[0];

  for (let i = 1; i < this.length; i++) {
    this[i - 1] = this[i];
  }

  delete this[this.length - 1];
  this.length--;
  return first;
};

curri.prototype.slice = function (start = 0, end = this.length) {
  let sliced = { ...this };
  let newCurri = new curri();

  if (start < 0) start = this.length + start;

  if (end < 0) end = this.length + end;

  if (start > this.length) return newCurri;

  if (end > this.length) end = this.length;

  for (let i = start; i < end; i++) {
    newCurri[newCurri.length] = sliced[i];
    newCurri.length++;
  }
  return newCurri;
};

curri.prototype.some = function (callback) {
  if (this.length === 0) {
    return false;
  }

  for (const index in this) {
    if (callback(this[index])) {
      return true;
    }
  }
  return false;
};

export default curri;
