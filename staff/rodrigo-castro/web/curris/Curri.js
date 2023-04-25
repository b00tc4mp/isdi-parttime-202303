class Curri {

    constructor() {
        this.length = 0
        if(arguments.length === 1 && typeof arguments[0] === 'number'){
            this.length = arguments[0]
        }
        
        if(arguments.length === 1 && typeof arguments[0] !== 'number'){
            this.length = 1
            this[0] = arguments[0]
        } 
        
        if(arguments.length > 1) {
            this.length = arguments.length
            for(let i = 0; i < arguments.length; i++){
                this[i] = arguments[i]
            }
        }

    }


    static of() {
        const c = new Curri

        for(let i = 0; i < arguments.length; i++){
            c[i] = arguments[i]
        }
        c.length = arguments.length

        return c
    }

    static isCurri() {
        const reference = new Curri
        if(this.constructor === reference.constructor){
            return true
        }
        return false
    }

    forEach (callback) {
        for (let i = 0; i < this.length; i++) {
            const element = this[i]

            callback(element, i, this)
        }
    }

    map(callback) {
        const mapped = new Curri

        for(let i = 0; i < this.length; i++) {
            const element = this[i]

            mapped[mapped.length] = callback(element)
            mapped.length++
        }
        return mapped
    }

    at(index) {
        if(index === undefined)
            index = 0

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

    concat(...arrays) {
        let result = new Curri
        for(let i = 0; i < this.length; i++){
            result[i] = this[i]
        }
        let counter = this.length
        for(let i = 0; i < arrays.length; i++){
            for(let j = 0; j < arrays[i].length; j++){
                result[counter] = arrays[i][j]
                counter++
            }
            // result.length = result.length + arrays[i].length
        }
        result.length = counter
        return result
    }

    every(callback) {
        for(let i = 0; i < this.length; i++){
            if(!callback(this[i]))
                return false
        }
        return true
    }

    fill(fillElement, startElement = 0, endElement = this.length) {
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

    filter(callback) {
        let result = new Curri
        let counter = 0
        for(let i = 0; i < this.length; i++){
            if(callback(this[i])){
                result[counter] = this[i]
                counter++
            }
        }
        result.length = counter
        return result
    }

    find(callback) {
        for(let i = 0; i < this.length ; i++){
            if(callback(this[i]))
                return this[i]
        }
        return undefined
    }

    findIndex(callback) {
        for(let i = 0; i < this.length; i++){
            if(callback(this[i])){
                return i
            }
        }
        return -1
    }

    includes(elementSearched) {
        for(let i = 0; i < this.length; i++) {
            if(this[i] === elementSearched){
                return true
            }
        }
        return false
    }

    indexOf(element, start = 0) {
        for(let i = start; i < this.length; i++){
            if(this[i] === element){
                return i
            }
        }
        return -1
    }

    join(separator = ',') {
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

    lastIndexOf(element = undefined) {
        for(let i = this.length-1; i >= 0; i--){
            if(this[i] === element){
                return i
            }
        }
        return -1
    }

    reduce (callback, initialValue) {
        let firstIndex = 0
        if(initialValue === undefined){
            initialValue = this[0]
            firstIndex = 1
        }

        let accum = initialValue
        for(let i = firstIndex; i < this.length; i++) {
            accum = callback(accum, this[i])
        }
        return accum
    }

    reverse() {
        let inverted = []
        for(let i = 0; i < this.length; i++){
            inverted[this.length-1-i] = this[i]
        }
        for(let i = 0; i < this.length; i++){
            this[i] = inverted[i]
        }
        return this
    }

    shift() {
        let firstElement = this[0]
        for(let i = 1; i < this.length; i++){
            this[i-1] = this[i]
        }
        delete this[this.length - 1]
        this.length = this.length - 1
        return firstElement
    }

    slice(start = 0, end = this.length) {        
            let result = new Curri
            let counter = 0
            
            if(end < -this.length || start > this.length) return result
        
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
                    result.length = counter
                    return result     
                }
                
                for(let i = this.length+start; i < end; i++){
                    result[counter] = this[i]
                    counter++
                }
                result.length = counter
                return result        
            }
        
            if(end < 0){
                for(let i = start; i < this.length+end; i++){
                    result[counter] = this[i]
                    counter++
                }
                result.length = counter
                return result   
            }
        
            for(let i = start; i < end; i++){
                result[counter] = this[i]
                counter++
            }
            result.length = counter
            return result
    }

    some(callback) {
        for(let i = 0; i < this.length; i++){
            if(callback(this[i]))
                return true
        }
        return false
    }

    toReversed () {
        let result = new Curri
        for(let i = 0; i < this.length; i++) {
            result[i] = this[this.length-1-i]
            result.length++
        }
        return result
    }

    unshift (elements) {
        for(let i = 0; i < this.length; i++){
            elements[elements.length] = this[i]
            elements.length++
        }
        for(let i = 0; i < elements.length; i++){
            this[i] = elements[i]
        }
        this.length = elements.length
        return this.length
    }
}

// TODO implement more Curri methods (same as Array methods)

window.Curri = Curri

export default Curri