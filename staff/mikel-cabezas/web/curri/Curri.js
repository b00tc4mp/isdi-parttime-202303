function Curri() {
    if (arguments.length === 1 && typeof arguments[0] === 'boolean') {
        this.length = arguments[0]
    } else if (arguments.length === 1 && typeof arguments[0] === 'number') {
        this.length = arguments[0]
    } else {
        for (let i = 0; i < arguments.length; i++)
            this[i] = arguments[i]

        this.length = arguments.length
    }
}

// POP FUNCTION
Curri.of = function () {
    const c = new Curri

    for (let i = 0; i < arguments.length; i++) {
        c[i] = arguments[i]

        c.length++
    }

    return c
}

// FOREACH FUNCTION

Curri.prototype.forEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        const element = this[i]

        callback(element, i, this)
    }
}


// POP FUNCTION

Curri.prototype.pop = (element) => {
    const last = element[element.length - 1]

    element.length--

    return last
}



// POP FUNCTION

Curri.prototype.pop = (element) => {
    const last = element[element.length - 1]

    element.length--

    return last
}



// MAP FUNCTION
Curri.prototype.map = function map(callback) {


    const mapping = new Curri
    for (let i = 0; i < this.length; i++) {
        const element = this[i]  
        mapping[mapping.length] = callback(element)
        mapping.length++
    }
    return mapping
    
}

// SLICE FUNCTION
Curri.prototype.slice = function slice(position, end) {
    const newArray = new Curri
    if(position === undefined) {
        position = 0
    }
    if(position < 0) {
        position = position + newArray.length
    }
    if(end < 0) {
        end = end + newArray.length
    }
    if(end === undefined) {
        end = newArray.length
    }

    for(let i = position; i < end; i++) {
        newArray[newArray.length] = this[i]
        newArray.length++
    } 
    return newArray
}

// LASTINDEX FUNCTION
Curri.prototype.lastIndexOf = function lastIndexOf(word, position) {
    const control = new Curri
    for(let i = this.length; i > 0; i--) {
        control[control.length] = 1
        if(word === this[i]) {
            if (position >= 1) {
                i = position 
                // control.length++

            }
            if(position) {
                return console.log(Number(i + position))
            }
            if(!position) {
                // console.log(i)
                return i
            }
        } 
        if(word !== this[i]) {
            control.length--
        }   
    }
    if (control.length >= 0) {
        return console.log(-1)
    }
    if (word === NaN) {
        return console.log(-1)
    }
}


// JOIN FUNCTION
Curri.prototype.join = function join(separator) {
    let toString = []
    let newString = new Curri

    if (separator === ''){
        for (let i = 0; i < this.length; i++) {
            toString = toString + this[i] + separator
        }
        return toString
    }


    if (separator === undefined){
        for (let i = 0; i < this.length; i++) {
            toString = toString + this[i] + ','
        }
        return toString

    }
    if (separator !== undefined){
        for (let i = 0; i < this.length; i++) {
            toString = toString + this[i] + separator
        }
        let deleteLastChar = '';

        for (let i = 0; i < toString.length - 1; i++) {
            deleteLastChar += toString[i];
        }
        newString = deleteLastChar
        return newString
    }
}

// ISCURRI FUNCTION
Curri.prototype.isCurri = function isCurri() {
    if(typeof this === 'object' && this.length <= 0) {
        return false
    }

    if(typeof this !== 'object') {
        return false
    }

    if(typeof this === 'object') {
        return true
    }
}


// INCLUDES FUNCTION
Curri.prototype.includes = function includes(find) {
    let isFind 
    for(let i = 0; i < this.length; i++) {
        if(this[i] === find) {
            return isFind = true
        } 
        if(find !== this[i]) {
            isFind = false
        }   
    }

    return isFind
    
}







// TODO implement more Curri methods (same as Array methods)

window.Curri = Curri

export default Curri