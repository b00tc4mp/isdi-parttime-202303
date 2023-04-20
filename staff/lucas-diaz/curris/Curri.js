function Curri() {
    this.length = 0;
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
        // esto es para que itere el pseudoArray
        result.length++;
    }
    return result
}



export default Curri;