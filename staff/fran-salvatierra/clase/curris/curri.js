function Curri() {
    this.length = 0;
}

Curri.of = function (...elements) {
    const c = new Curri;

    for (let i = 0; i < elements.length; i++) {
        c[i] = elements[i];
        c.length++
    }
    return c
    // return `(${c.length}) [${Object.values(c).slice(0,c.length).join(', ')}]`;
}

Curri.prototype.forEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        const element = this[i];
        callback(element, i, this)
    }
};

Curri.prototype.map = function (callback) {
    const mapped = new Curri;
    for (let i = 0; i < this.length; i++) {
        const element = this[i];
        mapped[mapped.length] = callback(element)
        mapped.length++
    }
    return mapped
};

Curri.prototype.concat = function (...elements) {
    let concated = new Curri;
    for (let i = 0; i < elements.length; i++) {
        concated = [...elements]
    }
    return concated
}

export default Curri;