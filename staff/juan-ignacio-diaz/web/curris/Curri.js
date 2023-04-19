function Curri(){
    this.length = 0
}

Curri.prototype.push  = function(...elements) {
    for (let i = 0; i < elements.length; i++) {
        this[this.length] = elements[i]
        this.length++
    }
    return this.length
}

Curri.prototype.at = function(index) {
    if (index < 0 ) index = this.length + index
    
    return this[index]
}

Curri.prototype.concat = function(curri2) {
    let newCurri = new Curri()
    for (let i = 0 ; i < this.length; i++) { 
        newCurri[newCurri.length] = this[i]
        newCurri.length++
    }
    for (let i = 0 ; i < curri2.length; i++) {
        newCurri[newCurri.length] = curri2[i]
        newCurri.length++
    }
    return newCurri
}

Curri.prototype.every = function(callback) {
    for (let i = 0 ; i < this.length; i++)
        if (!callback(this[i])) 
            return false
            
    return true
}

Curri.prototype.fill = function(element, first, last) {
    if (first === undefined) first = 0
    if (last === undefined) last = this.length
    for(let i = first; i<last ; i++)
        this[i] = element

    return this
}

Curri.prototype.filter = function(callback) {
    const filtered = new Curri()

    for (let i = 0 ; i < this.length; i++) {
        const element =  this[i]

        if (callback(element)) {
            filtered[filtered.length]=element
            filtered.length++
        }
    }
        
    return filtered
}

Curri.prototype.find = function(callback) { 
    for (let i = 0 ; i < this.length; i++) {
        const element =  this[i]

        if(callback(element)) 
            return element
    }
    return undefined
}

Curri.prototype.findIndex = function(callback) {
    for(let i = 0 ; i < this.length; i++) 
        if (callback(this[i])) return i
    
    return -1
}

Curri.prototype.forEach = function(callback) {
    for (let i = 0 ; i < this.length; i++)  
        callback(this[i])
}

Curri.prototype.includes = function(element) {
    for (let i = 0 ; i < this.length; i++)  
        if (this[i] === element)
            return true

    return false
}

Curri.prototype.indexOf = function(element, ini) {
    if (ini === undefined) ini = 0
    if (ini < 0) 
        ini = this.length + ini

    for ( let i = ini; i < this.length; i++)
        if (this[i] === element)
            return i

    return -1
}


export default Curri