export function Curri() {
    this.length = 0;
}

Curri.prototype.push = function (...elements){
    for (let i = 0; i < elements.length; i++){
        let element = elements[i];
        this[this.length] = element
        this.length ++;
    }
    return this.length
}  

Curri.prototype.pop = function (){
    let last = this[this.length -1];
    delete this[this.length -1];
    this.length--    // esta quitando el ultimo element del array.
    return last;
}

Curri.prototype.includes = function (element) {
    for (let i = 0; i < this.length; i++) {
        let item = this[i];
        if (item === element) {
            return true
        }
    } return false
}

Curri.prototype.at = function (index){
    if (index > 0){
        return this[index];
    } else if (index < 0){
        return this[this.length - (-index)]
    }
}

Curri.prototype.indexOf = function (elementToSearch, fromIndex = 0){
    if (fromIndex > this.length) return -1;
    if (fromIndex < 0){
        fromIndex = (this.length - (-fromIndex));
    }
    for (let i = 0; i < this.length; i++){
        if (i < fromIndex){
            continue;
        }
        if (this[i] === elementToSearch){
            return i;
        }
    } 
    return -1
}

Curri.prototype.lastIndexOf = function (elementToSearch, fromIndex = 0) {
    if (fromIndex > this.length) return -1;
    if (fromIndex < 0) {
        fromIndex = (this.length - (-fromIndex));
    }
    for (let i = this.length; i > 0; i--) {
        if (i < fromIndex) {
            continue;
        }
        if (this[i] === elementToSearch) {
            return i;
        }
    }
    return -1
}

Curri.prototype.fill = function (value, startIndex = 0, endIndex = this.length){
    
    if (startIndex < 0){
        startIndex = this.length + startIndex;
    }
    if (endIndex < 0){
        endIndex = this.length + endIndex;
    }

    for(let i = 0; i < this.length; i++){
        if (i > endIndex || i < startIndex) continue

        this[i] = value
    }
    return this
}

Curri.prototype.join = function (separator){
    let result = ""
    let separatorItem = separator 
    if (separatorItem === undefined){
        separatorItem = ","
    }
    if (separatorItem === ""){
        separator = "";
    }
    if (typeof separatorItem !== "string"){
        separatorItem = "" + separator;
    }
    if (this.length === 0){
        return ""; 
    }
    if (this.length === 1){
        return "" + this[0];
    }
    for(let i = 0; i < this.length; i++){
        if (this[i] === null || this[i] === undefined){
            this[i] = " ";
        }
        
        result += this[i];

        if (i === this.length -1){
            continue
        }

        result += separatorItem;
    }
    return result;
}

Curri.prototype.concat = function (...arrays){
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

Curri.prototype.reverse = function () {
    for (let i = 0; i < Math.floor(this.length / 2); i++) {
        let temp = this[i];
        this[i] = this[this.length - 1 - i];
        this[this.length - 1 - i] = temp;
    }
    return this;
}

Curri.prototype.forEach = function (callback){
    for (let i = 0; i < this.length; i++)
        callback(this[i]);
}

Curri.prototype.map = function (callback){
    // antes result = [] pero no podemos, tenemos que usar Curri 
    let result = new Curri;
    for (let i = 0; i < this.length; i++){
        result[result.length] = callback(this[i]);
        // esto es para que El nuevo array result vaya aumentando en propiedades pa que pueda almacenar new data
        result.length++;
    }
    return result
}

Curri.prototype.some = function (callback){
    for (let i = 0; i < this.length; i ++){
        if (callback(this[i])) 
        return true;
    }
    return false;
}

Curri.prototype.every = function (callback){
    for (let i = 0; i < this.length; i ++){
        if (!callback(this[i])) 
        return false;
    }
    return true;
}

Curri.prototype.find = function (callback){
    
    for (let i = 0; i < this.length; i++){
        if (callback(this[i])){
            return this[i];
        }
    }
    return undefined;
}

Curri.prototype.findIndex = function (callback){
    for (let i = 0; i < this.length; i++){
        if (callback(this[i])){
            return i;
        }
    }
    return undefined;
}

