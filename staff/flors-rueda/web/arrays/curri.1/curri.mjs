function Curri() {
    this.length = 0;
}

/*
const c = new Curri

c[0] = 'A'
c.length++
c[1] = 'B'
c.length++
c[2] = 'C'
c.length++

*/

Curri.prototype.concat = function concat(otherCurri) {
    const originalLength = this.length
    for(let i = 0; i < originalLength; i++){
        this[this.length] = otherCurri[i];
        this.length += 1
    };
    return this;
};

Curri.prototype.isCurri = function iCurri(curri) {
    return curri.constructor === Curri;
};

Curri.prototype.at = function at(index) {
    return this[index];
};

Curri.prototype.every = function every(callback) {
    for(let i = 0; i < this.length; i++){
        if(!callback(this[i])) return false;
    };
    return true;
};

Curri.prototype.fill = function fill(filler, start = 0, end = this.length) {
    for(let i = start; i < end; i++){
            this[i] = filler
        };
    return this
}

Curri.prototype.filter = function filter(callback) {
    let output = []
    for(let i = 0; i < this.length; i++) {
        if(callback(this[i])) output[output.length] = this[i];
    }
    return output
}

Curri.prototype.find = function find(callback) {
    for(let i = 0; i < this.length; i++) {
        if (callback(this[i])) return this[i]
    }
}

Curri.prototype.findIndex = function findIndex(callback) {
    for(let i = 0; i < this.length; i++) {
        if (callback(this[i])) return i
    }
    return -1
}

Curri.prototype.forEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        const element = this[i];
        callback(element);
    }
}

Curri.prototype.includes = function includes(element) {
    for(let i = 0; i < this.length; i++) {
        if(this[i] === element) return true;
    };
    return false
}

Curri.prototype.indexOf = function indexOf(element, start = 0) {
    for(let i = start; i < this.length; i++){
        if(this[i] === element) return i;
    };
    return -1;
}

Curri.prototype.lastIndexOf = function lastIndexOf(element, start = 0) {
    let i = start <= 0 ? this.length - 1 : start;
    for(i; i >= 0; i--){
        if(this[i] === element) return i;
    };
    return -1;
}

Curri.prototype.join = function join(joiner = ',') {
    let string = '';
    for(let i = 0; i < this.length; i++){
        string += this[i];
        if(i < this.length - 1) string += joiner;
    };
    return string;
}

Curri.prototype.map = function map(callback) {
    const output = new Curri
    for (let i = 0; i < this.length; i++) {
        const element = this[i];
        output[output.length] = callback(element);
        output.length++;
    }
    return output;
}

Curri.prototype.pop = function pop () {
    const lastItem = this[this.length - 1];
    delete this[this.length - 1];
    this.length --
    return lastItem
}

Curri.prototype.push = function push (element) {
    this[this.length] = element;
    this.length++
    return this.length;
}

Curri.prototype.reduce = function reduce (callback, initialValue) {  
    let reduceResult = initialValue === undefined ? this[0] : initialValue;
    let start = initialValue === undefined ? 1 : 0;
    for (let i = start; i < this.length; i++) {
      reduceResult = callback(reduceResult, this[i]);
    }
    return reduceResult;
}

Curri.prototype.reverse = function reverse () {
    for (let i = 0; i < this.length / 2; i++) {
        const temporal = this[i];
        this[i] = this[this.length - 1 - i];
        this[this.length - 1 - i] = temporal;
    }
    return this;
}

Curri.prototype.shift = function shift () {
    const firstElement = this[0];
    let index = 1
    for (let i = 0; i < this.length; i++) {
        const temporal = this[index];
        this[i] = temporal;
        index ++
    };
    delete this[this.length-1]
    this.length--
    return firstElement;
}

Curri.prototype.slice = function(start = 0, end = this.length) {
    const result = new Curri();
    if (start < 0) start = this.length + start;
    if (end < 0) end = this.length + end;
    for (let i = start; i < end && i < this.length; i++) {
        result[result.length] = this[i];
        result.length++;
    }
    return result;
};

Curri.prototype.some = function some(callback) {
    for(let i = 0; i < this.length; i++){
        if(callback(this[i])) return true;
    };
    return false;
};

Curri.prototype.splice = function splice(start, deleteCount, ...elements) {
    const extracted = new Curri();
    for (let i = start; i < start + deleteCount; i++) {
        extracted[extracted.length] = this[i];
        extracted.length++;
      }
    
    for (let i = this.length - 1; i >= start + deleteCount; i--) {
        this[i + elements.length - deleteCount] = this[i];
    }
    
    for (let i = 0; i < elements.length; i++) {
        this[start + i] = elements[i];
    }

    if(this.length < elements.length + start) {
        this.length += elements.length + start - this.length
    } 

    return extracted;
}

Curri.prototype.toReversed = function toReversed () {
    const reversed = new Curri;
    for(let i = this.length - 1; i >= 0; i--) {
        reversed[reversed.length] = this[i];
        reversed.length ++;
    }
    return reversed
}

Curri.prototype.unshift = function unshift (...elements) {
    for(let i = this.length - 1; i >= 0; i--) {
        this[i + elements.length] = this[i];
    }
    for(let i = 0; i < elements.length; i++) {
        this[i] = elements[i];
        this.length++
    }
    return this.length;
}

export default Curri