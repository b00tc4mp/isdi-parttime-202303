class Curri {
    constructor(...argument) {
        if (argument.length === 1) {
            const c = new Curri;
            c.length = argument[0];
            return c;
        }

        for (let i = 0; i < argument.length; i++) {
            this[i] = argument[i];
        }
        this.length = argument.length;
    }


    static of(...argument) {
        const c = new Curri();
        for (let i = 0; i < argument.length; i++) {
            c[i] = argument[i]

            c.length++
        }

        return curri
    }

    forEach(callback) {
        for (let i = 0; i < this.length; i++) {
            const element = this[i]

            callback(element, i, this)
        }
    }

    map(callback) {
        const mapped = new Curri

        for (let i = 0; i < this.length; i++) {
            const element = this[i]

            mapped[mapped.length] = callback(element)
            mapped.length++
        }

        return mapped
    }

    // TODO implement more Curri methods (same as Array methods)

    push(...elements) {
        for (let i = 0; i < elements.length; i++) {
            this[this.length] = elements[i];
            this.length++;
        }
        return this.length;
    }

    pop() {
        const last = this[this.length - 1];

        delete this[this.length - 1];

        this.length--;
        return last;
    }

    includes(item) {
        for (let i = 0; i < this.length; i++) {
            if (this[i] === item) {
                return true;
            }
        }
        return false;
    };


    at(index) {
        index = index < 0 ? this.length + index : index;
        return this[index];
    };

    fill(fillItem, startIndex = 0, endIndex = this.length) {
        startIndex = startIndex < 0 ? this.length + startIndex : startIndex;

        endIndex = endIndex < 0 ? this.length + endIndex : endIndex;
        endIndex = endIndex < this.length ? endIndex : this.length;

        for (let i = startIndex; i < endIndex; i++) {
            this[i] = fillItem;
        }

        return this;
    };

    indexOf(matchItem, startPosition = 0) {
        for (let i = startPosition; i < this.length; i++) {
            if (this[i] === matchItem) {
                return i;
            }
        }
        return -1;
    };

    static isCurri(argument) {
        if (argument && typeof argument === 'object' && argument.length && !argument.byteLength) {
            return true;
        }
        return false;
    };

    lastIndexOf(item, index = 0) {
        let lastIndex = -1;

        for (let i = index; i < this.length; i++) {
            if (this[i] === item) {
                lastIndex = i;
            }
        }
        return lastIndex;
    };

    shift() {
        const item = this[0];

        for (let i = 0; i < this.length - 1; i++) {
            this[i] = this[i + 1];
        }
        if (this.length) {
            delete this[this.length - 1];
            this.length--;
        }
        return item;
    };

    toReversed() {
        const reversed = new Curri();
        for (let i = 0; i < this.length; i++) {
            reversed[i] = this[this.length - 1 - i];
            reversed.length++;
        }
        return reversed;
    };

    unshift(...args) {
        const shifted = new Curri();
        let index = 0;

        for (let i = 0; i < args.length + this.length; i++) {
            if (i < args.length) {
                shifted[i] = args[i];
            } else {
                shifted[i] = this[i - args.length];
            }
            shifted.length++;
        }
        for (let i = 0; i < shifted.length; i++) {
            this[index] = shifted[i];
            index++;
        }
        this.length = index;

        return this.length;
    };

    concat(item) {
        let result = new Curri();

        for (let i = 0; i < this.length; i++) {
            result[i] = this[i];
            result.length++;
        }

        for (let i = 0; i < item.length; i++) {
            result[result.length] = item[i];
            result.length++;
        }

        return result;
    };

    join(slitItem = ',') {
        let result = '';

        for (let i = 0; i < this.length; i++) {
            if (i > 0) {
                result += slitItem;
            }
            result += this[i];
        }
        return result;
    };

    reverse() {
        for (let i = 0; i < this.length / 2; i++) {
            const item = this[i];
            this[i] = this[this.length - 1 - i];
            this[this.length - 1 - i] = item;
        }
        return this;
    };

}

window.Curri = Curri