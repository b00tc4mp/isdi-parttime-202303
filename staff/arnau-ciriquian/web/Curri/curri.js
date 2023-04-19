function Curri() {
    if (arguments.length === 1 && typeof arguments[0] === 'number') {
        this.length = arguments[0]
    } else {
        for (let i = 0; i < arguments.length; i++)
            this[i] = arguments[i]

        this.length = arguments.length
    }
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

Curri.prototype.map = function (callback) {
    const mapped = new Curri

    for (let i = 0; i < this.length; i++) {
        const element = this[i]

        mapped[mapped.length] = callback(element)
        mapped.length++
    }

    return mapped
}

Curri.prototype.at = function (index) {
    if (index >= 0) {
        return this[index]
    } else{
        return this[this.length + index]
    } 
}

Curri.prototype.concat = function () {
    const newCurri = new Curri()

    for (let i = 0; i < this.length; i++) {
        newCurri[i] = this[i]
        newCurri.length++
    }
    
    let newIndex = newCurri.length

    for (let i = 0; i < arguments.length; i++) {
        let argument = arguments[i]
        for (let j = 0; j < argument.length; j++) {
            newCurri[newIndex] = argument[j]
            newIndex++
            newCurri.length++
        }
    }

    return newCurri
}

window.Curri = Curri

export default Curri