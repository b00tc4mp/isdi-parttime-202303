export default function Curri() {
    this.length = 0
}

Curri.prototype.forEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i])
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