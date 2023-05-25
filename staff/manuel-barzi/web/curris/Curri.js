class Curri {
    constructor() {
        if (arguments.length === 1 && typeof arguments[0] === 'number') {
            this.length = arguments[0]
        } else {
            for (let i = 0; i < arguments.length; i++)
                this[i] = arguments[i]

            this.length = arguments.length
        }
    }

    static of() {
        const c = new Curri

        for (let i = 0; i < arguments.length; i++) {
            c[i] = arguments[i]

            c.length++
        }

        return c
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
}

// TODO implement more Curri methods (same as Array methods)

window.Curri = Curri

export default Curri