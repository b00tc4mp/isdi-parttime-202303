console.log('Curri.js loaded')

function Curri() {
    this.length = 0
}

Curri.prototype.forEach = function(callback) {
    for(let i = 0; i < this.length; i++) {
        const element = this[i]

        callback(element)
    }
}

Curri.prototype.map = function map(callback) {
    const mapped = new Curri

    for(let i = 0; i < this.length; i++) {
        const element = this[i]

        mapped[mapped.length] = callback(element)
        mapped.length++
    }
    return mapped
}

Curri.prototype.at = function(index) {
    if(index >= 0){
        for(let i = 0; i < this.length; i++){
            if(i === index){
                return this[i]
            }
        }
    }
    if(index < 0){
        for(let i = 0; i < this.length; i++){
            if(i === this.length+index){
                return this[i]
            }
        }
    }
    return undefined
}

Curri.prototype.concat = function(...arrays) {
    let result = this
    let counter = this.length
    for(let i = 0; i < arrays.length; i++){
        for(let j = 0; j < arrays[i].length; j++){
            result[counter] = arrays[i][j]
            counter++
        }
        this.length = this.length + arrays[i].length
    }
    return result
}

Curri.prototype.every = function(callback) {
    for(let i = 0; i < this.length; i++){
        if(!callback(this[i]))
            return false
    }
    return true
}

Curri.prototype.fill = function(fillElement, startElement = 0, endElement = this.length) {
    if(endElement > this.length) 
        endElement = this.length

    if(endElement < 0){
        if(startElement < 0){
            for(let i = this.length+startElement; i < this.length+endElement; i++){
                this[i] = fillElement
            }
            return this
        }
        for(let i = startElement; i < this.length+endElement; i++){
            this[i] = fillElement
        }
        return this
    }

    if(startElement < 0){
        for(let i = this.length+startElement; i < endElement; i++){
            this[i] = fillElement
        }
        return this
    }

    for(let i = startElement; i <= endElement-1; i++){
        this[i] = fillElement;
    }
    return this
}

Curri.prototype.filter = function(callback) {
    let result = []
    for(let i = 0; i < this.length; i++){
        if(callback(this[i]))
            result.push(this[i])
    }
    return result
}

Curri.prototype.find = function(callback) {
    for(let i = 0; i < this.length ; i++){
        if(callback(this[i]))
            return this[i]
    }
    return undefined
}

Curri.prototype.findIndex = function(callback) {
    for(let i = 0; i < this.length; i++){
        if(callback(this[i])){
            return i
        }
    }
    return -1
}

Curri.prototype.forEach = function(callback) {
    for(let i = 0; i < this.length; i++){
        callback(this[i])
    }
}

// TODO implement more Curri methods (same as Array methods)

export default Curri