
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
 Curri.prototype.push = function(object,...elements) {
    for(let i = 0; i < object.length; i++) {
        const element = object[i];
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

//.concat
Curri.prototype.concat = function (anotherCurry){

    const a = new Curri
    for(let i = 0; i <this.length; i++){
     a[i] = this[i] 
     a.length++
    }
    for(let j = 0; j <anotherCurry.length; j++){
     a[a.length] =  anotherCurry[j] 
     a.length++
    }
    console.log(a)
    return a
 }
 

//.fill

Curri.prototype.fill = function (elementToInclude, startIndexeElement, finalIndexElement){
    if((!finalIndexElement || finalIndexElement === ' ') && (!startIndexeElement || startIndexeElement === ' ')){
        
        finalIndexElement = this.length;
        startIndexeElement = 0; 
        for (let i = startIndexeElement; i < finalIndexElement; i++){
            this[i] = elementToInclude;
        }
        return this;
    }
    
    if(!finalIndexElement || finalIndexElement === ' '){
        finalIndexElement = this.length;
        for (let i = startIndexeElement; i < finalIndexElement; i++){
            this[i] = elementToInclude;
        }
        return this;
    }

    

    for (let i = startIndexeElement; i < finalIndexElement; i++){
        this[i] = elementToInclude;
    }
        return this;
}

// TODO implement more Curri methods (same as this methods)

export default Curri 