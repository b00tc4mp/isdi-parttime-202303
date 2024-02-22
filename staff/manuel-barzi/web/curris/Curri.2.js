function Curri() {
    for (let i = 0; i < arguments.length; i++)
        this[i] = arguments[i]

    this.length = arguments.length
}

Curri.of = function() {
    const c = new Curri

    for (let i = 0; i < arguments.length; i++) {
        c[i] = arguments[i]

        c.length++
    }

    return c
}

Curri.prototype.forEach = function(callback) {
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

window.Curri = Curri

export default Curri