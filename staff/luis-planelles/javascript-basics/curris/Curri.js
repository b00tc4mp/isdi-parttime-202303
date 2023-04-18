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

export default Curri;
