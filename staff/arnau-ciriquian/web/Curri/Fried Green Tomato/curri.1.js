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

Curri.from = function () {
    const c = new Curri

    if (typeof arguments[0] === 'string') {
        const element = arguments[0]

        for (let i = 0; i < element.length; i++) {
            c[c.length] = element[i]

            c.length++
        }
    } else if (typeof arguments[0] === 'object') {
        const elements = arguments[0]

        for (let i = 0; i < elements.length; i++) {
            c[i] = elements[i]
    
            c.length++
        }
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

Curri.prototype.fill = function (value, startIndex = 0, endIndex) {
    let start
    if (startIndex >= 0) start = startIndex

    if (startIndex < 0) {
        if (startIndex + this.length >= 0) {
            start = startIndex + this.length
        } else {
            start = 0
        }
    }

    if (startIndex < -this.length && !start) {start = 0}

    if (!endIndex || endIndex >= this.length) {
        for ( let i = start; i < this.length; i++) {
            this[i] = value
        }
        return this
    }

    if (endIndex > startIndex && endIndex < this.length && endIndex >= 0) {
        for ( let i = start; i < endIndex; i++) {
            this[i] = value
        }
        return this
    }

    if (endIndex < 0 && endIndex > -this.length) {
        for ( let i = start; i < endIndex + this.length; i++) {
            this[i] = value
        }
        return this
    }

    return this
}

Curri.prototype.indexOf = function (element, index = 0) {
    let position = index

    if (position === 0) {
        for (let i = 0; i < this.length; i++) {
            if (this[i] === element) {
                return position = i
            }
        }
    }
    
    if (position > 0) {
        for (let i = position; i < this.length; i++) {
            if (this[i] === element) {
                return position = i
            }
        }
    }

    if (position < 0) {
        for (let i = this.length + index; i < this.length; i++) {
            if (this[i] === element) {
                return position = i
            }
        }
    }

    return -1
}

Curri.prototype.join = function (separator = ',') {
    let string = this[0]

    for (let i = 1; i < this.length; i++) {
        string = string + separator + this[i]
    }

    return string
}

/*
-foreach
-map
-concat
-at
-fill
-from
-of
-indeof
-join
*/

window.Curri = Curri

export default Curri