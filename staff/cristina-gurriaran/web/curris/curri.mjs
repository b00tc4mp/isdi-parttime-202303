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

Curri.prototype.fill = function fill(element, initialPosition = 0, lastPosition = this.length) {
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





export default Curri

