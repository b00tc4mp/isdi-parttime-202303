function Curri() {
    this.length = 0;
}

Curri.prototype.forEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        const element = this[i];
        callback(element);
    }
}

Curri.prototype.at = function(index) {
    if(index < 0) index = this.length + index
    return this[index]
}

Curri.prototype.join = function(separator = ','){
    let string = ''
    for (let i = 0; i < this.length ; i++) {
        string += this[i]
        if (i < this.length -1) string+= separator
    }
    return string
}

Curri.prototype.indexOf = function(element, initialPosition = 0){


    for(let i = initialPosition; i < this.length; i++){
        if(element === this[i])
        return i
    }
    return -1
}

Curri.prototype.fill = function(element, initialPosition = 0, lastPosition = this.length) {
    for(let i = initialPosition; i < lastPosition; i++){
            this[i] = element
        };
    return this
}

Curri.prototype.concat = function(curri2){
    const newCurri = new Curri

    for(let i = 0; i < this.length; i++){
        newCurri[newCurri.length] = (this[i])
        newCurri.length++
    }
 
    for(let i = 0; i< curri2.length; i++){
        newCurri[newCurri.length] = (curri2[i])
        newCurri.length++
    }
    return newCurri
}

Curri.prototype.isCurri = function(curri) {
    if (curri.constructor === Curri)
    return true
}

Curri.prototype.every = function(callback){
    for (let i = 0; i < this.length; i++){
        if(!callback(this[i]))
        return false
    }
    return true
}

Curri.prototype.filter = function(callback){
    const newCurri = new Curri
    
    for(let i = 0; i < this.length; i++){
        if(callback(this[i]))
        newCurri[newCurri.length] = this[i]
        newCurri.length++
    }
    return newCurri
}

Curri.prototype.find = function(callback){
    for(let i = 0; i < this.length; i++) {
        if(callback(this[i]))
        return this[i]
    }
    return undefined
}

Curri.prototype.findIndex = function(callback){
    for(let i = 0; i < this.length; i++) {
        if(callback(this[i]))
        return i
    }
    return -1
}

Curri.prototype.includes = function(element){
    for(let i = 0; i < this.length; i++){
        if(element === this[i])
        return true
    }
    return false
}

Curri.prototype.map = function(callback){
    const newCurri = new Curri
    for(let i = 0; i < this.length; i++){
        newCurri[newCurri.length] = callback(this[i])
        newCurri.length++
    }
    return newCurri
}

Curri.prototype.pop = function(){
    const lastElement = this[this.length - 1]
    delete this[this.length - 1]
    this.length--
    return lastElement

}

Curri.prototype.push = function(element){
    this[this.length] = element
    return this.length
}

Curri.prototype.reduce = function(callback, initialValue){
    let start
    let accumulator
  
    if(initialValue === undefined) 
    accumulator = this[0]
    else 
    accumulator = initialValue
    
    if(initialValue === undefined)
    start = 1
    else 
    start = 0
    
    for (let i = start; i < this.length; i++){
     accumulator = callback(accumulator, this[i])
     this.length++
    }
    
    return accumulator
}

Curri.prototype.reverse = function(){
    let newCurri = new Curri
    let index = 0
   

    for (let i = this.length-1; i >= 0; --i){
        newCurri[index] = this[i]
        index++
        newCurri.length++
    }

    for (let i = 0; i < newCurri.length; i++){
        this[i] = newCurri[i]
       
    }
    
    return this
}



export default Curri

