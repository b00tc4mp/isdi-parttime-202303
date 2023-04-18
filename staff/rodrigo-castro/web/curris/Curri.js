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

Curri.prototype.includes = function(elementSearched) {
    for(let i = 0; i < this.length; i++) {
        if(this[i] === elementSearched){
            return true
        }
    }
    return false
}

Curri.prototype.indexOf = function(element, start = 0) {
    for(let i = start; i < this.length; i++){
        if(this[i] === element){
            return i
        }
    }
    return -1
}

Curri.prototype.join = function(separator = ',') {
    let result
    for(let i = 0; i < this.length; i++){
        if(result === undefined){
            result = `${this[i]}`
        } else {
            if(this[i] === undefined){
                result = `${result}${separator}`
            } else {
                result = `${result}${separator}${this[i]}`
            }
        }
    }
    return result
}

Curri.prototype.lastIndexOf = function(element) {
    for(let i = this.length; i >= 0; i--){
        if(this[i] === element){
            return i
        }
    }
    return -1
}

Curri.prototype.reverse = function() {
    let inverted = []
    for(let i = 0; i < this.length; i++){
        inverted[this.length-1-i] = this[i]
    }
    for(let i = 0; i < this.length; i++){
        this[i] = inverted[i]
    }
    return this
}

Curri.prototype.shift = function() {
    let firstElement = this[0]
    for(let i = 1; i < this.length; i++){
        this[i-1] = this[i]
    }
    delete this[this.length - 1]
    this.length = this.length - 1
    return firstElement
}

Curri.prototype.slice = function(start = 0, end = this.length) {        
        let result = new Curri
        let counter = 0
        
        if(end < -this.length || start > this.length) return []
    
        if(start < -this.length)
            start = 0
    
        if(end > this.length)
            end = this.length
    
        if(start < 0){
            
            if(end < 0){
                for(let i = this.length+start; i < this.length+end; i++){
                    result[counter] = this[i]
                    counter++
                }
                return result     
            }
            
            for(let i = this.length+start; i < end; i++){
                result[counter] = this[i]
                counter++
            }
            return result        
        }
    
        if(end < 0){
            for(let i = start; i < this.length+end; i++){
                result[counter] = this[i]
                counter++
            }
            return result   
        }
    
        for(let i = start; i < end; i++){
            result[counter] = this[i]
            counter++
        }
        return result
}

Curri.prototype.some = function(callback) {
    for(let i = 0; i < this.length; i++){
        if(callback(this[i]))
            return true
    }
    return false
}

Curri.prototype.toReversed = function () {
    let result = new Curri
    for(let i = 0; i < this.length; i++) {
        result[i] = this[this.length-1-i]
        result.length++
    }
    return result
}

Curri.prototype.unshift = function (elements) {
    for(let i = 0; i < this.length; i++){
        elements[elements.length] = this[i]
        elements.length++
    }
    for(let i = 0; i < elements.length; i++){
        this[i] = elements[i]
    }
    return this.length
}

// TODO implement more Curri methods (same as Array methods)

export default Curri