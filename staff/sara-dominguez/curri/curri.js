function Curri() {
    this.length = 0
}


//.forEach
Curri.prototype.forEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        const element = this[i]
        
        callback(element)
    }
}


//.map
Curri.prototype.map = function map(callback) {
    const mapped = new Curri

    for (let i = 0; i < this.length; i++) {
        const element = this[i]
        
        mapped[mapped.length] = callback(element)
        mapped.length++
    }

    return mapped
}

//.push
Curri.prototype.push = function(...elements) {
    for(let i = 0; i < elements.length; i++) {
        const element = elements[i];
        this[this.length] = element
        this.length ++   
    }
    return this.length
}

//.pop

Curri.prototype.pop = function() {
    const last = this[this.length -1]
    delete this[this.length - 1]
    this.length --
    
    return last
}

//.some
Curri.prototype.some = function (callback){
    for(let i = 0; i < this.length; i++) {
        const element = this[i]
        if(callback(element) === true) {
            console.log(true)
            return true
        } 
    }
    console.log(false)
}


//.every
Curri.prototype.every = function (callback) {
    for(let i = 0; i < this.length; i++) {
        const element = this[i]
        while(callback(element) === false) {
            console.log(false)
            return false
        }
    }  
    return true
}

// TODO implement more Curri methods (same as Array methods)

export default Curri