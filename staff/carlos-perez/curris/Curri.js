function Curri() {

    if (arguments.length === 1) {
        const c = new Curri;
        c.length = arguments[0];
        return c;
    }

    for (let i = 0; i < arguments.length; i++) {
        this[i] = arguments[i];
    }
    this.length = arguments.length;
}

Curri.of = function () {
    const c = new Curri

    for (let i = 0; i < arguments.length; i++) {
        c[i] = arguments[i]

        c.length++
    }

    return c
}

Curri.prototype.forEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        const element = this[i]

        callback(element, i, this)
    }
}

Curri.prototype.map = function map(callback) {
    const mapped = new Curri

    for (let i = 0; i < this.length; i++) {
        const element = this[i]

        mapped[mapped.length] = callback(element)
        mapped.length++
    }

    return mapped
}

// TODO implement more Curri methods (same as Array methods)

Curri.prototype.push = function push(...elements) {
    for (let i = 0; i < elements.length; i++) {
        this[this.length] = elements[i];
        this.length++;
    }
    return this.length;
}

Curri.prototype.pop = function pop() {
    const last = this[this.length - 1];

    delete this[this.length - 1];

    this.length--;
    return last;
}

Curri.prototype.includes = function includes(item) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === item) {
            return true;
        }
    }
    return false;
};


Curri.prototype.at = function at(index) {
    index = index < 0 ? this.length + index : index;
    return this[index];
};

Curri.prototype.fill = function fill(fillItem, startIndex = 0, endIndex = this.length) {
    startIndex = startIndex < 0 ? this.length + startIndex : startIndex;

    endIndex = endIndex < 0 ? this.length + endIndex : endIndex;
    endIndex = endIndex < this.length ? endIndex : this.length;

    for (let i = startIndex; i < endIndex; i++) {
        this[i] = fillItem;
    }

    return this;
};



window.Curri = Curri