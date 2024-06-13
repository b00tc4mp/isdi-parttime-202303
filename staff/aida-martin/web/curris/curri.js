class Curri {
  constructor(...elements) {
    if (elements.length === 1 && typeof elements[0] === "number") {
      this.length = elements[0];
    } else {
      for (let i = 0; i < elements.length; i++) this[i] = elements[i];

      this.length = elements.length;
    }
  }

  forEach(callback) {
    for (let i = 0; i < this.length; i++) {
      const element = this[i];

      callback(element, i, this);
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

  static of(...elements) {
    const c = new Curri();

    for (let i = 0; i < elements.length; i++) {
      c[i] = elements[i];

      c.length++;
    }

    return c;
  }

  at(index) {
    if (index < 0) {
      return this[this.length + index];
    }
    return this[index];
  }

  concat(Curri2) {
    const concatted = new Curri();

    for (let i = 0; i < this.length; i++) {
      const element = this[i];
      concatted[concatted.length] = element;
      concatted.length++;
    }

    for (let i = 0; i < Curri2.length; i++) {
      const element2 = Curri2[i];
      concatted[concatted.length] = element2;
      concatted.length++;
    }
    return concatted;
  }

  every(callback) {
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
  }

  fill(value, start = 0, end = this.length) {
    if (start < 0) start = this.length + start;

    if (end < 0) end = this.length + end;

    for (let i = start; i < end; i++) {
      this[i] = value;
    }
    return this;
  }

  filter(callback) {
    let filtered = new Curri();

    for (let i = 0; i < this.length; i++) {
      const element = this[i];

      if (callback(element)) {
        filtered[filtered.length] = element;
        filtered.length++;
      }
    }
    return filtered;
  }

  find(callback) {
    for (let i = 0; i < this.length; i++) {
      const element = this[i];

      if (callback(element)) {
        return element;
      }
    }
    return undefined;
  }

  findIndex(callback) {
    for (let i = 0; i < this.length; i++) {
      const element = this[i];

      if (callback(element)) {
        return i;
      }
    }
    return -1;
  }

  includes(item) {
    for (let i = 0; i < this.length; i++) {
      const element = this[i];

      if (item === element) {
        return true;
      }
    }
    return false;
  }

  indexOf(element, index = 0) {
    if (index < 0) index = this.length + index;

    for (let i = index; i < this.length; i++) {
      if (this[i] === element) {
        return i;
      }
    }
    return -1;
  }

  // Curri.prototype.isArray = function () {
  //   if (this === null) return false;

  //   if (typeof this !== "object") return false;

  //   return `${this}` !== "[object Object]";
  // };

  join(separator = ",") {
    let result = "";

    for (let i = 0; i < this.length - 1; i++) {
      result += `${this[i]}${separator}`;
    }

    return `${result}${this[this.length - 1]}`;
  }

  lastIndexOf(element, index = this.length - 1) {
    if (index < 0) index = this.length + index;

    for (let i = index; i < this.length; i--) {
      if (this[i] === element) {
        return i;
      }
    }
    return -1;
  }

  pop() {
    const last = this[this.length - 1];

    delete this[this.length - 1];
    this.length--;

    return last;
  }

  push(...elements) {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      this[this.length] = element;
      this.length++;
    }

    return this.length;
  }

  reduce(callback, initialValue) {
    const hasInitialValue = initialValue !== undefined;

    let accumulator = hasInitialValue ? initialValue : this[0];

    for (let i = hasInitialValue ? 0 : 1; i < this.length; i++) {
      accumulator = callback(accumulator, this[i]);
    }
    return accumulator;
  }

  reverse() {
    const reversed = { ...this };
    //Se puede utilizar Object.assign({}, this);

    for (let i = 0; i < reversed.length; i++) {
      this[i] = reversed[reversed.length - i - 1];
      reversed[reversed.length - i - 1] = reversed[i];
    }
    return this;
  }

  shift() {
    const first = this[0];

    for (let i = 1; i < this.length; i++) {
      this[i - 1] = this[i];
    }

    delete this[this.length - 1];
    this.length--;
    return first;
  }

  slice(start = 0, end = this.length) {
    let sliced = { ...this };
    let newCurri = new Curri();

    if (start < 0) start = this.length + start;

    if (end < 0) end = this.length + end;

    if (start > this.length) return newCurri;

    if (end > this.length) end = this.length;

    for (let i = start; i < end; i++) {
      newCurri[newCurri.length] = sliced[i];
      newCurri.length++;
    }
    return newCurri;
  }

  some(callback) {
    if (this.length === 0) {
      return false;
    }

    for (const index in this) {
      if (callback(this[index])) {
        return true;
      }
    }
    return false;
  }

  //   splice(start, deleteCount, ...items) {
  //     const extracted = new Curri();

  //     for (let i = start; i < start + deleteCount; i++) {
  //       const element = this[i];

  //       extracted[extracted.length] = element;
  //       extracted.length++;
  //     }

  //     if (deleteCount > 0) {
  //       for (let i = start + deleteCount; i < this.length; i++) {
  //         const element = this[i];
  // CAMBIADO EL - 1 POR EL - ITEMS.LENGTH
  //         this[i - (deleteCount - items.length)] = element;
  //       }

  //CAMBIADO EL - 1 POR - ITEMS.LENGTH
  //       delete this[this.length - 1];

  //       this.length -= deleteCount - items.length;

  //       delete this[this.length];
  //     }

  //AÑADIDO ESTE FOR PARA RECORRER LOS ITEMS Y AÑADIRLOS EN LA POSICIÓN QUE TOQUE
  //     for (let i = 0; i < items.length; i++) {
  //       this[start + i] = items[i];
  //     }

  //     return extracted;
  //   }
  // }

  // toReversed() {

  // }

  // unshift() {
}

export default Curri;
